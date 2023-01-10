//= require ./ckeditor

(function () {
  function initCkeditors() {
    ClassicEditor.create(
      document.querySelector("[data-activeadmin-ckcontent]")
    );
  }
  $(document).ready(initCkeditors);
  $(document).on("has_many_add:after", ".has_many_container", initCkeditors);
  $(document).on("turbolinks:load", initCkeditors);
})();
