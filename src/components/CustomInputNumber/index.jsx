import { Button, InputNumber } from "antd";
import "~/assets/styles/custom-input-number.css";
import { message } from "../EscapeAntd";
export const CustomInputNumber = ({
  value,
  onChange,
  min,
  currentQuantity,
  tourSchedule,
  step,
}) => {
  const handleIncrease = () => {
    const remain = tourSchedule?.remain;
    if (remain === 0) {
      message.error("Rất tiếc Tour hiện tại đã hết chỗ");
    } else if (currentQuantity >= remain) {
      message.error(
        `Rất tiếc Tour hiện tại số chỗ còn nhận chỉ còn: ${remain} chỗ`
      );
    } else {
      onChange(value + step);
    }
  };

  const handleDecrease = () => {
    const remain = tourSchedule?.remain;
    if (remain === 0) {
      message.error("Rất tiếc Tour hiện tại đã hết chỗ");
    } else if (currentQuantity >= remain) {
      message.error(
        `Rất tiếc Tour hiện tại số chỗ còn nhận chỉ còn: ${remain} chỗ`
      );
    }
    if (min === undefined || value > min) {
      onChange(value - step);
    }
  };

  return (
    <div
      className="custom-input-number"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        className="custom-btn decrement"
        onClick={handleDecrease}
        disabled={value <= min}
      >
        -
      </Button>
      <InputNumber
        type="number"
        value={value}
        onChange={onChange}
        step={step}
        min={min}
        controls={false} // Disable default spin buttons
        className="custom-input"
      />
      <Button className="custom-btn increment" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
};
