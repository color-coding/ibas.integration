package org.colorcoding.ibas.integration.service.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.repository.FileRepository;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializerFactory;
import org.colorcoding.ibas.integration.MyConfiguration;
import org.colorcoding.ibas.integration.action.BOPropertyValue;
import org.colorcoding.ibas.integration.action.BOStatusAction;
import org.colorcoding.ibas.integration.bo.integration.Action;
import org.colorcoding.ibas.integration.bo.integration.ActionPackage;
import org.colorcoding.ibas.integration.repository.FileRepositoryAction;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataMultiPart;
import org.glassfish.jersey.media.multipart.FormDataParam;

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
			IOperationResult<FileData> operationResult = this.fetchFile(criteria, token);
			for (FileData item : operationResult.getResultObjects()) {
				String location = item.getLocation().substring(item.getLocation().indexOf(group))
						.replace(File.separator, "/");
				if (location.equalsIgnoreCase(path)) {
					// 设置内容类型
					response.setContentType(this.getContentType(item));
					// 写入响应输出流
					OutputStream os = response.getOutputStream();
					os.write(item.getFileBytes());
					os.flush();
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
	public OperationResult<ActionPackage> uploadPackage(@FormDataParam("file") InputStream fileStream,
			@FormDataParam("file") FormDataContentDisposition fileDisposition, @QueryParam("token") String token) {
		try {
			FileData fileData = new FileData();
			fileData.setOriginalName(fileDisposition.getFileName());
			fileData.setStream(fileStream);
			FileRepository fileRepository = new FileRepository();
			fileRepository.setRepositoryFolder(MyConfiguration.getTempFolder());
			IOperationResult<FileData> opRsltFile = fileRepository.save(fileData);
			if (opRsltFile.getError() != null) {
				throw opRsltFile.getError();
			}
			fileData = opRsltFile.getResultObjects().firstOrDefault();
			if (fileData == null) {
				throw new Exception(I18N.prop("msg_ig_package_parsing_failure"));
			}
			return this.registerPackage(new File(fileData.getLocation()), token);
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
	public OperationMessage deletePackage(@QueryParam("group") String group, @QueryParam("token") String token) {
		return super.deletePackage(group, token);
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchPackage")
	public OperationResult<ActionPackage> fetchPackage(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchPackage(criteria, token);
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
	public OperationResult<Action> fetchAction(Criteria criteria, @QueryParam("token") String token) {
		return super.fetchAction(criteria, token);
	}

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
	public OperationMessage goAction(FormDataMultiPart formData, @QueryParam("token") String token) {
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
			condition.setAlias(FileRepositoryAction.CRITERIA_CONDITION_ALIAS_FILE_NAME);
			condition.setValue(stringBuilder.toString());
			IOperationResult<FileData> operationResult = this.fetchFile(criteria, token);
			FileData fileData = operationResult.getResultObjects().firstOrDefault();
			if (fileData == null) {
				throw new FileNotFoundException(stringBuilder.toString());
			}
			fileData.setStream(new FileInputStream(fileData.getLocation()));
			// 序列化内容
			ISerializer<?> serializer = SerializerFactory.create().createManager().create("xml");
			Object data = serializer.deserialize(fileData.getStream(), BOStatusAction.class, BOPropertyValue.class,
					Condition.class);
			if (!(data instanceof BOStatusAction)) {
				throw new Exception(I18N.prop("msg_bobas_invalid_data"));
			}
			BOStatusAction action = (BOStatusAction) data;
			// 设置参数
			action.addConfig(BOStatusAction.CONFIG_ITEM_USER_TOKEN, token);
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
