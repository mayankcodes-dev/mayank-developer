"use client";

import { useState, useEffect } from "react";

export function useTypewriter(
  texts: string[],
  speed = 75,
  deleteSpeed = 40,
  pause = 1800
) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex]   = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused]     = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentText = texts[textIndex] ?? "";

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          // Done typing — pause before deleting
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, pause);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isPaused, textIndex, texts, speed, deleteSpeed, pause]);

  return displayText;
}
