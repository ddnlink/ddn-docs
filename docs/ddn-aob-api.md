---
id: ddn-aob-api
title: Assets on blockchain
sidebar_label: Assets on blockchain
---

## **1 API使用说明**   
### **1.1 请求过程说明**   
1.1 构造请求数据，用户数据按照DDN提供的接口规则，通过程序生成签名，生成请求数据集合；       
1.2 发送请求数据，把构造完成的数据集合通过POST/GET等提交的方式传递给DDN；       
1.3 DDN对请求数据进行处理，服务器在接收到请求后，会首先进行安全校验，验证通过后便会处理该次发送过来的请求；       
1.4 返回响应结果数据，DDN把响应结果以JSON的格式反馈给用户，每个响应都包含success字段，表示请求是否成功，成功为true, 失败为false。 如果失败，则还会包含一个error字段，表示错误原因；       
1.5 对获取的返回结果数据进行处理；       
   
---   
   
## **2 接口**   
### **2.1 AOB相关交易** 
ddn系统的所有写操作都是通过发起一个交易来完成的。 
交易数据通过一个叫做@ddn/ddn-node-sdk的库来构建，然后再通过一个POST接口发布出去。

POST接口规格如下：
payload为@ddn/ddn-node-sdk创建出来的交易数据
接口地址：/peer/transactions  
请求方式：post   
支持格式：json  
公用变量：
```
var ddnsdk = require('@ddn/ddn-node-sdk');
// 一级密码
var secret = 'motion group blossom coral upper warrior pattern fragile sister misery palm detect'
// 二级密码
var secondSecret = 'erjimima001'
```

#### **2.1.1 注册资产发行商**
请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|transaction|json|Y|ddnsdk.assetPlugin.createPluginAsset根据发行商名字、描述、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  

   
请求示例：   
```js   
var issuer = {
    name: "DDD",    // 发行商名称,唯一标识
    desc: "J G V",  // 发行商描述
    issuer_id: "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
    fee: '10000000000',
}
//初始化sdk，初始化方法在系统中只需要初始化一次，建议在系统启动后初始化一次即可
ddnsdk.init.init('nethash');
// 构造交易数据
var trs = await ddnsdk.assetPlugin.createPluginAsset(60, issuer, secret, secondSecret)

console.log(JSON.stringify(trs))
{"type":60,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55102937,"message":null,"asset":{"aobIssuer":{"name":"DDD","desc":"J G V","issuer_id":"DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ"}},"fee":{[String: "10000000000"] s: 1, e: 10, c: [ 10000000000 ] },"signature":"f8503ee19d2fb1798847cbb66346daf01bf34e0278caa5a9aa51dcd6a7a7081ef45f01ed76518d01169133571f610de1e074a1012d6fd23703a4b35393b0ae0a"}

// 将生成的交易数据通过post发送给server，注册资产发行商IssuerName
curl -H "Content-Type: application/json" -H "nethash:0ab796cd" -H "version:''" -k -X POST -d '{"transaction":{"type":60,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55102937,"message":null,"asset":{"aobIssuer":{"name":"DDD","desc":"J G V","issuer_id":"DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ"}},"fee":{[String: "10000000000"] s: 1, e: 10, c: [ 10000000000 ] },"signature":"f8503ee19d2fb1798847cbb66346daf01bf34e0278caa5a9aa51dcd6a7a7081ef45f01ed76518d01169133571f610de1e074a1012d6fd23703a4b35393b0ae0a"}}' 'http://localhost:8001/peer/transactions' && echo
```   
   
JSON返回示例：   
```js  
{"success":true,"transactionId": "3e36865ed64e19453b5f5d9523c0b6cd8e1e3a77bd890f1ba5426d3ccdc5f632"}
```

#### **2.1.2 注册资产** 
请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|transaction|json|Y|ddnsdk.assetPlugin.createPluginAsset根据资产名字、描述、上限、精度、策略、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  

   
请求示例：   
```js   
var obj = {
    name: "DDD.NCR",    // 资产名称，发行商名.资产名，唯一标识
    desc: "DDD新币种",
    maximum: "100000000",   // 上限
    precision: 2,   // 精度，小数点的位数，这里上限是1000000，精度为3，代表资产IssuerName.CNY的最大发行量为1000.000
    strategy: '',   // 策略
    allow_blacklist: '1',
    allow_whitelist: '1',
    allow_writeoff: '1',
    fee: '50000000000'
}
//初始化sdk，初始化方法在系统中只需要初始化一次，建议在系统启动后初始化一次即可
ddnsdk.init.init('nethash');
// 构造交易数据
var trs = await ddnsdk.assetPlugin.createPluginAsset(61, obj, secret, secondSecret)

console.log(JSON.stringify(trs))
{"type":61,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55103637,"message":null,"asset":{"aobAsset":{"name":"DDD.NCR","desc":"DDD新币种","maximum":"100000000","precision":2,"strategy":"","allow_blacklist":"1","allow_whitelist":"1","allow_writeoff":"1"}},"fee":"50000000000","signature":"6a197b7533d6d74bd15d0ffd873db6c841bcd729aec531b5987c02ba94e4c507dd5f085821f10a4dc152c20180b9989303083df1355ac506c0a50f2d0b45da05"}

// 将生成的交易数据通过post发送给server，注册资产IssuerName.CNY
curl -H "Content-Type: application/json" -H "nethash:0ab796cd" -H "version:''" -k -X POST -d '{"transaction":{"type":61,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55103637,"message":null,"asset":{"aobAsset":{"name":"DDD.NCR","desc":"DDD新币种","maximum":"100000000","precision":2,"strategy":"","allow_blacklist":"1","allow_whitelist":"1","allow_writeoff":"1"}},"fee":"50000000000","signature":"6a197b7533d6d74bd15d0ffd873db6c841bcd729aec531b5987c02ba94e4c507dd5f085821f10a4dc152c20180b9989303083df1355ac506c0a50f2d0b45da05"}}' 'http://localhost:8001/peer/transactions' && echo
```   
   
