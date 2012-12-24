!(function ($) {
  $.domReady(function () {
    if (!$.support) $.support = {}

    $.support.transition = (function () {
      var transitionEnd = (function () {
        var el = document.createElement('ender')
          , transEndEventNames = {
                'WebkitTransition' : 'webkitTransitionEnd'
              , 'MozTransition'    : 'transitionend'
              , 'OTransition'      : 'oTransitionEnd otransitionend'
              , 'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames)
          if (el.style[name] !== undefined)
            return transEndEventNames[name]
      }())

      return transitionEnd && {
        end: transitionEnd
      }
    })()
  })
}(ender))