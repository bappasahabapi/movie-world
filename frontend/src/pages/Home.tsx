import AddedSection from "../components/AddSection";
import HeroBillboardExact from "../components/HeroBillboardExact";
import HeroTrailer from "../components/HeroTrailer";
import Section from "../components/Section";
import SpotlightSection from "../components/SpotlightSection";

export default function Home() {
  return (
    <div>
      <HeroBillboardExact bg="/images.jpeg" ctaHref="/browse" />

      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-24 left-48 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
          <div className="absolute top-24 left-48 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
          <div className="absolute top-24-24 right-20 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
        </div>
        <SpotlightSection
          title="Upcoming Movies"
          subtitle="We constantly offer new movies"
          category="upcoming"
          leftBadge="New"
          rightBadge="Exclusive"
        />
      </header>

      <div className="relative overflow-hidden">
        <div
          className="absolute h-8 inset-0 -z-10 bg-[url('/details.png')] bg-cover bg-center opacity-20 blur-sm"
          aria-hidden="true"
        />
      </div>
      <HeroTrailer
        title="Enjoy it"
        highlight="Movies"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis mollis suscipit maecenas amet eget."
        ctaText="Watch Now"
        ctaHref="/browse"
        trailerThumb="https://img.youtube.com/vi/pBk4NYhWNMM/maxresdefault.jpg" 
        trailerUrl="https://www.youtube.com/watch?v=pBk4NYhWNMM"
      />

      <Section title="Movies You Rated" category="rated" />
      <Section title="Your Watch-list" category="watchlist" />
      <AddedSection />
    </div>
  );
}
