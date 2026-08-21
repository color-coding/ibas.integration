package org.colorcoding.ibas.integration.repository;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.Enumeration;
import java.util.function.Function;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

import org.colorcoding.ibas.bobas.common.ConditionRelationship;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.EncryptMD5;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationMessage;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.common.Strings;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.file.FileData;
import org.colorcoding.ibas.bobas.file.FileItem;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.repository.jersey.FileRepositoryService;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.SerializationFactory;
import org.colorcoding.ibas.integration.bo.integration.Action;
import org.colorcoding.ibas.integration.bo.integration.ActionPackage;

/**
 * 动作文件管理仓库
 *
 * @author Niuren.Zhu
 */
public class FileRepositoryAction extends FileRepositoryService
		implements IFileRepositoryActionApp, IFileRepositoryActionSvc {
	public static final String TYPE_JSON_NO_ROOT = "json_no_root";
	public static final String PACKAGE_INTEGRATION_ACTIONS_FOLDER = "integration/";
	public static final String PACKAGE_INTEGRATION_ACTIONS_FILE = "actions.json";
	public static final String PACKAGE_INTEGRATION_REMARKS_FILE = "remarks.json";
	public static final String CRITERIA_CONDITION_ALIAS_ACTION_ID = "ActionId";

	public FileRepositoryAction() {
		this.setGroupingFiles(false);
		this.setRepositoryFolder("integration_actions");
	}

	@Override
	public IOperationResult<ActionPackage> registerPackage(File file) {
		return this.registerPackage(file, this.getCurrentUser().getToken());
	}

	@Override
	public IOperationResult<Action> fetchAction(ICriteria criteria) {
		return this.fetchAction(criteria, this.getCurrentUser().getToken());
	}

	@Override
	public IOperationMessage deletePackage(String name) {
		return this.deletePackage(name, this.getCurrentUser().getToken());
	}

	@Override
	public IOperationMessage commentPackage(KeyText content) {
		return this.commentPackage(content, this.getCurrentUser().getToken());
	}

	@Override
	public OperationResult<ActionPackage> registerPackage(File file, String token) {
		try (JarFile jarFile = new JarFile(file)) {
			this.setUserToken(token);
			Logger.log(MessageLevel.DEBUG, "the package [%s] begins to be registered.", file.getName());
			ArrayList<JarEntry> jarEntryList = new ArrayList<>();
			Enumeration<JarEntry> jarEntries = jarFile.entries();
			if (jarEntries != null) {
				// 获取集成目录下所有文件
				while (jarEntries.hasMoreElements()) {
					JarEntry jarEntry = (JarEntry) jarEntries.nextElement();
					if (jarEntry.isDirectory()) {
						continue;
					}
					if (!jarEntry.getName().startsWith(PACKAGE_INTEGRATION_ACTIONS_FOLDER)
							&& jarEntry.getName().indexOf("/" + PACKAGE_INTEGRATION_ACTIONS_FOLDER) < 0) {
						continue;
					}
					jarEntryList.add(jarEntry);
				}
			}
			String folder = EncryptMD5.md5(file.getPath());
			// 读取内容
			for (JarEntry jarEntry : jarEntryList) {
				try (InputStream inputStream = jarFile.getInputStream(jarEntry)) {
					try (FileData fileData = new FileData(inputStream)) {
						fileData.setOriginalName(jarEntry.getName());
						fileData.setName(folder + File.separator
								+ jarEntry.getName().substring(
										jarEntry.getName().toLowerCase().indexOf(PACKAGE_INTEGRATION_ACTIONS_FOLDER)
												+ PACKAGE_INTEGRATION_ACTIONS_FOLDER.length()));
						IOperationResult<FileItem> opRsltFile = this.save(fileData);
						if (opRsltFile.getError() != null) {
							throw opRsltFile.getError();
						}
					}
				}
			}
			Logger.log(MessageLevel.DEBUG, "the package [%s] release [%s] files.", file.getName(), jarEntryList.size());
			// 获取注册的动作
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(CONDITION_ALIAS_FILE_FOLDER);
			condition.setValue(folder);
			return this.fetchPackage(criteria, this.getCurrentUser().getToken());
		} catch (Exception e) {
			Logger.log(e);
			return new OperationResult<>(e);
		}
	}

	@Override
	public OperationResult<Action> fetchAction(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			if (criteria == null) {
				criteria = new Criteria();
			}
			int cBracket = -1;
			ICriteria cCriteria = null;
			ICondition cCondition = null;
			List<ICriteria> criterias = new ArrayList<>();
			// 按括号分组
			for (ICondition iCondition : criteria.getConditions()) {
				if (cCriteria == null) {
					cCriteria = new Criteria();
					criterias.add(cCriteria);
					cBracket = iCondition.getBracketOpen();
				} else if (iCondition.getBracketOpen() > 0) {
					cBracket += iCondition.getBracketOpen();
				}
				cCriteria.getConditions().add(iCondition);
				if (iCondition.getBracketClose() > 0) {
					cBracket -= iCondition.getBracketClose();
				}
				if (cBracket <= 0) {
					cCriteria = null;
				}
			}
			IOperationResult<FileItem> opRsltFile = null;
			OperationResult<Action> operationResult = new OperationResult<>();
			// 按文件夹查询
			for (ICriteria iCriteria : criterias) {
				// 获取文件夹里的配置文件
				cCriteria = new Criteria();
				for (ICondition iCondition : iCriteria.getConditions()) {
					if (CONDITION_ALIAS_FILE_FOLDER.equalsIgnoreCase(iCondition.getAlias())) {
						cCondition = cCriteria.getConditions().create();
						cCondition.setAlias(CONDITION_ALIAS_FILE_FOLDER);
						cCondition.setValue(iCondition.getValue());
						cCondition.setBracketOpen(1);
						if (cCriteria.getConditions().size() > 2) {
							cCondition.setRelationship(ConditionRelationship.OR);
						}
						cCondition = cCriteria.getConditions().create();
						cCondition.setAlias(CONDITION_ALIAS_FILE_NAME);
						cCondition.setValue(PACKAGE_INTEGRATION_ACTIONS_FILE);
						cCondition.setBracketClose(1);
					}
				}
				// 没有文件夹信息，处理下一条
				if (cCriteria.getConditions().isEmpty()) {
					continue;
				}
				opRsltFile = this.fetch(cCriteria, token);
				if (opRsltFile.getError() != null) {
					throw opRsltFile.getError();
				}
				// 带查询的动作ID
				cCriteria.getConditions().clear();
				for (ICondition iCondition : iCriteria.getConditions()) {
					if (!CRITERIA_CONDITION_ALIAS_ACTION_ID.equalsIgnoreCase(iCondition.getAlias())) {
						continue;
					}
					cCondition = cCriteria.getConditions().create();
					cCondition.setAlias(iCondition.getAlias());
					cCondition.setValue(iCondition.getValue());
				}
				// 解析配置文件
				boolean filter = false;
				for (FileItem item : opRsltFile.getResultObjects()) {
					for (Action action : this.parsing(item)) {
						if (cCriteria.getConditions().isEmpty()) {
							operationResult.addResultObjects(action);
						} else {
							filter = true;
							for (ICondition iCondition : cCriteria.getConditions()) {
								if (action.getId().equalsIgnoreCase(iCondition.getValue())) {
									filter = false;
									break;
								}
							}
							if (!filter) {
								operationResult.addResultObjects(action);
							}
						}
					}
				}
			}
			return operationResult;
		} catch (Exception e) {
			Logger.log(e);
			return new OperationResult<>(e);
		}
	}

	@Override
	public OperationMessage deletePackage(String name, String token) {
		try {
			this.setUserToken(token);
			Criteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(CONDITION_ALIAS_INCLUDE_SUBFOLDER);
			condition.setValue(emYesNo.YES);
			condition = criteria.getConditions().create();
			condition.setAlias(CONDITION_ALIAS_FILE_FOLDER);
			condition.setValue(name);
			IOperationResult<FileItem> operationResult = this.delete(criteria);
			if (operationResult.getError() != null) {
				throw operationResult.getError();
			}
			return new OperationMessage();
		} catch (Exception e) {
			Logger.log(e);
			return new OperationMessage(e);
		}
	}

	private List<Action> parsing(FileItem fileItem) throws SerializationException, IOException {
		ArrayList<Action> actions = new ArrayList<>();
		ISerializer serializer = SerializationFactory.createManager().create(TYPE_JSON_NO_ROOT);
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
			fileItem.writeTo(outputStream);
			try (ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray())) {
				Object values = serializer.deserialize(inputStream, Action.class);
				if (values instanceof Action) {
					actions.add((Action) values);
				} else if (values instanceof Iterable) {
					for (Object value : (Iterable<?>) values) {
						if (value instanceof Action) {
							actions.add((Action) value);
						}
					}
				} else if (values.getClass().isArray()) {
					for (int i = 0; i < Array.getLength(values); i++) {
						Object value = Array.get(values, i);
						if (value instanceof Action) {
							actions.add((Action) value);
						}
					}
				}
			}
		}
		for (Action action : actions) {
			action.setGroup(this.groupOf(fileItem.getPath()));
			if (Strings.isNullOrEmpty(action.getId())) {
				action.setId(EncryptMD5.md5(action.getGroup(), action.getName()));
			}
		}
		Logger.log(MessageLevel.DEBUG, "the file [%s] has [%s] actions.", fileItem.getName(), actions.size());
		return actions;
	}

	private String groupOf(String filePath) {
		String tmpValue = filePath.substring(filePath.indexOf(FileRepositoryAction.this.getRepositoryFolder()));
		return tmpValue.replace("\\", "/").split("/")[1];
	}

	@Override
	public OperationResult<ActionPackage> fetchPackage(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			if (criteria == null) {
				criteria = new Criteria();
			}
			if (!criteria.getConditions()
					.contains(c -> Strings.equalsIgnoreCase(c.getAlias(), CONDITION_ALIAS_INCLUDE_SUBFOLDER))) {
				ICondition condition = criteria.getConditions().create();
				condition.setAlias(CONDITION_ALIAS_INCLUDE_SUBFOLDER);
				condition.setValue(emYesNo.YES);
			}
			OperationResult<FileItem> opRsltFiles = this.fetch(criteria);
			if (opRsltFiles.getError() != null) {
				throw opRsltFiles.getError();
			}
			List<FileItem> actionFiles = new ArrayList<>();
			ICondition condition = criteria.getConditions()
					.firstOrDefault(c -> CONDITION_ALIAS_FILE_FOLDER.equalsIgnoreCase(c.getAlias())
							&& !Strings.isNullOrEmpty(c.getValue()));
			for (FileItem fileItem : opRsltFiles.getResultObjects()) {
				if (condition != null) {
					if (fileItem.getPath().indexOf(condition.getValue()) < 0) {
						continue;
					}
				}
				actionFiles.add(fileItem);
			}
			Function<Action, Boolean> fileExists = new Function<Action, Boolean>() {

				@Override
				public Boolean apply(Action action) {
					String filePath;
					String actionPath = action.getPath();
					if (Strings.indexOf(actionPath, Strings.VALUE_DOT) > 0) {
						actionPath = Strings.concat(action.getGroup(), Strings.VALUE_SLASH,
								actionPath.substring(0, actionPath.lastIndexOf(Strings.VALUE_DOT)));
					}
					for (FileItem fileItem : actionFiles) {
						filePath = fileItem.relativePath();
						if (fileItem.getName().indexOf(Strings.VALUE_DOT) > 0) {
							filePath = filePath.substring(0, filePath.lastIndexOf(Strings.VALUE_DOT));
						}
						if (Strings.equalsIgnoreCase(actionPath, filePath)) {
							return true;
						}
					}
					return false;
				}
			};
			OperationResult<ActionPackage> opRsltPackage = new OperationResult<ActionPackage>();
			for (FileItem actionFile : actionFiles
					.where(c -> Strings.equalsIgnoreCase(c.getName(), PACKAGE_INTEGRATION_ACTIONS_FILE))) {
				ActionPackage aPackage = new ActionPackage();
				aPackage.setId(this.groupOf(actionFile.getPath()));
				aPackage.setDateTime(actionFile.getModifyTime().getTime());
				// 读取动作文件内容
				for (Action action : this.parsing(actionFile)) {
					if (!fileExists.apply(action)) {
						continue;
					}
					aPackage.getActions().add(action);
				}
				// 读取备注文件内容
				actionFile = actionFiles.firstOrDefault(c -> c.getPath().indexOf(aPackage.getId()) >= 0
						&& Strings.equalsIgnoreCase(c.getName(), PACKAGE_INTEGRATION_REMARKS_FILE));
				if (actionFile != null) {
					try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
						actionFile.writeTo(outputStream);
						aPackage.setRemarks(new String(outputStream.toByteArray(), StandardCharsets.UTF_8));
					}
				}
				opRsltPackage.addResultObjects(aPackage);
			}
			// 按日期排序
			opRsltPackage.getResultObjects().sort(new Comparator<ActionPackage>() {

				@Override
				public int compare(ActionPackage o1, ActionPackage o2) {
					return Long.compare(o2.getDateTime(), o1.getDateTime());
				}
			});
			return opRsltPackage;
		} catch (Exception e) {
			Logger.log(e);
			return new OperationResult<>(e);
		}
	}

	@Override
	public IOperationResult<ActionPackage> fetchPackage(ICriteria criteria) {
		return this.fetchPackage(criteria, this.getCurrentUser().getToken());
	}

	@Override
	public OperationMessage commentPackage(KeyText content, String token) {
		try {
			this.setUserToken(token);
			try (ByteArrayInputStream inputStream = new ByteArrayInputStream(
					Strings.isNullOrEmpty(content.getText()) ? Strings.VALUE_EMPTY.getBytes(StandardCharsets.UTF_8)
							: content.getText().getBytes(StandardCharsets.UTF_8))) {
				try (FileData fileData = new FileData(inputStream)) {
					fileData.setName(content.getKey() + File.separator + PACKAGE_INTEGRATION_REMARKS_FILE);
					IOperationResult<FileItem> opRslt = this.save(fileData);
					if (opRslt.getError() != null) {
						throw opRslt.getError();
					}
				}
			}
			return new OperationMessage();
		} catch (Exception e) {
			Logger.log(e);
			return new OperationMessage(e);
		}
	}

}
