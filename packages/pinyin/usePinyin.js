import { ref, reactive, onBeforeMount } from 'vue';
import ws from 'ws';
import CryptoJS from 'crypto-js';
import Base64 from 'base-64';
import './libs/index.umd.js';


const config = {
  key: "6496fd30bab7968ddb8d63e10bbaceb6",
  secret: "Y2IyYjMxMzJlYzAyMWZmOGJhYmE3MTlm",
}
export const statusMap = Object.freeze({
  0: "UNDEFINED",
  1: "CONNECTING",
  2: "COMMIX",
  3: "PLAYING",
  4: "DONE"
});

const ttsStatus = ref(statusMap['0']);

function getWebSocketUrl(apiKey, apiSecret) {
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
    return btoa(binary);
  } else {
    return Base64.encode(text);
  }
}

function createAudio() {
  const audioPlayer = new AudioPlayer("/libs");

  audioPlayer.onPlay = () => {
    changeStatus(statusMap[3]);
  };

  audioPlayer.onStop = (audioDatas) => {
    changeStatus(statusMap[4]);
  };

  return audioPlayer;
}

function changeStatus(status) {
  ttsStatus.value = status;
}

export default function usePinyin(text, options) {
  let ttsWS = null;
  const audioPlayer = createAudio();
  const url = getWebSocketUrl(config.key, config.secret);

  if ("WebSocket" in window) {
    ttsWS = new WebSocket(url);
  } else if ("MozWebSocket" in window) {
    ttsWS = new MozWebSocket(url);
  } else {
    alert("浏览器不支持WebSocket");
    return;
  }

  function sendText2tts(text) {
    const params = {
      common: {
        app_id: 'b46d07ec',
      },
      business: {
        aue: "raw", // 音频编码
        auf: "audio/L16;rate=16000",  // 音频采样率
        vcn: 'xiaoyan', // 发音人
        speed: 50,  // 语速
        volume: 50,  // 音量
        pitch: 50,  // 音调
        bgs: 1,  // 合成音频的背景音
        tte: 'unicode', // 文本编码格式
      },
      data: {
        status: 2,
        text: encodeText(text, 'unicode'),
      },
    };

    ttsWS.send(JSON.stringify(params));
  }
  

  ttsWS.onopen = (e) => {
    audioPlayer.start({
      autoPlay: true,
      sampleRate: 16000,
      resumePlayDuration: 1000
    });

    changeStatus(statusMap[1]);
    // 发送文本
    sendText2tts(text);
  };

  ttsWS.onmessage = (e) => {
    let jsonData = JSON.parse(e.data);

    // 合成失败
    if (jsonData.code !== 0) {
      console.error(jsonData);
      return;
    }
    // 语音合成中
    audioPlayer.postMessage({
      type: "base64",
      data: jsonData.data.audio,
      isLastData: jsonData.data.status === 2,
    });

    if (jsonData.code === 0 && jsonData.data.status === 2) {
      ttsWS.close();
      
      changeStatus(statusMap[2]);
    }
  };

  ttsWS.onerror = (e) => { };
  ttsWS.onclose = (e) => { };

  return {
    url,
    ttsWS,
    ttsStatus,
    sendText2tts
  }
} 