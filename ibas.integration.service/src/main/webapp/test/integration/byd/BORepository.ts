/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../../../3rdparty/ibas/index.d.ts" />
/// <reference path="../3rdparty/jquery/index.d.ts" />
/// <reference path="../3rdparty/jquerysoap/index.d.ts" />
/// <reference path="../3rdparty/jqueryxml2json/index.d.ts" />
/**
 * 动作码
 */
export enum ActionCode {
    /** 创建 */
    CREATE = "01",
    /** 修改 */
    UPDATE = "02",
    /** 删除 */
    DELETE = "03",
    /** 保存 */
    SAVE = "04",
    /** 移出 */
    REMOVE = "05",
    /** 无动作 */
    NOTHING = "06",
}
/** 包含排除 */
export enum InclusionExclusionCode {
    /** 排除 */
    EXCLUDING = " E",
    /** 包含 */
    INCLUDING = "I"
}
/** 比较方式 */
export enum IntervalBoundaryTypeCode {
    /** 等于 */
    EQUAL = "1",
    /** 之间 */
    BETWEEN = "3",
    /** 小于 */
    LESS_THAN = "6",
    /** 小于等于 */
    LESS_EQUAL = "7",
    /** 大于 */
    GREATER_THAN = "8",
    /** 大于等于 */
    GREATER_EQUAL = "9",
}
/** 请求方式 */
export enum TransmissionRequestCode {
    /** 全部结构 */
    COMPLETE_STRUCTURE = "1",
    /** 完整节点 */
    COMPLETE_NODE = "2",
    /** 关键节点 */
    KEY_NODE = "3",
    /** 扩展节点 */
    EXCLUDED_NODE = "4",
}
/**
 * 查询调用者
 */
export interface IFetchCaller<C, R> extends ibas.IMethodCaller<R> {
    /** 查询条件 */
    criteria: C;
}
/**
 * 保存调用者
 */
export interface ISaveCaller<C, R> extends ibas.IMethodCaller<R> {
    /** 被保存对象 */
    beSaved: C;
    /**
     * 调用完成
     * @param opRslt 结果
     */
    onCompleted(opRslt: ibas.IOperationResult<R>): void;
}
/**
 * SOAP业务仓库
 */
export class BORepositorySOAP {
    /** 用户名 */
    user: string;
    /** 密码 */
    password: string;
    /** 根地址（地址不能“/”结尾） */
    address: string;
    /**
     * 调用远程方法
     * @param method 方法
     * @param data 数据
     * @param caller 调用者
     */
    private remoteMethod(method: string, element: string, data: any, onCompleted: (opRslt: ibas.IOperationResult<any>) => void): void {
        let options: JQuerySOAP.Options = this.getSoapOption();
        options.elementName = ibas.strings.format("{0}:{1}", options.namespaceQualifier, element);
        options.SOAPAction = this.getSoapAction(method);
        options.url = ibas.urls.normalize(this.getAddress());
        options.data = data;
        options.success = function (response: JQuerySOAP.SOAPResponse): void {
            let opRslt: ibas.IOperationResult<object> = new ibas.OperationResult<object>();
            let content: object = response.toJSON();
            if (content) {
                if (ibas.objects.hasProperty(content, "Body", true)) {
                    opRslt.resultObjects.add(ibas.objects.propertyValue(content, "Body", true));
                } else {
                    opRslt.resultObjects.add(content);
                }
            }
            if (onCompleted instanceof Function) {
                onCompleted(opRslt);
            }
        };
        options.error = function (response: JQuerySOAP.SOAPResponse): void {
            let content: string = response.toString().toString();
            let opRslt: ibas.IOperationResult<string> = new ibas.OperationResult<string>();
            opRslt.resultCode = 1000;
            opRslt.resultObjects.add(content);
            if (onCompleted instanceof Function) {
                onCompleted(opRslt);
            }
        };
        jQuery.soap(options);
    }
    protected getSoapOption(): JQuerySOAP.Options {
        return {
            soap12: true,
            appendMethodToURL: false,
            crossDomain: true,
            HTTPHeaders: {
                Authorization: "Basic " + btoa(this.user + ":" + this.password)
            },
        };
    }
    /** 获取服务地址（补全） */
    protected getAddress(method: string = undefined): string {
        let address: string = this.address;
        if (ibas.strings.isEmpty(address)) {
            throw new Error("invaild address.");
        }
        return address;
    }

