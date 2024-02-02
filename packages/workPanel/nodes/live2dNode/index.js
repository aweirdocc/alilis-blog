import { createVNode, render } from 'vue';
import Live2d from './index.vue';

export default function Live2dRegister(lf) {
	lf.register('live2d', ({ HtmlNode, HtmlNodeModel }) => {
		class Node extends HtmlNode {
			setHtml(rootEl) {
				const { properties } = this.props.model;
				const { graphModel, model } = this.props;
				const el = document.createElement('div');

        el.setAttribute('style', 'height: 100%');

				rootEl.innerHTML = '';
				rootEl.appendChild(el);

				const Live2dCom = createVNode(Live2d);

				render(Live2dCom, el);
			}
		}

		class Model extends HtmlNodeModel {
			initNodeData(data) {
				super.initNodeData(data);

        this.width = 150;
        this.height = 200;
			}
		}

		return {
			view: Node,
			model: Model,
		};
	});
}