JSON返回示例：   
```js  
{"success":true,"transactionId": "2198b87be0288161c3319bce379c7873f1b6adaab2c16b55847f9e6159413fe1"}		
```

#### **2.1.3 资产设置acl模式** 
请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|transaction|json|Y|ddnsdk.assetPlugin.createPluginAsset根据资产名、流通状态、黑白名单模式、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  

   
请求示例（开启白名单）：   
```js   
var obj = {
    currency: "DDD.NCR",
    flag: 1,    //flag_type=1（0：使用黑名单，1：使用白名单，2：全开放），flag_type=2（0：流通，1：注销）
    flag_type: 1    //1：黑白名单设置，2：注销设置
}
//初始化sdk，初始化方法在系统中只需要初始化一次，建议在系统启动后初始化一次即可
ddnsdk.init.init('nethash');
// 构造交易数据
var trs = await ddnsdk.assetPlugin.createPluginAsset(62, obj, secret, secondSecret)

console.log(JSON.stringify(trs))
{"type":62,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55104595,"message":null,"asset":{"aobFlags":{"currency":"DDD.NCR","flag":1,"flag_type":1}},"fee":"10000000","signature":"79dd60164b3acf300dca9f81b0f032114d5c54448d1fee3a0bd43157ae54b54d3307a3c8eeca4f464c49a6a02265b1e3f2d553c48799f94d8f0437d417c0e305"}

// 将生成的交易数据通过post发送给server，将acl改为白名单模式
curl -H "Content-Type: application/json" -H "nethash:0ab796cd" -H "version:''" -k -X POST -d '{"transaction":{"type":62,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55104595,"message":null,"asset":{"aobFlags":{"currency":"DDD.NCR","flag":1,"flag_type":1}},"fee":"10000000","signature":"79dd60164b3acf300dca9f81b0f032114d5c54448d1fee3a0bd43157ae54b54d3307a3c8eeca4f464c49a6a02265b1e3f2d553c48799f94d8f0437d417c0e305"}}' 'http://localhost:8001/peer/transactions' && echo
```   
   
JSON返回示例：   
```js  
{"success":true,"transactionId": "abdcca8e2d7120b8383021a6e94494d72bada96cbb2a6c77e228e9bbe310a97e"}		
```

#### **2.1.4 更新访问控制列表（acl）** 
请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|transaction|json|Y|ddnsdk.assetPlugin.createPluginAsset根据资产名字、列表操作方法、黑名单还是白名单、地址列表、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  

   
请求示例（增加白名单）：   
```js   
var obj = {
    currency: "DDD.NCR",
    flag: 1,    // 访问控制列表的类型，0：黑名单， 1：白名单
    operator: "+",  // '+'表示增加列表， ‘-’表示删除列表
    list: "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q"    //黑白名单内容，多个用逗号分隔
}
//初始化sdk，初始化方法在系统中只需要初始化一次，建议在系统启动后初始化一次即可
ddnsdk.init.init('nethash');
// 构造交易数据
var trs = await ddnsdk.assetPlugin.createPluginAsset(63, obj, secret, secondSecret)

console.log(JSON.stringify(trs))
{"type":63,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55105961,"message":null,"asset":{"aobAcl":{"currency":"DDD.NCR","flag":1,"operator":"+","list":"DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q"}},"fee":"10000000","signature":"5d81ebd68af2c2e314b9ca2bae99cbd538933325cf4965b510b88319a67c82f901c2a2e234fe220d6d5424c8deddd0f34e6eb5c326e1360e31118a4db64b5e07"}

// 将生成的交易数据通过post发送给server，把地址列表['15745540293890213312']增加到该白名单中，只修改名单列表，不修改acl模式，手续费0.2DDN
curl -H "Content-Type: application/json" -H "nethash:0ab796cd" -H "version:''" -k -X POST -d '{"transaction":{"type":63,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55105961,"message":null,"asset":{"aobAcl":{"currency":"DDD.NCR","flag":1,"operator":"+","list":"DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q"}},"fee":"10000000","signature":"5d81ebd68af2c2e314b9ca2bae99cbd538933325cf4965b510b88319a67c82f901c2a2e234fe220d6d5424c8deddd0f34e6eb5c326e1360e31118a4db64b5e07"}}' 'http://localhost:8001/peer/transactions' && echo
```   
   
JSON返回示例：   
```js  
{"success":true,"transactionId": "fd56923bdff348eb2d74d9736947fc5a98862b3f01fe0c7ad608819429902c84"}
// 查询更新后的列表（acl/1代表白名单）
curl -X GET -H "Content-Type: application/json" 'http://localhost:8001/api/aobasset/DDD.NCR/acl/1?limit=10&offset=0' && echo
{
  "success": true,
  "result": {
    "rows": [
      {
        "id": 1,
        "currency": "DDD.NCR",
        "address": "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q"
      }
    ],
    "total": 1
  }
}
```


