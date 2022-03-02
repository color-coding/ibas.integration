package org.colorcoding.ibas.integration.bo.integrationjob;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.integration.MyConfiguration;
import org.colorcoding.ibas.integration.data.emActionRelationship;

/**
 * 获取-集成任务-动作
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = IntegrationJobAction.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class IntegrationJobAction extends BusinessObject<IntegrationJobAction> implements IIntegrationJobAction {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 1926415657422189429L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = IntegrationJobAction.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_IG_JOB1";

	/**
	 * 业务对象编码
	 */
	public static final String BUSINESS_OBJECT_CODE = "${Company}_IG_INTERGRATIONJOB";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "IntegrationJobAction";

	/**
	 * 属性名称-对象编号
	 */
	private static final String PROPERTY_OBJECTKEY_NAME = "ObjectKey";

	/**
	 * 对象编号 属性
	 */
	@DbField(name = "ObjectKey", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_OBJECTKEY = registerProperty(PROPERTY_OBJECTKEY_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTKEY_NAME)
	public final Integer getObjectKey() {
		return this.getProperty(PROPERTY_OBJECTKEY);
	}

	/**
	 * 设置-对象编号
	 * 
	 * @param value 值
	 */
	public final void setObjectKey(Integer value) {
		this.setProperty(PROPERTY_OBJECTKEY, value);
	}

	/**
	 * 属性名称-对象行号
	 */
	private static final String PROPERTY_LINEID_NAME = "LineId";

	/**
	 * 对象行号 属性
	 */
	@DbField(name = "LineId", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<Integer> PROPERTY_LINEID = registerProperty(PROPERTY_LINEID_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-对象行号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LINEID_NAME)
	public final Integer getLineId() {
		return this.getProperty(PROPERTY_LINEID);
	}

	/**
	 * 设置-对象行号
	 * 
	 * @param value 值
	 */
	public final void setLineId(Integer value) {
		this.setProperty(PROPERTY_LINEID, value);
	}

	/**
	 * 属性名称-对象类型
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 对象类型 属性
	 */
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-对象类型
	 * 
	 * @param value 值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-实例号
	 */
	private static final String PROPERTY_LOGINST_NAME = "LogInst";

	/**
	 * 实例号 属性
	 */
	@DbField(name = "LogInst", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_LOGINST = registerProperty(PROPERTY_LOGINST_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-实例号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_LOGINST_NAME)
	public final Integer getLogInst() {
		return this.getProperty(PROPERTY_LOGINST);
	}

	/**
	 * 设置-实例号
	 * 
	 * @param value 值
	 */
	public final void setLogInst(Integer value) {
		this.setProperty(PROPERTY_LOGINST, value);
	}

	/**
	 * 属性名称-数据源
	 */
	private static final String PROPERTY_DATASOURCE_NAME = "DataSource";

	/**
	 * 数据源 属性
	 */
	@DbField(name = "DataSource", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_DATASOURCE = registerProperty(PROPERTY_DATASOURCE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-数据源
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DATASOURCE_NAME)
	public final String getDataSource() {
		return this.getProperty(PROPERTY_DATASOURCE);
	}

	/**
	 * 设置-数据源
	 * 
	 * @param value 值
	 */
	public final void setDataSource(String value) {
		this.setProperty(PROPERTY_DATASOURCE, value);
	}

	/**
	 * 属性名称-创建日期
	 */
	private static final String PROPERTY_CREATEDATE_NAME = "CreateDate";

	/**
	 * 创建日期 属性
	 */
	@DbField(name = "CreateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_CREATEDATE = registerProperty(PROPERTY_CREATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-创建日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEDATE_NAME)
	public final DateTime getCreateDate() {
		return this.getProperty(PROPERTY_CREATEDATE);
	}

	/**
	 * 设置-创建日期
	 * 
	 * @param value 值
	 */
	public final void setCreateDate(DateTime value) {
		this.setProperty(PROPERTY_CREATEDATE, value);
	}

	/**
	 * 属性名称-创建时间
	 */
	private static final String PROPERTY_CREATETIME_NAME = "CreateTime";

	/**
	 * 创建时间 属性
	 */
	@DbField(name = "CreateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_CREATETIME = registerProperty(PROPERTY_CREATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-创建时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATETIME_NAME)
	public final Short getCreateTime() {
		return this.getProperty(PROPERTY_CREATETIME);
	}

	/**
	 * 设置-创建时间
	 * 
	 * @param value 值
	 */
	public final void setCreateTime(Short value) {
		this.setProperty(PROPERTY_CREATETIME, value);
	}

	/**
	 * 属性名称-更新日期
	 */
	private static final String PROPERTY_UPDATEDATE_NAME = "UpdateDate";

	/**
	 * 更新日期 属性
	 */
	@DbField(name = "UpdateDate", type = DbFieldType.DATE, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<DateTime> PROPERTY_UPDATEDATE = registerProperty(PROPERTY_UPDATEDATE_NAME,
			DateTime.class, MY_CLASS);

	/**
	 * 获取-更新日期
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEDATE_NAME)
	public final DateTime getUpdateDate() {
		return this.getProperty(PROPERTY_UPDATEDATE);
	}

	/**
	 * 设置-更新日期
	 * 
	 * @param value 值
	 */
	public final void setUpdateDate(DateTime value) {
		this.setProperty(PROPERTY_UPDATEDATE, value);
	}

	/**
	 * 属性名称-更新时间
	 */
	private static final String PROPERTY_UPDATETIME_NAME = "UpdateTime";

	/**
	 * 更新时间 属性
	 */
	@DbField(name = "UpdateTime", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Short> PROPERTY_UPDATETIME = registerProperty(PROPERTY_UPDATETIME_NAME,
			Short.class, MY_CLASS);

	/**
	 * 获取-更新时间
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATETIME_NAME)
	public final Short getUpdateTime() {
		return this.getProperty(PROPERTY_UPDATETIME);
	}

	/**
	 * 设置-更新时间
	 * 
	 * @param value 值
	 */
	public final void setUpdateTime(Short value) {
		this.setProperty(PROPERTY_UPDATETIME, value);
	}

	/**
	 * 属性名称-创建用户
	 */
	private static final String PROPERTY_CREATEUSERSIGN_NAME = "CreateUserSign";

	/**
	 * 创建用户 属性
	 */
	@DbField(name = "Creator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_CREATEUSERSIGN = registerProperty(PROPERTY_CREATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-创建用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEUSERSIGN_NAME)
	public final Integer getCreateUserSign() {
		return this.getProperty(PROPERTY_CREATEUSERSIGN);
	}

	/**
	 * 设置-创建用户
	 * 
	 * @param value 值
	 */
	public final void setCreateUserSign(Integer value) {
		this.setProperty(PROPERTY_CREATEUSERSIGN, value);
	}

	/**
	 * 属性名称-更新用户
	 */
	private static final String PROPERTY_UPDATEUSERSIGN_NAME = "UpdateUserSign";

	/**
	 * 更新用户 属性
	 */
	@DbField(name = "Updator", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_UPDATEUSERSIGN = registerProperty(PROPERTY_UPDATEUSERSIGN_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-更新用户
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEUSERSIGN_NAME)
	public final Integer getUpdateUserSign() {
		return this.getProperty(PROPERTY_UPDATEUSERSIGN);
	}

	/**
	 * 设置-更新用户
	 * 
	 * @param value 值
	 */
	public final void setUpdateUserSign(Integer value) {
		this.setProperty(PROPERTY_UPDATEUSERSIGN, value);
	}

	/**
	 * 属性名称-创建动作标识
	 */
	private static final String PROPERTY_CREATEACTIONID_NAME = "CreateActionId";

	/**
	 * 创建动作标识 属性
	 */
	@DbField(name = "CreateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_CREATEACTIONID = registerProperty(PROPERTY_CREATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-创建动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_CREATEACTIONID_NAME)
	public final String getCreateActionId() {
		return this.getProperty(PROPERTY_CREATEACTIONID);
	}

	/**
	 * 设置-创建动作标识
	 * 
	 * @param value 值
	 */
	public final void setCreateActionId(String value) {
		this.setProperty(PROPERTY_CREATEACTIONID, value);
	}

	/**
	 * 属性名称-更新动作标识
	 */
	private static final String PROPERTY_UPDATEACTIONID_NAME = "UpdateActionId";

	/**
	 * 更新动作标识 属性
	 */
	@DbField(name = "UpdateActId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_UPDATEACTIONID = registerProperty(PROPERTY_UPDATEACTIONID_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-更新动作标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_UPDATEACTIONID_NAME)
	public final String getUpdateActionId() {
		return this.getProperty(PROPERTY_UPDATEACTIONID);
	}

	/**
	 * 设置-更新动作标识
	 * 
	 * @param value 值
	 */
	public final void setUpdateActionId(String value) {
		this.setProperty(PROPERTY_UPDATEACTIONID, value);
	}

	/**
	 * 属性名称-与上一个动作的关系
	 */
	private static final String PROPERTY_RELATIONSHIP_NAME = "Relationship";

	/**
	 * 与上一个动作的关系 属性
	 */
	@DbField(name = "Relationship", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<emActionRelationship> PROPERTY_RELATIONSHIP = registerProperty(
			PROPERTY_RELATIONSHIP_NAME, emActionRelationship.class, MY_CLASS);

	/**
	 * 获取-与上一个动作的关系
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_RELATIONSHIP_NAME)
	public final emActionRelationship getRelationship() {
		return this.getProperty(PROPERTY_RELATIONSHIP);
	}

	/**
	 * 设置-与上一个动作的关系
	 * 
	 * @param value 值
	 */
	public final void setRelationship(emActionRelationship value) {
		this.setProperty(PROPERTY_RELATIONSHIP, value);
	}

	/**
	 * 属性名称-任务项组
	 */
	private static final String PROPERTY_ACTIONGROUP_NAME = "ActionGroup";

	/**
	 * 任务项组 属性
	 */
	@DbField(name = "ActionGroup", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME)
	public static final IPropertyInfo<String> PROPERTY_ACTIONGROUP = registerProperty(PROPERTY_ACTIONGROUP_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-任务项组
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ACTIONGROUP_NAME)
	public final String getActionGroup() {
		return this.getProperty(PROPERTY_ACTIONGROUP);
	}

	/**
	 * 设置-任务项组
	 * 
	 * @param value 值
	 */
	public final void setActionGroup(String value) {
		this.setProperty(PROPERTY_ACTIONGROUP, value);
	}

	/**
	 * 属性名称-任务项标识
	 */
	private static final String PROPERTY_ACTIONID_NAME = "ActionId";

	/**
	 * 任务项标识 属性
	 */
	@DbField(name = "ActionId", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ACTIONID = registerProperty(PROPERTY_ACTIONID_NAME, String.class,
			MY_CLASS);

	/**
	 * 获取-任务项标识
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ACTIONID_NAME)
	public final String getActionId() {
		return this.getProperty(PROPERTY_ACTIONID);
	}

	/**
	 * 设置-任务项标识
	 * 
	 * @param value 值
	 */
	public final void setActionId(String value) {
		this.setProperty(PROPERTY_ACTIONID, value);
	}

	/**
	 * 属性名称-任务项名称
	 */
	private static final String PROPERTY_ACTIONNAME_NAME = "ActionName";

	/**
	 * 任务项名称 属性
	 */
	@DbField(name = "ActionName", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ACTIONNAME = registerProperty(PROPERTY_ACTIONNAME_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-任务项名称
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ACTIONNAME_NAME)
	public final String getActionName() {
		return this.getProperty(PROPERTY_ACTIONNAME);
	}

	/**
	 * 设置-任务项名称
	 * 
	 * @param value 值
	 */
	public final void setActionName(String value) {
		this.setProperty(PROPERTY_ACTIONNAME, value);
	}

	/**
	 * 属性名称-任务项说明
	 */
	private static final String PROPERTY_ACTIONREMARK_NAME = "ActionRemark";

	/**
	 * 任务项说明 属性
	 */
	@DbField(name = "ActionRemark", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<String> PROPERTY_ACTIONREMARK = registerProperty(PROPERTY_ACTIONREMARK_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-任务项说明
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_ACTIONREMARK_NAME)
	public final String getActionRemark() {
		return this.getProperty(PROPERTY_ACTIONREMARK);
	}

	/**
	 * 设置-任务项说明
	 * 
	 * @param value 值
	 */
	public final void setActionRemark(String value) {
		this.setProperty(PROPERTY_ACTIONREMARK, value);
	}

	/**
	 * 属性名称-集成任务-动作-配置
	 */
	private static final String PROPERTY_INTEGRATIONJOBACTIONCFGS_NAME = "IntegrationJobActionCfgs";

	/**
	 * 集成任务-动作-配置的集合属性
	 * 
	 */
	public static final IPropertyInfo<IIntegrationJobActionCfgs> PROPERTY_INTEGRATIONJOBACTIONCFGS = registerProperty(
			PROPERTY_INTEGRATIONJOBACTIONCFGS_NAME, IIntegrationJobActionCfgs.class, MY_CLASS);

	/**
	 * 获取-集成任务-动作-配置集合
	 * 
	 * @return 值
	 */
	@XmlElementWrapper(name = PROPERTY_INTEGRATIONJOBACTIONCFGS_NAME)
	@XmlElement(name = IntegrationJobActionCfg.BUSINESS_OBJECT_NAME, type = IntegrationJobActionCfg.class)
	public final IIntegrationJobActionCfgs getIntegrationJobActionCfgs() {
		return this.getProperty(PROPERTY_INTEGRATIONJOBACTIONCFGS);
	}

	/**
	 * 设置-集成任务-动作-配置集合
	 * 
	 * @param value 值
	 */
	public final void setIntegrationJobActionCfgs(IIntegrationJobActionCfgs value) {
		this.setProperty(PROPERTY_INTEGRATIONJOBACTIONCFGS, value);
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();// 基类初始化，不可去除
		this.setIntegrationJobActionCfgs(new IntegrationJobActionCfgs(this));
		this.setObjectCode(MyConfiguration.applyVariables(BUSINESS_OBJECT_CODE));

	}

}
