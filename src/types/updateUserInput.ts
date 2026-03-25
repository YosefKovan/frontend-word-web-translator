export type UpdateUserInput =
  | { action_type: "change_role"; target_user_id: string; new_role: "user" | "admin" }
  | { action_type: "change_status"; target_user_id: string; new_status: "active" | "inactive" };
