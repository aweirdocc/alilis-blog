import { createVNode, render } from 'vue';
import NoteNode from './index.vue';

export default function NoteNodeRegister(lf) {
	lf.register('note', ({ HtmlNode, HtmlNodeModel }) => {
		class Node extends HtmlNode {
			setHtml(rootEl) {
				const { properties } = this.props.model;
				const { graphModel, model } = this.props;
				const el = document.createElement('div');

        el.setAttribute('style', 'height: 100%');

				rootEl.innerHTML = '';
				rootEl.appendChild(el);

				const NoteNodeCom = createVNode(NoteNode, {
					props: {},
					on: {},
				});

				render(NoteNodeCom, el);
			}
		}

		class Model extends HtmlNodeModel {
			initNodeData(data) {
				super.initNodeData(data);

        this.width = 150;
        this.height = 150;
			}
		}

		return {
			view: Node,
			model: Model,
		};
	});
}