/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/** 配置项-选择的用户 */
const CONFIG_CHOOSED_USER: string = "CHS_USER";
/** 同步业务仓库 */
class BORepositoryInitialFantasyAsync extends initialfantasy.bo.BORepositoryInitialFantasy {

    /** 构造方法 */
    constructor(action?: integration.action.IntegrationAction, type?: integration.action.emSourceTarget) {
        super();
        // 改变仓库信息
        if (integration && integration.action) {
            integration.action.changeRepositoryInfo(this, action, type);
        }
    }

    /**
     * 查询 用户
     * @param criteria 查询条件
     */
    async fetchAddressAsync(criteria: ibas.Criteria): Promise<ibas.OperationResult<initialfantasy.bo.User>> {
        return new Promise<ibas.OperationResult<initialfantasy.bo.User>>(resolve => {
            try {
                this.fetchUser({
                    criteria: criteria,
                    onCompleted(opRslt: ibas.OperationResult<initialfantasy.bo.User>): void {
                        return resolve(opRslt);
                    }
                });
            } catch (error) {
                return resolve(new ibas.OperationResult<initialfantasy.bo.User>(error));
            }
        });
    }
}
/**
 * 集成测试
 */
export default class HelloWorld extends integration.action.IntegrationAction {

    protected run(): boolean {
        // 连接目标系统
        integration.action.connectRepository(this, (opRslt) => {
            if (opRslt.resultCode !== 0) {
                // 登录不成功，则终止任务
                this.log(ibas.emMessageLevel.ERROR, opRslt.message);
                this.done();
            } else {
                // 调用基类方法，并保持传参
                super.run.apply(this, arguments);
            }
        });
        return false;
    }

    /** 运行逻辑 */
    protected execute(): boolean {
        // 逻辑代码
        let users: string = this.getConfig(CONFIG_CHOOSED_USER);
        let criteria: ibas.Criteria = new ibas.Criteria();
        if (!ibas.strings.equalsIgnoreCase(users, ibas.config.applyVariables("#{${Company}_SYS_USER}.{Code}"))) {
            for (let item of users.split(ibas.DATA_SEPARATOR)) {
                item = ibas.strings.remove(item, " ");
                if (ibas.strings.isEmpty(item)) {
                    continue;
                }
                let condition: ibas.ICondition = criteria.conditions.create();
                condition.alias = "Code";
                condition.value = item;
                condition.relationship = ibas.emConditionRelationship.OR;
            }
        }
        let that: this = this;
        let boRepository: BORepositoryInitialFantasyAsync = new BORepositoryInitialFantasyAsync(this);
        boRepository.fetchUser({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<any>): void {
                for (let index: number = 0; index < opRslt.resultObjects.length; index++) {
                    let item: any = opRslt.resultObjects[index];
                    that.log(Math.round(Math.random() * 6), "user: {0}", item);
                }
                // 动作完成
                that.done();
            }
        });
        // 异步任务，未完成
        return false;
    }
}
