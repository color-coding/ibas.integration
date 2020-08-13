package org.colorcoding.ibas.integration.test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.bobas.serialization.ISerializer;
import org.colorcoding.ibas.bobas.serialization.SerializerFactory;
import org.colorcoding.ibas.integration.MyConfiguration;
import org.colorcoding.ibas.integration.action.ActionException;
import org.colorcoding.ibas.integration.action.BOPropertyValue;
import org.colorcoding.ibas.integration.action.BOStatusAction;
import org.colorcoding.ibas.integration.bo.integrationjob.IntegrationJob;
import org.colorcoding.ibas.integration.bo.integrationjob.IntegrationJobAction;
import org.colorcoding.ibas.integration.repository.FileRepositoryAction;

import junit.framework.TestCase;

/**
 * 集成任务 测试
 * 
 */
public class TestIntegrationAction extends TestCase {
	/**
	 * 获取连接口令
	 */
	String getToken() {
		return OrganizationFactory.SYSTEM_USER.getToken();
	}

	/**
	 * 基本项目测试
	 * 
	 * @throws Exception
	 */
	public void testBasicItems() throws Exception {
		// 测试对象的保存和查询
		IOperationResult<?> operationResult = null;
		ICriteria criteria = null;
		FileRepositoryAction boRepository = new FileRepositoryAction();
		File resFolder = new File(MyConfiguration.getWorkFolder());
		resFolder = resFolder.getParentFile().getParentFile().getParentFile();
		File packageFile = new File(
				resFolder.getPath() + File.separator + "release" + File.separator + "ibas.integration.test-0.1.0.war");
		operationResult = boRepository.registerPackage(packageFile, this.getToken());
		if (operationResult.getError() != null) {
			throw operationResult.getError();
		}
		for (Object item : operationResult.getResultObjects()) {
			System.out.println(item.toString());
		}
		System.out.println("-----test-fetch-----");
		criteria = new Criteria();
		operationResult = boRepository.fetchAction(criteria);
		if (operationResult.getError() != null) {
			throw operationResult.getError();
		}
		for (Object item : operationResult.getResultObjects()) {
			System.out.println(item.toString());
		}
	}

	public void testBOStatusAction() throws ActionException {
		MyConfiguration.addConfigValue(MyConfiguration.CONFIG_ITEM_FORMATTED_OUTPUT, true);
		ISerializer<?> serializer = SerializerFactory.create().createManager().create("xml");
		BOStatusAction action = new BOStatusAction();
		action.setBusinessObject(IntegrationJob.class.getName());
		ICondition condition = action.getConditions().create();
		condition.setAlias(IntegrationJob.PROPERTY_BOCODE.getName());
		condition.setValue(BOStatusAction.class.getSimpleName());

		BOPropertyValue propertyValue = action.getPropertyValues().create();
		propertyValue.setProperty(IntegrationJob.PROPERTY_ACTIVATED.getName());
		propertyValue.setValue(emYesNo.YES.toString());
		propertyValue = action.getPropertyValues().create();
		propertyValue.setProperty(String.format("%s.%s", IntegrationJob.PROPERTY_INTEGRATIONJOBACTIONS.getName(),
				IntegrationJobAction.PROPERTY_ACTIONREMARK.getName()));
		propertyValue.setValue("I'm OK.");
		condition = propertyValue.getConditions().create();
		condition.setAlias(IntegrationJobAction.PROPERTY_LINEID.getName());
		condition.setValue(String.format("${%s}", condition.getAlias()));

		ByteArrayOutputStream writer = new ByteArrayOutputStream();
		serializer.serialize(action, writer);
		System.out.println(writer.toString());

		Object data = serializer.deserialize(new ByteArrayInputStream(writer.toByteArray()), BOStatusAction.class);
		System.out.println(data.toString());

		action = (BOStatusAction) data;
		action.addConfig(BOStatusAction.CONFIG_ITEM_USER_TOKEN, this.getToken());
		action.addConfig(IntegrationJobAction.PROPERTY_LINEID.getName(), "1");
		action.go();
	}

}
