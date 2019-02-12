$(function() {
  $('a[href^="#"]').on('click', function(event) {
    // отменяем стандартное действие
    event.preventDefault();

    const sc = $(this).attr('href'),
      dn = $(sc).offset().top;
    console.log(dn, 'offset');
    console.log($(sc).height(), 'window height');

    $('html, body').animate(
      { scrollTop: $('html,body').scrollTop() + dn },
      1000
    );
  });
});
