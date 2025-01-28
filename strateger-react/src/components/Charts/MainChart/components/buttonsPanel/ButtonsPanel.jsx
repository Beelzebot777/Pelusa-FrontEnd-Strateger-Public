//Path: src/components/Charts/MainChart/components/buttons/ButtonsPanel.jsx

import ItemChartButton from "../buttons/ItemChartButton";

import { useDispatch, useSelector } from 'react-redux';
import {
    setToggleChartMainButtons,
    setToggleOrderButton,
    setActiveButton,
    setActiveRadarDataset,
} from 'reduxStore/interaction';

import {
    selectAlarmsDataLength,
    selectFilteredByClickAlarmsLength,
    selectFilteredByOptionsAlarmsLength,
} from "reduxStore/alarm";

const ButtonsPanel = ({ buttonsVisilibity, showButtonsPanel }) => {
    const dispatch = useDispatch();    

    const alarmsDataLength = useSelector(selectAlarmsDataLength);
    const filteredByClickAlarmsLength = useSelector(selectFilteredByClickAlarmsLength);
    const filteredByOptionsAlarmsLength = useSelector(selectFilteredByOptionsAlarmsLength);

    const handleAlarmButtonClick = (buttonReduxId) => {
        dispatch(setActiveButton({ buttonReduxId })); // Sincroniza el estado del botón
        dispatch(setActiveRadarDataset(buttonReduxId)); // Cambia el dataset del radar chart
    };

    return (
        <div className="flex flex-col space-y-1">
            {/* Sección: Charts Buttons */}
            {showButtonsPanel.showChartsButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() => dispatch(setToggleChartMainButtons("stochasticButton"))}
                        indicatorName="Stochastic"
                        bgColor={
                            buttonsVisilibity.showStochasticSerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleChartMainButtons("emasButton"))}
                        indicatorName="Emas"
                        bgColor={
                            buttonsVisilibity.showEmasSerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleChartMainButtons("candleStickButton"))}
                        indicatorName="Candlesticks"                        
                        bgColor={
                            buttonsVisilibity.showCandlestickSerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleChartMainButtons("sqzMomentumButton"))}
                        indicatorName="SQZ Momentum"
                        bgColor={
                            buttonsVisilibity.showSQZMOMENTUMSerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleChartMainButtons("adxButton"))}
                        indicatorName="ADX"
                        bgColor={
                            buttonsVisilibity.showAdxSerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleChartMainButtons("bollingerButton"))}
                        indicatorName="Bollinger Bands"
                        bgColor={
                            buttonsVisilibity.showBollingerSerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() =>{                                
                                dispatch(setToggleChartMainButtons("rsiButton"))
                            }
                        }
                        indicatorName="RSI"
                        bgColor={
                            buttonsVisilibity.showRSISerie
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                </div>
            )}

            {/* Sección: Alarms Buttons */}
            {showButtonsPanel.showAlarmsButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() => handleAlarmButtonClick("alarms")}
                        indicatorName={`Alarms (${alarmsDataLength})`}
                        bgColor={
                            buttonsVisilibity.showAlarmsMarkers 
                                ? "bg-african_violet-300" 
                                : "bg-african_violet-500"}
                        disabled={alarmsDataLength === 0}
                    />
                    <ItemChartButton
                        setShow={() => handleAlarmButtonClick("selected")}
                        indicatorName={`Selected Alarms (${filteredByClickAlarmsLength})`}
                        bgColor={
                            buttonsVisilibity.showSelectedAlarmsMarkers 
                                ? "bg-african_violet-300" 
                                : "bg-african_violet-500"
                        }
                        disabled={filteredByClickAlarmsLength === 0}
                    />
                    <ItemChartButton
                        setShow={() => handleAlarmButtonClick("filtered")}
                        indicatorName={`Filtered Alarms (${filteredByOptionsAlarmsLength})`}
                        bgColor={
                            buttonsVisilibity.showFilteredAlarmsMarkers 
                                ? "bg-african_violet-300" 
                                : "bg-african_violet-500"
                        }
                        disabled={filteredByOptionsAlarmsLength === 0}
                    />
                </div>
            )}

            {/* Sección: Orders Buttons */}
            {showButtonsPanel.showOrdersButtonsPanel && (
                <div className="flex space-x-1">
                    <ItemChartButton
                        setShow={() => dispatch(setToggleOrderButton("showOrdersUsdmMarkers"))}
                        indicatorName="Usdm Orders"
                        bgColor={
                            buttonsVisilibity.showOrdersUsdmMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleOrderButton("showOrdersCoinmMarkers"))}
                        indicatorName="Coinm Orders"
                        bgColor={
                            buttonsVisilibity.showOrdersCoinmMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleOrderButton("showOrdersSpotMarkers"))}
                        indicatorName="Spot Orders"
                        bgColor={
                            buttonsVisilibity.showOrdersSpotMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                    <ItemChartButton
                        setShow={() => dispatch(setToggleOrderButton("showOrdersStandardMarkers"))}
                        indicatorName="Standard Orders"
                        bgColor={
                            buttonsVisilibity.showOrdersStandardMarkers
                                ? "bg-african_violet-300"
                                : "bg-african_violet-500"
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default ButtonsPanel;
