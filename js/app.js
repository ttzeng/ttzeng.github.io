import { CapacitorHttp } from "https://unpkg.com/@capacitor/core@latest/dist/index.js";
import myLinks from "./myLinks.js";
import myDeliverables from "./myDeliverables.js";

export default {
    // Use data() option to declare an object that represent reactive state of a component.
    // Vue calls this function when creating a new component instance, the object is then added
    // to its reactivity system to trigger reactive updates.
    data() {
        return {
            adviceOfDay: "",
            activeContent: "",
            contents: [
                { key: "myLinks",
                  label: "常用鍊結"
                },
                { key: "myDeliverables",
                  label: "成果發表"
                }
            ]
        }
    },
    // Register any imported components to create the tags associated with those components.
    components: {
        myLinks,
        myDeliverables
    },
    // Hooks to be called at different stages of the instance's lifecycle.
    created() {
        const getAdvice = async () => {
            const options = {
                // Advice Slip JSON API (https://api.adviceslip.com)
                url: "https://api.adviceslip.com/advice"
            };
            const response = await CapacitorHttp.get(options);
            this.adviceOfDay = JSON.parse(response.data).slip.advice;
        };
        getAdvice();
    },
    // The template of the rendered DOM to the component.
    template: /* html */`
    <div data-role="page">
        <div data-role="header">
            <!-- Secify 'ui-title' class explicitly for headers with no heading but buttons-->
            <span class="ui-title"></span>
            <div data-role="controlgroup" data-type="horizontal" class="ui-btn-left">
                <a href="#left-panel" class="ui-btn ui-btn-icon-notext ui-icon-grid">No text</a>
                <a class="ui-btn ui-btn-icon-left"
                   v-for="tab in contents"
                   @click="activeContent = tab.key"
                   :key="tab.key"
                   :class="{ 'ui-btn-active': activeContent === tab.key,
                             'ui-icon-arrow-d': activeContent === tab.key }">
                    {{tab.label}}</a>
            </div>
        </div>
        <div role="main" class="ui-content">
            <!-- Dynamic Components
                 https://vuejs.org/guide/essentials/component-basics.html#dynamic-components-->
            <component :is="activeContent"></component>
        </div>
        <div data-role="footer" data-position="fixed">
            <h2>{{ adviceOfDay }}</h2>
        </div>
        <div data-role="panel" id="left-panel" data-display="overlay">
        </div>
    </div>`
};
