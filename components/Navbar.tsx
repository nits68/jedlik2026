"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

type NavLink = {
  title: string;
  path: string;
};

const navLinks: NavLink[] = [
  { title: "Top", path: "#hero" },
  { title: "About", path: "#about" },
  { title: "Portfolio", path: "#portfolio" },
  { title: "Services", path: "#services" },
  { title: "Contact", path: "#contact" },
];

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  return (
    <div className="fixed z-50 flex w-full justify-center font-bold text-white">
      <div className="mx-auto mt-2 hidden max-w-[500px] items-center justify-center rounded-3xl border border-white/20 p-2 backdrop-blur-3xl md:flex">
        <ul className="flex flex-row space-x-8 p-2">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="transform transition-all duration-300 ease-in-out hover:skew-x-12 hover:text-white/50"
                href={link.path}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="absolute top-5 right-14 z-50 rounded border border-white/70 p-2 text-white/70 md:hidden"
        onClick={toggleNav}
      >
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>

      <div
        className={`fixed top-0 left-0 z-40 h-full w-full transform bg-black/90 transition-transform duration-300 ${
          nav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center space-y-8">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link className="text-5xl" href={link.path} onClick={closeNav}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
