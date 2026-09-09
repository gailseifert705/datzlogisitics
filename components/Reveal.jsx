"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Reveal({
  as: Tag = "div",
  className = "",
  children,
  delay = 0
}) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const node = ref.current;

    const animation = gsap.fromTo(
      node,
      { y: 28, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 86%",
          once: true
        }
      }
    );

    return () => animation.kill();
  }, [delay]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
