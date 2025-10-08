import React from "react";
import { Globe2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const FooterCol: React.FC<{ title: string; links: string[] }> = ({
  title,
  links,
}) => (
  <div>
    <h4 className="mb-3 text-sm font-semibold text-white/80">{title}</h4>
    <ul className="space-y-2 text-sm text-white/60">
      {links.map((l) => (
        <li
          key={l}
          className="cursor-pointer transition-colors hover:text-white"
        >
          {l}
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0c12]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0a0c12]/60">
      {/* main grid */}
      <div className="mx-auto max-w-7xl px-20 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr,1fr,1fr]">
          <FooterCol
            title="Upcoming Movies"
            links={["Trailers", "This Week", "Top Rated", "New on MOVIEWORLD"]}
          />
          <FooterCol
            title="Additional Pages"
            links={["Pricing", "Live TV", "Blog", "Support"]}
          />
          <div>
            <div className="flex items-center gap-2">
              <Link to="/" className="text-xl font-extrabold tracking-tight">
                MOVIE<span className="text-sky-400">world</span>
              </Link>
            </div>

            <p className="mt-3 max-w-sm text-sm text-white/60">
              Stream movies and series in HD. Personalized recommendations,
              offline downloads, and multi-device support.
            </p>

            <div className="mt-4 flex items-center gap-2 text-white/50"></div>
            <div className="flex items-center gap-3 ml-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-7 place-items-center rounded-full bg-white/10 text-white hover:bg-sky-600 transition"
              >
                <Facebook className="size-3.5  " />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-7 place-items-center rounded-full bg-white/10 text-white hover:bg-sky-500 transition"
              >
                <Twitter className="size-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-7 place-items-center rounded-full bg-white/10 text-white hover:bg-sky-700 transition"
              >
                <Linkedin className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* divider line */}
      <hr className="max-w-7xl mx-auto border-t border-gray-600/60" />

      {/* bottom bar */}
      <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-white/50 border-t border-white/5">
        © {new Date().getFullYear()} Bappa. All rights reserved.
      </div>
    </footer>
  );
}
