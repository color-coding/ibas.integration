/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    /** 模块-标识 */
    export const CONSOLE_ID: string = "568e7e6d-a67a-46a8-93b9-7bc896b1c2b7";
    /** 模块-名称 */
    export const CONSOLE_NAME: string = "Integration";
    /** 模块-版本 */
    export const CONSOLE_VERSION: string = "0.1.0";

    export namespace bo {
        /** 业务仓库名称 */
        export const BO_REPOSITORY_INTEGRATION: string = ibas.strings.format(ibas.MODULE_REPOSITORY_NAME_TEMPLATE, CONSOLE_NAME);
        /** 业务对象编码-集成任务 */
        export const BO_CODE_INTEGRATIONJOB: string = "${Company}_IG_INTERGRATIONJOB";
        /**
         * 动作关系
         */
        export enum emActionRelationship {
            /**
             * 与(&&)
             */
            AND,
            /**
             * 或(||)
             */
            OR,
        }
        /** 查询任务条件-服务的名称 */
        export const CRITERIA_CONDITION_ALIAS_JOB_NAME: string = "JobName";
        /** 查询任务条件-关联的业务对象 */
        export const CRITERIA_CONDITION_ALIAS_BOCODE: string = "BOCode";
        /** 查询任务条件-关联的应用 */
        export const CRITERIA_CONDITION_ALIAS_APPLICATION_ID: string = "ApplicationId";
        /** 查询任务条件-是否激活 */
        export const CRITERIA_CONDITION_ALIAS_ACTIVATED: string = "Activated";
        /** 查询动作条件-ID */
        export const CRITERIA_CONDITION_ALIAS_ACTION_ID: string = "ActionId";
        /** 查询动作条件-包（组） */
        export const CRITERIA_CONDITION_ALIAS_PACKAGE: string = "FileFolder";
    }
    export namespace app {
        /** 集成任务服务契约 */
        export interface IIntegrationJobServiceContract {
            /** 任务名称 */
            jobName: string | bo.IIntegrationJob;
            /** 是否自动运行 */
            autoRun?: boolean;
            /** 参数 */
            extraData?: any;
        }
        /** 集成任务服务代理 */
        export class IntegrationJobServiceProxy extends ibas.ServiceProxy<IIntegrationJobServiceContract> {

        }
    }
    export namespace action {
        /** 配置项-动作组 */
        export const CONFIG_ACTION_GROUP: string = "actionGroup";
        /** 配置项-用户 */
        const CONFIG_USER: string = "user";
        /** 配置项-用户密码 */
        const CONFIG_PASSWORD: string = "password";
        /** 配置项-地址 */
        const CONFIG_ADDRESS: string = "address";
        /** 类型 */
        export enum emSourceTarget {
            SOURCE,
            TARGET,
        }
        /** 返回配置项 */
        export function CONFIG_KEY(type: emSourceTarget, vaule: string): string {
            if (type === emSourceTarget.SOURCE) {
                return ibas.strings.format("{0}|Source", vaule);
            } else if (type === emSourceTarget.TARGET) {
                return ibas.strings.format("{0}|Target", vaule);
            } else {
                return vaule;
            }
        }
        /** 配置项-目标用户 */
        export const CONFIG_USER_TARGET: string = CONFIG_KEY(emSourceTarget.TARGET, CONFIG_USER);
        /** 配置项-目标用户密码 */
        export const CONFIG_PASSWORD_TARGET: string = CONFIG_KEY(emSourceTarget.TARGET, CONFIG_PASSWORD);
        /** 配置项-目标地址 */
        export const CONFIG_ADDRESS_TARGET: string = CONFIG_KEY(emSourceTarget.TARGET, CONFIG_ADDRESS);
        /**
         * 集成动作
         */
        export abstract class IntegrationAction extends ibas.Action {
            /**
             * 获取配置
             * @param key 配置项
             */
            getConfig(key: string): any;
            /**
             * 获取配置
             * 启动乐观模式时：以“|”字符递减取值，最终未找到返回undefined
             * @param key 配置项
             * @param optimistic 乐观模式（仅key存在“|”时有效）
             */
            getConfig(key: string, optimistic: boolean): any;
            /**
             * 获取配置
             * @param key 配置项
             * @param defalut 默认值
             */
            getConfig<T>(key: string, defalut: T): T;
            /**
             * 获取配置
             */
            getConfig(): any {
                if (arguments[1] === true
                    && typeof arguments[0] === "string" && arguments[0].indexOf("|") > 0) {
                    // 乐观模式
                    let key: string = arguments[0];
                    let value: any = super.getConfig(key);
                    if (ibas.objects.isNull(value)) {
                        key = key.substring(0, key.lastIndexOf("|"));
                        return this.getConfig(key);
                    }
                    return value;
                }
                return super.getConfig.apply(this, arguments);
            }
            /**
             * 添加配置
             * @param key 配置项
             * @param value 值
             */
            addConfig(key: string, value: any): void;
            /**
             * 复制配置
             * @param action 来源
             */
            addConfig(action: IntegrationAction): void;
            /**
             * 复制配置
             * @param action 来源
             * @param cover 是否覆盖
             */
            addConfig(action: IntegrationAction, cover: boolean): void;
            addConfig(): void {
                if (arguments[0] instanceof IntegrationAction) {
                    let cover: boolean = arguments[1];
                    if (ibas.objects.isNull(cover)) {
                        cover = true;
                    }
                    ibas.actions.copyConfig(arguments[0], this, cover);
                } else {
                    super.addConfig.apply(this, arguments);
                }
            }
            /** 设置日志记录者 */
            setLogger(logger: ibas.ILogger): void;
            /** 设置日志记录者 */
            setLogger(action: IntegrationAction): void;
            /** 设置日志记录者 */
            setLogger(): void {
                if (arguments[0] instanceof IntegrationAction) {
                    ibas.actions.copyLogger(arguments[0], this);
                } else {
                    super.setLogger.apply(this, arguments);
                }
            }
            /** 运行 */
            protected run(): boolean {
                // 加载资源文件
                for (let item of ibas.arrays.create(this.resources())) {
                    if (!ibas.strings.isWith(item, "http", undefined)) {
                        let url: string = this.getConfig(CONFIG_ACTION_GROUP);
                        if (!ibas.strings.isWith(url, undefined, "/")
                            && !ibas.strings.isWith(item, "/", undefined)) {
                            url = url + "/";
                        }
                        ibas.i18n.load(url + item);
                    } else {
                        ibas.i18n.load(item);
                    }
                }
                // 执行逻辑
                let value: any = this.execute();
                if (typeof value === "boolean") {
                    return value;
                }
                return false;
            }
            /** 调用后台服务 */
            protected goAction(name: string, params: { key: string, value: any }[] | { key: string, value: any }, fnBack?: (opRslt: ibas.IOperationMessage) => void): void {
                let group: string = this.getConfig(CONFIG_ACTION_GROUP);
                if (!ibas.strings.isEmpty(group)) {
                    if (group.endsWith("/")) {
                        group = group.substring(0, group.length - 1);
                    }
                    let index: number = group.lastIndexOf("/");
                    if (index >= 0) {
                        group = group.substring(index + 1);
                    }
                }
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.goAction({
                    group: group,
                    name: name,
                    parameters: ibas.arrays.create(params),
                    onCompleted: (opRslt) => {
                        if (fnBack instanceof Function) {
                            fnBack(opRslt);
                        }
                    }
                });
            }
            /** 资源文件（可重载） */
            protected resources(): string[] | string {
                return undefined;
            }
            /** 运行（需要实现） */
            protected abstract execute(): boolean | void;
        }
        /**
         * 获取仓库名称（去除Async结尾）
         * @param boRepository 业务仓库实例或名称
         */
        export function repositoryName(boRepository: ibas.BORepositoryApplication | string): string {
            let name: string;
            if (boRepository instanceof ibas.BORepositoryApplication) {
                name = ibas.objects.getTypeName(boRepository);
            } else {
                name = ibas.strings.valueOf(boRepository);
            }
            if (ibas.strings.isWith(name, undefined, "Async")) {
                name = name.substring(0, name.length - "Async".length);
            }
            return name;
        }
        /**
         * 根据集成动作配置改变业务仓库信息
         * @param boRepository 业务仓库
         * @param action 集成动作
         * @param type 类型
         */
        export function changeRepositoryInfo(boRepository: ibas.BORepositoryApplication,
            action: IntegrationAction, type: emSourceTarget = emSourceTarget.TARGET): void {
            if (!(boRepository instanceof ibas.BORepositoryApplication)) {
                return;
            }
            // 获取业务仓库名称
            let name: string = repositoryName(boRepository);
            if (ibas.objects.isNull(action)) {
                // 没有提供配置，则从全局config中获取
                ibas.BORepositoryApplication.repositoryInfo(boRepository, name);
            }
            if (!(action instanceof IntegrationAction)) {
                return;
            }
            // 目标类型，尝试先补全地址
            if (type === emSourceTarget.TARGET) {
                completeAddress(action, boRepository);
            }
            let configKey: string, configValue: any;
            // 地址
            configKey = CONFIG_KEY(type,
                ibas.strings.format(ibas.CONFIG_ITEM_TEMPLATE_REMOTE_REPOSITORY_ADDRESS, name));
            configValue = action.getConfig(configKey, true);
            if (!ibas.objects.isNull(configValue)) {
                boRepository.address = configValue;
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "action: [{0}] changed address [{1}].", ibas.objects.getTypeName(boRepository), boRepository.address);
            }
            // 口令
            configKey = CONFIG_KEY(type,
                ibas.strings.format(ibas.CONFIG_ITEM_TEMPLATE_USER_TOKEN, name));
            configValue = action.getConfig(configKey, true);
            if (!ibas.objects.isNull(configValue)) {
                boRepository.token = configValue;
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "action: [{0}] changed token [{1}].", ibas.objects.getTypeName(boRepository), boRepository.token);
            }
            // 离线
            configKey = CONFIG_KEY(type,
                ibas.strings.format(ibas.CONFIG_ITEM_TEMPLATE_OFFLINE_MODE, name));
            configValue = action.getConfig(configKey, true);
            if (!ibas.objects.isNull(configValue)) {
                boRepository.offline = configValue;
                ibas.logger.log(ibas.emMessageLevel.DEBUG, "action: [{0}] changed offline [{1}].", ibas.objects.getTypeName(boRepository), boRepository.offline);
            }
        }
        /**
         * 连接业务仓库
         * @param user 用户
         * @param password 密码
         * @param onCompleted 完成
         */
        export function connectRepository(user: string, password: string, onCompleted: (opRslt: ibas.IOperationResult<shell.bo.IUser>) => void): void;
        /**
         * 连接业务仓库（token写入集成动作配置）
         * @param action 集成动作
         * @param type 类型
         */
        export function connectRepository(action: IntegrationAction, onCompleted: (opRslt: ibas.IOperationResult<shell.bo.IUser>) => void): void;
        export function connectRepository(): void {
            let user: string, password: string, address: string, onCompleted: Function;
            let action: IntegrationAction, type: emSourceTarget = emSourceTarget.TARGET;
            if (arguments.length === 3
                && typeof arguments[0] === "string"
                && typeof arguments[1] === "string"
                && typeof arguments[2] === "function") {
                // 用户密码直接连接
                user = arguments[0];
                password = arguments[1];
                onCompleted = arguments[2];
            } else if (arguments[0] instanceof IntegrationAction) {
                action = arguments[0];
                onCompleted = arguments[1];
                user = action.getConfig(CONFIG_USER_TARGET, true);
                password = action.getConfig(CONFIG_PASSWORD_TARGET, true);
                address = action.getConfig(CONFIG_KEY(type, shell.bo.BO_REPOSITORY_CONNECT));
                if (ibas.strings.isEmpty(address)) {
                    // 不存在目标地址，用address完善
                    address = action.getConfig(CONFIG_ADDRESS_TARGET, true);
                    if (!ibas.strings.isEmpty(address)) {
                        if (!ibas.strings.isWith(address, undefined, "/")) {
                            address = address + "/";
                        }
                        if (!address.endsWith("/initialfantasy/services/rest/data/")) {
                            address = address + "initialfantasy/services/rest/data/";
                        }
                        action.addConfig(CONFIG_KEY(type, shell.bo.BO_REPOSITORY_CONNECT), address);
                    }
                }
            } else {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "all"));
            }
            if (ibas.strings.isEmpty(user)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "user"));
            }
            if (ibas.strings.isEmpty(password)) {
                throw new Error(ibas.i18n.prop("sys_invalid_parameter", "password"));
            }
            let boRepository: shell.bo.IBORepositoryConnect = ibas.boFactory.create(shell.bo.BO_REPOSITORY_CONNECT);
            if (!ibas.strings.isEmpty(address)) {
                boRepository.address = address;
            }
            boRepository.userConnect({
                user: user,
                password: password,
                onCompleted: (opRslt) => {
                    if (action instanceof IntegrationAction) {
                        let user: shell.bo.IUser = opRslt.resultObjects.firstOrDefault();
                        if (!ibas.objects.isNull(user)) {
                            action.addConfig(CONFIG_KEY(type, ibas.CONFIG_ITEM_USER_TOKEN), user.token);
                        }
                    }
                    if (onCompleted instanceof Function) {
                        onCompleted(opRslt);
                    }
                }
            });
        }
        /**
         * 补全业务仓库地址（根据address配置，仅适用Target系统）
         * @param action 集成动作
         * @param boRepository 业务仓库实例或名称
         */
        export function completeAddress(action: IntegrationAction, boRepository: ibas.BORepositoryApplication | string): string {
            if (!(action instanceof IntegrationAction)) {
                return undefined;
            }
            let name: string = repositoryName(boRepository);
            // 已存在仓库目标地址，则退出
            let address: string = action.getConfig(
                CONFIG_KEY(emSourceTarget.TARGET,
                    ibas.strings.format(ibas.CONFIG_ITEM_TEMPLATE_REMOTE_REPOSITORY_ADDRESS, name))
            );
            if (!ibas.strings.isEmpty(address)) {
                return address;
            }
            // 不存在目标地址，用address完善
            address = action.getConfig(CONFIG_ADDRESS_TARGET, true);
            if (ibas.strings.isEmpty(address)) {
                return undefined;
            }
            let url: ibas.StringBuilder = new ibas.StringBuilder();
            url.append(address);
            if (!ibas.strings.isWith(address, undefined, "/")) {
                url.append("/");
            }
            if (name.startsWith("BORepository")) {
                url.append(name.substring("BORepository".length).toLowerCase());
            } else {
                url.append(name.toLowerCase());
            }
            url.append("/services/rest/data/");
            address = url.toString();
            action.addConfig(CONFIG_KEY(emSourceTarget.TARGET,
                ibas.strings.format(ibas.CONFIG_ITEM_TEMPLATE_REMOTE_REPOSITORY_ADDRESS, name)
            ), address);
            ibas.logger.log(ibas.emMessageLevel.DEBUG, "action: register [{0}]'s address [{1}].", ibas.objects.getTypeName(boRepository), address);
            return address;
        }
    }
}