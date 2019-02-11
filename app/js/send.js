import sendData from './post.js';
const url = 'http://localhost:10000/send-info/telegram';
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
                fullname: name.value,
                phone: phone.value
              };
              fetch(url, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(body)
              })
                .then(function(response) {
                  // конвертируем ответ в json
                  return response.json();
                })
                .then(function(data) {
                  // а вот и наши данные
                  console.log(data);
                });
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
