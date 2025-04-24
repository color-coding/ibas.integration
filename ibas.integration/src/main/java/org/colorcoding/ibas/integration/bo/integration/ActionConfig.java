package org.colorcoding.ibas.integration.bo.integration;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.integration.MyConfiguration;

/**
 * 集成动作-配置
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = ActionConfig.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class ActionConfig extends Serializable {

	private static final long serialVersionUID = -3637453402246087554L;

	public static final String BUSINESS_OBJECT_NAME = "ActionConfig";

	public ActionConfig() {

	}

	public ActionConfig(String key, Object value) {
		this();
		this.setKey(key);
		this.setValue(value);
	}

	private String key;

	@XmlElement(name = "key")
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	private Object value;

	@XmlElement(name = "value")
	public Object getValue() {
		return value;
	}

	public void setValue(Object value) {
		this.value = value;
	}

	private String remark;

	@XmlElement(name = "remark")
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public String toString() {
		return String.format("{action config: %s %s}", this.getKey(), this.getValue());
	}
}
