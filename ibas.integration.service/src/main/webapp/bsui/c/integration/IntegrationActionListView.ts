/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace ui {
        export namespace c {
            /**
             * 列表视图-集成任务
             */
            export class IntegrationActionListView extends ibas.BOQueryView implements app.IIntegrationActionListView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Action;
                }
                /** 上传包 */
                uploadActionPackageEvent: Function;
                /** 删除数据事件，参数：删除对象集合 */
                deleteDataEvent: Function;
                /** 查看代码 */
                viewCodeEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_action_id"),
                                width: "16rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "id",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "id",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_action_name"),
                                width: "16rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "name",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                filterProperty: "name",
                                sortProperty: "name",
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_action_group"),
                                width: "16rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "group",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_action_path"),
                                width: "16rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "path",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_action_remark"),
                                width: "20rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "remark",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                filterProperty: "remark",
                                sortProperty: "remark",
                            }),
                        ]
                    });
                    return new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("integration_delete_package"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent, that.table.getSelecteds());
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("integration_view_code"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://source-code",
                                    press: function (): void {
                                        that.fireViewEvents(that.viewCodeEvent, that.table.getSelecteds().firstOrDefault());
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.ui.unified.FileUploader("", {
                                    name: "file",
                                    fileType: ["war", "jar", "zip"],
                                    icon: "sap-icon://developer-settings",
                                    iconOnly: true,
                                    placeholder: ibas.i18n.prop("integration_upload_package"),
                                    change(event: sap.ui.base.Event): void {
                                        if (ibas.objects.isNull(event.getParameters())
                                            || ibas.objects.isNull(event.getParameters().files)
                                            || event.getParameters().files.length === 0) {
                                            return;
                                        }
                                        let fileData: FormData = new FormData();
                                        fileData.append("file", event.getParameters().files[0], encodeURI(event.getParameters().newValue));
                                        that.application.viewShower.messages({
                                            type: ibas.emMessageType.QUESTION,
                                            title: that.application.description,
                                            actions: [
                                                ibas.emMessageAction.YES,
                                                ibas.emMessageAction.NO
                                            ],
                                            message: ibas.i18n.prop("integration_upload_package"),
                                            onCompleted(action: ibas.emMessageAction): void {
                                                if (action === ibas.emMessageAction.YES) {
                                                    that.fireViewEvents(that.uploadActionPackageEvent, fileData);
                                                }
                                            }
                                        });
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.table
                        ]
                    });
                }
                private table: sap.extension.table.Table;
                /** 显示数据 */
                showData(datas: bo.Action[]): void {
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示代码 */
                showCode(code: Blob): void {
                    let that: this = this;
                    let fileReader: FileReader = new FileReader();
                    fileReader.onload = function (e: ProgressEvent): void {
                        that.application.viewShower.messages({
                            title: ibas.i18n.prop("integration_view_code"),
                            type: ibas.emMessageType.INFORMATION,
                            message: (<any>e.target).result,
                        });
                    };
                    fileReader.readAsText(code);
                }
            }
        }
    }
}