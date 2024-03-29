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
            export class IntegrationJobListView extends ibas.BOListView implements app.IIntegrationJobListView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.IntegrationJob;
                }
                /** 编辑数据，参数：目标数据 */
                editDataEvent: Function;
                /** 删除数据事件，参数：删除对象集合 */
                deleteDataEvent: Function;
                /** 查看数据 */
                viewDataEvent: Function;
                /** 批量更新接口 */
                batchUpdateActionEvent: Function;
                /** 选择程序包 */
                chooseActionPackageEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        dataInfo: this.queryTarget,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjob_objectkey"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "objectKey",
                                    type: new sap.extension.data.Numeric()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjob_name"),
                                width: "30rem",
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "name",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjob_activated"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "activated",
                                    type: new sap.extension.data.YesNo(true)
                                }),
                                width: "6rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjob_bocode"),
                                template: new sap.extension.m.BusinessObjectText("", {
                                }).bindProperty("bindingValue", {
                                    path: "boCode",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjob_dataowner"),
                                template: new sap.extension.m.UserText("", {
                                }).bindProperty("bindingValue", {
                                    path: "dataOwner",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjob_frequency"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "frequency",
                                    type: new sap.extension.data.Numeric()
                                }),
                                width: "6rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjob_attime"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "atTime",
                                    type: new sap.extension.data.Time(),
                                }),
                                width: "6rem",
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_integrationjob_remarks"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "remarks",
                                    type: new sap.extension.data.Alphanumeric(),
                                }),
                                width: "20rem",
                            }),
                        ],
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        }
                    });
                    return new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_new"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://create",
                                    press: function (): void {
                                        that.fireViewEvents(that.newDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_view"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://display",
                                    press: function (): void {
                                        that.fireViewEvents(that.viewDataEvent, that.table.getSelecteds().firstOrDefault());
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        that.fireViewEvents(that.editDataEvent, that.table.getSelecteds().firstOrDefault());
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent, that.table.getSelecteds());
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("integration_integrationjoblist_batch_update"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://request",
                                    press: function (): void {
                                        if (that.table.getSelecteds().length === 0) {
                                            that.application.viewShower.messages({
                                                type: ibas.emMessageType.QUESTION,
                                                title: ibas.i18n.prop(that.application.name),
                                                message: ibas.i18n.prop("integration_integrationjoblist_continue_update_all"),
                                                actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                                                onCompleted(action: ibas.emMessageAction): void {
                                                    if (action === ibas.emMessageAction.YES) {
                                                        that.fireViewEvents(that.chooseActionPackageEvent);
                                                    }
                                                }
                                            });
                                        } else {
                                            that.fireViewEvents(that.chooseActionPackageEvent);
                                        }
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press: function (event: any): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.BOServiceProxy({
                                                data: that.table.getSelecteds(),
                                                converter: new bo.DataConverter(),
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let actionSheet: sap.m.ActionSheet = new sap.m.ActionSheet("", {
                                                    placement: sap.m.PlacementType.Bottom,
                                                    buttons: {
                                                        path: "/",
                                                        template: new sap.m.Button("", {
                                                            type: sap.m.ButtonType.Transparent,
                                                            text: {
                                                                path: "name",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? ibas.i18n.prop(data) : "";
                                                                }
                                                            },
                                                            icon: {
                                                                path: "icon",
                                                                type: new sap.extension.data.Alphanumeric(),
                                                                formatter(data: string): string {
                                                                    return data ? data : "sap-icon://e-care";
                                                                }
                                                            },
                                                            press(this: sap.m.Button): void {
                                                                let service: ibas.IServiceAgent = this.getBindingContext().getObject();
                                                                if (service) {
                                                                    service.run();
                                                                }
                                                            }
                                                        })
                                                    }
                                                });
                                                actionSheet.setModel(new sap.extension.model.JSONModel(services));
                                                actionSheet.openBy(event.getSource());
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [
                            this.table,
                        ]
                    });
                }
                private table: sap.extension.table.Table;
                /** 显示数据 */
                showData(datas: bo.IntegrationJob[]): void {
                    let model: sap.ui.model.Model = this.table.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.table.setBusy(false);
                }
                /** 显示程序包 */
                showActionPackage(datas: bo.ActionPackage[]): void {
                    let that: this = this;
                    let table: sap.extension.m.Table = new sap.extension.m.Table("", {
                        chooseType: ibas.emChooseType.SINGLE,
                        includeItemInSelection: true,
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_action_group"),
                                width: "16rem",
                                mergeDuplicates: true,
                            }),
                        ],
                        items: {
                            path: "/rows",
                            template: new sap.m.ColumnListItem("", {
                                cells: [
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            parts: [
                                                {
                                                    path: "id",
                                                },
                                                {
                                                    path: "dateTime",
                                                },
                                                {
                                                    path: "remarks",
                                                },
                                            ],
                                            formatter(id: string, date: Date, remarks: string): string {
                                                let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                                builder.map(undefined, "");
                                                builder.map(null, "");
                                                builder.append(ibas.strings.format("# {0}...  {1}",
                                                    id?.substring(0, 8), ibas.dates.toString(date, "yyyy-MM-dd_HH:mm")));
                                                if (!ibas.strings.isEmpty(remarks)) {
                                                    builder.append("  (");
                                                    builder.append(remarks);
                                                    builder.append(")");
                                                }
                                                return builder.toString();
                                            }
                                        }
                                    }),
                                ],
                            }),
                        },
                    });
                    table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    let dialog: sap.m.Dialog = new sap.m.Dialog("", {
                        title: ibas.i18n.prop("integration_integrationjoblist_choose_package_title"),
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        contentWidth: "50%",
                        content: [
                            table
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_choose"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    if (ibas.objects.isNull(table.getSelecteds().firstOrDefault())) {
                                        that.application.viewShower.messages({
                                            type: ibas.emMessageType.WARNING,
                                            message: ibas.i18n.prop("integration_integrationjoblist_choose_package_title")
                                        });
                                    } else {
                                        that.fireViewEvents(that.batchUpdateActionEvent, that.table.getSelecteds(), table.getSelecteds().firstOrDefault());
                                        dialog.close();
                                    }
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    dialog.close();
                                }
                            }),
                        ]
                    }).addStyleClass("sapUiNoContentPadding");
                    dialog.open();
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.table.setBusy(true);
                        this.table.setFirstVisibleRow(0);
                        this.table.setModel(null);
                    }
                }
            }
        }
    }
}