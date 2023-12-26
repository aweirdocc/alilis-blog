---
title: 2023
titleTemplate: 搭建七牛云图床
description: Alilis带你搭建七牛云图床，并使用PicGo 快速上传 
createDate: 2023-12-18
tag: 教程  
---

# 搭建七牛云图床

日常写文章的过程中，不免会有搭配一些图片，为了使用方便，本篇教程将教你使用七牛云的对象存储作为基底，搭配`PicGo`和`Typora`来快速搭建一个图床，轻松愉快的书写。



## 七牛云

七牛对象存储可以将数据文件以资源的形式上传到空间中。通过获取已上传文件的地址进行文件的分享和下载。

具体如何创建对象存储参考[这里](https://developer.qiniu.com/kodo/1233/console-quickstart)。创建成功后，可以在文件管理中上传资源。

<zoom-img src="https://img.alilis.space/image-20231218152015925.png-alilis_img" />

七牛云创建的`Bucket` 默认是需要绑定一个自定义域名，才支持外部的链接访问。

并且，七牛云还提供了图片压缩和水印的接口功能，图片压缩是无需参数配置，自动瘦身，这对我们网站可以节省一些存储空间和流量带宽，并且它支持开启`https`协议，你可以申请一个免费的证书。具体配置是在`CDN / 域名管理`页面。



## Typora 与  PicGo

`Typora` 作为强大的 markdown 书写工具，我们可以搭配`PicGo`实现图片的自动上传服务。这里是[Typora 官网](https://typora.io/)及[PicGo下载地址](https://github.com/Molunerfinn/PicGo/releases)。下载安装完成后，我们需要对其添加服务配置。



### 配置 PicGo

PicGo 默认是支持七牛云上传的，所以在图床设置里可以找到`七牛云`选项。

<zoom-img src="https://img.alilis.space/image-20231218165651489.png-alilis_img" />

- `AccessKey`和`SecretKey`：可以在七牛云控制台，秘钥管理页面新增一个配置，AK对应`AccessKey`， SK对应`SecretKey`。
- `Bucket`： 创建的对象空间的名称。
- 访问地址： 对象空间绑定的域名地址。
- 存储区域：对象空间的所在区域（华东 z0，华北 z1，华南 z2，北美 na0，东南亚 as0）。

配置填写完成后，可以将其设置成默认图床。

在`上传区`里，可以将本地的图片上传到七牛云的对象存储空间中。测试一张图片试试，然后我们将简单配置一下`Typora`，这样就不需要每次手动去上传图片了，当在Markdown文件中插入图片时，`Typora`可以自动上传图片至指定配置的存储空间。



### 配置 Typora

在工具栏`文件/偏好设置`里，我们找到图像设置，参考下图：

<zoom-img src="https://img.alilis.space/image-20231218165120312.png-alilis_img" />

完成配置后可以点击`验证图片上传选项`试试是否上传成功。如果失败，请确认你的配置是否正确。