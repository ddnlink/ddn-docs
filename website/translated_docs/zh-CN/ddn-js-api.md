---
id: ddn-js-api
title: ddn-js Api
sidebar_label: ddn-js Api
original_id: ddn-js-api
---


## **1 ddn-js说明**

### **1.0 本文档适合的版本**

除非特殊说明，本文档仅仅适合于 `DDN v2.0.10` 以前的版本，当前最新版本为 `DDN v2.1.0-alpha`

### **1.1 ddn-js安装**

```js
npm install ddn-js // 正式开源之后的安装方法，请向官方申请
let DdnJS = require('ddn-js');
```

### **1.2 说明**
很多函数都需要传入secret、secondSecret这2个参数，分表代表密码和二级密码，下面章节不再赘述。
自定如下全局变量，用于之后章节代码演示。

- `secret` 密码    
- `publicKey` 公钥    
- `secondSecret` 二级密码

```js
let secret = 'lens domain skirt token enlist use witness eternal album dentist fresh dove'
let publicKey = '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161';
let secondSecret = 'helloworldDDN';
```

生成的json交易信息都需要通过http api进行广播。
- 主链交易通过 `POST /peer/transactions`
- dapp交易通过 `PUT /api/dapps/dappID/transactions/signed`


## **2 账户**  

### **2.1 根据密码获取密钥对**

`crypto.getKeys(secret)`

- `secret` 密码

```js
DdnJS.crypto.getKeys(secret)

{ publicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  privateKey: '75716dceb43074b586c1b90f56996b8f53b256c24925585b8b17e10353899d7d084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161' }
```

### **2.2 根据公钥获取地址**

`crypto.getAddress(publicKey)`

- `publicKey`  公钥

```js
 DdnJS.crypto.getAddress(publicKey);

'DAmubZohMoKRk2pSRXSpppxWiFXcpTSUiE'

```

### **2.3 检验地址是否符合规范**

`crypto.isAddress('DAmubZohMoKRk2pSRXSpppxWiFXcpTSUiE')`

- `address`  地址

```js
 DdnJS.crypto.isAddress(address);
true

```

### **2.4 设置二级密码,type=1**

`signature.createSignature(secret, secondSecret)`
`备注` 在主链的交易类型为1

- `secret` 密码    
- `secondSecret` 二级密码

```js
 DdnJS.signature.createSignature(secret, secondSecret)

{ type: 1,
  amount: 0,
  fee: 500000000,
  recipientId: null,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  timestamp: 40566038,
  asset: { signature: { publicKey: '632a41caf7d3c8d3754f27a11004acaea6f5571eed28b42451b5560ee91e991c' } },
  signature: 'ee42f4dc17ace4f76f86fba93c7d86b61a69de46ac96e102e9f93668c8cdd9e6281821c63cb3e0c23099968cccdcfd0197aaab42afba4a98fa696c17b133be06',
  id: '2237134c11b3cbaa9b7951f4afd47454ca04af2c7c6a030729ec63f75230e9ad' }

```
### **2.5 设置用户名,type=9**

`username.createUsername(name, secret, secondSecret)`
- `name` 用户昵称    
- `secret` 密码    
- `secondSecret` 二级密码

```js
 DdnJS.username.createUsernamee('huoding', secret, secondSecret)

{ type: 9,
  amount: 0,
  fee: 10000000,
  recipientId: null,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  timestamp: 40566038,
  asset: { 
    userinfo: { username: 'huoding' } 
  },
  signature: 'ee42f4dc17ace4f76f86fba93c7d86b61a69de46ac96e102e9f93668c8cdd9e6281821c63cb3e0c23099968cccdcfd0197aaab42afba4a98fa696c17b133be06',
  id: '2237134c11b3cbaa9b7951f4afd47454ca04af2c7c6a030729ec63f75230e9ad' }

```

### **2.6 账户锁仓,type=100**

`transaction.createLock(height, secret, secondSecret)`
`备注` 在主链的交易类型为100

- `height` 锁仓高度
- `secret` 密码
- `secondSecret` 二级密码

```js
 DdnJS.transaction.createLock(8130, secret, secondSecret)

{ type: 100,
  amount: 0,
  fee: 10000000,
  recipientId: null,
  args: [ '8130' ],
  timestamp: 40566287,
  asset: {},
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  signature: '06f6852d0e2e56ca441fa60b407aaa2197290ff096558c746c9c8bcdc971b8c4065ec08edd49c7292eca51849c16c5b8f0d33bb4ce972a932603dcf46a391e0e',
  signSignature: '3b645b0f6a2c597c55595669a856489c0c4f3a132c798c615b8e0241f3169a367edea7228ebc8915d5fd7a0571cc08c971d07520b9908c80c9b2c2c76ada5e07',
  id: 'c87d93af84939076a65a49c3b483897d262edc340b2d4184a4d2505b58711a91' }
```


## **3 普通交易transactions**  

### **3.1 在主链转账DDN,type=0**

`transaction.createTransaction(recipientId, amount, message, secret, secondSecret)`
`备注` 在主链的交易类型为0

- `recipientId` 接收者地址
- `amount` 转账数量
- `message` 转账附言
- `secret` 密码
- `secondSecret` 二级密码

```js
 let targetAddress = "D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L";  

 let amount = 100*100000000;   //100 DDN

 let message = 'notethis';

 DdnJS.transaction.createTransaction(targetAddress, amount, message, secret, secondSecret)
{ type: 0,
  amount: 10000000000,
  fee: 10000000,
  recipientId: 'D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L',
  message: 'notethis',
  timestamp: 40566970,
  asset: {},
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  signature: '9bef374be100fcfec59d245af59e5646ba5dcb79c6f1399ddd676a617542eeb45cc363822b84410e379f0caa501c25b66e59142353c04d23d1cb95cf64cef306',
  signSignature: '513e3efdbb65f8e60e85ca98d8d065ec9bd3bfa6f45a1f48cfade9c94d410338ee64bd55938c168b10f0749335c050312785dbf08882ffd0e40a65fde8c2b10b',
  id: '871554a8346d84cab2147324706d8ab5494fde928a7463a68d536ed6c0357897' }

```

