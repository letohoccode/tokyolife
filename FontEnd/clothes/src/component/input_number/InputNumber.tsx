import { useState } from "react";

const InputNumber = (props: {
  className?: string;
  quantity?: number;
  onChange?: (value: number) => void;
}) => {
  const [valueNumber, setValueNumber] = useState(props.quantity || 1);

  const updateValue = (newValue: number) => {
    setValueNumber(newValue);
    props.onChange?.(newValue);
  };

  const ClickPrev = () => {
    if (valueNumber > 1) {
      updateValue(valueNumber - 1);
    }
  };

  const ClickNext = () => {
    updateValue(valueNumber + 1);
  };

  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dataNumber = Number(event.target.value.replace(/^0+/, ''));
    updateValue(dataNumber);
  };

  return (
    <div>
      <div className={props.className}>
        <button onClick={ClickPrev} className='px-3 py-1 border-[1px] border-slate-500'>-</button>
        <input
          type='number'
          value={String(valueNumber)}
          onChange={HandleChange}
          className='outline-none border-[1px] px-2 py-1 text-center border-slate-500 w-[40px]'
        />
        <button onClick={ClickNext} className='px-3 py-1 border-[1px] border-slate-500'>+</button>
      </div>
    </div>
  );
};

export default InputNumber;
