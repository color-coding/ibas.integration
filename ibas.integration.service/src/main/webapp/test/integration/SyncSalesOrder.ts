/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import { InclusionExclusionCode, IntervalBoundaryTypeCode, ActionCode } from "./byd/BORepository";
import { BORepositoryQuerySalesOrderIn3 } from "./byd/BORepositoryQuerySalesOrderIn";
import { BORepositoryManageSalesOrderIn5 } from "./byd/BORepositoryManageSalesOrderIn";
/** 配置项-BYD服务地址 */
const CONFIG_REPOSITORY_URL: string = "REPOSITORY_URL";
/** 配置项-BYD用户 */
const CONFIG_REPOSITORY_USER: string = "REPOSITORY_USER";
/** 配置项-BYD密码 */
const CONFIG_REPOSITORY_PASSWORD: string = "REPOSITORY_PASSWORD";
/** 配置项-检索数据量（避免太多数据拖死服务） */
const CONFIG_FETCH_DATA_COUNT: string = "FETCH_DATA_COUNT";
/** 数据交互 */
export default class SyncSalesOrder extends integration.action.IntegrationAction {
    /**
     * 运行，异步完成时需调用done()
     * @returns true, 操作完成；false， 异步操作
     */
    protected execute(goOn: boolean = false): boolean {
        this.testFetch();
        return false;
    }

    private testFetch(): void {
        let boRepository: BORepositoryQuerySalesOrderIn3 = new BORepositoryQuerySalesOrderIn3();
        boRepository.address = this.getConfig(CONFIG_REPOSITORY_URL);
        boRepository.user = this.getConfig(CONFIG_REPOSITORY_USER);
        boRepository.password = this.getConfig(CONFIG_REPOSITORY_PASSWORD);
        boRepository.fetchSalesOrder({
            criteria: {
                SelectionByID: [
                    {
                        InclusionExclusionCode: InclusionExclusionCode.INCLUDING,
                        IntervalBoundaryTypeCode: IntervalBoundaryTypeCode.EQUAL,
                        LowerBoundaryID: "2608",
                        UpperBoundaryID: undefined
                    }
                ]
            },
            onCompleted: (opRslt) => {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    this.log(ibas.emMessageLevel.INFO, "got data {0}.", opRslt.resultObjects.length);
                    this.testSave(opRslt.resultObjects.firstOrDefault());
                } catch (error) {
                    this.log(error);
                }
            }
        });

    }
    private testSave(order: sap.byd.querysalesorderin.SalesOrderByElementsResponse): void {
        let boRepository: BORepositoryManageSalesOrderIn5 = new BORepositoryManageSalesOrderIn5();
        boRepository.address = this.getConfig(CONFIG_REPOSITORY_URL);
        boRepository.user = this.getConfig(CONFIG_REPOSITORY_USER);
        boRepository.password = this.getConfig(CONFIG_REPOSITORY_PASSWORD);
        boRepository.saveSalesOrder({
            beSaved: {
                $actionCode: ActionCode.CREATE,
                BuyerID: order.BuyerID,
                Name: order.Name,
                SellerParty: order.SellerParty,
                SalesUnitParty: order.SellerParty,
                Item: [
                    {
                        ItemProduct: {
                            ProductID: order.Item[0].ItemProduct.ProductID,
                        },
                    }
                ],
                PaymentControl: {
                    PaymentAmount: {
                        Content: 1000,
                        $currencyCode: "CNY"
                    }
                }
            },
            onCompleted: (opRslt) => {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    this.log(ibas.emMessageLevel.INFO, "got data {0}.", opRslt.resultObjects.length);
                } catch (error) {
                    this.log(error);
                }
            }
        });
    }
}
