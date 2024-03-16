import { ref, onBeforeMount } from 'vue';
import ws from 'ws';
import CryptoJS from 'crypto-js';
import Base64 from 'base-64';

const config = {
  key: "6496fd30bab7968ddb8d63e10bbaceb6",
  secret: "Y2IyYjMxMzJlYzAyMWZmOGJhYmE3MTlm",
}

const statusMap = Object.freeze({
  0: "UNDEFINED",
  1: "CONNECTING",
  2: "PLAY",
  3: "STOP"
});


const storage = window.localStorage;

export function getWebSocketUrl(apiKey, apiSecret) {
  var url = "wss://tts-api.xfyun.cn/v2/tts";
  var host = location.host;
  var date = new Date().toGMTString();
  var algorithm = "hmac-sha256";
  var headers = "host date request-line";
  var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/tts HTTP/1.1`;
  var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
  var signature = CryptoJS.enc.Base64.stringify(signatureSha);
  var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
  var authorization = btoa(authorizationOrigin);
  url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;

  return url;
}

function encodeText(text, type) {
  if (type === "unicode") {
    let buf = new ArrayBuffer(text.length * 4);
    let bufView = new Uint16Array(buf);
    for (let i = 0, strlen = text.length; i < strlen; i++) {
      bufView[i] = text.charCodeAt(i);
    }
    let binary = "";
    let bytes = new Uint8Array(buf);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  } else {
    return Base64.encode(text);
  }
}

// 将base64编码的音频数据转换为Blob对象
function base64ToBlob(base64, fileType) {
  let typeHeader = 'data:' + fileType + ';base64,'; // 定义base64 头部文件类型
  
  // 去掉可能的url头部和数据URI方案前缀，确保只处理base64数据
  if (base64.startsWith(typeHeader)) {
      base64 = base64.substring(typeHeader.length);
  }

  // 将base64字符串解码为二进制数据
  let bytes = window.atob(base64);
  let byteArray = new TextEncoder().encode(bytes);

  return new Blob([byteArray], {
      type: fileType
  });
}


// 播放base64编码的音频数据
function playBase64Audio(base64Data, contentType) {
  const audio = new Audio();
  const blob = base64ToBlob(base64Data, contentType);
  console.log(992, audio, blob)
  const url = URL.createObjectURL(blob);

  
  audio.src = url;

  document.body.addEventListener('click', () => {
    console.log(991, url)
    // audio.play();
  })
  
}

export function useWs() {
  const ttsWS = ref(null);
  const ttsStatus = ref(statusMap['0']);
  const url = getWebSocketUrl(config.key, config.secret);

  const tts = JSON.parse(storage.getItem('tts'));

  playBase64Audio(tts[0].data.audio, 'audio/mp3');
  // JSON.parse(storage.getItem('tts')).map(item => {
  //   console.log(item)
  //   playBase64Audio(item.data.audio, 'audio/mp3');
  // });

  // if ("WebSocket" in window) {
  //   ttsWS.value = new WebSocket(url);
  // } else if ("MozWebSocket" in window) {
  //   ttsWS.value = new MozWebSocket(url);
  // } else {
  //   alert("浏览器不支持WebSocket");
  //   return;
  // }

  // ttsWS.value.onopen = (e) => {
  //   const text = "你好，我是小眼";

  //   var params = {
  //     common: {
  //       app_id: 'b46d07ec',
  //     },
  //     business: {
  //       aue: "raw",
  //       auf: "audio/L16;rate=16000",
  //       vcn: 'xiaoyan',
  //       speed: 50,
  //       volume: 50,
  //       pitch: 50,
  //       bgs: 1,
  //       tte: 'unicode',
  //     },
  //     data: {
  //       status: 2,
  //       text: encodeText(text, 'unicode'),
  //     },
  //   };

  //   console.log(params)
  //   ttsWS.value.send(JSON.stringify(params));
  // };

  // ttsWS.value.onmessage = (e) => {
  //   let jsonData = JSON.parse(e.data);

  //   if (jsonData.data?.audio) {
  //     playBase64Audio(jsonData.data.audio, 'audio/mp3');
  //   }

  //   const cacheStorage = JSON.parse(storage.getItem('tts')) || [];
  //   cacheStorage.push(jsonData);
  //   storage.setItem('tts', JSON.stringify(cacheStorage));
  //   console.log(jsonData, cacheStorage);
    

  //   if (jsonData.code === 0 && jsonData.data.status === 2) {
  //     ttsWS.value.close();
  //   }
  // };

  // ttsWS.value.onerror = (e) => {};
  // ttsWS.value.onclose = (e) => {};

  return {
    ttsWS,
    url
  }
} 