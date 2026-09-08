"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageLoader() {
  const root = useRef(null);

  useEffect(() => {
    if (sessionStorage.getItem("datz-loaded")) {
      root.current?.remove();
      return;
    }

    sessionStorage.setItem("datz-loaded", "1");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => root.current?.remove()
      });

      tl.fromTo(".loader-word span",
        { yPercent: 115, filter: "blur(10px)" },
        { yPercent: 0, filter: "blur(0px)", stagger: 0.05, duration: 0.75 }
      )
      .fromTo(".loader-line", { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, "-=0.35")
      .to(".loader-top", { yPercent: -102, duration: 0.9 }, "+=0.15")
      .to(".loader-bottom", { yPercent: 102, duration: 0.9 }, "<")
      .to(root.current, { autoAlpha: 0, duration: 0.15 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="page-loader" aria-hidden="true">
      <div className="loader-top">
        <div className="loader-word">
          {"DATZ".split("").map((letter, i) => <span key={i}>{letter}</span>)}
        </div>
      </div>
      <div className="loader-bottom">
        <div className="loader-caption">DELIVERY / CREDIBILITY / RELIABILITY / FAST</div>
      </div>
      <div className="loader-line" />
    </div>
  );
}
