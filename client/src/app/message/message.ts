import {User} from "../users/user";

export interface Message {
  _id: string;
  sender: User;
  body: string;
  sent: Date;
}
