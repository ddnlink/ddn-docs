ddn-cli使用文档  
=================


# 目录

<!-- TOC -->

- [ddn-cli使用文档 ](#ddn-cli)
- [目录](#)
    - [1 ddn-cli简介](#1-ddn-cli)
    - [2 ddn-cli的安装](#2-ddn-cli)
    - [3 ddn-cli使用说明](#3-ddn-cli)
    - [4 ddn-cli支持的选项](#4-ddn-cli)
        - [4.1 打印帮助文档](#41)
        - [4.2 打印ddn-cli版本号](#42-ddn-cli)
        - [4.3 指定要连接的ddn服务器主机名或者ip](#43-ddnip)
        - [3.4 指定要连接的ddn服务器的端口](#34-ddn)
        - [3.5 指定主链](#35)
    - [4 ddn-cli支持的命令](#4-ddn-cli)
        - [4.1 区块链blockchain](#41-blockchain)
            - [4.1.1 查看区块链高度](#411)
            - [4.1.2 查看区块链状态](#412)
            - [4.1.3 查看节点信息](#413)
            - [4.1.4 获取本机连接的所有节点信息](#414)
            - [4.1.5 全网受托人状态](#415)
            - [4.1.6 查看全网节点的ip归属](#416-ip)
            - [4.1.7 创建创世块文件](#417)
        - [4.2 账户account](#42-account)
            - [4.2.1 根据密码查看账户信息](#421)
            - [4.2.2 根据公钥查看账户信息](#422)
            - [4.2.3 根据地址查看账户余额](#423)
            - [4.2.4 根据地址查看账户信息](#424)
            - [4.2.5 查看账户地址投了哪些受托人](#425)
            - [4.2.6 加密相关](#426)
            - [4.2.7 账户锁仓](#427)
        - [4.3 受托人delegate](#43-delegate)
            - [4.3.1 查看全部受托人个数](#431)
            - [4.3.2 查看受托人详情并排序](#432)
            - [4.3.3 根据受托人公钥查看都是谁为他投了票](#433)
            - [4.3.4 根据公钥查看受托人详情](#434)
            - [4.3.5 根据名字查看受托人详情](#435)
            - [4.3.5 注册受托人 **Fixme**](#435--fixme)
            - [4.3.6 给受托人投票](#436)
            - [4.3.7 给受托人取消投票](#437)
        - [4.4 区块block](#44-block)
            - [4.4.1 查看(分析)全网区块信息](#441)
            - [4.4.2 根据区块id查看区块详情 **Note**](#442-id-note)
            - [4.4.3 根据区块高度查看区块详情](#443)
            - [4.4.4 根据区块id查看区块详情-包含交易信息](#444-id)
            - [4.4.5 根据区块高度查看区块详情-包含交易信息](#445)
            - [4.4.6 验证区块文件字节](#446)
            - [4.4.7 验证区块文件payloadhash](#447-payloadhash)
            - [4.4.8 验证区块文件区块id](#448-id)
            - [4.4.8 验证区块签名是否通过](#448)
        - [4.5 交易transaction](#45-transaction)
            - [4.5.1 根据公钥查看未确认的交易](#451)
            - [4.5.2 查看（分析）全网交易信息](#452)
            - [4.5.3 根据交易id查看交易详情](#453-id)
            - [4.5.4 转账](#454)
            - [4.5.5 设置二级密码](#455)
            - [4.5.6 验证交易文件bytes](#456-bytes)
            - [4.5.7 验证交易文件id](#457-id)
            - [4.4.8 验证交易签名是否通过](#448)
        - [4.6 侧链dapp](#46-dapp)
            - [4.6.1 注册dapp](#461-dapp)
            - [4.6.2 dapp充值](#462-dapp)
            - [4.6.3 智能合约的增删](#463)
            - [4.6.4 dapp交易](#464-dapp)
            - [4.6.5 dapp创建安装相关](#465-dapp)

<!-- /TOC -->

## 1 ddn-cli简介

>ddn-cli是DDN系统的一个命令行工具，只需要根据提示输入一些配置项，就可以快速的建立一个侧链，并可在侧链上开发任意类型的应用。其次，系统还提供了一系列的 api 帮助用户构建复杂的智能合约应用，这些 api 涵盖共识、强随机数、数据库、密码学等方面。


## 2 ddn-cli的安装
sudo apt-get install npm    #安装js软件包管理器npm

npm install -g ddn-cli     #（正式版将上传服务器）国内服务器可以考虑加上 “--registry=http://registry.npm.taobao.org” 参数加快安装速度

## 3 ddn-cli使用说明
ddn-cli [选项] [命令]

## 4 ddn-cli支持的选项
### 4.1 打印帮助文档 
参数值： -h, --help

返回值： ddn-cli命令或者子命令的帮助文档

使用方法：ddn-cli -h(查看ddn-cli帮助文档);ddn-cli 子命令 -h(查看子命令的帮助文档)

示例:
 
```
ubuntu@ddn:~# ddn-cli -h #查看ddn-cli帮助信息
  Usage: ddn-cli [options] [command]
  Commands:

    getheight                              get block height
    getblockstatus                         get block status
    openaccount [secret]                   open your account and get the infomation by secret
    openaccountbypublickey [publickey]     open your account and get the infomation by publickey
    getbalance [address]                   get balance by address
    getaccount [address]                   get account by address
    getvoteddelegates [options] [address]  get delegates voted by address
    getdelegatescount                      get delegates count
    getdelegates [options]                 get delegates
    getvoters [publicKey]                  get voters of a delegate by public key
    getdelegatebypublickey [publicKey]     get delegate by public key
    getdelegatebyusername [username]       get delegate by username
    getblocks [options]                    get blocks
    getblockbyid [id]                      get block by id
    getblockbyheight [height]              get block by height
    getpeers [options]                     get peers
    getunconfirmedtransactions [options]   get unconfirmed transactions
    gettransactions [options]              get transactions
    gettransaction [id]                    get transactions
    sendmoney [options]                    send money to some address
    registerdelegate [options]             register delegate
    upvote [options]                       vote for delegates
    downvote [options]                     cancel vote for delegates
    setsecondsecret [options]              set second secret
    registerdapp [options]                 register a dapp
    contract [options]                     contract operations
    crypto [options]                       crypto operations
    dapps [options]                        manage your dapps
    creategenesis [options]                create genesis block
    peerstat                               analyze block height of all peers
    delegatestat                           analyze delegates status
    ipstat                                 analyze peer ip info

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -H, --host <host>  Specify the hostname or ip of the node, default: 127.0.0.1
    -P, --port <port>  Specify the port of the node, default: 8000
    -M, --main         Specify the mainnet, default: false

ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getvoteddelegates -h #查看子命令帮助
  Usage: getvoteddelegates [options] [address]
  get delegates voted by address
  Options:

    -h, --help        output usage information
    -o, --offset <n>  
    -l, --limit <n>   
```

### 4.2 打印ddn-cli版本号 
参数值： -V, --version

返回值： ddn-cli命令的版本号

使用方法：ddn-cli -V

示例:
 
```    
ubuntu@ddn:~# ddn-cli -V
2.0.0
```

### 4.3 指定要连接的ddn服务器主机名或者ip
参数值： -H, --host <host>   默认：127.0.0.1 

返回值： 无

使用方法：ddn-cli -H 47.94.93.132 [子命令]

示例:

```      
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 getheight     #查看47.94.93.132服务器最新的区块高度
101236
```

### 3.4 指定要连接的ddn服务器的端口
参数值： -P, --port <port>   默认：8000

返回值： 无

使用方法：ddn-cli -P 8000 [子命令]

示例:

```
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getheight  
102313
```

### 3.5 指定主链
参数值： -M, --main     默认：测试链

返回值： 无

使用方法：ddn-cli -H 47.94.93.132 -P 8001 -M [子命令]

示例:

```    
ubuntu@ddn:~# ddn-cli -M -H *.*.*.105 -P 8001 getheight  #查看DDN主链区块高度
9388
```


## 4 ddn-cli支持的命令
### 4.1 区块链blockchain
#### 4.1.1 查看区块链高度
命令值： getheight

返回值： 区块链高度

使用方法：ddn-cli getheight

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getheight
105387
```

#### 4.1.2 查看区块链状态
命令值： getblockstatus

返回值： json字符串，包含区块链高度、交易费、里程碑、受托人每块奖励、当前总量

使用方法：ddn-cli getblockstatus

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getblockstatus
{
  "success": true,
  "height": 1391347,
  "fee": 10000000,
  "milestone": 0,
  "reward": 500000000,
  "supply": 10695637000000000
}
```

#### 4.1.3 查看节点信息
命令值： getpeers [options] 

返回值： 列表，包含节点ip、端口、os、ddn版本等信息

使用方法：ddn-cli getpeers -o 偏移量数字 -l限制个数数字 -t 状态值 -s 排序 -v 版本 -p 端口 --os os版本 #详情请参考ddn-cli getpeers -h帮助信息

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getpeers -o 1 -l 2 
[
  {
    "ip": "47.94.93.132",
    "port": 8000,
    "state": 2,
    "os": "linux4.4.0-85-generic",
    "version": "2.0.2"
  },
  {
    "ip": "47.94.146.43",
    "port": 8000,
    "state": 2,
    "os": "linux4.4.0-85-generic",
    "version": "2.0.2"
  }
]
```


#### 4.1.4 获取本机连接的所有节点信息
命令值： peerstat

返回值： 节点信息，包含节点ip、端口、版本、区块高度等信息

备注：展示节点只是和本机有连接的节点，并不是全网所有的节点

使用方法：ddn-cli peerstat

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 peerstat
47.74.145.177:8000 2.0.2 13913
207.246.113.86:8000 2.0.2 13913
63.142.253.225:8000 2.0.2 13913
======================================
1* height: 13913
1 height: 13914 120.26.99.85:8000
```

#### 4.1.5 全网受托人状态
命令值： delegatestat

返回值： 受托人信息，包含全网受托人的名字、地址、投票、生产率、区块生成个数、区块高度、id、上一次生成区块的时间等信息

使用方法：ddn-cli 

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 delegatestat
name	address	rate	approval	productivity	produced	height	id	time
nayimoliuguang	3331976396377269399	93	88.36%	98.39%	1037	105618	12962348710289833740	2016/08/17 21:07:20(1 hour ago)
jack	3705405381126069457	86	88.36%	99.41%	506	105628	5876778147855073736	2016/08/17 21:09:00(1 hour ago)
node_3	12796761013870716784	81	88.36%	80.51%	814	105784	4575518649204137595	2016/08/17 21:38:10(40 mins ago)
wgl_003	9961157415582672274	2	98.65%	99.24%	1047	105852	11175724889329116017	2016/08/17 21:49:40(28 mins ago)
xihulongjing	12676662200687508271	59	88.36%	76.92%	150	105853	15273855606472618453	2016/08/17 21:49:50(28 mins ago)
liangpeili	4514546945474752928	50	88.37%	99.68%	627	105855	3771943180359756069	2016/08/17 21:50:10(28 mins ago)
ddn_tea1	8812460086240160222	4	98.58%	98.79%	1059	105857	14968719538781965695	2016/08/17 21:50:30(27 mins ago)
intmaster	7321911740133937168	97	88.36%	100%	1032	105871	6757656887343300317	2016/08/17 21:52:50(25 mins ago)
mode_6	9248745407080572308	8	88.48%	100%	1060	105873	3777454410915098884	2016/08/17 21:53:10(25 mins ago)
```

#### 4.1.6 查看全网节点的ip归属
命令值： ipstat

返回值： 节点ip归属地

使用方法：ddn-cli ipstat

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 ipstat
中国    CN
中国    CN
香港    HK
新加坡  SG
中国    CN
中国    CN
中国    CN
中国    CN
美国    US
美国    US
...
```

#### 4.1.7 创建创世块文件
命令值： creategenesis [options]

返回值： 在当前目录生成genesisBlock.json创世块文件、genGenesisBlock.log创世块日志

使用方法：ddn-cli creategenesis

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 creategenesis 
ubuntu@ddn:~# more genesisBlock.json
{
  "version": 0,
  "totalAmount": 10000000000000000,
  "totalFee": 0,
  "reward": 0,
  "payloadHash": "b3be0441f2111ddb2fcd602b686ea3e617fcaa41250bdaedd0db235c61da6f5c",
  "timestamp": 0,
  "numberOfTransactions": 103,
...
}
```

### 4.2 账户account
#### 4.2.1  根据密码查看账户信息
命令值： openaccount [secret]

返回值： json字符串，含地址、余额、公钥、二级公钥等信息

使用方法：ddn-cli openaccount "密码"

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 openaccount "hello world"
{
  "address": "DBcVxL6X5p1v2PGyos12xrHNnYYRSHTjWg",
  "balance": 0,
  "publicKey": "cf74826ffd487a1010bc90950087d8730a3c900fd31baf1f6377f15034590f87",
  "secondSignature": "",
  "secondPublicKey": "",
  "multisignatures": "",
  "u_multisignatures": "",
  "lockHeight": 0
}
```

#### 4.2.2 根据公钥查看账户信息
命令值： openaccountbypublickey [publickey]

返回值： json字符串，含地址、余额、二级公钥等信息

使用方法：ddn-cli openaccountbypublickey "公钥"

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 openaccountbypublickey "bd1e78c5a10fbf1eca36b28bbb8ea85f320967659cbf1f7ff1603d0a368867b9"
{
  "address": "DQUtaQb5oJcEn7zGugyDqpb4X64pTH2cq",
  "balance": 0,
  "publicKey": "bd1e78c5a10fbf1eca36b28bbb8ea85f320967659cbf1f7ff1603d0a368867b9",
  "secondSignature": "",
  "secondPublicKey": "",
  "multisignatures": "",
  "u_multisignatures": "",
  "lockHeight": 0
}
```

#### 4.2.3 根据地址查看账户余额
命令值： getbalance [address]

返回值： 整型数字，除以100000000后为大家平时所说的余额

使用方法：ddn-cli getbalance 账户地址

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getbalance D5uDdWFo2BwM4p9sWwQFedJaX8yHhB2rvx
936415850000
```

#### 4.2.4 根据地址查看账户信息
命令值： getaccount [address]

返回值： json字符串，含地址、余额、公钥、二级公钥等信息

使用方法：ddn-cli getaccount 账户地址

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getaccount D5uDdWFo2BwM4p9sWwQFedJaX8yHhB2rvx
{
  "address": "D5uDdWFo2BwM4p9sWwQFedJaX8yHhB2rvx",
  "unconfirmedBalance": 936415850000,
  "balance": 936415850000,
  "publicKey": "630eb21d71b2ec7b5445215bfa74dcbc3cddbd872377c4d87ed73f3a39a41c6a",
  "username": "",
  "unconfirmedSignature": false,
  "secondSignature": false,
  "secondPublicKey": "",
  "multisignatures": [],
  "u_multisignatures": [],
  "lockHeight": 0
}
```

#### 4.2.5 查看账户地址投了哪些受托人
命令值： getvoteddelegates [options] [address]

返回值： 列表

使用方法：ddn-cli getvoteddelegates 账户地址 -o 偏移量数字 -l 限制打印的受托人个数数字

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getvoteddelegates D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L -o 1 -l 2
{ success: true, delegates: [] }
```

#### 4.2.6 加密相关
命令值： crypto [操作选项]

返回值： 列表

使用方法：ddn-cli -p(根据密码生成公钥)；ddn-cli -g（生成新账户）

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 crypto -g
? Enter number of accounts to generate 1
[ { address: 'D8cDvGENqjqzesRSK3jYfr9UCTuyCqegbw',
    secret: 'cricket plate deny drive beyond clip faith sting deliver divorce economy explain',
    publicKey: '2d2ae02967a930f2b23b1a74f25ca1475a9cfc3a199327ceb6628b6bbf551c6a' } ]
Done
```

#### 4.2.7 账户锁仓
命令值： lock [操作选项]  
返回值： 锁仓交易id 
使用方法：ddn-cli -e "一级密码" -s "二级密码" -h 锁仓高度  
备注：锁仓后且区块高度未达到锁仓高度，则该账户不能执行如下操作：  
|交易类型type|备注|  
|----|----|  
|0|主链DDN转账|  
|6|Dapp充值|  
|7|Dapp提现|  
|8|存储小文件|  
|9|发行商注册|  
|10|资产注册|  
|13|资发行产|  
|14|主链uia转账|  

示例:    
```    
// 锁仓到高度8888
password="hello world"
ddn-cli lock -e "$password" -h 8888  
a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf
```

### 4.3 受托人delegate
#### 4.3.1 查看全部受托人个数
命令值： getdelegatescount

返回值： 整型数字

使用方法：ddn-cli getdelegatescount

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getdelegatescount
143
```

#### 4.3.2 查看受托人详情并排序
命令值： getdelegates [options]

返回值： 列表

使用方法：ddn-cli getdelegates -o 偏移量数字 -l 限制打印的受托人个数数字 -s rate:asc #rate:asc代表根据投票数正向排序，其它排序规则请参考ddn-cli getdelegates -h帮助信息

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getdelegates -o 1 -l 1 -s rate:asc
[
  {
    "username": "shuirongc",
    "address": "DC9ZPHhVho4mxsLprnagHcaCN9iA1oSGEY",
    "publicKey": "b89c54b2128e956b4f8542e462efd1bfd421fe763033b3e9364413237581dda0",
    "balance": 25192139168408,
    "vote": 763572482802595,
    "producedblocks": 12001,
    "missedblocks": 1123,
    "fees": 5579168408,
    "rewards": 4800400000000,
    "rate": 2,
    "approval": 7.14,
    "productivity": 91.44,
    "forged": "4805979168408"
  }
]
```

#### 4.3.3 根据受托人公钥查看都是谁为他投了票
命令值： getvoters [publicKey]

返回值： 列表

使用方法：ddn-cli getvoters "受托人公钥"

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getvoters "b89c54b2128e956b4f8542e462efd1bfd421fe763033b3e9364413237581dda0"
[
  {
    "username": "",
    "address": "DBrdct5ZGMJRKpRSrm2k9fDpYdwmujJXap",
    "publicKey": "d41b2a07c1457e9203b60d3f70db2b9e7c0a4965fef94b0b78b409d62ff47565",
    "balance": 0,
    "weight": 0
  },
  ...
  ]
```
  
#### 4.3.4 根据公钥查看受托人详情
命令值： getdelegatebypublickey [publicKey]

返回值： json字符串，包含受托人名字、地址、投票数、生成的block数、锻造收益等

使用方法：ddn-cli getdelegatebypublickey "受托人公钥"

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getdelegatebypublickey "b89c54b2128e956b4f8542e462efd1bfd421fe763033b3e9364413237581dda0"
{
  "username": "shuirongc",
  "address": "DC9ZPHhVho4mxsLprnagHcaCN9iA1oSGEY",
  "publicKey": "b89c54b2128e956b4f8542e462efd1bfd421fe763033b3e9364413237581dda0",
  "balance": 25192139168408,
  "vote": 763572482802595,
  "producedblocks": 12001,
  "missedblocks": 1123,
  "fees": 5579168408,
  "rewards": 4800400000000,
  "rate": 2,
  "approval": 7.14,
  "productivity": 91.44,
  "forged": "4805979168408"
}
```
#### 4.3.5 根据名字查看受托人详情
命令值： getdelegatebyusername [username]

返回值： json字符串，受托人详情

使用方法：ddn-cli getdelegatebyusername "受托人名字"

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getdelegatebyusername "shuirongc"
{
  "username": "shuirongc",
  "address": "DC9ZPHhVho4mxsLprnagHcaCN9iA1oSGEY",
  "publicKey": "b89c54b2128e956b4f8542e462efd1bfd421fe763033b3e9364413237581dda0",
  "balance": 25192139168408,
  "vote": 763572482802595,
  "producedblocks": 12002,
  "missedblocks": 1123,
  "fees": 5579168408,
  "rewards": 4800400000000,
  "rate": 2,
  "approval": 7.14,
  "productivity": 91.44,
  "forged": "4805979168408"
}
```

#### 4.3.5 注册受托人 **Fixme**
命令值： registerdelegate [options]

返回值： 结果状态值，true或者报错信息

使用方法：ddn-cli registerdelegate -e "密码" -s "二级密码" -u "受托人名字"

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 registerdelegate -e "hello world" -u "delegate_test"
"Unexpected status code: 500, Request is made on the wrong network"
```

#### 4.3.6 给受托人投票 
命令值： upvote [options] 

返回值： 结果状态值，true或者报错信息

使用方法：ddn-cli upvote -e "密码" -s "二级密码" -p "受托人公钥"

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 upvote -e "hello world" -p "bd1e78c5a10fbf1eca36b28bbb8ea85f320967659cbf1f7ff1603d0a368867b9"
true
```

#### 4.3.7 给受托人取消投票
命令值： downvote [options]

返回值： 结果状态值，true或者报错信息

使用方法：ddn-cli downvote -e "密码" -s "二级密码" -p "受托人公钥"

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 downvote -e "hello world" -p "bd1e78c5a10fbf1eca36b28bbb8ea85f320967659cbf1f7ff1603d0a368867b9"
true
```

### 4.4 区块block
#### 4.4.1 查看(分析)全网区块信息
命令值： getblocks [options]

返回值： json字符串，包含查询状态、符合查询要求的区块信息

使用方法：ddn-cli getblocks -o 偏移量数字 -l 限制的个数数字 -r 奖励 -f 费用 -a 总量 -g 生成区块的公钥 -s 排序规则

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getblocks -o 1 -l 1 -r 500000000
{
  "success": true,
  "blocks": [
    {
      "id": "c74c97b86d5513fcf7361b17d584c96fe141f8fffc365fe71de022d2f2e2d74c",
      "version": 0,
      "timestamp": 860,
      "height": 3,
      "previousBlock": "54eacd04b7ae8dc607526d602d33e1f0057dd9a861c818d964d0c677b79516b3",
      "numberOfTransactions": 0,
      "totalAmount": 0,
      "totalFee": 0,
      "reward": 500000000,
      "payloadLength": 0,
      "payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "generatorPublicKey": "13ac42a0b89d6309c818973bc4db2d43b913d4c4ad5c688ca41fe772020135a5",
      "generatorId": "DMMH6TvtBgwoQTrLR1TXDEVJKGMoUwHwNC",
      "blockSignature": "15a1563b6b260e8587ebcea8b734af0d133534679ff4a10e7503937e17c53c3b851a36295ddeaacd83298ef900bd2501084a110e5bd12f5858ced172af500308",
      "confirmations": "1391532",
      "totalForged": 500000000
    }
  ],
  "count": 1391533
}
```
#### 4.4.2 根据区块id查看区块详情 **Note**
命令值： getblockbyid [id]

返回值： json字符串，包含区块id、区块高度、前一个blockid、交易数、总额、费用、奖励、哈希值、区块生成者公钥、id、区块签名、确认数等信息

使用方法：ddn-cli getblockbyid 区块id

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getblockbyid 1425942128040906871 #查看创世块
{
  "id": "1425942128040906871",
  "version": 0,
  "timestamp": 0,
  "height": 1,
  "previousBlock": "",
  "numberOfTransactions": 103,
  "totalAmount": 10000000000000000,
  "totalFee": 0,
  "reward": 0,
  "payloadLength": 19417,
  "payloadHash": "dd5cd3186d32145b01f8fd0bd23e3b3d72414b59b162d2e664e759db8fe60d46",
  "generatorPublicKey": "2af8566f8555bafb25df5a50e2e22b91a8577ceabc05d47dbd921572d28330e8",
  "generatorId": "1170992220085500484",
  "blockSignature": "a8ed06bfbfd1b630b1628e97a5c7c9383337c4ce32825969fad830890e0af981312be635b775ff46eea4f739da043f668a70efd5a940429e39fe5063852f4a01",
  "confirmations": "105901",
  "totalForged": 0
}
```

#### 4.4.3 根据区块高度查看区块详情  
命令值： getblockbyheight [height]

返回值： json字符串，包含区块id、区块高度、前一个blockid、交易数、总额、费用、奖励、哈希值、区块生成者公钥、id、区块签名、确认数等信息

使用方法：ddn-cli getblockbyheight 区块高度

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getblockbyheight 1
{
  "id": "1425942128040906871",
  "version": 0,
  "timestamp": 0,
  "height": 1,
  "previousBlock": "",
  "numberOfTransactions": 103,
  "totalAmount": 10000000000000000,
  "totalFee": 0,
  "reward": 0,
  "payloadLength": 19417,
  "payloadHash": "dd5cd3186d32145b01f8fd0bd23e3b3d72414b59b162d2e664e759db8fe60d46",
  "generatorPublicKey": "2af8566f8555bafb25df5a50e2e22b91a8577ceabc05d47dbd921572d28330e8",
  "generatorId": "1170992220085500484",
  "blockSignature": "a8ed06bfbfd1b630b1628e97a5c7c9383337c4ce32825969fad830890e0af981312be635b775ff46eea4f739da043f668a70efd5a940429e39fe5063852f4a01",
  "confirmations": "105922",
  "totalForged": 0
}
```  

#### 4.4.4 根据区块id查看区块详情-包含交易信息  
命令值： getfullblockbyid [blockid]

返回值： json字符串，包含区块id、区块高度、前一个blockid、交易数、总额、费用、奖励、哈希值、区块生成者公钥、id、区块签名、确认数、交易详情数组 等信息

使用方法：ddn-cli getfullblockbyid 区块id   
备注：比getblockbyid返回的结果多交易信息（交易信息数组）  

示例:

```    
ddn-cli getfullblockbyid 61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4
{
  "id": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
  "version": 0,
  "timestamp": 40458800,
  "height": 4330,
  "previousBlock": "ddc0bb392da3b1d22ac4e2c50d1a30a7adabe35e221fc0aeb80e3c6aaa509f68",
  "numberOfTransactions": 1,
  "totalAmount": 0,
  "totalFee": 10000000,
  "reward": 350000000,
  "payloadLength": 121,
  "payloadHash": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
  "generatorPublicKey": "0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75",
  "generatorId": "4354832300657989346",
  "blockSignature": "6b09f19c21574c065015c026eaba049c25827b7008db071f7ac59e4f50538bbd70301dcf2cd9d3bada77e7a4279740fddb55ec72cce7de886517d74bdc1a0d0b",
  "totalForged": 360000000,
  "transactions": [ // 该区块包含的交易详情数组
    {
      "id": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
      "height": 4330,
      "blockId": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
      "type": 100,  // 交易类型为100代表锁仓
      "timestamp": 40458794,
      "senderPublicKey": "2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4",
      "requesterPublicKey": "",
      "senderId": "ANH2RUADqXs6HPbPEZXv4qM8DZfoj4Ry3M",
      "recipientId": "",
      "amount": 0,
      "fee": 10000000,
      "signature": "efd9a349eb2bc0a022461401c312001a5cd9f4f4f2c1e554e5bda465e19d1f0da7b229b68fbcdda81d85e34c3cd331e968f27cc398908e7acd527d27ae7e230a",
      "signSignature": "",
      "signatures": null,
      "args": [
        "4340"  // 锁仓高度
      ],
      "message": "",
      "asset": {}
    }
  ]
}  
```

#### 4.4.5 根据区块高度查看区块详情-包含交易信息  
命令值： getfullblockbyheight [blockheight]  
返回值： json字符串，包含区块id、区块高度、前一个blockid、交易数、总额、费用、奖励、哈希值、区块生成者公钥、id、区块签名、确认数、交易详情数组 等信息  
使用方法：ddn-cli getfullblockbyheight 区块高度  
备注：比getblockbyheight返回的结果多交易信息（交易信息数组）  

示例:   

```    
ddn-cli getfullblockbyheight 4330  
{
  "id": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
  "version": 0,
  "timestamp": 40458800,
  "height": 4330,
  "previousBlock": "ddc0bb392da3b1d22ac4e2c50d1a30a7adabe35e221fc0aeb80e3c6aaa509f68",
  "numberOfTransactions": 1,
  "totalAmount": 0,
  "totalFee": 10000000,
  "reward": 350000000,
  "payloadLength": 121,
  "payloadHash": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
  "generatorPublicKey": "0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75",
  "generatorId": "4354832300657989346",
  "blockSignature": "6b09f19c21574c065015c026eaba049c25827b7008db071f7ac59e4f50538bbd70301dcf2cd9d3bada77e7a4279740fddb55ec72cce7de886517d74bdc1a0d0b",
  "totalForged": 360000000,
  "transactions": [ // 该区块包含的交易详情数组
    {
      "id": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
      "height": 4330,
      "blockId": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
      "type": 100,  // 交易类型为100代表锁仓
      "timestamp": 40458794,
      "senderPublicKey": "2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4",
      "requesterPublicKey": "",
      "senderId": "ANH2RUADqXs6HPbPEZXv4qM8DZfoj4Ry3M",
      "recipientId": "",
      "amount": 0,
      "fee": 10000000,
      "signature": "efd9a349eb2bc0a022461401c312001a5cd9f4f4f2c1e554e5bda465e19d1f0da7b229b68fbcdda81d85e34c3cd331e968f27cc398908e7acd527d27ae7e230a",
      "signSignature": "",
      "signatures": null,
      "args": [
        "4340"  // 锁仓高度
      ],
      "message": "",
      "asset": {}
    }
  ]
}  
```

#### 4.4.6 验证区块文件字节    
命令值： getblockbytes [-f block_file]  
返回值： 区块文件字节，hex格式数据    
使用方法：ddn-cli getblockbytes -f 区块文件   
备注： 下面这几个命令主要是验证区块文件，通过修改fullblock数据来和区块链上的数据进行对比是否一致  

示例:

```    
ddn-cli getfullblockbyheight 4330 > blockfile
cat blockfile
{
  "id": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
  "version": 0,
  "timestamp": 40458800,
  "height": 4330,
  "previousBlock": "ddc0bb392da3b1d22ac4e2c50d1a30a7adabe35e221fc0aeb80e3c6aaa509f68",
  "numberOfTransactions": 1,
  "totalAmount": 0,
  "totalFee": 10000000,
  "reward": 350000000,
  "payloadLength": 121,
  "payloadHash": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
  "generatorPublicKey": "0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75",
  "generatorId": "4354832300657989346",
  "blockSignature": "6b09f19c21574c065015c026eaba049c25827b7008db071f7ac59e4f50538bbd70301dcf2cd9d3bada77e7a4279740fddb55ec72cce7de886517d74bdc1a0d0b",
  "totalForged": 360000000,
  "transactions": [
    {
      "id": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
      "height": 4330,
      "blockId": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
      "type": 100,
      "timestamp": 40458794,
      "senderPublicKey": "2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4",
      "requesterPublicKey": "",
      "senderId": "ANH2RUADqXs6HPbPEZXv4qM8DZfoj4Ry3M",
      "recipientId": "",
      "amount": 0,
      "fee": 10000000,
      "signature": "efd9a349eb2bc0a022461401c312001a5cd9f4f4f2c1e554e5bda465e19d1f0da7b229b68fbcdda81d85e34c3cd331e968f27cc398908e7acd527d27ae7e230a",
      "signSignature": "",
      "signatures": null,
      "args": [
        "4340"
      ],
      "message": "",
      "asset": {}
    }
  ]
}

ddn-cli getblockbytes -f blockfile
00000000305a69026464633062623339326461336231643232616334653263353064316133306137616461626533356532323166633061656238306533633661616135303966363801000000000000000000000080969800000000008093dc140000000079000000a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75  
```

#### 4.4.7 验证区块文件payloadhash  
命令值： getblockpayloadhash [-f blockfile]  

返回值： 该区块的paylaod hash

使用方法：ddn-cli getblockpayloadhash -f 区块文件

示例:

```    
ddn-cli getfullblockbyheight 4330 > blockfile

ddn-cli getblockpayloadhash -f blockfile  
a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf  
```

#### 4.4.8 验证区块文件区块id  
命令值： getblockid [-f blockfile]  
返回值： 该区块文件的blockid  
使用方法：ddn-cli getblockid -f 区块文件  

示例:  
```    
ddn-cli getfullblockbyheight 4330 > blockfile

ddn-cli getblockid -f blockfile  
61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4 
```

#### 4.4.8 验证区块签名是否通过    
命令值： verifybytes [options]   
返回值： true or false 
使用方法：ddn-cli verifybytes -b 区块hex字节数据 -s 区块签名 -p 区块生成者公钥    

示例:   
```    
ddn-cli getfullblockbyheight 4330  
{
  "id": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
  "version": 0,
  "timestamp": 40458800,
  "height": 4330,
  "previousBlock": "ddc0bb392da3b1d22ac4e2c50d1a30a7adabe35e221fc0aeb80e3c6aaa509f68",
  "numberOfTransactions": 1,
  "totalAmount": 0,
  "totalFee": 10000000,
  "reward": 350000000,
  "payloadLength": 121,
  "payloadHash": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
  "generatorPublicKey": "0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75", // 区块生成者公钥  
  "generatorId": "4354832300657989346",
  "blockSignature": "6b09f19c21574c065015c026eaba049c25827b7008db071f7ac59e4f50538bbd70301dcf2cd9d3bada77e7a4279740fddb55ec72cce7de886517d74bdc1a0d0b",   // 区块签名  
  "totalForged": 360000000,
  "transactions": [
    {
      "id": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
      "height": 4330,
      "blockId": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
      "type": 100,
      "timestamp": 40458794,
      "senderPublicKey": "2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4",
      "requesterPublicKey": "",
      "senderId": "ANH2RUADqXs6HPbPEZXv4qM8DZfoj4Ry3M",
      "recipientId": "",
      "amount": 0,
      "fee": 10000000,
      "signature": "efd9a349eb2bc0a022461401c312001a5cd9f4f4f2c1e554e5bda465e19d1f0da7b229b68fbcdda81d85e34c3cd331e968f27cc398908e7acd527d27ae7e230a",
      "signSignature": "",
      "signatures": null,
      "args": [
        "4340"
      ],
      "message": "",
      "asset": {}
    }
  ]
}

ddn-cli getblockbytes -f blockfile // 生成区块hex数据  
00000000305a69026464633062623339326461336231643232616334653263353064316133306137616461626533356532323166633061656238306533633661616135303966363801000000000000000000000080969800000000008093dc140000000079000000a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75  

ddn-cli verifybytes -b 00000000305a69026464633062623339326461336231643232616334653263353064316133306137616461626533356532323166633061656238306533633661616135303966363801000000000000000000000080969800000000008093dc140000000079000000a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75 -s 6b09f19c21574c065015c026eaba049c25827b7008db071f7ac59e4f50538bbd70301dcf2cd9d3bada77e7a4279740fddb55ec72cce7de886517d74bdc1a0d0b -p 0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75
// 对hex进行签名验证  
true    // 结果为true

// 将上面的hex数据略做改动则验证不会被通过
ddn-cli verifybytes -b 10000000305a69026464633062623339326461336231643232616334653263353064316133306137616461626533356532323166633061656238306533633661616135303966363801000000000000000000000080969800000000008093dc140000000079000000a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75 -s 6b09f19c21574c065015c026eaba049c25827b7008db071f7ac59e4f50538bbd70301dcf2cd9d3bada77e7a4279740fddb55ec72cce7de886517d74bdc1a0d0b -p 0ae2e3bcd8c959bccc34445a9473eab1bece60300f3aa00d89612923470dee75
false // 将hex首位改成1则验证不通过  
```

### 4.5 交易transaction
#### 4.5.1 根据公钥查看未确认的交易
命令值： getunconfirmedtransactions [options]

返回值： 列表，包含所有未确认的交易详情

使用方法：ddn-cli getunconfirmedtransactions -k "发送者公钥" -a 接收者地址

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 getunconfirmedtransactions -k "d39d6f26869067473d685da742339d1a9117257fe14b3cc7261e3f2ed5a339e3" 
[
  {
    "type": 0,
    "timestamp": 4385190,
    "senderPublicKey": "d39d6f26869067473d685da742339d1a9117257fe14b3cc7261e3f2ed5a339e3",
    "signature": "98d65df3109802c707eeed706e90a907f337bddab58cb4c1fbe6ec2179aa1c85ec2903cc0cf44bf0092926829aa5a0a6ec99458f65b6ebd11f0988772e58740e",
    "recipientId": "D5uDdWFo2BwM4p9sWwQFedJaX8yHhB2rvx",
    "senderId": "D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L",
    "amount": 10000000000,
    "fee": 10000000,
    "signatures": [],
    "id": "17192581936339156329",
    "height": 0,
    "asset": {}
  }
]
```

#### 4.5.2 查看（分析）全网交易信息
命令值： gettransactions [options]

返回值： 列表，包含所有符合查询条件的交易详情

使用方法：ddn-cli gettransactions -b 区块id -o 偏移量数字 -l 限制个数数字 #其他参数请参考sch-cli gettransactions -h查看帮助信息

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 gettransactions -o 1 -l 2 #查看全网前2个交易
[
  {
    "id": "10169086766604015960",
    "height": "1",
    "blockId": "1425942128040906871",
    "type": 2,
    "timestamp": 0,
    "senderPublicKey": "991e0dda00d2c33ce68dd99471de8ebea7b58711f22a2e55236b8864c6d24c84",
    "senderId": "3331250159865474723",
    "recipientId": "",
    "amount": 0,
    "fee": 0,
    "signature": "60bf38e7a3515aeaa2cac491f7737c94087f448a862099408b90c2cf96d3fe4f709e22e6471dd4e37aca111d8573beeb7b6cff4ef451633d9aaf74ab97ce8d02",
    "signSignature": "",
    "signatures": null,
    "confirmations": "105988",
    "asset": {}
  },
  {
    "id": "10375311635154792515",
    "height": "1",
    "blockId": "1425942128040906871",
    "type": 2,
    "timestamp": 0,
    "senderPublicKey": "1674ae566c633cde3e01db8f04a02ea087081a270de2dd53e0e0b97c029106fb",
    "senderId": "9948352853509008057",
    "recipientId": "",
    "amount": 0,
    "fee": 0,
    "signature": "f09c1693cc26c4028c642cb1711cf71c2dee090a50904d1590c74d865b2f5f3ba720ed792704f5379ec9c4a20b018c5e95f325ea179236777a28cddffe8c580d",
    "signSignature": "",
    "signatures": null,
    "confirmations": "105988",
    "asset": {}
  }
]
```

#### 4.5.3 根据交易id查看交易详情
命令值： gettransaction [id]

返回值： json字符串，包含交易id、区块高度、区块id、时间戳、发送者公钥、接收者地址、金额、费用、签名、确认数、资产等信息

使用方法：ddn-cli gettransaction 交易id

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 gettransaction 17192581936339156329
{
  "id": "17192581936339156329",
  "height": "105951",
  "blockId": "15051364118100195665",
  "type": 0,
  "timestamp": 4385190,
  "senderPublicKey": "d39d6f26869067473d685da742339d1a9117257fe14b3cc7261e3f2ed5a339e3",
  "senderId": "D4FN28d1mfjdUG7rtUzEAstFVzPsmWUm2L",
  "recipientId": "D5uDdWFo2BwM4p9sWwQFedJaX8yHhB2rvx",
  "amount": 10000000000,
  "fee": 10000000,
  "signature": "98d65df3109802c707eeed706e90a907f337bddab58cb4c1fbe6ec2179aa1c85ec2903cc0cf44bf0092926829aa5a0a6ec99458f65b6ebd11f0988772e58740e",
  "signSignature": "",
  "signatures": null,
  "confirmations": "17",
  "asset": {}
}
```

#### 4.5.4 转账
命令值： sendmoney [选项]

返回值： 结果状态值，true或者报错信息

使用方法：ddn-cli -e "发送者密码" -t 接收者地址 -a 转账金额 [-s "二级密码"]

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 sendmoney -e "motion group blossom coral upper warrior pattern fragile sister misery palm admin" -t D5uDdWFo2BwM4p9sWwQFedJaX8yHhB2rvx -a 100
true
```


#### 4.5.5 设置二级密码
命令值： setsecondsecret [options]

返回值： 结果状态值，true或者报错信息

使用方法：ddn-cli setsecondsecret -e "密码" -s "二级密码"

示例:

```    
ubuntu@ddn:~# ddn-cli -H 47.94.93.132 -P 8000 setsecondsecret -e "hello world" -s "ce shi er ji mi ma"
true
```

#### 4.5.6 验证交易文件bytes
命令值： gettransactionbytes  [-f transaction_file]  
返回值： 交易bytes，hex格式数据   
使用方法：ddn-cli gettransactionbytes  -f 交易数据文件  

示例:  
```    
ddn-cli gettransaction a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf > transactionfile
cat transactionfile
{
  "id": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
  "height": "4330",
  "blockId": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
  "type": 100,
  "timestamp": 40458794,
  "senderPublicKey": "2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4",
  "senderId": "ANH2RUADqXs6HPbPEZXv4qM8DZfoj4Ry3M",
  "recipientId": "",
  "amount": 0,
  "fee": 10000000,
  "signature": "efd9a349eb2bc0a022461401c312001a5cd9f4f4f2c1e554e5bda465e19d1f0da7b229b68fbcdda81d85e34c3cd331e968f27cc398908e7acd527d27ae7e230a",
  "signSignature": "",
  "signatures": null,
  "confirmations": "413",
  "args": [
    "4340"
  ],
  "message": "",
  "asset": {}
}

ddn-cli gettransactionbytes  -f transactionfile 
642a5a69022856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec40000000000000000000000000000000034333430  
```

#### 4.5.7 验证交易文件id
命令值： gettransactionid  [-f transaction_file]  
返回值： 交易id  

使用方法：ddn-cli gettransactionid  -f 交易数据文件  

示例:    
```    
ddn-cli gettransaction a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf > transactionfile

ddn-cli gettransactionid  -f transactionfile
a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf
```

#### 4.4.8 验证交易签名是否通过    
命令值： verifybytes [options]   
返回值： true or false 
使用方法：ddn-cli verifybytes -b 交易hex字节数据 -s 交易签名 -p 发送者公钥    

示例:   
```    
ddn-cli gettransaction a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf > transactionfile
cat transactionfile
{
  "id": "a533d303f90e3ca9e685c2bd7088b93ae2ff721eafbea61027b7e353bfc2babf",
  "height": "4330",
  "blockId": "61e5c7c17a365e079d536dcf7d23acca30b927434ca474df8ce28547e3abbdc4",
  "type": 100,
  "timestamp": 40458794,
  "senderPublicKey": "2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4",    // 发送者公钥
  "senderId": "ANH2RUADqXs6HPbPEZXv4qM8DZfoj4Ry3M",
  "recipientId": "",
  "amount": 0,
  "fee": 10000000,
  "signature": "efd9a349eb2bc0a022461401c312001a5cd9f4f4f2c1e554e5bda465e19d1f0da7b229b68fbcdda81d85e34c3cd331e968f27cc398908e7acd527d27ae7e230a",    // 交易签名  
  "signSignature": "",
  "signatures": null,
  "confirmations": "413",
  "args": [
    "4340"
  ],
  "message": "",
  "asset": {}
}

ddn-cli gettransactionbytes  -f transactionfile    // hex格式交易数据
642a5a69022856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec40000000000000000000000000000000034333430  

ddn-cli verifybytes -b 642a5a69022856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec40000000000000000000000000000000034333430 -s efd9a349eb2bc0a022461401c312001a5cd9f4f4f2c1e554e5bda465e19d1f0da7b229b68fbcdda81d85e34c3cd331e968f27cc398908e7acd527d27ae7e230a -p 2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4
// 对hex交易数据进行签名验证  
true    // 结果为true

// 对hex交易数据略作修改则签名验证不会通过
ddn-cli verifybytes -b 142a5a69022856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec40000000000000000000000000000000034333430 -s efd9a349eb2bc0a022461401c312001a5cd9f4f4f2c1e554e5bda465e19d1f0da7b229b68fbcdda81d85e34c3cd331e968f27cc398908e7acd527d27ae7e230a -p 2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4
false    // 将hex数据首位修改为1

```

### 4.6 侧链dapp
#### 4.6.1 注册dapp
命令值： registerdapp [options]

返回值： 生成的dapp id

使用方法：ddn-cli registerdapp -e "密码" -s "二级密码" -f dapp元信息文件

示例:
```
ubuntu@ddn:~$ ddn-cli registerdapp -f dapp.json  -e "found knife gather faith wrestle private various fame cover response security predict"
d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1
```

#### 4.6.2 dapp充值
命令值： deposit [options]

返回值： 充值交易id

使用方法： ddn-cli deposit -e "密码" -s "二级密码" -d dappid -c 待充值资产名称 -a 充值数量 

示例:
```
dappid=d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1
password="elite brush pave enable history risk ankle shrimp debate witness ski trend"

ddn-cli -H 45.32.22.78 -P 8000 deposit -e "$password" -d $dappid -c "CCTime.XCT" -a "100000000"  // 给dapp充值 1 CCTime.XCT  
e5684046c87bef58e32ac64ea01a97e8323e6fe695e2dc186ca7ee6a55a9dbf5
```

#### 4.6.3  智能合约的增删
命令值： contract [options]

返回值： 

使用方法：ddn-cli contract -a(创建合约);ddn-cli contract -d(删除合约)

示例:
```

```

#### 4.6.4 dapp交易
命令值： dapptransaction [options]

返回值： dapp交易id

使用方法： ddn-cli dapptransaction -e "密码" -d dappid -t 智能合约编号 -a 数据字符串参数 -f 手续费（暂时是固定的10000000）

示例:
```
dappid=d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1
password="elite brush pave enable history risk ankle shrimp debate witness ski trend"

ddn-cli -H 45.32.22.78 -P 8000 dapptransaction -e "$password" -d $dappid -t 2 -a '["CCTime.XCT","100000000"]' -f 10000000 // 从dapp里面提现 1 CCTime.XCT  
24a0b6b08f38882bac2791255e71437c5de4c37b619f5086a0bf32484cd8cf5b

ddn-cli -H 45.32.22.78 -P 8000 dapptransaction -e "$password" -d $dappid -t 3 -a '["CCTime.XCT","100000000","ADimyhJa99XFzVrbnTYsCqPB4TKQNdjCWw"]' -f 10000000 // 给ADimyhJa99XFzVrbnTYsCqPB4TKQNdjCWw在dapp内部转账1 CCTime.XCT 
4a33e538f54b418bc89ac4484f954e51a749a94004aaf15939b4148991fac21c

ddn-cli -H 45.32.22.78 -P 8000 dapptransaction -e "$password" -d $dappid -t 4 -a '["zhenxi"]' -f 10000000 // 给该账户设置昵称“zhenxi”
1234b6b08f38882bac2791255e71437c5de4c37b619f5086a0bf32484cd8cf5b
```

#### 4.6.5  dapp创建安装相关  
命令值： dapps [options] 
返回值：    
使用方法：ddn-cli dapps -a   
示例   
```    

```
