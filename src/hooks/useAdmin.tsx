import { type AdminData } from "../types/adminData";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {type UpdateUserInput} from "../types/updateUserInput";

const FETCH_URL: string = "https://admin-service-e3251105-dev.apps.rm2.thpm.p1.openshiftapps.com/api/admin/overview";
const UPDATE_URL: string = "/api/admin/admin/users";
const DELETE_URL: string = "/api/admin/admin/users";

const getAuthHeaders = (withBody = false): HeadersInit => {
  const token = localStorage.getItem("token");
  return {
    ...(withBody ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

//fetch admin data
const fetchAdminData = async (): Promise<AdminData> => {
  const res = await fetch(FETCH_URL, { headers: getAuthHeaders(false) });
  if (!res.ok) throw new Error("Network error");
  return res.json();
};

//delete user function
const deleteUser = async (userId: string): Promise<void> => {
  const res = await fetch(`${DELETE_URL}/${userId}`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });

  if (!res.ok) {
    // This will trigger the 'onError' in useMutation
    throw new Error(`Failed to delete: ${res.status} ${res.statusText}`);
  }

  return await res.json();
};

//update user function
const updateUser = async (updateData: UpdateUserInput): Promise<void> => {
  const res = await fetch(`${UPDATE_URL}/${updateData.target_user_id}`, {
    method: "POST",
    body: JSON.stringify(updateData),
    headers: getAuthHeaders(true),
  });

  if(!res.ok){
    throw new Error(`Failed to update: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}


//=========================================
//          use admin hook 
//=========================================
export function useAdmin() {
  const queryClient = useQueryClient();

  // TypeScript now knows 'data' is Todo[] | undefined
  const { isPending, error, data } = useQuery<AdminData, Error>({
    queryKey: ["adminData"],
    queryFn: fetchAdminData,
  });
  

  //update user
  const updateMutation = useMutation<void, Error, UpdateUserInput>({
    mutationFn : (updateData :  UpdateUserInput)=> updateUser(updateData),
    onSuccess: () => {
      toast.success("User Updated successfully.")
      queryClient.invalidateQueries({ queryKey: ["adminData"] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  
  //delete user
  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      toast.success("User removed successfully.")
      queryClient.invalidateQueries({ queryKey: ["adminData"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    data,
    isPending,
    error,
    deleteUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    updateUser : updateMutation.mutate,
    isUpdating : updateMutation.isPending,
  };
}
