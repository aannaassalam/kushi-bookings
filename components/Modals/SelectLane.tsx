import { getLanes } from "@/api/functions/lane.api";
import { cx } from "@/lib/utils";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  VStack
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const SelectLane = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sport = searchParams.get("sport") ?? "cricket";
  const [selectedLane, setSelectedLane] = useState<string[]>(
    searchParams.getAll("lane")
  );

  const { data = [], isLoading } = useQuery({
    queryKey: ["lanes", sport],
    queryFn: () => getLanes(sport?.toString() ?? "cricket")
  });

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={700}>
        <ModalHeader flexDirection="row" display="flex" alignItems="center">
          <Box
            onClick={onClose}
            className="bg-[#03A9F4] p-3 mr-4 flex justify-center items-center rounded-xl h-full cursor-pointer w-max"
          >
            <IoMdClose color="#fff" size={20} className="" />
          </Box>
          <Box alignItems="flex-start">
            <p>Lanes</p>
            <p className="text-[#858995] text-sm">Select Lane</p>
          </Box>
        </ModalHeader>
        <ModalBody pb="4">
          {isLoading ? (
            <VStack
              alignItems="center"
              justifyContent="center"
              className="h-32"
            >
              <Spinner />
            </VStack>
          ) : (
            <Stack gap="4">
              {data
                ?.filter((_lane) => _lane.sport === sport)
                .map((lane, id) => (
                  <Box
                    key={id}
                    onClick={() =>
                      setSelectedLane((prev) =>
                        prev.includes(lane._id)
                          ? prev.filter((_prev) => _prev !== lane._id)
                          : [...prev, lane._id]
                      )
                    }
                    className={cx(
                      "w-full p-2 capitalize bg-gray-100 flex justify-center rounded-full cursor-pointer",
                      {
                        "bg-primary": selectedLane.includes(lane._id),
                        "text-white": selectedLane.includes(lane._id)
                      }
                    )}
                  >
                    {lane.name} {lane.about ? `(${lane.about})` : null}
                  </Box>
                ))}
            </Stack>
          )}
        </ModalBody>
        <ModalFooter gap={3}>
          <Button
            className="bg-primary !px-8 !py-4 text-white font-medium mr-auto h-max"
            colorScheme="primary"
            onClick={() => {
              const newParams = new URLSearchParams(searchParams.toString());
              newParams.delete("lane");
              selectedLane.forEach((_lane) => {
                newParams.append("lane", _lane);
              });
              router.push({ search: newParams.toString() }, undefined, {
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
