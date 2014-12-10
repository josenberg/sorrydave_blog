
$(function() {


  /** reponsive videos **/
  $(".post-cover, .post-content").fitVids();

  $(".posts .post-cover").each(function() {

    var available = false;
    var image = false;
    // image cover
    var $cover = $("img", $(this));
    if($cover && $cover.length == 1) {
      $(this).html(
              "<img src='" + $cover.attr("src") + "' />" +
                  "<a href='" + $(this).data("url") + "'></a>").removeClass("hide");
      image = true;
      available = true;
    }

    // video cover
    var $videoCover = $(".fluid-width-video-wrapper", $(this));
    if($videoCover && $videoCover.length == 1) {
      $(this).removeClass("hide");
      available = true;
    }

    // soundcloud cover
    var $iframeCover = $("iframe[src*='soundcloud.com']", $(this));
    if($iframeCover && $iframeCover.length == 1) {
      $(this).removeClass("hide");
      available = true;
    }

    // blog cover image
    var blogCoverImage = $(this).data("image");
    if(blogCoverImage && !available) {
      $(this).html("<img src='" + blogCoverImage + "' />");
      $(this).removeClass("hide");
    }

    if(!image) {
      $(this).closest("article").removeClass("non-visible").addClass("animated fadeIn");
    } else {
      var $that = $(this);
      $that.imagesLoaded(function() {
        $that.closest("article").removeClass("non-visible").addClass("animated fadeIn");
        console.log($that);
      });
    }
  });


  /* image lightbox */
  $(".post-content").imagesLoaded(function() {
    $(".post-content img").each(function() {
      $(this).wrap($("<div class='post-image'></div>"));
      $(this).after("<a href='" + $(this).attr("src") + "' data-lightbox='image-post'><div class='post-image-overlay'></div></a>")
    });
  });

  $(".post-content img:first").each(function() {
    var src = $(this).attr("src");
    $(".blog-post-header").css("background-image", "url(" + src + ")");
  });

    // scroll up plugin
  $().showUp('.js-scroll-up', {
    upClass: '{{upClass}}',
    downClass: '{{downClass}}'
  });


  if($("#disqus_thread").length > 0) {
    // disqus
    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
  }
});
