import React from "react";
import {
  Box,
  Button,
  HStack,
  VisuallyHiddenInput,
  VStack
} from "@chakra-ui/react";
function BookingsTable() {
  return (
    <Box className="w-full mx-auto max-xl:w-full">
      <Box className="rounded-md bg-[#F5F7F2] w-full flex flex-col p-10 items-center max-md:p-4 max-md:py-6">
        <HStack className="w-full mt-8 !items-start !gap-10 max-md:!flex-col max-md:!items-center"></HStack>
      </Box>
    </Box>
  );
}

export default BookingsTable;
