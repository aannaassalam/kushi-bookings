import { Box, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

function CustomInput({
  id,
  text,
  placeholder,
  type,
  validationProps,
  error,
  isRequired
}: {
  id: string;
  text: string;
  placeholder: string;
  type: string;
  validationProps: UseFormRegisterReturn;
  error: string;
  isRequired?: boolean;
}) {
  const [show_password, setShowPassword] = useState(false);

  return (
    <Box className="mb-4">
      <div className="bg-[#fafafa] rounded-lg mb-1 px-4 py-2">
        <label className="text-sm font-medium text-gray-700 flex" htmlFor={id}>
          {text}
          {isRequired && <p className="text-red-600">*</p>}
        </label>
        <Stack direction="row">
          <input
            type={
              type !== "password" ? type : show_password ? "text" : "password"
            }
            id={id}
            className="w-full mt-1 flex-1 focus:outline-none outline-none bg-[#fafafa]"
            placeholder={placeholder}
            {...validationProps}
          />
          {type === "password" && (
            <Button
              onClick={() => setShowPassword((prev) => !prev)}
              variant="ghost"
              size="sm"
              className="!text-xs"
            >
              {show_password ? "Hide" : "Show"}
            </Button>
          )}
        </Stack>
      </div>
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </Box>
  );
}

export default CustomInput;
