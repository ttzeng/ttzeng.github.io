export default {
    data() {
        return {
            articles: [],
            projects: [],
        }
    },
    mounted() {
        $.getJSON("/json/publishing.json", (data) => {
            this.articles = data.articles;
        }).done(() => {
            $("#inputFilter").textinput();
            $("#articleList").table().filterable();
        });
        $.getJSON("/json/projects.json", (data) => {
            this.projects = data.projects;
        }).done(() => {
            $("#projectList").table().filterable();
        });
    },
    template: /* html */`
    <form>
        <input id="inputFilter" data-type="search">
    </form>
    <table id="articleList" data-role="table" data-filter="true" data-input="#inputFilter" class="table-stripe ui-responsive">
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
    </table>
    <table id="projectList" data-role="table" data-filter="true" data-input="#inputFilter" class="table-stripe ui-responsive">
        <thead>
            <tr>
                <th>No.</th>
                <th>Repository</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(proj, index) in projects">
                <tr>
                    <th>{{index+1}}</th>
                    <td><a :href="proj.url" target="_blank">{{proj.url}}</a></td>
                    <td>{{proj.description}}</td>
                </tr>
            </template>
        </tbody>
    </table-->`
};
