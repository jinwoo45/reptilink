"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Silence is the default. When the reader opts in, the network gets a carrier:
 * filtered noise over a low drone, generated locally — no audio files shipped.
 */
export default function AudioToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  function start() {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctor();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.6);

    // Pink-ish static.
    const frames = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < frames; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 1150;
    band.Q.value = 0.7;
    noise.connect(band).connect(master);
    noise.start();

    // Low drone.
    const drone = ctx.createOscillator();
    drone.type = "sawtooth";
    drone.frequency.value = 54;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.25;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 220;
    drone.connect(droneGain).connect(lp).connect(master);
    drone.start();

    stopRef.current = () => {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
        window.setTimeout(() => {
          noise.stop();
          drone.stop();
          void ctx.close();
        }, 500);
      } catch {
        /* context already gone */
      }
      stopRef.current = null;
    };
  }

  return (
    <button
      className="audio"
      onClick={() => {
        if (on) {
          stopRef.current?.();
          setOn(false);
        } else {
          start();
          setOn(true);
        }
      }}
      aria-pressed={on}
      title={on ? "DISABLE AUDIO" : "ENABLE AUDIO"}
    >
      <span className={on ? "toxic" : "faint"}>{on ? "◉" : "○"}</span> AUDIO
    </button>
  );
}
