/*!
 * terra v0.27.0
 * Copyright 2016 Cerner
 */
/* exported Terra */

// ESTABLISH THE TERRA NAMESPACE OBJECT
// ====================================
var Terra    = window.Terra || {};
window.Terra = Terra;

(function (window, undefined) {
  // TERRA GLOBAL VARIABLES
  // ======================

  // Same as if passing "fast" to jQuery animate.
  Terra.transitionSpeed = 200;

  // If theming media query breakpoints with LESS variables, override this value to true
  Terra.themedMediaQueries = false;

  // Default media query values
  Terra.mediaQueries = [
    ['xxl', window.matchMedia('screen and (min-width: 2068px)')],
    ['xl', window.matchMedia('screen and (min-width: 1540px)')],
    ['lg', window.matchMedia('screen and (min-width: 1276px)')],
    ['md', window.matchMedia('screen and (min-width: 1024px)')],
    ['s', window.matchMedia('screen and (min-width: 760px)')],
    ['xs', window.matchMedia('screen and (min-width: 580px)')],
    ['xxs', window.matchMedia('screen and (max-width: 580px)')]
  ];

  // Configure locales we support
  Terra.availableLocales = ['de',  'es', 'en', 'en-US', 'en-GB','fi-FI', 'fr', 'pt'];

  // Detect if we can translate or not.
  // Terra cannot use Globalize if Globalize is not present *and* the default locale is not set.
  Terra.canGlobalize = function() {
    return (typeof Globalize !== 'undefined') && (Globalize.locale() !== undefined);
  };

  /**
   * Helper method to passivly translate strings in Terra components
   * @param path {String} the JSON path to the translated string for the current locale
   * @param defaultMessage {String} The hardcoded fallback text if Terra cannot Globalize
   */
  Terra._i18n = function (path, defaultMessage) {
    return (Terra.canGlobalize() ? Globalize.formatMessage(path) : defaultMessage);
  };

  /**
   * Gets the current locale from lang attribute on the html node.
   * @returns The current locale if the lang attribute is set on the html node; otherwise, null.
   */
  Terra.getLocale = function () {
    return $('html').attr('lang');
  };


  /**
   * Sets the locale for the application to use.
   * Note: In order to properly set the locale, you must have the correct cldr data and translations
   *       loaded for the passed in locale.
   *
   * @param - The locale to set the application locale to.
   *
   */
  Terra.setLocale = function(locale) {
    $('html').attr('lang', locale);
    Globalize.locale(locale);

    // For any widgets that are initialized with translations, we want to ensure that they are
    // reinitialized with the correct widgets.
    $('body').trigger('Terra.init');
  };

  // BASE EVENTS AND HANDLERS
  // ========================
  $(window).on('resize', function () {
    // Resize End
    // Set listener on window.resize and trigger custom resizeEnd event when stopped.
    // This keeps people from having to listen to resize event itself, which is triggered a lot.
    // Instead they can just listen for when the resize ended (give or take a few milliseconds)
    if (this.resizeStopListener) {
      clearTimeout(this.resizeStopListener);
    }

    this.resizeStopListener = setTimeout(function () {
      $(this).trigger('Terra.resizeEnd');
    }, 250);
  });

  $(function () {
    // We need to trigger Terra.init once the page is loaded so attached components know to init themselves.
    // This event can be triggered at any time components should attempt to init.
    // Fire this event on the most local DOM node that it is related to.
    // This allows some scripts to ignore the event if it's on an unrelated node.
    $('body').trigger('Terra.init');
  });
}(window));

// THIS FILE IS AUTO GENERATED - DO NOT EDIT

Terra.Colors = {
  "base": "#ffffff",
  "inverse": "#1c1f21",
  "medium-fg-50": "#2d3539",
  "medium-fg-40": "#434a4d",
  "medium-fg-30": "#595f62",
  "medium-fg-20": "#6f7477",
  "medium-fg-10": "#868a8c",
  "medium": "#9b9fa1",
  "medium-bg-10": "#b2b5b6",
  "medium-bg-20": "#c8cacb",
  "medium-bg-30": "#dedfe0",
  "medium-bg-40": "#f4f4f4",
  "accent-fg-50": "#004c76",
  "accent-fg-40": "#0065a3",
  "accent-fg-30": "#007cc3",
  "accent-fg-20": "#0092e0",
  "accent-fg-10": "#26a2e5",
  "accent": "#4cb2e9",
  "accent-bg-10": "#7fc8ef",
  "accent-bg-20": "#a6d9f4",
  "accent-bg-30": "#cce9f9",
  "accent-bg-40": "#ebf6fd",
  "accent-secondary-fg-50": "#406c23",
  "accent-secondary-fg-40": "#4e832b",
  "accent-secondary-fg-30": "#5c9a32",
  "accent-secondary-fg-20": "#69b13a",
  "accent-secondary-fg-10": "#78c346",
  "accent-secondary": "#8ccc62",
  "accent-secondary-bg-10": "#a5d784",
  "accent-secondary-bg-20": "#bce1a3",
  "accent-secondary-bg-30": "#d2ebc1",
  "accent-secondary-bg-40": "#e9f5e0",
  "complement-fg-50": "#da3b03",
  "complement-fg-40": "#e34c02",
  "complement-fg-30": "#ed5e00",
  "complement-fg-20": "#f76e00",
  "complement-fg-10": "#ff7d00",
  "complement": "#ff9733",
  "complement-bg-10": "#ffb166",
  "complement-bg-20": "#ffcb99",
  "complement-bg-30": "#ffe5cc",
  "complement-bg-40": "#fff5eb",
  "complement-secondary-fg-50": "#441650",
  "complement-secondary-fg-40": "#5f1f6f",
  "complement-secondary-fg-30": "#78288c",
  "complement-secondary-fg-20": "#9631af",
  "complement-secondary-fg-10": "#aa3ec5",
  "complement-secondary": "#b961cf",
  "complement-secondary-bg-10": "#c985da",
  "complement-secondary-bg-20": "#daace6",
  "complement-secondary-bg-30": "#eacff0",
  "complement-secondary-bg-40": "#f6ebf9",
  "highlight-fg-50": "#fe8b0e",
  "highlight-fg-40": "#fe9c0d",
  "highlight-fg-30": "#ffa70c",
  "highlight-fg-20": "#ffb20b",
  "highlight-fg-10": "#ffc20a",
  "highlight": "#ffce3b",
  "highlight-bg-10": "#ffda6c",
  "highlight-bg-20": "#ffe79d",
  "highlight-bg-30": "#fff3ce",
  "highlight-bg-40": "#fff9e6",
  "clinical-high": "#ff6100",
  "clinical-low": "#0053e6",
  "clinical-critical": "#cc0000",
  "clinical-abnormal": "#654a08",
  "positive-fg-50": "#406c23",
  "positive-fg-40": "#4e832b",
  "positive-fg-30": "#5c9a32",
  "positive-fg-20": "#69b13a",
  "positive-fg-10": "#78c346",
  "positive": "#8ccc62",
  "positive-bg-10": "#a5d784",
  "positive-bg-20": "#bce1a3",
  "positive-bg-30": "#d2ebc1",
  "positive-bg-40": "#e9f5e0",
  "negative-fg-50": "#ab0406",
  "negative-fg-40": "#bc0203",
  "negative-fg-30": "#d10000",
  "negative-fg-20": "#e50000",
  "negative-fg-10": "#fa0000",
  "negative": "#fb4c4c",
  "negative-bg-10": "#fc7f7f",
  "negative-bg-20": "#fdabab",
  "negative-bg-30": "#fed1d1",
  "negative-bg-40": "#ffebeb",
  "theme-accent-fg-50": "#004c76",
  "theme-accent-fg-40": "#0065a3",
  "theme-accent-fg-30": "#007cc3",
  "theme-accent-fg-20": "#0092e0",
  "theme-accent-fg-10": "#26a2e5",
  "theme-accent": "#4cb2e9",
  "theme-accent-bg-10": "#7fc8ef",
  "theme-accent-bg-20": "#a6d9f4",
  "theme-accent-bg-30": "#cce9f9",
  "theme-accent-bg-40": "#ebf6fd",
  "theme-accent-secondary-fg-50": "#406c23",
  "theme-accent-secondary-fg-40": "#4e832b",
  "theme-accent-secondary-fg-30": "#5c9a32",
  "theme-accent-secondary-fg-20": "#69b13a",
  "theme-accent-secondary-fg-10": "#78c346",
  "theme-accent-secondary": "#8ccc62",
  "theme-accent-secondary-bg-10": "#a5d784",
  "theme-accent-secondary-bg-20": "#bce1a3",
  "theme-accent-secondary-bg-30": "#d2ebc1",
  "theme-accent-secondary-bg-40": "#e9f5e0",
  "border-color": "#dedfe0",
  "hover-background": "#ebf6fd",
  "selected-color": "#f4f4f4",
  "selected-background": "#007cc3",
  "link-color": "#0065a3",
  "link-color-hover": "#004c76",
  "link-color-disabled": "#004c76",
  "text-error": "#e50000",
  "text-placeholder": "#dedfe0",
  "text-reverse": "#f4f4f4"
};

// TERRA FAST CLICK INITIALIZATION
// ===============================

(function ($, Terra) {

  /**
   * Initializes the FastClick library.
   */
  Terra._initFastClick = function() {
    if (typeof FastClick !== 'undefined') {
      FastClick.attach(document.body);
    }
  };

  $(function () {
    Terra._initFastClick();
  });

}(jQuery, Terra));

(function ($) {
  // Icons
  // --------------------------------------------------

  // Run when DOM is ready
  $(function () {
    // Calls fontSpy to check if Terra Icons font has loaded or failed to load.
    fontSpy( 'Terra Icons', {
      glyphs: '\uf100\uf101\uf102' // Pass in glyphs from Terra Icons
    });
  });
}(jQuery));

/* exported Terra.activate Terra.ariaSelected */

(function ($, Terra) {
  // Set the target to active and remove active from all siblings
  Terra.activate = function(target, customActiveClass) {
    var $target = $(target),
    activeClass = customActiveClass || 'active';

    $target.siblings().removeClass(activeClass);
    $target.addClass(activeClass);
  };

  /*
   * Updated version of #activate above.
   * Used for modern aria-selected with additional radio vs. checkbox functionality built in.
   *
   * The first argument can be a string or an object. It is the target.
   * The second argument is an optional options object with the following members:
   *   selectedStyle {String} - if set to 'multiple', sibling elements will not be toggled
   *     providing multiple-item rather than single-item selection.
   *   customEvent {String} - if specified, the custom event will be triggered once an item is selected.
   */
  Terra.ariaSelected = function(target, options) {
    var $target = $(target);

    options = options || {}; // Ensure options is truly optional

    // If the current selection should not be modified, do nothing.
    if ($target.hasClass('selection-static')) {
      return;
    }

    // If current selection is already selected,
    // Unselect if in checkbox mode then get out early.
    if ($target.is('[aria-selected]')) {
      if (options.selectStyle === 'multiple') {
        $target.removeAttr('aria-selected');
      }

      return false;
    }

    if (options.selectStyle !== 'multiple') {
      $target.siblings().removeAttr('aria-selected');
    }

    $target.attr('aria-selected', 'true');

    if (options.customEvent) {
      $target.trigger(options.customEvent);
    }
  };
}(jQuery, Terra));

