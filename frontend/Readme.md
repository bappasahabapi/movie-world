## Project Structure

```bash

frontend/
├─ .gitignore
├─ index.html
├─ package.json
├─ package-lock.json
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
├─ vite.config.ts
├─ public/
│  ├─ details.png
│  ├─ images.jpeg
│  └─ landing.png
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ styles.css
   ├─ api/
   │  └─ axios.ts                # Axios instance + auth header interceptor + list picker helper
   ├─ components/
   │  ├─ AddSection.tsx
   │  ├─ HeroBillboardExact.tsx
   │  ├─ HeroTrailer.tsx
   │  ├─ MovieCard.tsx
   │  ├─ Section.tsx
   │  ├─ SpotlightSection.tsx
   │  └─ shared/
   │     ├─ Footer.tsx
   │     └─ Navbar.tsx
   ├─ context/
   │  └─ AppContext.tsx          # App-level context provider
   ├─ features/
   │  └─ auth/
   │     └─ authSlice.ts         # login/register thunks, token persistence, logout reducer
   ├─ pages/
   │  ├─ EditMovie.tsx           # (route currently commented out in App.tsx)
   │  ├─ Home.tsx
   │  ├─ Login.tsx
   │  ├─ MovieDetails.tsx
   │  ├─ Register.tsx
   │  └─ Watchlist.tsx
   ├─ redux/
   │  └─ store.ts                # Redux store configuration
   ├─ types/
   │  └─ index.ts
   ├─ utils/
   │  └─ hooks.ts
   └─ __tests__/
      ├─ listAdapter.test.ts
      └─ section.fetch.test.tsx


```