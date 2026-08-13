package org.colorcoding.ibas.integration.action;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlAttribute;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.Condition;
import org.colorcoding.ibas.bobas.common.Conditions;
import org.colorcoding.ibas.bobas.common.IConditions;

/**
 * 业务对象属性值
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "PropertyValue")
public class BOPropertyValue {

	@XmlAttribute(name = "Property")
	private String property;

	public final String getProperty() {
		return property;
	}

	public final void setProperty(String property) {
		this.property = property;
	}

	@XmlAttribute(name = "Value")
	private String value;

	public final String getValue() {
		return value;
	}

	public final void setValue(String value) {
		this.value = value;
	}

	@XmlElement(name = "Condition", type = Condition.class)
	private Conditions conditions;

	public final IConditions getConditions() {
		if (this.conditions == null) {
			this.conditions = new Conditions();
		}
		return conditions;
	}
}
