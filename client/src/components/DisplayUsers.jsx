"use client";

import React, { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "");

const DisplayUsers = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  // Fetch all data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(BASE_URL);
        const response = await result.json();
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err)
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete 

  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
      })
      setUserData(userData.filter((user) => user.id !== id))
    } catch (err) {
      console.error(err)
    }

  }

  //Edit

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const result = await fetch(`${BASE_URL}/${selectedUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await result.json();

      if (!result.ok) {
        throw new Error(response.message || "Failed to update user");
      }

      setUserData((users) =>
        users.map((user) =>
          user.id === selectedUserId ? response.data : user,
        ),
      );
      setFormData({ name: "", email: "", age: "" });
      setSelectedUserId(null);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age ?? "",
    });
    setIsOpen(true);
  }

  const handleCancelEdit = () => {
    setIsOpen(false);
    setSelectedUserId(null);
    setFormData({ name: "", email: "", age: "" });
  };

  return (
    <div className="relative mt-10 grid grid-cols-1 gap-4 rounded-lg bg-amber-500 px-4 py-8 sm:px-6 md:grid-cols-2 xl:grid-cols-3">
      {loading ? (<div className="flex items-center justify-center col-span-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>)
        : (userData.length > 0
          ? userData.map((data) => (
            <div key={data.id} className="flex justify-between gap-6 rounded-md bg-red-900 p-4">
              <div className="flex flex-col">
                <p className="text-lg text-white"><span className="font-bold">Name: </span><span className=" text-white/70">{data.name}</span></p>
                <p className="text-lg text-white"><span className="font-bold">Email: </span><span className=" text-white/70">{data.email}</span></p>
                <p className="text-lg text-white"><span className="font-bold">Age: </span><span className=" text-white/70">{data.age}</span></p>
              </div>
              <div className="flex flex-col justify-center items-between gap-3">
                <button
                  type="button"
                  onClick={() => handleEdit(data)}
                  className="py-1 px-2 text-sm rounded border-2 text-white font-semibold border-green-500 cursor-pointer hover:bg-green-500 hover:text-white hover:scale-102 hover:border-white duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(data.id)}
                  className="py-1 px-2 text-sm rounded border-2 text-white font-semibold border-red-500 cursor-pointer hover:bg-red-500 hover:text-white hover:scale-102 hover:border-white duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
          : (
            <p className="text-black/60 font-semibold">No users yet!!</p>
          )
        )}

      {isOpen &&
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-user-title"
        >
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col gap-4 rounded-xl bg-orange-600 p-6 shadow-2xl sm:p-8">
              <div>
                <h2 id="edit-user-title" className="text-2xl font-bold text-white">
                  Edit User
                </h2>
                <p className="mt-1 text-sm text-white/80">
                  Update the user details below.
                </p>
              </div>
              <div className="flex flex-col gap-1 rounded bg-white p-3 shadow">
                <label htmlFor="name" className="font-bold">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  id="name"
                  onChange={handleChange}
                  className="rounded border border-gray-300 p-2 outline-none focus:border-orange-600"
                  value={formData.name}
                />
              </div>
              <div className="flex flex-col gap-1 rounded bg-white p-3 shadow">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  id="email"
                  onChange={handleChange}
                  className="rounded border border-gray-300 p-2 outline-none focus:border-orange-600"
                  value={formData.email}
                />
              </div>
              <div className="flex flex-col gap-1 rounded bg-white p-3 shadow">
                <label htmlFor="age" className="font-bold">
                  Age
                </label>
                <input
                  type="text"
                  name="age"
                  placeholder="Enter your Age"
                  id="age"
                  onChange={handleChange}
                  className="rounded border border-gray-300 p-2 outline-none focus:border-orange-600"
                  value={formData.age}
                />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded border border-white/80 px-4 py-2 font-semibold text-white transition hover:bg-white/20 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="cursor-pointer rounded bg-white px-4 py-2 font-bold text-orange-700 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdating ? "Updating..." : "Update User"}
                </button>
              </div>
            </div>
          </form>
        </div>
      }
    </div>
  );
};

export default DisplayUsers; 