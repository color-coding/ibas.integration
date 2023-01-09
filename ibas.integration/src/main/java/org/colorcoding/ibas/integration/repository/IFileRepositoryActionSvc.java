package org.colorcoding.ibas.integration.repository;

import java.io.File;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.KeyText;
import org.colorcoding.ibas.integration.bo.integration.Action;
import org.colorcoding.ibas.integration.bo.integration.ActionPackage;

public interface IFileRepositoryActionSvc {
	/**
	 * 查询集成动作
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<Action> fetchAction(ICriteria criteria, String token);

	/**
	 * 注册集成任务包
	 * 
	 * @param file  包文件
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationResult<ActionPackage> registerPackage(File file, String token);

	/**
	 * 查询-集成任务包
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	OperationResult<ActionPackage> fetchPackage(ICriteria criteria, String token);

	/**
	 * 删除集成任务包
	 * 
	 * @param name  包名称
	 * @param token 口令
	 * @return 操作结果
	 */
	OperationMessage deletePackage(String name, String token);

	/**
	 * 注释集成任务包
	 * 
	 * @param content 包名称，注释内容
	 * @param token   口令
	 * @return 操作结果
	 */
	OperationMessage commentPackage(KeyText content, String token);

}