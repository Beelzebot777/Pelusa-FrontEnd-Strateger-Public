// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useDeleteOnClick.jsx

import { useEffect } from 'react';

// Función auxiliar para calcular la distancia de un punto a un segmento
const getDistancePointToSegment = (px, py, x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    // El segmento es un punto
    return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
  }
  const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
  let closestX, closestY;
  if (t < 0) {
    closestX = x1;
    closestY = y1;
  } else if (t > 1) {
    closestX = x2;
    closestY = y2;
  } else {
    closestX = x1 + t * dx;
    closestY = y1 + t * dy;
  }
  return Math.sqrt((px - closestX) ** 2 + (py - closestY) ** 2);
};

const useDeleteOnClick = (
  chartRef,
  candlestickSeriesRef,
  circles,
  setCircles,
  lines,
  setLines,
  selectedTool,
  setSelectedTool
) => {
  useEffect(() => {
    if (
      !chartRef.current ||
      !candlestickSeriesRef.current ||
      selectedTool !== 'delete'
    ) {
      return;
    }

    const chart = chartRef.current;
    const series = candlestickSeriesRef.current;

    const handleChartClick = (param) => {
      const clickX = param.point.x;
      const clickY = param.point.y;

      let primitiveToRemove = null;
      let primitiveType = null; // "circle" o "line"

      // Primero buscamos en los círculos
      for (const circle of circles) {
        // Suponemos que cada círculo tiene una propiedad 'originalPoint' y 'radius'
        const centerX = chart.timeScale().timeToCoordinate(circle.originalPoint.time);
        const centerY = series.priceToCoordinate(circle.originalPoint.price);
        const dx = clickX - centerX;
        const dy = clickY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= circle.radius) {
          primitiveToRemove = circle;
          primitiveType = 'circle';
          break;
        }
      }

      // Si no se encontró ningún círculo, buscamos entre las líneas
      if (!primitiveToRemove) {
        for (const line of lines) {
          // Suponemos que cada línea tiene propiedades 'start' y 'end'
          const startX = chart.timeScale().timeToCoordinate(line.start.time);
          const startY = series.priceToCoordinate(line.start.price);
          const endX = chart.timeScale().timeToCoordinate(line.end.time);
          const endY = series.priceToCoordinate(line.end.price);
          
          const distance = getDistancePointToSegment(clickX, clickY, startX, startY, endX, endY);
          // Umbral de 5 píxeles (puedes ajustarlo)
          if (distance <= 5) {
            primitiveToRemove = line;
            primitiveType = 'line';
            break;
          }
        }
      }

      if (primitiveToRemove) {
        // Eliminar la primitiva del gráfico
        if (typeof series.detachPrimitive === 'function') {
          series.detachPrimitive(primitiveToRemove);
        } else if (typeof chart.removePrimitive === 'function') {
          chart.removePrimitive(primitiveToRemove);
        } else if (typeof primitiveToRemove.dispose === 'function') {
          primitiveToRemove.dispose();
        }

        // Actualizar el estado según el tipo de primitiva
        if (primitiveType === 'circle') {
          setCircles((prevCircles) =>
            prevCircles.filter((c) => c !== primitiveToRemove)
          );
        } else if (primitiveType === 'line') {
          setLines((prevLines) =>
            prevLines.filter((l) => l !== primitiveToRemove)
          );
        }
        // Salir del modo "delete"
        setSelectedTool(null);
      }
    };

    chart.subscribeClick(handleChartClick);
    return () => {
      chart.unsubscribeClick(handleChartClick);
    };
  }, [chartRef, candlestickSeriesRef, circles, lines, selectedTool, setCircles, setLines, setSelectedTool]);
};

export default useDeleteOnClick;
