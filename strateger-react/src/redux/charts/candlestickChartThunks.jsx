
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config';
import { addMinutes, addHours, subMinutes, subHours } from 'date-fns';


const adjustDates = (interval, startDate, endDate) => {
    let expandedStartDate = new Date(startDate);
    let expandedEndDate = new Date(endDate);
  
    switch (interval) {
      case '1':
        interval = '1m';
        break;
      case '1m':
      case '5m':
      case '15m':
      case '30m':
        expandedStartDate = subMinutes(expandedStartDate, 5);
        expandedEndDate = addMinutes(expandedEndDate, 5);
        break;
      case '1h':
        expandedStartDate = subHours(expandedStartDate, 5);
        expandedEndDate = addHours(expandedEndDate, 5);
        break;
      case '4h':
        expandedStartDate = subHours(expandedStartDate, 20);
        expandedEndDate = addHours(expandedEndDate, 20);
        break;
      case '1d':
        expandedStartDate = subHours(expandedStartDate, 120);
        expandedEndDate = addHours(expandedEndDate, 120);
        break;
      case '1w':
        expandedStartDate = subHours(expandedStartDate, 840);
        expandedEndDate = addHours(expandedEndDate, 840);
        break;
      case '1M':
        expandedStartDate = subHours(expandedStartDate, 3600);
        expandedEndDate = addHours(expandedEndDate, 3600);
        break;
      default:
        throw new Error('Invalid interval');
    }
  
    return { interval, expandedStartDate, expandedEndDate };
  };

  export const fetchCandlestickChartData = createAsyncThunk(
    'candlestickChart/fetchCandlestickChartData',
    async ({ interval = '5m', startDate, endDate, ticker = 'BTC-USDT' }, { rejectWithValue }) => {
      try {
        // Manejo de valores predeterminados para fechas
        let adjustedStartDate = startDate;
        let adjustedEndDate = endDate;
  
        adjustedStartDate = startDate || new Date(); // Fecha actual si no hay startDate
        adjustedEndDate = endDate || new Date();    // Fecha actual si no hay endDate
          
        // Validar fechas ajustadas
        if (!adjustedStartDate || !adjustedEndDate || new Date(adjustedStartDate) >= new Date(adjustedEndDate)) {
          return rejectWithValue('Invalid date range');
        }
  
        // Ajustar las fechas según el intervalo
        const { interval: adjustedInterval, expandedStartDate, expandedEndDate } = adjustDates(
          interval,
          adjustedStartDate,
          adjustedEndDate
        );
  
        // Llamada a la API
        const response = await axios.get(`${config.apiURL}/bingx/main/get-k-line-data`, {
          params: {
            symbol: ticker,
            interval: adjustedInterval,
            limit: "1440",
            start_date: expandedStartDate.toISOString().slice(0, 19).replace('T', ' '),
            end_date: expandedEndDate.toISOString().slice(0, 19).replace('T', ' ')
          }
        });
  
        const resultData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  
        if (resultData.code === 0) {
          const formattedData = resultData.data
            .map(item => [
              new Date(item.time).getTime(),
              parseFloat(item.open),
              parseFloat(item.high),
              parseFloat(item.low),
              parseFloat(item.close)
            ])
            .filter(item => !isNaN(item[0]));
  
          formattedData.sort((a, b) => a[0] - b[0]);
  
          const currentBTCPrice = formattedData[formattedData.length - 1]?.[4] || null;
  
          return { formattedData, currentBTCPrice };
        } else {
          return rejectWithValue(resultData.msg || 'Unknown error from API');
        }
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );