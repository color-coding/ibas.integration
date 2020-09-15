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
             * 列表视图-集成任务调度者
             */
            export class IntegrationJobSchedulerView extends ibas.View implements app.IIntegrationJobSchedulerView {
                /** 暂停运行事件 */
                suspendEvent: Function;
                /** 重置事件 */
                resetEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                this.beginButton = new sap.m.Button("", {
                                    text: ibas.i18n.prop("integration_scheduler_begin"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://begin",
                                    press(event: sap.ui.base.Event): void {
                                        let source: any = event.getSource();
                                        if (source instanceof sap.m.Button) {
                                            let cData: any = source.removeCustomData(0);
                                            if (cData instanceof sap.ui.core.CustomData && cData.getKey() === "handler") {
                                                clearInterval(cData.getValue());
                                            }
                                            if (source.getIcon() === "sap-icon://begin") {
                                                that.fireViewEvents(that.suspendEvent, false);
                                                source.setType(sap.m.ButtonType.Success);
                                                source.setIcon("sap-icon://media-pause");
                                                source.setText(ibas.i18n.prop("integration_scheduler_suspend"));
                                            } else {
                                                that.fireViewEvents(that.suspendEvent, true);
                                                source.setIcon("sap-icon://begin");
                                                source.setType(sap.m.ButtonType.Reject);
                                                source.setText(ibas.i18n.prop("integration_scheduler_begin"));
                                            }
                                        }
                                    },
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("integration_scheduler_reset"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://refresh",
                                    press: function (): void {
                                        that.fireViewEvents(that.resetEvent);
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("integration_log_upload"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://upload",
                                    press: function (): void {
                                        storages.local.upload((result) => {
                                            if (result instanceof Error) {
                                                that.application.viewShower.messages({
                                                    title: that.title,
                                                    type: ibas.emMessageType.ERROR,
                                                    message: result.message,
                                                });
                                            } else {
                                                that.application.viewShower.messages({
                                                    title: that.title,
                                                    type: ibas.emMessageType.SUCCESS,
                                                    message: ibas.i18n.prop("integration_log_uploaded", result.fileName),
                                                });
                                            }
                                        });
                                    }
                                }),
                            ]
                        }),
                        content: [
                            new sap.ui.layout.Splitter("", {
                                orientation: sap.ui.core.Orientation.Horizontal,
                                contentAreas: [
                                    new sap.ui.layout.Splitter("", {
                                        layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                            resizable: false,
                                            size: "30%",
                                        }),
                                        contentAreas: [
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                subHeader: new sap.m.Toolbar("", {
                                                    content: [
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
                                                                        if (item instanceof sap.m.NotificationListItem) {
                                                                            item.setVisible(true);
                                                                            if (ibas.strings.isEmpty(search)) {
                                                                                continue;
                                                                            }
                                                                            content = item.getTitle(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                continue;
                                                                            }
                                                                            content = item.getDescription(); if (content && content.toLowerCase().indexOf(search) >= 0) {
                                                                                continue;
                                                                            }
                                                                            item.setVisible(false);
                                                                        }
                                                                    }
                                                                    that.leftList.setBusy(false);
                                                                }
                                                            }
                                                        }),
                                                    ]
                                                }),
                                                content: [
                                                    this.leftList = new sap.extension.m.List("", {
                                                        growing: false,
                                                        items: {
                                                            path: "/rows",
                                                            template: new sap.m.NotificationListItem("", {
                                                                title: "{name}",
                                                                description: "{description}",
                                                                authorAvatarColor: {
                                                                    path: "activated",
                                                                    formatter(data: any): sap.m.AvatarColor {
                                                                        if (data !== true) {
                                                                            return sap.m.AvatarColor.Accent2;
                                                                        }
                                                                        return sap.m.AvatarColor.Accent6;
                                                                    }
                                                                },
                                                                authorPicture: {
                                                                    path: "activated",
                                                                    formatter(data: any): string {
                                                                        if (data !== true) {
                                                                            return "sap-icon://media-forward";
                                                                        }
                                                                        return "sap-icon://media-play";
                                                                    }
                                                                },
                                                                datetime: {
                                                                    parts: [
                                                                        {
                                                                            path: "job/frequency",
                                                                            formatter(data: number): string {
                                                                                return ibas.strings.format("+{0}s", data);
                                                                            }
                                                                        },
                                                                        {
                                                                            path: "job/atTime",
                                                                            formatter(data: number): string {
                                                                                if (data >= 0 && data < 2400) {
                                                                                    return ibas.strings.format("@{0}", new sap.extension.data.Time().formatValue(data, "string"));
                                                                                }
                                                                                return undefined;
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                authorName: {
                                                                    path: "lastRunTime",
                                                                    formatter(data: any): string {
                                                                        let date: Date = ibas.dates.valueOf(data);
                                                                        if (date instanceof Date) {
                                                                            return ibas.dates.toString(date, "HH:mm:ss");
                                                                        }
                                                                        return ibas.i18n.prop("integration_scheduler_not_begin");
                                                                    }
                                                                },
                                                                press(event: sap.ui.base.Event): void {
                                                                    let source: any = event.getSource();
                                                                    if (source instanceof sap.m.NotificationListItem) {
                                                                        /*
                                                                        let i: number = 0;
                                                                        setInterval(() => {
                                                                            i += 1;
                                                                            source.setAuthorAvatarColor("Accent" + i);
                                                                            ibas.logger.log(source.getAuthorAvatarColor());
                                                                        }, 1000);
                                                                        */
                                                                    }
                                                                },
                                                                showCloseButton: true,
                                                                close(event: sap.ui.base.Event): void {
                                                                    let source: any = event.getSource();
                                                                    if (source instanceof sap.m.NotificationListItem) {
                                                                        let data: any = source.getBindingContext().getObject();
                                                                        if (data instanceof app.TaskAction) {
                                                                            if (source.getAuthorPicture() === "sap-icon://media-forward") {
                                                                                data.activated = true;
                                                                            } else {
                                                                                data.activated = false;
                                                                            }
                                                                            source.getModel().refresh(true);
                                                                        }
                                                                    }
                                                                },
                                                            })
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
                                                            new sap.m.Title("", {
                                                                textAlign: sap.ui.core.TextAlign.Left,
                                                                text: ibas.i18n.prop("integration_running_log"),
                                                                width: "6rem",
                                                            }),
                                                            this.maxCount = new sap.m.StepInput("", {
                                                                min: 100,
                                                                max: 5000,
                                                                step: 100,
                                                                value: 500,
                                                                width: "7rem",
                                                                textAlign: sap.ui.core.TextAlign.Right,
                                                            }),
                                                            new sap.m.Button("", {
                                                                type: sap.m.ButtonType.Transparent,
                                                                icon: "sap-icon://eraser",
                                                                press: function (event: sap.ui.base.Event): void {
                                                                    let source: any = event.getSource();
                                                                    if (source instanceof sap.m.Button) {
                                                                        that.rightList.destroyItems();
                                                                    }
                                                                }
                                                            }),
                                                            new sap.m.ToolbarSeparator(""),
                                                            new sap.m.Button("", {
                                                                type: sap.m.ButtonType.Transparent,
                                                                icon: "sap-icon://save",
                                                                press: function (event: sap.ui.base.Event): void {
                                                                    ibas.files.save(storages.local.file(false),
                                                                        ibas.strings.format("ig_logs_{0}.txt", ibas.dates.toString(ibas.dates.now(), "yyyy-MM-dd_HHmmss")));
                                                                }
                                                            }),
                                                            new sap.m.ToolbarSpacer(""),
                                                        ]
                                                    }),
                                                content: [
                                                    this.rightList = new sap.m.List("", {
                                                        growing: true,
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
                private rightList: sap.m.List;
                private maxCount: sap.m.StepInput;
                private beginButton: sap.m.Button;
                /** 显示状态 */
                showStatus(content: string): void {
                    let model: any = this.leftList.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        model.refresh(true);
                    }
                }
                /** 显示任务 */
                showJobs(datas: app.TaskAction[]): void {
                    let model: any = this.leftList.getModel();
                    if (!ibas.objects.isNull(model)) {
                        let cData: any = this.beginButton.removeCustomData(0);
                        if (cData instanceof sap.ui.core.CustomData && cData.getKey() === "handler") {
                            clearInterval(cData.getValue());
                        }
                        this.beginButton.setText(ibas.i18n.prop("integration_scheduler_begin"));
                        this.beginButton.setIcon("sap-icon://begin");
                        this.rightList.destroyItems();
                        this.leftList.setModel(null);
                    }
                    this.leftList.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    if (datas.length > 0) {
                        let time: number = 30;
                        let text: string = this.beginButton.getText();
                        this.application.viewShower.proceeding(this, ibas.emMessageType.WARNING, ibas.i18n.prop("integration_scheduler_job_list_will_be_started", time, text));
                        this.beginButton.addCustomData(new sap.ui.core.CustomData("", {
                            key: "handler",
                            value: setInterval(() => {
                                if (time <= 0) {
                                    (<any>this.beginButton).firePress();
                                } else {
                                    this.beginButton.setText(ibas.strings.format("{0} ({1})", text, time));
                                    time = time - 1;
                                }
                            }, 1000)
                        }));
                        this.beginButton.setType(sap.m.ButtonType.Critical);
                    }
                }
                showLogs(type: ibas.emMessageType, content: string): void {
                    if (this.rightList.getItems().length > this.maxCount.getValue()) {
                        this.rightList.destroyItems();
                    }
                    this.rightList.insertItem(new sap.m.CustomListItem("", {
                        content: [
                            new sap.m.MessageStrip("", {
                                type: openui5.utils.toMessageType(type),
                                showIcon: true,
                                showCloseButton: false
                            }).setText(content)
                        ]
                    }), 0);
                    try {
                        storages.local.log(content);
                    } catch (error) {
                        storages.local.upload((result) => {
                            if (result instanceof Error) {
                                this.application.viewShower.messages({
                                    title: this.title,
                                    type: ibas.emMessageType.ERROR,
                                    message: result.message,
                                });
                            } else {
                                this.application.viewShower.proceeding(this, ibas.emMessageType.SUCCESS,
                                    ibas.i18n.prop("integration_log_uploaded", result.fileName));
                            }
                        });
                        storages.local.log(content);
                    }
                }
            }
        }
    }
}