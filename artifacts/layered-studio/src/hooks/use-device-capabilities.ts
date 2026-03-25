import { useEffect, useState } from "react";

type DeviceCapabilities = {
  finePointer: boolean;
  prefersReducedMotion: boolean;
  lowPower: boolean;
};

function readLowPowerHint() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const navigatorWithHints = navigator as Navigator & {
    deviceMemory?: number;
    connection?: {
      saveData?: boolean;
    };
  };

  const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;
  const deviceMemory = navigatorWithHints.deviceMemory ?? 8;
  const saveData = navigatorWithHints.connection?.saveData ?? false;

  return saveData || hardwareConcurrency <= 4 || deviceMemory <= 4;
}

function readCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return {
      finePointer: true,
      prefersReducedMotion: false,
      lowPower: false,
    };
  }

  return {
    finePointer: window.matchMedia("(pointer: fine)").matches,
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    lowPower: readLowPowerHint(),
  };
}

export default function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState(readCapabilities);

  useEffect(() => {
    const finePointerMedia = window.matchMedia("(pointer: fine)");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCapabilities = () => {
      setCapabilities({
        finePointer: finePointerMedia.matches,
        prefersReducedMotion: reducedMotionMedia.matches,
        lowPower: readLowPowerHint(),
      });
    };

    updateCapabilities();

    const addListener = (media: MediaQueryList) => {
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", updateCapabilities);
        return () => media.removeEventListener("change", updateCapabilities);
      }

      media.addListener(updateCapabilities);
      return () => media.removeListener(updateCapabilities);
    };

    const removeFinePointerListener = addListener(finePointerMedia);
    const removeReducedMotionListener = addListener(reducedMotionMedia);

    return () => {
      removeFinePointerListener();
      removeReducedMotionListener();
    };
  }, []);

  return capabilities;
}
