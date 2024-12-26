var tl = gsap.timeline();

var cursor = document.querySelector(".cursor");
var main = document.querySelector("main");

window.addEventListener("mousemove", (dets) => {
  gsap.to(cursor, {
    x: dets.x,
    y: dets.y,
    duration: 0.25,
  });
});
var para = document.querySelector(".cursor-transform-para");
para.addEventListener("mouseenter", () => {
  gsap.to(cursor, {
    height: "2.5vw",
    width: "0.35vw",
    duration: 0.3,
  });
  // console.log("ntered")
});
para.addEventListener("mouseleave", () => {
  gsap.to(cursor, {
    height: "1.2vw",
    width: "1.2vw",
    duration: 0.3,
  });
  // console.log("entered");
});
document.addEventListener("mouseenter", () => {
  gsap.to(cursor, {
    opacity: 1,
    duration: 0.2,
  });
});
document.addEventListener("mouseleave", () => {
  gsap.to(cursor, {
    opacity: 0,
    duration: 0.2,
  });
});
//Locomotive Scroll

// const scroll = new LocomotiveScroll({
//   el: document.querySelector("main"),
//   smooth: true,
// });

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

//Navbar Closing and Opening Functions
var open = document.querySelector(".nav i");
var close = document.querySelector(".nav-slide i");

tl.to(".nav-slide", {
  right: "0",
  duration: 0.6,
});

tl.from(".nav-slide a", {
  y: 20,
  stagger: 0.2,
  opacity: 0,
});

tl.pause();

open.addEventListener("click", () => {
  tl.play();
});

close.addEventListener("click", () => {
  tl.reverse();
});

//Typer Writer Effect

let typeCursor = gsap.to(".type-cursor", {
  opacity: 0,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

let boxTl = gsap.timeline();

boxTl
  .to(".box", {
    duration: 1,
    width: "21vw",
    ease: "bounce.out",
  })
  .from(".hi", {
    duration: 0.8,
    y: "7vw",
    ease: "power3.inOut",
  })
  .to(".box", {
    duration: 0.6,
    height: "100%",
    ease: "bounce.out",
    onComplete: () => masterTl.play(),
  });

let masterTl = gsap.timeline({ repeat: -1 }).pause();
const words = [" Karan.", " a Developer.", " a Designer.", " a Human!"];

words.forEach((word) => {
  let typeTl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 0.8 });
  typeTl.to(".text", { duration: 1, text: word });
  masterTl.add(typeTl);
});

//String Effect
var string = document.querySelector(".string");
var Initial_path = "M 10 140 Q 500 140 990 140";

string.addEventListener("mousemove", (dets) => {
  var path = `M 10 140 Q ${dets.offsetX} ${dets.offsetY} 990 140`;

  gsap.to("svg path", {
    attr: { d: path },
    duration: 0.2,
    ease: "power1.out",
  });
});

string.addEventListener("mouseleave", () => {
  gsap.to("svg path", {
    attr: { d: Initial_path },
    duration: 1.5,
    ease: "elastic.out(1,0.2)",
  });
});

//Scrolling words animation
const splitText = new SplitType(".text-opacity-animation", { types: "chars" });

var textOpacityTl = gsap.timeline({
  scrollTrigger: {
    scroller: "body",
    trigger: ".page2",
    // markers: true,
    scrub: 1,
    start: "top 0",
    end: "top -300%",
    pin: true,
  },
});
textOpacityTl.from(".me", {
  opacity: 0,
  duration: 5,
  ease: "power4.inOut",
  yPercent: -20,
});

textOpacityTl.from(".char", {
  yPercent: 20,
  willChange: "transform",
  ease: "power4.inOut",
  stagger: 0.2,
  opacity: 0,
});

textOpacityTl.to(".create-color", {
  backgroundColor: "#ff5100",
  duration: 3,
  padding: "10px",
  borderRadius: "30px",
});

//horizontal Scrolling
var horizontaltext = document.querySelector(".horizontal-scroll");
gsap.to(horizontaltext, {
  transform: "translateX(-220%)",
  willChange: "transform",
  scrollTrigger: {
    trigger: ".page3",
    scroller: "body",
    // markers: true,
    scrub: 2,
    pin: true,
    start: "top 0%",
    end: "top -290%",
  },
});

//Work Horizontal Scroll
gsap.to(".images", {
  transform: "translateX(-305.75%)",
  scrollTrigger: {
    trigger: ".page4",
    scroller: "body",
    scrub: 2,
    // markers: true,
    start: "top 0",
    end: "top -200%",
    pin: true,
  },
});

let isScrollingDown = true;
let currentScroll = 0;

let tween = gsap
  .to(".marquee", {
    xPercent: -100,
    repeat: -1,
    duration: 2,
    ease: "linear",
    willChange: "transform",
  })
  .totalProgress(0.5);

gsap.set(".marquee-inner", { xPercent: -50 });

window.addEventListener("scroll", () => {
  if (window.scrollY > currentScroll) {
    isScrollingDown = true;
  } else {
    isScrollingDown = false;
  }

  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  });

  if (isScrollingDown) {
    gsap.to(".marquee i", {
      rotate: -180,
      duration: 0.6,
      ease: "power1.out",
    });
  } else {
    gsap.to(".marquee i", {
      rotate: 0,
      duration: 0.6,
      ease: "power1.out",
    });
  }

  currentScroll = window.scrollY;
});
