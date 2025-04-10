import { Lane } from "./lane.interfaces";

export type DaysInterface =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type SportsInterface = "cricket" | "badminton";

export interface FacilityDay {
  _id: string;
  day: string;
  timings: {
    start_time: string;
    end_time: string;
  };
}

export interface EditFacilityBody {
  facility_id: string;
  name: string;
  about?: string;
  days: Omit<FacilityDay, "_id">[];
}

export interface Facility {
  _id: string;
  name: string;
  about?: string;
  image: string;
  days: FacilityDay[];
  lanes: Lane[];
  price: {
    [key in SportsInterface]: {
      [key in DaysInterface]: number;
    };
  };
  box_booking_price: number;
  reschedule_charge: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
