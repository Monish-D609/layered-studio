import { useEffect, useRef } from "react";
import useDeviceCapabilities from "@/hooks/use-device-capabilities";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const { finePointer } = useDeviceCapabilities();

  useEffect(() => {
    if (!finePointer) {
      return;
    }

    const dot = dotRef.current;
    if (!dot) return;

    // Add class to document to safely hide default cursor via CSS
    document.documentElement.classList.add("has-custom-cursor");

    const interactiveSelector = "a, button, [data-cursor-hover], input, select, textarea";

    let mouseX = -100;
    let mouseY = -100;
    
    const onPointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      if (dot.style.opacity !== "1") dot.style.opacity = "1";
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(interactiveSelector)) {
        dot.classList.add("hovered");
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const relatedTarget = event.relatedTarget as Element | null;

      if (!target?.closest(interactiveSelector)) return;
      if (relatedTarget?.closest(interactiveSelector)) return;

      dot.classList.remove("hovered");
    };

    const onWindowBlur = () => {
      dot.style.opacity = "0";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [finePointer]);

  if (!finePointer) {
    return null;
  }

  return (
    <div
      ref={dotRef}
      className="cursor-dot"
      style={{ opacity: 0 }}
    />
  );
}
