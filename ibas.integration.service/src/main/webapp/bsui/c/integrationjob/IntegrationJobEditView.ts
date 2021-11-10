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
             * 编辑视图-集成任务
             */
            export class IntegrationJobEditView extends ibas.BOEditView implements app.IIntegrationJobEditView {
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
                /** 选择任务动作 */
                chooseJobActionEvent: Function;
                /** 添加集成任务-动作事件 */
                addIntegrationJobActionCfgEvent: Function;
                /** 删除集成任务-动作事件 */
                removeIntegrationJobActionCfgEvent: Function;
                /** 选择任务动作配置-配置项目 */
                chooseJobActionCfgConfigItemEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("integration_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_name") }),
                            new sap.extension.m.Input("", {
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_activated") }),
                            new sap.extension.m.EnumSelect("", {
                                enumType: ibas.emYesNo
                            }).bindProperty("bindingValue", {
                                path: "activated",
                                type: new sap.extension.data.YesNo()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_frequency") }),
                            new sap.extension.m.Input("", {
                                type: sap.m.InputType.Number
                            }).bindProperty("bindingValue", {
                                path: "frequency",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_attime") }),
                            new sap.extension.m.TimePicker("", {
                            }).bindProperty("bindingValue", {
                                path: "atTime",
                                type: new sap.extension.data.Time(),
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("integration_title_relation") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_bocode") }),
                            new sap.extension.m.RepositoryInput("", {
                                showValueHelp: true,
                                repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: initialfantasy.bo.BOInformation,
                                    key: initialfantasy.bo.BOInformation.PROPERTY_CODE_NAME,
                                    text: initialfantasy.bo.BOInformation.PROPERTY_DESCRIPTION_NAME
                                },
                                valueHelpRequest: function (): void {
                                    that.fireViewEvents(that.chooseBusinessObjectEvent);
                                }
                            }).bindProperty("bindingValue", {
                                path: "boCode",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 30
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_applicationid") }),
                            new sap.extension.m.SelectionInput("", {
                                showValueHelp: true,
                                valueHelpOnly: false,
                                repository: initialfantasy.bo.BORepositoryInitialFantasy,
                                dataInfo: {
                                    type: initialfantasy.bo.BO_CODE_APPLICATIONELEMENT,
                                    key: initialfantasy.bo.ApplicationElement.PROPERTY_ELEMENTID_NAME,
                                    text: initialfantasy.bo.ApplicationElement.PROPERTY_ELEMENTNAME_NAME
                                },
                                criteria: [
                                    new ibas.Condition(
                                        initialfantasy.bo.ApplicationElement.PROPERTY_ELEMENTTYPE_NAME,
                                        ibas.emConditionOperation.NOT_EQUAL,
                                        initialfantasy.bo.emElementType.MODULE
                                    )
                                ]
                            }).bindProperty("bindingValue", {
                                path: "applicationId",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 36
                                })
                            }),
                        ]
                    });
                    this.tableIntegrationJobAction = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(8),
                        dataInfo: {
                            code: bo.IntegrationJob.BUSINESS_OBJECT_CODE,
                            name: bo.IntegrationJobAction.name
                        },
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addIntegrationJobActionEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeIntegrationJobActionEvent, that.tableIntegrationJobAction.getSelecteds());
                                    }
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
                                        that.fireViewEvents(that.editJobActionEvent
                                            , this.getBindingContext().getObject()
                                        );
                                    },
                                }),
                            ]
                        }),
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjobaction_actionid"),
                                width: "20rem",
                                template: new sap.extension.m.Input("", {
                                    showValueHelp: true,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseJobActionEvent,
                                            // 获取当前对象
                                            this.getBindingContext().getObject()
                                        );
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "actionId",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 36
                                    })
                                })
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjobaction_actionname"),
                                width: "20rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "actionName",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 60
                                    })
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjobaction_actionremark"),
                                width: "30rem",
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "actionRemark",
                                    type: new sap.extension.data.Alphanumeric({
                                        maxLength: 100
                                    })
                                }),
                            }),
                        ]
                    });
                    this.tableIntegrationJobActionCfg = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(8),
                        dataInfo: {
                            code: bo.IntegrationJob.BUSINESS_OBJECT_CODE,
                            name: bo.IntegrationJobActionCfg.name
                        },
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addIntegrationJobActionCfgEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeIntegrationJobActionCfgEvent, that.tableIntegrationJobActionCfg.getSelecteds());
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_back"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://nav-back",
                                    press: function (): void {
                                        that.fireViewEvents(that.editJobActionEvent);
                                    }
                                })
                            ]
                        }),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjobactioncfg_key"),
                                width: "20rem",
                                template: new sap.extension.m.Input("", {
                                    showValueHelp: true,
                                    valueHelpOnly: false,
                                    valueHelpRequest: function (): void {
                                        that.fireViewEvents(that.chooseJobActionCfgConfigItemEvent,
                                            // 获取当前对象
                                            this.getBindingContext().getObject()
                                        );
                                    }
                                }).bindProperty("bindingValue", {
                                    path: "key",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjobactioncfg_value"),
                                width: "20rem",
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "value",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjobactioncfg_remark"),
                                width: "30rem",
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "remark",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                        ]
                    });
                    let formMiddle: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            this.tableTitle = new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_integrationjobaction") }),
                            this.container = new sap.m.NavContainer("", {
                                height: "22rem",
                                pages: [
                                    this.tableIntegrationJobAction,
                                    this.tableIntegrationJobActionCfg
                                ]
                            })
                        ]
                    });
                    let formBottom: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("materials_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_dataowner") }),
                            new sap.extension.m.UserInput("", {
                                showValueHelp: true,
                            }).bindProperty("bindingValue", {
                                path: "dataOwner",
                                type: new sap.extension.data.Numeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_teammembers") }),
                            new sap.extension.m.UserInput("", {
                                showValueHelp: true,
                                chooseType: ibas.emChooseType.MULTIPLE,
                                criteria: [
                                    new ibas.Condition(initialfantasy.bo.User.PROPERTY_ACTIVATED_NAME, ibas.emConditionOperation.EQUAL, ibas.emYesNo.YES)
                                ]
                            }).bindProperty("bindingValue", {
                                path: "teamMembers",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_organization") }),
                            new sap.extension.m.DataOrganizationInput("", {
                                showValueHelp: true,
                            }).bindProperty("bindingValue", {
                                path: "organization",
                                type: new sap.extension.data.Alphanumeric({
                                    maxLength: 8
                                })
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_integrationjob_remarks") }),
                            new sap.extension.m.TextArea("", {
                                rows: 3,
                            }).bindProperty("bindingValue", {
                                path: "remarks",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.ui.core.Title("", {}),
                        ]
                    });
                    return this.page = new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.strings.format("{0}/{1}",
                                        ibas.i18n.prop("shell_data_new"), ibas.i18n.prop("shell_data_clone")),
                                    icon: "sap-icon://create",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_new"),
                                                icon: "sap-icon://create",
                                                press: function (): void {
                                                    // 创建新的对象
                                                    that.fireViewEvents(that.createDataEvent, false);
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("shell_data_clone"),
                                                icon: "sap-icon://copy",
                                                press: function (): void {
                                                    // 复制当前对象
                                                    that.fireViewEvents(that.createDataEvent, true);
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [
                            formTop,
                            formMiddle,
                            formBottom,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private tableTitle: sap.ui.core.Title;
                private container: sap.m.NavContainer;
                private tableIntegrationJobAction: sap.extension.table.Table;
                private tableIntegrationJobActionCfg: sap.extension.table.Table;

                /** 显示数据 */
                showIntegrationJob(data: bo.IntegrationJob): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                    // 改变页面状态
                    sap.extension.pages.changeStatus(this.page);
                }
                /** 显示数据 */
                showIntegrationJobActions(datas: bo.IntegrationJobAction[]): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_integrationjob_integrationjobactions"));
                    this.container.backToTop();
                    this.tableIntegrationJobAction.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示数据 */
                showIntegrationJobActionCfgs(datas: bo.IntegrationJobActionCfg[]): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_integrationjobaction_integrationjobactioncfgs"));
                    this.container.to(this.tableIntegrationJobActionCfg.getId());
                    this.tableIntegrationJobActionCfg.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}