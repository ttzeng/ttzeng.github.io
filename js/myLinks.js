import namedIcon from "./namedIcon.js";

export default {
    data() {
        return {
            banks: [],
            securities: []
        }
    },
    components: {
        namedIcon
    },
    mounted() {
        $.getJSON("/json/finance.json", (data) => {
            this.banks = data.banks;
            this.securities = data.securities;
        }).done(() => {
            $("[data-role='collapsible']").collapsible();
        });
    },
    template: /* html */`
    <div data-role="collapsible">
        <h1>理財</h1>
        <div class="radiusNamedGroup">
            <span class="name">銀行</span>
            <named-icon v-for="item in banks" :link="item.link" :icon="item.icon">{{item.title}}</named-icon>
        </div>
        <div class="radiusNamedGroup">
            <span class="name">證券</span>
            <named-icon v-for="item in securities" :link="item.link" :icon="item.icon">{{item.title}}</named-icon>
        </div>
    </div>`
};
