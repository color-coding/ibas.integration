<div align="center">

# IBAS Integration

**集成服务模块**

IBAS 系统的数据集成模块，提供可配置的集成任务（Integration Job）、动作编排（Action）与执行引擎，支持外部系统数据对接。

Data integration module for the IBAS system — configurable integration jobs, action orchestration, and execution engine for external system connectivity.

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-1.8+-orange.svg)](https://www.oracle.com/java/)
[![Maven](https://img.shields.io/badge/Maven-3.x-red.svg)](https://maven.apache.org/)
[![Version](https://img.shields.io/badge/version-0.2.0-green.svg)](pom.xml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#-贡献--contributing)

</div>

---

## 📖 目录 | Table of Contents

- [✨ 特性 | Features](#-特性--features)
- [📦 模块结构 | Modules](#-模块结构--modules)
- [🚀 快速开始 | Quick Start](#-快速开始--quick-start)
- [📋 业务对象 | Business Objects](#-业务对象--business-objects)
- [📚 相关项目 | Related Projects](#-相关项目--related-projects)
- [🤝 贡献 | Contributing](#-贡献--contributing)
- [📄 许可证 | License](#-许可证--license)

---

## ✨ 特性 | Features

- **🔧 集成动作（Action）** — 可配置的集成动作，支持动作包（Action Package）组织
- **📋 集成任务（Integration Job）** — 任务编排与调度，支持动作链与动作配置
- **⚙️ 动作配置** — 灵活的动作参数配置（Action Config），支持动态参数注入
- **🔗 REST 服务** — 提供 ActionService 执行端点，支持远程触发集成任务
- **🏗️ 框架集成** — 基于 BOBAS 框架，标准业务对象与仓储模式

---

## 📦 模块结构 | Modules

| 模块 | 类型 | 说明 |
|------|------|------|
| `ibas.integration` | JAR | **核心模块** — 集成动作与任务的业务对象定义、仓储层 |
| `ibas.integration.service` | WAR | **REST 服务** — DataService、FileService、ActionService |

---

## 🚀 快速开始 | Quick Start

### 环境要求 | Prerequisites

- **JDK** 1.8+
- **Maven** 3.x
- [ibas-framework](https://github.com/color-coding/ibas-framework)（BOBAS 框架）

### 构建 | Build

```bash
# 克隆仓库
git clone https://github.com/color-coding/ibas.integration.git
cd ibas.integration

# 编译全部模块
./compile_packages.sh            # Linux / macOS
compile_packages.bat             # Windows

# 编译单个模块
mvn clean package install -Dmaven.test.skip=true -f ibas.integration/pom.xml

# 运行测试
mvn test -f ibas.integration/pom.xml

# 部署
./deploy_packages.sh
```

### Maven 依赖

```xml
<dependency>
    <groupId>org.colorcoding.apps</groupId>
    <artifactId>ibas.integration</artifactId>
    <version>0.2.0</version>
</dependency>
```

---

## 📋 业务对象 | Business Objects

| 业务对象 | 说明 |
|----------|------|
| `Action` | 集成动作定义 |
| `ActionPackage` | 动作包（动作集合） |
| `ActionConfig` | 动作配置（参数） |
| `IntegrationJob` | 集成任务（编排） |
| `IntegrationJobAction` | 任务动作（任务中的动作实例） |
| `IntegrationJobActionCfg` | 任务动作配置 |

---

## 📚 相关项目 | Related Projects

| 项目 | 说明 |
|------|------|
| [ibas-framework](https://github.com/color-coding/ibas-framework) | BOBAS 业务对象框架 |
| [ibas-businessone](https://github.com/color-coding/ibas-businessone) | SAP Business One 适配层 |

---

## 🤝 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 发起 Pull Request

---

## 📄 许可证 | License

本项目基于 [Apache License 2.0](LICENSE) 开源。
---

## 🙏 鸣谢 | Thanks

<div align="center">

**[Color-Coding Studio](http://colorcoding.org/)** · 咔啦工作室

</div>
