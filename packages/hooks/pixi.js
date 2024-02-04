import { onMounted, onBeforeUnmount, ref, isRef, reactive } from 'vue';
import * as PIXI from 'pixi.js';

if (typeof window != 'undefined') {
  window.PIXI = PIXI;
}

const pixiCache = ref([]);

const usePixi = (config) => {
  const model = ref(null);
  let pixiInstance = reactive({});
  
  const initPixi = (viewRef) => {
    pixiInstance = new PIXI.Application({
      view: isRef(viewRef) ? viewRef.value : viewRef,
      backgroundAlpha: 0,
    });
    
    pixiCache.value.push(pixiInstance);
  }

  const initModel = async (modelPath = '/models/hiyori/hiyori_free_t08.model3.json') => {
    const { Live2DModel } = await import('pixi-live2d-display/cubism4');

    model.value = await Live2DModel.from(modelPath);
    model.value.scale.set(0.15);
    pixiInstance.stage.addChild(model.value);
  }

  const destoryAllRenderer = () => {
    if (pixiCache.value.length) {
      pixiCache.value.forEach(pixi => pixi.destroy());

      pixiCache.value = [];
    }
  }

  onMounted(async() => {
    if (config) {
      await initPixi(config?.view);
      await initModel(config?.modelPath);
    }
  });

  return {
    // 模型实例
    model,
    // 渲染器实例
    pixiInstance,
    // 渲染器实例缓存
    pixiCache,
    // 销毁渲染器
    destoryAllRenderer
  }
}

export default usePixi;
