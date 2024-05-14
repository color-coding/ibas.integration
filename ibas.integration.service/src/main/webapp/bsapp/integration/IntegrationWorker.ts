/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace app {
        namespace factories {
            export function create(action: bo.IAction, fnBack: (action: ibas.Action | Error) => void): void {
                try {
                    let libraries: ibas.IList<string> = new ibas.ArrayList<string>();
                    if (action.dependencies instanceof Array) {
                        for (let item of action.dependencies) {
                            if (ibas.strings.isEmpty(item)) {
                                continue;
                            }
                            libraries.add(item);
                        }
                    }
                    libraries.add(action.path.replace(".ts", ""));
                    // 开始加载
                    // 兼容性处理
                    if (libraries.contain("./3rdparty/jquerysoap/index") === true) {
                        if (libraries.contain("./3rdparty/jquery/index") === false) {
                            libraries.insert(0, "./3rdparty/jquery/index");
                        }
                    }
                    if (globalThis.jQuery === undefined && globalThis.hasOwnProperty("jQuery") !== true) {
                        Object.defineProperty(globalThis, "jQuery", {
                            get: function (): any {
                                return globalThis.window.jQuery;
                            },
                            set: function (value: any): void {
                                globalThis.window.jQuery = value;
                            }
                        });
                    }
                    if (globalThis.$ === undefined && globalThis.hasOwnProperty("$") !== true) {
                        Object.defineProperty(globalThis, "$", {
                            get: function (): any {
                                return globalThis.window.$;
                            },
                            set: function (value: any): void {
                                globalThis.window.$ = value;
                            }
                        });
                    }
                    let token: string = ibas.config.get(ibas.CONFIG_ITEM_USER_TOKEN, "");
                    let rtVersion: string = undefined;
                    if (!ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE, false)) {
                        rtVersion = ibas.config.get(ibas.CONFIG_ITEM_RUNTIME_VERSION);
                    }
                    requirejs.config({
                        baseUrl: action.group,
                        waitSeconds: ibas.config.get(ibas.requires.CONFIG_ITEM_WAIT_SECONDS, 30),
                        urlArgs: function (id: string, url: string): string {
                            if (id.indexOf("ibas/") >= 0 || id.startsWith("_@") || id === "require" || id === "exports") {
                                return "";
                            }
                            // 允许多次调用
                            return (url.indexOf("?") === -1 ? "?" : "&") + "token=" + ibas.tokens.content(token)
                                + (rtVersion ? ("&_=" + rtVersion) : "");
                        }
                    })(libraries, function (): void {
                        try {
                            if (arguments.length === 0) {
                                throw new Error("invalid action library.");
                            }
                            let library: any = arguments[arguments.length - 1];
                            if (ibas.objects.isNull(library)) {
                                throw new Error("invalid action library.");
                            }
                            if (ibas.objects.isNull(library.default)) {
                                throw new Error("invalid action class.");
                            }
                            if (!ibas.objects.isAssignableFrom(library.default, ibas.Action)) {
                                throw new Error("invalid action class.");
                            }
                            let instance: any = new library.default;
                            if (fnBack instanceof Function) {
                                fnBack(instance);
                            }
                        } catch (error) {
                            if (fnBack instanceof Function) {
                                fnBack(error);
                            }
                        }
                    }, (error) => {
                        if (fnBack instanceof Function) {
                            fnBack(error.originalError ? error.originalError : error);
                        }
                    });
                } catch (error) {
                    ibas.logger.log(ibas.emMessageLevel.ERROR, (<Error>error).stack);
                    if (fnBack instanceof Function) {
                        fnBack(error);
                    }
                }

            }
        }
        class Logger implements ibas.ILogger {
            constructor(worker: ibas.Worker) {
                this.worker = worker;
            }
            worker: ibas.Worker;
            level: ibas.emMessageLevel;
            log(message: ibas.IMessage): void;
            log(error: Error): void;
            log(level: ibas.emMessageLevel, message: string, ...pars: any[]): void;
            log(message: string, ...pars: any[]): void;
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
                this.worker.onMessage({ type: bo.DataConverter.toMessageType(level), message: ibas.strings.format(tmpArgs[0], tmpArgs.slice(1)) });
            }
        }
        let OPENUI5_LIBRARY: string = undefined;
        export class IntegrationWorker extends ibas.Worker {
            protected getActions(): ibas.IList<bo.IAction> {
                return ibas.arrays.create(this.getSetting("actions"));
            }
            protected filterScripts(src: string): boolean {
                let filter: boolean = super.filterScripts(src);
                if (filter === false && !ibas.strings.isEmpty(src)) {
                    if (ibas.strings.isWith(src, undefined, "sap-ui-core.js")) {
                        OPENUI5_LIBRARY = src.substring(0, src.lastIndexOf("sap-ui-core.js"));
                    }
                    if (!ibas.strings.isEmpty(OPENUI5_LIBRARY) && ibas.strings.isWith(src, OPENUI5_LIBRARY, undefined)) {
                        return true;
                    }
                    if (src.indexOf("/echarts/") > 0) {
                        return true;
                    }
                    if (src.indexOf("/bootstrap/") > 0) {
                        return true;
                    }
                    if (src.indexOf("/jquery.") > 0) {
                        return true;
                    }
                    if (src.indexOf("/anytouch.") > 0) {
                        return true;
                    }
                    if (src.indexOf("/3rdparty/") > 0 && src.indexOf("/ibas/3rdparty/") < 0) {
                        return true;
                    }
                }
                return filter;
            }
            protected run(): void {
                ibas.queues.execute(this.getActions(),
                    (action, next) => {
                        factories.create(action, (task) => {
                            if (task instanceof Error) {
                                next(task);
                            } else {
                                ibas.logger.log(ibas.emMessageLevel.DEBUG, "{0}: instantiate {1}.", this.name, task.name);
                                task.addConfig(integration.action.CONFIG_ACTION_GROUP, action.group);
                                for (let item of action.configs) {
                                    task.addConfig(item.key, item.value);
                                }
                                task.setLogger(new Logger(this));
                                task.onDone = () => {
                                    next();
                                };
                                task.do();
                            }
                        });
                    },
                    (error) => {
                        if (error instanceof Error) {
                            // 完成并有错误
                            this.onMessage(ibas.strings.format("{0}: {1}", this.name, error.toString()));
                        }
                        // 完成
                        this.stop();
                    }
                );
            }
        }
        export class IntegrationScheduleWorker extends IntegrationWorker {
            constructor(name: string) {
                super();
                this.name = name;
            }
            protected getJobId(): number {
                return this.getSetting("jobId");
            }
            protected run(): boolean {
                if (this.getJobId() > 0) {
                    let criteria: ibas.ICriteria = new ibas.Criteria();
                    let condition: ibas.ICondition = criteria.conditions.create();
                    condition.alias = bo.IntegrationJob.PROPERTY_OBJECTKEY_NAME;
                    condition.value = this.getJobId().toString();
                    condition = criteria.conditions.create();
                    condition.alias = bo.IntegrationJob.PROPERTY_ACTIVATED_NAME;
                    condition.value = ibas.emYesNo.YES.toString();
                    let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                    boRepository.fetchIntegrationJob({
                        criteria: criteria,
                        onCompleted: (opRslt) => {
                            try {
                                if (opRslt.resultCode !== 0) {
                                    throw new Error(opRslt.message);
                                }
                                if (opRslt.resultObjects.length === 0) {
                                    this.onMessage(ibas.i18n.prop("integration_not_found_integrationjob", this.getJobId()));
                                }
                                let job: bo.IntegrationJob = opRslt.resultObjects.firstOrDefault();
                                boRepository.fetchAction({
                                    criteria: job,
                                    onCompleted: (opRslt) => {
                                        try {
                                            if (opRslt.resultCode !== 0) {
                                                throw new Error(opRslt.message);
                                            }
                                            if (opRslt.resultObjects.length === 0) {
                                                throw new Error(ibas.i18n.prop("integration_not_found_job_actions", job.name));
                                            }
                                            this.addSetting("actions", opRslt.resultObjects);
                                            super.run();
                                        } catch (error) {
                                            this.onMessage(error);
                                            this.stop();
                                        }
                                    }
                                });
                            } catch (error) {
                                this.onMessage(error);
                                this.stop();
                            }
                        }
                    });
                } else {
                    this.onMessage(ibas.i18n.prop("integration_not_found_integrationjob", "-1"));
                    this.stop();
                }
                return false;
            }

        }
    }
}