#### **2.1.5 资产发行** 
请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|transaction|json|Y|ddnsdk.assetPlugin.createPluginAsset根据发行商名字、描述、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  

   
请求示例：   
```js   
var obj = {
    currency: "DDD.NCR",
    aobAmount: "50000000",  // 本次发行量=真实数量（100）*10**精度（3），所有发行量之和需 <= 上限*精度
    fee: '10000000',
}
//初始化sdk，初始化方法在系统中只需要初始化一次，建议在系统启动后初始化一次即可
ddnsdk.init.init('nethash');
// 构造交易数据
var trs = await ddnsdk.assetPlugin.createPluginAsset(64, obj, secret, secondSecret)

console.log(JSON.stringify(trs))
{"type":64,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55108465,"message":null,"asset":{"aobIssue":{"currency":"DDD.NCR","amount":"50000000"}},"fee":"10000000","signature":"968df5d4853b0f6f78447dbd4e08f53f27a5825121e0c6f62adda81ee6cca8e602b5c6018a175b06dbe7125e099f200da24e972411246b462ba4b96a54b1b00d"}

curl -H "Content-Type: application/json" -H "nethash:0ab796cd" -H "version:''" -k -X POST -d '{"transaction":{"type":64,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55108465,"message":null,"asset":{"aobIssue":{"currency":"DDD.NCR","amount":"50000000"}},"fee":"10000000","signature":"968df5d4853b0f6f78447dbd4e08f53f27a5825121e0c6f62adda81ee6cca8e602b5c6018a175b06dbe7125e099f200da24e972411246b462ba4b96a54b1b00d"}}' 'http://localhost:8001/peer/transactions' && echo
```   
   
JSON返回示例：   
```js  
{"success":true,"transactionId": "7a607625c9d3ddcadc1a645c4050a6e6f87bfe800990d28b5b96bac9a3701740"}			
```

#### **2.1.6 资产转账** 
请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|transaction|json|Y|ddnsdk.assetPlugin.createPluginAsset根据资产名字、数量、接收者地址、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  

   
请求示例：   
```js   
var obj = {
    recipient_id: "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q",    // 接收地址，需满足前文定义好的acl规则
    currency: "DDD.NCR",
    aobAmount: "10",    // 本次转账数（10000）=真实数量（10）*10**精度（3），需 <= 当前资产发行总量
    message: '测试转账',
    fee: '0',
}
//初始化sdk，初始化方法在系统中只需要初始化一次，建议在系统启动后初始化一次即可
ddnsdk.init.init('nethash');
// 构造交易数据
var trs = await ddnsdk.assetPlugin.createPluginAsset(65, obj, secret, secondSecret)

console.log(JSON.stringify(trs))
{"type":65,"nethash":"0ab796cd","amount":"0","recipient_id":"DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q","sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55108730,"message":"测试转账","asset":{"aobTransfer":{"currency":"DDD.NCR","amount":"10"}},"fee":"10000000","signature":"f0e5cb2b832ff662c3da84b5fbb18860da4f6501679e6b2f1009f5dc24c6a75677a0fdc8812c4e9c28fbbe3f1f24b84089f366899811f365791474b5d49b2605"}

// 给AKKHPvQb2A119LNicCQWLZQDFxhGVEY57a发送10.000 IssuerName.CNY资产
curl -H "Content-Type: application/json" -H "nethash:0ab796cd" -H "version:''" -k -X POST -d '{"transaction":{"type":65,"nethash":"0ab796cd","amount":"0","recipient_id":"DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q","sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55108730,"message":"测试转账","asset":{"aobTransfer":{"currency":"DDD.NCR","amount":"10"}},"fee":"10000000","signature":"f0e5cb2b832ff662c3da84b5fbb18860da4f6501679e6b2f1009f5dc24c6a75677a0fdc8812c4e9c28fbbe3f1f24b84089f366899811f365791474b5d49b2605"}}' 'http://localhost:8001/peer/transactions' && echo
```   
   
JSON返回示例：   
```js  
{"success":true,"transactionId": "8c8992ed2bc5e6b4aadbc0cd654eb5c4666566a9313a14607456f8cb6c6a5462"}		
```
 
#### **2.1.7 资产注销** 
请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|transaction|json|Y|ddnsdk.assetPlugin.createPluginAsset根据资产名字、注销状态、黑白名单模式、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  

   
请求示例：   
```js   
var obj = {
    currency: "DDD.NCR",
    flag: 1,    //flag_type=1（0：使用黑名单，1：使用白名单，2：全开放），flag_type=2（0：流通，1：注销）
    flag_type: 2    //1：黑白名单设置，2：注销设置
}
//初始化sdk，初始化方法在系统中只需要初始化一次，建议在系统启动后初始化一次即可
ddnsdk.init.init('nethash');
// 构造交易数据
var trs = await ddnsdk.assetPlugin.createPluginAsset(62, obj, secret, secondSecret)

console.log(JSON.stringify(trs))
{"type":62,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55109270,"message":null,"asset":{"aobFlags":{"currency":"DDD.NCR","flag":1,"flag_type":2}},"fee":"10000000","signature":"5121c6994af989454d00b87773f8df9b974438c1ebc923646a703e2acd8d8f5b856e6ad641aef3edd47f4df818a284984cbbf19c30f61bbfbce07db828dee501"}

curl -H "Content-Type: application/json" -H "nethash:0ab796cd" -H "version:''" -k -X POST -d '{"transaction":{"type":62,"nethash":"0ab796cd","amount":"0","recipient_id":null,"sender_public_key":"0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c","timestamp":55109270,"message":null,"asset":{"aobFlags":{"currency":"DDD.NCR","flag":1,"flag_type":2}},"fee":"10000000","signature":"5121c6994af989454d00b87773f8df9b974438c1ebc923646a703e2acd8d8f5b856e6ad641aef3edd47f4df818a284984cbbf19c30f61bbfbce07db828dee501"}}' 'http://localhost:8001/peer/transactions' && echo
```   
   
