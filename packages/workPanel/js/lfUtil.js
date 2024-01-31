import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";

class LfUtil {
  constructor(domRef, config = {}) {
    this.lf = null;
    this._el = domRef;
    this.config = config;

    this.initLf();
  }

  initLf() {
    this.lf = new LogicFlow({
      container: this._el.value,
      grid: true,
      ...this.config
    })

    this.lf.render();
  }
}


export default LfUtil;