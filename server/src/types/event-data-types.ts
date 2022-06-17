export type EventLogin = {
  user_id: number;
};

export type EventChatMessage = {
  room_id: number;
  message: string;
  username: string;
  user_id: number;
};

export type EventJoinRoom = {
  room_id: number;
  user_id: number;
};
