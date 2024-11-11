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
    <div class="media-grid">
        <div v-for="channel in streaming">
            {{channel.title}}
            <iframe :src="channel.link" :title="channel.title" width="100%" height="360px" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
        </div>
    </div>`
};
