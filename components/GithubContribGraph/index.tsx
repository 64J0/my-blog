import React, { useCallback, useEffect, useMemo } from "react";

interface ContribChartHTML {
  contribChartHTML: string;
}

interface CustomSVG extends SVGElement {
  currentScale: number;
  width: {
    baseVal: {
      value: number;
    }
  }
}

const GithubContribGraph: React.FC<ContribChartHTML> = ({ contribChartHTML }) => {
  const svgInitialWidth = 828;
  const layoutMaxScale = 756; // 54rem = 54 * 14
  const svgMaxScale = 728; // 52rem = 52 * 14
  const layoutMinScale = 476; // 34rem = 34 * 14
  const svgMinScale = 476; // 34rem = 34 * 14

  const maxScale = useMemo(() => {
    return svgMaxScale / svgInitialWidth;
  }, []);
  const minScale = useMemo(() => {
    return svgMinScale / svgInitialWidth;
  }, []);

  const handleSetSvgScale = useCallback(({ scale }) => {
    const svgElement = window.document.querySelector(".js-calendar-graph-svg");
    (svgElement as CustomSVG).currentScale = scale;
    (svgElement as CustomSVG).width.baseVal.value = svgInitialWidth * scale;
  }, []);

  const handleSelectCorrectScale = useCallback(() => {
    const screenWidth = Math.min(window.innerWidth, window.screen.width);
    if (screenWidth >= layoutMaxScale) {
      return handleSetSvgScale({ scale: maxScale });

    } else if (screenWidth <= layoutMinScale) {
      return handleSetSvgScale({ scale: minScale });

    } else {
      const scale = (screenWidth - 36) / svgInitialWidth;
      return handleSetSvgScale({ scale });
    }
  }, []);

  const handleAddResizeEvent = useCallback(() => {
    return window.addEventListener("resize", handleSelectCorrectScale);
  }, []);

  useEffect(() => {
    handleSelectCorrectScale();
    handleAddResizeEvent();

    return function cleanup() {
      return window.removeEventListener("resize", handleSelectCorrectScale);
    };
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Minhas contribuições no Github:</h2>
      <div
        style={{ marginTop: "3rem" }}
        id="contrib-chart"
        dangerouslySetInnerHTML={{ __html: contribChartHTML }}
      />
    </>
  );
}

export default GithubContribGraph;