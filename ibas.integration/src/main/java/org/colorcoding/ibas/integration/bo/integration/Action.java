package org.colorcoding.ibas.integration.bo.integration;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.data.ArrayList;
import org.colorcoding.ibas.bobas.serialization.Serializable;
import org.colorcoding.ibas.integration.MyConfiguration;

/**
 * 集成动作
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = Action.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
@XmlRootElement(name = Action.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class Action extends Serializable {

	private static final long serialVersionUID = 1233762536408196271L;

	public static final String BUSINESS_OBJECT_NAME = "Action";
	private String id;

	@XmlElement(name = "id")
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	private String group;

	@XmlElement(name = "group")
	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	private String name;

	@XmlElement(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private String path;

	@XmlElement(name = "path")
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	private String remark;

	@XmlElement(name = "remark")
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	private boolean activated;

	@XmlElement(name = "activated")
	public boolean isActivated() {
		return activated;
	}

	public void setActivated(boolean activated) {
		this.activated = activated;
	}

	private String location;

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	@XmlElementWrapper(name = "configs")
	@XmlElement(name = "config", type = ActionConfig.class)
	private ArrayList<ActionConfig> configs;

	public ArrayList<ActionConfig> getConfigs() {
		if (this.configs == null) {
			this.configs = new ArrayList<>();
		}
		return configs;
	}

	@XmlElementWrapper(name = "dependencies")
	@XmlElement(name = "dependencies", type = String.class)
	private String[] dependencies;

	public final String[] getDependencies() {
		return dependencies;
	}

	public final void setDependencies(String[] value) {
		this.dependencies = value;
	}

	@Override
	public String toString() {
		return String.format("{action: %s %s}", this.getName() != null ? this.getName() : this.getId(), this.getPath());
	}
}
