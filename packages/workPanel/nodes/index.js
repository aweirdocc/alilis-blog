import noteNodeRegister from './noteNode/index';


export default class NodeRegister {
  constructor(lf) {
		this.lf = lf;
	}

  initRegisters() {
    noteNodeRegister(this.lf);
	}
}