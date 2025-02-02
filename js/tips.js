import Md2Html from "./md2html.js";

export default {
    data() {
        return {
            pointers: [],
            sections: [],
            message: "",
        }
    },
    components: {
        Md2Html,
    },
    methods: {
        tipsFromString(obj) {
            // The argument is either a single string or an array of strings.
            this.message = (obj.constructor === Array)? obj.join(' ') : obj;
        },
        tipsFromFile(fname) {
            fetch(fname).then(res => res.text()).then(text => this.message = text);
        },
        tipsFromIniFile(fname) {
            this.sections = [];
            fetch(fname).then(res => res.text()).then(text => {
                // Split the content by lines
                const lines = text.split('\n');

                // Initialize variables
                let currentSection = null;
                // Process each line
                lines.forEach(line => {
                    // Trim whitespace
                    line = line.trim();
                    // Start a new section if the line is a section header
                    if (line.startsWith('[') && line.endsWith(']')) {
                        if (currentSection) {
                            // End the previous section
                            this.sections.push(currentSection);
                        }
                        currentSection = { name: line.slice(1, -1), content: "" };
                    } else if (currentSection !== null) {
                        // Append the line to the current section
                        currentSection.content += line + '\n';
                    }
                });
                if (currentSection !== null) {
                    // End the last section
                    this.sections.push(currentSection);
                }
            });
            this.message = "";
            setTimeout(() => {
                $("[data-role='navbar']").navbar();
            }, 250);
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
            $("#headerSwitch").parent().css('display', 'inline');
            $("#headerSwitch").prop('checked', true)
                              .flipswitch("refresh")
                              .change(this.switchToggle);
            $("[data-role='popup']").popup();
        });
    },
    unmounted() {
        $("#headerSwitch").parent().css('display', '');
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
            <a v-else-if="item.type === 'multi-sections'" href="#multitab-popup" data-rel="popup" data-position-to="#multitab-popup" @click="tipsFromIniFile(item.context)">{{item.topic}}</a>
        </li>
    </div>
    <div data-role="popup" id="popup" class="ui-content" v-html="message">
    </div>
    <div data-role="popup" id="multitab-popup" class="ui-content">
        <div data-role="navbar" v-if="sections.length > 0">
            <ul>
                <li v-for="s in sections"><a @click="message = s.content">{{s.name}}</a></li>
            </ul>
        </div>
        <md2-html :src="message"></md2-html>
    </div>`
};
