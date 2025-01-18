import { cx } from "@/lib/utils";
import { useCartContext } from "@/pages/_app";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from "@chakra-ui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const SelectSport = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { setCart } = useCartContext();

  const [selectedSport, setSelectedSport] = useState(
    searchParams.get("sport") || ""
  );

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader flexDirection="row" display="flex" alignItems="center">
          <Box
            onClick={onClose}
            className="bg-[#03A9F4] p-3 mr-4 flex justify-center items-center rounded-xl h-full cursor-pointer w-max"
          >
            <IoMdClose color="#fff" size={20} className="" />
          </Box>
          <Box alignItems="flex-start">
            <p>Sports</p>
            <p className="text-[#858995] text-sm">Select Sport</p>
          </Box>
        </ModalHeader>
        <ModalBody pb="4">
          <Stack gap="4">
            {["cricket", "badminton"].map((sport: string, id) => (
              <Box
                key={id}
                onClick={() => setSelectedSport(sport)}
                className={cx(
                  "w-full p-2 capitalize bg-gray-200 flex justify-center rounded-full cursor-pointer",
                  {
                    "bg-primary": selectedSport === sport,
                    "text-white": selectedSport === sport
                  }
                )}
              >
                {sport}
              </Box>
            ))}
          </Stack>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            className="bg-primary !px-8 !py-4 text-white font-medium mr-auto h-max"
            colorScheme="primary"
            onClick={() => {
              setCart(undefined);
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.set("sport", selectedSport);
              console.log(`${pathname}?${newParams.toString()}`);
              router.push(`${pathname}?${newParams.toString()}`, undefined, {
                shallow: true
              });
              onClose();
            }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
