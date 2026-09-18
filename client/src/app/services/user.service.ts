const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface User {
  id: number;
  name: string;
  email: string;
  age: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  age?: number;
}

export interface UpdateUserData {
  name: string;
  email: string;
  age?: number;
}

const getErrorMessage = async (response: Response) => {
  const result = await response.json().catch(() => null);
  return result?.message || "Request failed";
};

// Get all the Users API
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const result = await response.json();
  return result.data;
};

// Create User API
export const createUser = async (data: CreateUserData): Promise<User> => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const result = await response.json();
  return result.data;
};

// Update User Data API
export const updateUser = async (
  id: number,
  data: UpdateUserData,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const result = await response.json();
  return result.data;
};

// Delete user API
export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
};
