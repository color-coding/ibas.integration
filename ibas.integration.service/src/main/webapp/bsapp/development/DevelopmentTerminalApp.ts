/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace app {

        /** 开发终端 */
        export class DevelopmentTerminalApp extends ibas.Application<IDevelopmentTerminalView> {

            /** 应用标识 */
            static APPLICATION_ID: string = "7300b8ed-4804-4d47-aa58-692dd6e6e62c";
            /** 应用名称 */
            static APPLICATION_NAME: string = "integrationdevelopment_app_development_terminal";
            /** 构造函数 */
            constructor() {
                super();
                this.id = DevelopmentTerminalApp.APPLICATION_ID;
                this.name = DevelopmentTerminalApp.APPLICATION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 注册视图 */
            protected registerView(): void {
                super.registerView();
                // 其他事件
                this.view.runActionEvent = this.runAction;
                this.view.loadActionsEvent = this.loadActions;
                this.view.useActionEvent = this.useAction;
            }
            /** 视图显示后 */
            protected viewShowed(): void {
                // 视图加载完成
            }
            protected loadActions(url: string): void {
                if (ibas.strings.isEmpty(url)) {
                    this.messages({
                        type: ibas.emMessageType.WARNING,
                        title: this.description,
                        message: ibas.i18n.prop("integrationdevelopment_please_actions_url")
                    });
                    return;
                }
                url = ibas.urls.normalize(url);
                let that: this = this;
                let boRepository: bo.BORepositoryIntegrationDevelopment = new bo.BORepositoryIntegrationDevelopment();
                boRepository.loadActions({
                    url: ibas.strings.format("{0}{1}_={2}", url, url.indexOf("?") > 0 ? "&" : "?", ibas.dates.now().getTime()),
                    onCompleted(opRslt: ibas.IOperationResult<bo.Action>): void {
                        try {
                            that.busy(false);
                            if (opRslt.resultCode !== 0) {
                                throw new Error(opRslt.message);
                            }
                            // 补充地址
                            let rootUrl: string = url.substring(0, url.lastIndexOf("/"));
                            if (!rootUrl.endsWith("/")) {
                                rootUrl += "/";
                            }
                            for (let item of opRslt.resultObjects) {
                                item.group = rootUrl;
                            }
                            that.view.showActions(opRslt.resultObjects);
                        } catch (error) {
                            that.messages(error);
                        }
                    }
                });
            }
            private usingAction: bo.Action;
            protected useAction(data: bo.Action): void {
                if (ibas.objects.isNull(data) && ibas.objects.isNull(this.usingAction)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_Action")
                    ));
                    return;
                }
                this.usingAction = ibas.objects.isNull(data) ? this.usingAction : data;
                this.view.showAction(this.usingAction);
                this.view.showActionConfigs(this.usingAction.configs);
            }
            protected runAction(autoRun: boolean): void {
                if (ibas.objects.isNull(this.usingAction)) {
                    this.messages(ibas.emMessageType.WARNING, ibas.i18n.prop("shell_please_chooose_data",
                        ibas.i18n.prop("bo_Action")
                    ));
                    return;
                }
                let actionRunner: IntegrationActionRunnerApp = new IntegrationActionRunnerApp();
                actionRunner.navigation = this.navigation;
                actionRunner.viewShower = this.viewShower;
                actionRunner.autoRun = autoRun === true ? true : false;
                actionRunner.run(this.usingAction);
            }
        }
        /** 视图-开发终端 */
        export interface IDevelopmentTerminalView extends ibas.IView {
            /** 加载动作，参数1：地址 */
            loadActionsEvent: Function;
            /** 显示动作 */
            showActions(datas: bo.Action[]): void;
            /** 使用动作 */
            useActionEvent: Function;
            /** 显示动作 */
            showAction(data: bo.Action): void;
            /** 显示动作配置 */
            showActionConfigs(datas: bo.ActionConfig[]): void;
            /** 运行动作 */
            runActionEvent: Function;
        }
    }
}