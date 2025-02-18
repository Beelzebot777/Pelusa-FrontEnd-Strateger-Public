// Path: strateger-react/src/components/Charts/MainChart/hooks/drawing/useDeleteOnClick.jsx
import { useEffect } from 'react';

const useDeleteOnClick = (
  chartRef,
  candlestickSeriesRef,
  circles,
  setCircles,
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

        let circleToRemove = null;
        for (const circle of circles) {
            const centerX = chart.timeScale().timeToCoordinate(circle.originalPoint.time);
            const centerY = series.priceToCoordinate(circle.originalPoint.price);
            const dx = clickX - centerX;
            const dy = clickY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= circle.radius) {
                circleToRemove = circle;
                break; // Salir del ciclo al encontrar el primer círculo que cumple la condición
            }
        }

        if (circleToRemove) {
            // Eliminar el círculo del gráfico
            if (typeof series.detachPrimitive === 'function') {
                series.detachPrimitive(circleToRemove);
            } else if (typeof chart.removePrimitive === 'function') {
                chart.removePrimitive(circleToRemove);
            } else if (typeof circleToRemove.dispose === 'function') {
                circleToRemove.dispose();
            }
            // Actualizar el estado eliminando el círculo
            setCircles((prevCircles) =>
            prevCircles.filter((c) => c !== circleToRemove)
            );
            // Salir del modo "delete"
            setSelectedTool(null);
        }
    };

    chart.subscribeClick(handleChartClick);
    return () => {
        chart.unsubscribeClick(handleChartClick);
    };
  }, [chartRef, candlestickSeriesRef, circles, selectedTool, setCircles, setSelectedTool]);
};

export default useDeleteOnClick;
