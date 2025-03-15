import assets from "@/json/assets";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Image
} from "@chakra-ui/react";
import Link from "next/link";

export default function Sponsored() {
  return (
    <Box className="bg-lightPrimary/5 px-[100px] w-full mb-[50px] max-lg:px-[40px] max-md:px-[20px] pt-14 pb-24 flex justify-center">
      <VStack align="start" maxW="6xl" mx="auto" spacing={4} marginX={0}>
        <Text className="text-primaryText" fontWeight="bold">
          SPONSORED
        </Text>
        <Heading as="h2" size="xl" fontWeight="bold" className="text-primary">
          A LEGENDARY WELCOME, EVERY TIME
        </Heading>
        <Text fontSize="lg" color="gray.700" maxW="xl" my={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
          sit amet lacus fermentum tincidunt. Vestibulum eu justo volutpat mi
          facilisis mattis in ullamcorper est.
        </Text>
        <Text fontSize="lg" color="gray.700" maxW="xl">
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
            as={Link}
            href="#footer"
          >
            CONTACT NOW
          </Button>
        </HStack>
      </VStack>

      {/* Image Section */}
      <Box position="relative" className="ml-20 max-xl:ml-12 w-[30%]" mt={12}>
        <Box className="relative">
          <Image
            src={assets.sponsor1}
            alt="Sponsor image"
            rounded="md"
            shadow="lg"
            objectFit="cover"
            width="250px"
          />
          <Box position="absolute" bottom={0} left={-5}>
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
          right="3%"
          width="250px"
        />
      </Box>
    </Box>
  );
}
