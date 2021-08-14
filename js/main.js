// ADICIONAR MARCAÇÃO DO MENU


// TOC
$(document).ready(function () {
  $('#toc').toc({
    classes: {
      list: 'toc-container',
      item: 'toc-item'
    }
  });
});

// ADICIONA _BLANK E NO OPENER E REFERRER

function targetBlank() {
  var internal = location.host.replace("www.", "");
  internal = new RegExp(internal, "i");

  var a = document.getElementsByTagName('a');
  for (var i = 0; i < a.length; i++) {
    var href = a[i].host;
    if (!internal.test(href)) {
      a[i].setAttribute('target', '_blank');
      a[i].setAttribute('rel', 'noopener noreferrer');
      // a[i].setAttribute('data-toggle', 'tooltip');
      a[i].setAttribute('title', 'Este link irá abrir uma nova aba do navegador');

    }
  }
};

targetBlank();