/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace app {
        /** 配置项目-自动运行默认项 */
        const CONFIG_ITEM_JOB_SCHEDULER_DEFAULT_ACTION: string = "jobDefaultAction";
        /** 任务列表队列编号 */
        let jobHandler: number;
        /** 集成任务调度者 */
        export class IntegrationJobSchedulerApp extends ibas.Application<IIntegrationJobSchedulerView> {
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
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.fetchIntegrationJob({
                    criteria: criteria,
                    onCompleted: (opRslt) => {
                        try {
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            let that: this = this;
                            let jobs: ibas.ArrayList<TaskAction> = new ibas.ArrayList<TaskAction>();
                            for (let item of opRslt.resultObjects) {
                                if (item.integrationJobActions.length === 0) {
                                    continue;
                                }
                                let task: TaskAction = new TaskAction(item);
                                task.setLogger({
                                    level: ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE) === true ? ibas.emMessageLevel.DEBUG : ibas.emMessageLevel.INFO,
                                    log(): void {
                                        let tmpArgs: Array<any> = new Array();
                                        for (let item of arguments) {
                                            tmpArgs.push(item);
                                        }
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
                                        try {
                                            that.view.showLogs(bo.DataConverter.toMessageType(level), ibas.strings.format(tmpArgs[0], tmpArgs.slice(1)));
                                        } catch (error) {
                                            // 写日志出错
                                            that.proceeding(error);
                                        }
                                    }
                                });
                                task.activated = true;
                                jobs.add(task);
                            }
                            this.jobs = jobs;
                            this.view.showJobs(this.jobs);
                        } catch (error) {
                            this.messages(error);
                        }
                    }
                });
            }
            /** 工具条显示后 */
            public run(): void {
                super.run();
            }
            private jobs: ibas.ArrayList<TaskAction>;
            private reset(): void {
                if (jobHandler > 0) {
                    clearInterval(jobHandler);
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("integration_scheduler_job_list_stoped", jobHandler >= 0 ? jobHandler : -1));
                    jobHandler = undefined;
                }
                this.viewShowed();
            }
            private suspend(suspend: boolean): void {
                if (suspend === false) {
                    if (!(jobHandler > 0)) {
                        jobHandler = setInterval(() => {
                            for (let item of this.jobs) {
                                item.do();
                            }
                            this.view.showStatus(undefined);
                        }, 10000);
                        this.proceeding(ibas.emMessageType.SUCCESS, ibas.i18n.prop("integration_scheduler_job_list_started", jobHandler >= 0 ? jobHandler : -1));
                    } else if (jobHandler > 0) {
                        this.busy(true);
                        throw new Error(ibas.i18n.prop("integration_scheduler_job_list_in_running", jobHandler >= 0 ? jobHandler : -1));
                    }
                } else {
                    if (jobHandler > 0) {
                        clearInterval(jobHandler);
                        this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("integration_scheduler_job_list_stoped", jobHandler >= 0 ? jobHandler : -1));
                        jobHandler = undefined;
                    }
                }
            }
            public close(): void {
                if (jobHandler > 0) {
                    clearInterval(jobHandler);
                    this.proceeding(ibas.emMessageType.WARNING, ibas.i18n.prop("integration_scheduler_job_list_stoped", jobHandler >= 0 ? jobHandler : -1));
                    jobHandler = undefined;
                }
                super.close();
            }
        }
        /** 视图-集成任务调度者 */
        export interface IIntegrationJobSchedulerView extends ibas.IView {
            /** 显示任务 */
            showJobs(datas: TaskAction[]): void;
            /** 暂停运行事件 */
            suspendEvent: Function;
            /** 重置事件 */
            resetEvent: Function;
            /** 显示日志 */
            showLogs(type: ibas.emMessageType, content: string): void;
            /** 显示状态 */
            showStatus(content: string): void;
        }
        /** 任务动作 */
        export class TaskAction extends ibas.Action {
            constructor(job: bo.IntegrationJob = undefined) {
                super();
                if (!ibas.objects.isNull(job)) {
                    this.job = job;
                    this.id = ibas.strings.valueOf(this.job.objectKey);
                    this.name = ibas.strings.format("{0} - {1}", this.job.objectKey, this.job.name);
                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                    for (let index: number = 0; index < this.job.integrationJobActions.length; index++) {
                        let item: bo.IntegrationJobAction = this.job.integrationJobActions[index];
                        if (builder.length > 0) {
                            builder.append("; ");
                        }
                        builder.append(String.fromCharCode(index + 97));
                        builder.append(".");
                        if (!ibas.strings.isEmpty(item.actionRemark)) {
                            builder.append(item.actionRemark);
                        } else {
                            builder.append(item.actionName);
                        }
                    }
                    this.description = builder.toString();
                }
            }
            /** 描述 */
            description: string;
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
                // 时间点判断
                if (this.job.atTime > 0) {
                    let atTime: number = ibas.dates.today().getTime() + ((this.job.atTime - this.job.atTime % 100) / 100 * 60 + this.job.atTime % 100) * 60 * 1000;
                    if (ibas.dates.now().getTime() < atTime) {
                        // 当前时间未到时间点
                        return;
                    }
                    // 上次运行时间
                    let lastTime: number;
                    if (this.lastRunTime > 0) {
                        lastTime = this.lastRunTime;
                    } else {
                        // 未运行过，则未上次计划时间
                        lastTime = ibas.dates.subtract(ibas.dates.emDifferenceType.DAY, new Date(atTime), 1).getTime();
                    }
                    // 与上次时间差需要超过12小时
                    if (ibas.dates.difference(ibas.dates.emDifferenceType.HOUR, ibas.dates.now(), new Date(lastTime)) < 12) {
                        return;
                    }
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
                                this.done();
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
                                            that.done();
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
                                that.done();
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
                ibas.queues.execute(this.actions, (action, next) => {
                    action.onDone = function (): void {
                        next();
                    };
                    action.do();
                }, (error) => {
                    if (error instanceof Error) {
                        this.log(ibas.emMessageLevel.ERROR, error.message);
                    }
                    this.done();
                });
                return false;
            }
            /** 子任务 */
            private actions: ibas.IList<ibas.Action>;
        }
    }
}