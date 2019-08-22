---
id: ddn-api-design
title: Api Design
sidebar_label: Api Design
---

## 1. 区块链接口
&emsp;&emsp;在区块链系统中，Api接口是必不可缺的，从所处位置和设计方法的不同可以分为三类：系统接口、扩展资产接口、Dapp接口。<br/>
&emsp;&emsp;当前接口的设计基于Express服务，采用Http协议（支持Https，可配置）；在区块链系统中，接口服务的启动流程如下图：
![Express服务启动流程](/img/ddn-api-express.jpg)

## 2. 系统接口
&emsp;&emsp;系统接口是指实现代码包含在区块链代码中，和区块链系统紧密结合，随着区块链启动而启动，随着区块链停止而停止；并且对区块链系统的运行有重要影响的接口内容。例如：/peer/height、/peer/blocks等等，都是节点同步数据必不可少的服务。<br/>
&emsp;&emsp;系统接口的设计规范和扩展方法：<br/>
#### &emsp;&emsp;a. 所有系统接口的代码文件都存放在/src/network/service目录下，分为api和peer两个目录，系统启动时，会遍历两个目录（下面可以有子目录，不限级数），对目录下的接口文件进行自动解析并挂载到Express服务上。<br/>
#### &emsp;&emsp;b. 具体接口逻辑在目录的index.js文件中实现，首先定义一个类，构造参数为DDN Context
```
constructor(context) {
    Object.assign(this, context);
    this._context = context;
}
```
&emsp;&emsp;接口方法命名规范如下：<br/>
&emsp;&emsp;请求格式（get、post、delete、put）+接口路径<br/>
&emsp;&emsp;如/peer/height，就是在peer目录下的index.js文件中，实现方法getHeight
固定参数request对象，返回格式为json对象。
```
async getHeight(req) {
    var lastBlock = this.runtime.block.getLastBlock();
    return { 
        height: lastBlock && lastBlock.height ? lastBlock.height : 0
    };
}
```
#### &emsp;&emsp;c. 接口路由是根据目录结构+接口方法自动生成，如peer目录下的index.js中有getHeight方法，则对应的路由为/peer/height，其他依次类推。<br/>
#### &emsp;&emsp;d. 如果想对某个路由下的所有方法进行统一的过滤校验，可以在类中增加filter方法来实现，这个类似于中间件，会在所有方法调用之前执行，根据内部的逻辑是否符合来决定继续或者中断。
```
async filter(req, res, next) {
	next();
}
```

## 3. 扩展资产接口
&emsp;&emsp;顾名思义，扩展资产接口是专门为扩展资产设计的一类接口，用于为扩展资产提供对外的接口服务，用户可以根据扩展资产的业务需要进行设计。此类接口附着在扩展资产中，当扩展资产安装到区块链系统时，接口自然被挂载并生效；反之，不能使用。无论扩展资产接口是否生效，都不影响区块链系统的运行。<br/>
&emsp;&emsp;扩展资产接口内部也分为两种，一种是根据扩展资产的数据结构自动智能生成的接口，另一种是用户根据业务需求主动增加的接口。<br/>
#### &emsp;&emsp;a. 用户主动增加的接口<br/>
&emsp;&emsp;该类接口在扩展资产的实现类中，通过attachApi方法实现
```
async attachApi(router) {
}
```
&emsp;&emsp;router参数是Express的路由对象，可以直接通过router.get、router.post、router.delete、router.put方法新增接口。<br/>
&emsp;&emsp;在attachApi方法中新增的接口将挂载在/api/资产配置名对应的路由下，如ddn-evidence包里的AssetEvidence资产，则路由为/api/assetevidence/接口方法<br/>
#### &emsp;&emsp;b. 自动智能生成的接口
&emsp;&emsp;DDN在加载扩展资产时，会根据如下的规则自动生成一些接口。<br/>
&emsp;&emsp;规则一：对于资产propsMapping方法中定义为required的属性进行接口生成<br/>
&emsp;&emsp;规则二：对选定属性同时生成单一数据查询和列表数据查询两个接口<br/>
&emsp;&emsp;如存证中的ipid是required属性，则会自动生成如下两个接口<br/>
&emsp;&emsp;/api/assetevidence/ipid/:ipid<br/>
&emsp;&emsp;/api/assetevidence/ipid/:ipid/list<br/>

&emsp;&emsp;同时DDN会自动生成根据交易id获取对应资产详情的接口和获取资产列表的接口<br/>
&emsp;&emsp;/api/assetevidence/transaction/:trs_id<br/>
&emsp;&emsp;/apid/assetevidence/list<br/>

&emsp;&emsp;自动生成的接口不一定有实际的业务意义，但不影响系统运行，也不会影响系统性能。

## 4. Dapp接口
&emsp;&emsp;Dapp接口是Dapp对外提供的接口服务。<br/>
&emsp;&emsp;Dapp接口设计规范和实现方法：<br/>
#### &emsp;&emsp;a. 路由规则
&emsp;&emsp;/api/dapp/{DappId}<br/>
&emsp;&emsp;大括号内由对应Dapp的真实Id替换。
#### &emsp;&emsp;b. 接口定义
&emsp;&emsp;Dapp接口统一在routers.json文件内，定义内容包括方法类型和路由路径，如下：
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
&emsp;&emsp;上面的示例定义了两个接口，完整路由分别是/api/dapp/{DappId}/test和/api/dapp/{DappId}/test2
#### &emsp;&emsp;c. 接口实现
&emsp;&emsp;在Dapp的代码文件中，通常在入口文件index.js中，引入router.js文件（DDN区块链系统提供），首先进行初始化，然后根据定义文件的路由分别进行实现，如下：
```
const router = require('./router.js');

router.init();

router.get("/test", (req) => {
	return "Hello World";
});

```
&emsp;&emsp;上面的代码实现了/test接口，/test2实现方式类似。当对应Dapp在区块链系统中安装并正常启动后，接口即可接受外界请求。