"use client";
import React, { useState } from "react";
import { createUser } from "../services/user.service";

const initialFormData = {
  name: "",
  email: "",
  age: "",
};

const UserForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsCreating(true);

    try {
      await createUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        age: formData.age ? Number(formData.age) : undefined,
      });

      setFormData(initialFormData);
    } catch (requestError) {
      setError(requestError.message || "Failed to create user");
    } finally {
      setIsCreating(false);
    }
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
              required
              onChange={handleChange}
              className="p-1 border-b-3 rounded-md border-orange-600"
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
              required
              onChange={handleChange}
              className="p-1 border-b-3 rounded-md border-orange-600"
              value={formData.email}
            />
          </div>
          <div className="flex flex-col bg-white p-3 rounded shadow-2xl">
            <label htmlFor="age" className="font-bold">
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter your Age"
              id="age"
              onChange={handleChange}
              className="p-1 border-b-3 rounded-md border-orange-600"
              value={formData.age}
            />
          </div>

          {error && <p className="text-sm text-white">{error}</p>}
          <button
            type="submit"
            disabled={isCreating}
            className="mt-6 p-3 rounded shadow-2xl border-4 border-white text-white font-bold cursor-pointer hover:bg-white hover:text-orange-600 hover:scale-102 duration-200"
          >
            {isCreating ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
