// Path: strateger-react/src/components/TradingViewChart/ChartContainer.js

import React from 'react';
import { useSelector } from 'react-redux';

import useChartData from '../hooks/useChartData';
import useChart from '../hooks/useChart';
import useMarkers from '../hooks/useMarkers';

import { selectSelectedTab } from '../../../redux/slices/tabSlice';

import BacktestingForm from '../../Backtesting/components/BacktestingForm/BacktestingForm';
import DiaryCalendar from '../../Diary/components/DiaryCalendar/DiaryCalendar';
import { SummaryChart } from '../../Account';
import { ToolAlarmBar } from '../../Alarms';
import { ToolOrderBar }  from '../../Orders';


import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';

// Importa las imágenes que quieres usar para cada tab
import alarmImage from '../images/alarm.webp';
import ordersImage from '../images/orders.webp';
import positionsImage from '../images/positions.webp';
import backtestingImage from '../images/backtesting.webp';

const MainChartsContainer = ({ initialTemporalidad, startDate, endDate, onDateChange }) => {
  const selectedTab = useSelector(selectSelectedTab);
  
  const { data, loading, chartInterval } = useChartData(initialTemporalidad, new Date(startDate).toISOString(), new Date(endDate).toISOString());
  const { chartContainerRef, candlestickSeriesRef, stochasticChartContainerRef } = useChart(data);
  
  useMarkers(candlestickSeriesRef, chartInterval);

  const simulatedResults = [
    { date: '2024-08-01', pnl: 100000 },
    { date: '2024-08-02', pnl: -50 },
    { date: '2024-08-03', pnl: 200 },
    { date: '2024-08-04', pnl: -30 },
    { date: '2024-08-05', pnl: 150 },
  ];

  // Mapeo de cada tab a su contenido y atributos específicos de imagen
  const tabContentMap = {
    0: { component: <ToolAlarmBar />,                             image: alarmImage,        ImageHeight: 'h-64' , componentHeight: 'h-32' , leftContainerSpan: 'col-span-8' , rightContainerSpan: 'col-span-2' },
    1: { component: <ToolOrderBar />,                             image: ordersImage,       ImageHeight: 'h-96' , componentHeight: 'h-32' , leftContainerSpan: 'col-span-8' , rightContainerSpan: 'col-span-2' },
    2: { component: null,                                         image: null,              ImageHeight: 'h-0' , componentHeight: 'h-0' , leftContainerSpan: 'col-span-10' , rightContainerSpan: 'col-span-0' },
    3: { component: <DiaryCalendar results={simulatedResults} />, image: null,              ImageHeight: 'h-0' , componentHeight: 'h-32' , leftContainerSpan: 'col-span-8' , rightContainerSpan: 'col-span-2' },
    4: { component: <SummaryChart />,                             image: null,              ImageHeight: 'max-h-64' , componentHeight: 'h-64' , leftContainerSpan: 'col-span-7' , rightContainerSpan: 'col-span-3' },
    5: { component: 'GRAFICO',                                    image: positionsImage,    ImageHeight: 'max-h-64' , componentHeight: 'h-64' , leftContainerSpan: 'col-span-7' , rightContainerSpan: 'col-span-3' },
    6: { component: <BacktestingForm />,                          image: backtestingImage,  ImageHeight: 'h-32' , componentHeight: 'h-64' , leftContainerSpan: 'col-span-7' , rightContainerSpan: 'col-span-3' },
    7: { component: null,                                         image: null,              ImageHeight: 'max-h-full' , componentHeight: 'h-64' , leftContainerSpan: 'col-span-7' , rightContainerSpan: 'col-span-3' },
  };

  // Extraer los valores correspondientes al tab seleccionado
  const { component, image, ImageHeight, componentHeight, leftContainerSpan, rightContainerSpan } = tabContentMap[selectedTab];

  return (
    <div className="relative bg-african_violet-600">
      <LoadingOverlay isLoading={loading} />
      
      <div className="grid grid-cols-10 gap-1 ">
        {/* LEFT - Contenedor del gráfico y el indicador estocástico*/}
        <div className={`" ${leftContainerSpan} flex flex-col bg-white p-2 rounded-br-lg mt-1 "`}>
          <div
            ref={chartContainerRef}
            className="h-96 flex-grow rounded-t-lg overflow-hidden"
          ></div>
          <div
            ref={stochasticChartContainerRef}
            className="h-32 flex-grow mt-2 rounded-b-lg overflow-hidden border-t-1 border-african_violet-700 mr-3"
          ></div>
        </div>
    
        {/* RIGHT - Contenedor del tab seleccionado */}
        <div className={`" ${rightContainerSpan} flex flex-col bg-african_violet-600 rounded-bl-lg mt-1 "`}> 
          <div id="box-cambiadora" className="flex flex-col justify-center flex-grow min-h-full">
            
            {/* Muestra la imagen correspondiente al tab seleccionado */}            
            <div className={`" flex justify-center w-full ${ImageHeight} "`}>
              {image && (
                <img
                  src={image}
                  alt={` Banner for tab ${selectedTab} `}
                  className="object-cover"  // Utiliza ImageHeight definido para controlar la altura
                />
              )}
            </div>

            {/* Muestra el contenido correspondiente al tab seleccionado */}
            <div className={`" flex-auto ${componentHeight} bg-african_violet-300 rounded-lg "`}>
              {component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChartsContainer;