    /**
     * 查询数据
     * @param method 方法名（action）
     * @param requestElement 请求消息元素
     * @param caller 调用数据
     * @param responseElement 返回消息元素
     */
    protected fetch<C, R>(method: string, requestElement: string, caller: IFetchCaller<C, R>, responseElement: string): void {
        let onCompleted: (opRslt: ibas.IOperationResult<R>) => void = function (opRslt: ibas.IOperationResult<R>): void {
            if (caller.onCompleted instanceof Function) {
                if (opRslt.resultCode === 0) {
                    let responses: ibas.IList<any> = new ibas.ArrayList<any>();
                    for (let item of opRslt.resultObjects) {
                        if (ibas.objects.hasProperty(item, responseElement)) {
                            responses.add(ibas.objects.propertyValue(item, responseElement));
                        } else {
                            responses.add(item);
                        }
                    }
                    opRslt.resultObjects = responses;
                }
                if (caller.caller) {
                    caller.onCompleted.call(caller.caller, opRslt);
                } else {
                    caller.onCompleted.call(caller.onCompleted, opRslt);
                }
            }
        };
        this.remoteMethod(method, requestElement, caller.criteria, onCompleted);
    }
    /**
     * 保存数据
     * @param method 方法名（action）
     * @param requestElement 请求消息元素
     * @param caller 调用数据
     * @param responseElement 返回消息元素
     */
    protected save<C, R>(method: string, requestElement: string, caller: ISaveCaller<C, R>, responseElement: string): void {
        let onCompleted: (opRslt: ibas.IOperationResult<R>) => void = function (opRslt: ibas.IOperationResult<R>): void {
            if (caller.onCompleted instanceof Function) {
                if (opRslt.resultCode === 0) {
                    let responses: ibas.IList<any> = new ibas.ArrayList<any>();
                    for (let item of opRslt.resultObjects) {
                        if (ibas.objects.hasProperty(item, responseElement)) {
                            responses.add(ibas.objects.propertyValue(item, responseElement));
                        } else {
                            responses.add(item);
                        }
                    }
                    opRslt.resultObjects = responses;
                }
                if (caller.caller) {
                    caller.onCompleted.call(caller.caller, opRslt);
                } else {
                    caller.onCompleted.call(caller.onCompleted, opRslt);
                }
            }
        };
        this.remoteMethod(method, requestElement, caller.beSaved, onCompleted);
    }
    protected getSoapAction(method: string): string {
        return undefined;
    }
}
export class BORepositoryByDesign extends BORepositorySOAP {
    protected getSoapOption(): JQuerySOAP.Options {
        let options: JQuerySOAP.Options = super.getSoapOption();
        options.namespaceQualifier = "glob";
        options.namespaceURL = "http://sap.com/xi/SAPGlobal20/Global";
        options.noPrefix = true;
        return options;
    }
    /** 获取服务地址（补全） */
    protected getAddress(method: string = undefined): string {
        let address: string = super.getAddress(method);
        let name: string = ibas.objects.nameOf(this);
        if (ibas.strings.isWith(name, "BORepository", undefined)) {
            name = name.substring("BORepository".length);
        }
        if (!ibas.strings.isWith(address, undefined, "/")) {
            address = address + "/";
        }
        address = address + name.toLowerCase();
        return address;
    }
    protected getSoapAction(method: string): string {
        let builder: ibas.StringBuilder = new ibas.StringBuilder();
        builder.append("http://sap.com/xi/A1S/Global/");
        let name: string = ibas.objects.nameOf(this);
        if (ibas.strings.isWith(name, "BORepository", undefined)) {
            name = name.substring("BORepository".length);
            for (let item of name) {
                // 跳过数字结尾
                if (ibas.numbers.isNumber(item)) {
                    break;
                }
                builder.append(item);
            }
            builder.append("/");
        }
        builder.append(method);
        return builder.toString();
    }
}