import sendData from './post.js';

// import createRequest from './create-request.js';
// import { postForm } from './api-config.js';

(function() {
  'use strict';
  window.addEventListener(
    'load',
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.getElementsByClassName('needs-validation');
      const name = document.getElementById('name');
      const phone = document.getElementById('phone');
      // Loop over them and prevent submission
      const validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          'submit',
          function(event) {
            event.preventDefault();
            if (form.checkValidity() === false) {
              event.stopPropagation();
            } else {
              form.classList.add('was-validated');
              const body = {
                name: name.value,
                phone: phone.value
              };
              // createRequest(postForm, body, body).then(({ status }) => {
              //   if (status === 'OK') {
              //     console.error('status - OK');
              //   } else {
              //     console.error('status - BAD');
              //   }
              // });
              sendData('http://localhost:8080/api/telegram', body);
            }
          },
          false
        );
      });
    },
    false
  );
})();
