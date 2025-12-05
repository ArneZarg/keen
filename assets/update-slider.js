(function () {
  function swiperInit(section) {
    if (!section) return;
    subSliderInit(section);
    sliderInit(section);
    popupSliderInit(section);
  }

  function swiperUpdate(section) {
    if (!section) return;

    section.querySelectorAll(".js-media-list").forEach((element) => {
      element.swiper?.destroy();
    });
    section.querySelectorAll(".js-media-sublist").forEach((element) => {
      element.swiper?.destroy();
    });
    section.querySelectorAll(".js-popup-slider").forEach((element) => {
      element.swiper?.destroy();
    });

    subSliderInit(section);
    sliderInit(section);
    popupSliderInit(section);
  }

  function observeSectionResize(section) {
    if (!section) return;

    const onResize = () => {
      swiperUpdate(section);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }

  document.addEventListener("shopify:section:load", function (e) {
    swiperInit(e.target);
    observeSectionResize(e.target);
  });

  swiperInit(document.currentScript?.parentElement);
  observeSectionResize(document.currentScript?.parentElement);
})();
