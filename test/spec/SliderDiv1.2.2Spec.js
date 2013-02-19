describe("SliderDiv1.2.2", function() {
  
    // Setup
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = "fixtures";
        loadStyleFixtures('sliderFixture.css');
        loadFixtures('sliderFixture.html');
    });    

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

    describe("when SliderDiv moves slide", function() {

        var slider = new SliderDiv(),
            viewPortWidth = 400;

        it("should move on calling moveTo() method", function() {

            var index = 1;

            slider.moveTo(index);
            slider.afterMove = function() {
                expect(slider.viewport).toHaveCss({ left : -(viewPortWidth * index) + "px"});
            }

            index = 2;
            slider.moveTo(index);
            slider.afterMove = function() {
                expect(slider.viewport).toHaveCss({ left : -(viewPortWidth * index) + "px"});
            }
        });

        it("should hide prev button and show next button on first slide", function() {
            slider.moveTo(0);
            
            slider.afterMove = function() {
                expect(slider.nextButton).toBeVisible();
                expect(slider.prevButton).toBeHidden();
            }
        });

        it("should show prev and next button on second slide", function() {
            slider.next();

            slider.afterMove = function() {
                expect(slider.nextButton).toBeVisible();
                expect(slider.prevButton).toBeVisible();
            };
        });

        it("should show prev and hide next button on last slide", function() {
            slider.moveTo(2);

            slider.afterMove = function() {
                expect(slider.nextButton).toBeHidden();
                expect(slider.prevButton).toBeVisible();
            }
        })

    });

    it("should reset specific params", function() {

        var slider = new SliderDiv();

        slider.currentSlideIndex = 14;
        slider.doPlay = true;

        slider.reset();

        expect(slider.currentSlideIndex).toEqual(0);
        expect(slider.doPlay).toEqual(false);

    });
});