package org.colorcoding.ibas.integration.action;

import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.core.BOFactory;
import org.colorcoding.ibas.bobas.core.IBORepository;
import org.colorcoding.ibas.bobas.core.RepositoryException;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.repository.BORepositoryLogicService;
import org.colorcoding.ibas.bobas.repository.InvalidTokenException;

/**
 * 业务对象仓库，动作专用
 * 
 * @author Niuren.Zhu
 *
 */
class BORepository4Action extends BORepositoryLogicService {

	public BORepository4Action() {
		// 此业务仓库不检查审批流程
		this.setCheckApprovalProcess(false);
		// 不检查期间
		this.setCheckPeriods(false);
	}

	public BORepository4Action(IBORepository repository) {
		this();
		super.setRepository(repository);
	}

	public final void noCheckRules() {
		this.setCheckRules(false);
	}

	public final void noCheckLogics() {
		this.setCheckLogics(false);
	}

	public boolean openRepository() throws RepositoryException {
		return super.openRepository();
	}

	public void closeRepository() throws RepositoryException {
		super.closeRepository();
	}

	public boolean beginTransaction() throws RepositoryException {
		return super.beginTransaction();
	}

	public void rollbackTransaction() throws RepositoryException {
		super.rollbackTransaction();
	}

	public void commitTransaction() throws RepositoryException {
		super.commitTransaction();
	}

	public void setUserToken(String token) throws InvalidTokenException {
		super.setCurrentUser(token);
	}

	/**
	 * 查询对象
	 * 
	 * @param criteria 查询条件
	 * @return
	 */
	public <P extends IBusinessObject> OperationResult<P> fetchData(ICriteria criteria) {
		try {
			// 加载命名空间的类
			if (criteria == null || criteria.getBusinessObject() == null || criteria.getBusinessObject().isEmpty()) {
				throw new Exception(I18N.prop("msg_ig_invaild_fetch_criteria"));
			}
			Class<?> boClass = BOFactory.create().loadClass(criteria.getBusinessObject());
			if (boClass == null) {
				throw new ClassNotFoundException(
						I18N.prop("msg_bobas_not_found_bo_class", criteria.getBusinessObject()));
			}
			@SuppressWarnings("unchecked")
			Class<P> boType = (Class<P>) boClass;
			String token = this.getCurrentUser().getToken();
			return super.fetch(criteria, token, boType);
		} catch (Exception e) {
			return new OperationResult<>(e);
		}
	}

	/**
	 * 保存对象
	 * 
	 * @param bo 业务对象
	 * @return
	 */
	public <P extends IBusinessObject> OperationResult<P> saveData(P bo) {
		String token = this.getCurrentUser().getToken();
		return super.save(bo, token);
	}
}