## **4 受托人delegate**
### **4.1 注册受托人,type=2**

`delegate.createDelegate(username, secret, secondSecret)`
`备注` 在主链的交易类型为2

- `username` 受托人名字
- `secret` 密码
- `secondSecret` 二级密码

```js
 let userName='huoding'

 DdnJS.delegate.createDelegate(userName, secret, secondSecret || )

{ type: 2,
  amount: 0,
  fee: 10000000000,
  recipientId: null,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  timestamp: 40568017,
  asset: 
   { delegate: 
      { username: 'huoding',
        publicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161' } },
  signature: 'e471ade7ded7785f597821f8946d4e98da5ba4331505141c5bea5ff80bbf30b649218ef03254ac703ce93e15207c8b71c69c0d1400cb5790440860ed0e51a30a',
  signSignature: 'ec47d565a70e6ad075abaf1ff55c129bde9495e4cc7ab2a9404b698ef257f3b1cfd0ce4f9f1854a1bbfec0f663867823a544f80964e3be05ddf03a50a9b77d07',
  id: '774ccf5e7d9d9fefa459b23d96e10ffae4bb891e1e07912ac1370af04192e810' }
```

### **4.2 给受托人增加/取消投票,type=3**

`vote.createVote(keyList, secret, secondSecret)`
`备注` 在主链的交易类型为3

- `keyList` 受托人公钥列表
- `secret` 密码
- `secondSecret` 二级密码

```js
// 投票内容是一个列表，列表中的每一个元素是一个符号加上所选择的受托人的公钥，符号为+表示投票，符号为-表示取消投票
 let voteContent = [
...     '-ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7',
...     '+c292db6ea14d518bc29e37cb227ff260be21e2e164ca575028835a1f499e4fe2'
... ];


 transaction=DdnJS.vote.createVote(voteContent, secret, secondSecret || );
{ type: 3,
  amount: 0,
  fee: 10000000,
  recipientId: null,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  timestamp: 40568669,
  asset: { vote: { votes: [Array] } },
  signature: '66f6f3c4fbb8545df53ea35ff655fc1a28815591885757d0b735e77ed348caf33d8d9cb2895f85cd40bf2d3b4633f45a19ebd1dd130233305a603304a92ce003',
  signSignature: 'c026d373e026b524efd82ad1ab046708ee1ff68573f016490d12908f5ad00a97fa7501f46834c94f6dd64afd00aa77f9d29ded087977ac6601778d4aacb5cd0e',
  id: '0789524787384e2e4da7773afdd3871193a67303c4da69c4a9070eaa5676d36c' }
  
 transaction.asset.vote.votes
[ '-ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7',
  '+c292db6ea14d518bc29e37cb227ff260be21e2e164ca575028835a1f499e4fe2' ]

```

## **5 多重签名Multi-Signature** 

### **5.1 创建多重签名,type=8**

`multisignature.createMultisignature(keysgroup, lifetime, min, secret, secondSecret)`
`备注` 在主链的交易类型为8

- `keysgroup` 多重签名组成员
- `lifetime` 生命周期
- `min` 最小确认数

```js

// 多重签名组成员
const keysgroup = [
       '+feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6',
       '+c292db6ea14d518bc29e37cb227ff260be21e2e164ca575028835a1f499e4fe2',
       '+084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161'
    ];
const lifetime = 24  // 生命周期
const min = 2    // 最小确认数

const transaction = DdnJS.multisignature.createMultisignature(keysgroup, lifetime, min, secret, secondSecret);
{ type: 4,
  nethash: 'fl6ybowg',
  amount: '0',
  fee: '2000000000',
  recipientId: null,
  senderPublicKey: 'feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6',
  timestamp: 13392446,
  asset:
   { multisignature: { min: 2, lifetime: 24, keysgroup: [
      '+ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7',
      '+c292db6ea14d518bc29e37cb227ff260be21e2e164ca575028835a1f499e4fe2',
      '+084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161' 
    ] }
   },
  signature: 'a95d8c4029c1aab8ef3da1aaaaf8efac5fc4d1e22c2d0e5904f25a43b3a783b1a5a45026cb7778de8a6f21ed10e6b21cd936af082991030594664c57b243bb05' }

```
### **5.2 签名交易, todo**

## **6 存证Evidence** 适用于 v2.1.0-alpha

### **6.1 创建存证交易,type=8**

`evidence.createEvidence(evidence, secret, secondSecret)`
`备注` 在主链的交易类型为8

- `evidence` object


```js
let evidence = {
  ipid: "IPIDasdf20180501221md",
  title: "Evidencetitle",
  hash: "contenthash",
  author: "author1",
  url: "dat://helloworld/index.html",
  tags: "test, article",
  size: 12,
  type: "html"
}

 DdnJS.evidence.createEvidence(evidence, secret, secondSecret)
{ type: 8,
  amount: 0,
  fee: 10000000,
  recipientId: null,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  timestamp: 40578932,
  asset: { evidence: {
            ipid: "IPIDasdf20180501221md",
            title: "Evidencetitle",
            hash: "contenthash",
            author: "author1",
            url: "dat://helloworld/index.html",
            tags: "test, article",
            size: 12,
            type: "html"
          } 
        },
  signature: 'd7f3f29549542d6716bdb13e8e1f97e3965c6fbe34f1ee18dbdcad7ba9cbf83ee7cb2b7fcbaab5ffed5d569771731bb5a40efc4fabd142cb30becdad8bc8bb06',
  signSignature: '38315bf369540cc7a793139b1b6195f4c0e1512514d62bf028d454182a4b7a8912c1b1e6f617f6fb4ff8d80bd141a2ebb9dfcaa8fee68cfc81f8872611bba803',
  id: '4d0b04a6e380500903d8942622d57987661e72b2ae95464066d0af3f02c3c691' }
```

## **7 去中心化组织 Dao** 适用于 v2.1.0-alpha

