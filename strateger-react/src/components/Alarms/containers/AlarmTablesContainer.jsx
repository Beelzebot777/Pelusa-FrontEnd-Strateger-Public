// Path: strateger-react/src/components/Alarms/containers/AlarmContainer.js

// React and Redux
import React from 'react';
import { useSelector } from 'react-redux';

// Headless UI
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';

// Components
import AlarmTab from '../components/AlarmTab';
import AlarmTable from '../components/AlarmTable/AlarmTable';
import LoadingOverlay from '../../common/LoadingOverlay/LoadingOverlay';
import ErrorMessage from '../../common/ErrorMessage';

// Hooks
import useFetchAlarms from '../hooks/useFetchAlarms';  
import useFilterAlarmsByIntervalAndType from '../hooks/useFilterAlarmsByIntervalAndType';
import useFilterAlarmsByInterval from '../hooks/useFilterAlarmsByInterval';

import { selectAlarmsLoading, selectAlarmsError, selectAlarmsData, selectFilteredByIntervalAlarms, selectFilteredByIntervalAndTypeAlarms, selectFilteredByClickAlarms } from '../../../redux/alarm';

const AlarmTablesContainer = () => {    
  const loading = useSelector(selectAlarmsLoading);
  const error = useSelector(selectAlarmsError);
  const dataAlarms = useSelector(selectAlarmsData);

  const filteredByIntervalAlarms = useSelector(selectFilteredByIntervalAlarms);
  const filteredByIntervalAndTypeAlarms = useSelector(selectFilteredByIntervalAndTypeAlarms);
  const filteredByClickAlarms = useSelector(selectFilteredByClickAlarms);

  useFetchAlarms();                         // Hook para obtener las alarmas desde la API
  useFilterAlarmsByInterval();              // Hook para filtrar alarmas por intervalo
  useFilterAlarmsByIntervalAndType();       // Hook para filtrar alarmas por intervalo y tipo

  if (error) {
    return <ErrorMessage message={error}/>;
  }  

  return (
    <div className="relative">
      <LoadingOverlay isLoading={loading} />
      <div className="text-sm">
        <TabGroup>
          <TabList className="flex justify-start bg-african_violet-300">
            <AlarmTab tabName="Alarms"/>
            <AlarmTab tabName="Selected Alarms"/>
            <AlarmTab tabName="Filtered by Selected Interval"/>
            <AlarmTab tabName="Filtered by Selected Interval and Type"/>            
          </TabList>
          <TabPanels>
            <TabPanel>
              <AlarmTable                
                data={dataAlarms}                                                
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={filteredByClickAlarms}                                                
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={filteredByIntervalAlarms}                                                
              />
            </TabPanel>
            <TabPanel>
              <AlarmTable                
                data={filteredByIntervalAndTypeAlarms}                                                
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>        
      </div>
    </div>
  );
};

export default AlarmTablesContainer;
