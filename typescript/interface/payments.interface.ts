export type MetadataType =
  | SeasonPassMetaData
  | MembershipMetaData
  | BookingMetaData;

export type SeasonPassMetaData = {
  type: "season_pass";
  price: number;
  season_pass_id: string;
};

export type MembershipMetaData = {
  type: "subscription";
  price_id: string;
  package_id: string;
  price: number;
};

export type BookingMetaData = {
  type: "booking";
  price: number;
  date: string;
  sport: string;
  membership_id?: string;
  season_pass_id?: string;
  box_booking_price?: number;
  note?: string;
  lanes: {
    slots: string[];
    lane_id: string;
    price: number;
    free_slots_used: number;
  }[];
};
