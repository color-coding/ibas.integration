/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace app {
        /** 动作运行 */
        export class IntegrationActionRunnerApp extends ibas.Application<IIntegrationActionRunnerView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "50637c67-2a3a-4d9f-9553-c4a85b5751d5";
            /** 应用名称 */
            static APPLICATION_NAME: string = "integration_app_action_runner";
            /** 构造函数 */
            constructor() {
                super();
                this.id = IntegrationActionRunnerApp.APPLICATION_ID;
                this.name = IntegrationActionRunnerApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
                this.autoRun = true;
                this.actions = new ibas.ArrayList<bo.Action>();
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.runActionsEvent = this.runActions;
                this.view.stopActionsEvent = this.stopActions;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.view.showActions(this.actions);
            }
            /** 额外的运行数据 */
            extraData: any;
            /** 自动运行 */
            autoRun: boolean;
            run(): void;
            run(action: bo.Action | bo.Action[]): void;
            run(): void {
                if (ibas.objects.instanceOf(arguments[0], bo.Action)) {
                    this.actions.add(arguments[0]);
                } else if (arguments[0] instanceof Array) {
                    for (let item of arguments[0]) {
                        if (ibas.objects.instanceOf(item, bo.Action)) {
                            this.actions.add(item);
                        }
                    }
                } else {
                    for (let item of arguments) {
                        if (ibas.objects.instanceOf(item, bo.Action)) {
                            this.actions.add(item);
                        }
                    }
                }
                if (this.actions.length > 0 && this.autoRun) {
                    // 存在动作执行
                    this.runActions();
                } else {
                    // 没有任务显示界面
                    super.run.apply(this, arguments);
                }
            }
            private actions: ibas.IList<bo.Action>;
            private myWorker: IntegrationWorker;
            private logger: { log(message: string | Error, type?: ibas.emMessageType): void } = {
                log: (message, type) => {
                    if (ibas.objects.isNull(type)) {
                        if (message instanceof Error) {
                            type = ibas.emMessageType.ERROR;
                            message = message.stack;
                        } else {
                            type = ibas.emMessageType.INFORMATION;
                        }
                    }
                    // 控制台日志
                    if (type === ibas.emMessageType.ERROR) {
                        ibas.logger.log(ibas.emMessageLevel.ERROR, message.toString());
                    }
                    if (this.isViewShowed()) {
                        try {
                            this.view.showMessages(type, message.toString());
                        } catch (error) {
                            // 写日志出错
                            this.proceeding(error);
                        }
                    } else {
                        this.proceeding(type, message.toString());
                    }
                }
            };
            private runActions(): void {
                if (!ibas.objects.isNull(this.myWorker)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("integration_has_running_worker"));
                    return;
                }
                if (ibas.objects.isNull(this.actions)) {
                    return;
                }
                try {
                    this.busy(true);
                    this.myWorker = ibas.workers.init(new IntegrationWorker());
                    this.myWorker.addSetting("actions", this.actions);
                    this.myWorker.onMessage = (message) => {
                        if (message instanceof Error) {
                            this.logger.log(message.stack ? message.stack : message, ibas.emMessageType.ERROR);
                        } else if (typeof message === "string") {
                            this.logger.log(message, ibas.emMessageType.INFORMATION);
                        } else {
                            this.logger.log(message.message, message.type);
                        }
                    };
                    this.myWorker.onStop = () => {
                        this.logger.log(ibas.i18n.prop("integration_worker_end",
                            this.myWorker.name, ibas.dates.toString(this.myWorker.endTime, "HH:mm:ss"), ibas.dates.span(this.myWorker.startTime, this.myWorker.endTime)));
                        this.myWorker = null;
                        this.view.busy(false);
                    };
                    this.busy(false);
                    this.view.busy(true);
                    this.myWorker.do();
                    this.logger.log(ibas.i18n.prop("integration_worker_starting", this.myWorker.name, ibas.dates.toString(this.myWorker.startTime, "HH:mm:ss")));
                } catch (error) {
                    this.messages(error);
                    this.stopActions();
                }
            }
            private stopActions(): void {
                if (ibas.objects.isNull(this.myWorker)) {
                    return;
                }
                this.myWorker.stop();
                this.myWorker = null;
                this.view.busy(false);
            }
            close(): void {
                if (!ibas.objects.isNull(this.myWorker)) {
                    this.myWorker.stop();
                    this.myWorker = null;
                }
                super.close();
            }
        }
        /** 视图-动作运行 */
        export interface IIntegrationActionRunnerView extends ibas.IView {
            /** 运行 */
            runActionsEvent: Function;
            /** 停止 */
            stopActionsEvent: Function;
            /** 显示动作 */
            showActions(datas: bo.Action[]): void;
            /** 显示消息 */
            showMessages(type: ibas.emMessageType, message: string): void;
            /** 忙状态 */
            busy(value: boolean): void;
        }
    }
}