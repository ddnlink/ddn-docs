---
id: ddn-dapp
title: Dapp
sidebar_label: Dapp
---

## 1. Dapp说明
&emsp;&emsp;Dapp是运行在DDN沙盒环境中的一种小程序，和普通的Node.js程序无异，运行在独立的进程，在保证安全的基础上，Dapp能够和DDN区块链方便的通信。Dapp主要在于能够在DDN保持运行的状态下为DDN扩展服务能力。<br/>
&emsp;&emsp;Dapp是由至少5个最多101个账户联合守护的一个独立账户，可以将区块链上的资产转入Dapp内，也可以将Dapp内的资产转出到区块链（需要多个账户联合确认）。

## 2. Dapp规范
&emsp;&emsp;Dapp理论上可以按照独立的项目逻辑进行开发，但也有一定的规范，至少需要包含入口文件、配置文件和接口定义文件。

#### &emsp;&emsp;a. 入口文件index.js，
&emsp;&emsp;index.js是Dapp系统的入口文件，也是Dapp必须包含的内容。
#### &emsp;&emsp;b. 配置文件config.json
&emsp;&emsp;配置文件是用来配置Dapp节点信息的文档，具体格式如下：
```
{
    "peers": []
}
```
#### &emsp;&emsp;c. 接口定义routers.json
```
[
    {
        "method": "get",
        "path": "/test"
    },
    {
        "method": "get",
        "path": "/test2"
    }
]
```

#### &emsp;&emsp;d. 接口辅助类
&emsp;&emsp;接口定义文档内定义的接口需要通过接口辅助类进行实现，首先需要在入口文件index.js中初始化接口辅助类。
```
router.init()//初始化
```
&emsp;&emsp;接下来，可以根据接口定义方法不同，使用router不同的方法进行实现。
```
router.get(path, (req)=>{})//处理get接口请求

router.post(path, (req)=>{})//处理post接口请求

router.put(path, (req)=>{})//处理put接口请求

router.delete(path, (req)=>{})//处理delete接口请求
```

## 3. Dapp运行原理
&emsp;&emsp;Dapp程序运行在独立的进程中，在区块链的沙盒环境中运行和DDN隔离，不会侵入DDN区块链运行环境，在方便提供和区块链通信的基础上，同时限制了DAPP某些能力，比如不能使用fs文件模块。<br/>
&emsp;&emsp;Dapp在区块链的运行流程如下：
#### &emsp;&emsp;a. 创建新进程
#### &emsp;&emsp;b. 新进程中启动一个壳程序
#### &emsp;&emsp;c. 壳程序内使用vm2创建一个虚拟机
#### &emsp;&emsp;d. 运行虚拟机，并传入DAPP入口文件index.js
#### &emsp;&emsp;e. Dapp启动成功
&emsp;&emsp;具体实现逻辑请参照ddn-dapp模块和ddn-sandbox模块。

## 4. Dapp通信原理
&emsp;&emsp;Dapp运行在独立进程中，因此和区块链之间的通信涉及到进程间的通信。具体是两个进程之间通过IPC通道进行消息的传递，双方在收到消息后再根据消息格式进行解析处理并反馈。<br/>
&emsp;&emsp;如Dapp接口通信流程如下：
![接口通信流程](/img/ddn-dapp-msg.jpg)
&emsp;&emsp;具体实现逻辑请参照ddn-dapp模块和ddn-sandbox模块。