### **7.1 创建媒体号,type=40**

`dao.createOrg(org, secret, secondSecret)`
`备注` 在主链的交易类型为8

- `orgId` 组织号id
- `name`  组织名称
- `state` 状态
- `url`   对应地址
- `tags`  关键词 


```js
const orgObj = {
			orgId: "mediaId",
    		name: "媒体号名称",
    		state: 0,
    		url: "dat://feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6",
    		tags: "['media','news']"
		}

 DdnJS.dao.createOrg(org, secret, secondSecret)

{ type: 40,
  nethash: 'fl6ybowg',
  amount: '0',
  fee: '40000000000',
  recipientId: null,
  senderPublicKey: 'feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6',
  timestamp: 13393798,
  asset:
   { org:
      { orgId: 'mediaid',
        name: '媒体号名称',
        state: 0,
        url: 'dat://feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6',
        tags: '[\'media\',\'news\']',
        address: 'EPaLrKWQ2piq7PAUK3JcdL7Up8SKznDYij' } },
  signature: '458e5249b3e5b2b28f951090d0d91bfb8300fbc25cb49472e3d8d2eaed9bc61291240972285aff161474d5b60fa5b878d23800638aaa1ca37475ece05db05c08',
  id: "0789524787384e2e4da7773afdd3871193a67303c4da69c4a9070eaa5676d36c" }
```

### **7.2 媒体号交易,type=41**
`dao.createTransfer(address,secret,secondSecret)`
`备注` 在主链的交易类型为41
- 
- `address` 接收地址


```js
let address = "DAmubZohMoKRk2pSRXSpppxWiFXcpTSUiE"
let amount = '20'

DdnJS.dao.createTransfer(address,secret,secondSecret)

 { type: 0,
  nethash: 'fl6ybowg',
  amount: '100000000000',
  fee: '10000000',
  recipientId: 'DAmubZohMoKRk2pSRXSpppxWiFXcpTSUiE',
  senderPublicKey: '5d036a858ce89f844491762eb89e2bfbd50a4a0a0da658e4b2628b25b117ae09',
  timestamp: 13395631,
  signature: '7658588496f46b3c8d9111655fd1b3512df675a54c305967e9223471f155f906b72bfc09365af5d92c4ac1790f35bbb7a173d9342cd93a2f4a16a1479ceeb90b' }
```

### **7.3 投稿交易,type=42**
`dao.createContribution(contribution, secret, secondSecret)`
`备注` 在主链的交易类型为42

- `title` 稿件标题
- `url`  地址
- `senderAddress` 投稿人地址
- `receivedAddress`   接收投稿人地址
- `price`  价格  


```js
const contribution = {
      title: '绝世好文',
      url:  'dat://feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6/post/绝世好文.html',
      senderAddress: 'EPaLrKWQ2piq7PAUK3JcdL7Up8SKznDYij',
      receivedAddress: 'DAmubZohMoKRk2pSRXSpppxWiFXcpTSUiE',
      price: '20'
    }

 DdnJS.dao.createContribution(contribution, secret, secondSecret)

{ type: 42,
  nethash: 'fl6ybowg',
  amount: '0',
  fee: '10000000',
  recipientId: null,
  senderPublicKey: 'feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6',
  timestamp: 13394338,
  asset:
   { daoContribution:
      { title: '绝世好文',
        url: 'dat://feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6/post/绝世好文.html',
        senderAddress: 'EPaLrKWQ2piq7PAUK3JcdL7Up8SKznDYij',
        receivedAddress: 'DAmubZohMoKRk2pSRXSpppxWiFXcpTSUiE',
        price: '20' } },
  signature: '6c3eee2613a27af1c90ccc82c595b5bf064ff12120bc41a72bcfccf3a13c4c097b9b40ab61bbeeb52567dec1ba5450742f4a056e441810dff6220573766d6707' }
```

### **7.4 确认投稿交易,type=43**
`dao.createConfirmation(amount, confirmation, phaseKey, undefined)`
`备注` 在主链的交易类型为43
- 
- `contributionTrsId` 投稿交易Id
- `url`  文章地址
- `senderAddress` 投稿人地址
- `receivedAddress`   接收投稿人地址
- `state`  状态  （接收:"1"，拒绝:"0"，未处理:''）


```js
let confirmation = {
    senderAddress: "EPaLrKWQ2piq7PAUK3JcdL7Up8SKznDYij",
    receivedAddress: "DAmubZohMoKRk2pSRXSpppxWiFXcpTSUiE",
    contributionTrsId: '0789524787384e2e4da7773afdd3871193a67303c4da69c4a9070eaa5676d36c',
    url: 'dat://feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6/post/绝世好文.html',
    state: '1'
}
let amount = '20'

DdnJS.dao.createConfirmation(amount, confirmation, phaseKey, undefined)

{ type: 43,
  nethash: 'fl6ybowg',
  amount: '20',
  fee: '10000000',
  recipientId: 'DAmubZohMoKRk2pSRXSpppxWiFXcpTSUiE',
  senderPublicKey: 'eeaba5752b4dd5c796ec41670af6a181ebb7f0892d2d46414a4a61921a546487',
  timestamp: 13395329,
  asset:
   { daoConfirmation:
      { senderAddress: 'EPaLrKWQ2piq7PAUK3JcdL7Up8SKznDYij',
        receivedAddress: 'DAmubZohMoKRk2pSRXSpppxWiFXcpTSUiE',
        contributionTrsId: '0789524787384e2e4da7773afdd3871193a67303c4da69c4a9070eaa5676d36c',
        url: 'dat://feed96739d8349f716f632dc6f9b70008fe1a97a43bf2f16fa07c277bde7e3d6/post/绝世好文.html',
        state: 1 } },
  signature: '7db9b6557b87416212d372cc15afcc0538ab31f889e1229e1d3e42e483dd1c8f532ae58e64760332af734fb7ad3a182736d775a0ef79b9bc586a66d84e015608',
  id: 'd16f5cfce58fc5b591b1de9406445b06d702b375bb1f067ea04be9f9815865a1' }
```

