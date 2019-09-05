/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as di from "./b1/index";

/** 配置项-业务仓库地址 */
const CONFIG_REPOSITORY_URL: string = "REPOSITORY_URL";
/** 配置项-业务仓库口令 */
const CONFIG_REPOSITORY_TOKEN: string = "REPOSITORY_TOKEN";
/** 配置项-检索数据量（避免太多数据拖死服务） */
const CONFIG_FETCH_DATA_COUNT: string = "FETCH_DATA_COUNT";
/** 最后检索的数据 */
let LAST_FETCHED_DATA: sap.b1.IItems = null;
/** 数据交互 */
export default class SyncMaterials extends integration.action.IntegrationAction {
    /**
     * 运行，异步完成时需调用done()
     * @returns true, 操作完成；false， 异步操作
     */
    protected execute(goOn: boolean = false): boolean {
        let b1Repository: di.BORepositoryDataInteraction = new di.BORepositoryDataInteraction();
        b1Repository.address = this.getConfig(CONFIG_REPOSITORY_URL);
        b1Repository.token = this.getConfig(CONFIG_REPOSITORY_TOKEN);
        let criteria: ibas.ICriteria = new ibas.Criteria();
        criteria.result = this.getConfig(CONFIG_FETCH_DATA_COUNT, 30);
        if (!ibas.objects.isNull(LAST_FETCHED_DATA) && goOn === true) {
            let condition: ibas.ICondition = criteria.conditions.create();
            condition.alias = "ItemCode";
            condition.value = LAST_FETCHED_DATA.itemCode;
            condition.operation = ibas.emConditionOperation.GRATER_THAN;
        }
        let that: this = this;
        b1Repository.fetchItems({
            criteria: criteria,
            async onCompleted(opRsltB1: ibas.IOperationResult<sap.b1.IItems>): Promise<void> {
                try {
                    if (opRsltB1.resultCode !== 0) {
                        throw new Error(opRsltB1.message);
                    }
                    that.log(ibas.emMessageLevel.INFO, "begin to processing data, count {0}.", opRsltB1.resultObjects.length);
                    for (let item of opRsltB1.resultObjects) {
                        await that.processing(item);
                        LAST_FETCHED_DATA = item;
                    }
                    that.log(ibas.emMessageLevel.INFO, "data processing completed.", opRsltB1.resultObjects);
                    if (opRsltB1.resultObjects.length < criteria.result) {
                        // 查询出数据不够查询量，说明已处理完
                        that.done();
                    } else {
                        // 还有数据，继续循环
                        that.execute(true);
                    }
                } catch (error) {
                    that.log(error);
                }
            }
        });
        return false;
    }

    private async processing(data: sap.b1.IItems): Promise<boolean> {
        let criteria: ibas.ICriteria = new ibas.Criteria();
        criteria.result = 1;
        let condition: ibas.ICondition = criteria.conditions.create();
        condition.alias = "Code";
        condition.value = data.itemCode;
        let that: this = this;
        let boRepository: materials.bo.BORepositoryMaterials = new materials.bo.BORepositoryMaterials();
        let promise: Promise<boolean> = new Promise<boolean>(resolve => {
            boRepository.fetchMaterial({
                criteria: criteria,
                onCompleted(opRsltMM: ibas.IOperationResult<materials.bo.Material>): void {
                    try {
                        if (opRsltMM.resultCode !== 0) {
                            throw new Error(opRsltMM.message);
                        }
                        let material: materials.bo.Material = opRsltMM.resultObjects.firstOrDefault();
                        if (ibas.objects.isNull(material)) {
                            material = new materials.bo.Material();
                            material.code = data.itemCode;
                        }
                        material.name = data.itemName;
                        material.batchManagement = data.manageBatchNumbers === di.sap.b1.BoYesNoEnum.tYES ? ibas.emYesNo.YES : ibas.emYesNo.NO;
                        material.serialManagement = data.manageSerialNumbers === di.sap.b1.BoYesNoEnum.tYES ? ibas.emYesNo.YES : ibas.emYesNo.NO;
                        if (material.isDirty) {
                            boRepository.saveMaterial({
                                beSaved: material,
                                onCompleted(opRsltMM: ibas.IOperationResult<materials.bo.Material>): void {
                                    try {
                                        if (opRsltMM.resultCode !== 0) {
                                            throw new Error(opRsltMM.message);
                                        }
                                        return resolve(true);
                                    } catch (error) {
                                        that.log(error);
                                        return resolve(false);
                                    }
                                }
                            });
                            that.log(ibas.emMessageLevel.INFO, "update [{0} - {1}].", material.code, material.name);
                        } else {
                            that.log(ibas.emMessageLevel.WARN, "skip [{0} - {1}].", material.code, material.name);
                            return resolve(false);
                        }
                    } catch (error) {
                        that.log(error);
                        return resolve(false);
                    }
                }
            });
        });
        return promise;
    }
}
