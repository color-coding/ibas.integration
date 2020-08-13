package org.colorcoding.ibas.integration.bo.integration;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.DateTime;
import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.integration.MyConfiguration;

/**
 * 集成动作包
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = ActionPackage.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = ActionPackage.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class ActionPackage extends Serializable {

	private static final long serialVersionUID = -7990642635758270573L;

	public static final String BUSINESS_OBJECT_NAME = "ActionPackage";

	private String id;

	@XmlElement(name = "id")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	private Long dateTime;

	@XmlElement(name = "dateTime")
	public final Long getDateTime() {
		return dateTime;
	}

	public final void setDateTime(Long dateTime) {
		this.dateTime = dateTime;
	}

	private Action[] actions;

	@XmlElementWrapper(name = "actions")
	@XmlElement(name = "actions", type = Action.class)
	public final Action[] getActions() {
		return actions;
	}

	public final void setActions(Action[] actions) {
		this.actions = actions;
	}

	@Override
	public String toString() {
		return String.format("{actions: %s %s}", this.getId(),
				this.getDateTime() != null ? DateTime.valueOf(this.getDateTime()).toString(DateTime.FORMAT_DATETIME)
						: "unknown");
	}
}
