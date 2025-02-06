import { getMyBookings } from "@/api/functions/bookings.api";
import { getLanes } from "@/api/functions/lane.api";
import BookingsFilter from "@/components/BookingsFilter";
import BookingsGrid from "@/components/BookingsGrid";
import MobileBookingsGrid from "@/components/MobileBookingGrid";
import AppLayout from "@/layouts/AppLayout";
import { Booking } from "@/typescript/interface/bookings.interface";
import { Lane } from "@/typescript/interface/lane.interfaces";
import {
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  VStack
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useSearchParams } from "next/navigation";
import { parseCookies } from "nookies";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const { start_date, end_date, lane, sport } = context.query;

  const data = await getMyBookings({
    start_date:
      start_date?.toString() ?? moment().startOf("week").toISOString(),
    end_date: end_date?.toString() ?? moment().endOf("week").toISOString(),
    lanes: lane as string[],
    sport: sport?.toString() ?? "cricket",
    token: cookies.token
  });
  const lanes_data = await getLanes(
    sport?.toString() ?? "cricket",
    cookies.token
  );

  return {
    props: {
      bookings_data: data,
      lanes_data
    }
  };
};

export default function MyBookings({
  bookings_data,
  lanes_data
}: {
  bookings_data: Booking[];
  lanes_data: Lane[];
}) {
  const searchParams = useSearchParams();
  const _lanes = searchParams.getAll("lane");
  const sport = searchParams.get("sport") ?? "cricket";
  const start_date =
    searchParams.get("start_date") ?? moment().startOf("week").toISOString();
  const end_date =
    searchParams.get("end_date") ?? moment().endOf("week").toISOString();

  const { data = [], isPending } = useQuery({
    queryKey: ["bookings", _lanes, sport, start_date, end_date],
    queryFn: () =>
      getMyBookings({ lanes: _lanes, sport, start_date, end_date }),
    initialData: bookings_data,
    refetchInterval: 5000
  });

  return (
    <AppLayout>
      <Modal isOpen={isPending} onClose={() => null} isCentered>
        <ModalOverlay />
        <ModalContent className="flex items-center justify-center !bg-[transparent] !shadow-none">
          {/* <Box className="h-full w-full "> */}
          <Spinner size="xl" color="#fff" />
          {/* </Box> */}
        </ModalContent>
      </Modal>
      <div className=" relative w-full h-[200px] bg-gradient-to-r items-center from-[#1C1744] to-[#1C1744]/70 flex justify-center max-md:h-[150px]">
        <h1 className="text-white font-bold text-[36px]"> Bookings</h1>
        {/* <FloatingMenu /> */}
      </div>

      <div className="px-[100px] mt-[50px] max-xl:px-[40px] max-lg:px-[20px] max-md:mt-6">
        <div className="w-full  rounded-md  flex flex-row justify-between">
          <VStack alignItems="flex-start">
            <p className="text-xl font-semibold">Bookings Lists</p>
            <p className="text-[#858995] text-sm -mt-2">
              {data.length} Bookings
            </p>
          </VStack>
          <HStack alignItems="stretch">
            {/* <Input
              placeholder="Search"
              className="!w-[250px] !h-full mr-6 rounded-lg px-4 py-2 focus:outline-none outline-none !bg-[#fafafa]"
            /> */}
            {/* <HStack className="bg-[#fafafa] p-2 rounded-md flex flex-row">
              <p className="py-2 px-5 bg-white font-semibold rounded-md text-black pointer">
                Cricket
              </p>
              <p className="py-2 px-5  rounded-md font-semibold pointer">
                Badminton
              </p>
            </HStack> */}
          </HStack>
        </div>
        <BookingsFilter />
        <BookingsGrid
          bookings={data}
          lanes={lanes_data.filter((_lane) => _lane.sport === "cricket")}
        />
        <MobileBookingsGrid
          bookings={data}
          lanes={lanes_data.filter((_lane) => _lane.sport === "cricket")}
        />
      </div>
    </AppLayout>
  );
}
