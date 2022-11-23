/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace app {

        /** 列表应用-集成任务 */
        export class IntegrationJobListApp extends ibas.BOListApplication<IIntegrationJobListView, bo.IntegrationJob> {

            /** 应用标识 */
            static APPLICATION_ID: string = "deab706c-4f42-4400-9b1b-945e1340d9a9";
            /** 应用名称 */
            static APPLICATION_NAME: string = "integration_app_integrationjob_list";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.IntegrationJob.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = IntegrationJobListApp.APPLICATION_ID;
                this.name = IntegrationJobListApp.APPLICATION_NAME;
                this.boCode = IntegrationJobListApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.editDataEvent = this.editData;
                this.view.deleteDataEvent = this.deleteData;
                this.view.viewDataEvent = this.viewData;
                this.view.chooseActionPackageEvent = this.chooseActionPackage;
                this.view.batchUpdateActionEvent = this.batchUpdateAction;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.fetchIntegrationJob({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IntegrationJob>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showData(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 新建数据 */
            protected newData(): void {
                let app: IntegrationJobEditApp = new IntegrationJobEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run();
            }
            /** 查看数据，参数：目标数据 */
            protected viewData(data: bo.IntegrationJob): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
                /*
                // 直接调用
                let actionRunner: IntegrationJobRunnerApp = new IntegrationJobRunnerApp();
                actionRunner.navigation = this.navigation;
                actionRunner.viewShower = this.viewShower;
                actionRunner.autoRun = false;
                actionRunner.run(data);
                */
                // 服务调用
                ibas.servicesManager.runApplicationService({
                    proxy: new IntegrationJobServiceProxy({
                        jobName: data.name,
                        autoRun: false,
                    }),
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 编辑数据，参数：目标数据 */
            protected editData(data: bo.IntegrationJob): void {
                // 检查目标数据
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_edit")
                    ));
                    return;
                }
                let app: IntegrationJobEditApp = new IntegrationJobEditApp();
                app.navigation = this.navigation;
                app.viewShower = this.viewShower;
                app.run(data);
            }
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.IntegrationJob | bo.IntegrationJob[]): void {
                let beDeleteds: ibas.IList<bo.IntegrationJob> = ibas.arrays.create(data);
                // 没有选择删除的对象
                if (beDeleteds.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                // 标记删除对象
                beDeleteds.forEach((value) => {
                    value.delete();
                });
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_multiple_data_delete_continue", beDeleteds.length),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action !== ibas.emMessageAction.YES) {
                            return;
                        }
                        let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                        ibas.queues.execute(beDeleteds, (data, next) => {
                            // 处理数据
                            boRepository.saveIntegrationJob({
                                beSaved: data,
                                onCompleted(opRslt: ibas.IOperationResult<bo.IntegrationJob>): void {
                                    if (opRslt.resultCode !== 0) {
                                        next(new Error(ibas.i18n.prop("shell_data_delete_error", data, opRslt.message)));
                                    } else {
                                        next();
                                    }
                                }
                            });
                            that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_deleting", data));
                        }, (error) => {
                            // 处理完成
                            if (error instanceof Error) {
                                that.messages(ibas.emMessageType.ERROR, error.message);
                            } else {
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                            }
                            that.busy(false);
                        });
                        that.busy(true);
                    }
                });
            }
            /** 选择程序包 */
            protected chooseActionPackage(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.fetchActionPackage({
                    criteria: new ibas.Criteria(),
                    onCompleted(opRslt: ibas.IOperationResult<bo.ActionPackage>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.view.showActionPackage(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 批量更新接口 */
            protected async batchUpdateAction(datas: bo.IntegrationJob[], selectedPackage: bo.ActionPackage): Promise<void> {
                let that: this = this;
                if (datas.length === 0) {
                    datas = await that.getAllIntegrations();
                }
                let updateLogs: ibas.ArrayList<IUpdateLog> = new ibas.ArrayList<IUpdateLog>();
                try {
                    // 遍历集成任务
                    for (let job of datas) {
                        let jobUpdateLogs: ibas.ArrayList<IUpdateLog> = new ibas.ArrayList<IUpdateLog>();
                        // 遍历集成任务动作
                        for (let jobAction of job.integrationJobActions) {
                            let updateAction: bo.Action = selectedPackage.actions.find(c => c.name === jobAction.actionName);
                            if (!ibas.objects.isNull(updateAction)) {
                                jobAction.actionGroup = updateAction.group;
                                jobAction.actionId = updateAction.id;
                                jobAction.actionName = updateAction.name;
                                jobAction.actionRemark = updateAction.remark;
                                for (let cItem of updateAction.configs) {
                                    // 添加默认配置
                                    if (jobAction.integrationJobActionCfgs.firstOrDefault((c) => { return c.key === cItem.key; }) !== null) {
                                        continue;
                                    }
                                    let jobConfig: bo.ActionConfig = jobAction.integrationJobActionCfgs.create();
                                    jobConfig.key = cItem.key;
                                    jobConfig.value = cItem.value;
                                    jobConfig.remark = cItem.remark;
                                }
                                jobUpdateLogs.add({
                                    jobName: job.name,
                                    jobActionName: jobAction.actionName,
                                    updateMessage: ""
                                });
                            } else {
                                jobUpdateLogs.add({
                                    jobName: job.name,
                                    jobActionName: jobAction.actionName,
                                    updateMessage: ibas.i18n.prop("integration_integrationjoblist_batch_update_job_isnot")
                                });
                            }
                        }
                        if (!ibas.objects.isNull(await that.saveJob(job))) {
                            jobUpdateLogs.forEach(c => ibas.strings.isEmpty(c.updateMessage) ? c.updateMessage =
                                ibas.i18n.prop("integration_integrationjoblist_batch_update_success") : c.updateMessage = c.updateMessage);
                        } else {
                            jobUpdateLogs.forEach(c => ibas.strings.isEmpty(c.updateMessage) ? c.updateMessage =
                                ibas.i18n.prop("integration_integrationjoblist_batch_update_error") : c.updateMessage = c.updateMessage);
                        }
                        updateLogs.add(jobUpdateLogs);
                    }
                    let str: string = "";
                    for (let item of updateLogs) {
                        str += ibas.strings.format("{0}-{1}-{2}\n", item.jobName, item.jobActionName, item.updateMessage);
                    }
                    that.messages(ibas.emMessageType.INFORMATION, str);
                } catch (error) {
                    that.messages(ibas.emMessageType.ERROR, error.message);
                }
            }
            /** 保存集成任务 */
            private async saveJob(data: bo.IntegrationJob): Promise<bo.IntegrationJob> {
                let promise: Promise<bo.IntegrationJob> = new Promise<bo.IntegrationJob>(resolve => {
                    let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                    boRepository.saveIntegrationJob({
                        beSaved: data,
                        onCompleted(opRslt: ibas.IOperationResult<bo.IntegrationJob>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                resolve(opRslt.resultObjects.firstOrDefault());
                            } catch (error) {
                                resolve(null);
                            }
                        }
                    });
                });
                return promise;
            }
            /** 获取所有集成任务 */
            private async getAllIntegrations(): Promise<bo.IntegrationJob[]> {
                let promise: Promise<bo.IntegrationJob[]> = new Promise<bo.IntegrationJob[]>(resolve => {
                    let criteria: ibas.Criteria = new ibas.Criteria();
                    criteria.result = -1;
                    let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                    boRepository.fetchIntegrationJob({
                        criteria: criteria,
                        onCompleted(opRslt: ibas.IOperationResult<bo.IntegrationJob>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                resolve(opRslt.resultObjects);
                            } catch (error) {
                                resolve(null);
                            }
                        }
                    });
                });
                return promise;
            }
        }
        /** 视图-集成任务 */
        export interface IIntegrationJobListView extends ibas.IBOListView {
            /** 编辑数据事件，参数：编辑对象 */
            editDataEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 显示数据 */
            showData(datas: bo.IntegrationJob[]): void;
            /** 批量更新接口 */
            batchUpdateActionEvent: Function;
            /** 选择程序包 */
            chooseActionPackageEvent: Function;
            /** 显示程序包 */
            showActionPackage(datas: bo.ActionPackage[]): void;
        }
        export interface IUpdateLog {
            jobName: string;
            jobActionName: string;
            updateMessage: string;
        }
    }
}