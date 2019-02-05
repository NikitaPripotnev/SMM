const downloadData = url => {
  return new Promise(function(resolved, rejected) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', function() {
      if (xhr.status < 400) resolved(JSON.parse(xhr.responseText));
      else rejected(new Error('Request failed: ' + xhr.statusText));
    });
    xhr.addEventListener('error', function() {
      rejected(new Error('Network error'));
    });
    xhr.send();
  });
};

export default downloadData;
