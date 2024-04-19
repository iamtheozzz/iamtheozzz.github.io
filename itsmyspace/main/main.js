gsap.registerPlugin(MotionPathPlugin, TextPlugin);
gsap.registerPlugin(ScrollTrigger);
src="https://unpkg.co/gsap@3/dist/gsap.min.js"
src="https://assets.codepen.io/16327/ScrollSmoother.min.js"
src="https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js"
      

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger,ScrollToPlugin)
  gsap.registerPlugin(MotionPathPlugin, TextPlugin);



gsap.utils.toArray(".comparisonSection").forEach(section => {
	let tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "center center",
        // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
				end: () => "+=" + section.offsetWidth, 
				scrub: true,
				pin: true,
        anticipatePin: 1
			},
			defaults: {ease: "none"}
		});
	// animate the container one way...
	tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0})
	  // ...and the image the opposite way (at the same time)
	  .fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
});
});