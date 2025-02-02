/* This Vue component is created by the claude-3-5-sonnet-20240620 model that
   takes a Markdown string as a prop and converts it into HTML without using
   any external library. It implements some basic Markdown features like
   headers, bold, italic, and lists. For a production application, consider
   using a robust library like `marked`, `markdown-it`, or others which handles
   all Markdown features and edge cases efficiently.
*/
export default {
    name: 'Md2Html',
    props: {
        src: { type: String, required: true }
    },
    computed: {
        htmlOutput() {
            return this.convertMarkdownToHtml(this.src);
        },
    },
    methods: {
        convertMarkdownToHtml(markdown) {
            // Handle headers
            markdown = markdown.replace(/^(#{1,6})\s(.+)$/gm, (match, hashes, content) => {
                const level = hashes.length;
                return `<h${level}>${content.trim()}</h${level}>`;
            });

            // Handle bold
            markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            // Handle italic
            markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');

            // Handle links
            markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

            // Handle unordered lists
            markdown = markdown.replace(/^\s*[-*+]\s(.+)$/gm, '<li>$1</li>');
            markdown = markdown.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

            // Handle ordered lists
            markdown = markdown.replace(/^\s*\d+\.\s(.+)$/gm, '<li>$1</li>');
            markdown = markdown.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');

            // Handle code blocks
            markdown = markdown.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

            // Handle inline code
            markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');

            // Handle paragraphs
            markdown = markdown.replace(/^(?!<[uo]l|<li|<h\d|<pre)(.+)$/gm, '<p>$1</p>');

            return markdown;
        }
    },
    template: /* html */`
    <div v-html="htmlOutput"></div>`
};
