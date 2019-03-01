$(function() {
  $('a[href^="#"]').on('click', function(event) {
    event.preventDefault();
    if($(window).width()<991.98){
       $('#toggler').click();
    }
    const sc = $(this).attr('href'),
      dn = $(sc).offset().top;
    $('html, body').animate(
      { scrollTop: $('html,body').scrollTop() + dn },
      1000
    );
  });
});
