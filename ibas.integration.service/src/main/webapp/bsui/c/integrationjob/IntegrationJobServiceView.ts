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
             * 选择视图-集成任务
             */
            export class IntegrationJobServiceView extends ibas.DialogView implements app.IIntegrationJobServiceView {
                /** 运行任务 */
                runJobEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.Table("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        visibleRowCount: 5,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_integrationjob_objectkey"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "objectKey",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_integrationjob_name"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "name",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                        ]
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.table
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_call"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.runJobEvent, that.table.getSelecteds().firstOrDefault(), false
                                    );
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_run"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.runJobEvent, that.table.getSelecteds().firstOrDefault(), true
                                    );
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }
                private table: sap.extension.table.Table;
                /** 显示数据 */
                showJobs(datas: bo.IntegrationJob[]): void {
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }

            }
        }
    }
}