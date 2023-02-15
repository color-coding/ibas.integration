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
            export class IntegrationActionListView extends ibas.View implements app.IIntegrationActionListView {
                /** 查询包 */
                fetchPackageEvent: Function;
                /** 上传包 */
                uploadPackageEvent: Function;
                /** 删除数据事件，参数：删除对象集合 */
                deletePackageEvent: Function;
                /** 注释包 */
                commentPackageEvent: Function;
                /** 查看动作 */
                viewActionEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.extension.m.Page("", {
                        showHeader: false,
                        content: [
                            new sap.ui.layout.Splitter("", {
                                orientation: sap.ui.core.Orientation.Horizontal,
                                contentAreas: [
                                    // 头部空白
                                    new sap.ui.layout.Splitter("", {
                                        layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                            resizable: false,
                                            size: "30%",
                                        }),
                                        contentAreas: [
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                subHeader: new sap.m.Toolbar("", {
                                                    design: sap.m.ToolbarDesign.Transparent,
                                                    content: [
                                                        new sap.m.Button("", {
                                                            type: sap.m.ButtonType.Transparent,
                                                            icon: "sap-icon://slim-arrow-right",
                                                            press: function (event: sap.ui.base.Event): void {
                                                                let source: any = event.getSource();
                                                                if (source instanceof sap.m.Button) {
                                                                    if (source.getIcon() === "sap-icon://slim-arrow-down") {
                                                                        for (let item of that.leftList.getItems()) {
                                                                            if (item instanceof sap.m.CustomListItem) {
                                                                                for (let sItem of item.getContent()) {
                                                                                    if (sItem instanceof sap.m.Panel) {
                                                                                        sItem.setExpanded(false);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        source.setIcon("sap-icon://slim-arrow-right");
                                                                    } else {
                                                                        for (let item of that.leftList.getItems()) {
                                                                            if (item instanceof sap.m.CustomListItem) {
                                                                                for (let sItem of item.getContent()) {
                                                                                    if (sItem instanceof sap.m.Panel) {
                                                                                        sItem.setExpanded(true);
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        source.setIcon("sap-icon://slim-arrow-down");
                                                                    }
                                                                }
                                                            }
                                                        }),
                                                        new sap.m.SearchField("", {
                                                            search(event: sap.ui.base.Event): void {
                                                                let source: any = event.getSource();
                                                                if (source instanceof sap.m.SearchField) {
                                                                    that.leftList.setBusy(true);
                                                                    let search: string = source.getValue();
                                                                    let content: string;
                                                                    if (search) {
                                                                        search = search.trim().toLowerCase();
                                                                    }
                                                                    for (let item of that.leftList.getItems()) {
                                                                        if (item instanceof sap.m.CustomListItem) {
                                                                            item.setVisible(true);
                                                                            for (let sItem of item.getContent()) {
                                                                                if (sItem instanceof sap.m.Panel) {
                                                                                    sItem.setExpanded(true);
                                                                                    for (let tItem of sItem.getContent()) {
                                                                                        if (tItem instanceof sap.extension.m.List) {
                                                                                            let count: number = 0;
                                                                                            for (let uItem of tItem.getItems()) {
                                                                                                if (uItem instanceof sap.m.StandardListItem) {
                                                                                                    uItem.setVisible(true);
                                                                                                    if (ibas.strings.isEmpty(search)) {
                                                                                                        continue;
                                                                                                    }
                                                                                                    content = uItem.getTitle(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                        continue;
                                                                                                    }
                                                                                                    content = uItem.getDescription(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                                        continue;
                                                                                                    }
                                                                                                    uItem.setVisible(false);
                                                                                                    count++;
                                                                                                }
                                                                                            }
                                                                                            if (count >= tItem.getItems().length) {
                                                                                                item.setVisible(false);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    that.leftList.setBusy(false);
                                                                }
                                                            }
                                                        }),
                                                        new sap.m.Button("", {
                                                            type: sap.m.ButtonType.Transparent,
                                                            icon: "sap-icon://refresh",
                                                            press: function (): void {
                                                                that.fireViewEvents(that.fetchPackageEvent);
                                                            }
                                                        }),
                                                    ]
                                                }),
                                                content: [
                                                    this.leftList = new sap.extension.m.List("", {
                                                        growing: false,
                                                        growingThreshold: 99,
                                                        items: {
                                                            path: "/rows",
                                                            templateShareable: true,
                                                            template: new sap.m.CustomListItem("", {
                                                                content: [
                                                                    new sap.m.Panel("", {
                                                                        expandable: true,
                                                                        expanded: false,
                                                                        backgroundDesign: sap.m.BackgroundDesign.Translucent,
                                                                        accessibleRole: sap.m.PanelAccessibleRole.Form,
                                                                        headerToolbar: new sap.m.Toolbar("", {
                                                                            content: [
                                                                                new sap.m.Title("", {
                                                                                    text: {
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
                                                                                            if (!ibas.strings.isEmpty(remarks)) {
                                                                                                return remarks;
                                                                                            }
                                                                                            return ibas.strings.format("# {0}...  {1}",
                                                                                                id?.substring(0, 8), ibas.dates.toString(date, "yyyy-MM-dd_HH:mm"));
                                                                                        }
                                                                                    },
                                                                                    tooltip: {
                                                                                        parts: [
                                                                                            {
                                                                                                path: "id",
                                                                                            },
                                                                                            {
                                                                                                path: "dateTime",
                                                                                            },
                                                                                        ],
                                                                                        formatter(id: string, date: Date): string {
                                                                                            return ibas.strings.format("# {0} {1}", id, ibas.dates.toString(date, "yyyy-MM-dd_HH:mm"));
                                                                                        }
                                                                                    },
                                                                                }),
                                                                                new sap.m.Button("", {
                                                                                    type: sap.m.ButtonType.Transparent,
                                                                                    icon: "sap-icon://notes",
                                                                                    press(event: sap.ui.base.Event): void {
                                                                                        let source: any = event.getSource();
                                                                                        if (source instanceof sap.m.Button) {
                                                                                            let data: any = source.getParent().getBindingContext().getObject();
                                                                                            if (data instanceof bo.ActionPackage) {
                                                                                                let popover: sap.m.Popover = new sap.m.Popover("", {
                                                                                                    showHeader: false,
                                                                                                    placement: sap.m.PlacementType.Bottom,
                                                                                                    content: [
                                                                                                        new sap.m.TextArea("", {
                                                                                                            rows: 3,
                                                                                                            value: data.remarks,
                                                                                                        })
                                                                                                    ],
                                                                                                    footer: new sap.m.Toolbar("", {
                                                                                                        content: [
                                                                                                            new sap.m.ToolbarSpacer(),
                                                                                                            new sap.m.Button("", {
                                                                                                                text: ibas.i18n.prop("shell_confirm"),
                                                                                                                type: sap.m.ButtonType.Transparent,
                                                                                                                press(): void {
                                                                                                                    that.fireViewEvents(that.commentPackageEvent, data, (<sap.m.Input>popover.getContent()[0]).getValue());
                                                                                                                    popover.close();
                                                                                                                }
                                                                                                            }),
                                                                                                            new sap.m.Button("", {
                                                                                                                text: ibas.i18n.prop("shell_exit"),
                                                                                                                type: sap.m.ButtonType.Transparent,
                                                                                                                press(): void {
                                                                                                                    popover.close();
                                                                                                                }
                                                                                                            })
                                                                                                        ]
                                                                                                    })
                                                                                                }).addStyleClass("");
                                                                                                popover.openBy(event.getSource(), true);
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                }),
                                                                                new sap.m.ToolbarSpacer(""),
                                                                                new sap.m.Button("", {
                                                                                    type: sap.m.ButtonType.Transparent,
                                                                                    icon: "sap-icon://decline",
                                                                                    press(this: sap.m.Button, event: sap.ui.base.Event): void {
                                                                                        let data: any = this?.getBindingContext()?.getObject();
                                                                                        if (data instanceof bo.ActionPackage) {
                                                                                            that.fireViewEvents(that.deletePackageEvent, data);
                                                                                        }
                                                                                    }
                                                                                }),
                                                                            ]
                                                                        }),
                                                                        content: [
                                                                            new sap.extension.m.List("", {
                                                                                growing: false,
                                                                                growingThreshold: 99,
                                                                                items: {
                                                                                    path: "actions",
                                                                                    templateShareable: true,
                                                                                    template: new sap.m.StandardListItem("", {
                                                                                        title: "{name}",
                                                                                        description: "{remark}",
                                                                                        icon: "sap-icon://Netweaver-business-client",
                                                                                        type: sap.m.ListType.Active,
                                                                                        iconDensityAware: false,
                                                                                        iconInset: false,
                                                                                        infoState: sap.ui.core.ValueState.Success,
                                                                                        press(this: sap.m.StandardListItem, event: sap.ui.base.Event): void {
                                                                                            let data: any = this?.getBindingContext()?.getObject();
                                                                                            if (data instanceof bo.Action) {
                                                                                                that.fireViewEvents(that.viewActionEvent, data);
                                                                                            }
                                                                                        },
                                                                                    })
                                                                                },
                                                                            })
                                                                        ],
                                                                    })
                                                                ],
                                                                type: sap.m.ListType.Inactive
                                                            }),
                                                        },
                                                    })
                                                ]
                                            }),
                                        ]
                                    }),
                                    new sap.ui.layout.Splitter("", {
                                        layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                            resizable: false,
                                            size: "70%",
                                        }),
                                        contentAreas: [
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                floatingFooter: true,
                                                subHeader:
                                                    new sap.m.Toolbar("", {
                                                        design: sap.m.ToolbarDesign.Transparent,
                                                        style: sap.m.ToolbarStyle.Standard,
                                                        content: [
                                                            new sap.ui.unified.FileUploader("", {
                                                                name: "file",
                                                                fileType: ["war", "jar", "zip"],
                                                                icon: "sap-icon://upload",
                                                                iconOnly: true,
                                                                placeholder: ibas.i18n.prop("integration_upload_package"),
                                                                width: "100%",
                                                                change(event: sap.ui.base.Event): void {
                                                                    if (ibas.objects.isNull(event.getParameters())
                                                                        || ibas.objects.isNull(event.getParameters().files)
                                                                        || event.getParameters().files.length === 0) {
                                                                        return;
                                                                    }
                                                                    let source: any = event.getSource();
                                                                    let fileData: FormData = new FormData();
                                                                    fileData.append("file", event.getParameters().files[0], encodeURI(event.getParameters().newValue));
                                                                    that.application.viewShower.messages({
                                                                        type: ibas.emMessageType.QUESTION,
                                                                        title: that.application.description,
                                                                        actions: [
                                                                            ibas.emMessageAction.YES,
                                                                            ibas.emMessageAction.NO
                                                                        ],
                                                                        message: ibas.i18n.prop("integration_continue_upload_package", event.getParameters().newValue),
                                                                        onCompleted(action: ibas.emMessageAction): void {
                                                                            if (action === ibas.emMessageAction.YES) {
                                                                                that.fireViewEvents(that.uploadPackageEvent, fileData);
                                                                            }
                                                                            if (source instanceof sap.ui.unified.FileUploader) {
                                                                                source.clear();
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }),
                                                        ]
                                                    }),
                                                content: [
                                                    this.rightList = new sap.m.ScrollContainer("", {
                                                        horizontal: false,
                                                        vertical: true,
                                                        content: [
                                                        ]
                                                    })
                                                ],
                                            }),
                                        ]
                                    }),
                                ]
                            })
                        ]
                    });
                }
                private leftList: sap.m.NotificationList;
                private rightList: sap.m.ScrollContainer;
                /** 显示包 */
                showPackages(datas: bo.ActionPackage[] | bo.ActionPackage): void {
                    if (datas instanceof Array) {
                        this.leftList.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    } else if (datas instanceof bo.ActionPackage) {
                        this.leftList.getModel().refresh(true);
                    }
                }
                /** 显示动作 */
                showAction(data: bo.Action): void {
                    this.rightList.destroyContent();
                    let form: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("integration_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_action_id") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                                value: data.id,
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_action_name") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                                value: data.name,
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_action_remark") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                                value: data.remark,
                            }),
                        ]
                    });
                    this.rightList.addContent(form);
                    if (data.configs instanceof Array && data.configs.length > 0) {
                        form = new sap.ui.layout.form.SimpleForm("", {
                            editable: true,
                            content: [
                                new sap.ui.core.Title("", { text: ibas.i18n.prop("integration_title_configs") }),
                            ]
                        });
                        for (let item of data.configs) {
                            form.addContent(new sap.m.Label("", {
                                text: ibas.strings.isEmpty(item.remark) ? item.key : item.remark
                            }));
                            form.addContent(new sap.extension.m.Input("", {
                                editable: false,
                                value: ibas.strings.isWith(item.value, "{", "}") ? "" : item.value,
                            }));
                        }
                        this.rightList.addContent(form);
                    }
                }
            }
        }
    }
}