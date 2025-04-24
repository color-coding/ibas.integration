package org.colorcoding.ibas.integration.action;

import org.colorcoding.ibas.bobas.bo.BOFactory;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.OperationResult;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.repository.BORepositoryServiceApplication;
import org.colorcoding.ibas.bobas.repository.ITransaction;

/**
 * 业务对象仓库，动作专用
 * 
 * @author Niuren.Zhu
 *
 */
class BORepository4Action extends BORepositoryServiceApplication {

	public BORepository4Action() {
	}

	public BORepository4Action(ITransaction transaction) {
		this();
		super.setTransaction(transaction);
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
			Class<?> boClass = BOFactory.loadClass(criteria.getBusinessObject());
			if (boClass == null) {
				throw new ClassNotFoundException(
						I18N.prop("msg_bobas_not_found_bo_class", criteria.getBusinessObject()));
			}
			@SuppressWarnings("unchecked")
			Class<P> boType = (Class<P>) boClass;
			String token = this.getCurrentUser().getToken();
			return super.fetch(boType, criteria, token);
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
