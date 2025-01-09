(function($) {
  $.fn.timeline = function(offset = 100) { // Default offset value of 100px
    const selectors = {
      id: $(this),
      item: $(this).find(".timeline-item"),
      activeClass: "timeline-item--active",
      img: ".timeline__img"
    };

    // Set the first timeline item as active and set initial background image
    selectors.item.first().addClass(selectors.activeClass);
    selectors.id.css("background-image", `url(${selectors.item.first().find(selectors.img).attr("src")})`);

    const itemLength = selectors.item.length;

    $(window).on('scroll', function() {
      const pos = $(this).scrollTop();

      selectors.item.each(function(i) {
        const $this = $(this);
        const min = $this.offset().top - offset; // Adjust with offset
        const max = min + $this.height();

        if (i === itemLength - 2 && pos > min + $this.height() / 2) {
          selectors.item.removeClass(selectors.activeClass);
          selectors.id.css("background-image", `url(${selectors.item.last().find(selectors.img).attr("src")})`);
          selectors.item.last().addClass(selectors.activeClass);
        } else if (pos >= min && pos <= max - 40) {
          selectors.id.css("background-image", `url(${$this.find(selectors.img).attr("src")})`);
          selectors.item.removeClass(selectors.activeClass);
          $this.addClass(selectors.activeClass);
        }
      });
    });
  };
})(jQuery);

$("#timeline-1").timeline(150); // Example usage with 150px offset
