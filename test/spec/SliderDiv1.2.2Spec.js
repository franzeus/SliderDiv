describe("SliderDiv1.2.2", function() {
  
    // Setup
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = "fixtures";
        loadStyleFixtures('sliderFixture.css');
        loadFixtures('sliderFixture.html');
    });    

    // ---------------------------------------------------

    describe("when SliderDiv has been initialized", function() {

        it("should overwrite custom params", function() {

            var customParams = {
                containerSelector : "#testContainer",
                slideWrapperSelector : "#testWrapperSelector",
                activeItemClass : ".activeTestClass",
                hasKeyEvents : true
            };

            var slider = new SliderDiv(customParams);

            expect(slider.settings.containerSelector).toEqual(customParams.containerSelector);
            expect(slider.settings.slideWrapperSelector).toEqual(customParams.slideWrapperSelector);
            expect(slider.settings.activeItemClass).toEqual(customParams.activeItemClass);
            expect(slider.settings.hasKeyEvents).toEqual(customParams.hasKeyEvents);

        });

        it("should setup slider correctly", function() {
            
            var slider = new SliderDiv(),
                viewPortWidth = 400;

            // Container
            expect(slider.container).toHaveCss({ width : viewPortWidth + "px", overflow : "hidden" });
            
            // Slider-Wrapper
            expect(slider.viewport).toHaveCss({ width : (viewPortWidth * 3) + "px"});

            // Should attach event on slide-Buttons
            expect(slider.nextButton).toHandle("click");
            expect(slider.prevButton).toHandle("click");

            // Should append Items
            expect(slider.itemUl).toContain('li');
            expect(slider.itemUl.find('li').length).toEqual(3);

        });

    });

    // ---------------------------------------------------

    describe("when SliderDiv moves slide", function() {

        var slider = new SliderDiv(),
            viewPortWidth = 400;

        // ------------------------------------------------------
        // MOVE METHODS

        it("should increase currentSlideIndex", function() {

            runs(function() {
                slider.next();
            });

            waitsFor(function() {
                return slider.currentSlideIndex;
            }, "The currentSlideIndex should be incremented", 1000);
            
            runs(function() {
                expect(slider.currentSlideIndex).toBeGreaterThan(0);
            });

        });

        it("should move on calling moveTo() method", function() {
            var slider = new SliderDiv(),
                index = 2;

            runs(function() {
                expect(slider.currentSlideIndex).toEqual(0);
                slider.moveTo(2);
            });

            waitsFor(function() {
                return slider;
            }, "The currentSlideIndex should be incrementedby 2", 2500);
            
            runs(function() {
                expect(slider.currentSlideIndex).toEqual(2);
                //expect(slider.viewport).toHaveCss({ left : -(viewPortWidth * (index+1)) + "px"});
            });
            
        });

        it("should move to next slide on calling next() method", function() {
            
            var slider = new SliderDiv();

            runs(function() {
                expect(slider.currentSlideIndex).toEqual(0);
                slider.next();
            });

            waitsFor(function() {
                return slider;
            }, "The currentSlideIndex should be incremented by 1", 1500);
            
            runs(function() {
                expect(slider.currentSlideIndex).toEqual(1);
            });

        });

        it("should move to previous slide on calling prev() method", function() {
            
            var slider = new SliderDiv();

            runs(function() {
                expect(slider.currentSlideIndex).toEqual(0);
                slider.next();
                slider.prev();
            });

            waitsFor(function() {
                return slider;
            }, "The currentSlideIndex should be decreased by 1", 1500);
            
            runs(function() {
                expect(slider.currentSlideIndex).toEqual(0);
            });

        });

        it("should not move to previous slide on calling prev() method", function() {
            
            var slider = new SliderDiv();

            runs(function() {
                expect(slider.currentSlideIndex).toEqual(0);
                slider.prev();
            });

            waitsFor(function() {
                return slider;
            }, "The currentSlideIndex should not be changed", 1500);
            
            runs(function() {
                expect(slider.currentSlideIndex).toEqual(0);
            });

        });

        // ------------------------------------------------------
        // PREV + NEXT BUTTONS

        it("should hide prev button and show next button on first slide", function() {
            var slider = new SliderDiv();
            
            expect(slider.nextButton).toBeVisible();
            expect(slider.prevButton).toBeHidden();

        });

        it("should show prev and next button on second slide", function() {
            var slider = new SliderDiv();

            runs(function() {
                expect(slider.currentSlideIndex).toEqual(0);
                slider.next();
            });

            waitsFor(function() {
                return slider;
            }, "The slider should move next", 1500);
            
            runs(function() {
                expect(slider.nextButton).toBeVisible();
                expect(slider.prevButton).toBeVisible();
            });
           
        });

        it("should show prev and hide next button on last slide", function() {
            var slider = new SliderDiv();

            runs(function() {
                expect(slider.currentSlideIndex).toEqual(0);
                slider.moveTo(2);
            });

            waitsFor(function() {
                return slider;
            }, "The slider should move next", 1500);
            
            runs(function() {
                expect(slider.nextButton).toBeHidden();
                expect(slider.prevButton).toBeVisible();
            });
        });

        // ------------------------------------------------------
        // ITEMS
    
        it("should highlight corresponding item", function() {
            var slider = new SliderDiv();

            runs(function() {
                expect(slider.currentSlideIndex).toEqual(0);
                slider.moveTo(1);
            });

            waitsFor(function() {
                return slider;
            }, "The slider should move to index 1", 1500);
            
            runs(function() {
                expect(slider.itemUl.find('li').eq(0)).not.toHaveClass("active-item");
                expect(slider.itemUl.find('li').eq(1)).toHaveClass("active-item");
                expect(slider.itemUl.find('li').eq(2)).not.toHaveClass("active-item");
            });
        });

    });

    // ---------------------------------------------------

    it("should reset specific params", function() {

        var slider = new SliderDiv();

        slider.currentSlideIndex = 14;
        slider.doPlay = true;

        slider.reset();

        expect(slider.currentSlideIndex).toEqual(0);
        expect(slider.doPlay).toEqual(false);

    });
});