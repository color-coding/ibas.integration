package org.colorcoding.ibas.integration.action;

import java.util.HashMap;
import java.util.UUID;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.core.Serializable;
import org.colorcoding.ibas.integration.MyConfiguration;
import org.colorcoding.ibas.integration.data.DataConvert;

/**
 * 集成动作
 * 
 * @author Niuren.Zhu
 *
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = "Action", namespace = MyConfiguration.NAMESPACE_ACTION)
public abstract class Action extends Serializable {

	private static final long serialVersionUID = 3407931108578910110L;

	public Action() {
		this.setId(UUID.randomUUID().toString());
		this.setName(this.getClass().getSimpleName());
	}

	private String id;

	@XmlElement(name = "Id")
	public final String getId() {
		return id;
	}

	public final void setId(String id) {
		this.id = id;
	}

	private String name;

	@XmlElement(name = "Name")
	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	private HashMap<String, Object> configs;

	public final Object getConfig(String key) {
		if (this.configs == null || this.configs.size() == 0) {
			return null;
		}
		return this.configs.get(key);
	}

	/**
	 * 获取配置
	 * 
	 * @param key          项
	 * @param defaultValue 默认值（没有配置返回此值，有则转换为此类型）
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public final <T> T getConfig(String key, T defaultValue) {
		Object value = this.getConfig(key);
		if (value == null) {
			return defaultValue;
		}
		if (defaultValue == null || value.getClass().equals(defaultValue.getClass())) {
			return (T) value;
		}
		return (T) DataConvert.convert(defaultValue.getClass(), value);
	}

	public final <T> void addConfig(String key, T value) {
		if (this.configs == null) {
			this.configs = new HashMap<>();
		}
		this.configs.put(key, value);
	}

	public final void go() throws ActionException {
		try {
			this.run();
		} catch (Exception e) {
			throw new ActionException(e);
		}
	}

	public String toString() {
		return String.format("{action: id = %s, name = %s}", this.getId(), this.getName());
	}

	protected abstract void run() throws Exception;
}
