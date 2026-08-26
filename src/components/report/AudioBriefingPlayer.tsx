"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Headphones,
  Sparkles,
  X,
  FastForward,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResearchReport } from "@/lib/types";
import { formatDuration } from "@/lib/utils";

interface AudioBriefingPlayerProps {
  report: ResearchReport;
  isOpen: boolean;
  onClose: () => void;
}

export function AudioBriefingPlayer({ report, isOpen, onClose }: AudioBriefingPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);
  const duration = 272; // 4:32 in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, duration]);

  if (!isOpen) return null;

  const audioData = report.audioBriefing || {
    duration: "4:32",
    title: `Executive Audio Summary: ${report.title}`,
    transcript: [
      { timestamp: "0:00", speaker: "Dr. Alicia Vance (AI Host)", text: `Welcome to this ResearchForge executive audio summary on "${report.title}".` },
      { timestamp: "0:45", speaker: "Dr. Marcus Reed (AI Analyst)", text: "Our multi-agent synthesis cross-checked 380 peer-reviewed papers and 45 patent filings." },
      { timestamp: "2:10", speaker: "Dr. Alicia Vance (AI Host)", text: "The dominant finding revolves around roll-to-roll dry electrode processing, which lowers gigafactory capex by ~40%." },
    ],
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl rounded-3xl border border-indigo-500/50 bg-card/95 shadow-2xl backdrop-blur-2xl p-4 sm:p-5 space-y-4 animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Headphones className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground line-clamp-1">{audioData.title}</h4>
            <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1.5">
              <span>Synthesized Dual-Voice AI Briefing</span>
              <span>•</span>
              <span className="text-indigo-400 font-semibold">{formatDuration(currentTime)} / {audioData.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Speed Switcher */}
          <button
            onClick={() => {
              if (playbackSpeed === 1) setPlaybackSpeed(1.25);
              else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
              else setPlaybackSpeed(1);
            }}
            className="px-2 py-1 rounded-md bg-secondary text-[10px] font-mono text-muted-foreground hover:text-foreground border border-border"
          >
            {playbackSpeed}x
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Waveform Visualization */}
      <div className="flex items-center justify-between gap-1 h-8 px-2 bg-secondary/30 rounded-xl">
        {Array.from({ length: 36 }).map((_, i) => {
          const isPassed = (i / 36) * 100 <= progressPercent;
          const randomHeight = Math.sin(i * 0.4) * 12 + 16;
          return (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isPassed
                  ? "bg-gradient-to-t from-indigo-500 to-cyan-400"
                  : "bg-zinc-700/60"
              }`}
              style={{
                height: `${isPlaying ? Math.max(6, (randomHeight + (i % 3) * 4) % 24) : 8}px`,
              }}
            />
          );
        })}
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
          className="text-[11px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          <span>-15s</span>
        </button>

        <Button
          variant="glow"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="h-10 px-6 rounded-full font-bold flex items-center gap-2"
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
          <span>{isPlaying ? "Pause Briefing" : "Play AI Briefing"}</span>
        </Button>

        <button
          onClick={() => setCurrentTime(Math.min(duration, currentTime + 15))}
          className="text-[11px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <span>+15s</span>
          <FastForward className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
