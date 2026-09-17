"use client";
import React, { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    await result.json();
    setFormData({ name: "", email: "", age: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col bg-orange-600 p-10 w-sm gap-2 rounded-2xl">
          <div className="flex flex-col bg-white p-3 rounded shadow-2xl">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              id="name"
              onChange={handleChange}
              className="p-1"
              value={formData.name}
            />
          </div>
          <div className="flex flex-col bg-white p-3 rounded shadow-2xl">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              id="email"
              onChange={handleChange}
              className="p-1"
              value={formData.email}
            />
          </div>
          <div className="flex flex-col bg-white p-3 rounded shadow-2xl">
            <label htmlFor="age" className="font-bold">
              Age
            </label>
            <input
              type="text"
              name="age"
              placeholder="Enter your Age"
              id="age"
              onChange={handleChange}
              className="p-1"
              value={formData.age}
            />
          </div>
          <button
            type="submit"
            className="mt-3 p-3 rounded shadow-2xl border-4 text-white font-bold border-white cursor-pointer hover:bg-white hover:text-black hover:scale-102 duration-200"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
