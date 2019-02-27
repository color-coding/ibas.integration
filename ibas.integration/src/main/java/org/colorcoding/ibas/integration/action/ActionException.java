package org.colorcoding.ibas.integration.action;

public class ActionException extends Exception {

	private static final long serialVersionUID = 5441225176123707591L;

	public ActionException() {
		super();
	}

	public ActionException(String message, Throwable cause) {
		super(message, cause);
	}

	public ActionException(String message) {
		super(message);
	}

	public ActionException(Throwable cause) {
		super(cause);
	}

}
