package org.colorcoding.ibas.integration.service.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Condition;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.FileData;
import org.colorcoding.ibas.bobas.data.FileItem;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.repository.FileRepository;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializationFactory;
import org.colorcoding.ibas.integration.MyConfiguration;
import org.colorcoding.ibas.integration.action.BOPropertyValue;
import org.colorcoding.ibas.integration.action.BOStatusAction;
import org.colorcoding.ibas.integration.bo.integration.Action;
import org.colorcoding.ibas.integration.bo.integration.ActionPackage;
import org.colorcoding.ibas.integration.repository.FileRepositoryAction;
import org.glassfish.jersey.media.multipart.BodyPart;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;

@Path("action")
public class ActionService extends FileRepositoryAction {

	@GET
	@Path("{path: .*}")
	public void resource(@PathParam("path") String path, @QueryParam("token") String token,
			@Context HttpServletResponse response) {
		try {
			int index = path.indexOf("/");
			String group = null, file = null;
			if (index > 0) {
				group = path.substring(0, index);
				file = path.substring(index + 1);
			}
			if (group == null || group.isEmpty() || file == null || file.isEmpty()) {
				throw new WebApplicationException(404);
			}
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(FileRepositoryAction.CRITERIA_CONDITION_ALIAS_FOLDER);
			condition.setValue(group);
			condition = criteria.getConditions().create();
			condition.setAlias(FileRepositoryAction.CRITERIA_CONDITION_ALIAS_INCLUDE_SUBFOLDER);
			condition.setValue(emYesNo.YES);
			IOperationResult<FileItem> operationResult = this.fetch(criteria, token);
			for (FileItem item : operationResult.getResultObjects()) {
				String location = item.getPath().substring(item.getPath().indexOf(group)).replace(File.separator, "/");
				if (location.equalsIgnoreCase(path)) {
					// 设置内容类型
					response.setContentType(this.getContentType(item));
					// 写入响应输出流
					item.writeTo(response.getOutputStream());
					// 提交
					response.getOutputStream().flush();
					return;
				}
			}
			throw new WebApplicationException(404);
		} catch (WebApplicationException e) {
			throw e;
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@Override
	protected String getContentType(String filePath) {
		if (filePath.endsWith(".js")) {
			return "application/javascript";
		}
		return super.getContentType(filePath);
	}

	@POST
	@Path("uploadPackage")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationResult<ActionPackage> uploadPackage(FormDataMultiPart formData,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		try {
			FormDataBodyPart bodyPart;
			FileData fileData = new FileData();
			for (BodyPart bodyItem : formData.getBodyParts()) {
				if (bodyItem instanceof FormDataBodyPart) {
					bodyPart = (FormDataBodyPart) bodyItem;
					if ("FILE".equalsIgnoreCase(bodyPart.getName())) {
						fileData.setStream(bodyPart.getValueAs(InputStream.class));
						fileData.setOriginalName(
								URLDecoder.decode(bodyPart.getContentDisposition().getFileName(), "UTF-8"));
					}
				}
			}
			if (fileData.getStream() != null) {
				try (FileRepository fileRepository = new FileRepository()) {
					fileRepository.setRepositoryFolder(MyConfiguration.getTempFolder());
					IOperationResult<FileItem> opRsltFile = fileRepository.save(fileData);
					if (opRsltFile.getError() != null) {
						throw opRsltFile.getError();
					}
					FileItem fileItem = opRsltFile.getResultObjects().firstOrDefault();
					if (fileItem == null) {
						throw new Exception(I18N.prop("msg_ig_package_parsing_failure"));
					}
					return this.registerPackage(new File(fileItem.getPath()),
							MyConfiguration.optToken(authorization, token));
				}
			} else {
				return new OperationResult<>();
			}
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	/**
	 * 删除集成动作组
	 * 
	 * @param id    动作标记
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("deletePackage")
	public OperationMessage deletePackage(@QueryParam("group") String group,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.deletePackage(group, MyConfiguration.optToken(authorization, token));
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchPackage")
	public OperationResult<ActionPackage> fetchPackage(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchPackage(criteria, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-集成动作
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchAction")
	public OperationResult<Action> fetchAction(Criteria criteria, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.fetchAction(criteria, MyConfiguration.optToken(authorization, token));
	}
	// --------------------------------------------------------------------------------------------//

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("commentPackage")
	public OperationMessage commentPackage(KeyText content, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		return super.commentPackage(content, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//
	/**
	 * 执行后台服务
	 * 
	 * @param formData 参数
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Path("goAction")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public OperationMessage goAction(FormDataMultiPart formData, @HeaderParam("authorization") String authorization,
			@QueryParam("token") String token) {
		try {
			FormDataBodyPart fieldGroup = formData.getField("ACTION_GROUP");
			if (fieldGroup == null) {
				throw new NotFoundException("ACTION_GROUP");
			}
			FormDataBodyPart fieldName = formData.getField("ACTION_NAME");
			if (fieldName == null) {
				throw new NotFoundException("ACTION_NAME");
			}
			StringBuilder stringBuilder = new StringBuilder();
			stringBuilder.append(fieldGroup.getValue());
			stringBuilder.append(File.separator);
			stringBuilder.append("services");
			stringBuilder.append(File.separator);
			stringBuilder.append(fieldName.getValue());
			if (!fieldName.getValue().endsWith(".xml")) {
				stringBuilder.append(".xml");
			}
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(FileRepositoryAction.CONDITION_ALIAS_FILE_NAME);
			condition.setValue(stringBuilder.toString());
			IOperationResult<FileItem> operationResult = this.fetch(criteria,
					MyConfiguration.optToken(authorization, token));
			FileItem fileItem = operationResult.getResultObjects().firstOrDefault();
			if (fileItem == null) {
				throw new FileNotFoundException(stringBuilder.toString());
			}
			// 序列化内容
			ISerializer serializer = SerializationFactory.createManager().create("xml");
			Object data = serializer.deserialize(new FileInputStream(fileItem.getPath()), BOStatusAction.class,
					BOPropertyValue.class, Condition.class);
			if (!(data instanceof BOStatusAction)) {
				throw new Exception(I18N.prop("msg_bobas_invalid_data"));
			}
			BOStatusAction action = (BOStatusAction) data;
			// 设置参数
			action.addConfig(BOStatusAction.CONFIG_ITEM_USER_TOKEN, MyConfiguration.optToken(authorization, token));
			for (List<FormDataBodyPart> items : formData.getFields().values()) {
				if (items == null) {
					continue;
				}
				for (FormDataBodyPart item : items) {
					if (item.getName().startsWith("ACTION_")) {
						continue;
					}
					action.addConfig(item.getName(), item.getValue());
				}
			}
			// 运行
			action.go();
			return new OperationMessage(0, String.format("%s - %s", action.getId(), action.getName()));
		} catch (Exception e) {
			Logger.log(e);
			return new OperationMessage(e);
		}
	}
	// --------------------------------------------------------------------------------------------//
}
