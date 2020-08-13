package org.colorcoding.ibas.integration.repository;

import java.io.File;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationMessage;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.FileData;
import org.colorcoding.ibas.integration.bo.integration.Action;
import org.colorcoding.ibas.integration.bo.integration.ActionPackage;

public interface IFileRepositoryActionApp {

	IOperationResult<Action> fetchAction(ICriteria criteria);

	IOperationResult<FileData> fetchFile(ICriteria criteria, String token);

	IOperationResult<ActionPackage> registerPackage(File file);

	IOperationResult<ActionPackage> fetchPackage(ICriteria criteria);

	IOperationMessage deletePackage(String name);
}