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
        export class IntegrationActionListApp extends ibas.Application<IIntegrationActionListView> {

            /** 应用标识 */
            static APPLICATION_ID: string = "8171c5da-93fe-4809-ba17-feb0fefecf93";
            /** 应用名称 */
            static APPLICATION_NAME: string = "integration_app_action_list";
            /** 构造函数 */
            constructor() {
                super();
                this.id = IntegrationActionListApp.APPLICATION_ID;
                this.name = IntegrationActionListApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.fetchPackageEvent = this.fetchPackage;
                this.view.deletePackageEvent = this.deletePackage;
                this.view.uploadPackageEvent = this.uploadPackage;
                this.view.commentPackageEvent = this.commentPackage;
                this.view.viewActionEvent = this.viewAction;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.fetchPackage(new ibas.Criteria());
            }
            /** 查询数据 */
            protected fetchPackage(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.fetchActionPackage({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.ActionPackage>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.view.showPackages(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            /** 上传程序包 */
            protected uploadPackage(formData: FormData): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.uploadActionPackage({
                    fileData: formData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.ActionPackage>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            if (opRslt.resultObjects.length === 0) {
                                that.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_data_fetched_none"));
                            }
                            that.messages(ibas.emMessageType.SUCCESS, ibas.i18n.prop("integration_upload_package") + ibas.i18n.prop("shell_sucessful"));
                            that.view.showPackages(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_uploading_file"));
            }
            /** 删除数据，参数：目标数据集合 */
            protected deletePackage(data: bo.ActionPackage | bo.ActionPackage[]): void {
                // 检查目标数据
                let beDeleteds: ibas.ArrayList<string> = new ibas.ArrayList<string>();
                for (let item of ibas.arrays.create(data)) {
                    let value: string = item.id;
                    if (ibas.strings.isEmpty(value)) {
                        continue;
                    }
                    if (value.indexOf("/") > 0) {
                        value = value.substring(value.lastIndexOf("/") + 1);
                    }
                    if (!beDeleteds.contain(value)) {
                        beDeleteds.add(value);
                    }
                }
                // 没有选择删除的对象
                if (beDeleteds.length === 0) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_delete")
                    ));
                    return;
                }
                let that: this = this;
                this.messages({
                    type: ibas.emMessageType.QUESTION,
                    title: ibas.i18n.prop(this.name),
                    message: ibas.i18n.prop("shell_confirm") +
                        ibas.i18n.prop("integration_delete_package") +
                        ibas.strings.format("[{0}]", ibas.strings.valueOf(beDeleteds)),
                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                    onCompleted(action: ibas.emMessageAction): void {
                        if (action !== ibas.emMessageAction.YES) {
                            return;
                        }
                        let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                        ibas.queues.execute(beDeleteds, (data, next) => {
                            // 处理数据
                            boRepository.deleteActionPackage({
                                package: data,
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
            /** 查询数据 */
            protected commentPackage(aPackage: bo.ActionPackage, remarks: string): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.commentActionPackage({
                    package: aPackage.id,
                    remarks: remarks,
                    onCompleted(opRslt: ibas.IOperationMessage): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            aPackage.remarks = remarks;
                            that.view.showPackages(aPackage);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_fetching_data"));
            }
            protected viewAction(data: bo.Action): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
                this.view.showAction(data);
            }
        }
        /** 视图-集成任务 */
        export interface IIntegrationActionListView extends ibas.IView {
            /** 查询包 */
            fetchPackageEvent: Function;
            /** 上传包 */
            uploadPackageEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deletePackageEvent: Function;
            /** 注释包 */
            commentPackageEvent: Function;
            /** 显示包 */
            showPackages(datas: bo.ActionPackage[] | bo.ActionPackage): void;
            /** 查看动作 */
            viewActionEvent: Function;
            /** 显示动作 */
            showAction(action: bo.Action): void;
        }
    }
}