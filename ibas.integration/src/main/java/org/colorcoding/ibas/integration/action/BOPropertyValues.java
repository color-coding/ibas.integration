package org.colorcoding.ibas.integration.action;

import org.colorcoding.ibas.bobas.data.ArrayList;

public class BOPropertyValues extends ArrayList<BOPropertyValue> {

	private static final long serialVersionUID = 1281715680083187020L;

	public BOPropertyValue create() {
		BOPropertyValue item = new BOPropertyValue();
		this.add(item);
		return item;
	}
}
