import { removePendingBookings } from "@/api/functions/payments.api";
import { getCurrentSeasonPass } from "@/api/functions/season-pass.api";
import assets from "@/json/assets";
import { CartType, useCartContext } from "@/pages/_app";
import { CurrentSeasonPass } from "@/typescript/interface/season-pass.interfaces";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  Text,
  Textarea,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoIosRemoveCircleOutline, IoMdClose } from "react-icons/io";
import { IoBagOutline, IoChevronDownOutline } from "react-icons/io5";
import PaymentModal from "./PaymentForm/PaymentForm";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { getFacility } from "@/api/functions/facility.api";
import TermsAndConditions from "./Modals/TermsAndConditions";
import { LuTrash2 } from "react-icons/lu";

const LaneCard = ({
  lane,
  date,
  image
}: {
  lane: CartType["lanes"][0];
  date: string;
  image?: string;
}) => {
  const { cart, setCart } = useCartContext();
  const week_end = moment().endOf("week").endOf("day").unix();

  const removeItemFromCart = () => {
    const lanes =
      cart?.lanes.filter((_lane) => _lane.lane_id !== lane.lane_id) ?? [];

    const weekly_slot_guard =
      moment(cart?.date).unix() <= week_end
        ? cart?.membership?.available_slots ?? 0
        : 0;

    let available_slots = cart?.season_pass
      ? cart?.season_pass?.available_slots
      : weekly_slot_guard;

    const _lanes = lanes.map((_l) => {
      const discount =
        available_slots > _l.slots.length
          ? 0
          : _l.slots.length - available_slots;

      _l.price = _l.lane_price * discount;

      _l.free_slots_used = available_slots
        ? available_slots > _l.slots.length
          ? _l.slots.length
          : _l.slots.length - available_slots
        : 0;

      available_slots =
        _l.slots.length > available_slots
          ? 0
          : available_slots - _l.slots.length;
      return _l;
    });

    setCart((prev) => ({
      lanes: _lanes,
      date,
      membership: prev?.membership,
      season_pass: prev?.season_pass,
      box_booking_price: undefined,
      sport: prev!.sport
    }));
  };

  const removeSlotFromCart = (slot: string) => {
    if (!cart?.lanes) return;

    const selected_lane = cart?.lanes.find(
      (_lane) => _lane.lane_id === lane.lane_id
    );

    const filtered_selected_lane = {
      ...selected_lane,
      slots: selected_lane?.slots.filter((_slot) => _slot !== slot)
    };

    let lanes: {
      lane_id: string;
      lane_price: number;
      slots: string[];
      price: number;
      name: string;
      about: string;
      free_slots_used: number;
    }[] = [];

    if (
      filtered_selected_lane?.slots &&
      filtered_selected_lane.slots?.length > 0
    ) {
      lanes = cart?.lanes.map((_lane) => {
        if (_lane.lane_id === filtered_selected_lane.lane_id) {
          _lane.slots = filtered_selected_lane.slots || [];
        }
        return _lane;
      });
    } else {
      lanes =
        cart?.lanes.filter((_lane) => _lane.lane_id !== lane.lane_id) ?? [];
    }

    const weekly_slot_guard =
      moment(cart?.date).unix() <= week_end
        ? cart?.membership?.available_slots ?? 0
        : 0;

    let available_slots = cart?.season_pass
      ? cart?.season_pass?.available_slots
      : weekly_slot_guard;

    const _lanes = lanes.map((_l) => {
      const discount =
        available_slots > _l.slots.length
          ? 0
          : _l.slots.length - available_slots;

      _l.price = _l.lane_price * discount;

      _l.free_slots_used = available_slots
        ? available_slots > _l.slots.length
          ? _l.slots.length
          : _l.slots.length - available_slots
        : 0;

      available_slots =
        _l.slots.length > available_slots
          ? 0
          : available_slots - _l.slots.length;
      return _l;
    });

    setCart((prev) => ({
      lanes: _lanes,
      date,
      membership: prev?.membership,
      season_pass: prev?.season_pass,
      box_booking_price: undefined,
      sport: prev!.sport
    }));
  };

  return (
    <div className="rounded-xl border border-gray-200 w-full">
      <div className="flex p-2 items-center border-b border-b-gray-200">
        <Image
          src={image ?? assets.lane}
          width={50}
          height={50}
          alt=""
          className="w-[50px] h-[50px] object-contain"
        />
        <div className="ml-4">
          <p className="text-black font-semibold">{lane.name}</p>
          <p className="text-gray-600 text-xs">{lane.about}</p>
        </div>
        <button
          className="bg-red-200/40 hover:bg-red-100 transition-all py-2 px-4 rounded-full text-red-500 font-medium text-xs ml-auto"
          onClick={removeItemFromCart}
        >
          Remove
        </button>
      </div>
      <div className="p-4 flex justify-between items-center gap-2">
        <div className="text-xs">
          <p className="text-gray-600 font-semibold">
            {moment(date).format("MMMM D, YYYY")}
          </p>
        </div>
        <p className="text-base text-primary font-bold whitespace-nowrap">
          ${lane.price} USD
        </p>
      </div>
      <div className="mt-1 p-4 pt-0">
        {lane.slots.map((_slot) => (
          <Box
            key={_slot}
            className="flex justify-between items-center gap-5 mt-2 first-of-type:mt-0 group"
          >
            <span className="mr-1.5 text-gray-600 text-sm group-hover:font-medium transition-all">
              {`${moment(_slot, "HH:mm").format("hh:mm A")} - ${moment(
                _slot,
                "HH:mm"
              )
                .add(1, "hour")
                .format("hh:mm A")}`}
            </span>
            <button
              className="transition-all rounded-full text-red-500 font-medium text-base"
              onClick={() => removeSlotFromCart(_slot)}
            >
              <LuTrash2 />
            </button>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default function Cart({
  open = true,
  close
}: {
  open: boolean;
  close: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isTermsOpen,
    onOpen: onTermsOpen,
    onClose: onTermsClose
  } = useDisclosure();
  const { cart, setCart } = useCartContext();
  const week_end = moment().endOf("week").endOf("day").unix();
  const cookies = parseCookies();
  const router = useRouter();
  const [notes, setNotes] = useState("");

  const price = useMemo(() => {
    const _price = cart?.lanes.reduce(
      (prev, current) => prev + current.price,
      0
    );
    return (_price ?? 0) + (cart?.box_booking_price ?? 0);
  }, [cart?.box_booking_price, cart?.lanes]);

  const { data = [] } = useQuery({
    queryKey: ["current_season_pass", cart?.sport],
    queryFn: () => getCurrentSeasonPass(cart?.sport),
    enabled: Boolean(cart?.sport) && !!cookies.token
  });

  const { data: facility } = useQuery({
    queryKey: ["facility"],
    queryFn: getFacility
  });

  const { mutate } = useMutation({
    mutationFn: removePendingBookings
  });

  const onSelectedSeasonPassChange = (pass: CurrentSeasonPass) => {
    let free_slots_used = 0;
    if (pass._id === cart?.season_pass?._id) {
      const _lanes = (cart?.lanes ?? []).map((_lane) => {
        let discount = _lane.slots.length;

        const weekly_slots_guard =
          moment(cart.date).unix() <= week_end && !!cart?.membership
            ? cart?.membership?.available_slots ?? 0
            : 0;

        if (weekly_slots_guard) {
          const available_free_slots =
            free_slots_used >= weekly_slots_guard
              ? 0
              : weekly_slots_guard - free_slots_used;

          discount =
            available_free_slots > _lane.slots.length
              ? 0
              : _lane.slots.length - available_free_slots;

          free_slots_used += available_free_slots
            ? available_free_slots >= _lane.slots.length
              ? _lane.slots.length
              : _lane.slots.length - available_free_slots
            : 0;

          _lane.free_slots_used = available_free_slots
            ? available_free_slots >= _lane.slots.length
              ? _lane.slots.length
              : _lane.slots.length - available_free_slots
            : 0;
        } else {
          _lane.free_slots_used = 0;
        }

        _lane.price = _lane.lane_price * discount;

        return _lane;
      });

      setCart((prev) => ({
        ...prev,
        date: prev!.date,
        sport: prev!.sport,
        lanes: _lanes,
        season_pass: undefined
      }));
      return;
    }

    const _lanes = (cart?.lanes ?? []).map((_lane) => {
      const available_free_slots =
        free_slots_used >= pass.available_slots
          ? 0
          : pass.available_slots - free_slots_used;

      const discount =
        available_free_slots > _lane.slots.length
          ? 0
          : _lane.slots.length - available_free_slots;

      free_slots_used += available_free_slots
        ? available_free_slots >= _lane.slots.length
          ? _lane.slots.length
          : _lane.slots.length - available_free_slots
        : 0;

      _lane.free_slots_used = available_free_slots
        ? available_free_slots >= _lane.slots.length
          ? _lane.slots.length
          : _lane.slots.length - available_free_slots
        : 0;

      _lane.price = _lane.lane_price * discount;

      return _lane;
    });

    setCart((prev) => ({
      ...prev,
      date: prev!.date,
      sport: prev!.sport,
      lanes: _lanes,
      season_pass: pass
    }));
  };

  return (
    <Drawer
      isOpen={open}
      placement="right"
      onClose={() => {
        close();
        setNotes("");
      }}
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent className="rounded-tl-xl rounded-bl-xl">
        {/* <DrawerCloseButton /> */}
        <DrawerHeader className="!p-4">
          <HStack alignItems="center">
            <Box
              onClick={() => {
                close();
              }}
              className="bg-lightPrimary  p-3 mr-4 flex justify-center items-center rounded-xl h-full cursor-pointer"
            >
              <IoMdClose color="#2C8EE3" size={20} className="" />
            </Box>
            <Text fontSize="3xl" fontWeight="bold" color="blue.900" mb={0}>
              Cart
            </Text>
          </HStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody className="!p-8 flex flex-col">
          <HStack alignItems="center">
            <IoBagOutline size={25} color="#2C8EE3" />
            <p className="text-xl font-semibold text-primaryText ml-1">
              Your Cart ({cart?.lanes.length ?? 0} items)
            </p>
            <IconButton
              variant="ghost"
              onClick={() => setCart(undefined)}
              aria-label=""
              className="ml-auto"
            >
              <IoIosRemoveCircleOutline className="" size={25} />
            </IconButton>
          </HStack>
          <VStack gap={4} className="mt-6 mb-4 flex-1">
            {cart?.lanes.map((_lane) => {
              return (
                <LaneCard
                  lane={_lane}
                  key={_lane.lane_id}
                  date={cart.date}
                  image={facility?.image}
                />
              );
            })}
            {!!cart?.box_booking_price && (
              <div className="rounded-xl border border-gray-200 p-4 w-full flex items-center justify-between">
                <h4 className="font-semibold">Box Booking Charge</h4>
                <div className="flex justify-between items-center gap-2">
                  <p className="text-base text-primary font-bold whitespace-nowrap">
                    ${cart.box_booking_price} USD
                  </p>
                </div>
              </div>
            )}
          </VStack>
          {/* <p className="text-primaryText mt-4">
            Taxes and promo codes applied at checkout
          </p> */}
        </DrawerBody>
        <DrawerFooter className="!px-8 flex-col" alignItems="stretch">
          <Textarea
            className="mb-3 h-auto"
            placeholder="Add notes..."
            resize="none"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <HStack className="mb-5">
            <p className="uppercase text-3xl text-primaryText font-extralight max-md:text-xl">
              Your total amount
            </p>
            <p className="text-primaryText font-bold text-3xl ml-4 max-md:text-xl">
              ${price ?? 0} USD
            </p>
          </HStack>
          <HStack gap={3}>
            <Button
              className="!bg-primary !text-white font-semibold !py-6 flex-1 !rounded-none"
              onClick={() =>
                cookies.token ? onTermsOpen() : router.push("/auth/login")
              }
              disabled={!Boolean(cart)}
            >
              Purchase
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                className="!h-auto !py-4 !px-4"
                rightIcon={<IoChevronDownOutline />}
                isDisabled={!Boolean(cart) || data.length === 0}
              >
                Season Pass {Boolean(cart?.season_pass) && " (1)"}
              </MenuButton>
              <MenuList minWidth="240px">
                {data.map((_pass) => {
                  return (
                    <MenuItemOption
                      key={_pass._id}
                      isChecked={cart?.season_pass?._id === _pass._id}
                      onClick={() => {
                        onSelectedSeasonPassChange(_pass);
                      }}
                    >
                      <VStack alignItems="flex-start" gap={1}>
                        <p className="font-medium">{_pass.season_pass.name}</p>
                        <p className=" text-gray-600">
                          Available slots: {_pass.available_slots}
                        </p>
                      </VStack>
                    </MenuItemOption>
                  );
                })}
              </MenuList>
            </Menu>
          </HStack>
          {/* <Button
            className="!text-primaryText !bg-white font-semibold !py-6 px-5 border !rounded-none border-black  flex-1"
            disabled={!Boolean(cart)}
          >
            Continue
          </Button> */}
        </DrawerFooter>
      </DrawerContent>
      <TermsAndConditions
        isOpen={isTermsOpen}
        onClose={onTermsClose}
        onProceed={() => {
          onOpen();
          onTermsClose();
        }}
      />
      {!!cart ? (
        <PaymentModal
          isOpen={isOpen}
          onClose={(success?: boolean) => {
            if (success) {
              setCart(undefined);
              close();
            } else {
              mutate();
            }
            onClose();
          }}
          type="booking"
          date={cart!.date}
          lanes={
            cart?.lanes.map((_lane) => ({
              lane_id: _lane.lane_id!,
              price: _lane.price!,
              slots: _lane.slots!,
              free_slots_used: _lane.free_slots_used
            })) ?? []
          }
          box_booking_price={cart?.box_booking_price}
          membership_id={cart.membership?.membership_id}
          season_pass_id={cart.season_pass?.season_pass_id}
          price={price || 0}
          sport={cart!.sport}
          note={notes}
        />
      ) : null}
    </Drawer>
  );
}
