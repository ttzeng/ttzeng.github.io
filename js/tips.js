export default {
    data() {
        return {
            pointers: [],
            message: "",
        }
    },
    mounted() {
        $.getJSON("/json/tips.json", (data) => {
            this.pointers = data.pointers;
        }).done(() => {
            $("#inputQuery").textinput();
            $("#listTips").listview();
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
            <a v-else-if="item.type === 'popup'" href="#popup" data-rel="popup" @click="message=item.context">{{item.topic}}</a>
        </li>
    </div>
    <div data-role="popup" id="popup"
         data-position-to="window" data-transition="pop"
         class="ui-content" v-html="message">
    </div>`
};
