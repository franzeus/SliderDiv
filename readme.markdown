###Description###

A tiny and simple to use content slider (based on JQuery).

###How to use###
This is the entire html you need for three slides:

```html
<div id="slide-container">
    
  <div class="slide-wrapper">
    <!-- Slide one -->
    <div class="slide">Content 1</div>

    <!-- Slide two -->
    <div class="slide">Content 2</div>

    <!-- Slide two -->
    <div class="slide">Content 3</div>
  </div>

  <!-- Optional: Next and Prev Buttons -->
  <input type="button" class="prevButton" value="Prev" >
  <input type="button" class="nextButton" value="Next" >

  <!-- Optional: list of li-Elements, which each represent a slide -->
  <ul id="itemList"></ul>
</div>
```

The only thing you have to set is the width of the slider container.
Thus you can decided the width of the viewport.
```css
 #slide-container {
  width:400px;
}
```

Include the library and init the slider like this
:
```html
<script type="text/javascript" src="sliderdiv.js"></script>
<script type="text/javascript">
  // After page load
  var slider = new SliderDiv();
</script>
```

###Options###

```javascript
var slider = new SliderDiv({
  containerSelector: '#slide-container',
  slideWrapperSelector: '.slide-wrapper',
  slideSelector: '.slide',
  itemListSelector : null, // Set the id of a ul element (i.e. #itemList)
  nextButtonSelector: '.nextButton',
  previousButtonSelector: '.prevButton',
  hasKeyEvents: true,
  moveSpeed: 500
});
```
###Methods###

####Move####

To slide to a certain slide you can call the *moveTo()* method. It takes the zero-based index of the slide as param.

```javascript
// Will slide to the third slide-page
slider.moveTo(2)
```

To slide to the next or previous slide, you can call:

```javascript
slider.next();
slider.prev();
```

####Auto-Play####

You can auto play the slideshow by calling the *autoPlay()* Methode.

```javascript
// Takes time in miliseconds as param
// Default is 5 seconds
slider.autoPlay(3000);
```

####AfterMove####

If you want to call code after a slide has moved, you can overwrite the *afterMove()* Method:

```javascript
slider.afterMove = function() {
  // do s.t. here
};
```

####KeyEvents####

If the option *hasKeyEvents* is set to true, you can navigate by using the left and right arrow keys.

```javascript
var slider = new SliderDiv({
  hasKeyEvents: true,
});
```

####Current Slide index####
To get the index of the current slide, you can access *currentSlide* attribute.
The first slide has an index of 0.

```javascript
slider.currentSlide;
```