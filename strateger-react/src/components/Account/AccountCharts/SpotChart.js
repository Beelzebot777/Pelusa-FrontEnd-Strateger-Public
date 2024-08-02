// Path: strateger-react/src/components/Account/AccountCharts/SpotChart.js

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChartComponent } from '../../TradingViewLineal/TradingViewLineal';
import Legend from '../../TradingViewLineal/Legend';
import { selectSpotTimeData } from '../../../slices/accountSlice';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

// Función para generar colores hexadecimales válidos
const getRandomColor = () => {
  let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  while (color.length < 7) {
    color += '0';
  }
  return color;
};

const SpotChart = () => {
  const spotAccounts = useSelector(selectSpotTimeData);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [visibleSeries, setVisibleSeries] = useState({});
  const [seriesData, setSeriesData] = useState([]);

  // Agrupar los datos por 'asset' y generar series
  useEffect(() => {
    if (spotAccounts.length > 0) {
      const seriesDataMap = spotAccounts.reduce((acc, account) => {
        const time = new Date(account.dateTime).getTime() / 1000;
        if (!acc[account.asset]) {
          acc[account.asset] = [];
        }
        acc[account.asset].push({
          time,
          value: account.balance,
        });
        return acc;
      }, {});

      // Crear seriesData en el formato requerido
      const seriesData = Object.keys(seriesDataMap).map((asset) => ({
        name: asset,
        data: seriesDataMap[asset].sort((a, b) => a.time - b.time),
        color: getRandomColor(),
      }));

      setSeriesData(seriesData);

      // Inicializar visibleSeries para todas las series como visibles
      const initialVisibility = seriesData.reduce((acc, series) => {
        acc[series.name] = true;
        return acc;
      }, {});

      setVisibleSeries(initialVisibility);
      setIsLoading(false); // Termina la carga después de inicializar datos
    }
  }, [spotAccounts]);

  const toggleSeriesVisibility = (name) => {
    setVisibleSeries((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const colors = {
    backgroundColor: 'white',
    textColor: 'black',
  };

  const priceFormat = {
    type: 'price',
    precision: 8,
    minMove: 0.00000001,
  };

  return (
    <div className="relative">
      <LoadingOverlay isLoading={isLoading} />
      <h2>Spot Chart</h2>
      <ChartComponent
        seriesData={seriesData.filter((series) => visibleSeries[series.name])}
        colors={colors}
        priceFormat={priceFormat}
      />
      <Legend
        seriesData={seriesData}
        visibleSeries={visibleSeries}
        toggleSeriesVisibility={toggleSeriesVisibility}
      />
    </div>
  );
};

export default SpotChart;
