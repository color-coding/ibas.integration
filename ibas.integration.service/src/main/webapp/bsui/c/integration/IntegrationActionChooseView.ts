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
            export class IntegrationActionChooseView extends ibas.BOQueryDialogViewWithPanel implements app.IIntegrationActionChooseView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.Action;
                }
                chooseDataEvent: Function;
                newDataEvent: Function;
                chooseType: ibas.emChooseType;
                mode: ibas.emViewMode;
                embedded(view: any): void {
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.m.Table("", {
                        chooseType: this.chooseType,
                        includeItemInSelection: true,
                        columns: [
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_action_group"),
                                width: "20rem",
                                mergeDuplicates: true,
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_action_name"),
                            }),
                            new sap.extension.m.Column("", {
                                header: ibas.i18n.prop("bo_action_remark"),
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
                                                    type: new sap.extension.data.Alphanumeric(),
                                                },
                                                {
                                                    path: "dateTime",
                                                    type: new sap.extension.data.Time(),
                                                },
                                            ],
                                            formatter(id: string, date: Date): string {
                                                return ibas.strings.format("# {0}...  {1}",
                                                    id?.substring(0, 8), ibas.dates.toString(date, "yyyy-MM-dd_HH:mm"));
                                            }
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "name",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                    new sap.extension.m.ObjectAttribute("", {
                                        bindingValue: {
                                            path: "remark",
                                            type: new sap.extension.data.Alphanumeric(),
                                        }
                                    }),
                                ],
                            }),
                        },
                    });
                    return new sap.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                this.search = new sap.m.SearchField("", {
                                    search(event: sap.ui.base.Event): void {
                                        let source: any = event.getSource();
                                        if (source instanceof sap.m.SearchField) {
                                            let search: string = source.getValue();
                                            let binding: any = that.table.getBinding("items");
                                            if (binding instanceof sap.ui.model.ListBinding) {
                                                binding.filter(
                                                    !ibas.strings.isEmpty(search) ? [
                                                        new sap.ui.model.Filter({
                                                            filters: [
                                                                new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, search),
                                                                new sap.ui.model.Filter("remark", sap.ui.model.FilterOperator.Contains, search),
                                                            ],
                                                            and: false,
                                                        })
                                                    ] : undefined
                                                    , sap.ui.model.FilterType.Application);
                                            }
                                        }
                                    }
                                }),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.search.setValue(undefined);
                                        that.fireViewEvents(that.fetchDataEvent, new ibas.Criteria());
                                    }
                                }),
                            ]
                        }),
                        content: [
                            this.table
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_choose"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    let selecteds: ibas.ArrayList<bo.Action> = new ibas.ArrayList<bo.Action>();
                                    for (let item of that.table.getSelecteds<LineData>()) {
                                        selecteds.add(item.data);
                                    }
                                    that.fireViewEvents(that.chooseDataEvent, selecteds);
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
                    }).addStyleClass("sapUiNoContentPadding");
                }
                private table: sap.extension.m.Table;
                private search: sap.m.SearchField;
                /** 显示数据 */
                showData(datas: bo.ActionPackage[]): void {
                    let lineData: ibas.ArrayList<LineData> = new ibas.ArrayList<LineData>();
                    for (let item of datas) {
                        for (let sItem of item.actions) {
                            let data: LineData = new LineData();
                            data.id = item.id;
                            data.dateTime = item.dateTime;
                            data.data = sItem;
                            data.name = sItem.name;
                            data.remark = sItem.remark;
                            lineData.add(data);
                        }
                    }
                    this.table.setModel(new sap.extension.model.JSONModel({ rows: lineData }));
                }

                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.table.setModel(null);
                    }
                }
            }
        }
        class LineData {
            data: bo.Action;
            id: string;
            dateTime: Date;
            name: string;
            remark: string;
        }
    }
}