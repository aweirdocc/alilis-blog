import "@logicflow/core/dist/style/index.css";

import NodeRegister from "../nodes";

class LfUtil {
  constructor(domRef, config = {}) {
    this.lf = null;
    this._el = domRef;
    this.config = config;

    this.initLf();
  }

  initLf() {
    this.lf = new window.LogicFlow({
      container: this._el.value,
      grid: true,
      ...this.config
    })

    this.registNodes();

    this.lf.render({
      // nodes: [
      //   {
      //     type: "note",
      //     x: 100,
      //     y: 100,
      //     properties: {},
      //   },
      // ]
    });
  }

  // 注册自定义节点
  registNodes() {
    if (this.lf) {
      const registers = new NodeRegister(this.lf);

      registers.initRegisters();
    }
  }
}


export default LfUtil;