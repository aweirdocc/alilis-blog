import noteNodeRegister from './noteNode/index';
import live2dRegister from './live2dNode/index';


export default class NodeRegister {
  constructor(lf) {
		this.lf = lf;
	}

  initRegisters() {
    noteNodeRegister(this.lf);
    live2dRegister(this.lf);
	}
}