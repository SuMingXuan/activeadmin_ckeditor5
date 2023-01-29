//= require ./ckeditor

(function () {
  function initCkeditors() {
    const activeAdminCKEditor = document.querySelectorAll(
      "[data-activeadmin-ckeditor]"
    );
    for (let i = 0; i < activeAdminCKEditor.length; i++) {
      let editor;
      const input = activeAdminCKEditor[i].querySelector(
        'input[type="hidden"]'
      );

      ClassicEditor.create(activeAdminCKEditor[i]).then((newEditor) => {
        editor = newEditor;
        editor.setData(input.value);
      });
      document.querySelector("form.formtastic").onsubmit = () => {
        let editorElement = document.querySelectorAll(".ck-editor")[i];
        removeFakeContainer(editorElement);
        console.log("editor.getData()", editor.getData());
        input.value = editor.getData();
      };
    }
  }

  function removeFakeContainer(editor) {
    const fakeContainers = editor.querySelectorAll(
      ".ck-fake-selection-container"
    );

    for (let i = 0; i < fakeContainers.length; i++) {
      fakeContainers[i].remove();
    }
  }

  $(document).ready(initCkeditors);
  $(document).on("has_many_add:after", ".has_many_container", initCkeditors);
  $(document).on("turbolinks:load", initCkeditors);
})();
