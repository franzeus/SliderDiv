# HTML
<div id="slide-container">
  <div class="slide-title"></div>
    
  <div class="slide-wrapper">
    <div class="slide">1</div>
    <div class="slide">2</div>
    <div class="slide">3</div>
  </div>

  <div class="slide-footer"><input type="button" class="prevButton" value="Prev" ><input type="button" class="nextButton" value="Next" ></div>  
</div>

<script type="text/javascript" src="divSlider.js"></script>
<script type="text/javascript">
  var slider = new SliderDiv();
</script>

# CSS
/* --- Slider --- */
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
  background:#CCC;
  position:relative;
  float:left;
  min-height:100px;
}

.slide-footer{
  overflow:hidden;
  clear: both;
  margin-top:1em;
  padding-top:.5em;
  border-top:1px solid #4775C4;
}

.slide-title {}