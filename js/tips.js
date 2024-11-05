export default {
    data() {
        return {
            pointers: [],
            message: "",
        }
    },
    methods: {
        tipsFromString(obj) {
            // The argument is either a single string or an array of strings.
            this.message = (obj.constructor === Array)? obj.join(' ') : obj;
        },
        tipsFromFile(fname) {
            fetch(fname).then(res => res.text()).then(text => this.message = text);
        },
        switchToggle() {
            $("#listTips").filterable("option", "filterReveal", $("#headerSwitch").prop("checked"))
                          .filterable("refresh");
        }
    },
    mounted() {
        $.getJSON("/json/tips.json", (data) => {
            this.pointers = data.pointers;
        }).done(() => {
            $("#inputQuery").textinput();
            $("#listTips").listview();
            // Below filterable widget is initially set to reveal mode,
            // so set the flipswitch to ON everytime the component is mounted.
            $("#headerSwitch").prop('checked', true)
                              .flipswitch("refresh")
                              .change(this.switchToggle);
            $("#popup").popup();
        });
    },
    template: /* html */`
    <form>
        <input data-type="search" id="inputQuery">
    </form>
    <div data-role="listview" id="listTips"
         data-filter="true" data-input="#inputQuery" data-filter-reveal="true"
         data-inset="true" data-enhanced="true"
         data-filter-placeholder="Enter keyword...">
        <li v-for="item in pointers" class="ui-screen-hidden">
            <a v-if="item.type === 'url'" :href="item.context">{{item.topic}}</a>
            <a v-else-if="item.type === 'popup'" href="#popup" data-rel="popup" @click="tipsFromString(item.context)">{{item.topic}}</a>
            <a v-else-if="item.type === 'file'" href="#popup" data-rel="popup" @click="tipsFromFile(item.context)">{{item.topic}}</a>
        </li>
    </div>
    <div data-role="popup" id="popup"
         data-position-to="window" data-transition="pop"
         class="ui-content" v-html="message">
    </div>`
};
