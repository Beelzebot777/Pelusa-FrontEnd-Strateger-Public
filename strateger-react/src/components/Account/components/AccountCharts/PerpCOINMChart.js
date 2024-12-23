// Path: strateger-react/src/components/Account/AccountCharts/PerpCOINMChart.js

import React, { useState, useEffect } from 'react';
import ContenedorChartWallet from '../common/ContenedorChartWallet';

const PerpCOINMChart = ({ 
  balanceCOINMAccount,  
  ChartComponent, 
  Legend,   
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (balanceCOINMAccount.length > 0) {
      setIsLoading(false);
    }
  }, [balanceCOINMAccount]);

  const balanceData = balanceCOINMAccount
    .map((account) => ({
      time: new Date(account.dateTime).getTime() / 1000,
      value: account.balance,
    }))
    .sort((a, b) => a.time - b.time);

  const unrealizedProfitData = balanceCOINMAccount
    .map((account) => ({
      time: new Date(account.dateTime).getTime() / 1000,
      value: account.unrealizedProfit,
    }))
    .sort((a, b) => a.time - b.time);

  const equityData = balanceCOINMAccount
    .map((account) => ({
      time: new Date(account.dateTime).getTime() / 1000,
      value: account.equity,
    }))
    .sort((a, b) => a.time - b.time);

  const seriesData = [
    { name: 'Balance', data: balanceData, color: '#2962FF' },
    { name: 'Unrealized Profit', data: unrealizedProfitData, color: '#FF0000' },
    { name: 'Equity', data: equityData, color: '#00FF00' },
  ];

  const [visibleSeries, setVisibleSeries] = useState(
    seriesData.reduce((acc, series) => {
      acc[series.name] = true;
      return acc;
    }, {})
  );

  const toggleSeriesVisibility = (name) => {
    setVisibleSeries((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const colors = {
    backgroundColor: 'white',
    lineColor: '#2962FF',
    textColor: 'black',
  };

  const priceFormat = {
    type: 'price',
    precision: 8,
    minMove: 0.00000001,
  };

  return (
    <ContenedorChartWallet
      isLoading={isLoading}
      seriesData={seriesData}
      colors={colors}
      priceFormat={priceFormat}
      visibleSeries={visibleSeries}
      toggleSeriesVisibility={toggleSeriesVisibility}
      ChartComponent={ChartComponent}
      Legend={Legend}      
    /> 
  );
};

export default PerpCOINMChart;
