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
 * 集成任务-动作 集合
 */
@XmlType(name = IntegrationJobActions.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlSeeAlso({ IntegrationJobAction.class })
public class IntegrationJobActions extends BusinessObjects<IIntegrationJobAction, IIntegrationJob>
		implements IIntegrationJobActions {

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "IntegrationJobActions";

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 6041189511831305116L;

	/**
	 * 构造方法
	 */
	public IntegrationJobActions() {
		super();
	}

	/**
	 * 构造方法
	 * 
	 * @param parent 父项对象
	 */
	public IntegrationJobActions(IIntegrationJob parent) {
		super(parent);
	}

	/**
	 * 元素类型
	 */
	public Class<?> getElementType() {
		return IntegrationJobAction.class;
	}

	/**
	 * 创建集成任务-动作
	 * 
	 * @return 集成任务-动作
	 */
	public IIntegrationJobAction create() {
		IIntegrationJobAction item = new IntegrationJobAction();
		if (this.add(item)) {
			return item;
		}
		return null;
	}

	@Override
	protected void afterAddItem(IIntegrationJobAction item) {
		super.afterAddItem(item);
	}

	@Override
	public ICriteria getElementCriteria() {
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(IntegrationJobAction.PROPERTY_OBJECTKEY.getName());
		condition.setValue(this.getParent().getObjectKey());
		ISort sort = criteria.getSorts().create();
		sort.setAlias(IntegrationJobAction.PROPERTY_OBJECTKEY.getName());
		sort.setSortType(SortType.ASCENDING);
		sort = criteria.getSorts().create();
		sort.setAlias(IntegrationJobAction.PROPERTY_VISORDER.getName());
		sort.setSortType(SortType.ASCENDING);
		sort = criteria.getSorts().create();
		sort.setAlias(IntegrationJobAction.PROPERTY_LINEID.getName());
		sort.setSortType(SortType.ASCENDING);
		return criteria;
	}

	@Override
	protected void onParentPropertyChanged(PropertyChangeEvent evt) {
		super.onParentPropertyChanged(evt);
	}
}
