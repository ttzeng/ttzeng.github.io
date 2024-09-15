export default {
    data() {
        return {
            streaming: [],
        }
    },
    mounted() {
        $.getJSON("/json/links.json", (data) => {
            this.streaming = data.streaming;
        }).done(() => {
            // Wait for DOM to update
            this.$nextTick(() => {
                $("[data-role='collapsible']").collapsible();
            });
        });
    },
    template: /* html */`
    <div v-for="channel in streaming" data-role="collapsible" data-inset="false" data-collapsed="false"
         data-collapsed-icon="carat-d" data-expanded-icon="carat-u"
         style="text-align: center">
        <h1>{{channel.title}}</h1>
        <iframe :src="channel.link" :title="channel.title"
                width="400" height="225" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
    </div>`
};
