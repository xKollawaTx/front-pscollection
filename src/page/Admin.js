import React from "react";
import Addgame from "./Addgame";
import DeleteGame from "../components/DeleteGame";
import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const Admin = () => {
  const navigate = useNavigate();
  //if don't admin, redirect to home
  const userData = useSelector((state) => state.user);
  if (!userData._id) {
    navigate("/");
  }
  const [open, setOpen] = useState(0);
  

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="p-2 md:p-4 text-white">
      <div className="w-full max-w-sm text-white m-auto flex items-center flex-col p-4">
        <p className="px-2 py-2 text-xl md:text-2xl font-bold">Admin Panel</p>
      </div>
      <div className="bg-tenth rounded mb-5 h-[70px] border-solid border-4 border-eleventh"
      >
        <Link to="/requestadmin">
        <p className="px-3 text-2xl py-4 font-bold">All Requests</p>
        </Link>
      </div>
      <div className="bg-tenth rounded mb-5 h-[70px] border-solid border-4 border-eleventh"
      >
        <Link to="/addgame">
        <p className="px-3 text-2xl py-4 font-bold">Addgame</p>
        </Link>
      </div>
      <Fragment className="">
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader
            className="bg-tenth rounded mb-5 border-solid border-4 border-eleventh"
            onClick={() => handleOpen(2)}
          >
            <p className="px-3 text-2xl">Edit/Delete game</p>
          </AccordionHeader>
          <AccordionBody>
            <DeleteGame />
          </AccordionBody>
        </Accordion>
      </Fragment>
    </div>
  );
};

export default Admin;
