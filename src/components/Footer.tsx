import React from "react";

const FooterLinks = () => {
  const links = [
    { link: "/", label: "Landing" },
    { link: "/journey", label: "Journey" },
    { link: "/resources", label: "Resources" },
    { link: "/about", label: "About" },
  ];
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-xl">Links</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li className="opacity-80">
            {/* <Link to={link.link}>{link.label}</Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Contribute = () => {
  return (
    <div>
      <h3>Want to contribute?</h3>
      <p>It's open source, so you can help out if you want.</p>
    </div>
  );
};

const FooterSiteName = () => {
  return (
    <div className="space-y-3">
      <h3 className="font-bold text-2xl">{process.env.SITE_NAME}</h3>
      <div className="opacity-80">box-master@gmail.com</div>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="w-full mt-[8rem] flex flex-col px-24 border-t">
      {/* <div>Sponsor me</div> */}
      <div className="flex items-start justify-between pb-12 pt-8">
        <FooterSiteName />
        <FooterLinks />
      </div>
      <div className="w-full text-lg opacity-80 py-6">
        <div> &copy; {new Date().getFullYear()} Jakub Wojcik</div>
      </div>
    </footer>
  );
}
