import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
declare const jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'Aayra';
  showDiv:boolean=false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset > 0) {
      this.showDiv = true;
    } else {
      this.showDiv = false;
    }
  }

  scrollTop(){
    window.scroll(0,0)
  } 

  // ngAfterViewInit(): void {
  //   document.addEventListener('DOMContentLoaded',function(){
  //     if(typeof jQuery==="undefined"){
  //       console.log('error loading jquery')
  //     }
  //     else{
  //       var tpj = jQuery;
    
  //   var revapi476;
  //   tpj(document).ready(function () {
  //     if (tpj("#rev_slider_476_1").revolution == undefined) {
  //       revslider_showDoubleJqueryError("#rev_slider_476_1");
  //     } else {
  //       revapi476 = tpj("#rev_slider_476_1")
  //         .show()
  //         .revolution({
  //           sliderType: "standard",
  //           jsFileLocation: "revolution/js/",
  //           sliderLayout: "fullscreen",
  //           dottedOverlay: "none",
  //           delay: 9000,
  //           navigation: {
  //             keyboardNavigation: "off",
  //             keyboard_direction: "horizontal",
  //             mouseScrollNavigation: "off",
  //             mouseScrollReverse: "default",
  //             onHoverStop: "off",
  //             arrows: {
  //               style: "hesperiden",
  //               enable: true,
  //               hide_onmobile: false,
  //               hide_onleave: false,
  //               tmp: "",
  //               left: {
  //                 h_align: "left",
  //                 v_align: "center",
  //                 h_offset: 20,
  //                 v_offset: 0,
  //               },
  //               right: {
  //                 h_align: "right",
  //                 v_align: "center",
  //                 h_offset: 20,
  //                 v_offset: 0,
  //               },
  //             },
  //           },
  //           visibilityLevels: [1240, 1024, 778, 480],
  //           gridwidth: 1240,
  //           gridheight: 868,
  //           lazyType: "none",
  //           parallax: {
  //             type: "mouse",
  //             origo: "enterpoint",
  //             speed: 400,
  //             levels: [
  //               5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51,
  //               55,
  //             ],
  //             type: "mouse",
  //           },
  //           shadow: 0,
  //           spinner: "off",
  //           stopLoop: "on",
  //           stopAfterLoops: 0,
  //           stopAtSlide: 1,
  //           shuffle: "off",
  //           autoHeight: "off",
  //           fullScreenAutoWidth: "off",
  //           fullScreenAlignForce: "off",
  //           fullScreenOffsetContainer: "",
  //           fullScreenOffset: "60px",
  //           disableProgressBar: "on",
  //           hideThumbsOnMobile: "off",
  //           hideSliderAtLimit: 0,
  //           hideCaptionAtLimit: 0,
  //           hideAllCaptionAtLilmit: 0,
  //           debugMode: false,
  //           fallbacks: {
  //             simplifyAll: "off",
  //             nextSlideOnWindowFocus: "off",
  //             disableFocusListener: false,
  //           },
  //         });
  //       /* STATIC SNOW FLAKE CONTAINER SETTINGS */
  //       /* PLEASE NOTE! YOU WILL NEED TO ADD AT LEAST 1 STATIC LAYER (EVEN A TRANSPARENT IF YOU WISH) TO USE THE SCRIPT BELOW ON STATIC LAYERS*/
    
  //       var snowsettings = {
  //         selector:
  //           ".tp-static-layers" /* THE INNER CONTAINER WHERE FLAKES SHOULD BE DRAWN (OPTIONAL)*/,
  //         dimension: "self" /* THE RUNTIME DIMENSIONS OF THE CONTAINER */,
  //         particleMaxPer: 400 /* MAX PARTICLE PER 1.5M PIXEL */,
  //         particlaSize: [0.2, 6] /* MIN, MAX SIZE OF PARTICLE */,
  //         particleOpacity: [0.3, 1] /* MIN, MAX OPACITY OF PARTICLE */,
  //         particleSpeed: [30, 100] /* MIN, MAX SPEED OF PARTICLES */,
  //         particleSinus: [
  //           1, 100,
  //         ] /* MIN, MAX AMPLITUDE OF PARTICLE ANIM*/,
  //       };
    
  //       revapi476.bind("revolution.slide.onloaded", function (e) {
  //         revapi476.letItSnow(snowsettings);
  //       });
    
    
    
  //       var snowsettings = {
  //         selector: ".tp-static-layers",
  //         dimension: "self",
  //         particleMaxPer: 400,
  //         particlaSize: [0.2, 6],
  //         particleOpacity: [0.3, 1],
  //         particleSpeed: [30, 100],
  //         particleSinus: [1, 100],
  //       };
  //       revapi476.bind("revolution.slide.onloaded", function (e) {
  //         revapi476.letItSnow(snowsettings);
  //       }),
  //         (function (e, s) {
  //           "use strict";
  //           function a(e) {
  //             (e.pause = !0),
  //               e.sc.find(".snowflakes_wrapper").remove(),
  //               e.c.removeData("snowflakes"),
  //               (e = {});
  //           }
  //           function n(e) {
  //             e.snowflakes = [];
  //             for (
  //               var s = (e.w * e.h) / 15e5;
  //               e.snowflakes.length < e.particleMaxPer * s;
    
  //             )
  //               e.snowflakes.push(i(e));
  //           }
  //           function t(e) {
  //             window.requestAnimationFrame(function () {
  //               r(e);
  //             });
  //           }
  //           function r(e) {
  //             if (
  //               e == s ||
  //               e.ctx == s ||
  //               1 == e.destroyed ||
  //               1 == e.pause
  //             )
  //               return !1;
  //             e.ctx.clearRect(0, 0, 2700, 2500);
  //             var a = e.h / 3,
  //               n = (e.h / 3) * 2;
  //             for (var r in e.snowflakes)
  //               if (
  //                 (e.snowflakes[r].y + 0.1 * e.snowflakes[r].r < 0 &&
  //                   1 == e.summer) ||
  //                 (e.snowflakes[r].y > e.h + e.snowflakes[r].r &&
  //                   1 == e.summer)
  //               );
  //               else {
  //                 (e.snowflakes[r].delta +=
  //                   e.snowflakes[r].delta == Math.PI / 2
  //                     ? -e.snowflakes[r].delta
  //                     : Math.random() / 500 - 0.01),
  //                   e.summer
  //                     ? (e.snowflakes[r].y +=
  //                         e.snowflakes[r].speed / 50 +
  //                         0.1 * e.snowflakes[r].r)
  //                     : (e.snowflakes[r].y +=
  //                         e.snowflakes[r].speed / 100 +
  //                         0.1 * e.snowflakes[r].r),
  //                   (e.snowflakes[r].x +=
  //                     Math.sin(e.snowflakes[r].delta) *
  //                     (0.1 * e.snowflakes[r].r)),
  //                   e.snowflakes[r].y > e.h + e.snowflakes[r].r &&
  //                     1 != e.summer &&
  //                     ((e.snowflakes[r] = i(e)),
  //                     (e.snowflakes[r].y = 0 - e.snowflakes[r].r));
  //                 var l = e.snowflakes[r].y - a,
  //                   o = e.snowflakes[r].r,
  //                   c = e.snowflakes[r].alpha;
  //                 if (l > 0 || 1 == e.summer) {
  //                   var w = 1 - l / n;
  //                   (o = e.snowflakes[r].r * w),
  //                     (c = e.snowflakes[r].alpha * w);
  //                 }
  //                 (o = 0.1 > o ? 0.1 : o),
  //                   (c = 0.1 > c ? 0.1 : c),
  //                   (e.snowflakes[r].x =
  //                     e.snowflakes[r].x > e.w + e.snowflakes[r].r
  //                       ? 0
  //                       : e.snowflakes[r].x < -o
  //                       ? e.w
  //                       : e.snowflakes[r].x),
  //                   e.ctx.beginPath(),
  //                   e.ctx.arc(
  //                     e.snowflakes[r].x,
  //                     e.snowflakes[r].y,
  //                     o,
  //                     2 * Math.PI,
  //                     !1
  //                   ),
  //                   (e.ctx.fillStyle = "rgba(255,255,255," + c + ")"),
  //                   e.ctx.fill();
  //               }
  //             t(e);
  //           }
  //           function i(e) {
  //             var s = new Object();
  //             return (
  //               (s.delta =
  //                 (e.particleSinus[0] +
  //                   Math.random() *
  //                     (e.particleSinus[1] - e.particleSinus[0])) *
  //                 Math.round(2 * Math.random() - 1)),
  //               (s.r =
  //                 e.particlaSize[0] +
  //                 Math.random() *
  //                   (e.particlaSize[1] - e.particlaSize[0])),
  //               (s.alpha =
  //                 e.particleOpacity[0] +
  //                 Math.random() *
  //                   (e.particleOpacity[1] - e.particleOpacity[0])),
  //               (s.speed =
  //                 ((e.particleSpeed[0] +
  //                   Math.random() *
  //                     (e.particleSpeed[1] - e.particleSpeed[0])) *
  //                   s.r) /
  //                 3),
  //               (s.x = Math.random() * e.w),
  //               (s.y = Math.random() * -e.h),
  //               s
  //             );
  //           }
  //           e.fn.extend({
  //             letItSnow: function (r) {
  //               var i = {
  //                 particleMaxPer: 400,
  //                 particlaSize: [0.2, 6],
  //                 particleOpacity: [0.3, 1],
  //                 particleSpeed: [30, 100],
  //                 particleSinus: [1, 100],
  //               };
  //               return (
  //                 "destroy" != r &&
  //                   "stop" != r &&
  //                   "play" != r &&
  //                   "summer" != r &&
  //                   "winter" != r &&
  //                   (r = e.extend(!0, {}, i, r)),
  //                 this.each(function () {
  //                   if (
  //                     -1 !=
  //                     e.inArray(r, [
  //                       "destroy",
  //                       "stop",
  //                       "play",
  //                       "winter",
  //                       "summer",
  //                     ])
  //                   ) {
  //                     switch (r) {
  //                       case "destroy":
  //                         (r = e(this).data("snowflakes")),
  //                           r != s && a(r);
  //                         break;
  //                       case "stop":
  //                         (r = e(this).data("snowflakes")),
  //                           r != s && (r.pause = !0);
  //                         break;
  //                       case "play":
  //                         (r = e(this).data("snowflakes")),
  //                           r != s && ((r.pause = !1), t(r));
  //                         break;
  //                       case "summer":
  //                         (r = e(this).data("snowflakes")),
  //                           r != s && (r.summer = !0);
  //                         break;
  //                       case "winter":
  //                         (r = e(this).data("snowflakes")),
  //                           r != s && (r.summer = !1);
  //                     }
  //                     return !1;
  //                   }
  //                   return (
  //                     (r.c = e(this)),
  //                     (r.sc =
  //                       r.selector != s ? e(this).find(r.selector) : r.c),
  //                     0 == r.sc.length
  //                       ? !1
  //                       : r.c.data("snowflakes") != s
  //                       ? !1
  //                       : (r.sc.find(".snowflakes_wrapper").remove(),
  //                         r.sc.append(
  //                           '<div class="snowflakes_wrapper" style="position:relative;z-index:0"><div class="snowflakes_wrapper_inner" style="overflow:hidden;position:relative"><canvas width="2700" height="2500" style="position:relative;" class="snowflake_canvas"></canvas></div></div>'
  //                         ),
  //                         (r.sw = r.sc.find(".snowflakes_wrapper_inner")),
  //                         r.sw.data("caller_container", r.c),
  //                         (r.canvas = r.sc.find(".snowflake_canvas")),
  //                         r.dimension != self
  //                           ? (r.sizer = r.c)
  //                           : (r.sizer = r.sc),
  //                         (r.w = r.sizer.width()),
  //                         (r.h = r.sizer.height()),
  //                         r.sc
  //                           .find(".snowflakes_wrapper_inner")
  //                           .css({ width: r.w, height: r.h }),
  //                         (r.canvas = r.canvas[0]),
  //                         (r.snowflakes = []),
  //                         (r.ctx = r.canvas.getContext("2d")),
  //                         n(r),
  //                         t(r),
  //                         r.c.data("snowflakes", r),
  //                         void e(window).resize(function () {
  //                           clearTimeout(r.timer),
  //                             (r.timer = setTimeout(function () {
  //                               (r.w = r.sizer.width()),
  //                                 (r.h = r.sizer.height()),
  //                                 r.sc
  //                                   .find(".snowflakes_wrapper_inner")
  //                                   .css({ width: r.w, height: r.h }),
  //                                 n(r);
  //                             }, 50));
  //                         }))
  //                   );
  //                 })
  //               );
  //             },
  //           });
  //         })(jQuery);
  //     }
  //   }); /*ready*/
  //     }
  //   })
    
  // }

}