JSON返回示例：   
```js  
{"success":true,"transactionId": "b207914295302b8f590376f509afb07b8d7c33d6d8b423a13fe58a48a4f633d4"}		
```  


#### **2.1.8 其它接口**  
get /peer/list  //查找dapp peer   
get /peer/blocks/common //查找common block   
...    



### **2.2 用户自定义资产aob**  

#### **2.2.1 创建资产**   
接口地址：/api/aobtransfer/transfers   
请求方式：PUT   
支持格式：json   
接口备注：   
请求参数说明：   

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|secret |string |Y    |发送者密码,最大长度100       |   
|currency |string |Y    |资产名，最大长度22       |   
|amount |string |Y    |转账金额，最大长度50       |   
|recipientId |string |Y    |接收地址，最小长度1       |  
|publicKey|string|N|发送者公钥，格式必须符合公钥格式|  
|secondSecret|string|N|发送者二级密码，最小长度1，最大长度：100|   
|multisigAccountPublicKey|string|N|多签账户公钥，格式必须符合公钥格式|   
|message|string|N|转账备注，最大长度256| 

   
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据。|    
|transactionId|string  |交易id      |    
   
   
请求示例：   
```bash   
// 转0.1DDD.NCR给DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q
curl -k -H "Content-Type: application/json" -X PUT -d '{"secret":"elite sunset cake shaft human cradle remember select flame panther tongue ancient","amount":"10","recipientId":"DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q","currency":"DDD.NCR"}' 'http://localhost:8001/api/aobtransfer/transfers' && echo   
```   
   
JSON返回示例：   
```js   
{   
	"success": true,   
	"transactionId": "3cb6d97534a3b90cf7fc883927f0a9a7c7f4878a9df526c2906ca97e250fcaba"   
}   
```  

#### **2.2.2 获取全网所有发行商**  
接口地址：/api/aobissuer/issuers  
请求方式：get   
支持格式：urlencoded 

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|pageindex|integer|N|分页查询页数，默认1|
|pagesize|integer|N|分页查询每页大小，默认50|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|rows|list|元素为字典，每个字典代表一个发行商，包含发行商名字、描述、id（Ddn地址）|
|total|integer|发行商总个数|

请求示例：   
```js   
curl -X GET -H "Content-Type: application/json"  'localhost:8001/api/aobissuer/issuers?pageindex=1&pagesize=10' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": {
    "rows": [
      {
        "transaction_id": "3e36865ed64e19453b5f5d9523c0b6cd8e1e3a77bd890f1ba5426d3ccdc5f632",
        "transaction_type": 60,
        "timestamp": 55102937,
        "name": "DDD",
        "issuer_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "desc": "J G V"
      }
    ],
    "total": 1
  }
}
``` 

#### **2.2.3 查询指定发行商的信息** 
接口地址：/api/aobissuer/issuers/:name  
请求方式：get   
支持格式：urlencoded 

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|name|string|Y|可以为发行商名称或Ddn账户地址|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|result|dict|包含发行商名字、描述、id（Ddn地址）|
   
请求示例：   
```js   
curl -X GET -H "Content-Type: application/json"  'http://localhost:8001/api/aobissuer/issuers/DDD' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": {
    "transaction_id": "3e36865ed64e19453b5f5d9523c0b6cd8e1e3a77bd890f1ba5426d3ccdc5f632",
    "transaction_type": 60,
    "timestamp": 55102937,
    "name": "DDD",
    "issuer_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
    "desc": "J G V"
  }
}
``` 

#### **2.2.4 查看指定发行商的资产** 
接口地址：/api/aobasset/issuers/:name/assets   
请求方式：get   
支持格式：urlencoded 

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|name|string|Y|可以为发行商名称或Ddn账户地址|
|pageindex|integer|N|分页查询页数，默认1|
|pagesize|integer|N|分页查询每页大小，默认50|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|rows|list|每个元素是一个字典，每个字典是一个资产详情，包含资产名字、描述、上限（最大发行量=真实发行量*10**精度）、精度、策略、当前发行量、发行高度、发行商id，acl模式（0：黑名单，1：白名单）、是否注销|
|total|interger|该发行商注册的资产总个数（包含已注销的）|

   
   
请求示例：   
```js   
curl -X GET -H "Content-Type: application/json"  'http://localhost:8001/api/aobasset/issuers/DDD/assets?pageindex=1&pagesize=10' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": {
    "rows": [
      {
        "transaction_id": "2198b87be0288161c3319bce379c7873f1b6adaab2c16b55847f9e6159413fe1",
        "transaction_type": 61,
        "timestamp": 55103637,
        "name": "DDD.NCR",
        "desc": "DDD新币种",
        "maximum": "100000000",
        "quantity": "50000000",
        "issuer_name": "DDD",
        "strategy": "",
        "precision": 2,
        "acl": 1,
        "writeoff": 1,
        "allow_writeoff": "1",
        "allow_whitelist": "1",
        "allow_blacklist": "1"
      }
    ],
    "total": 1
  }
}
``` 

#### **2.2.5 获取全网所有资产信息** 
接口地址：/api/aobasset/list  
请求方式：get   
支持格式：urlencoded 

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|pageindex|integer|N|分页查询页数，默认1|
|pagesize|integer|N|分页查询每页大小，默认50|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|rows|list|每个元素是一个字典，每个字典是一个资产详情，包含资产名字、描述、上限、精度、策略、当前发行量、发行高度、发行商id，acl、是否注销|
|total|integer|所有资产的个数|

   
   
请求示例：   
```js   
curl -X GET -H "Content-Type: application/json"  'http://localhost:8001/api/aobasset/list?pageindex=1&pagesize=10' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "state": 0,
  "data": {
    "rows": [
      {
        "transaction_id": "2198b87be0288161c3319bce379c7873f1b6adaab2c16b55847f9e6159413fe1",
        "transaction_type": 61,
        "timestamp": 55103637,
        "name": "DDD.NCR",
        "desc": "DDD新币种",
        "maximum": "100000000",
        "quantity": "50000000",
        "issuer_name": "DDD",
        "strategy": "",
        "precision": 2,
        "acl": 1,
        "writeoff": 1,
        "allow_writeoff": "1",
        "allow_whitelist": "1",
        "allow_blacklist": "1"
      }
    ],
    "total": 1
  }
}
``` 

#### **2.2.6 获取指定资产信息** 
接口地址：/api/aobasset/:name  
请求方式：get   
支持格式：urlencoded 

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|name|string|Y|资产名|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|result|dict|包含资产名字、描述、上限、精度、策略、当前发行量、发行高度、发行商id，acl、是否注销|
   
请求示例：   
```js   
curl -X GET -H "Content-Type: application/json"  'http://localhost:8001/api/aobasset/DDD.NCR' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": {
    "transaction_id": "2198b87be0288161c3319bce379c7873f1b6adaab2c16b55847f9e6159413fe1",
    "transaction_type": 61,
    "timestamp": 55103637,
    "name": "DDD.NCR",
    "desc": "DDD新币种",
    "maximum": "100000000",
    "quantity": "50000000",
    "issuer_name": "DDD",
    "strategy": "",
    "precision": 2,
    "acl": 1,
    "writeoff": 1,
    "allow_writeoff": "1",
    "allow_whitelist": "1",
    "allow_blacklist": "1"
  }
}
``` 

#### **2.2.7 获取指定资产的访问控制列表（acl）** 
接口地址：/api/aobasset/:name/acl/:flag
请求方式：get   
支持格式：urlencoded 

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|name|string|Y|资产名|
|flag|boolean|Y|取值0和1，0表示黑名单，1表示白名单|
|limit|integer|N|限制结果集个数，最小值：0,最大值：100|
|offset|integer|N|偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|rows|list|符合规则的账户列表|
|total|integer|符合规则账户总数|

   
请求示例：   
```js   
// 获取资产DDD.NCR白名单中的地址列表
curl -X GET -H "Content-Type: application/json"  'http://localhost:8001/api/aobasset/DDD.NCR/acl/1' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": {
    "rows": [
      {
        "id": 1,
        "currency": "DDD.NCR",
        "address": "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q"
      }
    ],
    "total": 1
  }
}
``` 

#### **2.2.8 获取指定账户所有aob的余额** 
接口地址：/api/aobasset/balances/:address  
请求方式：get   
支持格式：urlencoded 

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|address|string|Y|账户地址|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|result|list|拥有的资产详情列表，每个元素是一个资产，包含资产名、余额、上限、精度、当前发行量、是否注销（0：未注销，1：已注销）|
   
请求示例：   
```js   
curl -X GET -H "Content-Type: application/json" 'http://localhost:8001/api/aobasset/balances/DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": [
    {
      "id": 2,
      "address": "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q",
      "balance": "10",
      "currency": "DDD.NCR"
    }
  ]
}
```

#### **2.2.9 获取指定账户所有资产相关操作记录** 
接口地址：/api/aobtransfer/transactions/my/:address  
请求方式：get   
支持格式：urlencoded  
备注：包含发行商创建以及资产创建、发行、转账等  

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|address|string|Y|账户地址|
|pageindex|integer|N|分页查询页数，默认1|
|pagesize|integer|N|分页查询每页大小，默认50|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|rows|list|交易列表，每个元素是一个字典代表一次交易，包含交易id、区块高度、区块id、交易类型、时间戳、发送者公钥、发送者id、接收者id（系统为空，如资产注册）、交易数量（资产交易都为0）、手续费0.1DDN、签名、多重签名、确认数、资产信息（包含发行商id、发行商名字、描述）、交易id。|
|total|integer|资产交易总个数|
   
