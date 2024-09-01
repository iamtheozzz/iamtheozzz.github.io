document.addEventListener("DOMContentLoaded", () => {
    // SETUP PLUGINS
    gsap.registerPlugin(ScrollTrigger, Flip);
    ScrollTrigger.normalizeScroll(true);
    // SETUP ELEMENTS
    const zoneEls = document.querySelectorAll("[js-scrollflip-element='zone']");
    const targetEl = document.querySelector("[js-scrollflip-element='target']");
    // SETUP TIMELINE
    let tl;
    const createTimeline = () => {
      if (tl) {
        tl.kill();
        gsap.set(targetEl, {
          clearProps: "all"
        });
      }
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: zoneEls[0],
          start: "center center",
          endTrigger: zoneEls[zoneEls.length - 1],
          end: "center center",
          scrub: true
        }
      });
      zoneEls.forEach((zoneEl, index) => {
        const nextZoneEl = zoneEls[index + 1];
        if (nextZoneEl) {
          const nextZoneRect = nextZoneEl.getBoundingClientRect();
          const thisZoneRect = zoneEl.getBoundingClientRect();
          const nextZoneDistance =
            nextZoneRect.top + nextZoneRect.height / 2 + window.pageYOffset;
          const thisZoneDistance =
            thisZoneRect.top + thisZoneRect.height / 2 + window.pageYOffset;
          const zoneDifference = nextZoneDistance - thisZoneDistance;
          tl.add(
            Flip.fit(targetEl, nextZoneEl, {
              duration: zoneDifference,
              ease: "power2.inOut"
            })
          );
        }
      });
    };
    createTimeline();
    // SETUP RESIZE
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(createTimeline, 250);
    });
  });
  
