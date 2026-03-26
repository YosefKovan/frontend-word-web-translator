export type UpdateUserInput =
  | { action_type: "change_role"; target_user_id: string; new_role: "user" | "admin" }
  | { action_type: "activate"; target_user_id: string }
  | { action_type: "deactivate"; target_user_id: string };
