/*
  SliderDiv --v.1.2.2
  Author: weberdevelopment.de
  https://github.com/webarbeit/SliderDiv
*/
var SliderDiv = function(_options) {

  // Default params
  var defaults = {

    containerSelector : '#slide-container',

    slideWrapperSelector : '.slide-wrapper',

    slideSelector : '.slide',

    nextButtonSelector : '.nextButton',
  
    previousButtonSelector : '.prevButton',

    itemListSelector : '#itemList',

    itemListElementClass : "slide-item",

    activeItemClass : 'active-item',

    hasKeyEvents : false,

    moveSpeed : 500
  }
  
  // Merge default settings with arguments
  this.settings = jQuery.extend({}, defaults, _options);

  this.container = jQuery(this.settings.containerSelector);
  
  this.viewport = this.container.find(this.settings.slideWrapperSelector);
  this.slideObjects = this.viewport.find(this.settings.slideSelector);

  this.itemUl = jQuery(this.settings.itemListSelector);
  this.itemListElementClass = this.settings.itemListElementClass;
  this.activeItemClass = this.settings.activeItemClass;

  this.nextButton = jQuery(this.settings.nextButtonSelector);
  this.prevButton = jQuery(this.settings.previousButtonSelector);

  this.MOVE_SPEED = this.settings.moveSpeed;
  this.HAS_KEY_EVENTS = this.settings.hasKeyEvents;
  
  this.init();
};

/**
* Initilize the SliderDiv object
*/
SliderDiv.prototype.init = function() {

  this.reset();

  // Set Styles
  this.container.css({ "overflow" : "hidden" });
  
  // Adapt size of viewport
  var vp = this.container.width() * this.slideObjects.length;
  this.viewport.css({ 

    width :  vp + 'px', 
    overflow : 'overlay', 
    clear : 'both',
    position : "relative"

  });
  
  this.slideObjects.css({ 

    width: this.container.width() + 'px',
    "position" : "relative",
    "float" : "left"

  });

  this.buildItems();

  // Events
  if (this.nextButton)
    this.nextButton.click(jQuery.proxy(this.next, this));
  if (this.prevButton)
    this.prevButton.click(jQuery.proxy(this.prev, this));

  if (this.HAS_KEY_EVENTS)
    jQuery(document).keydown(jQuery.proxy(this.keyEvent, this));
  
  return this;

};

/**
* Resets the slider
*/
SliderDiv.prototype.reset = function() {

  this.currentSlideIndex = 0;
  this.handleButtonVisibility();
  this.autoTimeout = null;
  this.doPlay = false;
  this.autoMoveTime = 5000;

  this.countSlides = this.slideObjects.length;

  return this;

};

/**
* Creates the item list
* Each item list represents a slide
*/
SliderDiv.prototype.buildItems = function() {

  var self = this;

  if ( !this.itemUl.length || this.countSlides === 0 ) return false;

  this.slideObjects.each(function(k, v) {

    self.itemUl.append('<li class="' + self.itemListElementClass + '"></li>');

  });

  // Bind event
  this.itemUl.find("li").bind("click", function() {

    self.moveTo( jQuery(this).index() );

  });

  this.highLightItem();

};

/**
* Moves to the next slide
*/
SliderDiv.prototype.next = function(e) {

  if (this.currentSlideIndex === this.slideObjects.length - 1) return false;
  
  this.currentSlideIndex++;
  this.move(1);

  return this;

};

/**
* Moves to the previous slide
*/
SliderDiv.prototype.prev = function(e) {

  if (this.currentSlideIndex === 0) return false;
  
  this.currentSlideIndex--;
  this.move(-1);

  return this;

};

/**
* Moves automatically the slides each _moveTime milliseconds
* @param int _moveTime The time in milliseconds
*/
SliderDiv.prototype.autoPlay = function( _moveTime ) {
  
  this.autoMoveTime = _moveTime || this.autoMoveTime;

  var self = this;
  
  this.autoTimeout = setInterval(function() {

    self.play(); 

  }, this.autoMoveTime);

  return this;
};

/**
* Moves to the next or when the slideshow is over to the first slide
*/
SliderDiv.prototype.play = function() {

  if (this.currentSlideIndex === this.countSlides - 1)
    this.moveTo(0);
  else
    this.next();

  return this;
};

/**
* Stops autoPlay
*/
SliderDiv.prototype.stopPlay = function() {

  clearTimeout(this.autoTimeout);
  return this;

};

/**
* Moves to a slide
* @param int _direction Forward or backwards
* @param int _distance The distance in pixel between the current slide and the requested slide
* @return this
*/
SliderDiv.prototype.move = function( _direction, _distance ) {

  this.handleButtonVisibility();

  this.highLightItem();

  // Move
  var distance = _distance ? _distance : this.container.width(),
      to = _direction < 0 ? '+=' : '-=',
      self = this;
      
  // Animation
  this.viewport.animate({

    left: to + distance

  }, this.MOVE_SPEED, function() {

    self.afterMove();

  });

  return this;
};

/**
* Moves to a slide by index
* @param int index The index of the set of slide-divs it should slide to
* @return this
*/
SliderDiv.prototype.moveTo = function( _index ) {

  var index = _index;
  if (jQuery("input, textarea").is(":focus")) return false;
  
  if(index === this.currentSlideIndex) {
    return false;
  } else if (index < 0) {
    index = 0;  
  } else if (index >= this.countSlides) {
    index = this.countSlides - 1;
  }
  
  // Direction
  var currentLeft = this.slideObjects.eq(this.currentSlideIndex).offset().left,
      nextLeft = this.slideObjects.eq(index).offset().left,
      direction = currentLeft > nextLeft ? -1 : 1,
      // Distance
      distance = this.container.width() * Math.abs(this.currentSlideIndex - index);

  // I like to move it move it
  this.currentSlideIndex = index;
  this.move(direction, distance);

  return this;
};

/**
* Will be called after sliding
*/
SliderDiv.prototype.afterMove = function() {

  return true;

};

/**
* Highlights the current item
*/
SliderDiv.prototype.highLightItem = function() {

  if ( !this.itemUl.length ) return false;

  var items = this.itemUl.find("li");

  items.removeClass(this.activeItemClass);

  items.eq(this.currentSlideIndex).addClass(this.activeItemClass);

};

/**
* Handles the visibility of the prev + next buttons
* First slide hides prev-button. Last slide hides next-button.
*/
SliderDiv.prototype.handleButtonVisibility = function() {
  
  this.nextButton.show();
  this.prevButton.show();
  
  if (this.currentSlideIndex === this.slideObjects.length - 1)            
    this.nextButton.hide();
  
  if (this.currentSlideIndex === 0)            
    this.prevButton.hide();

};

/**
* Get the height of the current slide-div
* @param int _index The index of the current slide in the set of slide-divs
*/
SliderDiv.prototype.getViewportHeight = function( _index ) {

  var hiddenFields = this.slideObjects.eq(_index).find(':hidden').show(),
      newH = this.slideObjects.eq(_index).height();
  
  hiddenFields.hide();
  
  return newH;

};

/**
* Handles key events
*/
SliderDiv.prototype.keyEvent = function(e) {

  if ( !this.HAS_KEY_EVENTS ) return false;
  
  switch(e.keyCode) {

    case(39): this.next(); break;

    case(37): this.prev(); break;

  }

};