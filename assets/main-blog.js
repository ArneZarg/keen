(function () {
  const initSlider = (section) => {
    if (!section || !section?.classList.contains("section-main-blog")) return;

    const slider = section.querySelector(".main-blog__slider");

    if (slider) {
      const pagination = section.querySelector(".main-blog__slider-pagination");

      let swiperParams = {
        loop: true,
        speed: 800,
        pagination: {
          el: pagination,
          type: "bullets",
          clickable: true,
        },
      };

      if (slider.getAttribute("data-autoplay") === "true") {
        swiperParams.autoplay = {
          disableOnInteraction: true,
        };
      }

      const changeColorScheme = (swiper) => {
        const activeIndex = swiper.activeIndex;
        const activeSlide = swiper.slides[activeIndex];
        const colorScheme = activeSlide.dataset.colorScheme;

        const changeItems = [swiper.pagination.el];

        changeItems.forEach((item) => {
          if (item) {
            let classNames = item.getAttribute("class");
            classNames = classNames.replace(/color-background-\d+/g, "");
            item.setAttribute("class", classNames);
            item.classList.add(colorScheme);
          }
        });
      };

      const featuredPostsSwiper = new Swiper(slider, swiperParams);

      changeColorScheme(featuredPostsSwiper);
      featuredPostsSwiper.on("beforeTransitionStart", function () {
        changeColorScheme(featuredPostsSwiper);
      });
    }
  };

  initSlider(document.currentScript.parentElement);

  document.addEventListener("shopify:section:load", function (event) {
    initSlider(event.target);
  });
})();
