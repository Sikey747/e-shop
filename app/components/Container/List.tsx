import Link from "next/link";
import { List } from "./../../../interfaces/index";

interface ListProps {
  children?: React.ReactNode;
  title?: string;
  li?: List[];
  text?: string[];
}

export default function List({ title, li, text, children }: ListProps) {
  return (
    <div className="flex gap-4 flex-col xl:flex-[0_1_25%] md:flex-[0_1_50%] flex-[1_1_100%]">
      <h3 className="text-base font-bold mb-2">{title}</h3>
      {!children && (
        <ul className="flex gap-3 flex-col w-full md:w-auto capitalize">
          {text &&
            text.map((el, idx) => {
              return <li key={idx}>{el}</li>;
            })}
          {li &&
            li.map((el) => {
              return (
                <li key={el.title}>
                  <Link href={el.link}>{el.title}</Link>
                </li>
              );
            })}
        </ul>
      )}

      {children && (
        <ul className="flex gap-3 w-full md:w-auto capitalize">
          {children}
        </ul>
      )}
    </div>
  );
}
