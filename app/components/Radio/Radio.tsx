"use client";

import Radio from "@mui/material/Radio";
import RadioGroupUi from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { Images } from "./../../../interfaces/index";

interface RadioProps {
  data: Images[];
  value?:string;
  handlerColorSelect?:(value:string)=>void;
}

export default function RadioGroup({ data,value,handlerColorSelect }: RadioProps) {
  return (
    <>
      <FormControl>
        <RadioGroupUi
          row
          className="flex items-center gap-2"
          value={value}
          onChange={e=> handlerColorSelect && handlerColorSelect(e.target.value)}
        >
          <p className="uppercase font-semibold">Color</p>
          {data.map((el) => {
            return (
              <Radio
                key={el.color}
                value={el.color}
                name="radio-buttons"
                inputProps={{ "aria-label": `${el.color}` }}
                sx={{
                  color: `${el.colorCode}`,
                  "&.Mui-checked": {
                    color: `${el.colorCode}`,
                  },
                }}
              />
            );
          })}
        </RadioGroupUi>
      </FormControl>
    </>
  );
}
