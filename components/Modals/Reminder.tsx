import {
  Button,
  Divider,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Stack
} from "@chakra-ui/react";

const conditions = [
  "No Refunds on bookings.",
  "Only 5 members max per lane (including member)",
  "Please pick up after yourself.",
  "Always be aware of balls flying."
];

export default function Reminder({
  isOpen,
  onClose,
  onProceed
}: {
  isOpen: boolean;
  onClose: () => void;
  onProceed?: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="lg"
      closeOnOverlayClick
    >
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent>
        <ModalHeader className="flex items-center justify-between gap-5">
          Reminder
        </ModalHeader>
        <Divider />
        <ModalBody>
          <OrderedList>
            {conditions.map((condition) => {
              return (
                <ListItem key={condition} className="mb-2 text-xl">
                  {condition}
                </ListItem>
              );
            })}
          </OrderedList>
        </ModalBody>
        <Divider />
        <ModalFooter flexDirection="column" alignItems="flex-start">
          <Stack
            className="w-full"
            direction="row"
            gap={2}
            justifyContent="flex-end"
          >
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="solid" colorScheme="blue" onClick={onProceed}>
              Proceed
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
