import React, { useState } from 'react';

const StrategyItem = ({ strategy, onSelect, isSelected, onAdd }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="border-b border-gray-200 py-2">
      <div className="flex justify-between items-center">
        <div className="cursor-pointer" onClick={handleToggle}>
          <span className={isSelected ? 'font-bold' : ''}>{strategy.name}</span>
        </div>
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
          onClick={() => onAdd("Strategy:"+strategy.id)}
        >
          Agregar
        </button>
      </div>
      {expanded && (
        <div className="mt-2">
          <div><strong>Ticker:</strong> {strategy.ticker}</div>
          <div><strong>On Start Date:</strong> {strategy.onStartDate}</div>
          <div><strong>Off End Date:</strong> {strategy.offEndDate}</div>
          <div><strong>Long Entry Order:</strong> {strategy.longEntryOrder}</div>
          <div><strong>Long Close Order:</strong> {strategy.longCloseOrder}</div>
          <div><strong>Long Entry Indicator:</strong> {strategy.longEntryIndicator}</div>
          <div><strong>Long Close Indicator:</strong> {strategy.longCloseIndicator}</div>
          <div><strong>Long Pyramiding:</strong> {strategy.longPyramiding}</div>
          <div><strong>Long Leverage:</strong> {strategy.longLeverage}</div>
          <div><strong>Long Quantity:</strong> {strategy.longQuantity}</div>
        </div>
      )}
    </div>
  );
};

export default StrategyItem;
