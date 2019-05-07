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
                this.view.fetchDataEvent = this.fetchData;
                this.view.deleteDataEvent = this.deleteData;
                this.view.uploadActionPackageEvent = this.uploadActionPackage;
                this.view.viewCodeEvent = this.viewCode;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            /** 查询数据 */
            protected fetchData(criteria: ibas.ICriteria): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.fetchAction({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Action>): void {
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
            /** 上传程序包 */
            protected uploadActionPackage(formData: FormData): void {
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.uploadActionPackage({
                    fileData: formData,
                    onCompleted(opRslt: ibas.IOperationResult<bo.Action>): void {
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
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_uploading_file"));
            }
            protected viewCode(data: bo.Action): void {
                if (ibas.objects.isNull(data)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("shell_data_view")
                    ));
                    return;
                }
                this.busy(true);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.downloadCode({
                    action: data,
                    onCompleted(opRslt: ibas.IOperationResult<Blob>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            that.view.showCode(opRslt.resultObjects.firstOrDefault());
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
                this.proceeding(ibas.emMessageType.INFORMATION, ibas.i18n.prop("shell_downloading_file"));
            }
            /** 删除数据，参数：目标数据集合 */
            protected deleteData(data: bo.Action | bo.Action[]): void {
                // 检查目标数据
                let beDeleteds: ibas.ArrayList<string> = new ibas.ArrayList<string>();
                if (data instanceof Array) {
                    for (let item of data) {
                        let value: string = item.group;
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
                } else if (!ibas.objects.isNull(data)) {
                    let value: string = data.group;
                    if (!ibas.strings.isEmpty(value)) {
                        if (value.indexOf("/") > 0) {
                            value = value.substring(value.lastIndexOf("/") + 1);
                        }
                        if (!beDeleteds.contain(value)) {
                            beDeleteds.add(value);
                        }
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
                                beDeleted: data,
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
        }
        /** 视图-集成任务 */
        export interface IIntegrationActionListView extends ibas.IBOQueryView {
            /** 上传包 */
            uploadActionPackageEvent: Function;
            /** 删除数据事件，参数：删除对象集合 */
            deleteDataEvent: Function;
            /** 查看代码 */
            viewCodeEvent: Function;
            /** 显示数据 */
            showData(datas: bo.Action[]): void;
            /** 显示代码 */
            showCode(code: Blob): void;
        }
    }
}