export interface TemplateData {
  value: string;
  start: Position;
  end: Position;
  textStyle: TextStyle;
}

interface Position {
  xOffset: number;
  yOffset: number;
}

interface TextStyle {
  typography: Typography;
  fontFamily: string;
}

enum Typography {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  body1 = "body1",
  body2 = "body2",
  button = "button",
  caption = "caption"
}
