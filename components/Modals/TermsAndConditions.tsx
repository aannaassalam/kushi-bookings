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
  OrderedList
} from "@chakra-ui/react";

const conditions = [
  "Safety is our top priority. Please follow all posted rules and guidelines while using our facilities.",
  "All users must wear appropriate footwear while on the courts or lanes. No bare feet or sandals are allowed.",
  "Only authorized equipment may be used on the courts or lanes. Please do not bring your own equipment.",
  "Users of the cricket batting lanes must wear protective equipment, including a helmet and pads.",
  "Users of the pickle ball courts must bring their own paddles and balls.",
  "Please respect the equipment and facilities. Do not intentionally damage or deface any equipment or property.",
  "Our facilities are open to all ages, but children under the age of 16 must be accompanied by an adult.",
  "We reserve the right to refuse service to anyone who violates our terms and conditions or shows disrespect to other users or staff members.",
  "By using our facilities, you assume all risks associated with such activities. We are not responsible for any injuries or damages that may occur.",
  "We may modify these terms and conditions at any time. We encourage all users to check for updates regularly."
];

export default function TermsAndConditions({
  isOpen,
  onClose,
  onProceed
}: {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="lg">
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent>
        <ModalHeader className="flex items-center justify-between gap-5">
          Terms and conditions
        </ModalHeader>
        <Divider />
        <ModalBody>
          <OrderedList>
            {conditions.map((condition) => {
              return (
                <ListItem key={condition} className="mb-2">
                  {condition}
                </ListItem>
              );
            })}
          </OrderedList>
        </ModalBody>
        <Divider />
        <ModalFooter className="gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" colorScheme="blue" onClick={onProceed}>
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
