<script type="text/javascript" src="divSlider.js"></script>
<script type="text/javascript">
  var slider = new SliderDiv();
</script>

# With options:
var slider = new SliderDiv({
  containerSelector: '#slide-container',
  slideWrapperSelector: '.slide-wrapper',
  slideSelector: '.slide',
  nextButtonSelector: '.nextButton',
  previousButtonSelector: '.prevButton',
  hasKeyEvents: true,
  moveSpeed: 500
});

