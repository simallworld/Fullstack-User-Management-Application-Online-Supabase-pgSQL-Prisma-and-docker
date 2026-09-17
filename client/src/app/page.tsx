import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen mt-20 flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold text-white">User Management Application</h3>

      <div className="mt-10 bg-orange-500 p-5  drop-shadow-2xl rounded-md flex gap-5">
        <Link
          href="/user-dashboard"
          className="border-2 border-white/70 text-white p-2 rounded-md hover:scale-110 duration-150"
        >
          Show all Users
        </Link>
        <Link
          href="/create-user"
          className="bg-white p-2 rounded-md hover:scale-110 duration-150"
        >
          Create User
        </Link>
      </div>
    </div>
  );
}
