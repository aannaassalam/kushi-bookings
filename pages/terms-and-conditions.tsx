import AppLayout from "@/layouts/AppLayout";
import { ListItem, OrderedList } from "@chakra-ui/react";
import React from "react";

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

export default function TermsAndConditions() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <h1 className="text-6xl font-bold mb-14 max-md:text-3xl max-md:mb-8">
          Terms and Conditions
        </h1>
        <OrderedList className="px-6 max-md:px-3">
          {conditions.map((condition) => {
            return (
              <ListItem key={condition} className="mb-2 text-xl max-md:text-lg">
                {condition}
              </ListItem>
            );
          })}
        </OrderedList>
      </div>
    </AppLayout>
  );
}
