// App.js
import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTab, selectSelectedTab } from './slices/tabSlice';
import Alarms from './components/Alarms/Alarms';
import Orders from './components/Orders/Orders';
import LightweightChart from './components/TradingViewChart/LightweightChart';
import { StrategyList } from './components/Strategy';
import { Diary } from './components/Diary';
import { Account } from './components/Account';
import { Position } from './components/Positions';
import Reloj from './components/Reloj';

const App = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(selectSelectedTab);
  const initialTemporalidad = '1d'; // Define el intervalo inicial como '1d'

  // Obtener la fecha actual y formatearla
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString();

  // Calcular la fecha de inicio (1000 días antes de la fecha actual)
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 1000);
  const formattedStartDate = startDate.toISOString();

  const handleTabChange = (index) => {
    dispatch(setSelectedTab(index));
  };

  return (
    <div>
      <div className="border-4 border-orange-500">
        <TabGroup selectedIndex={selectedTab} onChange={handleTabChange}>
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
              Positions
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
          <div className="border-4 border-blue-500 mt-2">
            <div className="border-4 border-green-500">
              <LightweightChart
                initialTemporalidad={initialTemporalidad}
                initialStartDate={formattedStartDate}
                initialEndDate={formattedCurrentDate}
              />
            </div>
          </div>
          <TabPanels className="mt-2">
            <TabPanel className="bg-white rounded-xl p-3">
              <Alarms />
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
              <Position />
            </TabPanel>
            <TabPanel className="bg-white rounded-xl p-3">
              Backtesting
            </TabPanel>
            <TabPanel className="bg-white rounded-xl p-3">
              Configuracion
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <div className="fixed bottom-4 right-20">
        <Reloj direction="up" /> {/* Cambia a "down" si quieres que el Popover se despliegue hacia abajo */}
      </div>
    </div>
  );
};

export default App;
