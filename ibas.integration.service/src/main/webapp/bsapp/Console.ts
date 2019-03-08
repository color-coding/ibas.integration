/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../borep/index.ts" />
/// <reference path="./development/index.ts" />
/// <reference path="./integration/index.ts" />
/// <reference path="./integrationjob/index.ts" />
namespace integration {
    export namespace app {
        /** 属性-导航 */
        const PROPERTY_NAVIGATION: symbol = Symbol("navigation");
        /** 模块控制台 */
        export class Console extends ibas.ModuleConsole {
            /** 构造函数 */
            constructor() {
                super();
                this.id = CONSOLE_ID;
                this.name = CONSOLE_NAME;
                this.version = CONSOLE_VERSION;
                this.copyright = ibas.i18n.prop("shell_license");
            }
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation {
                return this[PROPERTY_NAVIGATION];
            }
            /** 初始化 */
            protected registers(): void {
                // 注册功能
                this.register(new IntegrationJobFunc());
                if (ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_SUPER) === true) {
                    // 仅管理员加载
                    this.register(new IntegrationActionFunc());
                }
                // 注册服务应用
                this.register(new IntegrationJobChooseServiceMapping());
                this.register(new IntegrationActionChooseServiceMapping());
                this.register(new IntegrationJobAppMapping());
                this.register(new IntegrationJobServiceMapping());
                // 注册常驻应用
                this.register(new IntegrationJobSchedulerApp());
            }
            /** 运行 */
            run(): void {
                // 加载语言-框架默认
                ibas.i18n.load(this.rootUrl + "resources/languages/integration.json");
                ibas.i18n.load(this.rootUrl + "resources/languages/bos.json");
                // 设置资源属性
                this.description = ibas.i18n.prop(this.name.toLowerCase());
                this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
                // 先加载ui导航
                let uiModules: string[] = [];
                if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)) {
                    if (this.plantform === ibas.emPlantform.PHONE) {
                        // 使用m类型视图
                        uiModules.push("index.ui.m");
                    }
                }
                // 默认使用视图
                if (uiModules.length === 0) {
                    // 使用c类型视图
                    uiModules.push("index.ui.c");
                }
                // 加载视图库
                this.loadUI(uiModules, (ui) => {
                    // 设置导航
                    this[PROPERTY_NAVIGATION] = new ui.Navigation();
                    // 调用初始化
                    this.initialize();
                });
                // 保留基类方法
                super.run();
            }
        }
        /** 模块控制台 */
        export class ConsolePhone extends Console {
            /** 初始化 */
            protected registers(): void {

            }
        }

        const CONSOLE_ID_DEV: string = "689bc97c-c7a8-4e7f-a5e4-b2003da0ffa0";
        const CONSOLE_NAME_DEV: string = "IntegrationDevelopment";
        const CONSOLE_VERSION_DEV: string = "0.1.0";
        /** 模块控制台 */
        export class ConsoleDev extends ibas.ModuleConsole {
            /** 构造函数 */
            constructor() {
                super();
                this.id = CONSOLE_ID_DEV;
                this.name = CONSOLE_NAME_DEV;
                this.version = CONSOLE_VERSION_DEV;
                this.copyright = ibas.i18n.prop("shell_license");
            }
            /** 创建视图导航 */
            navigation(): ibas.IViewNavigation {
                return this[PROPERTY_NAVIGATION];
            }
            /** 初始化 */
            protected registers(): void {
                // 注册功能
                if (ibas.config.get(ibas.CONFIG_ITEM_DEBUG_MODE) === true) {
                    // 仅Debug模式加载
                    this.register(new DevelopmentTerminalFunc());
                }
                // 注册服务应用
                // 注册常驻应用
            }
            /** 运行 */
            run(): void {
                // 加载语言-框架默认
                ibas.i18n.load(this.rootUrl + "resources/languages/integration.json");
                ibas.i18n.load(this.rootUrl + "resources/languages/bos.json");
                // 设置资源属性
                this.description = ibas.i18n.prop(this.name.toLowerCase());
                this.icon = ibas.i18n.prop(this.name.toLowerCase() + "_icon");
                // 先加载ui导航
                let uiModules: string[] = [];
                if (!ibas.config.get(ibas.CONFIG_ITEM_DISABLE_PLATFORM_VIEW, false)) {
                    if (this.plantform === ibas.emPlantform.PHONE) {
                        // 使用m类型视图
                        uiModules.push("index.ui.m");
                    }
                }
                // 默认使用视图
                if (uiModules.length === 0) {
                    // 使用c类型视图
                    uiModules.push("index.ui.c");
                }
                // 加载视图库
                this.loadUI(uiModules, (ui) => {
                    // 设置导航
                    this[PROPERTY_NAVIGATION] = new ui.Navigation();
                    // 调用初始化
                    this.initialize();
                });
                // 保留基类方法
                super.run();
            }
        }
    }
}