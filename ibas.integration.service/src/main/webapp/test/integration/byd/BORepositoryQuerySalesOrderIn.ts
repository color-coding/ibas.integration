/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./types/QuerySalesOrderIn.d.ts" />
import * as common from "./BORepository";
/**
 * 服务实现
 */
class BORepositoryQuerySalesOrderIn extends common.BORepositoryByDesign {

    fetchSalesOrder(fetcher: common.IFetchCaller<
        sap.byd.querysalesorderin.SalesOrderByElementsQuerySelectionByElements,
        sap.byd.querysalesorderin.SalesOrderByElementsResponse>): void {
        this.fetch<sap.byd.querysalesorderin.SalesOrderByElementsQuery_sync, sap.byd.querysalesorderin.SalesOrderByElementsResponse_sync>(
            "FindByElementsRequest",
            "SalesOrderByElementsQuery_sync",
            {
                criteria: {
                    SalesOrderSelectionByElements: fetcher.criteria,
                },
                onCompleted: (opRslt) => {
                    if (opRslt.resultCode === 0) {
                        let responses: ibas.IList<any> = new ibas.ArrayList<any>();
                        for (let item of opRslt.resultObjects) {
                            responses.add(item.SalesOrder);
                        }
                        opRslt.resultObjects = responses;
                    }
                    if (fetcher.caller) {
                        fetcher.onCompleted.call(fetcher.caller, opRslt);
                    } else {
                        fetcher.onCompleted.call(fetcher.onCompleted, opRslt);
                    }
                },
            },
            "SalesOrderByElementsResponse_sync"
        );
    }
}
/**
 * 服务的后缀名与wsdl文件一致
 */
export class BORepositoryQuerySalesOrderIn3 extends BORepositoryQuerySalesOrderIn {

}