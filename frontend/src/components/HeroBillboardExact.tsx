import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  bg?: string;
  posters?: string[];
  ctaHref?: string;
};

export default function HeroBillboardExact({
  bg = "/images.jpeg",
  posters = [
    "https://m.media-amazon.com/images/M/MV5BZmQ4OTk3ODUtM2QzNS00MGE4LThjMzUtM2UxODRjMWY3NDYzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
  ],
  ctaHref = "/browse",
}: Props) {
  const [idx, setIdx] = useState(0);
  const has = posters.length > 0;
  const current =
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop";
  // const current = useMemo(() => (has ? posters[idx % posters.length] : ""), [has, posters, idx]);

  const prev = () => setIdx((i) => (i - 1 + posters.length) % posters.length);
  const next = () => setIdx((i) => (i + 1) % posters.length);

  return (
    <section
      className={[
        "relative overflow-hidden",
        "min-h-[420px] md:min-h-[520px] lg:min-h-[560px]",
        // "bg-gradient-to-b from-[#292a2f] to-[#0c0d10]"
      ].join(" ")}
    >
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bg}')`,
          filter: "blur(10px) brightness(0.7)",
          transform: "scale(1.05)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 -z-20 bg-[#0a0f1f]/82"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.78))]" />

      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 py-10 md:flex-row md:items-center md:gap-8 md:py-14">
        {/* Left column: exact text styles/colors */}
        <div className="w-full flex-1 p-28">
          <h1
            className={[
              "max-w-xl font-extrabold leading-[1.05] tracking-tight uppercase",
              "text-sky-400", // vivid blue like screenshot
              "text-3xl md:text-5xl lg:text-6xl",
            ].join(" ")}
          >
            BEST WAY OF
            <br />
            ENTERTAINMENT
          </h1>

          <p className="mt-4 text-[20px] md:text-xl font-extrabold tracking-wide text-white">
            MOVIES AS YOU DEMAND AT USD{" "}
            <span className="text-yellow-400">10/MONTH</span>
          </p>
        </div>

        {/* Right column: centered poster card with chevrons */}
        <div className="relative w-[230px] sm:w-[260px] md:w-[300px] mr-28">
          {/* Poster card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[2px]">
            <div className="aspect-[2/3]">
              {current ? (
                <img
                  src={current}
                  alt="Featured poster"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full animate-pulse bg-white/10" />
              )}
            </div>
          </div>

          {/* White chevrons centered vertically, sitting outside the card edge */}
          <button
            aria-label="Previous"
            onClick={prev}
            disabled={!has || posters.length < 2}
            className={[
              "absolute left-[-22px] top-1/2 -translate-y-1/2",
              "rounded-xl bg-white p-2 text-slate-900 shadow-md",
              "disabled:opacity-40",
            ].join(" ")}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            disabled={!has || posters.length < 2}
            className={[
              "absolute right-[-22px] top-1/2 -translate-y-1/2",
              "rounded-xl bg-white p-2 text-slate-900 shadow-md",
              "disabled:opacity-40",
            ].join(" ")}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Purple overlapping pill — placed at card's bottom center */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-6 flex justify-center">
            <span
              className={[
                "pointer-events-auto rounded-full px-5 py-2 text-xs font-semibold text-white",
                "bg-gradient-to-r from-indigo-600 to-blue-600 shadow",
              ].join(" ")}
            >
              WATCH NOW
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
