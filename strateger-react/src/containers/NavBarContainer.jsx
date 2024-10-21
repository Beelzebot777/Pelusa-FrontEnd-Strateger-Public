
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

import { setSelectedTab, selectSelectedTab } from '../redux/tab/tabSlice';
import Alarms from '../components/Alarms/Alarms';
import Orders from '../components/Orders/Orders';
import { StrategyCard } from '../components/Strategy';
import { Diary } from '../components/Diary';
import { Account } from '../components/Account';
import { Position } from '../components/Positions';
import { Backtesting } from '../components/Backtesting';

const NavBarContainer = () => {
    const dispatch = useDispatch();
  
    const selectedTab = useSelector(selectSelectedTab);

    const handleTabChange = (index) => {
        dispatch(setSelectedTab(index));
    };

    return (
        <>
            <TabGroup selectedIndex={selectedTab} onChange={handleTabChange}>
                <TabList className="flex">
                    {[
                    'Alarmas',
                    'Órdenes',
                    'Estrategias',
                    'Diario',
                    'Account',
                    'Positions',
                    'Backtesting',
                    'Configuración',
                    ].map((tabName, index) => (
                    <Tab
                        key={index}
                        className={({ selected }) =>
                        `w-full h-full p-4 text-sm font-medium transition-colors duration-200
                        ${
                            selected
                            ? 'bg-african_violet-400 text-african_violet-900'
                            : 'bg-african_violet-200 text-african_violet-700 hover:text-african_violet-900'
                        }`
                        }
                    >
                        {tabName}
                    </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Alarms/>
                    </TabPanel>
                    <TabPanel>
                        <Orders/>
                    </TabPanel>
                    <TabPanel>
                        <StrategyCard/>
                    </TabPanel>
                    <TabPanel >
                        <Diary/>
                    </TabPanel>
                    <TabPanel>
                        <Account/>
                    </TabPanel>
                    <TabPanel >
                        <Position/>
                    </TabPanel>
                    <TabPanel>
                        <Backtesting/>
                    </TabPanel>
                    <TabPanel>
                        Configuración
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </>
    );
};

export default NavBarContainer