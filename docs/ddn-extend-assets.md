---
id: ddn-extend-assets
title: Extend Assets
sidebar_label: Extend Assets
---

## 1. 扩展资产
### &emsp;a. 什么是扩展资产
&emsp;&emsp;在区块链中，只有一种数据操作就是交易，为了在区块链中承载业务逻辑，将业务逻辑进行拆分成小的事务单元并分别附着在一个个交易体上，达到在区块链中实现业务的目地。这种拆分的一个个事务单元我们称之为资产。从编程的角度，可以直接在区块链代码中对资产进行编码和实现，但这样和区块链代码耦合性太强，不够灵活，扩展和维护都很复杂，因此我们实现了一套扩展资产框架。<br/>
&emsp;&emsp;基于扩展资产框架，用户可以将资产代码独立现在一个程序包中，实现框架定义的基类方法就可以将业务逻辑正确接入区块链；而区块链系统可以根据需要通过配置的方式来选择启动哪种资产或禁用哪种资产，整个系统变得更灵活、更易扩展和更易维护。<br/>
&emsp;&emsp;基于扩展资产框架实现的资产，我们称之为扩展资产。

### &emsp;b. 扩展资产的作用
&emsp;&ensp;解决资产和区块链代码的耦合性<br/>
&emsp;&ensp;统一资产实现的规范<br/>
&emsp;&ensp;统一资产数据格式和数据同步逻辑<br/>
&emsp;&ensp;资产接口自动智能生成<br/>
&emsp;&ensp;一个方法实现业务逻辑，无需深入了解区块链

## 2. 实现逻辑
### &emsp;a. 数据结构
&emsp;&emsp;扩展资产使用通用的数据表结构，具体包括两个表：trs_asset、trs_asset_ext；trs_asset是扩展资产基本表，支持数据的快速查询，trs_asset_ext在基本表不能满足数据存储需求时使用，以JSON格式存储，不支持数据的查询操作。两个表都拥有transaction_id字段，用以和区块链交易数据关联，具体结构如下：<br/>

trs_asset表：
字段名 | 类型 | 长度
-|-|-
transaction_id | varchar | 64
transaction_type | int | 11
str1 | varchar | 32
str2 | varchar | 64
str3 | varchar | 64
str4 | varchar | 128
str5 | varchar | 128
str6 | varchar | 256
str7 | varchar | 256
str8 | varchar | 512
str9 | varchar | 512
str10 | varchar | 1024
int1 | int | 11
int2 | int | 11
int3 | int | 11
timestamp1 | datetime | 0
timestamp2 | datetime | 0
timestamp | int | 11

trs_asset_ext表：
字段名 | 类型 | 长度
-|-|-
transaction_id | varchar | 64
json_ext | text | 0

### &emsp;b. 资产基类
&emsp;&emsp;资产基类AssetBase定义了一种资产接入区块链需要实现的方法和遵循的规范，所有自定义的扩展资产都必须继承自基类，但不必事先所有的方法，除了propsMapping方法必须实现以外，其他方法都可以直接使用基类的方法。基类具体包括的方法如下：<br/>
```
/**
 * transaction创建时调用，用来对输入参数根据资产进行个性化处理
 * @param {*} data 资产数据
 * @param {*} trs 交易对象
 */
async create(data, trs)

/**
 * 计算该类型资产交易的手续费（方法内不允许使用context对象内容）
 * @param {*} trs 交易对象
 * @param {*} sender 交易发起者
 */
async calculateFee(trs, sender)

/**
 * 定义资产属性和字段的对应关系
 * 基本属性最多支持定义15个属性
 * 字符串类型10个，名称分别是str1,str2,str3...str10，长度分别是32,64,64,128,128,256,256,512,512,1024，前4个有索引
 * 整数类型3个，名称分别是int1,int2,int3，类型为INT，前2个有索引
 * 时间戳类型2个，分别是timestamp1,timestamp2
 * 扩展属性理论上无上限，名称使用str_ext, int_ext, timestamp_ext，分别定义不同类型
 * 
 * 以下属于系统属性，不可使用
 * amount：转账金额，默认为0，字符串类型
 * recipient_id：收款地址，默认为null
 * message：备注信息
 */
async propsMapping()

/**
 * 基于业务逻辑的输入数据校验
 * @param {*} trs 交易对象
 * @param {*} sender 交易发起者
 */
async verify(trs, sender)

/**
 * 交易加入未确认列表前的预处理方法
 * @param {*} trs 交易对象
 * @param {*} sender 交易发起者
 */
async process(trs, sender)

/**
 * 获取资产的字节格式数据，用于签名计算
 * @param {*} trs 交易对象
 */
async getBytes(trs)

/**
 * 应用未确认交易，锁定转账金额
 * @param {*} trs 交易对象
 * @param {*} sender 交易发起者
 * @param {*} dbTrans 数据库事务对象
 */
async applyUnconfirmed(trs, sender, dbTrans)

/**
 * 回滚未确认交易，解锁转账金额
 * @param {*} trs 交易对象
 * @param {*} sender 交易发起者
 * @param {*} dbTrans 数据库事务对象
 */
async undoUnconfirmed(trs, sender, dbTrans)

/**
 * 应用交易业务金额，进行转账操作
 * @param {*} trs 交易对象
 * @param {*} block 区块对象
 * @param {*} sender 交易发起者
 * @param {*} dbTrans 数据库事务对象
 */
async apply(trs, block, sender, dbTrans)

/**
 * 回滚交易业务金额，进行退回操作
 * @param {*} trs 交易对象
 * @param {*} block 区块对象
 * @param {*} sender 交易发起者
 * @param {*} dbTrans 数据库事务对象
 */
async undo(trs, block, sender, dbTrans)

/**
 * 校验交易传入数据是否符合规范，从数据格式、数据长度、是否必须角度进行
 * @param {*} trs 交易对象
 */
async objectNormalize(trs)

/**
 * 读取数据库数据并反序列成交易对象体
 * @param {*} raw 数据库查询返回对象
 */
async dbRead(raw)
    
/**
 * 将交易存储到数据库中
 * @param {*} trs 交易对象
 * @param {*} dbTrans 数据库事务对象
 */
async dbSave(trs, dbTrans)

/**
 * 确认交易当前状态是否可以打包进当前区块
 * @param {*} trs 交易对象
 * @param {*} sender 交易发起者
 */
async ready(trs, sender)

/**
 * 区块链启动成功后执行
 */
async onBlockchainReady()

/**
 * 自定义资产Api
 * @param {*} router Express路由对象
 */
async attachApi(router)
```