(function (undefined) {
  'use strict';

  // Make the ajax call and either load the content on success or issue an error message otherwise.
  // This will place content in the targetSelector.
  function fireAjaxRequest(options, $ajaxTrigger){
    $.ajax({
      url  : options.url,
      type : options.method,
      data : options.data,
      error: function () {
        var i18n_error = Terra._i18n('Terra/ajax/error', 'This content failed to load.'),
            msg        = $ajaxTrigger.data('error-msg');

        // Consumers can pass a custom error-message via the data-error-msg attribute on the trigger.
        $(options.targetSelector).html(
          '<p class="text-error">' +
          (msg === undefined ? i18n_error : msg) +
          '</p>'
        );

        ajaxEvent($ajaxTrigger, 'ajaxFailed', options);
      },
      success: function (data) {
        $(options.targetSelector).html(data);

        ajaxEvent($ajaxTrigger, 'ajaxLoaded', options);

        if ($ajaxTrigger.data('allow-reload') === false) {
          $ajaxTrigger.data('ajax-disabled', true);
        }
      }
    });
  }

  function ajaxEvent($ajaxTrigger, type, options) {
    var ajaxLoadedEvent = $.Event(type, {
      url            : options.url,
      targetSelector : options.targetSelector
    });

    $ajaxTrigger.trigger(ajaxLoadedEvent);
  }

  /*
   * Set up the request options and fire the AJAX request.
   *
   * @param e {Object} The AJAX init event (probably click)
   * @param $ajaxTrigger {Object} The element that triggered the AJAX init event
   * @param targetSelector {String|Object} Fallback selector or element to put the AJAX results in
   */
  function ajaxRequestHandler(e, $ajaxTrigger, targetSelector) {
    if ($ajaxTrigger.data('ajax-disabled') !== true) {

      var options = {
        // check for url from link first, then form, then data attribute
        url            : $ajaxTrigger.attr('href') || $ajaxTrigger.attr('action') || $ajaxTrigger.data('ajax-url'),
        method         : $ajaxTrigger.data('method') || $ajaxTrigger.attr('method') || 'get',
        data           : $ajaxTrigger.serializeArray(),
        targetSelector : $ajaxTrigger.data('ajax-target') || targetSelector
      };

      fireAjaxRequest(options, $ajaxTrigger);
    }

    e.preventDefault();
  }

  // Add public API
  Terra.ajaxRequestHandler = ajaxRequestHandler;

  // Set up DOM events
  $(document)
    .on('click', ':not(form)[data-ajax-target]', function (e) {
      ajaxRequestHandler(e, $(this));
    })
    .on('submit', 'form[data-ajax-target]', function (e) {
      ajaxRequestHandler(e, $(this));
    });
}());

(function ($) {
  $(document)
    .on(
      'click',
      'a.terra-u-disabled[aria-disabled="true"], .terra-u-disabled[aria-disabled="true"] a',
      function (e) {
        // Treat links with the terra-u-disabled class and the aria-disabled role like a disabled button
        e.preventDefault();
      }
    )
    .on(
      'contextmenu',
      'a.terra-u-disabled[aria-disabled="true"], .terra-u-disabled[aria-disabled="true"] a',
      function() {
        // Returns false to prevent the context menu from opening
        // http://stackoverflow.com/questions/10864249/disabling-right-click-context-menu-on-a-html-canvas
        return false;
      }
    );
}(jQuery));

/* exported Terra.justifyHeight */

(function ($, Terra, window) {
  // Justify Height
  // Sets equal heights on direct children elements of the parent element used to call the function.
  // Useful when items are set in horizontal rows and things like borders or backgrounds need uniform height display.
  //
  // Sample usage:
  //   <div data-justify-height="true">
  //     <div>Child with least text</div>
  //     <div>Child with more text that will take up more vertical space</div>
  //   </div>
  Terra.justifyHeight = (function () {
    var $body = $('body');

    var getChildHeight = function () {
      return $(this).height();
    };

    var resetChildHeight = function ($children) {
      $children.height('auto');
    };

    var setChildHeight = function ($children) {
      var childHeights = $children.map(getChildHeight),
          maxChild     = Math.max.apply(Math, $.makeArray(childHeights));

      $children.height(maxChild);
    };

    var justify = function ($selector) {
      $selector
        .find(
          '[data-justify-height=true], .callout-grid.divided[data-columns], .callout-grid.boxed[data-columns]'
        )
        .not('[data-columns=1], [data-columns=""]')
        .each(function () {
          var $children = $(this.children);

          resetChildHeight($children);
          setChildHeight($children);
        });
    };

    // Events scoped to the document object
    $(document).ajaxComplete(function () {
      justify($body); // Must always be called AFTER all component initialization!
    });

    // reset and set child height after window resize
    $(window).on('Terra.resizeEnd', function () {
      justify($body);
    });

    // The function to set Terra.justifyHeight to.
    // Takes in an optional selector to scope what elements it runs against.
    // Can either be a string, DOM node, or jQuery element
    // i.e. Terra.justifyHeight('#my-id'); - only runs on children of #my-id.
    return function (selector) {
      // Cannot use cached version of body because it breaks in jasmine
      justify(selector ? $(selector) : $body);
    };
  }());

  // Run when DOM is ready
  $(function () {
    Terra.justifyHeight('body'); // Must always be called AFTER all component initialization!
  });
}(jQuery, Terra, window));

/* exported Terra.getMediaQueryName */

