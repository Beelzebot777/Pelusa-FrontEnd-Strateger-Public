//Path: src/components/Alarms/containers/AlarmInfoPanel.jsx

import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import AlarmTab from 'Alarms/components/AlarmTab';
import AlarmsBarChart from 'Alarms/components/AlarmInfoPanel/AlarmsBarChart/AlarmsBarChart';
import AlarmsRadarChat from 'Alarms/components/AlarmInfoPanel/AlarmsRadarChart/AlarmsRadarChart';
import AlarmOverviewPanel from 'Alarms/components/AlarmInfoPanel/AlarmOverviewPanel/AlarmOverviewPanel';

import getHourlyAlarmCounts from 'Alarms/utils/getHourlyAlarmCounts';

const AlarmInfoPanelContainer = ({alarmsData, filteredByClickAlarmsData, filteredByOptionsAlarmsData}) => {    

    const alarmsByHourArray = getHourlyAlarmCounts(alarmsData);
    const alarmsByHourFilteredByClickArray = getHourlyAlarmCounts(filteredByClickAlarmsData);
    const alarmsByHourFilteredByOptionsArray = getHourlyAlarmCounts(filteredByOptionsAlarmsData);
    
    return(
        <div className='h-full bg-african_violet-200 p-2' data-testid="alarm-info-panel-container">            
            <TabGroup data-testid="alarm-info-tab-group">
                <TabList className="flex justify-center w-full " data-testid="alarm-info-tab-list">
                    {/* Tab for Radar Chart */}
                    <AlarmTab   
                        tabName="Alarms By Time"  
                        data-testid="alarm-tab-alarm-by-time"                      
                    />          
                    {/* Tab for Overview Panel */}          
                    <AlarmTab
                        tabName="Overview" 
                        data-testid="alarm-tab-general-statistics"                     
                    />
                    {/* Tab for Bar Chart */}
                    <AlarmTab
                        tabName="Alarms By Month" 
                        data-testid="alarm-tab-alarm-by-month"                      
                    />
                </TabList>
                <TabPanels data-testid="alarm-info-tab-panels">
                    <TabPanel data-testid="alarm-info-tab-panel-alarm-by-time">
                        <AlarmsRadarChat 
                            alarmsByHour={alarmsByHourArray}
                            alarmsByHourFilteredByClick={alarmsByHourFilteredByClickArray}
                            alarmsByHourFilteredByOptions={alarmsByHourFilteredByOptionsArray}
                            data-testid="chart-alarms-by-time"
                        />                                               
                    </TabPanel>
                    <TabPanel data-testid="alarm-info-tab-panel-general-statistics">
                        <AlarmOverviewPanel data-testid="general-statistics"/>
                    </TabPanel>
                    <TabPanel data-testid="alarm-info-tab-panel-alarm-by-month">
                        <AlarmsBarChart 
                            alarmsData={alarmsData}
                            data-testid="chart-alarms-by-month"
                        />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
    

        </div>
    )
}

export default AlarmInfoPanelContainer;
