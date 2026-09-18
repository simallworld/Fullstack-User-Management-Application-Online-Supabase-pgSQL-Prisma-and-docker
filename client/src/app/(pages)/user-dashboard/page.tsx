import DisplayUsers from "../../components/DisplayUsers";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-screen mt-20 flex flex-col items-center justify-center">
      <h3 className="text-white text-2xl font-bold">
        User Management Application
      </h3>
      <div className="mt-5 p-5 rounded-md flex items-center gap-5">
        <h3 className="text-white text-2xl font-bold">All Users data</h3>
        <Link
          href="/"
          className="drop-shadow-2xl border-2 border-white/70 py-1 px-2 text-white rounded-md hover:scale-110 duration-150"
        >
          Home
        </Link>
      </div>
      <div>
        <DisplayUsers />
      </div>
    </div>
  );
};

export default page;
