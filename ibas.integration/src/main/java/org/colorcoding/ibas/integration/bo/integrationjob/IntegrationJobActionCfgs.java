package org.colorcoding.ibas.integration.bo.integrationjob;

import java.beans.PropertyChangeEvent;

import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObjects;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.ISort;
import org.colorcoding.ibas.bobas.common.SortType;
import org.colorcoding.ibas.integration.MyConfiguration;

/**
 * 集成任务-动作-配置 集合
 */
@XmlType(name = IntegrationJobActionCfgs.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ IntegrationJobActionCfg.class })
public class IntegrationJobActionCfgs extends BusinessObjects<IIntegrationJobActionCfg, IIntegrationJobAction>
		implements IIntegrationJobActionCfgs {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "IntegrationJobActionCfgs";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 2606259754021149645L;

	/**
	 * 构造方法
	 */
	public IntegrationJobActionCfgs() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent
	 *            父项对象
	 */
	public IntegrationJobActionCfgs(IIntegrationJobAction parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return IntegrationJobActionCfg.class;
	}

	/**
	 * 创建集成任务-动作-配置
	 * 
	 * @return 集成任务-动作-配置
	 */
	public IIntegrationJobActionCfg create() {
		IIntegrationJobActionCfg item = new IntegrationJobActionCfg();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IIntegrationJobActionCfg item) {
		super.afterAddItem(item);
		item.setActionLineId(this.getParent().getLineId());
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(IntegrationJobActionCfg.PROPERTY_OBJECTKEY.getName());
		condition.setValue(this.getParent().getObjectKey());
		condition = criteria.getConditions().create();
		condition.setAlias(IntegrationJobActionCfg.PROPERTY_ACTIONLINEID.getName());
		condition.setValue(this.getParent().getLineId());
		ISort sort = criteria.getSorts().create();
		sort.setAlias(IntegrationJobActionCfg.PROPERTY_OBJECTKEY.getName());
		sort.setSortType(SortType.ASCENDING);
		sort = criteria.getSorts().create();
		sort.setAlias(IntegrationJobActionCfg.PROPERTY_LINEID.getName());
		sort.setSortType(SortType.ASCENDING);
		return criteria;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
		if (evt.getPropertyName().equals(IntegrationJobAction.PROPERTY_LINEID.getName())) {
			for (IIntegrationJobActionCfg item : this) {
				item.setActionLineId(this.getParent().getLineId());
			}
		}
	}
}
