/**
 * @fileoverview This is a pretty hacky way to configure the editor
 * @author Chris
 */

window.onload = function() {
  if (window.location.href.match(/.*\/editor*/)) {
    var simplemde = new SimpleMDE({
      element: document.getElementById('noteArea'),
      toolbar: [
        "bold", "italic", "heading", "|",
        "quote", "unordered-list", "ordered-list", "|",
        "link", "image", "|", "preview", "|", "guide"
      ],
      status: false,
      spellChecker: false
    });
    document.getElementById('submit').addEventListener('click', function(e) {
      document.getElementById('note').value = simplemde.value();
    });
  }
}
