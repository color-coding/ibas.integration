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
             * 列表视图-开发终端
             */
            export class DevelopmentTerminalView extends ibas.View implements app.IDevelopmentTerminalView {
                /** 加载动作，参数1：地址 */
                loadActionsEvent: Function;
                /** 使用动作 */
                useActionEvent: Function;
                /** 运行动作 */
                runActionEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let checkbox: sap.m.CheckBox, combobox: sap.m.ComboBox;
                    this.table = new sap.ui.table.Table("", {
                        selectionMode: sap.ui.table.SelectionMode.None,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 13),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Title("", {
                                    text: ibas.i18n.prop("bo_action"),
                                })
                            ]
                        }),
                        rows: "{/rows}",
                        rowActionCount: 1,
                        rowActionTemplate: new sap.ui.table.RowAction("", {
                            items: [
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://slim-arrow-right",
                                    press: function (oEvent: any): void {
                                        that.fireViewEvents(that.useActionEvent
                                            , this.getBindingContext().getObject()
                                        );
                                    },
                                }),
                            ]
                        }),
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_action_name"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "name"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_action_path"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "path"
                                })
                            }),
                        ]
                    });
                    this.tableConfig = new sap.ui.table.Table("", {
                        selectionMode: sap.ui.table.SelectionMode.None,
                        visibleRowCount: ibas.config.get(openui5.utils.CONFIG_ITEM_LIST_TABLE_VISIBLE_ROW_COUNT, 15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        rows: "{/rows}",
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                this.tableTitle = new sap.m.Title("", {
                                    text: ibas.i18n.prop("bo_action"),
                                }),
                                new sap.m.ToolbarSpacer(""),
                                checkbox = new sap.m.CheckBox("", {
                                    text: ibas.i18n.prop("integrationdevelopment_display_console"),
                                    selected: true,
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_run"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://begin",
                                    press: function (): void {
                                        that.fireViewEvents(that.runActionEvent, !checkbox.getSelected());
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_back"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://nav-back",
                                    press: function (): void {
                                        that.tableTitle.setText(ibas.i18n.prop("bo_action"));
                                        that.splitContainer.backToTopDetail(null, null);
                                    }
                                }),
                            ]
                        }),
                        columns: [
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_actionconfig_key"),
                                template: new sap.m.Text("", {
                                    wrapping: false
                                }).bindProperty("text", {
                                    path: "key"
                                })
                            }),
                            new sap.ui.table.Column("", {
                                label: ibas.i18n.prop("bo_actionconfig_value"),
                                template: new sap.m.Input("", {
                                }).bindProperty("value", {
                                    path: "value"
                                })
                            }),
                        ]
                    });
                    return new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Label("", {
                                    text: ibas.i18n.prop("integrationdevelopment_actions_url"),
                                    width: "auto"
                                }),
                                combobox = new sap.m.ComboBox("", {
                                    width: "100%",
                                    items: [
                                        new sap.ui.core.Item("", {
                                            key: "demo",
                                            text: ".../../test/apps/integration/test/integration/actions.json",
                                        }),
                                        new sap.ui.core.Item("", {
                                            key: "dev",
                                            text: ".../../test/apps/datainteraction/integration/actions.json",
                                        })
                                    ]
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_refresh"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.loadActionsEvent, combobox.getValue());
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.splitContainer = new sap.m.SplitContainer("", {
                                mode: sap.m.SplitAppMode.HideMode,
                                detailPages: [
                                    this.table,
                                    this.tableConfig
                                ]
                            })
                        ]
                    });
                }
                private table: sap.ui.table.Table;
                private tableConfig: sap.ui.table.Table;
                private splitContainer: sap.m.SplitContainer;
                private tableTitle: sap.m.Title;
                /** 显示动作 */
                showActions(datas: bo.Action[]): void {
                    this.splitContainer.backToTopDetail(null, null);
                    this.table.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
                /** 显示动作 */
                showAction(data: bo.Action): void {
                    this.tableTitle.setText(data.name);
                    this.splitContainer.toDetail(this.tableConfig.getId(), null, null, null);
                }
                /** 显示动作配置 */
                showActionConfigs(datas: bo.ActionConfig[]): void {
                    this.tableConfig.setModel(new sap.ui.model.json.JSONModel({ rows: datas }));
                }
            }
        }
    }
}