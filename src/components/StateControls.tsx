interface stateControlProps {
  amountOfColors: number;
  setColorsAmount: (amountOfColors: number) => void;
  isInPickingMode: boolean;
  setPickingMode: (isInPickingMode: boolean) => void;
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
        disabled={props.isInPickingMode}
        value={props.amountOfColors}
        min={1}
        max={15}
        onChange={(e) => {
          let value = e.target.value;

          if (Number(value) > 15) {
            value = "15";
          } else if (value === "") {
          } else if (Number(value) < 1) {
            value = "1";
          }
          props.setColorsAmount(Number(value));
        }}
      />
      <button
        className="enterToPickMode"
        disabled={props.isInPickingMode}
        onClick={changeStateHandler}
      >
        Enter to pick mode
      </button>
    </div>
  );
}
