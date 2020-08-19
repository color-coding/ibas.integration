/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./IntegrationActionChooseView.ts" />
/// <reference path="./IntegrationActionListView.ts" />
/// <reference path="./IntegrationActionRunnerView.ts" />
/// <reference path="./IntegrationJobSchedulerView.ts" />

namespace integration {
    export namespace ui {
        export namespace storages {
            const LOG_DATA_KEY_ITEM: string = "IG_LOG_NEXT";
            const LOG_DATA_KEY_TEMPLATE: string = "IG_LOG";
            function groupOf(content: string, sign: string): string {
                if (!ibas.strings.isEmpty(sign)) {
                    return ibas.strings.format("{0}_{1}", content, sign);
                }
                return content;
            }
            function keyOf(template: string, key: number): string {
                return groupOf(template, ibas.strings.fill(key, 8, "0"));
            }
            /**
             * 获取下个日志编号
             * @param storage 存储
             * @param update 是否更新编号记录
             * @param sign 类型标记
             */
            export function nextKey(storage: Storage, update: boolean, sign: string = undefined): string {
                let type: string = groupOf(LOG_DATA_KEY_ITEM, sign);
                let tmplt: string = groupOf(LOG_DATA_KEY_TEMPLATE, sign);
                let key: number = ibas.numbers.valueOf(storage.getItem(type));
                if (key < 1) {
                    key = 1;
                }
                if (update === true) {
                    storage.setItem(type, String(key + 1));
                }
                return keyOf(tmplt, key);
            }
            /**
             * 创建日志文件
             * @param storage 存储
             * @param clear 是否清理本地存储
             */
            export function createFile(storage: Storage, clear: boolean, sign: string = undefined): File {
                let builder: string[] = [];
                let key: string = nextKey(storage, false, sign);
                if (!ibas.strings.isEmpty(key)) {
                    key = key.substring(key.lastIndexOf("_") + 1);
                }
                let length: number = ibas.numbers.valueOf(key);
                for (let index: number = 0; index < length; index++) {
                    key = keyOf(groupOf(LOG_DATA_KEY_TEMPLATE, sign), index);
                    let value: string = storage.getItem(key);
                    if (ibas.strings.isEmpty(value)) {
                        continue;
                    }
                    if (builder.length > 0) {
                        builder.push("\n");
                    }
                    builder.push(value);
                    if (clear === true) {
                        storage.removeItem(key);
                    }
                }
                return new File(builder, ibas.strings.format("ig_logs_{0}.txt", ibas.dates.toString(ibas.dates.now(), "yyyyMMdd_HHmmss")));
            }
            /**
             * 上传并清理本地存储
             * @param storage 存储
             * @param onCompleted 完成事件
             * @param sign 类型标记
             */
            export function uploadFile(storage: Storage, onCompleted: (result: ibas.FileData | Error) => void, sign: string = undefined): void {
                let formData: FormData = new FormData();
                formData.append("file", createFile(storage, true, sign));
                let boRepository: bo.BORepositoryIntegration = new bo.BORepositoryIntegration();
                boRepository.upload({
                    fileData: formData,
                    onCompleted: (opRslt) => {
                        if (opRslt.resultCode !== 0) {
                            if (onCompleted instanceof Function) {
                                onCompleted(new Error(opRslt.message));
                            }
                        } else {
                            if (onCompleted instanceof Function) {
                                onCompleted(opRslt.resultObjects.firstOrDefault());
                            }
                        }
                    }
                });
                storage.removeItem(groupOf(LOG_DATA_KEY_ITEM, sign));
            }
            export namespace local {
                export function log(content: string, sign: string = undefined): void {
                    localStorage.setItem(nextKey(localStorage, true, sign), content);
                }
                export function file(clear: boolean, sign: string = undefined): Blob {
                    return createFile(localStorage, clear, sign);
                }
                export function upload(onCompleted: (result: ibas.FileData | Error) => void, sign: string = undefined): void {
                    uploadFile(localStorage, onCompleted, sign);
                }
            }
            export namespace session {
                export function log(content: string, sign: string = undefined): void {
                    sessionStorage.setItem(nextKey(sessionStorage, true, sign), content);
                }
                export function file(clear: boolean, sign: string = undefined): Blob {
                    return createFile(sessionStorage, clear, sign);
                }
                export function upload(onCompleted: (result: ibas.FileData | Error) => void, sign: string = undefined): void {
                    uploadFile(sessionStorage, onCompleted, sign);
                }
            }
        }
    }
}