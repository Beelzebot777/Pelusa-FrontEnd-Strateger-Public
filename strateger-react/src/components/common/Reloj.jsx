// Path: strateger-react/src/components/Reloj.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from '@headlessui/react';
import { updateTime } from 'reduxStore/time/timeSlice';
import { format } from 'date-fns';

const Reloj = ({ direction = 'up' }) => {
  const dispatch = useDispatch();
  const { localTime, chinaTime, usTime, germanyTime } = useSelector((state) => state.time);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const formatTime = (time) => format(new Date(time), 'HH:mm:ss');

  const tradingHours = {
    China: { open: '09:30', close: '15:00' },
    US: { open: '09:30', close: '16:00' },
    Germany: { open: '09:00', close: '17:30' }
  };

  const isMarketOpen = (currentTime, market) => {
    const [currentHour, currentMinute] = format(new Date(currentTime), 'HH:mm').split(':');
    const currentTotalMinutes = parseInt(currentHour) * 60 + parseInt(currentMinute);

    const [openHour, openMinute] = tradingHours[market].open.split(':');
    const openTotalMinutes = parseInt(openHour) * 60 + parseInt(openMinute);

    const [closeHour, closeMinute] = tradingHours[market].close.split(':');
    const closeTotalMinutes = parseInt(closeHour) * 60 + parseInt(closeMinute);

    return currentTotalMinutes >= openTotalMinutes && currentTotalMinutes <= closeTotalMinutes;
  };

  const popoverPosition = direction === 'up' ? 'bottom-full mb-2' : 'top-full';

  return (
    <div className="h-full w-40 flex justify-center items-center hover:bg-african_violet-600 " >
      <Popover className="relative h-full w-full">
        <Popover.Button className="h-full w-full font-semibold text-african_violet-900 hover:text-white transition-colors duration-300">
          {formatTime(localTime)}
        </Popover.Button>
        <Popover.Panel className={`absolute bg-african_violet-100/95 shadow-lg rounded-sm p-4 space-y-4 z-50 ${popoverPosition}`}>
          <div className="mb-2" style={{ color: isMarketOpen(chinaTime, 'China') ? '#16A34A' : '#DC2626' }}>
            <strong>China: </strong>
            {formatTime(chinaTime)}
          </div>
          <div className="mb-2" style={{ color: isMarketOpen(usTime, 'US') ? '#16A34A' : '#DC2626' }}>
            <strong>Estados Unidos: </strong>
            {formatTime(usTime)}
          </div>
          <div className="mb-2" style={{ color: isMarketOpen(germanyTime, 'Germany') ? '#16A34A' : '#DC2626' }}>
            <strong>Alemania: </strong>
            {formatTime(germanyTime)}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default Reloj;