请求示例：   
```js   
curl -X GET -H "Content-Type: application/json"  'http://localhost:8001/api/aobtransfer/transactions/my/DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ?pageindex=1&pagesize=10' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": {
    "rows": [
      {
        "id": "3e36865ed64e19453b5f5d9523c0b6cd8e1e3a77bd890f1ba5426d3ccdc5f632",
        "height": "6",
        "block_id": "7a48430fcbbad24cd7fc23691c7aead618fa99b19ef83229fddd6f0484f2aafe",
        "type": 60,
        "timestamp": 55102937,
        "sender_public_key": "0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c",
        "sender_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "recipient_id": null,
        "amount": "0",
        "fee": "10000000000",
        "signature": "f8503ee19d2fb1798847cbb66346daf01bf34e0278caa5a9aa51dcd6a7a7081ef45f01ed76518d01169133571f610de1e074a1012d6fd23703a4b35393b0ae0a",
        "sign_signature": null,
        "signatures": null,
        "confirmations": 721,
        "args": null,
        "message": null,
        "asset": {
          "aobIssuer": {
            "transaction_id": "3e36865ed64e19453b5f5d9523c0b6cd8e1e3a77bd890f1ba5426d3ccdc5f632",
            "transaction_type": 60,
            "timestamp": 55102937,
            "name": "DDD",
            "issuer_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
            "desc": "J G V"
          }
        }
      },
      {
        "id": "2198b87be0288161c3319bce379c7873f1b6adaab2c16b55847f9e6159413fe1",
        "height": "14",
        "block_id": "3b722e8499cd4e8e5dd9a497500f3b9c3dcc1ed04b1d04471081ec8dcbaabb73",
        "type": 61,
        "timestamp": 55103637,
        "sender_public_key": "0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c",
        "sender_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "recipient_id": null,
        "amount": "0",
        "fee": "50000000000",
        "signature": "6a197b7533d6d74bd15d0ffd873db6c841bcd729aec531b5987c02ba94e4c507dd5f085821f10a4dc152c20180b9989303083df1355ac506c0a50f2d0b45da05",
        "sign_signature": null,
        "signatures": null,
        "confirmations": 713,
        "args": null,
        "message": null,
        "asset": {
          "aobAsset": {
            "transaction_id": "2198b87be0288161c3319bce379c7873f1b6adaab2c16b55847f9e6159413fe1",
            "transaction_type": 61,
            "timestamp": 55103637,
            "name": "DDD.NCR",
            "desc": "DDD新币种",
            "maximum": "100000000",
            "quantity": "50000000",
            "issuer_name": "DDD",
            "strategy": "",
            "precision": 2,
            "acl": 1,
            "writeoff": 1,
            "allow_writeoff": "1",
            "allow_whitelist": "1",
            "allow_blacklist": "1"
          }
        }
      },
      {
        "id": "abdcca8e2d7120b8383021a6e94494d72bada96cbb2a6c77e228e9bbe310a97e",
        "height": "16",
        "block_id": "3016be108a52eb425de813b63ee41deb8ca50ba5985f4073cfbcba997e0022e9",
        "type": 62,
        "timestamp": 55104595,
        "sender_public_key": "0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c",
        "sender_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "recipient_id": null,
        "amount": "0",
        "fee": "10000000",
        "signature": "79dd60164b3acf300dca9f81b0f032114d5c54448d1fee3a0bd43157ae54b54d3307a3c8eeca4f464c49a6a02265b1e3f2d553c48799f94d8f0437d417c0e305",
        "sign_signature": null,
        "signatures": null,
        "confirmations": 711,
        "args": null,
        "message": null,
        "asset": {
          "aobFlags": {
            "transaction_id": "abdcca8e2d7120b8383021a6e94494d72bada96cbb2a6c77e228e9bbe310a97e",
            "transaction_type": 62,
            "timestamp": 55104595,
            "currency": "DDD.NCR",
            "flag": 1,
            "flag_type": 1
          }
        }
      },
      {
        "id": "fd56923bdff348eb2d74d9736947fc5a98862b3f01fe0c7ad608819429902c84",
        "height": "30",
        "block_id": "51f7cd014fcd4f1310f72a6f6ef06c4c59b48718cf265b7e34d3a879f4093d10",
        "type": 63,
        "timestamp": 55105961,
        "sender_public_key": "0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c",
        "sender_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "recipient_id": null,
        "amount": "0",
        "fee": "10000000",
        "signature": "5d81ebd68af2c2e314b9ca2bae99cbd538933325cf4965b510b88319a67c82f901c2a2e234fe220d6d5424c8deddd0f34e6eb5c326e1360e31118a4db64b5e07",
        "sign_signature": null,
        "signatures": null,
        "confirmations": 697,
        "args": null,
        "message": null,
        "asset": {
          "aobAcl": {
            "transaction_id": "fd56923bdff348eb2d74d9736947fc5a98862b3f01fe0c7ad608819429902c84",
            "transaction_type": 63,
            "timestamp": 55105961,
            "currency": "DDD.NCR",
            "flag": 1,
            "operator": "+",
            "list": "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q"
          }
        }
      },
      {
        "id": "7a607625c9d3ddcadc1a645c4050a6e6f87bfe800990d28b5b96bac9a3701740",
        "height": "247",
        "block_id": "4ad1e32ef9cf4c6bae2fdac5f295cabc949f1bf169c0ba49cdc86f23bac92d4f",
        "type": 64,
        "timestamp": 55108465,
        "sender_public_key": "0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c",
        "sender_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "recipient_id": null,
        "amount": "0",
        "fee": "10000000",
        "signature": "968df5d4853b0f6f78447dbd4e08f53f27a5825121e0c6f62adda81ee6cca8e602b5c6018a175b06dbe7125e099f200da24e972411246b462ba4b96a54b1b00d",
        "sign_signature": null,
        "signatures": null,
        "confirmations": 480,
        "args": null,
        "message": null,
        "asset": {
          "aobIssue": {
            "transaction_id": "7a607625c9d3ddcadc1a645c4050a6e6f87bfe800990d28b5b96bac9a3701740",
            "transaction_type": 64,
            "timestamp": 55108465,
            "currency": "DDD.NCR",
            "amount": "50000000"
          }
        }
      },
      {
        "id": "8c8992ed2bc5e6b4aadbc0cd654eb5c4666566a9313a14607456f8cb6c6a5462",
        "height": "274",
        "block_id": "c814eca7aba5796e836e8f927e2614484086293945d378e0f7a8ea7c6b889a6a",
        "type": 65,
        "timestamp": 55108730,
        "sender_public_key": "0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c",
        "sender_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "recipient_id": "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q",
        "amount": "0",
        "fee": "10000000",
        "signature": "f0e5cb2b832ff662c3da84b5fbb18860da4f6501679e6b2f1009f5dc24c6a75677a0fdc8812c4e9c28fbbe3f1f24b84089f366899811f365791474b5d49b2605",
        "sign_signature": null,
        "signatures": null,
        "confirmations": 453,
        "args": null,
        "message": "测试转账",
        "asset": {
          "aobTransfer": {
            "transaction_id": "8c8992ed2bc5e6b4aadbc0cd654eb5c4666566a9313a14607456f8cb6c6a5462",
            "transaction_type": 65,
            "timestamp": 55108730,
            "currency": "DDD.NCR",
            "amount": "10"
          }
        }
      },
      {
        "id": "b207914295302b8f590376f509afb07b8d7c33d6d8b423a13fe58a48a4f633d4",
        "height": "327",
        "block_id": "e10838cf705067e7e240599c18bb3c46ae7c1d4ef98d847187ee0a19f747b13d",
        "type": 62,
        "timestamp": 55109270,
        "sender_public_key": "0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c",
        "sender_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "recipient_id": null,
        "amount": "0",
        "fee": "10000000",
        "signature": "5121c6994af989454d00b87773f8df9b974438c1ebc923646a703e2acd8d8f5b856e6ad641aef3edd47f4df818a284984cbbf19c30f61bbfbce07db828dee501",
        "sign_signature": null,
        "signatures": null,
        "confirmations": 400,
        "args": null,
        "message": null,
        "asset": {
          "aobFlags": {
            "transaction_id": "b207914295302b8f590376f509afb07b8d7c33d6d8b423a13fe58a48a4f633d4",
            "transaction_type": 62,
            "timestamp": 55109270,
            "currency": "DDD.NCR",
            "flag": 1,
            "flag_type": 2
          }
        }
      }
    ],
    "total": 7
  }
}
```


