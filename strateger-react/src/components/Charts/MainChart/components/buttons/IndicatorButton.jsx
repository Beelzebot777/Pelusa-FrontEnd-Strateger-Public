const IndicatorButton = ({ setShow , indicatorName}) => {
    return(
        <button
            onClick={() => setShow(prev => !prev)}
            className="px-1 py-1 bg-african_violet-500 text-white rounded rounded-xs"
        >
            {indicatorName}
        </button>
    );
};

export default IndicatorButton;