---
title: 2024
titleTemplate: 你了解文件流吗
description: 日常开发中，网页的文件传输大多都是以Blob文件流的方式进行前后端的交互。本篇文章会总结一下流的使用技巧。
createDate: 2024-01-16
tag: 前端  
---

# 你了解文件流吗

日常开发中，网页的文件传输大多都是以文件流的方式进行前后端的交互。本篇文章会总结一下流的使用方法。



## Blob 

`Blob` 对象表示**一个不可变、只读原始数据的类文件对象**， 也就是二进制文件对象。

```js
const blob = new Blob( array, options );
```

具体参数如下：

- array：一些数据的集合
- options
  - type： 将会被存储到 blob 中的数据的 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type)。默认值是空字符（`""`）。



当使用普通对象创建Blob对象时，**会先调用了普通对象的 `toString()` 方法得到字符串数据，然后再创建Blob对象。**

```js
const data = { "name": "cc" };

const blob1 = new Blob([JSON.stringify(data)]); // size: 13
const blob2 = new Blob([data]);	// size: 15
```

`blob2`保存的数据其实是"**[object Object]**"，它是15个字节。



### 实例属性

`Blob.size` ： 该`Blob` 对象中所包含数据的大小（字节）。

`Blob.type`：该`Blob` 对象所包含数据的 MIME 类型。

### 实例方法

`Blob.slice()`：返回一个新的 `Blob` 对象，包含了源 `Blob` 对象中指定范围内的数据。

- `start`：分割起始点
- `end`：分割终点
- `contentType`： 新的MIME类型

```js
const newBlob = blob.slice(start, end, contentType)
```

在文件切片上传时会用到这个方法。



---



`Blob.text()`： 返回一个 promise，其会兑现一个包含 `Blob` 所有内容的 UTF-8 格式的字符串。

```js
const text = await blob.text();
```



---



`Blob.arrayBuffer()`：返回一个 promise，其会兑现一个包含 `Blob` 所有内容的二进制格式的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)。

```js
const buffer = await blob.arrayBuffer();
```



---



`Blob.stream()`：返回一个能读取 `Blob` 内容的 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream)。

```js
const buffer = blob.stream()
```



### Blob URL

Blob URL是**blob协议**的地址，它的格式为：`blob:http://xxx`。在实际开发中，我们可以`URL.createObjectURL(blob)`来创建`Blob URL`。常见的应用场景有文件的下载地址和图片资源地址。

文件下载做举例：

```js
const data = await fetchFileData();

const link = document.createElement('a');
const blob = new Blob([data], {
  type: 'text/plain' // 文件类型
});
link.download = 'filedata'; // 设置文件名
link.href = URL.createObjectURL(blob);	// 生成地址
link.click();
window.URL.revokeObjectURL(link.href);	// 释放内存
```

图片资源也是同理，只需替换对应的类型即可，最后生成的地址可以在游览器标签栏中打开。

:::tip

