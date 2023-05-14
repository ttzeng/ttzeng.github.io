export default {
    data() {
        return {
            articles: []
        }
    },
    mounted() {
        $.getJSON("/json/publishing.json", (data) => {
            this.articles = data.articles;
        }).done(() => {
            $("#filterArticle").textinput();
            $("[data-role='table']").table().filterable();
        });
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
