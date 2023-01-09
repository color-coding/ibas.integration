package org.colorcoding.ibas.integration.repository;

import java.io.File;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationMessage;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.integration.bo.integration.Action;
import org.colorcoding.ibas.integration.bo.integration.ActionPackage;

public interface IFileRepositoryActionApp {
	/**
	 * 查询集成动作
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<Action> fetchAction(ICriteria criteria);

	/**
	 * 注册集成任务包
	 * 
	 * @param file 包文件
	 * @return 操作结果
	 */
	IOperationResult<ActionPackage> registerPackage(File file);

	/**
	 * 查询-集成任务包
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<ActionPackage> fetchPackage(ICriteria criteria);

	/**
	 * 删除集成任务包
	 * 
	 * @param name 包名称
	 * @return 操作结果
	 */
	IOperationMessage deletePackage(String name);

	/**
	 * 注释集成任务包
	 * 
	 * @param content 包名称，注释内容
	 * @return 操作结果
	 */
	IOperationMessage commentPackage(KeyText content);
}