(function (Terra) {

  /** Stores available media query breakpoints globally as an array for easy access
   * If media query breakpoints are being themed by consumers,
   * this code extracts the available media query breakpoints from $selector:before,
   * where the CSS is adding it as a pseudo-element.
   * See core.less for more details.
   */

  Terra.getMediaQueries = function () {
    if (Terra.themedMediaQueries) {
      var container = document.body,
          mediaQueryArray;

      // Ensure getComputedStyle is available before use.
      if (container && window.getComputedStyle) {

        // Clean string before converting to array
        var mqString = window.getComputedStyle(container, ':before')
          .getPropertyValue('content')
          .replace(/'|"/g, '"')
          .slice(1)
          .slice(0, -1)
          .split(String.fromCharCode(92))
          .join('');

        // Convert string into an array
        mediaQueryArray = JSON.parse('[' + mqString + ']');

        // Update string to MediaQueryList object
        for (var i = 0, len = mediaQueryArray.length; i < len; i++) {
          mediaQueryArray[i][1] = window.matchMedia(mediaQueryArray[i][1]);
        }

        // Set globally so it is less costly to access
        Terra.mediaQueries = mediaQueryArray;
      }
    }
  };

  /**
   * Returns the current media query as a t-shirt size:
   *
   * mq = Terra.getMediaQueryName():
   * > 'xl'
   */
  Terra.getMediaQueryName = function () {
    for (var i = 0, len = Terra.mediaQueries.length; i < len; i++) {
      if (Terra.mediaQueries[i][1].matches) {
        return Terra.mediaQueries[i][0];
      }
    }
  };

$(document).ready(Terra.getMediaQueries);
}(Terra));

/* exported Terra.escapeChars Terra.unescapeChars */

(function (Terra) {
  /**
   * Terra.escapeChars
   * A global function that escapes the given string for meta-characters.
   * (http://api.jquery.com/category/selectors)
   *
   * Inspired by:
   * http://alexandregiannini.blogspot.com/2011/05/escaping-strings-for-jquery-selectors.html
   *
   * @method escapeChars
   * @param {string} selector - The selector to be sanitized.
   * @return {string} - String with meta-characters escaped.
   *
   */
  Terra.escapeChars = function (selector) {
    return selector.replace(/[!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, '\\$&');
  };

  /**
   * Terra.unescapeChars
   * Removes escaped characters for a given string. When given a sanitized string
   * it returns the original unsanitized version back.
   *
   * @method unescapeChars
   * @param {string} selector - The selector to be unsanitized.
   * @return {string} - String with meta-characters unescaped.
   *
   */
  Terra.unescapeChars = function (selector) {
    return selector.replace(/[\\]([!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~])/g, '$1');
  };
}(Terra));

(function ($, Terra, window, undefined) {
  /**
   * TOGGLER PUBLIC CLASS DEFINITION
   *
   * @class Toggler
   * @constructor
   * @param {String|Object} element - The selected DOM node.
   * @param {Object} options - Optional object of options used to override the defaults.
   */
  var Toggler = function (element, options) {
    this.options  = $.extend({}, Toggler.DEFAULTS, options);

    this.$element = $(element);
    this.target  = this.options.target || element.hash;

    if (this.options.toggle) {
      this.toggle();
    }
  };

  Toggler.DEFAULTS = {
    slide  : false,
    toggle : true
  };

  Toggler.prototype.constructor = Toggler;

  /**
   * Toggler.hide
   * It hides the target element, triggers the Terra.toggler.hidden event,
   *   removes the toggler-shown class from the trigger element,
   *   and adds the hide class to the target element.
   *
   * @method hide
   */
  Toggler.prototype.hide = function () {
    var $target  = $(this.target);

    if (this.options.slide === true) {
      $target.slideUp(Terra.transitionSpeed, _hidden);
    } else {
      $target.fadeOut(Terra.transitionSpeed, _hidden);
    }

    // Update class hooks for the consumers to use
    this.$element.removeClass('toggler-shown');
    $target.addClass('hide');
  };

  /**
   * Toggler.show
   * It shows the target element, triggers the Terra.toggler.shown event,
   *   adds the toggler-shown class to the trigger element,
   *   and removes the hide class from the target element.
   *
   * @method show
   */
  Toggler.prototype.show = function () {
    var $target  = $(this.target);

    if (this.options.fitToViewport === true) {
      $target.css('max-height', _adjustedMaxHeight($target) + 'px');
    }

    if (this.options.slide === true) {
      $target.slideDown(Terra.transitionSpeed, _shown);
    } else {
      $target.fadeIn(Terra.transitionSpeed, _shown);
    }

    // Update class hooks for the consumers to use
    this.$element.addClass('toggler-shown');
    $target.removeClass('hide');
  };

  /**
   * Toggler.toggle
   * It determines whether to show or hide the target element based on the presence of
   *   the hide class on the target element.
   *
   * @method toggle
   */
  Toggler.prototype.toggle = function () {
    this[$(this.target).hasClass('hide') ? 'show' : 'hide']();
  };

  var old = $.fn.toggler;

  /**
   * TOGGLER PLUGIN DEFINITION
   * It sets up a toggler(s) for the provided trigger(s) and target(s).
   *
   * The opts variable may alternatively be a string of 'show' or 'hide' to directly invoke those internal methods.
   *
   * @method toggler
   * @chainable
   * @param {String|Object} opts - Name of function to call, or object of options.
   * @param {Boolean} [opts.slide]   - Whether to slide the target in/out of view or not.
   * @param {Boolean} [opts.toggle]  - Whether to attempt to set a toggler or not.
   * @param {Boolean} [opts.visible] - Whether to display the target by default or not.
   * @return {Object} - The selected element(s).
   */
  $.fn.toggler = function (opts) {
    return this.each(function () {
      var $this   = $(this),
          data    = $this.data('toggler'),
          options = $.extend({}, $this.data(), typeof opts === 'object' && opts);

      if (data === undefined) {
        $this.data('toggler', (data = new Toggler(this, options)));
      }

      // Call internal function if the consumer passes it.
      if (typeof opts === 'string') {
        data[opts]();
      }
    });
  };

  $.fn.toggler.Constructor = Toggler;

  // TOGGLER NO CONFLICT
  // ===================

  $.fn.toggler.noConflict = function () {
    $.fn.toggler = old;

    return this;
  };

  // TOGGLER API
  // ===========

  $(document).on('click', '.toggler', function (e) {
    var $this = $(this);

    $this.toggler($this.data('toggler') ? 'toggle' : null);

    e.preventDefault(); // Don't let buttons or anchor elements do their normal behavior.
  });

  // HELPERS
  // =======

  // Calculates the available height between the given target and the bottom of the window.
  function _adjustedMaxHeight($target) {
    var maxHeight,
        $parent      = $target.parent(),
        $window      = $(window),
        minHeight    = parseInt($target.css('min-height'), 10),
        parentBottom = $parent.offset().top - $window.scrollTop() + $parent.height();

    // Subtract 10px so that toggled content isn't flush against the bottom of the screen.
    maxHeight = $window.height() - parentBottom - 10;

    if (maxHeight <= 0) {
      maxHeight = null;
    }

    if (maxHeight !== null && maxHeight < minHeight) {
      maxHeight = minHeight;
    }

    return maxHeight;
  }

  function _shown() {
    $(this).trigger('Terra.toggler.shown');
  }

  function _hidden() {
    $(this).trigger('Terra.toggler.hidden');
  }
}(jQuery, Terra, window));

(function ($) {
  // Transition and Remove
  // Transitions the element then removes it from the DOM.
  //
  // @chainable
  // @param fn    {String}        - The name of the jQuery function to invoke on the element.
  // @param speed {String|Number} - The time to transition and remove the element.
  $.fn.transitionAndRemove = function (fn, speed) {
    return this.each(function () {
      var $this = $(this);

      speed = speed || 'normal';

      $this[fn](speed, function () {
        $this.remove();
      });
    });
  };
}(jQuery));

(function ($, Terra) {
  function toggleActiveGroupedButton() {
    var $this = $(this),
      toggle = $this.parent().data('toggle');

    if (toggle === 'buttons-radio') {
      Terra.ariaSelected($this);
    } else if (toggle === 'buttons-checkbox') {
      Terra.ariaSelected($this, { selectStyle: 'multiple' });
    }
  }

  $(document).on('click.terra[aria-selected]', '.btn-group .btn', toggleActiveGroupedButton);
}(jQuery, Terra));

// Credit to bootstrap https://github.com/twbs/bootstrap/blob/v3.3.4/js/dropdown.js

/*! The MIT License (MIT)

Copyright (c) 2011-2015 Twitter, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE */
(function ($) {
  var backdrop         = '.dropdown-backdrop',
      toggle           = '[data-toggle="dropdown"]',
      upArrowKeyCode   = 38,
      downArrowKeyCode = 40,
      escapeKeyCode    = 27,
      rightClickCode   = 3;

  // Show/hide the dropdown menu
  function toggleDropdown (e) {
    var $parent, isActive, relatedTarget,
      $this = $(this);

    if ($this.is('.disabled, :disabled')) {
      return;
    }

    $parent  = getParent($this);
    isActive = $parent.hasClass('open');

    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($this)
          .on('click', clearMenus);
      }

      relatedTarget = { relatedTarget: this };
      $parent.trigger(e = $.Event('show.terra.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) {
        return;
      }

      // Set aria-expanded on the button so it is read by screen readers when clicked
      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')
        .siblings('[role~="menu"]')
        .attr('aria-hidden', 'false');

      $parent
        .toggleClass('open')
        .trigger('shown.terra.dropdown', relatedTarget);
    }

    return false;
  }

  // Allow for keyboard navigation of the dropdown.
  // Escape, up arrow and down arrow can be used to navigate the menu.
  function keydown (e) {
    var $parent, isActive, desc, $items, index,
      $this = $(this);

    if (e.which !== upArrowKeyCode && e.which !== downArrowKeyCode && e.which !== escapeKeyCode ||
          /input|textarea/i.test(e.target.tagName)) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if ($this.is('.disabled, :disabled')) {
      return;
    }

    $parent  = getParent($this);
    isActive = $parent.hasClass('open');

    if ((!isActive && e.which !== escapeKeyCode) || (isActive && e.which === escapeKeyCode)) {
      if (e.which === escapeKeyCode || e.which === downArrowKeyCode) {
        $parent.find(toggle).trigger('focus');
        return $this.trigger('click');
      }
    }

    desc = ' li:not(.disabled):visible a';
    $items = $parent.find('[role~="menu"]' + desc + ', [role="listbox"]' + desc);

    if (!$items.length) {
      return;
    }

    index = $items.index(e.target);

    if (e.which === upArrowKeyCode) {
      if (index > 0) {
        index--;  // up
      } else {
        $parent.find(toggle).trigger('focus');
        return $this.trigger('click');
      }
    }

    if (e.which === downArrowKeyCode && index < $items.length - 1) {
      index++;  // down
    }

    $items.eq(index).trigger('focus');
  }

  // Hide the dropdown menu if clicked off the dropdown.
  function clearMenus(e) {
    // Check for right click
    if (e && e.which === rightClickCode) {
      return;
    }

    $(backdrop).remove();
    $(toggle).each(function () {
      var $this       = $(this),
        $parent       = getParent($this),
        relatedTarget = { relatedTarget: this };

      if (!$parent.hasClass('open')) {
        return;
      }

      if (e && e.type === 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) {
        return;
      }

      $parent.trigger(e = $.Event('hide.terra.dropdown', relatedTarget));

      if (e.isDefaultPrevented()) {
        return;
      }

      // Set aria-expanded on the button so it is read by screen readers when clicked
      $this
        .attr('aria-expanded', 'false')
        .siblings('[role~="menu"]')
        .attr('aria-hidden', 'true');
      $parent
        .removeClass('open')
        .trigger('hidden.terra.dropdown', relatedTarget);
    });
  }

  // Determine the parent of the element
  function getParent($this) {
    var $parent,
      selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
  }

  // Keep focus on button when clicking on anything within the dropdown
  function retainFocus () {
    var $this = $(this);

    $this.find('[data-toggle="dropdown"]').focus();
  }

  $(document)
    .on('click.terra.dropdown', clearMenus)
    .on('click.terra.dropdown', '.dropdown, .dropdown-end, .dropdown-flip', retainFocus)
    .on('click.terra.dropdown',
      '.dropdown form, .dropdown-end form, .dropdown-flip form', function (e) { e.stopPropagation(); })
    .on('click.terra.dropdown', toggle, toggleDropdown)
    .on('keydown.terra.dropdown',
      '.dropdown [role~="menu"], .dropdown-end [role~="menu"], .dropdown-flip [role~="menu"], ' + toggle , keydown);
})(jQuery);

(function ($) {
  function areYouSureHandler() {
    var $this = $(this);

    // Check to see if this form has already been initialized with areYouSure.
    if ($this.data('terra.areyousure')) {
      return;
    }

    $this
      .areYouSure({message: Terra._i18n('Terra/areYouSure/unsaved', 'You have unsaved changes.')})
      .data('terra.areyousure', true); // Add the hook to test against next time this code is run.
  }

  // Setup the are you sure plugin on forms that call for it.
  $(document).on('focus.terra.areyousure', 'form.form-checked', areYouSureHandler );
  $(document).on('click.terra.areyousure', 'form.form-checked', areYouSureHandler );
}(jQuery));

(function ($, undefined) {
  // Clones the given element, updates any IDs to be unique, and appends the clone after the given element.
  // The newly cloned element will be set to be in focus.
  function cloneAdd($toClone) {
    var $newClone  = $toClone.clone(),
        cloneCount = $toClone.data('clone-count') !== undefined ? $toClone.data('clone-count') + 1 : 1;

    // The clonable section may be hidden by default. If so, unhide it and do not clone.
    if ($toClone.is(':hidden')) {
      $toClone.removeAttr('hidden').find('input, textarea, select')[0].focus();
    } else {
      // Do not copy any data
      $newClone.find('input').filter(':checkbox, :radio').prop('checked', false);
      $newClone.find('textarea, select, input').not(':checkbox, :radio').val('');

      // Clear validation errors
      $newClone.find('.form-error').removeClass('form-error').filter('[tabindex="-1"]').remove();

      updateClonedIDs($newClone, cloneCount);

      $newClone.insertAfter($toClone).find('input, textarea, select')[0].focus();

      // Save how many times the target has been cloned
      $toClone.siblings().add($toClone).data('clone-count', cloneCount).find('.clone-remove').removeAttr('disabled');
    }
  }

  // Updates any ID's, names, fors, etc. beloning to the given element or any of the element's children
  // to end with the given count. i.e. 'example-id' becomes 'example-id-c<count>'
  // Regex is used to update the clone specific ID (the '-c###' at the end of the ID)
  function updateClonedIDs($element, count) {
    var elemIDs = {
            'id'               : $element.attr('id'),
            'name'             : $element.attr('name'),
            'for'              : $element.attr('for'),
            'aria-describedby' : $element.attr('aria-describedby')
          },
        regex = /.+(?=-c\d+$)/i;

    // Loop through possible IDs and update if ID is defined.
    $.each(elemIDs, function (id, value) {
      if (value === undefined) { return; }

      if (value.match(regex) !== null) {
        $element.attr(id, value.match(regex) + '-c' + count);
      } else {
        $element.attr(id, value + '-c' + count);
      }
    });

    $element.children().each(function () {
      updateClonedIDs($(this), count);
    });
  }

  function addCloneHandler(e) {
    var $this = $(this);
    e.preventDefault();

    if ($this.data('remote-clone-target')) {
      cloneAdd($('#' + $this.data('remote-clone-target')).children().last());
    } else {
      cloneAdd($this.closest('.clone-target'));
    }

    $this.trigger('Terra.clone.added');
  }

  function removeCloneHandler(e) {
    var $toDelete = $(this).closest('.clone-target');
    e.preventDefault();

    if ($toDelete.siblings().length === 1) {
      $toDelete.siblings().find('.clone-remove').prop('disabled', true);
    }

    $toDelete.remove();
    $(document).trigger('Terra.clone.removed');
  }

  $(document)
    .on('click.terra.clone-add', '.clone-add, [data-remote-clone-target]', addCloneHandler)
    .on('click.terra.clone-remove', '.clone-remove', removeCloneHandler);
}(jQuery));

(function ($) {
  /****************** SPECIAL FORMS ********************/

  var autoSubmitSelector =
    '[data-auto-submit] select, [data-auto-submit] [type=checkbox], [data-auto-submit] [type=radio]';

  // Auto submits the form on any change event triggered on select elements, radio and checkbox inputs.
  function autoSubmitHandler() {
    $(this).closest('form').submit();
  }

  $(document)
    .on('change', autoSubmitSelector, autoSubmitHandler);
}(jQuery));

(function ($) {
  /*
   * Add Select All checkbox for table forms
   *
   * Add the .select-all class to a table within a form,
   *   and add checkboxes to the table rows, including <thead>.
   * Any checkbox located in <thead> will act as a
   *   'Select All' toggle for all checkboxes in <tbody>.
   * All checkboxes in the table will be affected:
   *   having separate, unattached checkboxes in the table
   *   is not possible with this table class.
   * When Select All is active, unchecking any checkbox
   *   in the <tbody> will also uncheck Select All.
   */

  /*
   * When a 'Select All' checkbox in the header is clicked, get all the child
   *   checkboxes in the body and set them to match the parent checkbox.
   */
  function checkboxTableSelectAll() {
    var $childCheckBoxes = $(this).closest('table').find('tbody input:checkbox');

    $childCheckBoxes.prop('checked', $(this).prop('checked'));
  }

  /*
   * When a child checkbox in the body of a table.select-all is clicked,
   *   check if it's being unchecked, and if it is, get the parent checkbox
   *   in the header and uncheck it, because at least one child is not selected.
   * The opposite functionality is intentionally excluded: if the box is being
   *   checked, nothing happens.  The user must explicitly turn on select all.
   */
  function checkboxTableSelectOne() {
    if ($(this).prop('checked') === false) {
      $(this).closest('table').find('thead input:checkbox').prop('checked', false);
    }
  }

  $(document)
    .on('click', 'form table.table-select-all thead input:checkbox', checkboxTableSelectAll)
    .on('click', 'form table.table-select-all tbody input:checkbox', checkboxTableSelectOne);
}(jQuery));

/* exported Terra.textLengthValidation */

(function ($, Terra, undefined) {
  // NEED TO ADD CUSTOM VALIDATION? SEE https://connect.ucern.com/message/2262769

  // This is the root of the "path" in the locale files (en.json)
  // It is used several times throughout this file
  // Save to a variable to avoid having to write it out repeadedly and have a single consistent point of change
  //   if updates need to be made.
  // Note that Globalize uses the / character to separate each level of nesting in the JSON structure as opposed
  //   to using periods.
  var validationPath = 'Terra/forms/validation/';

  /****************** HELPERS ********************/

  /**
   * Custom error placement for non-standard scenarios to keep the look and flow of our forms clean and consistent.
   * The validation library will automatically populate the inputs on invocation.
   *
   * Adds a tabindex of -1 to the error message to work-around an IE based screen reader bug when aria-describedby
   * points to two elements, help text and error text. More info:
   * http://www.paciellogroup.com/blog/2014/06/aria-labelledby-aria-describedby-support-popular-windows-browsers/
   *
   * @param $error {object} The error DOM element
   * @param $element {object} The element the user filled out (or not) incorrectly
   */
  function formErrorPlacement($error, $element) {
    var parentElement = $element.parent();

    if ($element.data('text-limit')) {
      // Put the message below the text limit counter for the current text input only.
      $error.insertAfter($element.next('.text-counter')).attr('tabindex', '-1');
    } else if ($element.is(':radio, :checkbox')) {
      // If there are multiple checkboxes or radio buttons within a fieldset
      // append the error to the end of the fieldset.
      if (parentElement.parent().is('fieldset')) {
        $error.appendTo($element.parents('fieldset')).attr('tabindex', '-1');
      } else {
        // If it's a checkbox in a label and not in a fieldset
        // append the $error outside the parent label.
        $error.insertAfter(parentElement).attr('tabindex', '-1');
      }
    } else {
      $error.insertAfter($element).attr('tabindex', '-1');
    }
  }

  // Initialize form validation
  // Only call via delegation (it depends on `this` being supplied correctly)
  function initValidation() {
    var $form     = $(this).closest('form'),
        validator = $form.validate();

    $form.find('[data-text-limit]').each(function () {
      Terra.textLengthValidation(this);
    });

    $form.on('reset', function () {
      validator.resetForm();
    });
  }

  /*
   * Passively bridge the gap between Globalize.messageFormatter and $.validator.format.
   * Both use {X} for string interpolation and will step on each others' toes.
   *
   * This method takes infinite arguments with the first two being named.
   * The rest are sent to Globalize.messageFormatter as arguments in the order received.
   * This allows it to return {X} as a string so $.validator.format can properly populate the messages.
   *
   * @param path {String} the JSON path to the translated string for the current locale
   * @param defaultMessage {String} The hardcoded fallback text if Terra cannot Globalize
   *  Terra cannot Globalize if Globalize is not present *and* the default locale is not set.
   */
  function validationFormat(path, defaultMessage) {
    var formatter, args;

    if (Terra.canGlobalize()) {
      formatter = Globalize.messageFormatter(path);
      args      = Array.prototype.slice.call(arguments, 2, arguments.length);

      return formatter(args);
    }

    return defaultMessage;
  }

  /****************** VALIDATION PLUGINS ********************/

  /**
  * From jQuery Validation additional-methods.js
  * https://github.com/jzaefferer/jquery-validation/blob/master/src/additional/pattern.js
  *
  * Return true if the field value matches the given format RegExp
  *
  * @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
  * @result true
  *
  * @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
  * @result false
  *
  * @name $.validator.methods.pattern
  * @type Boolean
  * @cat Plugins/Validate/Methods
  */
  $.validator.addMethod('pattern', function (value, element, param) {
    if (this.optional(element)) {
      return true;
    }

    if (typeof param === 'string') {
      // THIS LINE DEVIATES FROM jQuery Validation's opinion.
      // We added '^(?:' and ')$' to follow HTML5 pattern matching conventions
      // '^(?:' match from the start of the string
      // ')$' match at the end of the string
      // http://www.w3.org/html/wg/drafts/html/master/forms.html#the-pattern-attribute
      param = new RegExp('^(?:' + param + ')$');
    }
    return param.test(value);
  }, 'Invalid format.');

  /****************** VALIDATION SETTINGS ********************/

  // Do this once as opposed to on a per <form> basis.
  $.validator.setDefaults({
    errorClass     : 'form-error',
    errorElement   : 'small',
    errorPlacement : formErrorPlacement
  });

  // Override the default messages to align validation with our requirements
  // https://wiki.ucern.com/display/pophealth/BLS001+Forms#BLS001Forms-3.%28FUTURE%29ValidationRequirements
  $.extend($.validator.messages, {
    date      : Terra._i18n(validationPath + 'date', 'Enter a valid date in the "mm/dd/yyyy" format.'),
    digits    : Terra._i18n(validationPath + 'digits', 'Enter only digits.'),
    email     : Terra._i18n(validationPath + 'email', 'Enter a valid email address.'),
    equalTo   : Terra._i18n(validationPath + 'equalTo', 'Enter the same value again.'),
    number    : Terra._i18n(validationPath + 'number', 'Enter a valid number.'),
    remote    : Terra._i18n(validationPath + 'remote', 'Fix this field.'),
    required  : Terra._i18n(validationPath + 'required', 'This field is required.'),
    url       : Terra._i18n(validationPath + 'url', 'Enter a valid URL.'),
    max       : validationFormat(validationPath + 'max', 'Enter a value less than or equal to {0}.', '{0}'),
    maxlength : validationFormat(validationPath + 'maxlength', 'Enter less than {0} characters.', '{0}'),
    min       : validationFormat(validationPath + 'min', 'Enter a value greater than or equal to {0}.', '{0}'),
    minlength : validationFormat(validationPath + 'minlength', 'Enter at least {0} characters.', '{0}'),
    range     : validationFormat(validationPath + 'range', 'Enter a value between {0} and {1}.', '{0}', '{1}')
  });

  /****************** CUSTOM VALIDATION ********************/

  /**
   * Sets up text length validation on a textarea.
   * Adds a counter that keeps track of available characters. Based on data-text-length.
   * Hooks the text area up to jQuery Validation.
   *
   * DO NOT call this method on a form that has not had jQuery validation setup on it.
   *
   * @method textLengthValidation
   * @chainable
   * @param textarea {object} A text area to set text validation up for.
   */
  Terra.textLengthValidation = function (textarea) {
    var getRemaining, updateCounter,
        $counter = $('<small class="text-counter"></small>'),
        $field   = $(textarea),
        max      = $field.data('text-limit');

    if ($field.data('rendered') === undefined) {
      $field.data('rendered', true);
      $field.after($counter);

      getRemaining = function () {
        return max - $field.val().length;
      };

      updateCounter = function () {
        var remaining = getRemaining();

        $counter.text(Globalize.formatMessage('Terra/truncateText/text_remaining', remaining));

        if (remaining < 0) {
          $counter.addClass('text-error');
        } else {
          $counter.removeClass('text-error');
        }
      };

      updateCounter();

      $field.rules('add', { maxlength: max });

      // Updates counter when text is modified.
      $field.on('input propertychange', updateCounter);

      // Needed because default reset will not update the counter.
      $field.closest('form').on('reset', function () {
        $field.val('').trigger('propertychange');
      });
    }

    return this;
  };

  /****************** VALIDATION DELEGATES ********************/

  $(document.body)
    // Filter on novalidate since jQuery validation will add that to cancel HTML5 form validation.
    // We also do not want to add validation to a form where a consumer has explicitly requested none.
    .on('focus.terra.forms.validation', 'form:not([novalidate])', initValidation)
    .on('click.terra.forms.validation', 'form:not([novalidate]) :submit', initValidation);
}(jQuery, Terra));

(function ($) {
  function _listSelectable() {
    Terra.ariaSelected(this, { customEvent: 'terra.list.itemSelected' });
  }

  function _listMultiSelectable() {
    Terra.ariaSelected(this, {
      customEvent : 'terra.list.itemSelected',
      selectStyle : 'multiple'
    });
  }

  $(document)
    .on('click', '.list-selectable li', _listSelectable)
    .on('click', '.list-multi-selectable li', _listMultiSelectable);
}(jQuery));

/* exported Terra.selectTableRow */

(function ($, Terra) {
  // Select Table Row
  // --------------------------------------------------
  // Allows for tr elements within a table's tbody element to be highlighted,
  // or selected, upon a click event. This is restricted to tbody so
  // that tr's within a thead or tfoot are not selectable.
  Terra.selectTableRow = function () {
    var $this        = $(this),
        $parentTable = $this.closest('table'),
        $parentTbody = $this.parent('tbody');

    if ($parentTable.hasClass('table-grouped-rows')) {
      $parentTbody.toggleClass('selected');

      // Deselect siblings if not multi-selectable
      if (!$parentTable.hasClass('table-multi-selectable')) {
        $parentTbody.siblings().removeClass('selected');
      }
    } else {
      $this.toggleClass('selected');

      // Deselect siblings if not multi-selectable
      if (!$parentTable.hasClass('table-multi-selectable')) {
        $this.siblings().removeClass('selected');
      }
    }

    $this.trigger('Terra.table.rowSelected');
  };

  // Event handlers
  $(document).on('click', '.table-selectable tbody tr, .table-multi-selectable tbody tr', Terra.selectTableRow);
}(jQuery, Terra));

/* exported Terra.toggleContentPanel */

(function ($, Terra) {
  /****************** Content Panels ********************/

  // Show/hide collapsible content panel when clicked
  // when the content panel is closed and toggling to open the expectation is that it will not have
  // the collapsed class so ajax-disabled will be true allowing to load via ajax
  // when the content panel is opened, and toggling to closed, ajax will be disabled since new data doesn't need to load
  Terra.toggleContentPanel = function (e) {
    var $this         = $(e.target),
        $contentPanel = $this.closest('.content-panel'),
        $collapseArea = $contentPanel.children('.content-panel-inner');

    $collapseArea
      .stop(true, true)
      .slideToggle('fast', function () {
        // Fire an event that consuming applications can listen to.
        $contentPanel.trigger('Terra.contentPanelToggled');
      });

    // toggleClass returns a promise object that enables me to see when the action is done.
    // https://api.jquery.com/promise/
    $contentPanel.toggleClass('collapsed').promise().done(function ($obj) {
      var $ajaxHeader = $obj.children('[data-ajax-url]');

      if (!$obj.hasClass('collapsed')) {
        Terra.justifyHeight($obj);
      }

      // Don't reload the content when the content panel is open and being closed
      if ($ajaxHeader.length > 0 && !$obj.hasClass('collapsed')) {
        Terra.ajaxRequestHandler(e, $ajaxHeader, $obj.find('.content-panel-body'));
      }
    });
  };

  // Event handlers
  $(document)
    .on('click', '.content-panel.collapsible > header', Terra.toggleContentPanel)
    .on(
      'click',
      '.content-panel .actions .btn-group, ' +
      '.content-panel .actions .btn, ' +
      '.content-panel .actions a, ' +
      '.content-panel .actions button',
      function (e) {
        // This prevents click events on buttons nested inside content panels from propagating up
        // to the content panels toggle event.
        if ($(this).parent('.btn-group').length === 0) {
          e.stopPropagation();
        }
      }
    );
}(jQuery, Terra));

(function ($, Terra, window, undefined) {
  var $dropdownButton,
      smallScreenSizes   = ['xxs', 'xs'],
      translateHashRegex = /^(#?)tab-/;

  // Clonable dropdown button to efficiently create as many buttons as needed
  $dropdownButton = $(
    '<button class="btn" aria-expanded="false" aria-haspopup="true" data-toggle="dropdown">' +
      '<span></span>' +
      '<span class="icon-decrement"></span>' +
    '</button>'
  );

  /*
   * Basic tab functionality
   * Initializes all tabs scoped within the event target
   * This function will be invoked by Terra.init
   *
   * e - the JS event.
   */
  function tabs(e) {
    $(e.target).find('[role~="tablist"]').each(function () {
      var selectedElemText,
          $this     = $(this),
          $controls = $this.find('a');

      /*
       * Adjust aria properties for tabs corresponding with the window location hash
       */
      if (window.location.hash) {
        $controls.each(function () {
          // Update the aria-selected attribute based on the hash
          if (this.hash === window.location.hash) {
            // Remove aria-selected for all tabs and then set it for the tab
            // corresponding to the URL hash
            $controls.attr('aria-selected', false);
            $(this).attr('aria-selected', true);

            selectedElemText = this.text;

            // We found a match, there's no reason to continue this each loop
            return false;
          }
        });
      }

      if (selectedElemText === undefined) {
        selectedElemText = $controls.first().text();
      }

      // Tabs represented as button groups are not supposed to roll up.
      if (!$this.hasClass('btn-group')) {
        injectRollupDOM($this, selectedElemText);
      }

      // Hide all sections belonging to non-selected tabs
      _tabHideTargets($controls);

      // Adjust aria properties for sections that are visible
      $controls.filter('[aria-selected="true"]').each(function () {
        var $myTarget = $(_tabTranslateFakeHash(this.hash));
        $myTarget.attr('aria-expanded', true);
        $myTarget.attr('aria-hidden', false);
      });
    });

    contextToggle();
  }

  // Add the classes, roles, and elements necessary for tabs to roll up
  function injectRollupDOM($tabs, selectedElemText) {
    var $button = $dropdownButton.clone();

    $button.children().first().html(selectedElemText);

    // Add the correct aria roles necessary for tabs to roll up
    // Add a button to use when rolled up only if there is no dropdown button
    if ( $tabs.siblings('button[data-toggle="dropdown"]').length === 0 ) {
      $tabs
        .attr('role', 'tablist menu')
        .parent()
          .addClass('has-tabs') // This is needed as a CSS/JS hook for styling and behavior.
          .prepend($button);
    }
  }

  // Remove or add dropdown styles from tabs based on screen size
  function contextToggle() {
    var mq    = Terra.getMediaQueryName(),
        $tabs = $('.has-tabs');

    if ($.inArray(mq, smallScreenSizes) > -1) {
      $tabs
        .addClass('dropdown')
        .find('[role~=tablist]')
          .attr('aria-hidden', 'true');

      $tabs.each(function () {
        updateActiveText.call(this);
      });
    }
    else {
      $tabs
        .removeClass('dropdown')
        .find('[role~=tablist]')
          .removeAttr('aria-hidden');
    }
  }

  // Helper to hide non active targets
  // Uses hide instead of fadeOut to keep the page from jumping when a user clicks on a tab
  function _tabHideTargets($controls) {
    $controls.not('[aria-selected="true"]').each(function () {
      var $myTarget = $(_tabTranslateFakeHash(this.hash));
      $myTarget.hide();
      $myTarget.attr('aria-expanded', false);
      $myTarget.attr('aria-hidden', true);
    });
  }

  // Helper to remove the tab- prefix from fake hashes
  function _tabTranslateFakeHash(hash) {
    return hash.replace(translateHashRegex, '$1');
  }

  // Finds the related dropdown button and updates its text with the currently selected tab's text
  function updateActiveText() {
    var $this = $(this),
        text  = $this.find('[aria-selected="true"]')[0].text;

    $this.find('button').children().first().html(text);
  }

  // Bind to Terra.init so consumers can re-init as needed and scope to a parent container
  $(document)
    .on('Terra.init', tabs)
    .on('click.terra.tabs', '[role~="tablist"] a', function (e) {
      var $myTarget = $(_tabTranslateFakeHash(this.hash)),
          $this     = $(this),
          $ancestor = $this.closest('[role~="tablist"]'),
          $controls = $ancestor.find('a'),
          hash      = this.hash.replace('#', '');

      $controls.attr('aria-selected', false);
      $(this).attr('aria-selected', true);

      _tabHideTargets($controls);

      // Show the selected target
      // Since content does not fade out, double the fade in speed to keep the animation time
      // perceptually the same to users.
      $myTarget.fadeIn(Terra.transitionSpeed * 2);
      $myTarget.attr('aria-expanded', true);
      $myTarget.attr('aria-hidden', false);

      // If updateHash is set, we don't want the browser to scroll to the anchor.
      // We'll remove the ID from the target, then
      // update the window hash manually and re-insert the ID.
      if ($ancestor.data('update-hash') !== undefined) {
        $myTarget.attr('id', '');
        window.location.hash = hash;
        $myTarget.attr('id', _tabTranslateFakeHash(hash));
      }

      // Trigger an event that consumers can hook onto
      $this.trigger('Terra.tabClick');

      e.preventDefault();
    })
    .on('click.terra.dropdown', '.dropdown.has-tabs', updateActiveText);

  // This is done instead of leveraging media queries for dropdowns with tabs
  // to avoid selector bloat and maintenance issues
  $(window).on('Terra.resizeEnd', contextToggle);
}(jQuery, Terra, window));

/* exported Terra.Navigation */

// Navigation API
// --------------------------------------------------

(function ($, Terra, undefined) {
  Terra.Navigation = {};
  var activeClass            = 'terra-Navigation--active',
      parentActiveClass      = 'terra-Navigation--active-parent',
      grandparentActiveClass = 'terra-Navigation--active-grandparent';

  // PUBLIC FUNCTIONS
  // ------------------------------------------------

  // Setups a navigation panel to be the currently active panel, preparing it's ancestors for backwards navigation
  // $nav - Navigation panel to become active
  Terra.Navigation.activateNav = function($nav) {
    var $parentNav       = $('[aria-owns="' + $nav.attr('id') + '"]').closest('[role="navigation"]'),
        $grandparentNav = $('[aria-owns="' + $parentNav.attr('id') + '"]').closest('[role="navigation"]');

    Terra.activate($parentNav, parentActiveClass);
    Terra.activate($grandparentNav, grandparentActiveClass);

    // When going back, sometimes there is no parent or grandparent to remove active classes
    // They must be manually removed in that case
    $nav.removeClass(parentActiveClass + ' ' + grandparentActiveClass);
    Terra.activate($nav, activeClass);
  };

  // PRIVATE FUNCTIONS
  // ------------------------------------------------

  // Handles what happens when a navigation element is clicked.
  // When the back button is clicked, go up a level in the navigation.
  // When a element is clicked that points to another navigation panel, make that navigation panel active.
  // When an endpoint is clicked (no aria-owns), select the element and close the navigation on smaller screens.
  function handleNavigationClick(event) {
    var $this = $(this);

    if ($this.hasClass('terra-Navigation-item--back')) {
      Terra.Navigation.activateNav($('[aria-owns="' + $this.closest('[role="navigation"]').attr('id') + '"]')
          .closest('[role="navigation"]'));
    } else {
      if ($this.attr('aria-owns') !== undefined) {
        event.preventDefault(); // Don't navigate to href

        Terra.Navigation.activateNav($('#' + $this.attr('aria-owns')));
      } else {
        selectItem($this);
      }
    }
  }

  // Add selected attirbutes and a status indicator to the selected navigation item and
  // close the navigation if on a smaller screen - but do not do this for util items
  function selectItem($item) {
    if (!$item.parent().hasClass('terra-Navigation-utils')) {
      Terra.ariaSelected($item);
      $item.siblings().removeClass('status-accent');
      $item.addClass('status-accent');

      if (isMinimalScreen() && $('.terra-Navigation').attr('aria-hidden') !== 'true') {
        toggleNavigation();
      }
    }
  }

  // Initialize navigation, adding an overlay if a navigation exists.
  function initializeNavigation() {
    var $mainNav = $('.terra-Navigation');

    populateMoreDropdown();
    populateUtilItems();

    if ($mainNav.length !== 0) {
      // Only add overlay once incase of reinit
      if ($('.terra-Navigation-overlay').length === 0) {
        $('<div class="terra-Navigation-overlay" tabindex="-1"></div>').insertAfter($mainNav);
      }

      if(isMinimalScreen()) {
        moveTopNavToSideNav();
      }
    }

    updateTopNavLinks();
  }

  // Populates the more dropdown with top navigation links that are shown/hidden based on available space
  function populateMoreDropdown() {
    var $moreDropdown = $('.terra-Navigation-more'),
        $topNavMenu   = $('.terra-Navigation-top [role="navigation"]'),
        $li           = $('<li/>');

    // Only populate more dropdown menu once
    if ($topNavMenu.length !== 0 && $moreDropdown.find('[role="menu"]').children().length === 0) {
      $topNavMenu.find('.terra-Navigation-item').each(function () {
        // Make a copy of the navigation item link and place a list item of it in the more dropdown
        $moreDropdown.find('[role="menu"]').append($li.clone().append($(this).find('a').clone()));
      });
    }
  }

  // Populates the utilities section of the top nav with navigation items that are shown in the side nav
  function populateUtilItems() {
    var $utilDropdown = $('.terra-Navigation-utils');

    // Only populate navigation items once
    if ($utilDropdown.find('.terra-Navigation-item').length === 0) {
      $utilDropdown.find('[role="menu"] li').each(function () {
        var $li = $(this).clone();

        $utilDropdown.append($li.addClass('terra-Navigation-item'));
      });
    }
  }

  // Returns true if the screen is either XXS, XS, or S
  function isMinimalScreen() {
    var mediaQuery = Terra.getMediaQueryName();

    return mediaQuery === 'xxs' || mediaQuery === 'xs' || mediaQuery === 's';
  }

  // Hides/shows the navigation
  function toggleNavigation() {
    var $mainNav = $('.terra-Navigation');

    if ($mainNav.attr('aria-hidden') === 'true') {
      $mainNav.attr('aria-hidden', 'false').trigger('Terra.navigation.navShown');
    } else {
      $mainNav.attr('aria-hidden', 'true').trigger('Terra.navigation.navHidden');
    }
  }

  // In case of using default navigation toggle, the navigation menu will be
  // re-shown when screens move from small to large.
  // This behavior can be disabled by setting the Terra.Navigation.showOnResize to false
  // If there is a top navigation, it is also added to the side navigation.
  function displayNavigationOnResize() {
    if (isMinimalScreen()) {
      moveTopNavToSideNav();
    } else {
      revertMoveTopNavtoSideNav();

      if ($('.terra-Navigation').attr('aria-hidden') === 'true' && Terra.Navigation.showOnResize !== false) {
        toggleNavigation();
      }
    }
  }

  // Move the top menu to the side navigation
  function moveTopNavToSideNav() {
    var $topNavigationMenu = $('.terra-Navigation-top [role="navigation"]'),
        $navigationLogo    = $('.terra-Navigation-logo');

    // Only move the menu if it is in top nav
    if ($topNavigationMenu.length !== 0) {
      $topNavigationMenu.children('.terra-Navigation-item').show();
      $('.terra-Navigation-more').hide();

      $topNavigationMenu.insertAfter($navigationLogo);

      // Re-activate active menu to add appropriate styles to new top menu`
      Terra.Navigation.activateNav($(document.getElementsByClassName(activeClass)));
    }
  }

  // Move the top menu to the top navigation
  function revertMoveTopNavtoSideNav() {
    var $topNavigationMenu = $('#terra-top-menu'),
        $topNav            = $('.terra-Navigation-top');

    // Only move the menu if there is a top navigation to move it to
    if ($topNav.length !== 0) {
      $topNavigationMenu.prependTo($topNav);

      // If top menu is active make the next menu active in the side nav
      if ($topNavigationMenu.hasClass(activeClass)) {
        Terra.Navigation.activateNav($('.terra-Navigation > [role="navigation"]').first());
      }

      // Remove side nav active styles in top menu
      $topNavigationMenu.removeClass(activeClass).removeClass(parentActiveClass).removeClass(grandparentActiveClass);
    }
  }

  // Hide/show the top navigation links and the more dropdown links based on how much available space there is.
  // The less available space, the more links will be hidden and shown in the dropdown and vice versa.
  function updateTopNavLinks() {
    var availableWidth, totalWidth,
        $topNavMenu    = $('.terra-Navigation-top [role="navigation"]'),
        $topDropdown   = $('.terra-Navigation-more');

    // Only do calculations if the menu is in the top navigation
    if ($topNavMenu.length !== 0) {
      $topDropdown.show(); // Show to get correct width

      availableWidth = $topNavMenu[0].getBoundingClientRect().width;
      totalWidth     = $topNavMenu.find('.terra-Navigation-utils')[0].getBoundingClientRect().width; // Taken up by util

      $topNavMenu.children('.terra-Navigation-item').each(function (index) {
        var $associatedDropdownLink = $($('.terra-Navigation-more [role="menu"]').find('li')[index]),
            isLastElement        = (index === $topNavMenu.children('.terra-Navigation-item').length - 1),
            checkWidth;

        $(this).show(); // Show to get correct width
        $associatedDropdownLink.hide();

        totalWidth += this.getBoundingClientRect().width;

        // Don't check if the more dropdown will fit with the last element, as they'll never be together (so sad)
        checkWidth = isLastElement ? totalWidth : totalWidth + $topDropdown[0].getBoundingClientRect().width;

        if (checkWidth > availableWidth) {
          $(this).hide();
          $associatedDropdownLink.show();
          availableWidth = 0; // starting to hide elements, hide every future element
        }
      });

      if (totalWidth < availableWidth) {
        $topDropdown.hide();
      }
    }
  }

  $(document)
    .on('click', '.terra-Navigation [role="navigation"] .terra-Navigation-item', handleNavigationClick)
    .on('click', '[data-toggle="navigation"], .terra-Navigation-overlay', toggleNavigation)
    .on('Terra.init', initializeNavigation);

  $(window)
    .on('Terra.resizeEnd', displayNavigationOnResize)
    .on('Terra.resizeEnd', updateTopNavLinks);
}(jQuery, Terra));

/* exported Terra.Alerts */

(function ($, Terra) {
  // Alerts
  // --------------------------------------------------
  Terra.Alerts = {};

  // Initialize existing alert messages.
  // Dismissible & site-level alerts will have close buttons added to them.
  // Auto-hiding alerts will be flagged for removal based on the data-remove attribute.
  //
  // @chainable
  // @param selector {String} - The css selector of a parent object to limit the scope of the init function.
  Terra.Alerts.init = function (selector) {
    selector = selector || '';

    // Mark alerts as rendered.
    // If an alert is marked to auto-remove, flag it for auto-removal with the appropriate delay.
    $(selector + ' .alert:not([data-rendered])')
      .attr('data-rendered', true)
      .filter(function () {
        // An alert should only be auto-removed if a time is specified and is greater than zero.
        // A dismiss time of zero or non-numeric implies that it should never be auto-removed.
        return $(this).attr('data-remove') > 0;
      })
      .each(function () {
        var $this = $(this);

        // Remove after data-remove time tranlated to seconds
        setTimeout(function () {
          $this.transitionAndRemove('slideUp');
        }, $this.data('remove') * 1000);
      });

    return this;
  };

  // Adds an alert to the page at the given selector
  //
  // @method addAlert
  // @chainable
  // @param selector    {String}  - A jQuery string selector.
  // @param msg         {String}  - The message to display in the alert.
  // @param status      {String}  - OPTIONAL - Type of alert - info, success, warning, or error. Defaults to info.
  // @param time        {Number}  - OPTIONAL - Time, in seconds, to wait before removing the element. 0 = don't remove.
  // @param dismissible {Boolean} - OPTIONAL - Whether the alert is dismissible or not (Not dismissible by default)
  // Dismissible alerts will have close buttons added to them.
  Terra.Alerts.addAlert = function (selector, msg, status, time, dismissible) {
    var $dismissButton   = null,
        $alert           = $(document.createElement('div')),
        $alertMessage    = $(document.createElement('p'));

    if (dismissible) {
      $dismissButton = $(document.createElement('button'))
        .addClass('icon-dismiss')
        .attr({
          'aria-label': 'Dismiss',
          'type'      : 'button'
        });
    }

    // Add the message content to the alertMessage object
    $alertMessage.html(msg);

    // Assemble the alert object
    $alert
      .addClass('alert ' + 'alert-' + (status || 'info'))
      .attr({
        'data-remove': time,
        'role'       : 'alert'
      })
      .html($alertMessage)
      .prepend($dismissButton)
      .appendTo(selector);

    Terra.Alerts.init(selector);

    return this;
  };

  // Adds a site-level alert to the page
  // Site level alerts are always dismissible
  //
  // @method addSiteAlert
  // @chainable
  // @param msg    {String} - The message to display in the alert.
  // @param status {String} - OPTIONAL - Which type of alert it is - success, warning, or error. Defaults to error.
  // @param time   {Number} - OPTIONAL - The time, in seconds, to wait before removing the element. 0 = don't remove.
  Terra.Alerts.addSiteAlert = function (msg, status, time) {
    return Terra.Alerts.addAlert('#alert-site-level', msg, status, time, true);
  };

  // Appends an informational alert to the page at the given selector.
  //
  // @method info
  // @chainable
  // @param selector    {String}  - A jQuery string selector.
  // @param msg         {String}  - The message to display in the alert.
  // @param options     {Hash}    - Options hash to specify optional attributes.
  //        time        {Number}  - The time, in seconds, to wait before removing the element. 0 = don't remove.
  //        dismissible {Boolean} - Boolean to specify whether the alert is dismissible or not.
  Terra.Alerts.info = function (selector, msg, options) {
    if (options) {
      return Terra.Alerts.addAlert(selector, msg, 'info', options.time, options.dismissible);
    } else {
      return Terra.Alerts.addAlert(selector, msg, 'info');
    }
  };

  // Appends a success alert to the page at the given selector.
  //
  // @method success
  // @chainable
  // @param selector    {String}  - A jQuery string selector.
  // @param msg         {String}  - The message to display in the alert.
  // @param options     {Hash}    - Options hash to specify optional attributes.
  //        time        {Number}  - The time, in seconds, to wait before removing the element. 0 = don't remove.
  //        dismissible {Boolean} - Boolean to specify whether the alert is dismissible or not.
  Terra.Alerts.success = function (selector, msg, options) {
    if (options) {
      return Terra.Alerts.addAlert(selector, msg, 'success', options.time, options.dismissible);
    } else {
      return Terra.Alerts.addAlert(selector, msg, 'success');
    }
  };

  // Appends a warning alert to the page at the given selector.
  //
  // @method warning
  // @chainable
  // @param selector    {String}  - A jQuery string selector.
  // @param msg         {String}  - The message to display in the alert.
  // @param options     {Hash}    - Options hash to specify optional attributes.
  //        time        {Number}  - The time, in seconds, to wait before removing the element. 0 = don't remove.
  //        dismissible {Boolean} - Boolean to specify whether the alert is dismissible or not.
  Terra.Alerts.warning = function (selector, msg, options) {
    if (options) {
      return Terra.Alerts.addAlert(selector, msg, 'warning', options.time, options.dismissible);
    } else {
      return Terra.Alerts.addAlert(selector, msg, 'warning');
    }
  };

  // Appends an error alert to the page at the given selector.
  //
  // @method error
  // @chainable
  // @param selector    {String}  - A jQuery string selector.
  // @param msg         {String}  - The message to display in the alert.
  // @param options     {Hash}    - Options hash to specify optional attributes.
  //        time        {Number}  - The time, in seconds, to wait before removing the element. 0 = don't remove.
  //        dismissible {Boolean} - Boolean to specify whether the alert is dismissible or not.
  Terra.Alerts.error = function (selector, msg, options) {
    if (options) {
      return Terra.Alerts.addAlert(selector, msg, 'error', options.time, options.dismissible);
    } else {
      return Terra.Alerts.addAlert(selector, msg, 'error');
    }
  };

  // Event handlers
  $(document)
    .on('click.terra.alert-dismiss', '.alert .icon-dismiss', function () {
      $(this).parent('.alert').transitionAndRemove('slideUp');
    })
    .ajaxComplete(function () {
      Terra.Alerts.init();
    });

  $(function () {
    Terra.Alerts.init();
  });
}(jQuery, Terra));

/* exported Terra.Overlay */

// Overlay API
// --------------------------------------------------

(function ($, Terra, undefined) {
  var lastFocusedElement = null,
      $overlay = $('<div class="overlay" tabindex="-1"></div>');

  // Public API
  // --------------------------------------------------
  Terra.Overlay = {};

  /**
   * Determines if the overlay is visible or hidden.
   * @return {Boolean} True if the overlay is visible, false if its hidden.
   */
  Terra.Overlay.isVisible = function() {
    return $('.overlay:visible').length > 0;
  };

  /**
   * Shows the overlay.
   * @chainable
   */
  Terra.Overlay.show = function() {
    if (this.isVisible()) {
      // Do _not_ add the overlay into the DOM more than once.
      return this;
    }

    // Remember the element that had focus prior to the overlay being present.
    lastFocusedElement = document.activeElement;

    // The overlay must have a tabindex in order for it to be focusable.
    $('body').prepend($overlay);

    // Focus on the overlay.
    $overlay.focus();

    // Prevent focus from leaving the overlay.
    $(document).on('focusin.terra.overlay', function(e) {
      // If focus is changed to another element, then focus must be set back to the overlay.
      // However, changing focus back to the overlay will cause the 'focusin' event to immediately refire.
      // In this case, focus should not be reapplied because otherwise the event will continue to refire
      // ad infinitum - thus causing a stackflow.
      //
      // The solution is to check if the element getting focus is the overlay and if it is, then don't set
      // focus to it again.
      if ($overlay[0] === e.target) {
        return;
      }
      $overlay.focus();
    });

    // Fire trigger.
    $(document).trigger('Terra.overlayOpened');

    return this;
  };

  /**
   * Presents the overlay with content.
   * @param selector A selector to an element to be presented in the center of the overlay.
   * @chainable
   */
  Terra.Overlay.showWithContent = function(selector) {
    if (this.isVisible()) {
      // Do _not_ add the overlay into the DOM more than once.
      return this;
    }

    // Show the desired content in the overlay.
    $(selector).show();

    return this.show();
  };

  /**
   * Hides the overlay.
   * @chainable
   */
  Terra.Overlay.hide = function() {
    // Remove the overlay.
    $overlay.remove();

    // Hide all content that could've been presented with the overlay.
    $('.overlay-content').hide();

    // Remove the focus event.  This needs to be done prior to restoring focus to the last focused element.
    $(document).off('focusin.terra.overlay');

    // Bring focus to the element selected prior to the overlay being shown.
    if (lastFocusedElement) {
      $(lastFocusedElement).focus();
      lastFocusedElement = null;
    }

    // Fire trigger.
    $(document).trigger('Terra.overlayClosed');

    return this;
  };
}(jQuery, Terra));


/* exported Terra.Modal */

(function ($, Terra, window) {
  Terra.Modal = {};
  /*
   * Function to set max-height of .modal-body or height of .modal-full-screen in order to make sure that the modal
   * will stay on screen. Also sets padding-bottom on form modals to make sure contents are not hidden by the footer.
   */
  function _adjustModalHeights($modal) {
    var windowHeight       = $(window).height(),
        modalHeadersHeight = $modal.find('header').outerHeight() + $modal.find('.header-secondary').outerHeight(),
        modalFooterHeight  = $modal.find('footer').outerHeight() || $modal.find('.form-actions').outerHeight();

    if ($modal.hasClass('modal-full-screen')) {
      $modal.find('.modal-body').css('height', windowHeight - modalHeadersHeight - modalFooterHeight);
    } else {
      // 0.85 to match the 85% width that UX requested.
      $modal.find('.modal-body').css('max-height', (windowHeight * 0.85) - modalHeadersHeight - modalFooterHeight);
    }

    if ($modal.hasClass('modal-form')) {
      // Needed to make sure footer doesn't cover any content.
      $modal.css('padding-bottom', modalFooterHeight);
    }
  }

  function openModal() {
    if (this.content) {
      this.content
        .addClass('open')
        .trigger('terra.modal.open');

      if (this.content.attr('data-modal-width')) {
        this.content.css('width', this.content.attr('data-modal-width'));
      }

      _adjustModalHeights(this.content);
    }
  }

  function closeModal() {
    if (this.content) {
      this.content
        .removeClass('open')
        .trigger('terra.modal.close');
    }
  }

  function resizeModal() {
    if (this.content) {
      _adjustModalHeights(this.content);
      $(this.content).trigger('terra.modal.resize');
    }
  }

  var modalOptionDefaults = {
        closeMarkup : '<button class="mfp-close icon-dismiss" aria-label="Dismiss"></button>',
        type        : 'ajax',
        callbacks   : {
          ajaxContentAdded : openModal,
          close            : closeModal,
          resize           : resizeModal
        }
      },
      modalBlockOverrides = {
        closeOnBgClick  : false,
        enableEscapeKey : false
      },
      modalFormOverrides = $.extend(true, {}, modalBlockOverrides, {
        callbacks: {
          close: function() {
            this.content.find('form').trigger('reset');
            closeModal.apply(this);
          }
        }
      });


  /*
   * This will initialize and open a modal with the given options.
   *   modalTrigger - The triggering anchor element for the modal. Pass in null if you are not using a trigger.
   *   options - (optional) Accepted boolean options are:
   *      - block         : Require explicit action to close modal
   *      - form          : The modal contains a form.
   *      - modalLocation : (string) ID pointing to a modal on the page, or href pointing to a remote modal.
   *                                 Required if modalTrigger is null.
   *      - selector      : (standard only) The selector for the modal
   *   magnificOverrides - (optional) magnific overrides
   */
  function _initializeAndOpenModal(modalTrigger, options, magnificOverrides) {
    var magnificOptions = $.extend(true, {}, modalOptionDefaults, magnificOverrides);

    if (options && options.form) {
      $.extend(true, magnificOptions, modalFormOverrides);
    }

    if (options && options.block) {
      $.extend(true, magnificOptions, modalBlockOverrides);
    }

    // Directly open the modal if the modal does not have a trigger associated to it.
    if (modalTrigger) {
      $(modalTrigger)
        .magnificPopup(magnificOptions)
        .magnificPopup('open')
        .attr('data-rendered', true);
    } else if(options.modalLocation) {
      $.extend(true, magnificOptions, {items: {src: options.modalLocation}});
      $.magnificPopup.open(magnificOptions);
    }
  }

  /*
   * This will initialize and open a standard modal which will load a modal via ajax.
   *   modalTrigger - The triggering anchor element for the modal. Pass in null if you are not using a trigger.
   *   options - (optional) Accepted boolean options are:
   *      - block         : Require explicit action to close modal
   *      - form          : The modal contains a form.
   *      - modalLocation : (string) ID pointing to a modal on the page, or href pointing to a remote modal.
   *                                 Required if modalTrigger is null.
   *      - selector      : The selector for the modal
   */
  Terra.Modal.standard = function (modalTrigger, options) {
    if (options.selector) {
      _initializeAndOpenModal(modalTrigger, options, {
        callbacks: {
          parseAjax: function(mfpResponse) {
            var $mfpResponseData  = $(mfpResponse.data),
                $filteredResponse = $mfpResponseData.filter(options.selector);

            // Need to check if the selector was a top-level element because #find will only look at children.
            if ($filteredResponse.length !== 0) {
              mfpResponse.data = $filteredResponse;
            } else {
              mfpResponse.data = $mfpResponseData.find(options.selector);
            }
          }
        }
      });
    } else {
      _initializeAndOpenModal(modalTrigger, options);
    }
  };

  /*
   * This will initialize and open an inline modal which will load a modal on the page.
   *   modalTrigger - The triggering anchor element for the modal. Pass in null if you are not using a trigger.
   *   options - (optional) Accepted boolean options are:
   *      - block         : Require explicit action to close modal
   *      - modalLocation : (string) ID pointing to a modal on the page, or href pointing to a remote modal.
   *                                 Required if modalTrigger is null.
   *      - form          : The modal contains a form.
   */
  Terra.Modal.inline = function (modalTrigger, options) {
    _initializeAndOpenModal(
      modalTrigger,
      options,
      {
        type      : null,
        callbacks : {
          open: openModal, // override default open callback as content has not been loaded yet.
          ajaxContentAdded: null
        }
      }
    );
  };

  /*
   * Triggers the correct modal initialization function based on 'data-toggle' attribute. Defaults to standard modal.
   */
  function _modalOpenHandler(e) {
    var options = {
          form     : this.getAttribute('data-modal-form') || false,
          block    : this.getAttribute('data-modal-block') || false,
          selector : this.getAttribute('data-modal-selector')
        };

    if (this.getAttribute('data-toggle') === 'modal-inline') {
      Terra.Modal.inline($(this), options);
    } else {
      Terra.Modal.standard($(this), options);
    }

    e.preventDefault();
  }

  function _modalCloseHandler() {
    $.magnificPopup.close();
  }

  $(document)
    .on('click.terra.modal', '[data-toggle^="modal"]:not([data-rendered])', _modalOpenHandler)
    .on('click.terra.modal', '.modal [data-dismiss="modal"]', _modalCloseHandler);
}(jQuery, Terra, window));

(function ($, Terra) {

  Terra.Popups = {};
  /**
   * Helper that checks data attributes set on popup trigger
   * to build out popup options and initializes a tooltipster instance.
   * @param  {Object} $elem     jQuery object of element used to trigger the popup.
   *                            Data attributes are pulled from this element as part of the popup data-api.
   * @param  {Object} popupData An object which stores all of the data attributes and their values which have
   *                            been set on $elem.
   * @param  {Object} options   An object which stores default options for each type of popups: click, hover, onload.
   *                            Values from popupData are added to this object.
   *                            This object is then passed to tooltipster when it is initialized.
   */
  function _initPopup($elem, popupData, options) {
    // Boolean check ensures this does not return false positive when arrow is set false.
    if (typeof popupData.popupArrow === 'boolean') {
      options.arrow = popupData.popupArrow;
    }

    if (popupData.popupContent) {
      // Injects HTML from DOM element specified in data attribute into the generated popup.
      options.functionInit = function() {
        return $(popupData.popupContent).html();
      };
    }

    // Configure a helper to be invoked each time before the popup opens.
    options.functionBefore = function($elem, continueTooltip) {
      // Show the tooltip right away without blocking.
      continueTooltip();

      // Create a helper for the consumer which populates the popup with HTML content.
      function populateContent(HTMLContent) {
        return $elem.tooltipster('content', HTMLContent);
      }

      // Invoke the trigger.
      $elem.trigger('Terra.Popup.open', [populateContent]);
    };

    // Configure a helper to be invoked each time after the popup closes.
    options.functionAfter = function($elem) {
      $elem.trigger('Terra.Popup.close');
    };

    // Always enable the content as HTML.
    options.contentAsHTML = 'true';

    // Sets max-width to user defined size
    // Defaults to 500px
    options.maxWidth = popupData.popupMaxwidth || 500;

    // Set popup position to open to user defined position
    // Defaults to top
    options.position = popupData.popupPosition || 'top';

    if (popupData.popupPosition) {
      var position = popupData.popupPosition.toLowerCase(),
          directionality = $(document).attr('dir');

      if (position === 'start') {
        options.position = ((directionality === 'rtl') ? 'right' : 'left');
      } else if (position === 'end') {
        options.position = ((directionality === 'rtl') ? 'left' : 'right');
      } else {
        options.position = position;
      }
    }

    // Initialize tooltipster instance with options set on $elem
    $elem
      .tooltipster(options)
      .tooltipster('show');
  }

  /*
   * Wrapper to initialize popup on hover funtionality
   */
  Terra.Popups.showHover = function () {
    // Using direct event binding as mouseover/mouseout is fired very frequently on document
    $('[data-popup="hover"]')
      .on('mouseover', showHandler)
      .on('mouseout', {trigger: 'hover'}, hideHandler);
  };

  /*
   * Show popup on click/hover funtionality
   *
   * @param {String|Object} popup - The popup to be shown.
   */
  Terra.Popups.show = function(popup) {
    var $elem     = $(popup),
        popupData = $elem.data(),
        options   = {
          debug       : false, //  Set to false to disable Tooltipster from logging to the console.
          interactive : true, // Allows users the possibility to interact with the popup without closing it.
          trigger     : 'click', // Default to click to open popup
          autoClose   : false // Broken by tooltipster - https://github.com/iamceege/tooltipster/issues/356
        };

    // If hover specified as trigger to open, set hover options
    if (typeof popupData.popup !== 'undefined' && popupData.popup.toLowerCase() === 'hover') {
      options.trigger = 'hover';
    }

    _initPopup($elem, popupData, options);
  };

  /**
   * Hides a popup.
   *
   * @method hide
   * @chainable
   * @param {String|Object} popup - The popup to hide.
   */
  Terra.Popups.hide = function(popup) {
    $(popup).tooltipster('hide');
  };

  /**
   * Hides a popup that is hidden through a trigger.
   *
   * @method hide
   * @chainable
   * @param {String|Object} popup - The popup to hide.
   * @param {Object} triggerOptions (Optional) - object of options used to override the defaults.
   * @param {String} [triggerOptions.trigger] - The trigger type for the popup (Ex: 'auto-close')
   * @param {String} [triggerOptions.triggerTarget] - The trigger to close the popup for
   */
  Terra.Popups.hideWithTrigger = function(popup, triggerOptions) {
    var $elem     = $(popup),
        popupData = $elem.data(),
        popupOptions = triggerOptions || {},
        $trigger;

    switch (popupOptions.trigger) {
      case 'popup-button':
        // If a popup to close has been specified, close it.
        if (typeof popupData.popupClose !== 'undefined') {
          $(popupData.popupClose).tooltipster('hide');
        }
        break;
      case 'tab-button':
        $('[role="tabpanel"] .tooltipstered[data-popup]').tooltipster('hide');
        break;
      case 'content-toggler':
        $elem.find('.tooltipstered[data-popup]').tooltipster('hide');
        break;
      case 'auto-close':
        // Fake auto close for dialogs because tooltipster broke it - https://github.com/iamceege/tooltipster/issues/356
        $trigger = $(popupOptions.triggerTarget).closest('.tooltipstered');

        // Close all other tooltipsters if a trigger is clicked, otherwise close all tooltipsters
        if ($trigger.length) {
          $('.tooltipstered:not([data-popup-auto-close="false"])').not($trigger).tooltipster('hide');
        } else if (!$(popupOptions.triggerTarget).closest('.tooltipster-base').length) {
          $('.tooltipstered:not([data-popup-auto-close="false"])').tooltipster('hide');
        }
        break;
      case 'modal-close':
        $('.mfp-hide .tooltipstered').tooltipster('hide');
        break;
      default:
        $elem.tooltipster('hide');
        break;
    }
  };

  function hoverHandler() {
    Terra.Popups.showHover();
  }

  function showHandler() {
    Terra.Popups.show(this);
  }

  function hideHandler(e) {
    var eventData = e.data || {};

    Terra.Popups.hideWithTrigger(this, {trigger: eventData.trigger, triggerTarget: e.target});
  }

  // Bind showPopupOnload to Terra.init so consumers can re-init as needed and scope to a parent container
  // Set up click delgates for other popup actions
  // Set up event listeners to hide popups in content areas that can be toggled
  $(document)
    .on('Terra.init Terra.hover.popup.show', hoverHandler)
    .on('click.terra.popup.show', '[data-popup="click"]', showHandler)
    .on('click.terra.popup.hide', '[data-popup-close]', {trigger: 'popup-button'}, hideHandler)
    .on('Terra.tabClick', {trigger: 'tab-button'}, hideHandler)
    .on('Terra.toggler.hidden Terra.contentPanelToggled',  {trigger: 'content-toggler'}, hideHandler)
    //html selector prevents issue when clicking on body margins
    .on('click.terra.popup.hide', 'html', {trigger: 'auto-close'}, hideHandler)
    .on('terra.modal.close', {trigger: 'modal-close'}, hideHandler);
}(jQuery, Terra));

/* exported Terra.SlidePanel */

// Slide Panel API
// --------------------------------------------------

(function ($, Terra, undefined) {
  /**
   * Checks if the current slider behavior is set to "split".
   * @return {Boolean} True if the slider is using split behavior.
   */
  function isSplitBehavior() {
    return this.$container.data('slide-panel-behavior') === 'split';
  }

  /**
   * Check if the screen is large enough to show both the master and detail.
   * @return {Boolean} True if the screen is large enough.
   */
  function isLargeScreen() {
    var mediaQueryName = Terra.getMediaQueryName();
    if (mediaQueryName === undefined) {
      return false;
    }
    // 'xxs' and 'xs' are considered as small screen.
    // This is used to determine the behavior of the split slider.
    return (['xxs', 'xs'].indexOf(mediaQueryName) === -1);
  }

  /**
   * Helper to toggle aria state for the detail container.
   * @return {Boolean} True if the state was changed or untouched, false if the state cannot be changed.
   */
  function toggleDetailsAccessibility(hidden) {
    if (isLargeScreen.call(this)) {
      if (isSplitBehavior.call(this)) {
        // The state of the aria attribute should not be changed for split behavior on large screens.
        return false;
      } else {
        // The state of the aria attribute for the detail container should not be changed for non-split behavior
        // on large screens but return true so that the aria attribute for the master container can be updated.
        return true;
      }
    } else {
      // On small screens details visibility needs to be toggled for screen readers.
      this.$detail.attr('aria-hidden', hidden.toString());
    }
    return true;
  }

  /**
   * Updates the aria labels of the split panel based on its
   * current state.
   */
  function updateAriaAttributes() {
    if (isLargeScreen.call(this)) {
      if (isSplitBehavior.call(this)) {
        // If the screen is large for the split behavior, then the master and detail are forced to be visible.
        // It doesn't matter if the master is flagged as open or closed.
        this.$master.attr('aria-hidden', false);
      } else {
        if (this.isOpen()) {
          this.$master.attr('aria-hidden', false);
        } else {
          this.$master.attr('aria-hidden', true);
        }
      }
      this.$detail.attr('aria-hidden', false);
    } else {
      if (this.isOpen()) {
        this.$master.attr('aria-hidden', false);
        this.$detail.attr('aria-hidden', true);
      } else {
        this.$master.attr('aria-hidden', true);
        this.$detail.attr('aria-hidden', false);
      }
    }
  }

  /**
   * Initializes a SlidePanelAPI.
   * This should be called with "new". (e.g. var myPanel = new SlidePanelAPI)
   * @chainable
   */
  var SlidePanelAPI = function($slidePanelContainer) {
    this.$container = $slidePanelContainer;
    this.$master = this.$container.children('.slide-panel-master');
    this.$detail = this.$container.children('.slide-panel-detail');
    return this;
  };

  /**
   * Determines if the slide panel is open or closed.
   * @return {Boolean} True if the panel is open, false if its closed.
   */
  SlidePanelAPI.prototype.isOpen = function() {
    return this.$container.hasClass('slide-panel-open');
  };

  /**
   * Shows the slide panel.
   * @chainable
   */
  SlidePanelAPI.prototype.open = function() {
    if (!toggleDetailsAccessibility.call(this, true)) {
      // Opening the panel cannot be done when using split behavior on large screens.
      return this;
    }
    this.$master.attr('aria-hidden', 'false');
    this.$container
      .addClass('slide-panel-open')
      .trigger('Terra.slidePanelOpened');
    return this;
  };

  /**
   * Hides the slide panel.
   * @chainable
   */
  SlidePanelAPI.prototype.close = function() {
    if (!toggleDetailsAccessibility.call(this, false)) {
      // Closing the panel cannot be done when using split behavior on large screens.
      return this;
    }
    this.$master.attr('aria-hidden', 'true');
    this.$container
      .removeClass('slide-panel-open')
      .trigger('Terra.slidePanelClosed');
    return this;
  };

  /**
   * Opens the panel if it was closed.
   * Closes the panel if it was open.
   * @chainable
   */
  SlidePanelAPI.prototype.toggle = function() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
    return this;
  };

  // Public API
  // --------------------------------------------------

  /**
   * Creates and returns a new SlidePanelAPI.
   * @param {String} A selector refering to the slide panel container.
   */
  Terra.SlidePanel = function (selector) {
    return new SlidePanelAPI($(selector));
  };

  // Slide Panel Initialization
  // --------------------------------------------------

  function slidePanelToggle() {
    Terra.SlidePanel($(this).data('slide-panel-target')).toggle();
  }

  /**
   * Changes the accessibility attributes of all master/details.
   * On larger screen sizes, the aria attributes must be set so screen readers can read both
   * master and detail since they are both visible.
   * On smaller screens, only one of them (the master or detail) is shown, so the aria attributes
   * must be updated accordingly.
   */
  var splitBehaviorEnabled    = false,
      pushBehaviorEnabled     = false,
      overlayBehaviorEnabled  = false,
      squishBehaviorEnabled   = false,
      splitBehaviorSelector   = buildBehaviorSelector('split'),
      pushBehaviorSelector    = buildBehaviorSelector('push'),
      overlayBehaviorSelector = buildBehaviorSelector('overlay'),
      squishBehaviorSelector  = buildBehaviorSelector('squish');

  function buildBehaviorSelector(behavior) {
    return 'body[data-slide-panel-behavior="' + behavior + '"], ' +
           'div[data-slide-panel-behavior="' + behavior + '"], ' +
           'main[data-slide-panel-behavior="' + behavior + '"]';
  }

  function updateSliderAccessibility() {
    updateAriaAttributesForBehavior(splitBehaviorEnabled, splitBehaviorSelector);
    updateAriaAttributesForBehavior(pushBehaviorEnabled, pushBehaviorSelector);
    updateAriaAttributesForBehavior(overlayBehaviorEnabled, overlayBehaviorSelector);
    updateAriaAttributesForBehavior(squishBehaviorEnabled, squishBehaviorSelector);
  }

  function updateAriaAttributesForBehavior(behaviorEnabled, behaviorSelector) {
    if (behaviorEnabled) {
      $(behaviorSelector).each(function() {
        updateAriaAttributes.call(new SlidePanelAPI($(this)));
      });
    }
  }

  function initSliderAccessibility() {
    splitBehaviorEnabled   = $(splitBehaviorSelector).length > 0;
    pushBehaviorEnabled    = $(pushBehaviorSelector).length > 0;
    overlayBehaviorEnabled = $(overlayBehaviorSelector).length > 0;
    squishBehaviorEnabled  = $(squishBehaviorSelector).length > 0;
    updateSliderAccessibility(); // Update for accessibility.
  }

  // If touch events are supported on the device, use them instead of click events
  // This prevents a issue where tapping on the butttons to toggle the slide panel
  // state would lag and require extra taps to work correctly
  var toggleEvent;
  if ('ontouchstart' in document.documentElement) {
    toggleEvent = 'touchstart.terra.slidePanel';
  } else {
    toggleEvent = 'click.terra.slidePanel';
  }

  $(document)
    .on('Terra.init', initSliderAccessibility)
    .on(toggleEvent, '[data-slide-panel-target]', slidePanelToggle);
  $(window).on('Terra.resizeEnd', updateSliderAccessibility);
}(jQuery, Terra));


(function ($, Terra) {
  // Truncates the long text with a show more link if it exceeds the given truncate limit
  function truncateLongText(e) {
    $(e.target).find('[data-truncate-limit]:not([aria-live])').each(function() {
      var $this     = $(this),
          truncateLimit = $this.data('truncate-limit'),
          content   = $this.text().trim(),
          $replacableElement = $('<div></div>');

      if(content.length > truncateLimit) {
        // Bind a copy of the original markup to the element,
        // so it can be used once the truncated text is expanded.
        // This allows each element to uniquely have its own markup bound to it, keeping things simple.
        $this.data('originalHTML', $this.html());

        var shortText,
            moreLabel = $this.data('more-label') || Terra._i18n('Terra/truncateText/showMore', 'Show more'),
            html;

        shortText = content.substr(0, Math.min(truncateLimit,
          content.substr(0, truncateLimit).lastIndexOf(' '))) + '...';
        html = '<span class="muted-placeholder" aria-hidden="true" data-original-html=" ' + $this.text() + ' " '+
                'data-element-to-change=" ' + $replacableElement + ' " data-short-text=" ' + shortText + ' "></span>'+
                '<button class="btn btn-link truncate-trigger" aria-expanded="false">' + moreLabel + '</button>';

        $replacableElement.html(shortText);
        $this.html($replacableElement);
        $this.append(html);
        $this.data('elementToChange', $replacableElement);
        $this.data('truncatedText', shortText);
        $this.attr('aria-live', 'polite'); // Added for accessibility when the truncation gets triggered.
      }
    });
  }

  // Toggles to display/hide text and more/less link
  function toggleTruncation() {
    var $this           = $(this),
        $placeholderSpanElement = $this.closest('[data-truncate-limit]').find('.muted-placeholder'),
        $truncatableDiv = $this.closest('[data-truncate-limit]');

    // While toggling between Show more/less link, check if data attribute defined at container 
    // level (element with class "data-truncate-limit")is accessible. 
    // Incase yes, then read data from it else traverse to placeholder element 
    // and get required data attribute as a fallback.

    if($this.attr('aria-expanded') === 'true') {
      $this.attr('aria-expanded', 'false');
      if ($truncatableDiv.data('elementToChange') !== undefined) {
        $truncatableDiv.data('elementToChange').html($truncatableDiv.data('truncatedText'));
      } else {
        $truncatableDiv.find('>div').html($placeholderSpanElement.data('short-text'));
      }
      $this.html($truncatableDiv.data('more-label') || Terra._i18n('Terra/truncateText/showMore', 'Show more'));
    } else {
      $this.attr('aria-expanded', 'true');
      if ($truncatableDiv.data('elementToChange') !== undefined) {
        $truncatableDiv.data('elementToChange').html($truncatableDiv.data('originalHTML'));
      } else {
        $truncatableDiv.find('>div').html($placeholderSpanElement.data('original-html'));
      }
      $this.html($truncatableDiv.data('less-label') || Terra._i18n('Terra/truncateText/showLess', 'Show less'));
    }

    return false;
  }

  $(document)
    .on('Terra.init', truncateLongText)
    .on('click', '[data-truncate-limit] .truncate-trigger', toggleTruncation);
}(jQuery, Terra));

//# sourceMappingURL=terra.js.map