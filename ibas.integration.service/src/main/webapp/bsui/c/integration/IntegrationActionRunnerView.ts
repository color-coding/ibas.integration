/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace ui {
        /** 配置项目-最大消息数 */
        export const CONFIG_ITEM_MAX_MESSAGE_COUNT: string = "messageCount";
        export namespace c {
            /**
             * 列表视图-开发终端
             */
            export class IntegrationActionRunnerView extends ibas.View implements app.IIntegrationActionRunnerView {
                /** 运行 */
                runActionsEvent: Function;
                /** 停止 */
                stopActionsEvent: Function;
                /** 绘制视图 */
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    return new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_run"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://begin",
                                    press: function (): void {
                                        that.rightList.destroyItems();
                                        that.fireViewEvents(that.runActionsEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_stop"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://stop",
                                    press: function (): void {
                                        that.fireViewEvents(that.stopActionsEvent);
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                            ]
                        }),
                        content: [
                            new sap.ui.layout.Splitter("", {
                                orientation: sap.ui.core.Orientation.Horizontal,
                                contentAreas: [
                                    new sap.ui.layout.Splitter("", {
                                        layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                            resizable: false,
                                            size: "40%",
                                        }),
                                        contentAreas: [
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                subHeader: new sap.m.Toolbar("", {
                                                    design: sap.m.ToolbarDesign.Transparent,
                                                    style: sap.m.ToolbarStyle.Standard,
                                                    content: [
                                                        new sap.m.Title("", {
                                                            textAlign: sap.ui.core.TextAlign.Left,
                                                            text: ibas.i18n.prop("bo_action"),
                                                            level: sap.ui.core.TitleLevel.H6,
                                                            width: "6rem",
                                                        }),
                                                    ]
                                                }),
                                                content: [
                                                    this.leftList = new sap.ui.layout.VerticalLayout("", {
                                                        width: "100%",
                                                    })
                                                ]
                                            }),
                                        ]
                                    }),
                                    new sap.ui.layout.Splitter("", {
                                        layoutData: new sap.ui.layout.SplitterLayoutData("", {
                                            resizable: false,
                                            size: "60%",
                                        }),
                                        contentAreas: [
                                            new sap.m.Page("", {
                                                showHeader: false,
                                                floatingFooter: true,
                                                subHeader: new sap.m.Toolbar("", {
                                                    design: sap.m.ToolbarDesign.Transparent,
                                                    style: sap.m.ToolbarStyle.Standard,
                                                    content: [
                                                        new sap.m.Title("", {
                                                            level: sap.ui.core.TitleLevel.H6,
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
                                                                let length: number = that.next();
                                                                let builder: string[] = [];
                                                                for (let index: number = 1; index < length; index++) {
                                                                    let key: string = that.storageKey(index);
                                                                    let value: string = sessionStorage.getItem(key);
                                                                    if (ibas.strings.isEmpty(value)) {
                                                                        continue;
                                                                    }
                                                                    if (builder.length > 0) {
                                                                        builder.push("\n");
                                                                    }
                                                                    builder.push(value);
                                                                }
                                                                ibas.files.save(new Blob(builder),
                                                                    ibas.strings.format("ig_logs_{0}.txt", ibas.dates.toString(ibas.dates.now(), "yyyy-MM-dd_HHss")));
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
                private maxCount: sap.m.StepInput;
                private leftList: sap.ui.layout.VerticalLayout;
                private rightList: sap.m.List;
                /** 显示数据 */
                showActions(datas: bo.Action[]): void {
                    this.leftList.destroyContent();
                    for (let data of datas) {
                        let configForm: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                            editable: true,
                        });
                        for (let config of data.configs) {
                            configForm.addContent(new sap.m.Label("", {
                                text: ibas.strings.isEmpty(config.remark) ? config.key : config.remark,
                                tooltip: ibas.strings.isEmpty(config.remark) ? null : config.key,
                            }));
                            configForm.addContent(
                                <any>sap.extension.factories.newInput(
                                    config.value,
                                    (event) => {
                                        // 控件值改变时，赋值到对象
                                        let source: any = event.getSource();
                                        if (source instanceof sap.m.Input) {
                                            if (!ibas.strings.isEmpty(source.getSelectedKey())) {
                                                config.value = source.getSelectedKey();
                                            } else if (!ibas.strings.isEmpty(source.getValue())) {
                                                config.value = source.getValue();
                                            } else {
                                                config.value = source.getPlaceholder();
                                            }
                                        }
                                    }
                                )
                            );
                        }
                        this.leftList.addContent(new sap.m.Panel("", {
                            expandable: true,
                            expanded: true,
                            backgroundDesign: sap.m.BackgroundDesign.Translucent,
                            accessibleRole: sap.m.PanelAccessibleRole.Form,
                            headerToolbar: new sap.m.Toolbar("", {
                                content: [
                                    new sap.m.Title("", {
                                        text: ibas.strings.format("{1} · {0}", data.name, ibas.strings.isEmpty(data.remark) ? data.path : data.remark),
                                    }),
                                    new sap.m.ToolbarSpacer(""),
                                    new sap.m.Button("", {
                                        icon: "sap-icon://collapse",
                                        visible: data.configs.length > 0 ? true : false,
                                        press: (event: sap.ui.base.Event) => {
                                            let source: any = event.getSource();
                                            if (source instanceof sap.m.Button) {
                                                let parent: any = source.getParent();
                                                if (parent instanceof sap.m.Toolbar) {
                                                    let grand: any = parent.getParent();
                                                    if (grand instanceof sap.m.Panel) {
                                                        grand.setExpanded(!grand.getExpanded());
                                                    }
                                                }
                                            }
                                        }
                                    }),
                                ]
                            }),
                            content: [
                                configForm,
                            ],
                            expand(event: sap.ui.base.Event): void {
                                let source: any = event.getSource();
                                if (source instanceof sap.m.Panel) {
                                    let button: any = ibas.arrays.create(source.getHeaderToolbar().getContent()).lastOrDefault();
                                    if (button instanceof sap.m.Button) {
                                        if (source.getExpanded()) {
                                            button.setIcon("sap-icon://collapse");
                                        } else {
                                            button.setIcon("sap-icon://expand");
                                        }
                                    }
                                }
                            }
                        }));
                    }
                }
                /** 显示消息 */
                showMessages(type: ibas.emMessageType, content: string): void {
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
                    sessionStorage.setItem(this.storageKey(this.next()), content);
                }
                private next(): number {
                    let type: string = ibas.strings.format("IG_LOG_NEXT_{0}", this.id.toUpperCase());
                    let tValue: string = sessionStorage.getItem(type);
                    if (ibas.objects.isNull(tValue)) {
                        tValue = "0";
                    }
                    let index: number = ibas.numbers.valueOf(sessionStorage.getItem(type));
                    index = index + 1;
                    sessionStorage.setItem(type, index.toString());
                    return index;
                }
                private storageKey(id: number): string {
                    return ibas.strings.format("IG_LOG_{1}_{0}", ibas.strings.fill(id, 8, "0"), this.id);
                }
            }
        }
    }
}