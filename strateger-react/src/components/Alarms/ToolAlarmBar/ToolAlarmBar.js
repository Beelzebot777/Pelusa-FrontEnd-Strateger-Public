// ToolAlarmBar.js
import React from 'react';
import TemporalidadButton from './TemporalidadButton';
import TypeButton from './TypeButton';
import { useDispatch, useSelector } from 'react-redux';
import { incrementTemporalidad, decrementTemporalidad, selectFilteredTemporalidades, setSelectedTemporalidad, setSelectedTypes, selectSelectedTemporalidad, selectSelectedTypes } from '../../../slices/alarmSlice';

const temporalidades = ['1m', '5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'];
const types = [
  'order open long', 'order close long', 
  'order open short', 'order close short', 
  'indicator open long', 'indicator close long', 
  'indicator open short', 'indicator close short'
];

const ToolAlarmBar = () => {
  const dispatch = useDispatch();
  const selectedTemporalidad = useSelector(selectSelectedTemporalidad);
  const selectedTypes = useSelector(selectSelectedTypes);
  const filteredTemporalidades = useSelector(selectFilteredTemporalidades);

  const toggleType = (type) => {
    const types = selectedTypes[selectedTemporalidad] || [];
    let updatedTypes;
    if (types.includes(type)) {
      updatedTypes = types.filter(t => t !== type);
      dispatch(decrementTemporalidad(selectedTemporalidad));
    } else {
      updatedTypes = [...types, type];
      dispatch(incrementTemporalidad(selectedTemporalidad));
    }
    dispatch(setSelectedTypes(updatedTypes));
  };

  const toggleTemporalidad = (temp) => {
    dispatch(setSelectedTemporalidad(temp));
  };

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-4 border-2 border-blue-500 flex flex-wrap justify-center items-center">
        {temporalidades.map(temp => (
          <TemporalidadButton
            key={temp}
            temporalidad={temp}
            selectedTemporalidad={selectedTemporalidad}
            filteredTemporalidades={filteredTemporalidades}
            toggleTemporalidad={toggleTemporalidad}
          />
        ))}
      </div>
      <div className="col-span-6 border-2 border-green-500 flex flex-wrap justify-center items-center">
        <div className="w-full md:w-1/2 border-r-2 border-gray-300 flex flex-wrap justify-center items-center">
          <div className="w-full text-center mb-2 font-bold">Long - Orders</div>
          {types.filter(type => type.includes('long') && type.includes('order')).map(type => (
            <TypeButton
              key={type}
              type={type}
              selectedTypes={selectedTypes[selectedTemporalidad] || []}
              toggleType={toggleType}
            />
          ))}
          <div className="w-full text-center mb-2 font-bold">Long - Indicators</div>
          {types.filter(type => type.includes('long') && type.includes('indicator')).map(type => (
            <TypeButton
              key={type}
              type={type}
              selectedTypes={selectedTypes[selectedTemporalidad] || []}
              toggleType={toggleType}
            />
          ))}
        </div>
        <div className="w-full md:w-1/2 flex flex-wrap justify-center items-center">
          <div className="w-full text-center mb-2 font-bold">Short - Orders</div>
          {types.filter(type => type.includes('short') && type.includes('order')).map(type => (
            <TypeButton
              key={type}
              type={type}
              selectedTypes={selectedTypes[selectedTemporalidad] || []}
              toggleType={toggleType}
            />
          ))}
          <div className="w-full text-center mb-2 font-bold">Short - Indicators</div>
          {types.filter(type => type.includes('short') && type.includes('indicator')).map(type => (
            <TypeButton
              key={type}
              type={type}
              selectedTypes={selectedTypes[selectedTemporalidad] || []}
              toggleType={toggleType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolAlarmBar;
