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
                                                                    if (source.getIcon() === "sap-icon://slim-arrow-right") {
                                                                        for (let item of that.leftList.getItems()) {
                                                                            if (item instanceof sap.m.NotificationListGroup) {
                                                                                item.setCollapsed(false);
                                                                            }
                                                                        }
                                                                        source.setIcon("sap-icon://slim-arrow-down");
                                                                    } else {
                                                                        for (let item of that.leftList.getItems()) {
                                                                            if (item instanceof sap.m.NotificationListGroup) {
                                                                                item.setCollapsed(true);
                                                                            }
                                                                        }
                                                                        source.setIcon("sap-icon://slim-arrow-right");
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
                                                                        if (item instanceof sap.m.NotificationListGroup) {
                                                                            item.setVisible(true);
                                                                            item.setCollapsed(true);
                                                                            for (let gItem of item.getItems()) {
                                                                                if (gItem instanceof sap.m.NotificationListItem) {
                                                                                    gItem.setVisible(true);
                                                                                    if (ibas.strings.isEmpty(search)) {
                                                                                        continue;
                                                                                    }
                                                                                    content = gItem.getTitle(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                        item.setCollapsed(false);
                                                                                        continue;
                                                                                    }
                                                                                    content = gItem.getDescription(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                        item.setCollapsed(false);
                                                                                        continue;
                                                                                    }
                                                                                    gItem.setVisible(false);
                                                                                }
                                                                            }
                                                                            if (ibas.strings.isEmpty(search)) {
                                                                                continue;
                                                                            }
                                                                            if (item.getCollapsed() !== false) {
                                                                                item.setVisible(false);
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
                                                        items: {
                                                            path: "/rows",
                                                            templateShareable: false,
                                                            template: new sap.m.NotificationListGroup("", {
                                                                showCloseButton: true,
                                                                unread: true,
                                                                collapsed: true,
                                                                title: {
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
                                                                },
                                                                close(event: sap.ui.base.Event): void {
                                                                    let source: any = event.getSource();
                                                                    if (source instanceof sap.m.NotificationListGroup) {
                                                                        let data: any = source.getBindingContext().getObject();
                                                                        if (data instanceof bo.ActionPackage) {
                                                                            that.fireViewEvents(that.deletePackageEvent, data);
                                                                        }
                                                                    }
                                                                },
                                                                items: {
                                                                    path: "actions",
                                                                    templateShareable: false,
                                                                    template: new sap.m.NotificationListItem("", {
                                                                        title: "{name}",
                                                                        description: "{remark}",
                                                                        authorAvatarColor: {
                                                                            path: "activated",
                                                                            formatter(data: any): sap.m.AvatarColor {
                                                                                if (data !== true) {
                                                                                    return sap.m.AvatarColor.Accent2;
                                                                                }
                                                                                return sap.m.AvatarColor.Accent6;
                                                                            }
                                                                        },
                                                                        authorPicture: "sap-icon://Netweaver-business-client",
                                                                        press(event: sap.ui.base.Event): void {
                                                                            let source: any = event.getSource();
                                                                            if (source instanceof sap.m.NotificationListItem) {
                                                                                let data: any = source.getBindingContext().getObject();
                                                                                if (data instanceof bo.Action) {
                                                                                    that.fireViewEvents(that.viewActionEvent, data);
                                                                                }
                                                                            }
                                                                        },
                                                                        showCloseButton: false,
                                                                    })
                                                                },
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
                                                                        message: ibas.i18n.prop("integration_upload_package"),
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
                                                            new sap.m.ToolbarSeparator(""),
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
                private leftList: sap.m.List;
                private rightList: sap.m.ScrollContainer;
                /** 显示包 */
                showPackages(datas: bo.ActionPackage[]): void {
                    this.leftList.setModel(new sap.extension.model.JSONModel({ rows: datas }));
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
                                value: item.value,
                            }));
                        }
                        this.rightList.addContent(form);
                    }
                }
            }
        }
    }
}