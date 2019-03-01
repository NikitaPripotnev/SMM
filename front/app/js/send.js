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
      const button = document.getElementById('button-submit');
      const buttonModal = document.getElementById('button-modal');
      const infoRequest = document.querySelector('.info-request');
      close.addEventListener('click', () => {
        name.value = '';
        phone.value = '';
        buttonModal.style.display = 'none'
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
            button.disabled = true;
            buttonModal.style.display='block';
            fetch(url, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              mode: 'cors',
              body: JSON.stringify(body)
            }).then(function(response) {
              button.disabled = false;
              buttonModal.style.display = 'none';
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