## **6 签名验证相关crypto**

自定义如下已签名的转账交易内容(在主链给D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L转账100DDN)，用于下面章节演示。

```js
 let targetAddress = "D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L";  
 let amount = 100*100000000;   //100 DDN
 let message = 'notethis';
 transaction = DdnJS.transaction.createTransaction(targetAddress, amount, message, secret, secondSecret)
{ type: 0,
  amount: 10000000000,
  fee: 10000000,
  recipientId: 'D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L',
  message: 'notethis',
  timestamp: 40566970,
  asset: {},
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  signature: '9bef374be100fcfec59d245af59e5646ba5dcb79c6f1399ddd676a617542eeb45cc363822b84410e379f0caa501c25b66e59142353c04d23d1cb95cf64cef306',
  signSignature: '513e3efdbb65f8e60e85ca98d8d065ec9bd3bfa6f45a1f48cfade9c94d410338ee64bd55938c168b10f0749335c050312785dbf08882ffd0e40a65fde8c2b10b',
  id: '871554a8346d84cab2147324706d8ab5494fde928a7463a68d536ed6c0357897' }
```
### **6.1 根据交易内容获取交易id**

`crypto.getId(transaction)`

- `transaction` 签名后的交易内容

```js
 DdnJS.crypto.getId(transaction)  
'871554a8346d84cab2147324706d8ab5494fde928a7463a68d536ed6c0357897'  // 返回结果，交易id

```

### **6.2 根据交易内容获取字节Buffer对象**

`crypto.getBytes(transaction, skipSignature, skipSecondSignature)`

- `transaction` 交易内容,可以是签名后也可是未签名的,默认需传入签名后的交易。必传参数
- `skipSignature` 是否跳过签名计算，默认不跳过。非必传参数
- `skipSecondSignature` 是否跳过二级密码签名计算，默认不跳过。非必传参数

```js
// 此时transaction.signature和transaction.signSignature都会计算在内
 DdnJS.crypto.getBytes(transaction) 
<Buffer 00 ba 00 6b 02 eb d4 c6 2e be 22 55 b7 ad 5e e4 31 20 a9 f9 19 1c 76 e3 09 28 c9 2c d5 36 35 1e 3c c2 c6 26 ed e3 04 2a 6f 3a 08 ae 89 00 e4 0b 54 02 ...    // 返回的字节buffer对象
```

### **6.3 根据交易内容获取Hash Buffer对象**

`crypto.getHash(transaction, skipSignature, skipSecondSignature)`

- `transaction` 交易内容,可以是签名后也可是未签名的,默认需传入签名后的交易。必传参数
- `skipSignature` 是否跳过签名计算，默认不跳过。非必传参数
- `skipSecondSignature` 是否跳过二级密码签名计算，默认不跳过。非必传参数

```js
// 此时transaction.signature和transaction.signSignature都会计算在内
 DdnJS.crypto.getHash(transaction)
<Buffer 87 15 54 a8 34 6d 84 ca b2 14 73 24 70 6d 8a b5 49 4f de 92 8a 74 63 a6 8d 53 6e d6 c0 35 78 97 // 返回的Hash Buffer
```

### **6.4 对交易Bytes Buffer进行签名**

`crypto.signBytes(bytes, keys)`

- `bytes` 交易的Bytes Buffer，未签名交易或者一级密码签名但二级密码未签名的交易
- `keys` 公钥/私钥 密钥对

```js
// 定义未签名交易
 let trs = { type: 0,  
...   amount: 10000000000,
...   fee: 10000000,
...   recipientId: 'D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L',
...   message: 'notethis',
...   timestamp: 40566970,
...   asset: {}}

// 根据密码，生成
 keys = DdnJS.crypto.getKeys(secret)
{ publicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  privateKey: '75716dceb43074b586c1b90f56996b8f53b256c24925585b8b17e10353899d7d084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161' }
 
 trs.senderPublicKey = keys.publicKey;
'084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161'

// 获取交易的Bytes Buffer
 buf = DdnJS.crypto.getBytes(trs)

// 通过私钥对交易Bytes Buffer进行签名
 signature = DdnJS.crypto.signBytes(buf,keys)
'9bef374be100fcfec59d245af59e5646ba5dcb79c6f1399ddd676a617542eeb45cc363822b84410e379f0caa501c25b66e59142353c04d23d1cb95cf64cef306'    // 返回值与上面自定义的已签名交易中的签名一致

```

### **6.5 验证交易签名是否和已存在的签名一致**

`crypto.verifyBytes(bytes, signature, publicKey)` 返回true/false

- `bytes` 交易的Bytes Buffer，未签名交易或者一级密码签名但二级密码未签名的交易
- `signature` 待校验的签名
- `publicKey` 签名者公钥

```js
// 沿用上一章节《对交易Bytes Buffer进行签名》的变量
 DdnJS.crypto.verifyBytes(buf,transaction.signature,transaction.senderPublicKey)
true // 本章最上面自定义的transaction签名一致
```

## **7 资产相关AOB**  

### **7.1 资产发行商注册,type=9**

`aob.createIssuer(name, desc, secret, secondSecret)`
`备注` 在主链的交易类型为9

- `name` 资产发行商名字
- `desc` 资产发行商描述

```js
let name = 'IssuerName'
let desc = 'IssuerDesc'
DdnJS.aob.createIssuer(name, desc, secret, secondSecret)
{
	"type": 9,
	"amount": 0,
	"fee": 10000000,
	"recipientId": null,
	"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",
	"timestamp": 19395607,
	"asset": {
		"aobIssuer": {
			"name": "IssuerName",
			"desc": "IssuerDesc"
		}
	},
	"signature": "c6ed2a4bafe2b8aa31f4aaceacc2a96cb028abbabb2ed062937498c58e24ca5467a340ddd63b67f809a680ff91b83e685c64991eb695494ddb2fdc57e5761607",
	"signSignature": "8eceacbd47c2b8ed335145ced19d7a3a51f99bdd6631d16ed214180c6f80e29bd6d572f45e7c7d685584e55cb5c303cf340406553ece28c9c0a2fa7a777aac0b"
}
```



