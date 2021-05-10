interface ResultProps {
  result: string;
}

export function ResultComponent(props: ResultProps) {
  return (
    <p className="result-text">
      Your skin color is: <span className="result-color">{props.result}</span>
    </p>
  );
}
