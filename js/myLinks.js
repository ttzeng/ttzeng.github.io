import namedIcon from "./namedIcon.js";

export default {
    data() {
        return {
            learnings: [],
            technologies: [],
            techDomains: [],
            domainSelected: "",
            banks: [],
            securities: []
        }
    },
    components: {
        namedIcon
    },
    mounted() {
        $.getJSON("/json/knowledge.json", (data) => {
            this.technologies = data.technologies;
            var domainSet = new Set();
            data.technologies.forEach(e => { domainSet.add(e.domain) });
            this.techDomains = Array.from(domainSet);
            this.learnings = data.learnings;
        }).done(() => {
            $("#domainSelector").selectmenu();
            $("#groupKnowledge").collapsible();
        });
        $.getJSON("/json/finance.json", (data) => {
            this.banks = data.banks;
            this.securities = data.securities;
        }).done(() => {
            $("#groupFinance").collapsible();
        });
    },
    template: /* html */`
    <div id="groupKnowledge" data-role="collapsible">
        <h1>知識</h1>
        <div class="radiusNamedGroup">
            <span class="name">技術</span>
            <select id="domainSelector" v-model="domainSelected" data-mini="true">
                <option v-for="domain in techDomains" :value="domain">{{domain}}</option>
            </select>
            <template v-for="item in technologies">
                <named-icon v-show="item.domain === domainSelected" :link="item.url" :icon="item.icon">{{item.name}}</named-icon>
            </template>
        </div>
        <div class="radiusNamedGroup">
            <span class="name">學習</span>
            <named-icon v-for="item in learnings" :link="item.link" :icon="item.icon">{{item.title}}</named-icon>
        </div>
    </div>
    <div id="groupFinance" data-role="collapsible">
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
