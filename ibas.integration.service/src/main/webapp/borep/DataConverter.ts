/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace bo {
        /** 数据转换者 */
        export class DataConverter extends ibas.DataConverter4j {
            parsing(data: any, sign: string): any {
                if (data.type === bo.Action.name) {
                    let newData: bo.Action = new bo.Action();
                    newData.id = data.id;
                    newData.group = data.group;
                    newData.name = data.name;
                    newData.activated = data.activated;
                    newData.path = data.path;
                    newData.remark = data.remark;
                    if (!ibas.objects.isNull(data.configs)) {
                        for (let item of data.configs) {
                            let newItem: bo.ActionConfig = new bo.ActionConfig;
                            newItem.key = item.key;
                            newItem.value = item.value;
                            newItem.remark = item.remark;
                            newData.configs.add(newItem);
                        }
                    }
                    newData.dependencies = data.dependencies;
                    return newData;
                } else {
                    return super.parsing(data, sign);
                }
            }
            /** 创建业务对象转换者 */
            protected createConverter(): ibas.BOConverter {
                return new BOConverter;
            }
            /** 转换数据 */
            static toMessageType(level: ibas.emMessageLevel): ibas.emMessageType {
                let type: ibas.emMessageType = ibas.emMessageType.INFORMATION;
                if (level === ibas.emMessageLevel.WARN) {
                    type = ibas.emMessageType.WARNING;
                } else if (level === ibas.emMessageLevel.ERROR) {
                    type = ibas.emMessageType.ERROR;
                } else if (level === ibas.emMessageLevel.FATAL) {
                    type = ibas.emMessageType.ERROR;
                }
                return type;
            }
        }
        /** 模块业务对象工厂 */
        export const boFactory: ibas.BOFactory = new ibas.BOFactory();
        /** 业务对象转换者 */
        class BOConverter extends ibas.BOConverter {
            /** 模块对象工厂 */
            protected factory(): ibas.BOFactory {
                return boFactory;
            }

            /**
             * 自定义解析
             * @param data 远程数据
             * @returns 本地数据
             */
            protected customParsing(data: any): ibas.IBusinessObject {
                return data;
            }

            /**
             * 转换数据
             * @param boName 对象名称
             * @param property 属性名称
             * @param value 值
             * @returns 转换的值
             */
            protected convertData(boName: string, property: string, value: any): any {
                return super.convertData(boName, property, value);
            }

            /**
             * 解析数据
             * @param boName 对象名称
             * @param property 属性名称
             * @param value 值
             * @returns 解析的值
             */
            protected parsingData(boName: string, property: string, value: any): any {
                return super.parsingData(boName, property, value);
            }
        }
        /** 动作类加载器 */
        export interface IActionClassLoader {
            /** 动作信息 */
            action: bo.Action;
            /** 错误 */
            onError: (error: Error) => void;
            /** 成功 */
            onCompleted: (clazz: any) => void;
        }
        /** 动作类加载器 */
        export interface IActionClassCreater extends IActionClassLoader {
            /** 成功 */
            onCompleted: (action: ibas.Action) => void;
        }
        /** 动作工厂 */
        export class ActionFactory {
            /** 获取动作的类 */
            classOf(caller: IActionClassLoader): void {
                if (ibas.objects.isNull(caller.action)) {
                    return;
                }
                let baseUrl: string = caller.action.group;
                if (ibas.strings.isEmpty(baseUrl)) {
                    baseUrl = ibas.urls.normalize(ibas.urls.ROOT_URL_SIGN);
                }
                if (!baseUrl.toLowerCase().startsWith("http")) {
                    baseUrl = ibas.urls.normalize(ibas.urls.ROOT_URL_SIGN) + baseUrl;
                }
                let token: string = ibas.config.get(ibas.CONFIG_ITEM_USER_TOKEN, "");
                let rtVersion: string = undefined;
                if (!ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE, false)) {
                    rtVersion = ibas.dates.now().getTime().toString();
                }
                let actionRequire: Require = ibas.requires.create({
                    baseUrl: baseUrl,
                    context: caller.action.name.trim(),
                    waitSeconds: ibas.config.get(ibas.requires.CONFIG_ITEM_WAIT_SECONDS, 30),
                    urlArgs: function (id: string, url: string): string {
                        if (id.indexOf("ibas/") >= 0 || id.startsWith("_@") || id === "require" || id === "exports") {
                            return "";
                        }
                        // 允许多次调用
                        return (url.indexOf("?") === -1 ? "?" : "&") + "token=" + token
                            + (rtVersion ? ("&_=" + rtVersion) : "");
                    }
                });
                let path: string = caller.action.path;
                if (ibas.strings.isEmpty(path)) {
                    path = caller.action.name.trim();
                }
                if (path.indexOf(".") > 0) {
                    path = path.substring(0, path.lastIndexOf("."));
                }
                let todo: Function = function (): void {
                    // 如果已加载，则卸载
                    if (actionRequire.defined(path)) {
                        actionRequire.undef(path);
                    }
                    actionRequire([
                        path
                    ], function (library: any): void {
                        // 库加载成功
                        try {
                            if (ibas.objects.isNull(library)) {
                                throw new Error("invalid action library.");
                            }
                            if (ibas.objects.isNull(library.default) && !ibas.objects.isAssignableFrom(library.default, ibas.Action)) {
                                throw new Error("invalid action class.");
                            }
                            if (!ibas.objects.isAssignableFrom(library.default, ibas.Action)) {
                                throw new Error("invalid action class.");
                            }
                            if (caller.onCompleted instanceof Function) {
                                caller.onCompleted(library.default);
                            }
                        } catch (error) {
                            if (caller.onError instanceof Function) {
                                caller.onError(error);
                            }
                        }
                    }, function (): void {
                        if (caller.onError instanceof Function) {
                            caller.onError(arguments[0]);
                        }
                    });
                };
                if (caller.action.dependencies instanceof Array && caller.action.dependencies.length > 0) {
                    actionRequire(
                        caller.action.dependencies,
                        function (): void {
                            todo();
                        }, function (): void {
                            if (caller.onError instanceof Function) {
                                caller.onError(arguments[0]);
                            }
                        }
                    );
                } else {
                    todo();
                }
            }
            create(caller: IActionClassCreater): void {
                this.classOf({
                    action: caller.action,
                    onError: caller.onError,
                    onCompleted(clazz: any): void {
                        let action: ibas.Action = new clazz();
                        if (!(ibas.objects.instanceOf(action, ibas.Action))) {
                            throw new Error("invalid action instance.");
                        }
                        // 组设置
                        action.addConfig(integration.action.CONFIG_ACTION_GROUP, caller.action.group);
                        // 输入设置
                        for (let config of caller.action.configs) {
                            if (ibas.objects.isNull(config.key)) {
                                continue;
                            }
                            action.addConfig(config.key, ibas.config.applyVariables(config.value));
                        }
                        if (caller.onCompleted instanceof Function) {
                            caller.onCompleted(action);
                        }
                    }
                });
            }
        }
        /** 模块业务对象工厂 */
        export const actionFactory: ActionFactory = new ActionFactory();
    }
}