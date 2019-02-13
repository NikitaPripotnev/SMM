const sendData = (url, data) => {
  let xhr = new XMLHttpRequest();
  const params =
    'fullname=' +
    encodeURIComponent(data.fullname) +
    '&phone=' +
    encodeURIComponent(data.phone);
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.addEventListener('load', function() {
    if (xhr.status < 400) console.log('ok');
    else new Error('Request failed: ' + xhr.statusText);
  });
  xhr.addEventListener('error', function() {
    new Error('Network error');
  });
  xhr.send(params);
};
export default sendData;
