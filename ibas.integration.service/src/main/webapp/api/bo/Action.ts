/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace bo {
        /** 集成-动作 */
        export interface IAction {
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
        }

        /** 集成-动作 */
        export interface IActionConfig {
            /** 键 */
            key: string;
            /** 值 */
            value: any;
            /** 说明 */
            remark: string;
        }
        /** 集成-动作 */
        export interface IActionPackage {
            /** 标识 */
            id: string;
            /** 时间 */
            dateTime: Date;
            /** 动作 */
            actions: IAction[];
        }
    }
}