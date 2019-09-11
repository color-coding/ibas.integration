/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./types/ManageSalesOrderIn.d.ts" />
import * as common from "./BORepository";
/**
 * 服务实现
 */
class BORepositoryManageSalesOrderIn extends common.BORepositoryByDesign {
    saveSalesOrder(saver: common.ISaveCaller<
        sap.byd.managesalesorderin.SalesOrderMaintainRequest,
        sap.byd.managesalesorderin.SalesOrderMaintainRequest>): void {
        this.save<sap.byd.managesalesorderin.SalesOrderBundleMaintainRequest_sync, sap.byd.managesalesorderin.SalesOrderBundleMaintainConfirmation_sync>(
            "MaintainBundle",
            "SalesOrderBundleMaintainRequest_sync",
            {
                beSaved: {
                    BasicMessageHeader: {},
                    SalesOrder: [
                        saver.beSaved,
                    ]
                },
                onCompleted: (opRslt) => {
                    if (opRslt.resultCode === 0) {
                        let responses: ibas.IList<any> = new ibas.ArrayList<any>();
                        for (let item of opRslt.resultObjects) {
                            responses.add(item.SalesOrder);
                        }
                        opRslt.resultObjects = responses;
                    }
                    if (saver.caller) {
                        saver.onCompleted.call(saver.caller, opRslt);
                    } else {
                        saver.onCompleted.call(saver.onCompleted, opRslt);
                    }
                }
            },
            "SalesOrderBundleMaintainConfirmation_sync"
        );
    }
}
/**
 * 服务的后缀名与wsdl文件一致
 */
export class BORepositoryManageSalesOrderIn5 extends BORepositoryManageSalesOrderIn {

}