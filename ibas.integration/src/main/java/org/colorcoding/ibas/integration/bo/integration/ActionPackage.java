package org.colorcoding.ibas.integration.bo.integration;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.common.DateTimes;
import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.data.List;
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

	@XmlElement(name = "id")
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@XmlElement(name = "dateTime")
	private Long dateTime;

	public final Long getDateTime() {
		return dateTime;
	}

	public final void setDateTime(Long dateTime) {
		this.dateTime = dateTime;
	}

	@XmlElement(name = "remarks")
	private String remarks;

	public final String getRemarks() {
		return remarks;
	}

	public final void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@XmlElementWrapper(name = "actions")
	@XmlElement(name = "actions", type = Action.class)
	private ArrayList<Action> actions;

	public final List<Action> getActions() {
		if (this.actions == null) {
			this.actions = new ArrayList<>();
		}
		return actions;
	}

	public final void setActions(List<Action> actions) {
		this.getActions().addAll(actions);
	}

	@Override
	public String toString() {
		return String.format("{actions: %s %s}", this.getId(),
				this.getDateTime() != null ? DateTimes.valueOf(this.getDateTime()).toString() : "unknown");
	}
}
