import React, { useEffect } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-900 h-[100px] flex justify-between items-center gap-5 pl-5 text-white">
      <h1 className="text-2xl font-extrabold ">File storage</h1>
      <div className="flex items-center gap-5 px-5">
        {/* <Link className=" px-2 py-1.5" to="/">
          Blobs
        </Link> */}
        <Link className=" px-2 py-1.5" to="/chunks">
          Gallary
        </Link>
        <Link className=" px-2 py-1.5" to="/ipfs">
          IPFS
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
