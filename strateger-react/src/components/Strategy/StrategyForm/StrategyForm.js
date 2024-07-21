import React, { useState, useEffect, Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition, Popover, Tab } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import DirectionTabOptions from './DirectionTabOptions';
import TPSLOptions from './TPSLOptions';

const tickers = ['BTCUSDT.PS', 'ETH-USD'];

const StrategyForm = ({ strategy, onSave, onCancel }) => {
  const [formState, setFormState] = useState({
    alarmName: '',
    isOn: false,
    account_name: '',
    account_type: '',
    ticker: tickers[0],
    resultadoAcc: '',
    description: '',
    onStartDate: '',
    offEndDate: '',
    longEntryOrder: '',
    longCloseOrder: '',
    longEntryIndicator: '',
    longCloseIndicator: '',
    longPyramiding: '',
    longLeverage: '',
    longQuantity: '',
    longTPPerOrder: '',
    longTPGeneral: '',
    longSLPerOrder: '',
    longSLGeneral: '',
    shortEntryOrder: '',
    shortCloseOrder: '',
    shortEntryIndicator: '',
    shortCloseIndicator: '',
    shortPyramiding: '',
    shortLeverage: '',
    shortQuantity: '',
    shortTPPerOrder: '',
    shortTPGeneral: '',
    shortSLPerOrder: '',
    shortSLGeneral: ''
  });

  useEffect(() => {
    if (strategy) {
      setFormState(strategy);
    }
  }, [strategy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleTickerChange = (ticker) => {
    setFormState({
      ...formState,
      ticker
    });
  };

  const formatDateString = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];
    return `${formattedDate} ${formattedTime}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const adjustedFormState = {
      ...formState,
      onStartDate: formatDateString(formState.onStartDate),
      offEndDate: formatDateString(formState.offEndDate),
      longPyramiding: formState.longPyramiding === '' ? 0 : parseInt(formState.longPyramiding, 10),
      longLeverage: formState.longLeverage === '' ? 0 : parseFloat(formState.longLeverage),
      longQuantity: formState.longQuantity === '' ? 0 : parseFloat(formState.longQuantity),
      longTPPerOrder: formState.longTPPerOrder === '' ? 0 : parseFloat(formState.longTPPerOrder),
      longTPGeneral: formState.longTPGeneral === '' ? 0 : parseFloat(formState.longTPGeneral),
      longSLPerOrder: formState.longSLPerOrder === '' ? 0 : parseFloat(formState.longSLPerOrder),
      longSLGeneral: formState.longSLGeneral === '' ? 0 : parseFloat(formState.longSLGeneral),
      shortPyramiding: formState.shortPyramiding === '' ? 0 : parseInt(formState.shortPyramiding, 10),
      shortLeverage: formState.shortLeverage === '' ? 0 : parseFloat(formState.shortLeverage),
      shortQuantity: formState.shortQuantity === '' ? 0 : parseFloat(formState.shortQuantity),
      shortTPPerOrder: formState.shortTPPerOrder === '' ? 0 : parseFloat(formState.shortTPPerOrder),
      shortTPGeneral: formState.shortTPGeneral === '' ? 0 : parseFloat(formState.shortTPGeneral),
      shortSLPerOrder: formState.shortSLPerOrder === '' ? 0 : parseFloat(formState.shortSLPerOrder),
      shortSLGeneral: formState.shortSLGeneral === '' ? 0 : parseFloat(formState.shortSLGeneral),
    };
      
    onSave(adjustedFormState);
  };

  const toggleButton = () => {
    setFormState({
      ...formState,
      isOn: !formState.isOn
    });
  };

  const longTPFields = [
    { label: 'TP per Order', name: 'longTPPerOrder' },
    { label: 'TP General', name: 'longTPGeneral' }
  ];

  const longSLFields = [
    { label: 'SL per Order', name: 'longSLPerOrder' },
    { label: 'SL General', name: 'longSLGeneral' }
  ];

  const shortTPFields = [
    { label: 'TP per Order', name: 'shortTPPerOrder' },
    { label: 'TP General', name: 'shortTPGeneral' }
  ];

  const shortSLFields = [
    { label: 'SL per Order', name: 'shortSLPerOrder' },
    { label: 'SL General', name: 'shortSLGeneral' }
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 mb-4">
      <div className="grid grid-cols-10 gap-4 border border-gray-300 p-4 rounded-lg shadow-md">
        <div className="col-span-4 border border-gray-300 p-4 rounded-lg shadow-md">
          <div className='grid grid-cols-6 gap-4'>            

            <div className="col-span-2">
              <button
                type="button"
                className={`mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 text-center ${formState.isOn ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                onClick={toggleButton}
              >
                {formState.isOn ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="col-span-4">
              <div className="mb-4">
                <input
                  type="text"
                  name="alarmName"
                  value={formState.alarmName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 gap-4">
              <div className="mb-4">
                <Menu as="div" className="relative inline-block text-left w-full">
                  <div>
                    <MenuButton className="inline-flex justify-between w-full border border-gray-300 rounded-md shadow-sm p-2 text-left bg-white text-gray-700 hover:bg-gray-50">
                      {formState.ticker}
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {tickers.map((ticker) => (
                        <MenuItem key={ticker}>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => handleTickerChange(ticker)}
                              className={`${
                                active ? 'bg-blue-100' : ''
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {ticker}
                            </button>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="col-span-1 gap-4">
              <div className="mb-4">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className={`mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 text-left ${open ? '' : 'bg-white'}`}>
                        Asociar Account
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md p-4">
                          <div className="mb-2">
                            <label className="block text-gray-700">NAME ACCOUNT</label>
                            <input
                              type="text"
                              name="account_name"
                              value={formState.account_name}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                          </div>
                          <div className="mb-2">
                            <label className="block text-gray-700">TYPE ACCOUNT:</label>
                            <input
                              type="text"
                              name="account_type"
                              value={formState.account_type}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 gap-4">
              <div className="mb-4">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className="mt-1 w-full h-20 border border-gray-300 rounded-md shadow-sm p-2 text-left">
                        Descripción
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md p-4">
                          <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                            Esto es una descripción bla bla bla
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">On Start Date</label>
            <input
              type="datetime-local"
              name="onStartDate"
              value={formState.onStartDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Off End Date</label>
            <input
              type="datetime-local"
              name="offEndDate"
              value={formState.offEndDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </div>

        <div id="long-short" className="col-span-6 border border-gray-300 p-4 rounded-lg shadow-md">
          <Tab.Group>
            <Tab.List className="flex space-x-1 bg-black p-1 rounded-lg">
              {['Long', 'Long TP', 'Long SL', 'Short', 'Short TP', 'Short SL'].map((tab, index) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
                    ${selected ? 'bg-white shadow text-black-700' : 'text-white hover:bg-white/[0.12]'}
                    ${index < 3 ? 'bg-green-500' : 'bg-red-500'}`
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className="bg-white rounded-lg p-3">
                <DirectionTabOptions prefix="Long" formState={formState} handleChange={handleChange} />
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-lg p-3">
                <TPSLOptions formState={formState} handleChange={handleChange} fields={longTPFields} />
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-lg p-3">
                <TPSLOptions formState={formState} handleChange={handleChange} fields={longSLFields} />
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-lg p-3">
                <DirectionTabOptions prefix="Short" formState={formState} handleChange={handleChange} />
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-lg p-3">
                <TPSLOptions formState={formState} handleChange={handleChange} fields={shortTPFields} />
              </Tab.Panel>
              <Tab.Panel className="bg-white rounded-lg p-3">
                <TPSLOptions formState={formState} handleChange={handleChange} fields={shortSLFields} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>

      </div>
    </form>
  );
};

export default StrategyForm;
