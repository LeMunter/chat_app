export type Chatroom = {
  id: number;
  name: string;
  is_public: boolean;
  tag: string;
};

export type AdminPanelChatRooms = {
  private_rooms: Chatroom[];
  public_rooms: Chatroom[];
}

export type NewChatroom = {
  name: string;
  is_public: boolean;
  tag: string;
};
