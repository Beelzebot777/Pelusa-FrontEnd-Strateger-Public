//Path: strateger-react/src/components/Diary/AlarmItem.js

import React, { useState } from 'react';

const AlarmItem = ({ alarm, onSelect, isSelected, onAdd }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };  

  return (
    <div className="border-b border-african_violet-300 py-2">
      <div className="flex justify-between items-center">
        <div className="cursor-pointer" onClick={handleToggle}>
          <span className={isSelected ? 'font-bold' : ''}>[{alarm.id}]-[{alarm.Time_Alert}]-[{alarm.Interval}]-[{alarm.Order}] </span>
        </div>
        <button
          type="button" 
          className="ml-4 bg-african_violet-400 hover:bg-african_violet-700 text-white px-2 py-1 rounded"   
          onClick={() => onAdd("Alarm:"+alarm.id)}
        >
          Agregar
        </button>
      </div>
      {expanded && (
        <div className="">
          <div><strong>Id:</strong> {alarm.id}</div>
          <div><strong>Temporalidad:</strong> {alarm.Interval}</div>
          <div><strong>Quantity:</strong> {alarm.Quantity}</div>
          <div><strong>Entry Price Alert:</strong> {alarm.Entry_Price_Alert}</div>
          <div><strong>Exit Price Alert:</strong> {alarm.Exit_Price_Alert}</div>
          <div><strong>Time Alert:</strong> {alarm.Time_Alert}</div>
          <div><strong>Order:</strong> {alarm.Order}</div>
          <div><strong>Strategy:</strong> {alarm.Strategy}</div>
        </div>
      )}



    </div>
  );
};

export default AlarmItem;