说明：
    注意这里asset内容与type相关，60 <= type <= 65， 根据不同的type从asset中取出不同的值，详情如下：

```
type=60
"asset": {
          "aobIssuer": {
            "transaction_id": "3e36865ed64e19453b5f5d9523c0b6cd8e1e3a77bd890f1ba5426d3ccdc5f632",
            "transaction_type": 60,
            "timestamp": 55102937,
            "name": "DDD",
            "issuer_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
            "desc": "J G V"
          }
        }
展示： 注册了发行商"DDD"
```

```
type=61
"asset": {
          "aobAsset": {
            "transaction_id": "2198b87be0288161c3319bce379c7873f1b6adaab2c16b55847f9e6159413fe1",
            "transaction_type": 61,
            "timestamp": 55103637,
            "name": "DDD.NCR",
            "desc": "DDD新币种",
            "maximum": "100000000",
            "quantity": "50000000",
            "issuer_name": "DDD",
            "strategy": "",
            "precision": 2,
            "acl": 1,
            "writeoff": 1,
            "allow_writeoff": "1",
            "allow_whitelist": "1",
            "allow_blacklist": "1"
          }
        }
展示： 注册了资产"DDD.NCR"
```

```
type=62
"asset": {
          "aobFlags": {
            "transaction_id": "abdcca8e2d7120b8383021a6e94494d72bada96cbb2a6c77e228e9bbe310a97e",
            "transaction_type": 62,
            "timestamp": 55104595,
            "currency": "DDD.NCR",
            "flag": 1,
            "flag_type": 1
          }
        }
展示: 
如果flag_type==1 ： 资产DDD.NCR访问控制设置为(flag==0 ? 黑名单 ：白名单)
如果flag_type==2 ： 资产DDD.NCR被注销
```

```
type=63
"asset": {
          "aobAcl": {
            "transaction_id": "fd56923bdff348eb2d74d9736947fc5a98862b3f01fe0c7ad608819429902c84",
            "transaction_type": 63,
            "timestamp": 55105961,
            "currency": "DDD.NCR",
            "flag": 1,
            "operator": "+",
            "list": "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q"
          }
        }
展示：资产DDD.NCR更新了访问控制列表
```

```
type=64
"asset": {
          "aobIssue": {
            "transaction_id": "7a607625c9d3ddcadc1a645c4050a6e6f87bfe800990d28b5b96bac9a3701740",
            "transaction_type": 64,
            "timestamp": 55108465,
            "currency": "DDD.NCR",
            "amount": "50000000"
          }
        }
展示： 资产DDD.NCR新发行50000000(实际数量*精度)
```

```
type=65
"asset": {
          "aobTransfer": {
            "transaction_id": "8c8992ed2bc5e6b4aadbc0cd654eb5c4666566a9313a14607456f8cb6c6a5462",
            "transaction_type": 65,
            "timestamp": 55108730,
            "currency": "DDD.NCR",
            "amount": "10"
          }
        }
展示：转账10个DDD.NCR资产
```


   


