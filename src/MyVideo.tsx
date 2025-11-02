// src/MyVideo.tsx
import React, { useEffect, useRef } from "react";
import {
  AbsoluteFill,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { motion } from "framer-motion";
import * as d3 from "d3";
import rough from "roughjs";

const MyVideo = ({ script }: any) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const transitionDuration = 15;
  const sceneDuration = 180; // 6 seconds at 30fps

  const allTransitions: any = [
    wipe(),
    slide(),
    flip(),
    clockWipe({ width, height }),
    wipe(),
    slide()
  ];

  const sketchRef = useRef<SVGSVGElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Rough.js sketch
    if (sketchRef.current) {
      const rc = rough.svg(sketchRef.current);
      const circle = rc.circle(100, 100, 80, { roughness: 2, fill: 'lightblue' });
      sketchRef.current.appendChild(circle);
    }

    // D3 chart
    if (chartRef.current) {
      const data = [20, 40, 60, 80, 100];
      const svg = d3.select(chartRef.current);
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 60 + 50)
        .attr("y", (d) => 200 - d)
        .attr("width", 40)
        .attr("height", (d) => d)
        .attr("fill", "orange");
    }
  }, []);

  return (
    <AbsoluteFill style={{ background: "linear-gradient(45deg, #001122, #003366)" }}>
      <TransitionSeries>
        {script.flatMap((scene: any, index: number) => {
          const transition = index < script.length - 1 ? (
            <TransitionSeries.Transition
              key={`trans-${index}`}
              presentation={allTransitions[index % allTransitions.length]}
              timing={linearTiming({ durationInFrames: transitionDuration })}
            />
          ) : null;

          const sequence = (
            <TransitionSeries.Sequence
              key={`seq-${index}`}
              durationInFrames={sceneDuration}
            >
              <AbsoluteFill
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "40px",
                }}
              >
                {/* Left side: Framer Motion Animated SVG */}
                <motion.div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  animate={{
                    scale: [0.8, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  dangerouslySetInnerHTML={{ __html: scene.svgCode }}
                />

                {/* Right side: Text and additional elements */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: "40px",
                  }}
                >
                  {/* Rough.js Sketch */}
                  <svg ref={sketchRef} width="300" height="200" style={{ marginBottom: "20px" }} />

                  {/* D3 Chart */}
                  <svg ref={chartRef} width="400" height="200" style={{ marginBottom: "40px" }} />

                  {/* Animated Text with Framer */}
                  <motion.div
                    style={{
                      fontSize: "40px",
                      fontWeight: "bold",
                      fontFamily: "Arial, sans-serif",
                      color: "#fff",
                      textAlign: "center",
                      lineHeight: "1.3",
                      maxWidth: "100%",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {scene.contentText}
                  </motion.div>
                </div>
              </AbsoluteFill>
            </TransitionSeries.Sequence>
          );

          return [sequence, transition].filter(Boolean);
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};


export default MyVideo;