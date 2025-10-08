import { Play } from "lucide-react";

type Props = {
  title: string;              
  highlight: string;          
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  trailerThumb: string;       
  trailerUrl?: string;        
};

export default function HeroTrailer({
  title,
  highlight,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis mollis suscipit maecenas amet eget.",
  ctaText = "Watch Now",
  ctaHref = "#",
  trailerThumb,
  trailerUrl,
}: Props) {
  return (
    <section className="relative overflow-hidden ">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left: copy */}
          <div className="text-left">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              <span className="text-white">{title.toUpperCase()} </span>
              <span className="text-yellow-400">{highlight.toUpperCase()}</span>
            </h1>
            <p className="mt-4 max-w-md text-slate-300">{description}</p>

            <div className="mt-6">
              <a
                href={ctaHref}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-[0_10px_25px_-10px_rgba(59,130,246,0.7)] hover:opacity-95 active:opacity-90"
              >
                {ctaText.toUpperCase()}
              </a>
            </div>
          </div>

          {/* Right: laptop mock with trailer */}
          <div className="relative mx-auto w-full max-w-xl">
            {/* laptop frame */}
            <div className="rounded-2xl border border-white/10 bg-black/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
              {/* “bezel” */}
              <div className="rounded-t-2xl border-b border-white/10 px-6 py-2 text-center text-[10px] text-white/40">
                MacBook Pro
              </div>

              {/* screen */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-b-2xl">
                <img
                  src={trailerThumb}
                  alt="Trailer"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                <a
                  href={trailerUrl || "#"}
                  target={trailerUrl ? "_blank" : undefined}
                  rel={trailerUrl ? "noreferrer" : undefined}
                  className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-black/40 px-4 py-2 text-white backdrop-blur hover:bg-black/50"
                >
                  <span className="flex size-10 items-center justify-center rounded-full border-2 border-white">
                    <Play className="ml-0.5 size-5" />
                  </span>
                  <span className="text-lg font-extrabold tracking-wide">
                    TRAILER
                  </span>
                </a>
              </div>
            </div>

            {/* bottom “base”/shadow to sell the laptop look */}
            <div className="mx-auto mt-2 h-2 w-[90%] rounded-full bg-gradient-to-r from-white/10 via-white/25 to-white/10"></div>
          </div>
        </div>
      </div>

      {/* subtle background vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_50%,rgba(59,130,246,0.15),transparent),radial-gradient(50%_40%_at_20%_40%,rgba(250,204,21,0.12),transparent)]" />
    </section>
  );
}
