/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace bo {
        /** 业务仓库 */
        export interface IBORepositoryIntegration extends ibas.IBORepositoryApplication {
            /**
             * 上传文件
             * @param caller 调用者
             */
            upload(caller: ibas.IUploadFileCaller<ibas.FileItem>): void;
            /**
             * 下载文件
             * @param caller 调用者
             */
            download(caller: ibas.IDownloadFileCaller<Blob>): void;
            /**
             * 查询 集成任务
             * @param fetcher 查询者
             */
            fetchIntegrationJob(fetcher: ibas.IFetchCaller<bo.IIntegrationJob>): void;
            /**
             * 保存 集成任务
             * @param saver 保存者
             */
            saveIntegrationJob(saver: ibas.ISaveCaller<bo.IIntegrationJob>): void;
            /**
             * 查询 集成动作
             * @param fetcher 查询者
             */
            fetchAction(fetcher: IActionFetcher): void;
            /**
             * 获取动作地址
             */
            toPackageUrl(action: bo.IAction): string;
            /**
             * 调用后台动作
             * @param caller 调用者
             */
            goAction(caller: IActionGoer): void;
        }
        /**
         * 集成动作查询者
         */
        export interface IActionFetcher extends ibas.IMethodCaller<bo.IAction> {
            /** 查询条件 */
            criteria: ibas.ICriteria | ibas.ICondition[] | bo.IIntegrationJob | bo.IIntegrationJobAction | bo.IIntegrationJobAction[];
        }
        /** 后台动作调用者 */
        export interface IActionGoer extends ibas.IMethodCaller<any> {
            /** 组 */
            group: string;
            /** 名称 */
            name: string;
            /** 参数 */
            parameters: ibas.KeyValue[];
        }
    }
}