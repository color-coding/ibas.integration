package org.colorcoding.ibas.integration.bo.integrationjob;

import org.colorcoding.ibas.bobas.bo.IBOSimpleLine;
import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.integration.data.emActionRelationship;

/**
 * 集成任务-动作 接口
 * 
 */
public interface IIntegrationJobAction extends IBOSimpleLine {

	/**
	 * 获取-对象编号
	 * 
	 * @return 值
	 */
	Integer getObjectKey();

	/**
	 * 设置-对象编号
	 * 
	 * @param value 值
	 */
	void setObjectKey(Integer value);

	/**
	 * 获取-对象行号
	 * 
	 * @return 值
	 */
	Integer getLineId();

	/**
	 * 设置-对象行号
	 * 
	 * @param value 值
	 */
	void setLineId(Integer value);

	/**
	 * 获取-对象类型
	 * 
	 * @return 值
	 */
	String getObjectCode();

	/**
	 * 设置-对象类型
	 * 
	 * @param value 值
	 */
	void setObjectCode(String value);

	/**
	 * 获取-实例号
	 * 
	 * @return 值
	 */
	Integer getLogInst();

	/**
	 * 设置-实例号
	 * 
	 * @param value 值
	 */
	void setLogInst(Integer value);

	/**
	 * 获取-数据源
	 * 
	 * @return 值
	 */
	String getDataSource();

	/**
	 * 设置-数据源
	 * 
	 * @param value 值
	 */
	void setDataSource(String value);

	/**
	 * 获取-创建日期
	 * 
	 * @return 值
	 */
	DateTime getCreateDate();

	/**
	 * 设置-创建日期
	 * 
	 * @param value 值
	 */
	void setCreateDate(DateTime value);

	/**
	 * 获取-创建时间
	 * 
	 * @return 值
	 */
	Short getCreateTime();

	/**
	 * 设置-创建时间
	 * 
	 * @param value 值
	 */
	void setCreateTime(Short value);

	/**
	 * 获取-更新日期
	 * 
	 * @return 值
	 */
	DateTime getUpdateDate();

	/**
	 * 设置-更新日期
	 * 
	 * @param value 值
	 */
	void setUpdateDate(DateTime value);

	/**
	 * 获取-更新时间
	 * 
	 * @return 值
	 */
	Short getUpdateTime();

	/**
	 * 设置-更新时间
	 * 
	 * @param value 值
	 */
	void setUpdateTime(Short value);

	/**
	 * 获取-创建用户
	 * 
	 * @return 值
	 */
	Integer getCreateUserSign();

	/**
	 * 设置-创建用户
	 * 
	 * @param value 值
	 */
	void setCreateUserSign(Integer value);

	/**
	 * 获取-更新用户
	 * 
	 * @return 值
	 */
	Integer getUpdateUserSign();

	/**
	 * 设置-更新用户
	 * 
	 * @param value 值
	 */
	void setUpdateUserSign(Integer value);

	/**
	 * 获取-创建动作标识
	 * 
	 * @return 值
	 */
	String getCreateActionId();

	/**
	 * 设置-创建动作标识
	 * 
	 * @param value 值
	 */
	void setCreateActionId(String value);

	/**
	 * 获取-更新动作标识
	 * 
	 * @return 值
	 */
	String getUpdateActionId();

	/**
	 * 设置-更新动作标识
	 * 
	 * @param value 值
	 */
	void setUpdateActionId(String value);

	/**
	 * 获取-与上一个动作的关系
	 * 
	 * @return 值
	 */
	emActionRelationship getRelationship();

	/**
	 * 设置-与上一个动作的关系
	 * 
	 * @param value 值
	 */
	void setRelationship(emActionRelationship value);

	/**
	 * 获取-任务项组
	 * 
	 * @return 值
	 */
	String getActionGroup();

	/**
	 * 设置-任务项组
	 * 
	 * @param value 值
	 */
	void setActionGroup(String value);

	/**
	 * 获取-任务项标识
	 * 
	 * @return 值
	 */
	String getActionId();

	/**
	 * 设置-任务项标识
	 * 
	 * @param value 值
	 */
	void setActionId(String value);

	/**
	 * 获取-任务项名称
	 * 
	 * @return 值
	 */
	String getActionName();

	/**
	 * 设置-任务项名称
	 * 
	 * @param value 值
	 */
	void setActionName(String value);

	/**
	 * 获取-任务项说明
	 * 
	 * @return 值
	 */
	String getActionRemark();

	/**
	 * 设置-任务项说明
	 * 
	 * @param value 值
	 */
	void setActionRemark(String value);

	/**
	 * 获取-集成任务-动作-配置集合
	 * 
	 * @return 值
	 */
	IIntegrationJobActionCfgs getIntegrationJobActionCfgs();

	/**
	 * 设置-集成任务-动作-配置集合
	 * 
	 * @param value 值
	 */
	void setIntegrationJobActionCfgs(IIntegrationJobActionCfgs value);

}
