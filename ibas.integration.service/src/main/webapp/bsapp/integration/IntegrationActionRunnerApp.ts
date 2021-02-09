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
            private groupAction: GroupAction;
            private runActions(): void {
                if (ibas.objects.isNull(this.actions)) {
                    return;
                }
                let that: this = this;
                let groupAction: GroupAction = new GroupAction();
                groupAction.setLogger({
                    level: ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE) === true ? ibas.emMessageLevel.DEBUG : ibas.emMessageLevel.INFO,
                    log(): void {
                        let tmpArgs: Array<any> = new Array();
                        for (let item of arguments) {
                            tmpArgs.push(item);
                        }
                        // 控制台日志
                        ibas.logger.log.apply(ibas.logger, tmpArgs);
                        // 界面日志
                        let level: number;
                        if (typeof tmpArgs[0] === "number" && tmpArgs.length > 1) {
                            level = tmpArgs[0];
                            tmpArgs = tmpArgs.slice(1);
                        } else if (tmpArgs[0] instanceof Error && tmpArgs.length === 1) {
                            level = ibas.emMessageLevel.ERROR;
                            tmpArgs[0] = tmpArgs[0].message;
                        } else {
                            level = ibas.emMessageLevel.INFO;
                        }
                        if (level > this.level) {
                            // 超过日志输出的级别
                            return;
                        }
                        let type: ibas.emMessageType = bo.DataConverter.toMessageType(level);
                        let message: string = ibas.strings.format(tmpArgs[0], tmpArgs.slice(1));
                        if (that.isViewShowed()) {
                            try {
                                that.view.showMessages(type, message);
                            } catch (error) {
                                // 写日志出错
                                that.proceeding(error);
                            }
                        } else {
                            that.proceeding(type, message);
                        }
                    }
                });
                that.view.busy(true);
                for (let item of this.actions) {
                    bo.actionFactory.create({
                        action: item,
                        onError(error: Error): void {
                            if ((<any>error).requireType === "scripterror") {
                                that.messages({
                                    type: ibas.emMessageType.ERROR,
                                    message: ibas.i18n.prop("integration_not_found_action", item.name),
                                });
                            } else {
                                that.messages(error);
                            }
                        },
                        onCompleted(action: ibas.Action): void {
                            // 添加额外运行数据
                            action.extraData = that.extraData;
                            groupAction.addAction(action);
                            if (groupAction.length === that.actions.length) {
                                that.groupAction = groupAction;
                                groupAction.onDone = () => {
                                    that.view.busy(false);
                                };
                                groupAction.do();
                            }
                        }
                    });
                }
            }
            private stopActions(): void {
                if (ibas.objects.isNull(this.groupAction)) {
                    return;
                }
                this.groupAction.stop();
                this.groupAction = null;
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
        /** 集合动作 */
        class GroupAction extends ibas.Action {
            /** 日志者 */
            logger: ibas.ILogger;
            /** 设置日志记录者 */
            setLogger(logger: ibas.ILogger): void {
                this.logger = logger;
                super.setLogger(this.logger);
            }
            /** 运行 */
            protected run(): boolean {
                if (ibas.objects.isNull(this.actions)) {
                    return true;
                }
                if (this.actions.length === 0) {
                    return true;
                }
                let that: this = this;
                ibas.queues.execute(this.actions, (action, next) => {
                    action.onDone = function (): void {
                        next();
                    };
                    action.do();
                }, (error) => {
                    if (error instanceof Error) {
                        that.log(ibas.emMessageLevel.ERROR, error.message);
                    }
                    that.done();
                });
                return false;
            }
            /** 子任务 */
            private actions: ibas.IList<ibas.Action>;
            /** 任务个数 */
            get length(): number {
                if (ibas.objects.isNull(this.actions)) {
                    return 0;
                }
                return this.actions.length;
            }
            addAction(action: ibas.Action): void {
                if (ibas.objects.isNull(this.actions)) {
                    this.actions = new ibas.ArrayList<ibas.Action>();
                }
                action.setLogger(this.logger);
                this.actions.add(action);
            }
            stop(): void {
                if (ibas.objects.isNull(this.actions)) {
                    return;
                }
                for (let item of this.actions) {
                    item.stop();
                }
            }
        }
    }
}