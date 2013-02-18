describe("SliderDiv1.2.2", function() {
  
    // Setup
    beforeEach(function() {

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