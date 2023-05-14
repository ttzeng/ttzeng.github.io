export default {
    data() {
        return {
            articles: [
                { title: "A case study of customizing Android* devices using the same Android image",
                  href: "https://01.org/blogs/2015/android-customizing",
                  date: "2015 October"
                },
                { title: "Customizing Android devices using Runtime Resource Overlay",
                  href: "https://dzone.com/articles/customizing-android-devices-using-the-runtime-reso",
                  date: "2015 October"
                },
                { title: "Building an OCF compliant microcontroller based thermostat using Javascript",
                  href: "https://01.org/blogs/ttzeng/2017/building-ocf-compliant-microcontroller-based-thermostat-using-javascript",
                  date: "2017 June"
                },
                { title: "Securely accessing IOT devices based on Javascript*",
                  href: "https://01.org/blogs/ttzeng/2017/securely-accessing-iot-devices-based-javascript",
                  date: "2017 December"
                },
                { title: "IOT devices developed using Javascript can still be secure",
                  href: "https://dzone.com/articles/keeping-the-javascript-based-iot-devices-secure",
                  date: "2018 January"
                },
                { title: "Manage ACRN VM with Azure IOT Edge",
                  href: "https://youtu.be/9wHJyJVzgm8",
                  date: "2020 July"
                },
                { title: "Leveraging GPU in cloud native video streaming",
                  href: "https://www.intel.com/content/www/us/en/developer/articles/technical/leveraging-gpu-in-cloud-native-video-streaming.html",
                  date: "2022 June"
                }
            ]
        }
    },
    mounted() {
        $("#filterArticle").textinput();
        $("[data-role='table']").table().filterable();
    },
    template: /* html */`
    <form>
        <input id="filterArticle" data-type="search">
    </form>
    <table data-role="table" data-filter="true" data-input="#filterArticle" class="table-stripe ui-responsive">
        <thead>
            <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(article, index) in articles">
                <tr>
                    <th>{{index+1}}</th>
                    <td><a :href="article.href">{{article.title}}</a></td>
                    <td>{{article.date}}</td>
                </tr>
            </template>
        </tbody>
    </table>`
};
