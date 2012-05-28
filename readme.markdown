###Description###

A tiny and simple to use content slider.

###How to use###
This is the entire html you need for three slides:

```html
<div id="slide-container">
    
  <div class="slide-wrapper">
    <!-- Slide one -->
    <div class="slide">1</div>

    <!-- Slide two -->
    <div class="slide">2</div>

    <!-- Slide two -->
    <div class="slide">3</div>
  </div>

  <!-- Next and Prev Buttons -->
  <input type="button" class="prevButton" value="Prev" >
  <input type="button" class="nextButton" value="Next" >
</div>
```

Some css is also necessary. The only thing you have to change is the width of the slider container.
```css
 #slide-container {
      width:400px;
      overflow:hidden;
      height:auto;
    }

.slide-wrapper {
  overflow:hidden;
  height:auto;
  position:relative;
}

.slide {
  position:relative;
  float:left;      
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
  nextButtonSelector: '.nextButton',
  previousButtonSelector: '.prevButton',
  hasKeyEvents: true,
  moveSpeed: 500
});
```

####Auto-Play####

You can auto play the slideshow by calling the *autoPlay()* Methode.

```javascript
// Takes time in miliseconds as param
// Default is 5 seconds
slider.autoPlay(5000);
```

####AfterMove####

If you want to call code after a slide has moved, you can overwrite the *afterMove()* Method:

```javascript
slider.afterMove = function() {
  // do s.t. here
};
```