interface FilePickerProps {
  getImageFunc: Function;
}

export function FilePickerComponent(props: FilePickerProps) {
  return (
    <input
      type="file"
      name="imageInput"
      accept="image/*"
      onChange={(event) => props.getImageFunc(event)}
    />
  );
}
