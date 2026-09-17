"use client";

import React, { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const DisplayUsers = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(BASE_URL);
      const response = await result.json();
      console.log(response.data)
      setUserData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 mt-10 bg-amber-500 py-8 px-10 rounded-lg">
      {userData.length > 0
        ? userData.map((data) => (
          <div key={data.id} className="flex flex-col bg-red-500 py-4 px-6 m-2 gap-2 rounded-md">
            <p className="text-lg text-white"><span className="font-bold">Name: </span><span className=" text-white/70">{data.name}</span></p>
            <p className="text-lg text-white"><span className="font-bold">Email: </span><span className=" text-white/70">{data.email}</span></p>
            <p className="text-lg text-white"><span className="font-bold">Age: </span><span className=" text-white/70">{data.age}</span></p>
          </div>
        ))
        : (
          <p className="text-black/60 font-semibold">No users yet!!</p>
        )}
    </div>
  );
};

export default DisplayUsers; 