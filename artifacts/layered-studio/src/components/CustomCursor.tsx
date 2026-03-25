import { useEffect, useRef } from "react";
import useDeviceCapabilities from "@/hooks/use-device-capabilities";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { finePointer, prefersReducedMotion, lowPower } = useDeviceCapabilities();

  useEffect(() => {
    if (!finePointer || prefersReducedMotion || lowPower) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const interactiveSelector = "a, button, [data-cursor-hover]";

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let active = false;

    dot.style.opacity = "0";
    ring.style.opacity = "0";

    const applyHoverState = (hovered: boolean) => {
      ring.classList.toggle("hovered", hovered);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
        raf = requestAnimationFrame(animate);
        return;
      }

      active = false;
    };

    const startAnimation = () => {
      if (active) return;
      active = true;
      raf = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";

      startAnimation();
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(interactiveSelector)) {
        applyHoverState(true);
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const relatedTarget = event.relatedTarget as Element | null;

      if (!target?.closest(interactiveSelector)) {
        return;
      }

      if (relatedTarget?.closest(interactiveSelector)) {
        return;
      }

      applyHoverState(false);
    };

    const onWindowBlur = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      applyHoverState(false);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
      window.removeEventListener("blur", onWindowBlur);
      cancelAnimationFrame(raf);
    };
  }, [finePointer, prefersReducedMotion, lowPower]);

  if (!finePointer || prefersReducedMotion || lowPower) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      />
    </>
  );
}
