
import  AlarmFiltersPanelContainer  from './AlarmFiltersPanelContainer';
import MainChart from '../../Charts/MainChart/MainChart';
import AlarmTablesContainer from "./AlarmTablesContainer";
import AlarmInfoPanel from './AlarmInfoPanel';

const AlarmContainer = () => {
    return (
        <div className="flex flex-col">            
            <div className='grid grid-cols-10'>
                <div className='col-span-6'>
                    <MainChart/>
                </div>
                <div className='flex flex-col h-full col-span-4'>
                    <div className='h-92 mt-1 mr-1 mb-1'>                        
                        <AlarmInfoPanel/>
                    </div>
                    <div className='h-full mr-1 mb-1'>
                        <AlarmFiltersPanelContainer/>                
                    </div>
                </div>
            </div>
            <div className='mr-1'>
                <AlarmTablesContainer/>            
            </div>
        </div>
    );
};

export default AlarmContainer;