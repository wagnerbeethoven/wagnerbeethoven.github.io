// ADICIONAR MARCAÇÃO DO MENU

$("#menu ul li a").each(function () {
  //console.log($(this).attr('href'));
  if ((window.location.pathname.indexOf($(this).attr('href'))) > -1) {
    $(this).parent().addClass('active');
  }
});

// COMENTÁRIO
var disqus_shortname = 'wagnerbeethoven';
(function () {
  var dsq = document.createElement('script');
  dsq.type = 'text/javascript';
  dsq.async = true;
  dsq.src = 'http://' + 'wagnerbeethoven' + '.disqus.com/embed.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();



// TOC
$(document).ready(function () {
  $('#toc').toc();
});

// ADICIONA _BLANK E NO OPENER E REFERRER

function targetBlank() {
  // remove subdomain of current site's url and setup regex
  var internal = location.host.replace("www.", "");
  internal = new RegExp(internal, "i");

  var a = document.getElementsByTagName('a'); // then, grab every link on the page
  for (var i = 0; i < a.length; i++) {
    var href = a[i].host; // set the host of each link
    if (!internal.test(href)) { // make sure the href doesn't contain current site's host
      a[i].setAttribute('target', '_blank'); // if it doesn't, set attributes
      a[i].setAttribute('rel', 'noopener noreferrer'); // if it doesn't, set attributes
      // a[i].setAttribute('data-toggle', 'tooltip'); // if it doesn't, set attributes
      a[i].setAttribute('title', 'Este link irá abrir uma nova aba do navegador'); // if it doesn't, set attributes

    }
  }
};

targetBlank();