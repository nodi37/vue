import { fetchData } from "@/utils/fetchData";
import { GetSingleUserResponse, GetUsersResponse, UserData } from "./types";

const API_URL = "https://reqres.in/api";

const getUsers = async (page: number, perPage?: number) => {
  const response = await fetchData<GetUsersResponse>(
    `${API_URL}/users?page=${page}&per_page=${perPage ?? 10}`
  );
  return response;
};

const getUserData = async (id: number) => {
  const response = await fetchData<GetSingleUserResponse>(
    `${API_URL}/users/${id}`
  );
  if (response.success) {
    response.success;
    return {
      success: true,
      data: response.data,
    };
  }

  return response;
};

const deleteUserById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });
    return { success: response.ok };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const createUser = async (body: Partial<UserData>) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return { success: response.ok };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

const updateUserById = async (id: number, body: Partial<UserData>) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return { success: response.ok };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export { getUsers, getUserData, createUser, updateUserById, deleteUserById };
