export interface Lane {
  _id: string;
  name: string;
  about?: string;
  sport: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type AddLaneBody = Omit<Lane, "createdAt" | "updatedAt" | "__v" | "_id">;

export interface EditLaneBody extends AddLaneBody {
  lane_id: string;
}
