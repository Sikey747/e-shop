import { TextField } from "@mui/material";
import { cn } from "./../../../utils/utils";

type MyInputProps = {
  placeholder: string;
  autoComplete?: string;
  disabled?: boolean;
  type?: string;
  error?: any;
  name?: string;
  id?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  className?: string;
  helperText?: string;
  value:string
};

export default function Input({
  placeholder,
  helperText,
  type = "text",
  disabled,
  name,
  onChange,
  onBlur,
  ref,
  className,
  error,
  value
}: MyInputProps) {
  const props = {
    helperText: error ? helperText : "",
    autoComplete: "on",
    disabled,
    type,
    error,
    name,
    id: placeholder,
    label: placeholder,
    onChange,
    onBlur,
    ref,
    value,
    className: cn("w-full font-light", className, {
      "bg-gray-500": disabled,
    }),
  };

  return (
    <>
      <TextField {...props} />
    </>
  );
}