#### **2.2.10 获取指定账户指定资产的余额** 
接口地址：/api/aobasset/balances/:address/:currency  
请求方式：get   
支持格式：urlencoded 

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|address|string|Y|Ddn地址|
|currency|string|Y|资产名字|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|result|dict|包含资产名、余额、最大发行量、精度、当前发行量、是否注销|
   
请求示例：   
```js   
curl -X GET -H "Content-Type: application/json"  'http://localhost:8001/api/aobasset/balances/DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ/DDD.NCR' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": {
    "id": 1,
    "address": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
    "balance": "49999990",
    "currency": "DDD.NCR"
  }
}
```

#### **2.2.11 获取指定账户指定资产转账记录** 
接口地址：/api/aobtransfer/transactions/my/:address/:currency  
请求方式：get   
支持格式：urlencoded  
备注：只返回资产转账记录  

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|address|string|Y|Ddn地址|
|currency|string|Y|资产名字|
|pageindex|integer|N|分页查询页数，默认1|
|pagesize|integer|N|分页查询每页大小，默认50|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|rows|list|交易列表，每个元素是一个字典代表一次交易，包含交易id、区块高度、区块id、交易类型、时间戳、发送者公钥、发送者id、接收者id（系统为空，如资产注册）、交易数量（资产交易都为0）、手续费0.1DDN、签名、多重签名、确认数、资产信息（包含发行商id、发行商名字、描述）、交易id。|  
|total|integer|资产交易总个数|  
   
请求示例：   
```js   
curl -X GET -H "Content-Type: application/json"  'http://localhost:8001/api/aobtransfer/transactions/my/DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ/DDD.NCR' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": {
    "rows": [
      {
        "id": "8c8992ed2bc5e6b4aadbc0cd654eb5c4666566a9313a14607456f8cb6c6a5462",
        "height": "274",
        "block_id": "c814eca7aba5796e836e8f927e2614484086293945d378e0f7a8ea7c6b889a6a",
        "type": 65,
        "timestamp": 55108730,
        "sender_public_key": "0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c",
        "sender_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "recipient_id": "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q",
        "amount": "0",
        "fee": "10000000",
        "signature": "f0e5cb2b832ff662c3da84b5fbb18860da4f6501679e6b2f1009f5dc24c6a75677a0fdc8812c4e9c28fbbe3f1f24b84089f366899811f365791474b5d49b2605",
        "sign_signature": null,
        "signatures": null,
        "confirmations": 442,
        "args": null,
        "message": "测试转账",
        "asset": {
          "aobTransfer": {
            "transaction_id": "8c8992ed2bc5e6b4aadbc0cd654eb5c4666566a9313a14607456f8cb6c6a5462",
            "transaction_type": 65,
            "timestamp": 55108730,
            "currency": "DDD.NCR",
            "amount": "10"
          }
        }
      }
    ],
    "total": 1
  }
}
```

#### **2.2.12 获取指定资产转账记录** 
接口地址：/api/aobtransfer/transactions/:currency  
请求方式：get   
支持格式：urlencoded  
备注：只返回指定资产转账记录 

请求参数说明：

|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|currency|string|Y|资产名字|
|pageindex|integer|N|分页查询页数，默认1|
|pagesize|integer|N|分页查询每页大小，默认50|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功 |  
|rows|list|交易列表，每个元素是一个字典代表一次交易，包含交易id、区块高度、区块id、交易类型、时间戳、发送者公钥、发送者id、接收者id（系统为空，如资产注册）、交易数量（资产交易都为0）、手续费0.1DDN、签名、多重签名、确认数、资产信息（包含发行商id、发行商名字、描述）、交易id。|  
|total|integer|该资产交易总数|  
   
请求示例：   
```js   
// 查询引力波资产absorb.YLB的所有转账记录 
curl -X GET -H "Content-Type: application/json" 'http://localhost:8001/api/aobtransfer/transactions/DDD.NCR' && echo
```   
   
JSON返回示例：   
```js  
{
  "success": true,
  "result": {
    "rows": [
      {
        "id": "8c8992ed2bc5e6b4aadbc0cd654eb5c4666566a9313a14607456f8cb6c6a5462",
        "height": "274",
        "block_id": "c814eca7aba5796e836e8f927e2614484086293945d378e0f7a8ea7c6b889a6a",
        "type": 65,
        "timestamp": 55108730,
        "sender_public_key": "0b5cfb77f401c818f7ebf02a0e88d52a28d3e4e24643e8a080c0c20ac45d0b9c",
        "sender_id": "DLbsdFXJNVa68SCAJxtGMaGdfBWkPALZzJ",
        "recipient_id": "DJS57PDiq2srYdL5eqzUt7oAZ4WvEkVT9q",
        "amount": "0",
        "fee": "10000000",
        "signature": "f0e5cb2b832ff662c3da84b5fbb18860da4f6501679e6b2f1009f5dc24c6a75677a0fdc8812c4e9c28fbbe3f1f24b84089f366899811f365791474b5d49b2605",
        "sign_signature": null,
        "signatures": null,
        "confirmations": 431,
        "args": null,
        "message": "测试转账",
        "asset": {
          "aobTransfer": {
            "transaction_id": "8c8992ed2bc5e6b4aadbc0cd654eb5c4666566a9313a14607456f8cb6c6a5462",
            "transaction_type": 65,
            "timestamp": 55108730,
            "currency": "DDD.NCR",
            "amount": "10"
          }
        }
      }
    ],
    "total": 1
  }
}
```   