### **7.2 资产注册,type=10**

`aob.createAsset(name, desc, maximum  , precision, strategy, secret, secondSecret)`
`备注` 在主链的交易类型为10

- `name` 资产名称，格式为：发行商名.资产名，是资产的唯一标识
- `desc` 资产描述
- `maximum` 资产可发行的上限值
- `precision` 精度，小数点的位数，这里上限是1000000，精度为3，代表资产IssuerName.CNY的最大发行量为1000.000
- `strategy` 发行策略策略，如没隔1年发行10%

```js
let name = 'IssuerName.CNY'
let desc = '资产描述'
let maximum = '1000000'
let precision = 3
let strategy = ''

DdnJS.aob.createAsset(name, desc, maximum  , precision, strategy, secret, secondSecret)
{
	"type": 10,
	"amount": 0,
	"fee": 10000000,
	"recipientId": null,
	"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",
	"timestamp": 19397444,
	"asset": {
		"aobAsset": {
			"name": "IssuerName.CNY",
			"desc": "资产描述",
			"maximum": "1000000",
			"precision": 3,
			"strategy": ""
		}
	},
	"signature": "c755587d331dd2eb62ef91dce1511d83a3e603c7cdc7548a16052519c21ea89c78364e35e5d46da0e2103fa2fb7f037eec55a5deba18826fa13e4252422d750e",
	"signSignature": "1b7ed4c21c477b8ff3d2acfdfd7ff85617093f4c21de70938c46b61c9704b037dbcf7f9e5f5dd1a5dc8f22cf473aaa459e6e5b15ced388b8a1da1e307987a509"
}
```



### **7.3 资产设置访问控制列表(acl)模式,type=11**

`aob.createFlags(currency, flagType, flag, secret, secondSecret)`
`备注` 在主链的交易类型为11

- `currency` 资产名称
- `flagType` 资产是否注销，1：流通，2：注销
- `flag` 访问控制列表的类型，0：黑名单， 1：白名单，资产创建后默认为黑名单模式

```js
let currency = 'IssuerName.CNY'
let flagType = 1
let flag = 1

DdnJS.aob.createFlags(currency, flagType, flag, secret, secondSecret)
{
	"type": 11,
	"amount": 0,
	"fee": 10000000,
	"recipientId": null,
	"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",
	"timestamp": 19400996,
	"asset": {
		"aobFlags": {
			"currency": "IssuerName.CNY",
			"flagType": 1,
			"flag": 1
		}
	},
	"signature": "b96fb3d1456e1f26357109cc24d82834eb9a4687f29e69c374bbb1d534568336e148cac52f213aa4d2a69185092f8e1143b49ec4b8048cd9b3af4e20f6ba0b08",
	"signSignature": "b37c77ebebe90341346be2aefe1e12bd7403e5d8f4d6e8f04630190b3e09494a28820da0ffd5f9ff011033aa6d70fc9bb4c159a4493be3b18fd7ff470103570d"
}
```

### **7.4 更新访问控制列表(acl),type=12**

`aob.createAcl(currency, operator, flag, list, secret, secondSecret)`
`备注` 在主链的交易类型为12

- `currency` 资产名称
- `operator` 操作符，'+'表示增加列表， ‘-’表示删除列表
- `flag` 访问控制列表的类型，0：黑名单， 1：白名单，资产创建后默认为黑名单模式
- `list` 待修改地址列表

```js
let currency = 'IssuerName.CNY'
let operator = '+'
let list = ['15745540293890213312']
let flag =1

DdnJS.aob.createAcl(currency, operator, flag, list, secret, secondSecret)
{
	"type": 12,
	"amount": 0,
	"fee": 20000000,
	"recipientId": null,
	"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",
	"timestamp": 19403125,
	"asset": {
		"aobAcl": {
			"currency": "IssuerName.CNY",
			"operator": "+",
			"flag": 1,
			"list": ["15745540293890213312"]
		}
	},
	"signature": "ad4060e04c1a12256de114e34499f8add24326753f1f8362991ee14aefc4c0fe90ff394d2db97e83770855a5688d463de00656fdd2d04604605cf3c04fdaca0e",
	"signSignature": "63129c58b1b9fcce88cbe829f3104a10ab06037253e9b65feb50ce0d2bb988533b93e8edcad016a85675f9027758fc318cf899ca7ef161a95a8d8a055ae83a02"
}
```

### **7.5 资产发行,type=13**

`aob.createIssue(currency, amount, secret, secondSecret)`
`备注` 在主链的交易类型为13

- `currency` 资产名称
- `amount` 本次发行量=真实数量（100）*10**精度（3），并且所有发行量之和 <= 上限*精度

```js
let currency = 'IssuerName.CNY'
let amount = '100000'

DdnJS.aob.createIssue(currency, amount, secret, secondSecret)
{
	"type": 13,
	"amount": 0,
	"fee": 10000000,
	"recipientId": null,
	"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",
	"timestamp": 19475744,
	"asset": {
		"aobIssue": {
			"currency": "IssuerName.CNY",
			"amount": "100000"
		}
	},
	"signature": "32b01a18eca2b0dc7e2ce77ba4e758eaae2532f60844760a762cc20918e7439ac6ca585b921db6ede833ed0bf1c62e30cec545a928abafe0b679183a6ad02202",
	"signSignature": "4fc290d7d7d788e9112a56233df0fe796cba39be3efa0cebf00cbc7e5bc5fd1369fad49e5698d967845b5c02e427926049cab25845d4d385e4a395791906f909"
}
```

### **7.6 资产转账,type=14**

`aob.createTransfer(currency, amount, recipientId, secret, secondSecret)`
`备注` 在主链的交易类型为14

