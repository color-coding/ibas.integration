/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace app {

        export class IntegrationActionFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "98c8cb6a-bceb-44bd-ab8c-9002216dac3b";
            /** 功能名称 */
            static FUNCTION_NAME = "integration_func_action";
            /** 构造函数 */
            constructor() {
                super();
                this.id = IntegrationActionFunc.FUNCTION_ID;
                this.name = IntegrationActionFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: IntegrationActionListApp = new IntegrationActionListApp();
                app.navigation = this.navigation;
                return app;
            }
        }

        export class IntegrationSchedulerFunc extends ibas.ModuleFunction {

            /** 功能标识 */
            static FUNCTION_ID = "d624c421-a9d8-42df-97fb-02f65de5995c";
            /** 功能名称 */
            static FUNCTION_NAME = "integration_func_integrationjob_scheduler";
            /** 构造函数 */
            constructor() {
                super();
                this.id = IntegrationSchedulerFunc.FUNCTION_ID;
                this.name = IntegrationSchedulerFunc.FUNCTION_NAME;
                this.description = ibas.i18n.prop(this.name);
            }
            /** 默认功能 */
            default(): ibas.IApplication<ibas.IView> {
                let app: IntegrationJobSchedulerApp = new IntegrationJobSchedulerApp();
                app.navigation = this.navigation;
                return app;
            }
        }
    }
}