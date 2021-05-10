interface colorProps {
  colorValue: string; //Expected to be in HEX format like #FFFFFF
}

export function ColorPickedComponent(props: colorProps) {
  return (
    <div className="color-picked">
      <p className="color-picked__value">{props.colorValue}</p>
      <div
        className="color-picked__view"
        style={{ background: props.colorValue }}
      ></div>
    </div>
  );
}
