package org.colorcoding.ibas.integration.repository;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.Enumeration;
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
import org.colorcoding.ibas.bobas.data.FileData;
import org.colorcoding.ibas.bobas.data.FileItem;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.bobas.data.List;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.bobas.repository.FileRepository;
import org.colorcoding.ibas.bobas.repository.jersey.FileRepositoryService;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializationException;
import org.colorcoding.ibas.bobas.serialization.SerializationFactory;
import org.colorcoding.ibas.integration.MyConfiguration;
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
	public static final String CRITERIA_CONDITION_ALIAS_PACKAGE = FileRepository.CONDITION_ALIAS_FOLDER;
	public static final String CRITERIA_CONDITION_ALIAS_INCLUDE_SUBFOLDER = FileRepository.CONDITION_ALIAS_INCLUDE_SUBFOLDER;
	public static final String CRITERIA_CONDITION_ALIAS_FOLDER = FileRepository.CONDITION_ALIAS_FOLDER;
	public static final String CRITERIA_CONDITION_ALIAS_FILE_NAME = FileRepository.CONDITION_ALIAS_FILE_NAME;

	public FileRepositoryAction() {
		String workFolder = MyConfiguration.getConfigValue(MyConfiguration.CONFIG_ITEM_ACTION_FOLDER);
		if (workFolder == null || workFolder.isEmpty()) {
			workFolder = MyConfiguration.getDataFolder() + File.separator + "integration_actions";
		}
		File file = new File(workFolder);
		if (!file.exists()) {
			file.mkdirs();
		}
		this.setRepositoryFolder(workFolder);
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
			File folder = new File(this.getRepositoryFolder(), EncryptMD5.md5(file.getPath()));
			// 读取内容
			for (JarEntry jarEntry : jarEntryList) {
				try (InputStream inputStream = jarFile.getInputStream(jarEntry)) {
					FileData fileData = new FileData();
					fileData.setOriginalName(jarEntry.getName());
					fileData.setStream(inputStream);
					fileData.setFileName(folder.getName() + File.separator
							+ jarEntry.getName().substring(
									jarEntry.getName().toLowerCase().indexOf(PACKAGE_INTEGRATION_ACTIONS_FOLDER)
											+ PACKAGE_INTEGRATION_ACTIONS_FOLDER.length()));
					IOperationResult<FileItem> opRsltFile = this.save(fileData);
					if (opRsltFile.getError() != null) {
						// 发生错误，清理已释放文件
						this.deleteFiles(folder);
						throw opRsltFile.getError();
					}
				}
			}
			Logger.log(MessageLevel.DEBUG, "the package [%s] release [%s] files.", file.getName(), jarEntryList.size());
			// 获取注册的动作
			ICriteria criteria = new Criteria();
			ICondition condition = criteria.getConditions().create();
			condition.setAlias(FileRepository.CONDITION_ALIAS_FOLDER);
			condition.setValue(folder.getName());
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
					if (FileRepository.CONDITION_ALIAS_FOLDER.equalsIgnoreCase(iCondition.getAlias())) {
						cCondition = cCriteria.getConditions().create();
						cCondition.setAlias(FileRepository.CONDITION_ALIAS_FOLDER);
						cCondition.setValue(iCondition.getValue());
						cCondition.setBracketOpen(1);
						if (cCriteria.getConditions().size() > 2) {
							cCondition.setRelationship(ConditionRelationship.OR);
						}
						cCondition = cCriteria.getConditions().create();
						cCondition.setAlias(FileRepository.CONDITION_ALIAS_FILE_NAME);
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
					for (Action action : this.parsing(new File(item.getPath()))) {
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
			File folder = new File(this.getRepositoryFolder() + File.separator + name);
			this.deleteFiles(folder);
			Logger.log(MessageLevel.DEBUG, "the action group [%s] was deleted.", name);
			return new OperationMessage();
		} catch (Exception e) {
			Logger.log(e);
			return new OperationMessage(e);
		}
	}

	private List<Action> parsing(File file) throws SerializationException, FileNotFoundException {
		ArrayList<Action> actions = new ArrayList<>();
		if (!file.exists() || !file.isFile()) {
			return actions;
		}
		try (InputStream stream = new FileInputStream(file)) {
			ISerializer serializer = SerializationFactory.createManager().create(TYPE_JSON_NO_ROOT);
			Object values = serializer.deserialize(stream, Action.class);
			if (values != null) {
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
		} catch (IOException e) {
			throw new SerializationException(e);
		}
		// 检查动作
		String group = file.getParentFile().getName();
		for (Action action : actions) {
			if (!action.isActivated()) {
				continue;
			}
			// 设置包名
			action.setGroup(group);
			// 检查id
			if (action.getId() == null || action.getId().isEmpty()) {
				action.setId(EncryptMD5.md5(group, action.getName()));
			}
			// 检查路径
			String path = action.getPath();
			if (path == null || path.isEmpty()) {
				Logger.log(MessageLevel.DEBUG, "action [%s] no path.", action.getName());
				action.setActivated(false);
			}
			path = path.replace(".ts", ".js");
			if (path.startsWith("./")) {
				path = path.substring(2);
			}
			path = path.replace("/", File.separator);
			File pathFile = new File(file.getParentFile().getPath() + File.separator + path);
			if (!pathFile.isFile() || !pathFile.exists()) {
				Logger.log(MessageLevel.DEBUG, "action [%s] path file not exists.", action.getName());
				action.setActivated(false);
			} else {
				// 设置绝对路径
				action.setLocation(pathFile.getAbsolutePath());
			}
		}
		// 删除无效的
		actions.removeIf(c -> !c.isActivated());
		Logger.log(MessageLevel.DEBUG, "the file [%s] has [%s] actions.", file.getName(), actions.size());
		return actions;
	}

	private void deleteFiles(File file) {
		if (!file.exists()) {
			return;
		}
		if (file.isFile()) {
			file.delete();
		} else if (file.isDirectory()) {
			for (File item : file.listFiles()) {
				this.deleteFiles(item);
			}
			file.delete();
		}
	}

	@Override
	public OperationResult<ActionPackage> fetchPackage(ICriteria criteria, String token) {
		try {
			this.setUserToken(token);
			if (criteria == null) {
				criteria = new Criteria();
			}
			OperationResult<ActionPackage> opRsltPackage = new OperationResult<ActionPackage>();
			for (File folder : new File(this.getRepositoryFolder()).listFiles()) {
				if (!folder.isDirectory()) {
					continue;
				}
				ICondition condition = criteria.getConditions()
						.firstOrDefault(c -> CRITERIA_CONDITION_ALIAS_FOLDER.equalsIgnoreCase(c.getAlias()));
				if (condition != null) {
					if (!folder.getName().equalsIgnoreCase(condition.getValue())) {
						continue;
					}
				}
				File aFile = new File(folder.getPath() + File.separator + PACKAGE_INTEGRATION_ACTIONS_FILE);
				if (!aFile.exists() || !aFile.isFile()) {
					continue;
				}
				ActionPackage aPackage = new ActionPackage();
				aPackage.setId(folder.getName());
				aPackage.setDateTime(folder.lastModified());
				aPackage.setActions(this.parsing(aFile).toArray(new Action[] {}));
				// 读取备注文件内容
				aFile = new File(folder.getPath() + File.separator + PACKAGE_INTEGRATION_REMARKS_FILE);
				if (aFile.exists() && aFile.isFile()) {
					try {
						aPackage.setRemarks(
								new String(Files.readAllBytes(Paths.get(aFile.toURI())), StandardCharsets.UTF_8));
					} catch (Exception e) {
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
			File folder = new File(this.getRepositoryFolder() + File.separator + content.getKey());
			if (!folder.exists() || !folder.isDirectory()) {
				throw new Exception(I18N.prop("msg_ig_package_not_exists", content.getKey()));
			}
			if (Strings.isNullOrEmpty(content.getText())) {
				// 空白，则删除原有注释
				File file = new File(folder.getPath(), PACKAGE_INTEGRATION_REMARKS_FILE);
				if (file.exists()) {
					file.delete();
				}
			} else {
				File file = new File(folder.getPath(), PACKAGE_INTEGRATION_REMARKS_FILE);
				if (file.exists()) {
					file.createNewFile();
				}
				try (FileOutputStream fileOutputStream = new FileOutputStream(file)) {
					fileOutputStream.write(content.getText().getBytes());
					fileOutputStream.flush();
				}
			}
			return new OperationMessage();
		} catch (Exception e) {
			Logger.log(e);
			return new OperationMessage(e);
		}
	}

}
