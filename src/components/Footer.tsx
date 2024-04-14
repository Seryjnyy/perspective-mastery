import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const FooterLinks = () => {
  const links = [
    { link: "/", label: "Landing" },
    { link: "/journey", label: "Journey" },
    { link: "/freeview", label: "Freeview" },
    // { link: "/resources", label: "Resources" },
    { link: "/about", label: "About" },
  ];
  return (
    <div className="pt-12 md:pt-0">
      <h3 className="font-bold text-xl">Links</h3>
      <ul className="flex md:flex-col md:gap-2 gap-3  flex-row">
        {links.map((link, index) => (
          <li className="opacity-80" key={link.label + index}>
            <Link href={`${link.link}`}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Contribute = () => {
  return (
    <div>
      <h3 className="font-bold text-xl">Want to contribute?</h3>
      <Link
        href={process.env.GITHUB_LINK ?? "#"}
        target="_blank"
        className="flex gap-2 items-center opacity-80"
      >
        Repository <GitHubLogoIcon />
      </Link>
    </div>
  );
};

const FooterSiteName = () => {
  return (
    <div>
      <h3 className="font-bold text-3xl">{process.env.SITE_NAME}</h3>
      <div className="opacity-80">box-master@gmail.com</div>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="w-full mt-[8rem] flex flex-col md:px-24 border-t">
      <div className="flex items-start justify-between pb-12 px-2 pt-8 flex-wrap">
        <div className="flex flex-col gap-12 pr-12">
          <FooterSiteName />
          <Contribute />
        </div>
        <FooterLinks />
      </div>

      <div className="px-2 w-full text-lg opacity-80 md:py-6 py-2">
        <div> &copy; {new Date().getFullYear()} Jakub Wojcik</div>
      </div>
    </footer>
  );
}
