# 🏗️ Mackey's Portfolio Architecture Guide

Welcome! This document is designed to be your comprehensive study guide for understanding the architecture, data flow, and routing of your React portfolio. You can use this to review how your codebase is structured so you feel 100% confident explaining it to any interviewer or team.

---

## 1. High-Level Folder Structure

Here is a visual breakdown of your workspace and what each folder is responsible for.

```text
mackey-portfolio/
├── public/                 - Static assets served directly at the root (images, resume, favicon). 
├── src/                    - Core source code for the React application.
│   ├── components/         - All React components, neatly divided by their domain.
│   │   ├── layout/         - Global layout structures (Navbar, Footer).
│   │   ├── pages/          - Full page views (e.g., ProjectDetail).
│   │   ├── sections/       - Sections mapping to the single-page scroll view (Hero, About, Projects, etc).
│   │   └── ui/             - Smaller, reusable design atoms (Buttons, Cards, Badges, ImageCarousel).
│   ├── data/               - Static data sets (portfolio.js) acting as a local database.
│   ├── App.jsx             - Main component orchestrating React Router and page assembly.
│   ├── main.jsx            - Application entry point that mounts React to the DOM.
│   └── index.css           - Global Tailwind CSS configurations and base styles.
├── index.html              - The single HTML file serving the React app.
├── package.json            - Project metadata and npm dependency definitions.
└── vite.config.js          - Configuration for the Vite build tool.
```

---

## 2. The Entry Point & Configuration

### `index.html` & `vite.config.js`
Unlike older React setups (like Create React App) which hide the HTML file in a public folder, **Vite** puts `index.html` front and center at the root. Vite treats `index.html` as the true entry point of your application, looking for the `<script type="module" src="/src/main.jsx">` tag to know where to execute your React code. `vite.config.js` simply tells the Vite bundler how to wire up plugins (like `@vitejs/plugin-react`) to compile JSX securely and incredibly fast.

### Vercel Deployment & The `public/` Folder
Why did we just move all our images to `public/`? 
When Vite builds your project for Vercel, any image located in `src/assets/` gets hashed and renamed (e.g., `image-X7Yz.jpg`) and must be strictly imported into components to work correctly.
However, files in the **`public/` directory** are served *statically* and *exactly as they are named* directly to the server root. This means `public/images/photo_mackey6.webp` can always be reliably accessed securely at `yoursite.com/images/photo_mackey6.webp`. This is crucial for fixing 404 deployment paths, generating SEO meta tags, and ensuring root-relative linking works universally.

---

## 3. Component Breakdown

Here is every major conceptual component in your project:

### Entry & Layout
- **`App`**: Sets up `react-router-dom` providing URLs like `/` and `/project/:id`. 
- **`Navbar`**: Renders the top navigation. **Hooks used**: `useState` (to track if the mobile menu is open) and `useEffect` (to listen to window scrolling and conditionally apply a glass backdrop when scrolling down).
- **`Footer`**: Simple static footer with copyright info.

### Scrollable Sections (Home Page)
- **`Hero`**: The top landing section. Uses `framer-motion` to animate elements traversing onto the screen.
- **`About`**: Contains your profile photo and the Bento-Grid layout highlighting your skills.
- **`Skills / Education / Experience`**: Renders your academic and professional history, iterating over data directly imported from `portfolio.js`.
- **`Contact`**: Bottom CTA (Call to Action) encouraging users to reach out.

### Feature Components
- **`Projects`**: Iterates over the `projects` array in `portfolioData`. For each project, it renders a thumbnail, maps out tags (using the `Badge` UI component), and outputs conditional links (e.g. "Watch Case Study" vs "Source Code") depending on the project title.
- **`ProjectDetail`**: A dedicated page for a single project. **Hooks used**: `useParams` from React Router. It reads the URL to figure out which project you clicked (e.g., "documind"), grabs that specific data, and renders a deep dive including embedded videos and the tech stack.

### Reusable UI Elements (Atoms)
- **`ImageCarousel`**: A complex UI component holding an array of images. Uses `framer-motion`'s `animate={{ x: ... }}` property running on an `Infinity` loop to create a seamless scrolling marquee illusion.
- **Micro-Components (`Button`, `Badge`, `Card`, `TiltCard`, `SectionHeading`)**: These are your "dumb" components. They don't handle complex logic. They accept `children` (the text inside them) and `className` props to maintain a consistent unified design system across your site.

---

## 4. Data Flow & Routing

### How does Routing Work?
You are using **React Router (`react-router-dom`)**. Inside `App.jsx`, the root path (`/`) mounts the `<HomePage />` component, which is just a stack of all your `<Section />` components (Hero, About, Projects).

When a user clicks "Watch Case Study" on the DocuMind project, they click a `<Link to="/project/documind" />`. React Router intercepts this, prevents the page from refreshing, and swaps out the `<HomePage />` for `<ProjectDetail />`. 
Because the Route is defined as `<Route path="/project/:id" element={<ProjectDetail />} />`, the variable `:id` becomes "documind". `ProjectDetail.jsx` uses the `useParams()` hook to grab `id`, allowing it to fetch exactly the right data to render.

### How does Data Flow through the App?
Your project utilizes a **Single Source of Truth** simulation. Instead of fetching from a live database, all text, links, and lists are maintained inside `src/data/portfolio.js` as an exportable Javascript object.

Components simply `import { portfolioData } from '../../data/portfolio'` and use standard JavaScript `.map()` functions to iterate over arrays and render data directly to the UI. The flow is strictly unidirectional (top-down), ensuring components always remain perfectly in sync with the data file. 

*You've architected a highly modular, professional React app that separates concerns between routing, styling, UI elements, and data perfectly. Great job!* 🚀
