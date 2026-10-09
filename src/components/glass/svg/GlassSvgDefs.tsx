"use client";

import { useId } from "react";

/** 液态位移 + 高光（对应文章 glass-svg 思路） */
export function GlassSvgDefs({ filterId }: { filterId: string }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id={filterId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            seed="8"
            result="noise"
          />
          <feDisplacementMap
            in="goo"
            in2="noise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
            result="disp"
          />
          <feSpecularLighting
            in="disp"
            surfaceScale="4"
            specularConstant="0.9"
            specularExponent="28"
            lightingColor="white"
            result="spec"
          >
            <fePointLight x="-40" y="-30" z="80" />
          </feSpecularLighting>
          <feComposite in="spec" in2="disp" operator="in" result="lit" />
          <feBlend in="lit" in2="disp" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}

export function useGlassSvgFilterId() {
  const id = useId();
  return `glass-svg-${id.replace(/:/g, "")}`;
}
