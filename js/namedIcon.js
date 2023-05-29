export default {
    props: {
        size: { type: Number, default: 56 },
        icon: { type: String, required: true },
        link: { type: String, required: true }
    },
    computed: {
        textWidth() {
            return {
                "inline-size": this.size + "px",
                "overflow-wrap": "break-word",
            }
        }
    },
    template: /* html */`
    <div class="namedIcon">
        <a :href="link" :style="textWidth"><img :height="size" :src="icon"/><slot/></a>
    </div>`
};
