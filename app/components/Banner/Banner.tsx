import Image from "next/image";

interface BannerProps {
  children?: React.ReactNode;
  proc?:number
}

export default function Banner({ children, proc }: BannerProps) {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 my-8">
      <div className="px-8 py-12 flex flex-col gap-2 items-center justify-evenly md:flex-row">
        <div className="mb-8 md:mb-0 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Summer Sale!</h1>
          <p className="text-lg md:text-xl mb-2">
            Enjoy discounts on selected items
          </p>
          <h2 className="text-2xl md:text-5xl text-yellow-400 font-bold uppercase">
            get {proc}% Off
          </h2>
        </div>
        <div className="ibg w-1/3 pb-[16.427%] min-h-[5.5rem] min-w-[5.5rem] ">
          <Image alt="shop" src="/banner-image.png" fill sizes="(min-width: 2320px) 608px, (min-width: 1060px) 321px, (min-width: 780px) 119px, 68px"></Image>
        </div>
      </div>
    </div>
  );
}
