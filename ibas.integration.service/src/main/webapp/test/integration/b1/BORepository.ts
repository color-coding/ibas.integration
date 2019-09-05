/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/** 业务仓库 */
export class BORepositoryDataInteraction extends ibas.BORepositoryApplication {
    /** 创建此模块的后端与前端数据的转换者 */
    protected createConverter(): ibas.IDataConverter {
        return new DataConverter;
    }
    /**
     * 查询 Items
     * @param fetcher 查询者
     */
    fetchItems(fetcher: ibas.IFetchCaller<sap.b1.IItems>): void {
        super.fetch("Items", fetcher);
    }

}
/** 数据转换者 */
class DataConverter extends ibas.DataConverter4j {
    /** 解析数据 */
    parsing(data: any, sign: string): any {
        if (data.type === "DataWrapping") {
            return JSON.parse(data.Content);
        } else {
            return super.parsing(data, sign);
        }
    }
    /** 创建业务对象转换者 */
    protected createConverter(): ibas.BOConverter {
        return null;
    }
}