当调用`createObjectURL`方法时，都会创建一个新的URL对象，浏览器在 document 卸载的时候，会自动释放它们，但为了最佳性能和内存使用，当不再需要这些 URL 对象时，每个对象必须通过调用 [`URL.revokeObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL_static) 方法来释放。

:::



## File

`File`继承自`Blob`，也是二进制对象，通常情况下， `File` 对象是来自用户在一个 [`input`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input) 元素上选择文件后返回的 [`FileList`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileList) 对象，也可以是来自由拖放操作生成的 [`DataTransfer`](https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer) 对象。

```js
var file = new File(array, name, options);
```

具体参数如下：

- array：一些数据的集合。
- name： 文件名称或者文件路径。
- options
  - type： 将会被存储到 blob 中的数据的 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type)。默认值是空字符（`""`）。
  - lastModified：数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。



### 实例属性

- name：文件名

- size：文件大小

- lastModified ：最后修改时间（时间戳）

- lastModifiedDate：最后修改时间Data对象

- type：MIME类型

  

###  实例方法 

继承自`Blob`的`slice`方法。



## ArrayBuffer

**`ArrayBuffer`** 对象用来表示通用的原始二进制数据缓冲区。**不能直接操作 `ArrayBuffer` 中的内容；**

这块儿内容后续更新。



## Base64

Base64 是一种基于64个可打印字符来表示二进制数据的表示方法。Base64是一种最常见的二进制编码方法，将二进制数据使用 ASCII 字符串格式表示。

<zoom-img src="https://img.alilis.space/image-20240124165855197.png-alilis_img"></zoom-img>

Base64主要解决系统以及传输协议之间二进制不兼容的问题，所以它比较适合在不同平台及语言之间的传输。

在 JavaScript 中，有两个函数被分别用来处理解码和编码 *base64* 字符串：

- [`atob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/atob)：解码，解码一个 Base64 字符串；
- [`btoa()`](https://developer.mozilla.org/zh-CN/docs/Web/API/btoa)：编码，从一个字符串或者二进制数据编码一个 Base64 字符串。

```js
btoa("JavaScript")       // 'SmF2YVNjcmlwdA=='
atob('SmF2YVNjcmlwdA==') // 'JavaScript'
```

日常开发中，可以将使用`toDataURL()`方法把 canvas 画布内容生成 base64 编码格式的图片：

```js
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext("2d");
const dataUrl = canvas.toDataURL();
```

或者可以将小图片文件转换成Base64格式进行上传或展示。

:::tip

如果你将一个字符串传递给 `btoa()`，而其中包含了需要使用超过一个字节才能表示的字符，你就会得到一个错误，因为这个字符串不能被看作是二进制数据。

Base64不是加密算法，它仅仅是一种编码的方式，所以不能用来处理加密数据。

:::




## FileReader 

[`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)对象允许 `Web` 应用程序**异步读取存储**在用户计算机上的文件（或原始数据缓冲区）的内容，使用 `File` 或 `Blob` 对象指定要读取的文件或数据。



它有三个属性：

- `FileReader.error`： 表示在读取文件时发生的错误；
- `FileReader.readyState`：表示 `FileReader` 状态的数字。：
  - `EMPTY`： 0 还没有加载任何数据
  - `LOADING`： 1 数据正在被加载
  - `DONE`： 2 已完成全部的读取请求
- `FileReader.result`： 文件的内容。仅在读取操作完成后才有效。

----

### 事件处理函数

- `FileReader.onabort`：处理 `abort` 事件。该事件在读取操作被中断时触发。
- `FileReader.onerror`：处理 `error` 事件。该事件在读取操作发生错误时触发。
- `FileReader.onload`：处理 `load` 事件。该事件在读取操作完成时触发。
- `FileReader.onloadstart`：处理 `loadstart` 事件。该事件在读取操作开始时触发。
- `FileReader.onloadend`：处理 `loadend` 事件。该事件在读取操作结束时（要么成功，要么失败）触发。
- `FileReader.onprogress`：处理 `progress` 事件。该事件在读取 `Blob` 时触发。提供了两个属性：`loaded`（已读取量）和`total`（需读取总量）。

---

### 实例方法

- `FileReader.abort()`：中止读取操作。在返回时，`readyState` 属性为 `DONE`。
- `FileReader.readAsArrayBuffer()`：开始读取指定的 `Blob` 中的内容。一旦完成，`result` 属性将包含一个`ArrayBuffer` 来表示文件数据；
- `FileReader.readAsBinaryString()`：开始读取指定的 `Blob` 中的内容。一旦完成，`result` 属性中将包含所读取文件的原始二进制数据。
- `FileReader.readAsDataURL()`：开始读取指定的 `Blob` 中的内容。一旦完成，`result` 属性中将包含一个 `data: URL` 格式的字符串以表示所读取文件的内容。
- `FileReader.readAsText()`：开始读取指定的 `Blob` 中的内容。一旦完成，`result` 属性中将包含一个字符串以表示所读取的文件内容。

---

### 示例

```js
onUpload(files) {
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log('Files logs: ', file);
      const fileAsBinaryString = reader.result;
      // Todo...
    };
    reader.onabort = () => console.log('文件读取被中止');
    reader.onerror = () => console.log('文件读取失败');
    reader.onprogress = (e) => {
      if (e.loaded && e.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`上传进度: ${Math.round(percent)} %`);
      }
    });  
      

    reader.readAsBinaryString(file);
  });
}
```

::: tip

在操作文件时，必须在`onLoad`之后进行。

::: 



## 文件类型转换

### File 转换成 Blob

```js
const toBlob = new Blob([file], {type: file.type})
```

### Blob转换成File

```js
const files = new File([blob], fileName, {type: fileType})
```

### Blob转换成Base64

 ```js
 function blob2Base64(data, callback) {
     const fileReader = new FileReader();
     fileReader.onload = function (e) { callback(e.target.result); };
     
     fileReader.readAsDataURL(data);
 }
 ```

### Base64转换成Blob

```js
function base64ToBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 512;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);
    const bytes = new Array(end - begin);

    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }

  return new Blob(byteArrays, { type: contentType });
}
```

### Blob转成ObjectURL

```js
const objectUrl = URL.createObjectURL(blob);
```





