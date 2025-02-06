import { Box } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

function CustomInput({
  id,
  text,
  placeholder,
  type,
  validationProps,
  error
}: {
  id: string;
  text: string;
  placeholder: string;
  type: string;
  validationProps: UseFormRegisterReturn;
  error: string;
}) {
  return (
    <Box className="mb-4">
      <div className="bg-[#fafafa] rounded-lg mb-1 px-4 py-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
          {text}
        </label>
        <input
          type={type}
          id={id}
          className="w-full mt-1  focus:outline-none outline-none bg-[#fafafa]"
          placeholder={placeholder}
          {...validationProps}
        />
      </div>
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </Box>
  );
}

export default CustomInput;
