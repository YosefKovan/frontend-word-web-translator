import {type User} from "./user"

export interface AdminData {
  "total_users":  number,
  "active_users":  number,
  "total_words_in_system": number,
  "users": User[]
}
