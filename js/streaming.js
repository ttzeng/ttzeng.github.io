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
            this.activeCategory = this.categories[0];
        }).done(() => {
            // Wait for DOM to update
            this.$nextTick(() => {
                $("[data-role='navbar']").navbar();
            });
        });
    },
    template: /* html */`
    <div data-role="navbar">
        <ul>
            <li v-for="(category, index) in categories" @click="activeCategory = category">
                <a :class="{ 'ui-btn-active' : index === 0 }">{{category}}</a>
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
