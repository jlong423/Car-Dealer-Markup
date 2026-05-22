export default function DealIndicator({ percent }) {
  let label = "";
  let color = "";
  let textColor = "white";
  console.log(percent);
  if (percent <= 0) {
    label = "Below MSRP";
    color = "green";
    textColor = "white";
  } else if (percent > 0 && percent <= 5) {
    label = "Good Deal";
    color = "green";
    textColor = "black";
  } else if (percent > 5 && percent <= 10) {
    label = "Fair Deal";
    color = "yellow";
    textColor = "black";
  } else {
    label = "High Markup";
    color = "red";
  }
  console.log(label);
  console.log(color);
  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "6px",
        backgroundColor: color,
        color: textColor,
        fontSize: "0.85rem",
        fontWeight: "bold",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
