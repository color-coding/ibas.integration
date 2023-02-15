package org.colorcoding.ibas.integration.data;

import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.mapping.Value;
import org.colorcoding.ibas.integration.MyConfiguration;

/**
 * 动作关系
 * 
 * @author Niuren.Zhu
 *
 */
@XmlType(namespace = MyConfiguration.NAMESPACE_BO)
public enum emActionRelationship {
	/**
	 * 与
	 */
	@Value(value = "&&")
	AND,
	/**
	 * 或
	 */
	@Value(value = "||")
	OR;
}
