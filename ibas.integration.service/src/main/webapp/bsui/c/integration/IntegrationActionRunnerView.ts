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
                    this.layoutAction = new sap.ui.layout.VerticalLayout("", {
                        width: "100%",
                    });
                    this.layoutMessage = new sap.ui.layout.VerticalLayout("", {
                        width: "100%",
                    });
                    let height: string = ibas.strings.format("{0}px", window.innerHeight - 200);
                    return new sap.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_run"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://begin",
                                    press: function (): void {
                                        that.layoutMessage.destroyContent();
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
                                new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("integration_clear_log"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://eraser",
                                    buttonMode: sap.m.MenuButtonMode.Split,
                                    useDefaultActionOnly: true,
                                    defaultAction(): void {
                                        that.messages = undefined;
                                        that.layoutMessage.destroyContent();
                                    },
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.i18n.prop("integration_save_log"),
                                                icon: "sap-icon://notes",
                                                press: function (): void {
                                                    jQuery.sap.require("sap.ui.core.util.Export");
                                                    jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
                                                    let oExport: sap.ui.core.util.Export = new sap.ui.core.util.Export("", {
                                                        exportType: new sap.ui.core.util.ExportTypeCSV("", {
                                                            separatorChar: ","
                                                        }),
                                                        models: new sap.ui.model.json.JSONModel({ rows: that.messages }),
                                                        rows: {
                                                            path: "/rows"
                                                        },
                                                        columns: [
                                                            {
                                                                name: "type",
                                                                template: {
                                                                    content: {
                                                                        parts: ["type"],
                                                                        formatter(data: any): any {
                                                                            return ibas.enums.toString(ibas.emMessageType, data);
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                name: "content",
                                                                template: {
                                                                    content: "{content}"
                                                                }
                                                            },
                                                        ]
                                                    });
                                                    let name: ibas.StringBuilder = new ibas.StringBuilder();
                                                    name.append("action_log");
                                                    if (that.messages[1] && that.messages[1].content) {
                                                        let tmp: string = that.messages[1].content;
                                                        if (tmp.indexOf(":") > 0) {
                                                            name.append("_");
                                                            name.append(tmp.split(":")[0].toLowerCase());
                                                        }
                                                    }
                                                    oExport.saveFile(name.toString()).catch(function (error: Error): void {
                                                        that.application.viewShower.messages({
                                                            title: that.title,
                                                            type: ibas.emMessageType.ERROR,
                                                            message: "Error when downloading data. Browser might not be supported!\n\n" + error,
                                                        });
                                                    }).then(function (): void {
                                                        oExport.destroy();
                                                    });
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        content: [
                            new sap.ui.layout.form.SimpleForm("", {
                                content: [
                                    new sap.ui.core.Title("", {
                                        text: ibas.i18n.prop("bo_action"),
                                    }),
                                    new sap.m.ScrollContainer("", {
                                        horizontal: false,
                                        vertical: true,
                                        height: height,
                                        content: [
                                            this.layoutAction
                                        ]
                                    }),
                                    new sap.ui.core.Title("", {
                                        text: ibas.i18n.prop("integration_running_log"),
                                    }),
                                    new sap.m.ScrollContainer("", {
                                        horizontal: false,
                                        vertical: true,
                                        height: height,
                                        content: [
                                            this.layoutMessage
                                        ]
                                    }),
                                ]
                            })
                        ]
                    });
                }
                private layoutMessage: sap.ui.layout.VerticalLayout;
                private layoutAction: sap.ui.layout.VerticalLayout;
                /** 显示数据 */
                showActions(datas: bo.Action[]): void {
                    this.layoutAction.destroyContent();
                    for (let data of datas) {
                        let configForm: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                            editable: true,
                        });
                        for (let config of data.configs) {
                            configForm.addContent(new sap.m.Label("", {
                                text: ibas.strings.isEmpty(config.remark) ? config.key : config.remark,
                            }));
                            let criteria: ibas.ICriteria = null;
                            let property: string;
                            if (ibas.strings.valueOf(config.value).startsWith("#{") && ibas.strings.valueOf(config.value).endsWith("}")) {
                                // #{CC_SYS_USER}.{Code}
                                // 替换变量
                                let value: string = ibas.config.applyVariables(config.value);
                                let values: string[] = value.split(".");
                                if (values.length > 1) {
                                    criteria = new ibas.Criteria();
                                    if (!ibas.strings.isEmpty(values[0])) {
                                        criteria.businessObject = ibas.strings.remove(values[0], "#", "{", "}");
                                    }
                                    if (!ibas.strings.isEmpty(values[1])) {
                                        property = ibas.strings.remove(values[1], "#", "{", "}");
                                    }
                                }
                            } else if (ibas.strings.valueOf(config.value).startsWith("{") && ibas.strings.valueOf(config.value).endsWith("}")) {
                                // {"businessObject":"CC_SYS_USER", "conditions":[]}
                                criteria = ibas.criterias.valueOf(config.value);
                                if (ibas.strings.isEmpty(criteria.businessObject)) {
                                    criteria = null;
                                } else {
                                    criteria.businessObject = ibas.config.applyVariables(criteria.businessObject);
                                }
                                if (criteria.businessObject.indexOf(".") > 0) {
                                    property = criteria.businessObject.split(".")[1];
                                    criteria.businessObject = criteria.businessObject.split(".")[0];
                                }
                            }
                            let input: sap.m.Input = new sap.m.Input("", {
                                width: "100%",
                                fieldWidth: "70%",
                                showValueHelp: ibas.objects.isNull(criteria) ? false : true,
                                description: ibas.strings.isEmpty(config.remark) ? null : config.key,
                                valueHelpRequest: function (): void {
                                    if (ibas.objects.isNull(criteria) || ibas.strings.isEmpty(criteria.businessObject)) {
                                        return;
                                    }
                                    ibas.servicesManager.runChooseService<any>({
                                        boCode: criteria.businessObject,
                                        criteria: criteria,
                                        chooseType: ibas.emChooseType.MULTIPLE,
                                        onCompleted(selecteds: ibas.IList<any>): void {
                                            let builder: ibas.StringBuilder = new ibas.StringBuilder();
                                            for (let item of selecteds) {
                                                if (builder.length > 0) {
                                                    builder.append(ibas.DATA_SEPARATOR);
                                                }
                                                if (ibas.strings.isEmpty(property)) {
                                                    builder.append(item);
                                                } else {
                                                    builder.append(item[property]);
                                                }
                                            }
                                            input.setValue(builder.toString());
                                            config.value = input.getValue();
                                        }
                                    });
                                },
                                change: function (): void {
                                    // 控件值改变时，赋值到对象
                                    let that: sap.m.Input = this;
                                    if (ibas.strings.isEmpty(that.getValue())) {
                                        config.value = that.getPlaceholder();
                                    } else {
                                        config.value = that.getValue();
                                    }
                                }
                            });
                            input.bindProperty("placeholder", {
                                path: "/value", // 必须绑定，不然特殊字符处理不了
                            });
                            input.setModel(new sap.ui.model.json.JSONModel(config));
                            configForm.addContent(input);
                        }
                        let panel: sap.m.Panel = new sap.m.Panel("", {
                            expandable: true,
                            expanded: false,
                            width: "auto",
                            backgroundDesign: sap.m.BackgroundDesign.Translucent,
                            accessibleRole: sap.m.PanelAccessibleRole.Form,
                            headerToolbar: new sap.m.Toolbar("", {
                                content: [
                                    new sap.m.Title("", {
                                        text: ibas.strings.format("{0} · {1}", data.name, ibas.strings.isEmpty(data.remark) ? data.path : data.remark),
                                    }),
                                    new sap.m.ToolbarSpacer(""),
                                    new sap.m.Button("", {
                                        icon: "sap-icon://settings",
                                        visible: data.configs.length > 0 ? true : false,
                                        press: function (): void {
                                            panel.setExpanded(!panel.getExpanded());
                                        }
                                    }),
                                ]
                            }),
                            content: [
                                configForm,
                            ]
                        });
                        this.layoutAction.addContent(panel);
                    }
                }
                private debugMode: boolean = ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE, false);
                private messageCount: number = ibas.config.get(CONFIG_ITEM_MAX_MESSAGE_COUNT, 50) * 3;
                /** 显示消息 */
                showMessages(type: ibas.emMessageType, message: string): void {
                    if (this.debugMode !== true) {
                        // 非调试模式，仅保留150条日志
                        if (this.layoutMessage.getContent().length > this.messageCount) {
                            this.layoutMessage.destroyContent();
                            this.layoutMessage.insertContent(new sap.m.MessageStrip("", {
                                type: sap.ui.core.MessageType.Warning,
                                showIcon: true,
                                showCloseButton: false,
                            }).setText(ibas.i18n.prop("integration_log_be_auto_cleared")), 0);
                        }
                    }
                    this.layoutMessage.insertContent(new sap.m.MessageStrip("", {
                        type: openui5.utils.toMessageType(type),
                        showIcon: true,
                        showCloseButton: false
                    }).setText(message), 0);
                    if (!(this.messages instanceof Array)) {
                        this.messages = new Array<IMessage>();
                    }
                    this.messages.push({
                        type: type,
                        content: message
                    });
                }
                private messages: Array<IMessage>;
            }
            interface IMessage {
                type: ibas.emMessageType;
                content: string;
            }
        }
    }
}