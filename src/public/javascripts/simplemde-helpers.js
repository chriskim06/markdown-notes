/**
 * @fileoverview This is a pretty hacky way to configure the editor
 * @author Chris
 */

function getSimpleMDE(noteArea) {
  return new SimpleMDE({
    element: noteArea,
    toolbar: [
      "bold", "italic", "heading", "|",
      "quote", "unordered-list", "ordered-list", "|",
      "link", "image", "|", "preview", "|", "guide"
    ],
    status: false
  });
}

window.onload = function() {
  var simplemde;
  var noteArea;
  if (window.location.href.match(/.*\/editor*/)) {
    noteArea = $('#noteArea');
    if (noteArea.length) {
      simplemde = getSimpleMDE(noteArea.get(0));
      $('#submit').on('click', function() {
        $('#note').val(simplemde.value());
      });
    }
  } else if (window.location.href.match(/.*\/notes*/)) {
    var modals = $('.modal.fade.preview');
    if (modals.length) {
      modals.each(function() {
        noteArea = $(this).find('textarea[id^="noteArea-"]');
        if (noteArea.length) {
          simplemde = getSimpleMDE(noteArea.get(0));
          simplemde.value($(this).find('textarea[id^="note-"]').val());
          simplemde.togglePreview();
        }
      });
    }
  }
}