- `currency` 资产名字
- `amount` 本次转账数（10000）=真实数量（10）*10**精度（3），需 <= 当前资产发行总量
- `recipientId` 收地址，需满足前文定义好的acl规则

```js
let currency = 'IssuerName.CNY'
let amount = '10000'
let recipientId = 'AKKHPvQb2A119LNicCQWLZQDFxhGVEY57a'
DdnJS.aob.createTransfer(currency, amount, recipientId, secret, secondSecret)
{
	"type": 14,
	"amount": 0,
	"fee": 10000000,
	"recipientId": "AKKHPvQb2A119LNicCQWLZQDFxhGVEY57a",
	"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",
	"timestamp": 19481489,
	"asset": {
		"aobTransfer": {
			"currency": "IssuerName.CNY",
			"amount": "10000"
		}
	},
	"signature": "77789071a2ad6d407b9d1e0d654a9deb6d85340a3d2a13d786030e26ac773b4e9b5f052589958d2b8553ae5fc9449496946b5c225e0baa723e7ddecbd89f060a",
	"signSignature": "f0d4a000aae3dd3fa48a92f792d4318e41e3b56cdbaf98649261ae34490652b87645326a432d5deb69f771c133ee4b67d2d22789197be34249e6f7f0c30c1705"
}
```

### **7.7 资产注销,type=11**

`aob.createTransfer(currency, amount, recipientId, secret, secondSecret)`
`备注` 在主链的交易类型为11

- `currency` 资产名字
- `flagType` 资产是否注销，1：流通，2：注销
- `flag` flag为黑、白名单模式

```js
let currency = 'IssuerName.CNY'
let flagType = 2
let flag =1

DdnJS.aob.createFlags(currency, flagType, flag, secret, secondSecret)
{
	"type": 11,
	"amount": 0,
	"fee": 10000000,
	"recipientId": null,
	"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",
	"timestamp": 19488690,
	"asset": {
		"aobFlags": {
			"currency": "IssuerName.CNY",
			"flagType": 2,
			"flag": 1
		}
	},
	"signature": "cbd656552417604704703e1236ec2bbed8eba6a2ccfcb54cc0b2d629c0a9d1335a264fc9f6dee1705f4a86c36a5ce2ba8e039d913a189b7c273c8ac0d9e3780c",
	"signSignature": "3c7b91d03efeed2dc86e1f2301da60789751c1be8850460d8c66c0ae8f55ea27d26f0bc79541d74b4777d9b85c518c1c73c0284dbf3e826db0a686560e57a80b"
}
```

## **8 dapp相关**

### **8.1 dapp注册,type=5**

`dapp.createDApp(options, secret, secondSecret)`
`备注` 在主链的交易类型为5

- `options` dapp的基本属性，如名字、url、icon、预置的受托人公钥、dapp类型、dapp tag等信息
- `secret` 密码
- `secondSecret` 二级密码

```js
 let options = { name: 'ddn-dapp-test',
...   link: 'https://github.com/ddnlink/ddn-dapp-test/archive/master.zip',
...   category: 1,
...   description: 'Decentralized news channel',
...   tags: 'ddn,dapp,demo,cctime',
...   icon: 'http://yourdomain.com/hello.png',
...   type: 0,
...   delegates: 
...    [ '8b1c24a0b9ba9b9ccf5e35d0c848d582a2a22cca54d42de8ac7b2412e7dc63d4',
...      'aa7dcc3afd151a549e826753b0547c90e61b022adb26938177904a73fc4fee36',
...      'e29c75979ac834b871ce58dc52a6f604f8f565dea2b8925705883b8c001fe8ce',
...      '55ad778a8ff0ce4c25cb7a45735c9e55cf1daca110cfddee30e789cb07c8c9f3',
...      '982076258caab20f06feddc94b95ace89a2862f36fea73fa007916ab97e5946a' ],
...   unlockDelegates: 3 };


 trs=DdnJS.dapp.createDApp(options, secret);
{ type: 5,
  amount: 0,
  fee: 10000000000,
  recipientId: null,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  timestamp: 40572296,
  asset: 
   { dapp: 
      { category: 1,
        name: 'ddn-dapp-test',
        description: 'Decentralized news channel',
        tags: 'ddn,dapp,demo',
        type: 0,
        link: 'https://github.com/ddnlink/ddn-dapp-test/archive/master.zip',
        icon: 'http://yourdomain.com/hello.png',
        delegates: [Array],
        unlockDelegates: 3 } },
  signature: '5a8e2dba5e14b4ec62ce1b8543de2796d3cded249ed899c5049dd0adeff00963dd40436e7cfc6f9952e09d5c6ac8f5144d3e568f263586520c68012d3c7ca509',
  id: 'ecf9366a128408b843f0e6b2bd7261a4d602c32ae36a8c3cef609e904f180735' }
 trs.asset.dapp.delegates
[ '8b1c24a0b9ba9b9ccf5e35d0c848d582a2a22cca54d42de8ac7b2412e7dc63d4',
  'aa7dcc3afd151a549e826753b0547c90e61b022adb26938177904a73fc4fee36',
  'e29c75979ac834b871ce58dc52a6f604f8f565dea2b8925705883b8c001fe8ce',
  '55ad778a8ff0ce4c25cb7a45735c9e55cf1daca110cfddee30e789cb07c8c9f3',
  '982076258caab20f06feddc94b95ace89a2862f36fea73fa007916ab97e5946a' ]
```

### **8.2 dapp充值,type=6**

`transfer.createInTransfer(dappid, currency, amount, secret, secondSecret);`
`备注` 在主链的交易类型为6

- `dappid` dapp的id
- `currency` 充值的资产名
- `amount` 充值的数量

