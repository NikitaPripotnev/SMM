import sendData from './post.js';

(function() {
  'use strict';
  window.addEventListener(
    'load',
    function() {
      const forms = document.getElementsByClassName('needs-validation');
      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          'submit',
          function(event) {
            event.preventDefault();
            if (!form.checkValidity()) {
              event.stopPropagation();
            } else {
              const body = {
                name: name.value,
                phone: phone.value
              };
              sendData('http://localhost:8080/api/telegram', body);
            }
            form.classList.add('was-validated');
          },
          false
        );
      });
    },
    false
  );
})();
