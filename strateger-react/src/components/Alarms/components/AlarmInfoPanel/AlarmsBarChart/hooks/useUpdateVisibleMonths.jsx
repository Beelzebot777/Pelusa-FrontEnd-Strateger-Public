  // useEffect para actualizar visibleMonths solo cuando alarmsData cambia

import { useEffect, useState } from 'react';
import { useCallback } from 'react';

const useUpdateVisibleMonths = ({alarmsData, monthsLabels}) => {

    const [visibleMonths, setVisibleMonths] = useState(() => Array(12).fill(false));
         
    const detectMonthsWithAlarms = (organizedDataByMonth) => {
        return organizedDataByMonth.map(monthData => 
            Object.keys(monthData).some(key => key !== 'month' && monthData[key] > 0)
        );
    };

    const toggleMonth = useCallback((index) => {
        setVisibleMonths((prevVisibleMonths) => {
          const newVisibleMonths = [...prevVisibleMonths];
          newVisibleMonths[index] = !newVisibleMonths[index];
          return newVisibleMonths;
        });
    }, []);
        
    useEffect(() => {

        const organizeIntervalCountsByMonth = (intervalCounts) => {
            const organizedData = Array(12).fill(null).map((_, index) => ({
                month: monthsLabels[index],
            }));
            
            Object.keys(intervalCounts).forEach(interval => {
                intervalCounts[interval].forEach((count, monthIndex) => {
                organizedData[monthIndex][interval] = count;
                });
            });
            
            return organizedData;
        };


        if (alarmsData && alarmsData.length > 0) {
        const intervalCounts = {
            '5m': Array(12).fill(0),
            '15m': Array(12).fill(0),
            '30m': Array(12).fill(0),
            '1h': Array(12).fill(0),
            '4h': Array(12).fill(0),
            'D': Array(12).fill(0),
            'W': Array(12).fill(0),
            'M': Array(12).fill(0),
        };

        alarmsData.forEach(alarm => {
            const month = new Date(alarm.Time_Alert).getMonth();
            const interval = alarm.Interval;

            if (intervalCounts[interval]) {
            intervalCounts[interval][month] += 1;
            }
        });

        const organizedDataByMonth = organizeIntervalCountsByMonth(intervalCounts);
        const monthsWithAlarms = detectMonthsWithAlarms(organizedDataByMonth);

        setVisibleMonths(monthsWithAlarms);
        }
    }, [alarmsData, monthsLabels]);

    return {visibleMonths, toggleMonth};
}

export default useUpdateVisibleMonths;