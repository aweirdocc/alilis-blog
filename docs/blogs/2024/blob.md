---
title: 2024
titleTemplate: Blob文件流
description: 日常开发中，网页的文件传输大多都是以Blob 文件流的方式进行前后端的交互。本篇文章会总结一下流的使用技巧。
createDate: 2024-01-16
tag: 前端  
---

# 你了解文件流吗

日常开发中，网页的文件传输大多都是以文件流的方式进行前后端的交互。本篇文章会总结一下流的使用方法。




## FileReader 

[`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)对象允许 `Web` 应用程序**异步读取存储**在用户计算机上的文件（或原始数据缓冲区）的内容，使用 `File` 或 `Blob` 对象指定要读取的文件或数据。

它有三个只读树形：

- `FileReader.error`： 表示在读取文件时发生的错误；
- `FileReader.readyState`：表示 `FileReader` 状态的数字。：
  - `EMPTY`： 0 还没有加载任何数据
  - `LOADING`： 1 数据正在被加载
  - `DONE`： 2 已完成全部的读取请求
- `FileReader.result`： 文件的内容。仅在读取操作完成后才有效。

----

事件处理函数：

- `FileReader.onabort`：处理 `abort` 事件。该事件在读取操作被中断时触发。
- `FileReader.onerror`：处理 `error` 事件。该事件在读取操作发生错误时触发。
- `FileReader.onload`：处理 `load` 事件。该事件在读取操作完成时触发。
- `FileReader.onloadstart`：处理 `loadstart` 事件。该事件在读取操作开始时触发。
- `FileReader.onloadend`：处理 `loadend` 事件。该事件在读取操作结束时（要么成功，要么失败）触发。
- `FileReader.onprogress`：处理 `progress` 事件。该事件在读取 `Blob` 时触发。

---

实例方法：

- `FileReader.abort()`：中止读取操作。在返回时，`readyState` 属性为 `DONE`。
- `FileReader.readAsArrayBuffer()`：开始读取指定的 `Blob` 中的内容。一旦完成，`result` 属性将包含一个`ArrayBuffer` 来表示文件数据；
- `FileReader.readAsBinaryString()`：开始读取指定的 `Blob` 中的内容。一旦完成，`result` 属性中将包含所读取文件的原始二进制数据。
- `FileReader.readAsDataURL()`：开始读取指定的 `Blob` 中的内容。一旦完成，`result` 属性中将包含一个 `data: URL` 格式的字符串以表示所读取文件的内容。
- `FileReader.readAsText()`：开始读取指定的 `Blob` 中的内容。一旦完成，`result` 属性中将包含一个字符串以表示所读取的文件内容。

---

示例：

```js
onDrop(files) {
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log('Files logs: ', file);
      const fileAsBinaryString = reader.result;
      // Todo...
    };
    reader.onabort = () => console.log('文件读取被中止');
    reader.onerror = () => console.log('文件读取失败');

    reader.readAsBinaryString(file);
  });
}
```



## 图片流

图片流就是用二进制流来表示图片。相对于字符类型的数据，二进制数据存储时无需转换，在数据量很大时，存储会更快。

它的一些使用场景：

- 通过 input 上传；
- 图片预览；
- 图片数据存储；
- 动态图片生成；