```js
let dappid = "bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024";  
let currency = "DDN";  
let amount = 10*100000000 ;  

 DdnJS.transfer.createInTransfer(dappid, currency, amount, secret, secondSecret || ); 
{ type: 6,
  amount: 1000000000,
  fee: 10000000,
  recipientId: null,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  timestamp: 40578327,
  asset: 
   { inTransfer: 
      { dappId: 'bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024',
        currency: 'DDN' } },
  signature: '6907c1402c702e0fd504a8734a047c1bb216d437e65d5675325846b92ef8b916fc634ea7e33a7c72c60c058d1496d0385c95e39a8291e27b2dceb2f40b6aed02',
  signSignature: '86de438431c639124a13429e8c6a8c13a5cbbbab3a8323ae08b56f65faeff6d816815d7cdecfdb7287077b14e4d14865637efc9d7fd72d085b0aa9d82f27170c',
  id: '25be71c296430a409cfeaf1ffaa957d18793f3695db07a846c22a7c467c45994' }
```

### **8.3 dapp内部合约调用**

`dapp.createInnerTransaction(options, secret)`

- `options` 合约相关的选项，如手续费、合约编号、合约字符串数组参数
- `secret` 密码

自定如下全局变量，用于下面子章节代码演示。

```js
 let fee = String(0.1 * 100000000);    // 目前dapp内置合约调用的手续费统一为10000000 对应的资产
```

#### **8.3.1 dapp提现,合约type=2**

`args` '["资产名字","提现数额"]'

```js
 let type = 2; // 这里的type指的是合约标号，而非主链的交易类型
 let options = {fee: fee, type: type, args: '["YourAoB.CNY", "100000000"]'}; 

 DdnJS.dapp.createInnerTransaction(options, secret);  
{ fee: '10000000',
  timestamp: 40572732,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  type: 2,
  args: '["YourAoB.CNY", "100000000"]',
  signature: 'a0d860a0c13cf40d6be08f42a66bf01264f96fadc8ed2997139c583ba7fcd5e7ceeda9207c635215ddfd60bde8c35914cdfe2b03a4862cdd187b9142d497c301' }
```

#### **8.3.2 dapp内部转账,合约type=3**

`args` '["资产名字","转账数额","接收地址"]'

```js
 let type = 3;
 let options = {fee: fee, type: type, args: '["YourAoB.CNY", "100000000", "A6H9rawJ7qvE2rKwQfdtBHdeYVehB8gFzC"]'}; 

 DdnJS.dapp.createInnerTransaction(options, secret);  
{ fee: '10000000',
  timestamp: 40573272,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  type: 3,
  args: '["YourAoB.CNY", "100000000", "A6H9rawJ7qvE2rKwQfdtBHdeYVehB8gFzC"]',
  signature: '3843bef77ad7c6f2b57083270055720186b8ba286cd44e263028eef9b8650ecf6d243c1861f9b9416e123b594695934430deb0f5146a173ebfcdccb6915acf0c' }

```

#### **8.3.4 dapp内设置昵称,合约type=3**

`args` '["昵称"]'

```js
 let type = 4;
 let options = {fee: fee, type: type, args: '["nickname"]'}; 

 DdnJS.dapp.createInnerTransaction(options, secret);  
{ fee: '10000000',
  timestamp: 40573343,
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  type: 4,
  args: '["nickname"]',
  signature: '172998ddbb2ef72037be673d658dbc64760da307d451257666c956868b142707cd4aa38668b52d1d0d7cc62c01866daef2bae8d427844194d42ca9fea97ea70b' }
```

### **8.4 dapp提现**
#### **8.4.1 创建提现交易,type=7**

`transfer.createOutTransfer(recipientId, dappId, transactionId, currency, amount, secret, secondSecret)`
`备注` 在主链的交易类型为7，该接口一般由dapp受托人来调用（受托人每隔10秒扫描侧链上由智能合约所创建的提现交易，发现后则在主链创建type=7的提现交易），所以一般情况下开发人员用不到。

- `recipientId` 提现接收者id
- `dappId` dapp id
- `transactionId` 提现交易id,该交易id是编号为2的智能合约在侧链dapp上所创建的
- `currency` 提现资产名(DDN或者UIA)
- `amount` 提现数额

```js
let recipientId = 'D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L';
let dappId = 'bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024';
let transactionId = '123b04a6e380500903d8942622d57987661e72b2ae95464066d0af3f02c3c691';
let currency = 'DDN'
let amount = '10000000'

 transaction = DdnJS.transfer.createOutTransfer(recipientId, dappId, transactionId, currency, amount, secret, secondSecret);
{ type: 7,
  amount: 0,
  fee: 10000000,
  recipientId: 'D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L',
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  timestamp: 40668981,
  asset: 
   { outTransfer: 
      { dappId: 'bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024',
        transactionId: '123b04a6e380500903d8942622d57987661e72b2ae95464066d0af3f02c3c691',
        currency: 'DDN',
        amount: '10000000' } },
  signature: '432d25e5c5b81fa3a5937adca2dd4a1e2a38e51f8896838601902e0c123a5ccb664bbc8a55344b9fedb773da98e0988e4e8d1ca99dcbc51a80ea3bc9a6b61806',
  signSignature: '8154c1f8305b9b957974e778de1e08dd3f08afcb70f27624d1385dbae9dfa6d0a3aaed6211ed8a40f4015f7e47312f0f205d94518c68e4deec8d76567f56f10f',
  id: '237925a60ccc0abfc1494720aab8c11c74ba61e8ab3ca4bd8ded8c3215c201a7' }

```

#### **8.4.2 受托人对提现交易进行签名**

`transfer.signOutTransfer(transaction, secret)`
`备注` dapp提现交易，需要多个受托人签名后才能生效。受托人签名的最小数量取决于dapp的注册参数：unlockDelegates。受托人每隔10秒扫描侧链上由智能合约所创建的提现交易，发现有交易且签名个数未满足时，会对其进行签名。一般情况下普通开发人员用不到。

- `transaction` transfer.createOutTransfer生成的提现交易
- `secret` 受托人密码

