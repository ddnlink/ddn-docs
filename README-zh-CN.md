
# DDN DOCS

本版本库，包含站点设置和DDN文档 [DDN DOCS](https://ddn.link/docs).

## 开始

### 准备工作

1.  Git
2.  Node: 要求安装 6.2.2 或更高版本，v8 才是理想的。
3.  Yarn: 查阅
    [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/)
4.  fork版本库
5.  克隆 `ddn-docs` 版本库.
6.  安装Docusaurus: 运行 `yarn global add docusaurus-init` 或者 `npm install --global docusaurus-init`
7.  安装Prettier: 查阅
    [Prettier website for installation instructions](https://prettier.io/docs/en/install.html)

### 安装

1.  `cd ddn-docs` 进入工程根目录
1.  `cd website` 进入项目website文件夹
2.  `yarn` 安装 website 的 npm 依赖包 (或 `npm install`)

### 本地运行

1.  `yarn start` 启动开发服务器 (Docusaurus驱动) (或者 `npm start`)
2.  `open http://localhost:4000/` 打开浏览器

# 预览

如果你想编辑或添加文档，你可能想看看 'docs/' 文件夹。

`DDN DOCS` 是一个用 [Docusaurus](https://docusaurus.io) 产生的静态站点，站点配置在 'website/' 文件夹下. 浏览 `Docusaurus` 网站可以了解更多配置信息。

## 路径结构

下面是相关文件和文件夹层级图。

```
ddn-docs/
├── docs/
│   ├── assets/
│   ├── accessibility.md
│   └── ...
└── website/
    ├── blog/
    │   ├── assets/
    │   ├── 2015-03-26-react-native-bringing-modern-web-techniques-to-mobile.md
    │   └── ...
    ├── core/
    ├── pages/
    │   └── en/
    │       ├── ...
    │       ├── index.js
    │       └── ...
    ├── static/
    │   ├── css/
    │   ├── img/
    │   └── js/
    ├── versioned_docs/
    │   ├── version-0.5/
    │   └── ...
    ├── versioned_sidebars/
    │   ├── version-0.5-sidebars.json
    │   └── ...
    ├── showcase.json
    ├── sidebars.json
    ├── siteConfig.js
    └── versions.json
```

## 文档源码

正如上面提到的，'docs/' 包含所有关于 `DDN` 的文档。 多数情况下，你需要编辑这里的文件。如果你
要增加新的文档，或者调整出现在侧边栏的顺序，请看 'website/' 文件夹下的 'sidebars.json' 文
件，该文件包含文档id的列表，这些文档id定义在每个markdown文档的头数据信息里。

### 版本化的文档

`DDN` 是被版本化的，目的是允许用户返回查看任何以前发布版的API参考。通常一个新DDN发布就会有一个
新版本文档产生。当产生新版本时，'docs/' 和 'website/sidebars.json' 文件夹下的文件，都会被
拷进 'website/versioned_docs/' 和 'website/versioned_sidebars/' 文件夹下。

> 不要编辑 'versioned_docs/'，或 'versioned_sidebars/'里自动生成的文件
> 除非你确定要这么做. 对老版本的编辑，不会传送到新版本。

Docusaurus 会追踪'website/versions.json' 文件里的版本列表，该文件里版本的顺序应该按照时间倒序排列。

#### 切入新版本

1.  `cd ddn-docs` 进入工程根目录
2.  `cd website` 进入项目website文件夹
3.  `yarn` 安装 website 的 npm 依赖包 (或 `npm install`)

## Website设置

The main config file for the website can be found at 'website/siteConfig.js'.
This file tells
[Docusaurus how to build the website](http://docusaurus.io/docs/en/site-config.html).
Edits to this file are rarely necessary.

The 'pages/' subdirectory contains the React components that make up the
non-documentation pages of the site, such as the homepage.

The 'showcase.json' file contains the list of users that are highlighted in the
React Native showcase.

## 贡献

### 创建分支

1.  `git checkout master` from any folder in your local `ddn-docs`
    repository
2.  `git pull origin master` to ensure you have the latest main code
3.  `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch`
    with a suitable name) to create a branch

### 修改文档

1.  Follow the "Running locally" instructions
1.  Save the files and check in the browser. Some changes may require a server restart.
1.  Changes to /docs will only be visible in the latest version of the documentation (master).

`open http://localhost:3000/ddn-docs/versions.html`to see other versions.

### 测试修改

1.  If possible, test any visual changes in all latest versions of common
    browsers, on both desktop and mobile.

### 提交代码

1.  Run `yarn prettier` to ensure your changes are consistent with other files in
    the repo
1.  `git add -A && git commit -m "My message"` (replacing `My message` with a
    commit message, such as `Fixed header logo on Android`) to stage and commit
    your changes
1.  `git push my-fork-name the-name-of-my-branch`
1.  Go to the
    [ddn-docs repo](https://github.com/facebook/ddn-docs)
    and you should see recently pushed branches.
1.  Follow GitHub's instructions.
1.  If possible, include screenshots of visual changes.

```
注意：在markdown文档中， 'header' 信息可能会因为编码问题，导致错误。比如id会多出一个 '\b'，删除header部分，重写即可。
```

---

## 协议

DDN documentation is [Creative Commons licensed](./LICENSE-docs).
