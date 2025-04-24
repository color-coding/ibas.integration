package org.colorcoding.ibas.integration.action;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.bo.IBusinessObject;
import org.colorcoding.ibas.bobas.bo.IBusinessObjects;
import org.colorcoding.ibas.bobas.common.Condition;
import org.colorcoding.ibas.bobas.common.Conditions;
import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.IConditions;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.core.fields.IFieldData;
import org.colorcoding.ibas.bobas.core.fields.IManagedFields;
import org.colorcoding.ibas.bobas.data.DataConvert;
import org.colorcoding.ibas.bobas.expression.BOJudgmentLinkCondition;
import org.colorcoding.ibas.bobas.expression.JudmentOperationException;
import org.colorcoding.ibas.bobas.message.Logger;
import org.colorcoding.ibas.bobas.message.MessageLevel;
import org.colorcoding.ibas.integration.MyConfiguration;

/**
 * 状态改变动作
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "StatusAction", namespace = MyConfiguration.NAMESPACE_ACTION)
@XmlRootElement(name = "StatusAction", namespace = MyConfiguration.NAMESPACE_ACTION)
public class BOStatusAction extends Action {

	/**
	 * 配置项目-口令
	 */
	public static final String CONFIG_ITEM_USER_TOKEN = "userToken";

	private static final long serialVersionUID = 6097200644090177916L;

	public BOStatusAction() {
		super();
	}

	@XmlElement(name = "BusinessObject")
	private String businessObject;

	public final String getBusinessObject() {
		return businessObject;
	}

	public final void setBusinessObject(String businessObject) {
		this.businessObject = businessObject;
	}

	@XmlElement(name = "Condition", type = Condition.class)
	private Conditions conditions;

	public final IConditions getConditions() {
		if (this.conditions == null) {
			this.conditions = new Conditions();
		}
		return conditions;
	}

	@XmlElement(name = "PropertyValue", type = BOPropertyValue.class)
	private BOPropertyValues propertyValues;

	public final BOPropertyValues getPropertyValues() {
		if (this.propertyValues == null) {
			this.propertyValues = new BOPropertyValues();
		}
		return propertyValues;
	}

	protected void applyConfigs(Iterable<ICondition> conditions) {
		if (conditions == null) {
			return;
		}
		for (ICondition condition : conditions) {
			if (condition.getValue() == null) {
				continue;
			}
			if (!condition.getValue().startsWith("${")) {
				continue;
			}
			if (!condition.getValue().endsWith("}")) {
				continue;
			}
			Object value = this.getConfig(condition.getValue().substring(2, condition.getValue().length() - 1));
			if (value == null) {
				value = "";
			}
			condition.setValue(value);
		}
	}

	@Override
	protected void run() throws Exception {
		try (BORepository4Action boRepository = new BORepository4Action()) {
			boRepository.setUserToken(this.getConfig(CONFIG_ITEM_USER_TOKEN, ""));
			// 设置参数
			this.applyConfigs(this.getConditions());
			ICriteria criteria = new Criteria();
			criteria.setBusinessObject(this.getBusinessObject());
			for (ICondition item : this.getConditions()) {
				criteria.getConditions().add(item);
			}
			IOperationResult<?> opRsltFetch = boRepository.fetchData(criteria);
			if (opRsltFetch.getError() != null) {
				throw opRsltFetch.getError();
			}
			boolean trans = boRepository.beginTransaction();
			try {
				for (Object data : opRsltFetch.getResultObjects()) {
					if (!(data instanceof IBusinessObject)) {
						continue;
					}
					IBusinessObject bo = (IBusinessObject) data;
					for (BOPropertyValue property : this.getPropertyValues()) {
						if (property.getProperty() == null || property.getProperty().isEmpty()) {
							continue;
						}
						// 设置参数
						this.applyConfigs(property.getConditions());
						// 设置值
						if (property.getValue() != null && property.getValue().startsWith("${")
								&& property.getValue().endsWith("}")) {
							Object value = this
									.getConfig(property.getValue().substring(2, property.getValue().length() - 1));
							if (value == null) {
								property.setValue(null);
							} else {
								property.setValue(String.valueOf(value));
							}
						}
						this.setPropertyValue(bo, property.getProperty(), property.getValue(),
								property.getConditions());
					}
					if (!bo.isDirty()) {
						continue;
					}
					IOperationResult<?> opRsltSave = boRepository.saveData(bo);
					if (opRsltSave.getError() != null) {
						throw opRsltSave.getError();
					}
				}
				if (trans) {
					boRepository.commitTransaction();
				}
			} catch (Exception e) {
				if (trans) {
					boRepository.rollbackTransaction();
				}
				throw e;
			}
		}
	}

	protected void setPropertyValue(IBusinessObject bo, String property, String value, List<ICondition> conditions)
			throws JudmentOperationException {
		if (!(bo instanceof IManagedFields)) {
			return;
		}
		IManagedFields boFields = (IManagedFields) bo;
		if (property.indexOf(".") > 0) {
			String tProperty = property.substring(0, property.indexOf("."));
			IFieldData field = boFields.getField(tProperty);
			if (field == null) {
				return;
			}
			if (field.getValue() instanceof IBusinessObjects) {
				for (Object item : (IBusinessObjects<?, ?>) field.getValue()) {
					if (item instanceof IBusinessObject) {
						this.setPropertyValue((IBusinessObject) item, property.substring(tProperty.length() + 1), value,
								conditions);
					}
				}
			} else if (field.getValue() instanceof IBusinessObject) {
				this.setPropertyValue((IBusinessObject) field.getValue(), property.substring(tProperty.length() + 1),
						value, conditions);
			}
		} else {
			IFieldData field = boFields.getField(property);
			if (field == null) {
				return;
			}
			// 判断条件
			if (conditions != null && conditions.size() > 0) {
				BOJudgmentLinkCondition judgment = new BOJudgmentLinkCondition();
				judgment.parsingConditions(conditions);
				if (!judgment.judge((IBusinessObject) bo)) {
					// 不符合条件，退出
					return;
				}
			}
			// 条件符合且属性存在
			boolean fixed = field.setValue(DataConvert.convert(field.getValueType(), value));
			if (fixed) {
				if (bo instanceof BusinessObject) {
					((BusinessObject<?>) bo).markDirty();
				}
				Logger.log(MessageLevel.INFO, "Action: %s's %s change to %s.", bo.toString(), field.getName(), value);
			}
		}
	}
}
