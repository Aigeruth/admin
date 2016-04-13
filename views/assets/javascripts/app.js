$(function () {

  'use strict';

  $(document).on('click.qor.alert', '[data-dismiss="alert"]', function () {
    $(this).closest('.qor-alert').remove();
  });

  setTimeout(function () {
    $('.qor-alert[data-dismissible="true"]').remove();
  }, 5000);

  $(document).on('change', 'input', function () {
    console.log(11)
  });


  $(window).on("beforeunload", function(t) {
    return "You have unsaved changes on this page. If you leave this page, you will lose all unsaved changes."
  })

});

$(function () {

  'use strict';

  $(document).on('click.qor.confirm', '[data-confirm]', function (e) {
    var $this = $(this);
    var data = $this.data();
    var url;

    if (data.confirm) {
      if (window.confirm(data.confirm)) {
        if (/DELETE/i.test(data.method)) {
          e.preventDefault();

          url = data.url || $this.attr('href');
          data = $.extend({}, data, {
            _method: 'DELETE'
          });

          $.post(url, data, function () {
            window.location.reload();
          });

        }
      } else {
        e.preventDefault();
      }
    }
  });

});

$(function () {

  'use strict';

  var $form = $('.qor-page__body > .qor-form-container > form');

  $('.qor-error > li > label').each(function () {
    var $label = $(this);
    var id = $label.attr('for');

    if (id) {
      $form.find('#' + id).
        closest('.qor-field').
        addClass('is-error').
        append($label.clone().addClass('qor-field__error'));
    }
  });

});

$(function () {

  'use strict';

  var location = window.location;
  var modal = (
    '<div class="qor-dialog qor-dialog--global-search" tabindex="-1" role="dialog" aria-hidden="true">' +
      '<div class="qor-dialog-content">' +
        '<form action=[[actionUrl]]>' +
          '<div class="mdl-textfield mdl-js-textfield" id="global-search-textfield">' +
            '<input class="mdl-textfield__input" name="keyword" id="globalSearch" value="" type="text" placeholder="" />' +
            '<label class="mdl-textfield__label" for="globalSearch">[[placeholder]]</label>' +
          '</div>' +
        '</form>' +
      '</div>' +
    '</div>'
  );

  $(document).on('click', '.qor-dialog--global-search', function(e){
    e.stopPropagation();
    if (!$(e.target).parents('.qor-dialog-content').size() && !$(e.target).is('.qor-dialog-content')){
      $('.qor-dialog--global-search').remove();
    }
  });

  $(document).on('click', '.qor-global-search--show', function(e){
      e.preventDefault();

      var data = $(this).data();
      var modalHTML = window.Mustache.render(modal, data);

      $('body').append(modalHTML);
      componentHandler.upgradeElement(document.getElementById('global-search-textfield'));
      $('#globalSearch').focus();

  });
});

$(function () {

  'use strict';

  $('.qor-menu-container').on('click', '> ul > li > a', function () {
    var $this = $(this);
    var $li = $this.parent();
    var $ul = $this.next('ul');

    if (!$ul.length) {
      return;
    }

    if ($ul.hasClass('in')) {
      $li.removeClass('is-expanded');
      $ul.one('transitionend', function () {
        $ul.removeClass('collapsing in');
      }).addClass('collapsing').height(0);
    } else {
      $li.addClass('is-expanded');
      $ul.one('transitionend', function () {
        $ul.removeClass('collapsing');
      }).addClass('collapsing in').height($ul.prop('scrollHeight'));
    }
  }).find('> ul > li > a').each(function () {
    var $this = $(this);
    var $li = $this.parent();
    var $ul = $this.next('ul');

    if (!$ul.length) {
      return;
    }

    $li.addClass('has-menu is-expanded');
    $ul.addClass('collapse in').height($ul.prop('scrollHeight'));
  });

  if ($('.qor-page').find('.qor-page__header').size()){
    $('.qor-page').addClass("has-header");
  }

});

$(function () {

  'use strict';

  var location = window.location;
  var a='a';

  $('.qor-search').each(function () {
    var $this = $(this);
    var $input = $this.find('.qor-search__input');
    var $clear = $this.find('.qor-search__clear');
    var isSearched = !!$input.val();

    var emptySearch = function () {
      var search = location.search.replace(new RegExp($input.attr('name') + '\\=?\\w*'), '');
      if (search == '?'){
        location.href = location.href.split('?')[0]
      } else {
        location.search = location.search.replace(new RegExp($input.attr('name') + '\\=?\\w*'), '');
      }
    }

    $this.closest('.qor-page__header').addClass('has-search');

    $clear.on('click', function () {
      if ($input.val() || isSearched) {
        emptySearch();
      } else {
        $this.removeClass('is-dirty');
      }
    });
  });
});

$(function () {

  'use strict';

  $('.qor-js-table .qor-table__content').each(function () {
    var $this = $(this);
    var width = $this.width();
    var parentWidth = $this.parent().width();

    if (width >= 180 && width < parentWidth) {
      $this.css('max-width', parentWidth);
    }
  });

});

//# sourceMappingURL=app.js.map
