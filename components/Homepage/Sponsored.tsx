import assets from "@/json/assets";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import Link from "next/link";
import CustomInput from "../CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { submitAdvertiseForm } from "@/api/functions/user.api";

const schema = yup.object().shape({
  full_name: yup.string().required(),
  email: yup.string().email().required(),
  nature_of_business: yup.string().required()
});

export default function Sponsored() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitAdvertiseForm,
    onSuccess: () => {
      onClose();
      reset();
    }
  });

  const onSubmit = (body: yup.InferType<typeof schema>) => {
    mutate(body);
  };

  return (
    <Box className="bg-lightPrimary/5 px-[100px] w-full mb-[50px] max-lg:px-[40px] max-md:px-[20px] pt-14 pb-24 flex max-lg:py-12 ">
      <VStack
        align="start"
        mx="auto"
        spacing={4}
        marginX={0}
        className="w-1/2 max-lg:w-full"
      >
        <Text className="text-primaryText" fontWeight="bold">
          SPONSORED
        </Text>
        <Heading as="h2" size="xl" fontWeight="bold" className="text-primary">
          A LEGENDARY WELCOME,
          <br />
          EVERY TIME
        </Heading>
        <Text
          fontSize="lg"
          color="gray.700"
          maxW={{ base: "100%", lg: "xl" }}
          my={4}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
          sit amet lacus fermentum tincidunt. Vestibulum eu justo volutpat mi
          facilisis mattis in ullamcorper est.
        </Text>
        <Text fontSize="lg" color="gray.700" maxW={{ base: "100%", lg: "xl" }}>
          Etiam arcu purus, feugiat quis orci eget, egestas ultricies nulla.
          Maecenas ut nisl lectus. Nulla a blandit turpis. Nulla mattis, elit a
          porta ullamcorper, dui justo mattis mi, tempor tempor lorem quam
          imperdiet eros. Mauris a faucibus ipsum. Cras mattis euismod nulla
          eget consequat. Mauris at arcu nec diam laoreet sollicitudin ut non
          ex.
        </Text>
        <HStack spacing={6} mt={4}>
          <Button
            className="!bg-primary"
            color="white"
            px={6}
            as={Link}
            href=""
            _hover={{ bg: "primary" }}
          >
            VISIT WEBSITE
          </Button>
          <Button
            variant="link"
            color="green.900"
            fontWeight="bold"
            onClick={onOpen}
          >
            ADVERTISE HERE
          </Button>
        </HStack>
      </VStack>

      {/* Image Section */}
      <Box
        position="relative"
        className="ml-auto w-1/3 max-[1400px]:w-[40%] max-xl:w-[45%] max-lg:hidden"
        mt={12}
      >
        <Box className="relative">
          <Image
            src={assets.sponsor1}
            alt="Sponsor image"
            rounded="md"
            shadow="lg"
            objectFit="cover"
            width="250px"
          />
          <Box position="absolute" bottom={0} left={-5} className="z-10">
            {/* triangle */}
            <div className="w-0 h-0 border-l-[20px] border-l-[#00000000] border-b-[20px] border-b-primary"></div>

            <Box
              className="bg-primary bg-opacity-90 rounded-tr-3xl rounded-br-3xl flex items-center"
              p={1}
              px={3}
            >
              <Text color="white" fontWeight="bold" fontSize="xl">
                30+
              </Text>
              <Text color="white" fontSize="xs" ml={2}>
                Years of Experience
              </Text>
            </Box>
          </Box>
        </Box>
        <Image
          src={assets.sponsor2}
          alt="Sponsor image"
          rounded="md"
          shadow="lg"
          position="absolute"
          top={16}
          right="20px"
          width="250px"
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact us</ModalHeader>
          <ModalBody>
            <CustomInput
              id="name"
              text="Full name"
              type="text"
              placeholder="John Doe"
              validationProps={register("full_name")}
              error={errors?.full_name?.message || ""}
              isRequired={true}
            />
            <CustomInput
              id="email"
              text="Email address"
              type="email"
              placeholder="John Doe"
              validationProps={register("email")}
              error={errors?.email?.message || ""}
              isRequired={true}
            />
            <CustomInput
              id="nature"
              text="Nature of your business"
              type="text"
              placeholder="Enter here..."
              validationProps={register("nature_of_business")}
              error={errors?.nature_of_business?.message || ""}
              isRequired={true}
            />
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              variant="solid"
              onClick={() => {
                onClose();
                reset();
              }}
              className="flex-1"
              isDisabled={isPending}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
              className="flex-1"
              isLoading={isPending}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
