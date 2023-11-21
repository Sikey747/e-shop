"use client";

interface QuantityProps {
  handlerQuantityUp:(e: React.MouseEvent<HTMLButtonElement>) => void;
  handlerQuantityDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  valueProps?: number;
}

export default function Quantity({
  valueProps,
  handlerQuantityUp,
  handlerQuantityDown,
}: QuantityProps) {
  return (
    <div className="flex gap-4 items-center border-[1px] w-min">
      <button
        type="button"
        className="p-3 border-[1px] text-2xl"
        onClick={handlerQuantityDown}
      >
        -
      </button>
      <p className="text-2xl">{valueProps}</p>
      <button
        type="button"
        className="p-3 border-[1px] text-2xl"
        onClick={handlerQuantityUp}
      >
        +
      </button>
    </div>
  );
}
