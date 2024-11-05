import { CapacitorHttp } from "https://unpkg.com/@capacitor/core@latest/dist/index.js";
import { defineAsyncComponent } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";

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
                  label: "常用鍊結",
                  enable: true,
                },
                { key: "myDeliverables",
                  label: "成果發表",
                  enable: true,
                },
                { key: "tips",
                  label: "提示",
                  enable: true,
                },
                { key: "streaming",
                  label: "即時影像",
                  enable: true,
                },
            ]
        }
    },
    // Register any imported components to create the tags associated with those components.
    components: {
        myLinks: defineAsyncComponent(()=>import("./myLinks.js")),
        myDeliverables: defineAsyncComponent(()=>import("./myDeliverables.js")),
        tips: defineAsyncComponent(()=>import("./tips.js")),
        streaming: defineAsyncComponent(()=>import("./streaming.js")),
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
                <a class="ui-btn ui-btn-icon-left header-btn"
                   v-for="tab in contents"
                   v-show="tab.enable"
                   @click="activeContent = tab.key"
                   :key="tab.key"
                   :class="{ 'ui-btn-active': activeContent === tab.key,
                             'ui-icon-arrow-d': activeContent === tab.key }">
                    {{tab.label}}</a>
                <select data-iconpos="left" v-model="activeContent" class="header-select">
                    <option v-for="tab in contents" v-show="tab.enable" :value="tab.key">{{tab.label}}</option>
                </select>
                <a href="blog/index.html" class="ui-btn ui-btn-icon-left" data-ajax="false">隨手記</a>
            </div>
            <div v-show="activeContent === 'tips'">
                <input type="checkbox" data-role="flipswitch" data-mini="true" id="headerSwitch" data-wrapper-class="ui-float-right"/>
            </div>
        </div>
        <div role="main" class="ui-content">
            <!-- Dynamic Components
                 https://vuejs.org/guide/essentials/component-basics.html#dynamic-components-->
            <component :is="activeContent"></component>
        </div>
        <div data-role="footer" data-position="fixed">
            <p style="text-align: center">{{ adviceOfDay }}</p>
        </div>
        <div data-role="panel" id="left-panel" data-display="overlay">
        </div>
    </div>`
};
