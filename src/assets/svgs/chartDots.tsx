type CustomDotProps = {
  cx: number;
  cy: number;
  color: string;
};

export function CustomDotSquare(props: CustomDotProps) {
  const { cx, cy, color } = props;
  const size = 8;
  const halfSize = size / 2;

  return (
    <svg
      x={cx - halfSize}
      y={cy - halfSize}
      width={size}
      height={size}
      fill="none"
    >
      <rect width="8" height="8" fill={color} />
    </svg>
  );
}

export function CustomDotCircle(props: CustomDotProps) {
  const { cx, cy, color } = props;
  const width = 8;
  const height = 8;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <svg
      x={cx - halfWidth}
      y={cy - halfHeight}
      width={width}
      height={height}
      fill="none"
    >
      <circle cx={halfWidth} cy={halfHeight} r={halfHeight} fill={color} />
    </svg>
  );
}

export function CustomDotTriangle(props: CustomDotProps) {
  const { cx, cy, color } = props;
  const width = 11;
  const height = 9;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <svg
      x={cx - halfWidth}
      y={cy - halfHeight}
      width={width}
      height={height}
      fill="none"
    >
      <path d="M5.56055 0L10.7567 9H0.364395L5.56055 0Z" fill={color} />
    </svg>
  );
}

export function CustomDotPentagon(props: CustomDotProps) {
  const { cx, cy, color } = props;
  const width = 12;
  const height = 11;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <svg
      x={cx - halfWidth}
      y={cy - halfHeight}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M6 0L11.7063 4.1459L9.52671 10.8541H2.47329L0.293661 4.1459L6 0Z"
        fill={color}
      />
    </svg>
  );
}