### &emsp;c. 数据交互
&emsp;&emsp;由于扩展资产独立于区块链系统，为了和区块链系统进行交互，基类中提供了一些对象和方法，供用户使用。
```
/**
 * 上下文属性，其中包含区块链中所有可操作对象，如区块对象、交易对象等等
 * context详细内容请查看相关文档
 */
this._context

/**
 * 获取资产所属包名
 */
async getPackageName()

/**
 * 获取资产配置名称
 */
async getTransactionName()

/**
 * 获取资产配置类型值
 */
async getTransactionType()

/**
 * 查询规定条件的资产数据
 * @param {*} where 查询条件，遵循sequelize规则，使用prop的名称定义
 * @param {*} orders 排序条件，遵循sequelize规则，使用prop的名称定义
 * @param {*} returnTotal 是否返回总条数，true/false
 * @param {*} pageIndex 查询的页码，从1开始
 * @param {*} pageSize 分页的大小，每页的返回的最大记录条数
 */
async queryAsset(where, orders, returnTotal, pageIndex, pageSize)

/**
 * 查询规定条件的资产数据的个数
 * @param {*} where 查询条件，遵循sequelize规则，使用prop的名称定义
 */
async queryAssetCount(where)

/**
 * 获取资产在交易对象中的名称
 * @param {*} type 资产在配置文件中的类型值
 */
async getAssetJsonName(type)

/**
 * 获得交易信息中的当前资产对象
 * @param {*} trs 交易对象
 */
async getAssetObject(trs)

/**
 * 根据资产配置名称获取资产对应实例
 * @param {*} assetName 资产类名，也即配置文件中的名称
 */
async getAssetInstanceByName(assetName)
```
## 3. 新建一种资产
### &emsp;a. 使用npm创建一个新项目，生成package.json
```
npm init
```

### &emsp;b. 安装基类包依赖，ddn-asset-base包名可换成具体github地址
```
npm install --save ddn-asset-base
```

### &emsp;c. 一个项目里可以包含多个资产，每个资产对应一个js文件。这里以存证资产为例，新建js文件asset-evidence.js，定义类AssetEvidence，继承ddn-asset-base包中的AssetBase基类。
```
class AssetEvidence extends AssetBase
{
}

module.exports = AssetEvidence;
```

### &emsp;d. 重载propsMapping方法（必须）
```
class AssetEvidence extends AssetBase
{
    /**
     * 返回的数组中，每个定义对应一个数据表字段
     * field: 对应的数据表的字段名
     * prop: 对应的资产属性名，用户根据资产业务自定义
     * required: 属性是否必须，默认false
     * minLen: 字符串类型最小长度
     * maxLen: 字符串类型最大长度
     * minValue: 整型类型最小值
     * maxValue: 整型类型最大值
     */
	async propsMapping() {
        return [
            {field: "str4", prop: "ipid", required: true, maxLen: 64},
            {field: "str6", prop: "title", required: true, maxLen: 128},
            {field: "str8", prop: "description"},
            {field: "str7", prop: "hash", required: true, maxLen: 128},
            {field: "str5", prop: "tags"},
            {field: "str3", prop: "author", required: true, maxLen: 20},
            {field: "str9", prop: "url", required: true, maxLen: 256},
            {field: "str1", prop: "type", required: true},
            {field: "str2", prop: "size"}
          ];
    }
}

module.exports = AssetEvidence;
```

### &emsp;e. 创建项目入口文件，默认名为index.js

### &emsp;f. 在index.js中导出存证资产
```
module.exports = {
    AssetEvidence: require('./asset-evidence')
}
```

## 4. 在DDN中使用新资产
### &emsp;a. 为了在DDN区块链中使用新的资产，必须在config.asset.js中进行配置
```
exports.evidence = {
    transactions: [
        {
            name: "AssetEvidence",  //资产配置名称，即上面实现的资产导出的名字
            type: 10,   //资产配置类型值
        }
    ],
    package: "ddn-evidence"
}
```

### &emsp;b. 在DDN中安装ddn-evidence依赖，ddn-asset-base包名可换成具体github地址
```
npm install --save ddn-evidence
```

### &emsp;c. DDN区块链重新启动后，新的资产即可使用
&emsp;&emsp;使用方式，向接口/peer/transactions发起一笔交易，交易类型设置为配置类型值10，并在交易体对象中设置资产需要的数据；具体接口详情查看Http Api中的【普通交易】