```js
// 沿用上一章节《6.4.1 创建提现交易,type=7》的变量
transaction.signatures = [] // 受托人签名列表

// 第1个受托人对提现交易transaction进行签名
delegate1_secret = 'chalk flame jeans rebuild dutch stone abstract capital lucky pottery raven depend'
 signature1 = DdnJS.transfer.signOutTransfer(transaction,delegate1_secret);
'ac0ea4c10b911f2134e5adfb3535ffc070ffa8f2858a5a1bc4e9bef442863e117e6bce552bba0d5b0160c4076dd3c657ebc33cbe077a8ef719798a8bb0fac30c'
transaction.signatures.push(signature1) // 将签名加入到transaction的签名列表中
// 第2个受托人对提现交易transaction进行签名
delegate2_secret = 'twist arrange matter twice daughter cave cause never enough scare warfare uncover'
 signature2 = DdnJS.transfer.signOutTransfer(transaction,delegate2_secret);
'480e0717e4be02e48a27e2323bf6507c4c72d1033b4e7e674651e9e4feced17836f0b81b91ade99b61620a2766ecc901f090d81cc72d22b86807ae981eb2d10c'
transaction.signatures.push(signature2) // 将签名加入到transaction的签名列表中
// 依次类推，多个受托人都对该交易进行签名，当满足最小签名个数时，该提现交易才会真正生效
 transaction
{ type: 7,
  amount: 0,
  fee: 10000000,
  recipientId: 'D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L',
  senderPublicKey: '084a61dfb043b5e1b84199f16481512ebe67dc7d8cd52d9aa32f537dfb729161',
  timestamp: 40669013,
  asset: 
   { outTransfer: 
      { dappId: 'bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024',
        transactionId: '123b04a6e380500903d8942622d57987661e72b2ae95464066d0af3f02c3c691',
        currency: 'DDN',
        amount: '10000000' } },
  signature: '1dfae733408d374cd7be5f4b55183c0c05dc31341f93daaf82c26c80ab11035202502180dd78c5643edcd3bb481a38f352408bc35e44e6c1c53c95612fbca804',
  signSignature: '8f4f7aa06c02c0a3d637329e1a3b23489b91797b9f3477afd4314b2f78d1e8e8a369a640d75916bd9477e69363cf440c27124db615dced1701a1a934714afe05',
  id: '95a0c4ac9d5397452629b89410413f54ed37caee84a13edf3c9c26d3d0606dab',
  signatures: 
   [ 'ac0ea4c10b911f2134e5adfb3535ffc070ffa8f2858a5a1bc4e9bef442863e117e6bce552bba0d5b0160c4076dd3c657ebc33cbe077a8ef719798a8bb0fac30c',
     '480e0717e4be02e48a27e2323bf6507c4c72d1033b4e7e674651e9e4feced17836f0b81b91ade99b61620a2766ecc901f090d81cc72d22b86807ae981eb2d10c' ]  // 受托人签名数组
    }
```

## **9 其它**

### **9.1 全局参数变量options**

#### **9.1.1 设置变量k/v**
`options.set(key, values)`

- `key` 键名
- `value` 键值

```js
 DdnJS.options.set('nethash','fl6ybowg')


```


#### **9.1.2 根据key获取value**

`options.get(key)`

- `key` 键名

```js
 DdnJS.options.get('nethash')
'fl6ybowg'

```


#### **9.1.3 获取所有的k/v**

`options.getAll()`

```js
 DdnJS.options.getAll()
{ 
  clientDriftSeconds: 5,    // ddn-js内置变量
  nethash: "fl6ybowg",
}

```

### **9.2 时间相关slot.time**

#### **9.2.1 DDN主网创世块生成时间**

`utils.slots.beginEpochTime()`
`备注` 结果为UTC时间,即DDN纪元的开始时间。

```js
DdnJS.utils.slots.beginEpochTime()
Wed Jun 06 2018 20:20:20 GMT+0800 (中国标准时间) // DDN主网创世块（block heihgt=1）生成时间，但主网正式运行可以延后（主网正式运行的标志是 生成了block heihgt=2的区块）
```


#### **9.2.2 根据unix时间戳获获DDN时间戳**

`utils.slots.getTime(time)` 
`备注` 获得结果叫做EpochTim（DDN时间戳），传入的time相对于DDN纪元经历的秒数

- `time` 如果不传值则取当前时刻的 Unix时间戳*1000 (即单位是毫秒）

```js
// 获取当前DDN时间戳
 DdnJS.utils.slots.getTime()
13386186 

// 通过unix_timestamp时间戳获取DDN时间戳
let unix_timestamp = 1541672001
let epochTime = DdnJS.utils.slots.getTime(unix_timestamp * 1000)
13384380    // DDN时间戳

// 通过时间对象获取对应DDN时间戳
 let now = new Date()
 epochTime = DdnJS.utils.slots.getTime(now)
 13384381
```

#### **9.2.3 根据DDN时间戳获取unix时间戳**

`utils.slots.getRealTime(epochTime)`
`备注` 返回结果是真实的 unix时间戳* 1000

- `epochTime` DDN时间戳，单位是秒

```js
let unix_timestamp = 1541672001  // unix时间戳
let epochTime = DdnJS.utils.slots.getTime(unix_timestamp * 1000)
13384380    // 通过unix时间戳获取到DDN时间戳
let real_time = DdnJS.utils.slots.getRealTime(epochTime)
1541672001000 // 通过DDN时间戳获取unix时间戳

 unix_timestamp === real_time/1000
true // 换算结果一致
```

#### **9.2.4 时间格式化**

`utils.format.fullTimestamp(epochTime)`
`备注` 返回结果是真实的 unix时间戳* 1000

- `epochTime` DDN时间戳，单位是秒

```js
 let unix_timestamp = 1507713496  // unix时间戳
 let formattedTime = DdnJS.utils.format.fullTimestamp(13384380)
"2018/11/08 18:13:20"
```

#### **9.2.5 显示间隔时间**

`utils.format.timeAgo(epochTime)`
`备注` 返回结果是 ... seconds/mins/hours/days ago

- `epochTime` DDN时间戳，单位是秒

```js
let epochTime = 13384380  // unix时间戳
let diffTime = DdnJS.utils.format.fullTimestamp(13384380)
"33 mins ago"
```
