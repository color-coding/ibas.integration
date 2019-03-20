/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace app {
        /** 集成任务调度者 */
        export class IntegrationJobSchedulerApp extends ibas.ResidentApplication<IIntegrationJobSchedulerView> {
            /** 应用标识 */
            static APPLICATION_ID: string = "c2f09054-8692-47ee-b3ec-099d313421c3";
            /** 应用名称 */
            static APPLICATION_NAME: string = "integration_app_integrationjob_scheduler";
            /** 构造函数 */
            constructor() {
                super();
                this.id = IntegrationJobSchedulerApp.APPLICATION_ID;
                this.name = IntegrationJobSchedulerApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.suspendEvent = this.suspend;
                this.view.resetEvent = this.reset;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
                this.view.showJobs(this.jobs);
            }
            /** 工具条显示后 */
            protected barShowed(): void {
                // 10秒后检查，任务
                setTimeout(() => this.schedule(), 10000);
            }
            private activated: boolean = true;
            private jobs: ibas.ArrayList<TaskAction>;
            private schedule(auto: boolean = true): void {
                this.busy(true);
                let criteria: ibas.ICriteria = new ibas.Criteria();
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = bo.IntegrationJob.PROPERTY_ACTIVATED_NAME;
                condition.value = ibas.emYesNo.YES.toString();
                condition = criteria.conditions.create();
                condition.alias = bo.IntegrationJob.PROPERTY_DATAOWNER_NAME;
                condition.value = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_ID);
                condition = criteria.conditions.create();
                condition.alias = bo.IntegrationJob.PROPERTY_FREQUENCY_NAME;
                condition.operation = ibas.emConditionOperation.GRATER_THAN;
                condition.value = "0";
                let that: this = this;
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.fetchIntegrationJob({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.IOperationResult<bo.IntegrationJob>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let jobs: ibas.ArrayList<TaskAction> = new ibas.ArrayList<TaskAction>();
                            let logger: ibas.ILogger = {
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
                                    } else {
                                        level = ibas.emMessageLevel.INFO;
                                    }
                                    if (level > this.level) {
                                        // 超过日志输出的级别
                                        return;
                                    }
                                    let type: ibas.emMessageType = bo.DataConverter.toMessageType(level);
                                    let message: string = ibas.strings.format(tmpArgs[0], tmpArgs.slice(1));
                                    that.proceeding(type, message);
                                    if (level === ibas.emMessageLevel.FATAL) {
                                        // 严重错误，显示对话框
                                        that.messages(ibas.emMessageType.ERROR, message);
                                    }
                                }
                            };
                            let builder: ibas.StringBuilder = new ibas.StringBuilder();
                            builder.append("\n");
                            builder.append("(");
                            for (let item of opRslt.resultObjects) {
                                if (item.integrationJobActions.length === 0) {
                                    continue;
                                }
                                let task: TaskAction = new TaskAction(item);
                                task.activated = true;
                                task.setLogger(logger);
                                jobs.add(task);
                                if (builder.length > 2) {
                                    builder.append(",");
                                }
                                builder.append(task.job.name);
                            }
                            builder.append(")");
                            that.jobs = jobs;
                            if (that.jobs.length > 0) {
                                that.messages({
                                    title: that.description,
                                    type: ibas.emMessageType.QUESTION,
                                    actions: [ibas.emMessageAction.YES, ibas.emMessageAction.NO],
                                    message: ibas.i18n.prop("integration_running_background_integrationjob", that.jobs.length) + builder.toString(),
                                    onCompleted(action: ibas.emMessageAction): void {
                                        if (action !== ibas.emMessageAction.YES) {
                                            return;
                                        }
                                        that.view.showJobs(that.jobs);
                                        setInterval(function (): void {
                                            if (!that.activated) {
                                                return;
                                            }
                                            for (let item of that.jobs) {
                                                item.do();
                                            }
                                        }, 10000);
                                    }
                                });
                            } else {
                                if (auto) {
                                    ibas.logger.log(ibas.emMessageLevel.INFO, ibas.i18n.prop("integration_not_found_user_integrationjob"));
                                } else {
                                    that.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("integration_not_found_user_integrationjob"));
                                }
                            }
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            private reset(): void {
                this.schedule(false);
            }
            private suspend(suspend: boolean): void {
                if (suspend === true) {
                    this.activated = false;
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("integration_background_integrationjob_stop"));
                } else {
                    this.activated = true;
                    this.proceeding(ibas.emMessageType.SUCCESS, ibas.i18n.prop("integration_background_integrationjob_running"));
                }
            }
        }
        /** 视图-集成任务调度者 */
        export interface IIntegrationJobSchedulerView extends ibas.IResidentView {
            /** 显示任务 */
            showJobs(datas: TaskAction[]): void;
            /** 暂停运行事件 */
            suspendEvent: Function;
            /** 重置事件 */
            resetEvent: Function;
        }
        /** 任务动作 */
        export class TaskAction extends ibas.Action {
            constructor(job: bo.IntegrationJob = undefined) {
                super();
                if (!ibas.objects.isNull(job)) {
                    this.job = job;
                    this.id = ibas.strings.valueOf(this.job.objectKey);
                    this.name = ibas.strings.format("{0}-{1}", this.job.objectKey, this.job.name);
                }
            }
            /** 工作 */
            job: bo.IntegrationJob;
            /** 上次运行时间 */
            lastRunTime: number;
            /** 激活的 */
            activated: boolean;
            /** 日志者 */
            logger: ibas.ILogger;
            /** 设置日志记录者 */
            setLogger(logger: ibas.ILogger): void {
                this.logger = logger;
                super.setLogger(this.logger);
            }
            /** 进行 */
            do(): void {
                // 未激活
                if (!this.activated) {
                    return;
                }
                // 正在运行
                if (this.isRunning()) {
                    return;
                }
                // 尚未到循环周期
                if (ibas.dates.now().getTime() < (this.lastRunTime + this.job.frequency * 1000)) {
                    return;
                }
                // 检查任务是否更新
                if (this.lastRunTime > 0) {
                    let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.IntegrationJob.PROPERTY_OBJECTKEY_NAME;
                    condition.operation = ibas.emConditionOperation.EQUAL;
                    condition.value = this.job.objectKey.toString();
                    boRepository.fetchIntegrationJob({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            let job: bo.IntegrationJob = opRslt.resultObjects.firstOrDefault();
                            if (ibas.objects.isNull(job) || job.logInst !== this.job.logInst) {
                                // 集成任务不存在，或已被修改
                                this.log(ibas.emMessageLevel.FATAL, ibas.i18n.prop("integration_background_integrationjob_updated"));
                                this.activated = false;
                            } else {
                                super.do();
                            }
                        }
                    });
                } else {
                    super.do();
                }
            }
            protected done(): void {
                super.done();
                this.lastRunTime = this.endTime.getTime();
            }
            /** 运行 */
            protected run(): boolean {
                if (ibas.objects.isNull(this.actions)) {
                    // 尚未初始化
                    let that: this = this;
                    let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                    boRepository.fetchAction({
                        criteria: this.job,
                        onCompleted(opRslt: ibas.IOperationResult<bo.Action>): void {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    throw new Error(ibas.i18n.prop("integration_not_found_job_actions", that.job.name));
                                }
                                for (let item of opRslt.resultObjects) {
                                    bo.actionFactory.create({
                                        action: item,
                                        onError(error: Error): void {
                                            that.activated = false;
                                            that.log(ibas.emMessageLevel.ERROR, error.message);
                                        },
                                        onCompleted(action: ibas.Action): void {
                                            if (ibas.objects.isNull(that.actions)) {
                                                that.actions = new ibas.ArrayList<ibas.Action>();
                                            }
                                            // 设置日志记录
                                            action.setLogger(that.logger);
                                            that.actions.add(action);
                                            if (that.actions.length === opRslt.resultObjects.length) {
                                                // 全部加载完成
                                                that.runActions();
                                            }
                                        }
                                    });
                                }
                            } catch (error) {
                                // 出错，不在运行
                                that.activated = false;
                                that.log(ibas.emMessageLevel.ERROR, error.message);
                            }
                        }
                    });
                } else {
                    // 已初始化，开始运行任务
                    return this.runActions();
                }
                return false;
            }
            /** 运行子任务 */
            private runActions(): boolean {
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
        }
    }
}