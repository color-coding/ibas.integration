/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace app {

        /** 编辑应用-集成任务 */
        export class IntegrationJobEditApp extends ibas.BOEditApplication<IIntegrationJobEditView, bo.IntegrationJob> {

            /** 应用标识 */
            static APPLICATION_ID: string = "8b8892ec-3b73-44b6-83cd-3d048a60c010";
            /** 应用名称 */
            static APPLICATION_NAME: string = "integration_app_integrationjob_edit";
            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = bo.IntegrationJob.BUSINESS_OBJECT_CODE;
            /** 构造函数 */
            constructor() {
                super();
                this.id = IntegrationJobEditApp.APPLICATION_ID;
                this.name = IntegrationJobEditApp.APPLICATION_NAME;
                this.boCode = IntegrationJobEditApp.BUSINESS_OBJECT_CODE;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.deleteDataEvent = this.deleteData;
                this.view.createDataEvent = this.createData;
                this.view.chooseApplicationEvent = this.chooseApplication;
                this.view.chooseBusinessObjectEvent = this.chooseBusinessObject;
                this.view.addIntegrationJobActionEvent = this.addIntegrationJobAction;
                this.view.removeIntegrationJobActionEvent = this.removeIntegrationJobAction;
                this.view.editJobActionEvent = this.editJobActionEvent;
                this.view.addIntegrationJobActionCfgEvent = this.addIntegrationJobActionCfg;
                this.view.removeIntegrationJobActionCfgEvent = this.removeIntegrationJobActionCfg;
                this.view.chooseJobActionEvent = this.chooseJobAction;
                this.view.chooseJobActionCfgConfigItemEvent = this.chooseJobActionCfgConfigItem;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                super.viewShowed();
                if (ibas.objects.isNull(this.editData)) {
                    // 创建编辑对象实例
                    this.editData = new bo.IntegrationJob();
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                }
                this.view.showIntegrationJob(this.editData);
                this.view.showIntegrationJobActions(this.editData.integrationJobActions.filterDeleted());
            }
            /** 运行,覆盖原方法 */
            run(): void;
            run(data: bo.IntegrationJob): void;
            run(): void {
                let that: this = this;
                if (ibas.objects.instanceOf(arguments[0], bo.IntegrationJob)) {
                    let data: bo.IntegrationJob = arguments[0];
                    // 新对象直接编辑
                    if (data.isNew) {
                        that.editData = data;
                        that.show();
                        return;
                    }
                    // 尝试重新查询编辑对象
                    let criteria: ibas.ICriteria = data.criteria();
                    if (!ibas.objects.isNull(criteria) && criteria.conditions.length > 0) {
                        // 有效的查询对象查询
                        let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                        boRepository.fetchIntegrationJob({
                            criteria: criteria,
                            onCompleted(opRslt: ibas.IOperationResult<bo.IntegrationJob>): void {
                                let data: bo.IntegrationJob;
                                if (opRslt.resultCode === 0) {
                                    data = opRslt.resultObjects.firstOrDefault();
                                }
                                if (ibas.objects.instanceOf(data, bo.IntegrationJob)) {
                                    // 查询到了有效数据
                                    that.editData = data;
                                    that.show();
                                } else {
                                    // 数据重新检索无效
                                    that.messages({
                                        type: ibas.emMessageType.WARNING,
                                        message: ibas.i18n.prop("shell_data_deleted_and_created"),
                                        onCompleted(): void {
                                            that.show();
                                        }
                                    });
                                }
                            }
                        });
                        // 开始查询数据
                        return;
                    }
                }
                super.run.apply(this, arguments);
            }
            /** 待编辑的数据 */
            protected editData: bo.IntegrationJob;
            /** 待编辑的数据 */
            protected editIntegrationJobAction: bo.IntegrationJobAction;
            /** 保存数据 */
            protected saveData(): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.saveIntegrationJob({
                    beSaved: this.editData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IntegrationJob>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                // 删除成功，释放当前对象
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_delete") + ibas.i18n.prop("shell_sucessful"));
                                that.editData = undefined;
                            } else {
                                // 替换编辑对象
                                that.editData = opRslt.resultObjects.firstOrDefault();
                                that.messages(ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("shell_data_save") + ibas.i18n.prop("shell_sucessful"));
                            }
                            // 刷新当前视图
                            that.viewShowed();
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_saving_data"));
            }
            /** 删除数据 */
            protected deleteData(): void {
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_delete_continue"),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action === ibas.emMessageAction.YES) {
                            that.editData.delete();
                            that.saveData();
                        }
                    }
                });
            }
            /** 新建数据，参数1：是否克隆 */
            protected createData(clone: boolean): void {
                let that: this = this;
                let createData: Function = function (): void {
                    if (clone) {
                        // 克隆对象
                        that.editData = that.editData.clone();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_cloned_new"));
                        that.viewShowed();
                    } else {
                        // 新建对象
                        that.editData = new bo.IntegrationJob();
                        that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_data_created_new"));
                        that.viewShowed();
                    }
                };
                if (that.editData.isDirty) {
                    this.messages({
                        type: ibas.emMessageType.QUESTION,
                        title: ibas.i18n.prop(this.name),
                        message: ibas.i18n.prop("shell_data_not_saved_continue"),
                        actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                        onCompleted(action: ibas.emMessageAction): void {
                            if (action === ibas.emMessageAction.YES) {
                                createData();
                            }
                        }
                    });
                } else {
                    createData();
                }
            }
            /** 添加集成任务-动作事件 */
            private addIntegrationJobAction(): void {
                this.editData.integrationJobActions.create();
                // 仅显示没有标记删除的
                this.view.showIntegrationJobActions(this.editData.integrationJobActions.filterDeleted());
            }
            /** 删除集成任务-动作事件 */
            private removeIntegrationJobAction(items: bo.IntegrationJobAction[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editData.integrationJobActions.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editData.integrationJobActions.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showIntegrationJobActions(this.editData.integrationJobActions.filterDeleted());
            }
            /** 编辑审集成任务-动作事件 */
            private editJobActionEvent(item: bo.IntegrationJobAction): void {
                this.editIntegrationJobAction = item;
                if (ibas.objects.isNull(this.editIntegrationJobAction)) {
                    // 无编辑对象
                    this.view.showIntegrationJobActions(this.editData.integrationJobActions.filterDeleted());
                } else {
                    // 存在编辑对象
                    this.view.showIntegrationJobActionCfgs(this.editIntegrationJobAction.integrationJobActionCfgs.filterDeleted());
                }
            }
            /** 添加集成任务-动作事件 */
            private addIntegrationJobActionCfg(): void {
                this.editIntegrationJobAction.integrationJobActionCfgs.create();
                // 仅显示没有标记删除的
                this.view.showIntegrationJobActionCfgs(this.editIntegrationJobAction.integrationJobActionCfgs.filterDeleted());
            }
            /** 删除集成任务-动作事件 */
            private removeIntegrationJobActionCfg(items: bo.IntegrationJobActionCfg[]): void {
                // 非数组，转为数组
                if (!(items instanceof Array)) {
                    items = [items];
                }
                if (items.length === 0) {
                    return;
                }
                // 移除项目
                for (let item of items) {
                    if (this.editIntegrationJobAction.integrationJobActionCfgs.indexOf(item) >= 0) {
                        if (item.isNew) {
                            // 新建的移除集合
                            this.editIntegrationJobAction.integrationJobActionCfgs.remove(item);
                        } else {
                            // 非新建标记删除
                            item.delete();
                        }
                    }
                }
                // 仅显示没有标记删除的
                this.view.showIntegrationJobActionCfgs(this.editIntegrationJobAction.integrationJobActionCfgs.filterDeleted());
            }
            /** 选择业务对象 */
            private chooseBusinessObject(): void {
                let that: this = this;
                let criteria: ibas.ICriteria = new ibas.Criteria();
                criteria.noChilds = true;
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias =initialfantasy.bo.BOInformation.PROPERTY_CODE_NAME;
                condition.value = ".";
                condition.operation = ibas.emConditionOperation.NOT_CONTAIN;
                ibas.servicesManager.runChooseService<initialfantasy.bo.IBOInformation>({
                    boCode: initialfantasy.bo.BO_CODE_BOINFORMATION,
                    criteria: criteria,
                    onCompleted(selecteds: ibas.IList<initialfantasy.bo.IBOInformation>): void {
                        // 获取触发的对象
                        that.editData.boCode = selecteds.firstOrDefault().code;
                    }
                });
            }
            /** 选择应用 */
            private chooseApplication(): void {
                // 不能提供
            }
            /** 选择任务动作 */
            private chooseJobAction(caller: bo.IntegrationJobAction): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.Action>({
                    boCode: bo.Action.name,
                    criteria: [],
                    onCompleted(selecteds: ibas.IList<bo.Action>): void {
                        // 获取触发的对象
                        let index: number = that.editData.integrationJobActions.indexOf(caller);
                        let item: bo.IntegrationJobAction = that.editData.integrationJobActions[index];
                        // 选择返回数量多余触发数量时,自动创建新的项目
                        let created: boolean = false;
                        for (let selected of selecteds) {
                            if (ibas.objects.isNull(item)) {
                                item = that.editData.integrationJobActions.create();
                                created = true;
                            }
                            item.actionId = selected.id;
                            item.actionName = selected.name;
                            item.actionRemark = selected.remark;
                            for (let cItem of selected.configs) {
                                // 添加默认配置
                                if (item.integrationJobActionCfgs.firstOrDefault((c) => { return c.key === cItem.key; }) !== null) {
                                    continue;
                                }
                                let jobConfig: bo.ActionConfig = item.integrationJobActionCfgs.create();
                                jobConfig.key = cItem.key;
                                jobConfig.value = cItem.value;
                                jobConfig.remark = cItem.remark;
                            }
                            item = null;
                        }
                        if (created) {
                            // 创建了新的行项目
                            that.view.showIntegrationJobActions(that.editData.integrationJobActions.filterDeleted());
                        }
                    }
                });
            }
            /** 选择任务动作配置-配置项目 */
            private chooseJobActionCfgConfigItem(caller: bo.IntegrationJobActionCfg): void {
                let that: this = this;
                ibas.servicesManager.runChooseService<bo.IntegrationJobActionCfg>({
                    boCode: initialfantasy.bo.BO_CODE_SYSTEM_CONFIG,
                    criteria: [],
                    onCompleted(selecteds: ibas.IList<ibas.KeyValue>): void {
                        // 获取触发的对象
                        let index: number = that.editIntegrationJobAction.integrationJobActionCfgs.indexOf(caller);
                        let item: bo.IntegrationJobActionCfg = that.editIntegrationJobAction.integrationJobActionCfgs[index];
                        // 选择返回数量多余触发数量时,自动创建新的项目
                        let created: boolean = false;
                        for (let selected of selecteds) {
                            if (ibas.objects.isNull(item)) {
                                item = that.editIntegrationJobAction.integrationJobActionCfgs.create();
                                created = true;
                            }
                            item.key = selected.key;
                            item.value = "${" + selected.key + "}";
                            item = null;
                        }
                        if (created) {
                            // 创建了新的行项目
                            that.view.showIntegrationJobActionCfgs(that.editIntegrationJobAction.integrationJobActionCfgs.filterDeleted());
                        }
                    }
                });
            }

        }
        /** 视图-集成任务 */
        export interface IIntegrationJobEditView extends ibas.IBOEditView {
            /** 显示数据 */
            showIntegrationJob(data: bo.IntegrationJob): void;
            /** 删除数据事件 */
            deleteDataEvent: Function;
            /** 新建数据事件，参数1：是否克隆 */
            createDataEvent: Function;
            /** 选择业务对象 */
            chooseBusinessObjectEvent: Function;
            /** 选择应用 */
            chooseApplicationEvent: Function;
            /** 添加集成任务-动作事件 */
            addIntegrationJobActionEvent: Function;
            /** 删除集成任务-动作事件 */
            removeIntegrationJobActionEvent: Function;
            /** 编辑任务动作 */
            editJobActionEvent: Function;
            /** 显示数据 */
            showIntegrationJobActions(datas: bo.IntegrationJobAction[]): void;
            /** 选择任务动作 */
            chooseJobActionEvent: Function;
            /** 添加集成任务-动作事件 */
            addIntegrationJobActionCfgEvent: Function;
            /** 删除集成任务-动作事件 */
            removeIntegrationJobActionCfgEvent: Function;
            /** 显示数据 */
            showIntegrationJobActionCfgs(datas: bo.IntegrationJobActionCfg[]): void;
            /** 选择任务动作配置-配置项目 */
            chooseJobActionCfgConfigItemEvent: Function;
        }
    }
}