$("#menu ul li a").each(function () {
  //console.log($(this).attr('href'));
  if ((window.location.pathname.indexOf($(this).attr('href'))) > -1) {
    $(this).parent().addClass('menu-item--active');
  }
});

var disqus_shortname = 'wagnerbeethoven';
(function () {
  var dsq = document.createElement('script');
  dsq.type = 'text/javascript';
  dsq.async = true;
  dsq.src = 'http://' + 'wagnerbeethoven' + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

SVGInject(document.getElementsByClassName('svg'));