/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace bo {
        /** 业务对象仓库 */
        export class BORepositoryIntegration extends ibas.BORepositoryApplication implements IBORepositoryIntegration {
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter {
                return new DataConverter;
            }
            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileData>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryUploadAjax = new ibas.FileRepositoryUploadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.upload("upload", caller);
            }
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryDownloadAjax = new ibas.FileRepositoryDownloadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/file/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.download("download", caller);
            }
            /**
             * 查询 集成任务
             * @param fetcher 查询者
             */
            fetchIntegrationJob(fetcher: ibas.IFetchCaller<bo.IntegrationJob>): void {
                super.fetch(bo.IntegrationJob.name, fetcher);
            }
            /**
             * 保存 集成任务
             * @param saver 保存者
             */
            saveIntegrationJob(saver: ibas.ISaveCaller<bo.IntegrationJob>): void {
                super.save(bo.IntegrationJob.name, saver);
            }
            /**
             * 查询 集成动作
             * @param fetcher 查询者
             */
            fetchAction(fetcher: IActionFetcher): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let criteria: ibas.ICriteria = null;
                let jobActions: ibas.IList<bo.IIntegrationJobAction> = new ibas.ArrayList<bo.IIntegrationJobAction>();
                if (fetcher.criteria instanceof ibas.Criteria) {
                    criteria = fetcher.criteria;
                } else if (fetcher.criteria instanceof bo.IntegrationJob) {
                    // 集成任务，查询所有动作
                    criteria = new ibas.Criteria();
                    for (let item of fetcher.criteria.integrationJobActions) {
                        let condition: ibas.ICondition = criteria.conditions.create();
                        condition.alias = bo.CRITERIA_CONDITION_ALIAS_ACTION_ID;
                        condition.value = item.actionId;
                        condition.relationship = ibas.emConditionRelationship.OR;
                        jobActions.add(item);
                    }
                } else if (fetcher.criteria instanceof bo.IntegrationJobAction) {
                    // 集成动作
                    criteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.CRITERIA_CONDITION_ALIAS_ACTION_ID;
                    condition.value = fetcher.criteria.actionId;
                    jobActions.add(fetcher.criteria);
                } else if (fetcher.criteria instanceof Array) {
                    // 数组
                    criteria = new ibas.Criteria();
                    for (let item of fetcher.criteria) {
                        if (item instanceof bo.IntegrationJobAction) {
                            // 动作
                            let condition: ibas.ICondition = criteria.conditions.create();
                            condition.alias = bo.CRITERIA_CONDITION_ALIAS_ACTION_ID;
                            condition.value = item.actionId;
                            condition.relationship = ibas.emConditionRelationship.OR;
                            jobActions.add(item);
                        } else if (item instanceof ibas.Condition) {
                            // 查寻条件
                            criteria.conditions.add(item);
                        }
                    }
                }
                let that: this = this;
                let boRepository: ibas.BORepositoryAjax = new ibas.BORepositoryAjax();
                boRepository.address = this.address.replace("/services/rest/data/", "/services/rest/action/");
                boRepository.token = this.token;
                boRepository.converter = this.createConverter();
                let caller: ibas.IFetchCaller<bo.IAction> = {
                    caller: fetcher.caller,
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Action>): void {
                        if (opRslt.resultCode !== 0) {
                            fetcher.onCompleted(opRslt);
                        } else {
                            for (let action of opRslt.resultObjects) {
                                // 补充地址
                                action.group = that.toPackageUrl(action);
                                let jobAction: bo.IIntegrationJobAction = jobActions.firstOrDefault(c => c.actionId === action.id);
                                if (!ibas.objects.isNull(jobAction)) {
                                    // 输入描述
                                    action.remark = jobAction.actionRemark;
                                    // 输入设置
                                    for (let item of jobAction.integrationJobActionCfgs) {
                                        if (ibas.objects.isNull(item.key)) {
                                            continue;
                                        }
                                        if (ibas.objects.isNull(action.configs)) {
                                            action.configs = new ibas.ArrayList<bo.ActionConfig>();
                                        }
                                        let config: bo.ActionConfig = action.configs.firstOrDefault(c => c.key === item.key);
                                        if (ibas.objects.isNull(config)) {
                                            config = new bo.ActionConfig();
                                            config.key = item.key;
                                            config.value = item.value;
                                            config.remark = item.remark;
                                            action.configs.add(config);
                                        } else {
                                            config.key = item.key;
                                            config.value = item.value;
                                            config.remark = item.remark;
                                        }
                                    }
                                }
                            }
                            fetcher.onCompleted(opRslt);
                        }
                    }
                };
                boRepository.fetch(bo.Action.name, caller);
            }
            /**
             * 删除 集成动作
             * @param fetcher 查询者
             */
            deleteActionPackage(deleter: IPackageDeleter): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let boRepository: ibas.BORepositoryAjax = new ibas.BORepositoryAjax();
                boRepository.address = this.address.replace("/services/rest/data/", "/services/rest/action/");
                boRepository.token = this.token;
                boRepository.converter = this.createConverter();
                let method: string = ibas.strings.format("deletePackage?group={0}&token={1}", deleter.beDeleted, this.token);
                boRepository.callRemoteMethod(method, undefined, (opRslt) => {
                    deleter.onCompleted.call(ibas.objects.isNull(deleter.caller) ? deleter : deleter.caller, opRslt);
                });
            }
            /**
             * 上传程序包
             * @param caller 调用者
             */
            uploadActionPackage(caller: ibas.IUploadFileCaller<bo.ActionPackage>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: ibas.FileRepositoryUploadAjax = new ibas.FileRepositoryUploadAjax();
                fileRepository.address = this.address.replace("/services/rest/data/", "/services/rest/action/");
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.upload("uploadPackage", caller);
            }
            /**
             * 查询程序包
             * @param fetcher 调用者
             */
            fetchActionPackage(fetcher: ibas.IFetchCaller<bo.ActionPackage>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let boRepository: ibas.BORepositoryAjax = new ibas.BORepositoryAjax();
                boRepository.address = this.address.replace("/services/rest/data/", "/services/rest/action/");
                boRepository.token = this.token;
                boRepository.converter = this.createConverter();
                let method: string = ibas.strings.format("fetchPackage?token={0}", this.token);
                if (ibas.objects.isNull(fetcher.criteria)) {
                    fetcher.criteria = new ibas.Criteria();
                }
                boRepository.callRemoteMethod(method, JSON.stringify(boRepository.converter.convert(fetcher.criteria, method)), (opRslt) => {
                    fetcher.onCompleted.call(ibas.objects.isNull(fetcher.caller) ? fetcher : fetcher.caller, opRslt);
                });
            }
            /**
             * 获取动作地址
             */
            toUrl(action: bo.Action): string {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let url: string = this.address.replace("/services/rest/data/", "/services/rest/action/");
                url += ibas.strings.format("{0}?token={1}", action.fullPath(), this.token);
                return encodeURI(url);
            }
            /**
             * 获取动作地址
             */
            toPackageUrl(action: bo.Action): string {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let url: string = this.address.replace("/services/rest/data/", "/services/rest/action/");
                if (ibas.objects.isNull(action.group)) {
                    return encodeURI(url);
                } else if (action.group.startsWith("http")) {
                    return encodeURI(action.group);
                }
                return encodeURI(url + action.group);
            }
            /**
             * 下载代码文件
             * @param caller 调用者
             */
            downloadCode(caller: ICodeDownloader<Blob>): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let fileRepository: CodeRepositoryDownloadAjax = new CodeRepositoryDownloadAjax();
                fileRepository.address = this.toUrl(caller.action);
                fileRepository.token = this.token;
                fileRepository.converter = this.createConverter();
                fileRepository.download("", caller);
            }
            /**
             * 调用后台动作
             * @param caller 调用者
             */
            goAction(caller: IActionGoer): void {
                if (!this.address.endsWith("/")) { this.address += "/"; }
                let url: string = this.address.replace("/services/rest/data/", "/services/rest/action/");
                let boRepository: ibas.FileRepositoryUploadAjax = new ibas.FileRepositoryUploadAjax();
                boRepository.address = url;
                boRepository.token = this.token;
                boRepository.converter = this.createConverter();
                let formData: FormData = new FormData();
                formData.append("ACTION_GROUP", caller.group);
                formData.append("ACTION_NAME", caller.name);
                if (caller.parameters instanceof Array) {
                    for (let item of caller.parameters) {
                        formData.append(item.key, item.value);
                    }
                }
                boRepository.callRemoteMethod(ibas.strings.format("goAction?token={0}", this.token), formData, (opRslt) => {
                    caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
                });
            }
        }
        /** 代码下载者 */
        export interface ICodeDownloader<T> extends ibas.IMethodCaller<T> {
            /** 标识 */
            action: bo.Action;
        }
        /** 包删除者 */
        export interface IPackageDeleter extends ibas.IMethodCaller<any> {
            /** 被删除 */
            beDeleted: string;
        }
        /** 代码下载仓库 */
        export class CodeRepositoryDownloadAjax extends ibas.RemoteRepositoryAjax {
            constructor() {
                super();
                this.autoParsing = false;
            }
            /**
             * 下载文件
             * @param method 方法地址
             * @param caller 调用者
             */
            download<T>(method: string, caller: ibas.IMethodCaller<any>): void {
                this.callRemoteMethod(method, undefined, (data) => {
                    let opRslt: ibas.IOperationResult<any> = null;
                    if (data instanceof ibas.OperationResult) {
                        opRslt = data;
                    } else {
                        opRslt = new ibas.OperationResult();
                        opRslt.resultObjects.add(data);
                    }
                    caller.onCompleted.call(ibas.objects.isNull(caller.caller) ? caller : caller.caller, opRslt);
                });
            }
            protected createHttpRequest(method: string): XMLHttpRequest {
                let methodUrl: string = this.methodUrl(method);
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                xhr.open("GET", methodUrl, true);
                xhr.responseType = "blob";
                return xhr;
            }
        }

        /** 业务对象仓库-集成开发 */
        export class BORepositoryIntegrationDevelopment extends ibas.BORepositoryApplication {
            constructor() {
                super();
                // 重置状态
                this.offline = true;
                this.address = "";
                this.token = "";
            }
            /** 创建此模块的后端与前端数据的转换者 */
            protected createConverter(): ibas.IDataConverter {
                return new DataConverter;
            }
            /**
             * 读取 集成动作
             * @param fetcher 读取者
             */
            loadActions(loader: IActionsLoader): void {
                let boRepository: ibas.FileRepositoryAjax = new ibas.FileRepositoryAjax();
                boRepository.address = this.address;
                boRepository.token = this.token;
                boRepository.autoParsing = true;
                boRepository.converter = this.createConverter();
                boRepository.load(loader.url, loader);
            }
        }
        /** 动作读取者 */
        export interface IActionsLoader extends ibas.IMethodCaller<bo.Action> {
            /** 地址 */
            url: string;
        }
    }
}