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
            export class IntegrationJobServiceView extends ibas.BODialogView implements app.IIntegrationJobServiceView {
                /** 运行任务 */
                runJobEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.ui.table.Table("", {
                        enableSelectAll: false,
                        selectionBehavior: sap.ui.table.SelectionBehavior.Row,
                        selectionMode: sap.ui.table.SelectionMode.MultiToggle,
                        visibleRowCount: 5,
                        rows: "{/rows}",
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_integrationjob_objectkey"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "objectKey"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_integrationjob_jobname"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "jobName"
                                })
                            }),
                        ]
                    });
                    openui5.utils.changeSelectionStyle(this.table, ibas.emChooseType.SINGLE);
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        stretchOnPhone: true,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [this.table],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_call"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.runJobEvent,
                                        // 获取表格选中的对象
                                        openui5.utils.getSelecteds<bo.IntegrationJob>(that.table).firstOrDefault(), false
                                    );
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_run"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.runJobEvent,
                                        // 获取表格选中的对象
                                        openui5.utils.getSelecteds<bo.IntegrationJob>(that.table).firstOrDefault(), true
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
                private table: sap.ui.table.Table;
                /** 显示数据 */
                showJobs(datas: bo.IntegrationJob[]): void {
                    this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }

            }
        }
    }
}