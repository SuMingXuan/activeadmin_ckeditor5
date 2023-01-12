//= require ./ckeditor

(function () {
  function initCkeditors() {
    const activeAdminCKEditor = document.querySelectorAll("[data-activeadmin-ckeditor]")
    for (let i = 0; i < activeAdminCKEditor.length; i++) {
      ClassicEditor.create(activeAdminCKEditor[i]);
    }
    const formtastic = document.querySelector("form.formtastic");
    if (formtastic) {
      formtastic.onsubmit = () => {
        const editors = document.querySelectorAll(".ck-editor");
        for (let i = 0; i < editors.length; i++) {
          const input = activeAdminCKEditor[i].querySelector('input[type="hidden"]');
          const editorContent = editors[i].querySelector(
            ".ck-editor__main .ck-content"
          );
          if (editorContent) {
            input.value = editorContent.innerHTML;
          } else {
            input.value = "";
          }
        }
      }
    }
  }
  $(document).ready(initCkeditors);
  $(document).on("has_many_add:after", ".has_many_container", initCkeditors);
  $(document).on("turbolinks:load", initCkeditors);
})();
