$(function() {
    /* run the following code after the document is fully loaded */

    $("span.gallery").each(function() {
        let images = $(this).children("img");
        /* wrap each image together with the sibling nodes following */
        $(images).each(function() {
            let following_siblings = [];
            let next = this.nextSibling;
            while (next && next.tagName !== "IMG") {
                /* accumate any non-image nodes */
                following_siblings.push(next);
                next = next.nextSibling;
            }
            $(this).wrap("<span class='gallery-wrapper'></span>").parent().append(following_siblings);
        });
    });
});
