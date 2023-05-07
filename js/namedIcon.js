export default {
    props: {
        size: { type: Number, default: 48 },
        icon: { type: String, required: true },
        link: { type: String, required: true }
    },
    template: /* html */`
    <div class="namedIcon">
        <a :href="link"><img :height="size" :src="icon"/><slot/></a>
    </div>`
};
