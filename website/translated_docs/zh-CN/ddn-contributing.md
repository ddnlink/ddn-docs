---
id: ddn-contributing
title: Contributing
sidebar_label: Contributing
---

感谢你对本文档感兴趣!

## 文本教程

**不同部分不同类型**

本文档分成了几个不同部分，每个部分对应不同的类型和使用案例。当编辑一篇文章时，要符合该部分的风格和类型。当创建新文档时，要符合本部分其他文章的风格。下面是每个部分背后的逻辑：

**[快速起步](https://ddn.link/docs/getting-started.html)*这里包含一些基本信息。不要添加太多细节，为了实现一个可以工作的开发环境，代码示例应该包含最少化步骤，并且预期会有更长的步骤来搭建一个可以工作的开发环境。无论如何，对于初学者，尽可能机械的遵循每个步骤，仍然能够获得一个可以工作的DDN应用。

**[教程](https://ddn.link/docs/tutorial.html)** 这部分是用来一步一步介绍基础概念的。每篇独立的文章都要建立在前面文章的基础上，所以，要保证他们中间不要添加任何“循环依赖”。重要的是，读者能从第一篇文章开始，不用总是回头看定义就可以走到最后一篇文章。这说明了一些顺序选择。这部分文章不要添加太多细节，故意不要让它们覆盖到所有边边角角的细节，而专注于打好基础。

**[接口](https://ddn.link/docs/apis.html)**
are deep dives into topics that aren't essential for a beginner developer but
that everyone bumps into sooner or later. They don't have a specific order, and
target more experienced developers. If you have a set of recipes fitting a
particular use case, and those recipes aren't opinionated (most DDN
users would agree on them), this is the place to add them.

**[参考](https://ddn.link/docs/activityindicator.html)**
is organized by APIs rather than concepts. It is intended to be exhaustive. Any
corner cases or recommendations that were skipped for brevity in The Basics or
Guides should be mentioned in the reference documentation for the corresponding
APIs.

**[贡献](https://ddn.link/docs/contributing.html)**
should stay up-to-date and be friendly to relatively experienced developers.

**[更多资源](https://ddn.link/docs/more-resources.html)**
has a more conversational tone than the other sections. Here, it's fine to
include some content that's not primarily concerned with DDN, as long
as DDN users are overwhelmingly interested in it (e.g. recommendations
on which libraries to use).

**Try to follow your own instructions.**

When writing step-by-step instructions (e.g. how to install something), try to
forget everything you know about the topic, and actually follow the instructions
you wrote, a single step at time. Often you will discover that there is implicit
knowledge that you forgot to mention, or that there are missing or out-of-order
steps in the instructions. Bonus points for getting _somebody else_ to follow
the steps and watching what they struggle with. Often it would be something very
simple that you have not anticipated.
