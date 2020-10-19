import React, { useState, useRef, useCallback } from "react";
import Head from "next/head";
import Chartjs from "chart.js";

import Layout from "../../components/layout";
import styles from "./styles.module.scss";

export default function GraficosPage() {
  const canvasRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const [graphTitle, setGraphTitle] = useState("");
  const [verticalName, setVerticalName] = useState("");
  const [verticalData, setVerticalData] = useState("");
  const [horizontalName, setHorizontalName] = useState("");
  const [horizontalData, setHorizontalData] = useState("");

  const handleGraph = useCallback(() => {
    try {
      const yDataWithSpaces = verticalData.split(",");
      const yData = [];
      yDataWithSpaces.forEach((y) => {
        return yData.push(y.trim());
      });

      const xDataWithSpaces = horizontalData.split(",");
      const xData = [];
      xDataWithSpaces.forEach((x) => {
        return xData.push(x.trim());
      });

      const chartConfig = {
        type: "line",
        data: {
          labels: xData,
          datasets: [
            {
              label: verticalName,
              borderColor: "#0f679a",
              data: yData,
              borderWidth: 3,
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            fontSize: 24,
            text: graphTitle
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                fontSize: 14,
                labelString: horizontalName
              }
            }],
            yAxes: [{
            }]
          }
        }
      };

      if (canvasRef.current) {
        chartInstance && chartInstance.destroy();
        const newChartInstance = new Chartjs(
          canvasRef.current.getContext("2d"),
          chartConfig
        );
        setChartInstance(newChartInstance);
      }
    } catch (error) {
      alert("Operação inválida");
      console.error(error);
    }
  }, [graphTitle, verticalName, verticalData, horizontalName, horizontalData, canvasRef]);

  return (
    <Layout>
      <Head>
        <title>Gráficos</title>
      </Head>

      <div className={styles.container}>
        <h1>Gere um Gráfico</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="graph-title">Título do gráfico:</label>
            <input
              id="graph-title"
              type="text"
              value={graphTitle}
              onChange={(e) => setGraphTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="vertical-name">Título vertical:</label>
            <input
              id="vertical-name"
              type="text"
              value={verticalName}
              onChange={(e) => setVerticalName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="vertical-data">Dados de y:</label>
            <textarea
              id="vertical-data"
              type="text"
              value={verticalData}
              onChange={(e) => setVerticalData(e.target.value)}
            />
          </div>
          <span>Exemplo: 0.2, 1.3, 3, 4.123124</span>

          <div>
            <label htmlFor="horizontal-name">Título horizontal:</label>
            <input
              id="horizontal-name"
              type="text"
              value={horizontalName}
              onChange={(e) => setHorizontalName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="horizontal-data">Dados de x:</label>
            <textarea
              id="horizontal-data"
              type="text"
              value={horizontalData}
              onChange={(e) => setHorizontalData(e.target.value)}
            />
          </div>
          <span>Exemplo: 0, 1, 3, 4</span>

          <center>
            <button
              onClick={handleGraph}
              type="button"
            >Gerar!</button>
          </center>
        </form>

        <canvas ref={canvasRef}></canvas>
      </div>
    </Layout>
  );
}