import React, { useState, useEffect } from "react";

export default function Announcement() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const storedValue = sessionStorage.getItem("bannerVisible");
      if (storedValue !== null) {
        setIsVisible(storedValue === "true");
      }
      setHasCheckedStorage(true);
    }
  }, []);

  useEffect(() => {
    if (hasCheckedStorage) {
      sessionStorage.setItem("bannerVisible", isVisible.toString());
    }
  }, [isVisible, hasCheckedStorage]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative border-l-4 border-teal-900 bg-teal-600 px-4 py-4 text-stone-100">
      <div className="relative mx-auto max-w-5xl">
        <button
          onClick={handleClose}
          className="pointer-events-auto absolute right-2 z-10 text-stone-100 hover:text-stone-300"
          aria-label="Close"
        >
          &times;
        </button>
        <p className="text-lg font-bold lg:text-xl">Notice</p>
        <p>
          Tolbert’s will be closed Sunday, September 8th at 3:30 for a private
          event. Also Monday, September 9th at 4:00 for a private event.
        </p>
      </div>
    </div>
  );
}
