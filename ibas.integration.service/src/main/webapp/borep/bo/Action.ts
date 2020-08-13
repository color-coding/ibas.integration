/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace bo {

        /** 集成动作 */
        export class Action implements IAction {
            constructor() {
                this.configs = new ibas.ArrayList();
            }
            /** 标识 */
            id: string;
            /** 包组 */
            group: string;
            /** 名称 */
            name: string;
            /** 路径 */
            path: string;
            /** 说明 */
            remark: string;
            /** 激活的 */
            activated: boolean;
            /** 配置 */
            configs: ibas.IList<IActionConfig>;
            /** 依赖库 */
            dependencies: string[];
            /** 完整路径 */
            fullPath(): string {
                if (ibas.strings.isEmpty(this.path)) {
                    throw new Error(ibas.i18n.prop("sys_invalid_parameter", "path"));
                }
                let path: ibas.StringBuilder = new ibas.StringBuilder();
                if (!ibas.strings.isEmpty(this.group)) {
                    path.append(this.group);
                    path.append("/");
                }
                if (this.path.indexOf(".") > 0) {
                    path.append(this.path.substring(0, this.path.indexOf(".")));
                    path.append(".js");
                } else {
                    path.append(this.path);
                }
                return path.toString();
            }
        }

        /** 集成-动作 */
        export class ActionConfig implements IActionConfig {
            /** 键 */
            key: string;
            /** 值 */
            value: any;
            /** 说明 */
            remark: string;
        }
        /** 集成-动作 */
        export class ActionPackage implements IActionPackage {
            constructor() {
                this.actions = new ibas.ArrayList<Action>();
            }
            /** 标识 */
            id: string;
            /** 时间 */
            dateTime: Date;
            /** 动作 */
            actions: Action[];
        }
    }
}