package org.colorcoding.ibas.integration.service.rest;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.integration.MyConfiguration;
import org.colorcoding.ibas.integration.bo.integrationjob.IntegrationJob;
import org.colorcoding.ibas.integration.repository.BORepositoryIntegration;

/**
 * Integration 数据服务JSON
 */
@Path("data")
public class DataService extends BORepositoryIntegration {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-集成任务
	 * 
	 * @param criteria 查询
	 * @param token    口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("fetchIntegrationJob")
	public OperationResult<IntegrationJob> fetchIntegrationJob(Criteria criteria,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.fetchIntegrationJob(criteria, MyConfiguration.optToken(authorization, token));
	}

	/**
	 * 保存-集成任务
	 * 
	 * @param bo    对象实例
	 * @param token 口令
	 * @return 操作结果
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("saveIntegrationJob")
	public OperationResult<IntegrationJob> saveIntegrationJob(IntegrationJob bo,
			@HeaderParam("authorization") String authorization, @QueryParam("token") String token) {
		return super.saveIntegrationJob(bo, MyConfiguration.optToken(authorization, token));
	}

	// --------------------------------------------------------------------------------------------//

}
