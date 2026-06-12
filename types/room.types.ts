// types/room.types.ts
export type RoomType = {
  id: string;
  name: string;
  icon: React.ReactNode;
  maxGuests: number;
  features: string[];
  desc?: string;
};