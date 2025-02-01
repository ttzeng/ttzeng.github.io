export default {
    data() {
        return {
            streaming: [],
            categories: [],
            activeCategory: "",
        }
    },
    mounted() {
        $.getJSON("/json/links.json", (data) => {
            this.streaming = data.streaming;
            var categories = new Set();
            data.streaming.forEach(e => { categories.add(e.type) });
            this.categories = Array.from(categories);
        }).done(() => {
            // Move the compiled navbar to the header as Vue compiled the template before running the script
            $("#headerNavbar").append($("#scratchpad ul"));
            // Wait for DOM to update
            this.$nextTick(() => {
                $("#headerNavbar").navbar('destroy').navbar();
            });
        });
    },
    unmounted() {
        $("#headerNavbar").empty();
    },
    template: /* html */`
    <div data-role="navbar" id="scratchpad" style="display: none">
        <ul>
            <li v-for="(category, index) in categories" @click="activeCategory = category">
                <button>{{category}}</button>
            </li>
        </ul>
    </div>
    <div class="media-grid">
        <div v-for="channel in streaming" v-show="channel.type === activeCategory">
            {{channel.title}}
            <iframe :src="channel.link" :title="channel.title" width="100%" height="360px" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
        </div>
    </div>`
};
