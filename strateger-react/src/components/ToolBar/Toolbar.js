// Path: src/components/ToolBar/Toolbar.js

import ToolBarContainer from "./containers/ToolBarContainer";

const Toolbar = ({ initialTemporalidad, startDate, endDate, onDateChange }) => {
    return (
        <ToolBarContainer
            initialTemporalidad={initialTemporalidad}
            startDate={startDate}
            endDate={endDate}
            onDateChange={onDateChange}
        />
    );
};

export default Toolbar;
