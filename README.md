# ender-transition-support

A simple feature-detect for Ender to make `$.support.transition` available in browsers. Where CSS transitions are supported, it will contain an object with an `'end'` property which will identify the current browser's equivalent of the `'transitionEnd'` event. Where CSS transitions are not supported, `$.support.transition` will be `null`.

Also adds a convenience `onTransitionEnd()` method to your Ender collections (see bottom example).

Add to your ender build with:

```sh
$ ender add ender-transition-support
```

## Example

### CSS

```css
.foo {
  height: 200px;
  width: 200px;
  transition: opacity ease 1.5s;
  -ms-transition: opacity ease 1.5s;
  -webkit-transition: opacity ease 1.5s;
  opacity: 0;
  background-color: red;
}
.foo.shown {
  opacity: 1;
}
```

### HTML

```html
<button>show</button>
<div class="foo"></div>
```

### JavaScript

```js
var $button = $('button')
  , $div    = $('div')

$button.on('click', function () {
  var post
  if ($button.text() == 'show') {
    $div.show()[0].offsetHeight // trigger DOM reflow
    $div.addClass('shown')
    $button[0].disabled = true
    post = function () {
      $button[0].disabled = false
      $button.text('hide')
    }
    if ($.support.transition)
      $div.one($.support.transition.end, post)
    else
      post()
  } else {
    $div.removeClass('shown')
    $button[0].disabled = true
    post = function () {
      $div.hide()
      $button.text('show')
      $button[0].disabled = false
    }
    if ($.support.transition)
      $div.one($.support.transition.end, post)
    else
      post()
  }
})
```

*This example is available in the file example.html in the repository if you want to play with it.*

Note how you can use a check for `$.support.transition` to allow for browsers with and without transition support. Also note the use of `one()` rather than `on()`, you don't want to leave your event handlers laying around if you don't need to reuse them!

## `onTransitionEnd()`

The `onTransitionEnd()` method is simply a wrapper around the above pattern where you provide a callback function that is either triggered on the `'transitionEnd'` event or is called directly if transition events aren't supported. Using it we can trim down our example `'click'` handler to the following:

```js
$button.on('click', function () {
  if ($button.text() == 'show') {
    $div.show()[0].offsetHeight // force reflow
    $div.addClass('shown')
    $button[0].disabled = true
    $div.onTransitionEnd(function () {
      $button[0].disabled = false
      $button.text('hide')
    })
  } else {
    $div.removeClass('shown')
    $button[0].disabled = true
    $div.onTransitionEnd(function () {
      $div.hide()
      $button.text('show')
      $button[0].disabled = false
    })
  }
})
```

## Credits

Credit for the feature-detect goes to the [Modernizr](http://modernizr.com/) team, I lifted the code from [Bootstrap](https://github.com/twitter/bootstrap/blob/master/js/bootstrap-transition.js).

## Licence

Licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
