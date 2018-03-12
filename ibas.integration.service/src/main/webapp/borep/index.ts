﻿/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/ibas/index.d.ts" />
/// <reference path="../3rdparty/initialfantasy/index.ts" />
/// <reference path="../api/index.ts" />
/// <reference path="./bo/Action.ts" />
/// <reference path="./bo/IntegrationJob.ts" />
/// <reference path="./DataConverter.ts" />
/// <reference path="./BORepository.ts" />

namespace integration {
    export namespace bo {
        // 注册业务对象仓库到工厂
        boFactory.register(BO_REPOSITORY_INTEGRATION, BORepositoryIntegration);
        // 注册业务对象到工厂
        boFactory.register(IntegrationJob.BUSINESS_OBJECT_CODE, IntegrationJob);
        boFactory.register(Action);
    }
}