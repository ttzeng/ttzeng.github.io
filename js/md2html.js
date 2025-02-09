import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

export default {
    name: 'Md2Html',
    props: {
        src: { type: String, required: true }
    },
    computed: {
        htmlOutput() {
            return marked(this.src);
        },
    },
    template: /* html */`
    <div v-html="htmlOutput"></div>`
};
