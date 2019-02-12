import sendData from './post.js';
(function() {
  'use strict';
  window.addEventListener(
    'load',
    function() {
      const form = document.querySelector('.needs-validation');
      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      const url = '/send-info/telegram';
      const close = document.querySelector('.close');
      const button = document.getElementById('buton-submit');
      const infoRequest = document.querySelector('.info-request');
      close.addEventListener('click', () => {
        name.value = '';
        phone.value = '';
        button.style.display = 'block';
        infoRequest.style.display = 'none';
        form.classList.remove('was-validated');
      });
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
            }).then(function(response) {
              if (response.status === 200) {
                button.style.display = 'none';
                infoRequest.style.display = 'block';

                setTimeout(() => {
                  document.querySelector('.close').click();
                }, 2000);
              }
              //return response.json();
            });
          }
          form.classList.add('was-validated');
        },
        false
      );
    },
    false
  );
})();
