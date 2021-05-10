interface colorProps {
  colorValue: string; //Expected to be in HEX format like #FFFFFF
}

export function ColorPickedComponent(props: colorProps) {
  return (
    <div
      className="color-picked"
      style={{
        width: 100,
        height: 100,
      }}
    >
      <p className="color-picked__value">{props.colorValue}</p>
      <div
        className="color-picked__view"
        style={{ background: props.colorValue, width: 80, height: 80 }}
      ></div>
    </div>
  );
}
