interface stateControlProps {
  amountOfColors: number;
  setColorsAmount: Function;
  isInPickingMode: boolean;
  setPickingMode: Function;
}

export function StateControlsComponent(props: stateControlProps) {
  function changeStateHandler() {
    props.setPickingMode(true);
  }

  return (
    <div className="stateControls">
      <input
        type="number"
        name="Amount of collors to pick"
        placeholder="How much colors you want to peak?"
        disabled={props.isInPickingMode ? true : false}
        value={props.amountOfColors}
        min={1}
        max={15}
        onChange={(e) => {
          const curColors = Number.parseInt(e.target.value);
          if (curColors > 15) {
            props.setColorsAmount(15);
          } else if (curColors < 1) {
            props.setColorsAmount(1);
          } else {
            props.setColorsAmount(e.target.value);
          }
        }}
      />
      <button
        className="enterToPickMode"
        disabled={props.isInPickingMode ? true : false}
        onClick={changeStateHandler}
      >
        Enter to pick mode
      </button>
    </div>
  );
}
