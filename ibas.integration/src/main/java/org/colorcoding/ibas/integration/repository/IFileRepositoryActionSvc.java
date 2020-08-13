package org.colorcoding.ibas.integration.repository;

import java.io.File;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationMessage;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.data.FileData;
import org.colorcoding.ibas.integration.bo.integration.Action;
import org.colorcoding.ibas.integration.bo.integration.ActionPackage;

public interface IFileRepositoryActionSvc {

	OperationResult<Action> fetchAction(ICriteria criteria, String token);

	OperationResult<FileData> fetchFile(ICriteria criteria, String token);

	OperationResult<ActionPackage> registerPackage(File file, String token);

	OperationResult<ActionPackage> fetchPackage(ICriteria criteria, String token);

	OperationMessage deletePackage(String name, String token);

}