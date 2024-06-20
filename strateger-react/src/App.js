// Path: strateger-react/src/App.js

import React, { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import AlarmList from './components/AlarmList';
import Orders from './components/Orders/Orders';
import LightweightChart from './components/TradingViewChart/LightweightChart';
import StrategyList from './components/Strategy/StrategyList';
import Diary from './components/Diary/Diary';
import Account from './components/Account/Account';
import Backtesting from './components/Backtesting/Backtesting';

const App = () => {
  const initialTemporalidad = '1d';  // Define el intervalo inicial como '1d'
  
  // Obtener la fecha actual y formatearla
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

  // Calcular la fecha de inicio (1440 días antes de la fecha actual)
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 1000);
  const formattedStartDate = startDate.toISOString().slice(0, 19).replace('T', ' ');

  const [startDateState] = useState(formattedStartDate);
  const [endDate] = useState(formattedCurrentDate);

  return (
    <div>
      <div className="grid grid-cols-1 gap-10">
        <div className="border-4 border-blue-500">
          <div className="border-4 border-green-500">
            <LightweightChart 
              initialTemporalidad={initialTemporalidad}
              initialStartDate={startDateState}
              initialEndDate={endDate}
            />
          </div>
        </div>
      </div>
      <div className="border-4 border-orange-500">
        <TabGroup>
          <TabList className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Alarmas
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Órdenes
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Estrategias
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Diario
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Account
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Backtesting
            </Tab>
            <Tab className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
              ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
            }>
              Configuracion
            </Tab>
          </TabList>
          <TabPanels className="mt-2">
            <TabPanel className="bg-white rounded-xl p-3">
              <AlarmList />
            </TabPanel>
            <TabPanel className="bg-white rounded-xl p-3">
              <Orders />
            </TabPanel>
            <TabPanel className="bg-white rounded-xl p-3">
              <StrategyList />
            </TabPanel>
            <TabPanel className="bg-white rounded-xl p-3">
              <Diary />
            </TabPanel>
            <TabPanel className="bg-white rounded-xl p-3">
              <Account />
            </TabPanel>
            <TabPanel className="bg-white rounded-xl p-3">
              <Backtesting />
            </TabPanel>
            <TabPanel className="bg-white rounded-xl p-3">
              Configuracion
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default App;
