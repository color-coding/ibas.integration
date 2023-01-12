/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace integration {
    export namespace bo {

        /** 集成任务 */
        export class IntegrationJob extends ibas.BOSimple<IntegrationJob> implements IIntegrationJob {

            /** 业务对象编码 */
            static BUSINESS_OBJECT_CODE: string = BO_CODE_INTEGRATIONJOB;
            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-名称 */
            static PROPERTY_NAME_NAME: string = "Name";
            /** 获取-名称 */
            get name(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_NAME_NAME);
            }
            /** 设置-名称 */
            set name(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_NAME_NAME, value);
            }

            /** 映射的属性名称-是否激活 */
            static PROPERTY_ACTIVATED_NAME: string = "Activated";
            /** 获取-是否激活 */
            get activated(): ibas.emYesNo {
                return this.getProperty<ibas.emYesNo>(IntegrationJob.PROPERTY_ACTIVATED_NAME);
            }
            /** 设置-是否激活 */
            set activated(value: ibas.emYesNo) {
                this.setProperty(IntegrationJob.PROPERTY_ACTIVATED_NAME, value);
            }

            /** 映射的属性名称-频率（秒） */
            static PROPERTY_FREQUENCY_NAME: string = "Frequency";
            /** 获取-频率（秒） */
            get frequency(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_FREQUENCY_NAME);
            }
            /** 设置-频率（秒） */
            set frequency(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_FREQUENCY_NAME, value);
            }

            /** 映射的属性名称-运行时间点 */
            static PROPERTY_ATTIME_NAME: string = "AtTime";
            /** 获取-运行时间点 */
            get atTime(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_ATTIME_NAME);
            }
            /** 设置-运行时间点 */
            set atTime(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_ATTIME_NAME, value);
            }

            /** 映射的属性名称-关联的业务对象 */
            static PROPERTY_BOCODE_NAME: string = "BOCode";
            /** 获取-关联的业务对象 */
            get boCode(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_BOCODE_NAME);
            }
            /** 设置-关联的业务对象 */
            set boCode(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_BOCODE_NAME, value);
            }

            /** 映射的属性名称-关联的应用 */
            static PROPERTY_APPLICATIONID_NAME: string = "ApplicationId";
            /** 获取-关联的应用 */
            get applicationId(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_APPLICATIONID_NAME);
            }
            /** 设置-关联的应用 */
            set applicationId(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_APPLICATIONID_NAME, value);
            }

            /** 映射的属性名称-备注 */
            static PROPERTY_REMARKS_NAME: string = "Remarks";
            /** 获取-备注 */
            get remarks(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_REMARKS_NAME);
            }
            /** 设置-备注 */
            set remarks(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_REMARKS_NAME, value);
            }

            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-服务系列 */
            static PROPERTY_SERIES_NAME: string = "Series";
            /** 获取-服务系列 */
            get series(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_SERIES_NAME);
            }
            /** 设置-服务系列 */
            set series(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_SERIES_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(IntegrationJob.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(IntegrationJob.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(IntegrationJob.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(IntegrationJob.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-数据所有者 */
            static PROPERTY_DATAOWNER_NAME: string = "DataOwner";
            /** 获取-数据所有者 */
            get dataOwner(): number {
                return this.getProperty<number>(IntegrationJob.PROPERTY_DATAOWNER_NAME);
            }
            /** 设置-数据所有者 */
            set dataOwner(value: number) {
                this.setProperty(IntegrationJob.PROPERTY_DATAOWNER_NAME, value);
            }

            /** 映射的属性名称-团队成员 */
            static PROPERTY_TEAMMEMBERS_NAME: string = "TeamMembers";
            /** 获取-团队成员 */
            get teamMembers(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_TEAMMEMBERS_NAME);
            }
            /** 设置-团队成员 */
            set teamMembers(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_TEAMMEMBERS_NAME, value);
            }

            /** 映射的属性名称-数据所属组织 */
            static PROPERTY_ORGANIZATION_NAME: string = "Organization";
            /** 获取-数据所属组织 */
            get organization(): string {
                return this.getProperty<string>(IntegrationJob.PROPERTY_ORGANIZATION_NAME);
            }
            /** 设置-数据所属组织 */
            set organization(value: string) {
                this.setProperty(IntegrationJob.PROPERTY_ORGANIZATION_NAME, value);
            }


            /** 映射的属性名称-集成任务-动作集合 */
            static PROPERTY_INTEGRATIONJOBACTIONS_NAME: string = "IntegrationJobActions";
            /** 获取-集成任务-动作集合 */
            get integrationJobActions(): IntegrationJobActions {
                return this.getProperty<IntegrationJobActions>(IntegrationJob.PROPERTY_INTEGRATIONJOBACTIONS_NAME);
            }
            /** 设置-集成任务-动作集合 */
            set integrationJobActions(value: IntegrationJobActions) {
                this.setProperty(IntegrationJob.PROPERTY_INTEGRATIONJOBACTIONS_NAME, value);
            }


            /** 初始化数据 */
            protected init(): void {
                this.integrationJobActions = new IntegrationJobActions(this);
                this.objectCode = ibas.config.applyVariables(IntegrationJob.BUSINESS_OBJECT_CODE);
                this.activated = ibas.emYesNo.YES;
                this.frequency = 0;
                this.atTime = -1;
            }
        }

        /** 集成任务-动作 集合 */
        export class IntegrationJobActions extends ibas.BusinessObjects<IntegrationJobAction, IntegrationJob> implements IIntegrationJobActions {

            /** 创建并添加子项 */
            create(): IntegrationJobAction {
                let item: IntegrationJobAction = new IntegrationJobAction();
                this.add(item);
                return item;
            }
        }

        /** 集成任务-动作 */
        export class IntegrationJobAction extends ibas.BOSimpleLine<IntegrationJobAction> implements IIntegrationJobAction {

            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(IntegrationJobAction.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(IntegrationJobAction.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-对象行号 */
            get lineId(): number {
                return this.getProperty<number>(IntegrationJobAction.PROPERTY_LINEID_NAME);
            }
            /** 设置-对象行号 */
            set lineId(value: number) {
                this.setProperty(IntegrationJobAction.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(IntegrationJobAction.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(IntegrationJobAction.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(IntegrationJobAction.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(IntegrationJobAction.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-显示顺序 */
            static PROPERTY_VISORDER_NAME: string = "VisOrder";
            /** 获取-显示顺序 */
            get visOrder(): number {
                return this.getProperty<number>(IntegrationJobAction.PROPERTY_VISORDER_NAME);
            }
            /** 设置-显示顺序 */
            set visOrder(value: number) {
                this.setProperty(IntegrationJobAction.PROPERTY_VISORDER_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(IntegrationJobAction.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(IntegrationJobAction.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(IntegrationJobAction.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(IntegrationJobAction.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(IntegrationJobAction.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(IntegrationJobAction.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(IntegrationJobAction.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(IntegrationJobAction.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(IntegrationJobAction.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(IntegrationJobAction.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(IntegrationJobAction.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(IntegrationJobAction.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(IntegrationJobAction.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(IntegrationJobAction.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(IntegrationJobAction.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(IntegrationJobAction.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(IntegrationJobAction.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(IntegrationJobAction.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-与上一个动作的关系 */
            static PROPERTY_RELATIONSHIP_NAME: string = "Relationship";
            /** 获取-与上一个动作的关系 */
            get relationship(): emActionRelationship {
                return this.getProperty<emActionRelationship>(IntegrationJobAction.PROPERTY_RELATIONSHIP_NAME);
            }
            /** 设置-与上一个动作的关系 */
            set relationship(value: emActionRelationship) {
                this.setProperty(IntegrationJobAction.PROPERTY_RELATIONSHIP_NAME, value);
            }

            /** 映射的属性名称-任务项组 */
            static PROPERTY_ACTIONGROUP_NAME: string = "ActionGroup";
            /** 获取-任务项组 */
            get actionGroup(): string {
                return this.getProperty<string>(IntegrationJobAction.PROPERTY_ACTIONGROUP_NAME);
            }
            /** 设置-任务项组 */
            set actionGroup(value: string) {
                this.setProperty(IntegrationJobAction.PROPERTY_ACTIONGROUP_NAME, value);
            }

            /** 映射的属性名称-任务项标识 */
            static PROPERTY_ACTIONID_NAME: string = "ActionId";
            /** 获取-任务项标识 */
            get actionId(): string {
                return this.getProperty<string>(IntegrationJobAction.PROPERTY_ACTIONID_NAME);
            }
            /** 设置-任务项标识 */
            set actionId(value: string) {
                this.setProperty(IntegrationJobAction.PROPERTY_ACTIONID_NAME, value);
            }

            /** 映射的属性名称-任务项名称 */
            static PROPERTY_ACTIONNAME_NAME: string = "ActionName";
            /** 获取-任务项名称 */
            get actionName(): string {
                return this.getProperty<string>(IntegrationJobAction.PROPERTY_ACTIONNAME_NAME);
            }
            /** 设置-任务项名称 */
            set actionName(value: string) {
                this.setProperty(IntegrationJobAction.PROPERTY_ACTIONNAME_NAME, value);
            }

            /** 映射的属性名称-任务项说明 */
            static PROPERTY_ACTIONREMARK_NAME: string = "ActionRemark";
            /** 获取-任务项说明 */
            get actionRemark(): string {
                return this.getProperty<string>(IntegrationJobAction.PROPERTY_ACTIONREMARK_NAME);
            }
            /** 设置-任务项说明 */
            set actionRemark(value: string) {
                this.setProperty(IntegrationJobAction.PROPERTY_ACTIONREMARK_NAME, value);
            }

            /** 映射的属性名称-集成任务-动作-配置集合 */
            static PROPERTY_INTEGRATIONJOBACTIONCFGS_NAME: string = "IntegrationJobActionCfgs";
            /** 获取-集成任务-动作-配置集合 */
            get integrationJobActionCfgs(): IntegrationJobActionCfgs {
                return this.getProperty<IntegrationJobActionCfgs>(IntegrationJobAction.PROPERTY_INTEGRATIONJOBACTIONCFGS_NAME);
            }
            /** 设置-集成任务-动作-配置集合 */
            set integrationJobActionCfgs(value: IntegrationJobActionCfgs) {
                this.setProperty(IntegrationJobAction.PROPERTY_INTEGRATIONJOBACTIONCFGS_NAME, value);
            }


            /** 初始化数据 */
            protected init(): void {
                this.integrationJobActionCfgs = new IntegrationJobActionCfgs(this);
            }
        }

        /** 集成任务-动作-配置 集合 */
        export class IntegrationJobActionCfgs
            extends ibas.BusinessObjects<IntegrationJobActionCfg, IntegrationJobAction> implements IIntegrationJobActionCfgs {

            /** 创建并添加子项 */
            create(): IntegrationJobActionCfg {
                let item: IntegrationJobActionCfg = new IntegrationJobActionCfg();
                this.add(item);
                return item;
            }
        }
        /** 集成任务-动作-配置 */
        export class IntegrationJobActionCfg extends ibas.BOSimpleLine<IntegrationJobActionCfg> implements IIntegrationJobActionCfg {

            /** 构造函数 */
            constructor() {
                super();
            }
            /** 映射的属性名称-对象编号 */
            static PROPERTY_OBJECTKEY_NAME: string = "ObjectKey";
            /** 获取-对象编号 */
            get objectKey(): number {
                return this.getProperty<number>(IntegrationJobActionCfg.PROPERTY_OBJECTKEY_NAME);
            }
            /** 设置-对象编号 */
            set objectKey(value: number) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_OBJECTKEY_NAME, value);
            }

            /** 映射的属性名称-对象行号 */
            static PROPERTY_LINEID_NAME: string = "LineId";
            /** 获取-对象行号 */
            get lineId(): number {
                return this.getProperty<number>(IntegrationJobActionCfg.PROPERTY_LINEID_NAME);
            }
            /** 设置-对象行号 */
            set lineId(value: number) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_LINEID_NAME, value);
            }

            /** 映射的属性名称-对象类型 */
            static PROPERTY_OBJECTCODE_NAME: string = "ObjectCode";
            /** 获取-对象类型 */
            get objectCode(): string {
                return this.getProperty<string>(IntegrationJobActionCfg.PROPERTY_OBJECTCODE_NAME);
            }
            /** 设置-对象类型 */
            set objectCode(value: string) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_OBJECTCODE_NAME, value);
            }

            /** 映射的属性名称-实例号 */
            static PROPERTY_LOGINST_NAME: string = "LogInst";
            /** 获取-实例号 */
            get logInst(): number {
                return this.getProperty<number>(IntegrationJobActionCfg.PROPERTY_LOGINST_NAME);
            }
            /** 设置-实例号 */
            set logInst(value: number) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_LOGINST_NAME, value);
            }

            /** 映射的属性名称-数据源 */
            static PROPERTY_DATASOURCE_NAME: string = "DataSource";
            /** 获取-数据源 */
            get dataSource(): string {
                return this.getProperty<string>(IntegrationJobActionCfg.PROPERTY_DATASOURCE_NAME);
            }
            /** 设置-数据源 */
            set dataSource(value: string) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_DATASOURCE_NAME, value);
            }

            /** 映射的属性名称-创建日期 */
            static PROPERTY_CREATEDATE_NAME: string = "CreateDate";
            /** 获取-创建日期 */
            get createDate(): Date {
                return this.getProperty<Date>(IntegrationJobActionCfg.PROPERTY_CREATEDATE_NAME);
            }
            /** 设置-创建日期 */
            set createDate(value: Date) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_CREATEDATE_NAME, value);
            }

            /** 映射的属性名称-创建时间 */
            static PROPERTY_CREATETIME_NAME: string = "CreateTime";
            /** 获取-创建时间 */
            get createTime(): number {
                return this.getProperty<number>(IntegrationJobActionCfg.PROPERTY_CREATETIME_NAME);
            }
            /** 设置-创建时间 */
            set createTime(value: number) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_CREATETIME_NAME, value);
            }

            /** 映射的属性名称-更新日期 */
            static PROPERTY_UPDATEDATE_NAME: string = "UpdateDate";
            /** 获取-更新日期 */
            get updateDate(): Date {
                return this.getProperty<Date>(IntegrationJobActionCfg.PROPERTY_UPDATEDATE_NAME);
            }
            /** 设置-更新日期 */
            set updateDate(value: Date) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_UPDATEDATE_NAME, value);
            }

            /** 映射的属性名称-更新时间 */
            static PROPERTY_UPDATETIME_NAME: string = "UpdateTime";
            /** 获取-更新时间 */
            get updateTime(): number {
                return this.getProperty<number>(IntegrationJobActionCfg.PROPERTY_UPDATETIME_NAME);
            }
            /** 设置-更新时间 */
            set updateTime(value: number) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_UPDATETIME_NAME, value);
            }

            /** 映射的属性名称-创建用户 */
            static PROPERTY_CREATEUSERSIGN_NAME: string = "CreateUserSign";
            /** 获取-创建用户 */
            get createUserSign(): number {
                return this.getProperty<number>(IntegrationJobActionCfg.PROPERTY_CREATEUSERSIGN_NAME);
            }
            /** 设置-创建用户 */
            set createUserSign(value: number) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_CREATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-更新用户 */
            static PROPERTY_UPDATEUSERSIGN_NAME: string = "UpdateUserSign";
            /** 获取-更新用户 */
            get updateUserSign(): number {
                return this.getProperty<number>(IntegrationJobActionCfg.PROPERTY_UPDATEUSERSIGN_NAME);
            }
            /** 设置-更新用户 */
            set updateUserSign(value: number) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_UPDATEUSERSIGN_NAME, value);
            }

            /** 映射的属性名称-创建动作标识 */
            static PROPERTY_CREATEACTIONID_NAME: string = "CreateActionId";
            /** 获取-创建动作标识 */
            get createActionId(): string {
                return this.getProperty<string>(IntegrationJobActionCfg.PROPERTY_CREATEACTIONID_NAME);
            }
            /** 设置-创建动作标识 */
            set createActionId(value: string) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_CREATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-更新动作标识 */
            static PROPERTY_UPDATEACTIONID_NAME: string = "UpdateActionId";
            /** 获取-更新动作标识 */
            get updateActionId(): string {
                return this.getProperty<string>(IntegrationJobActionCfg.PROPERTY_UPDATEACTIONID_NAME);
            }
            /** 设置-更新动作标识 */
            set updateActionId(value: string) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_UPDATEACTIONID_NAME, value);
            }

            /** 映射的属性名称-动作行号 */
            static PROPERTY_ACTIONLINEID_NAME: string = "ActionLineId";
            /** 获取-动作行号 */
            get actionLineId(): number {
                return this.getProperty<number>(IntegrationJobActionCfg.PROPERTY_ACTIONLINEID_NAME);
            }
            /** 设置-动作行号 */
            set actionLineId(value: number) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_ACTIONLINEID_NAME, value);
            }

            /** 映射的属性名称-配置项健 */
            static PROPERTY_KEY_NAME: string = "Key";
            /** 获取-配置项健 */
            get key(): string {
                return this.getProperty<string>(IntegrationJobActionCfg.PROPERTY_KEY_NAME);
            }
            /** 设置-配置项健 */
            set key(value: string) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_KEY_NAME, value);
            }

            /** 映射的属性名称-配置项值 */
            static PROPERTY_VALUE_NAME: string = "Value";
            /** 获取-配置项值 */
            get value(): string {
                return this.getProperty<string>(IntegrationJobActionCfg.PROPERTY_VALUE_NAME);
            }
            /** 设置-配置项值 */
            set value(value: string) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_VALUE_NAME, value);
            }

            /** 映射的属性名称-配置项说明 */
            static PROPERTY_REMARK_NAME: string = "Remark";
            /** 获取-配置项说明 */
            get remark(): string {
                return this.getProperty<string>(IntegrationJobActionCfg.PROPERTY_REMARK_NAME);
            }
            /** 设置-配置项说明 */
            set remark(value: string) {
                this.setProperty(IntegrationJobActionCfg.PROPERTY_REMARK_NAME, value);
            }

            /** 初始化数据 */
            protected init(): void {
            }
        }

    }
}