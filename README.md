# ⚡ Hogwarts Character Portal

A modern, responsive character gallery for the Wizarding World, built with **React**, **Vite**, and **Tailwind CSS**. Powered by the [HP-API](https://hp-api.onrender.com/).

---

## Features

- Browse characters by Hogwarts House (Gryffindor, Slytherin, Ravenclaw, Hufflepuff)
- Sort by name, status, student, or staff
- Paginated gallery (20 characters per page)
- Detailed character modal with wand info, patronus, ancestry, and birthdate
- Responsive design for mobile and desktop

---

## Prerequisites

Make sure you have the following installed before running the project:

- [Node.js](https://nodejs.org/) version 18 or higher
- npm (comes with Node.js)

To check if you already have them, run:

```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jimwell1o1/hogwartz-reactjs.git
cd hogwartz-reactjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Then open your browser and go to:

```
http://localhost:5173
```

---

## Project Structure

```
src/
├── App.jsx                      # Main app — state, sorting, pagination
├── index.css                    # Tailwind CSS + custom fonts and animations
├── constants/
│   └── houses.js                # House data, colors, emblems, API base URL
├── hooks/
│   └── useCharacters.js         # Custom hook for fetching characters from the API
└── components/
    ├── Header.jsx               # Page header with title and logo
    ├── HouseFilter.jsx          # House tab filter buttons
    ├── CharacterCard.jsx        # Individual character card
    ├── CharacterModal.jsx       # Detailed character popup modal
    ├── SortControls.jsx         # Sort dropdown and character count
    ├── Pagination.jsx           # Page navigation controls
    └── LoadingSpinner.jsx       # Loading state indicator
```

---

## Available Scripts

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start the local development server |
| `npm run build`   | Build the project for production   |
| `npm run preview` | Preview the production build       |

---

## Built With

- [React](https://react.dev/) — UI library
- [Vite](https://vitejs.dev/) — Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [HP-API](https://hp-api.onrender.com/) — Harry Potter character data

---

## Setting Up Tailwind CSS with Vite *(for reference)*

If you are starting from scratch, here is how Tailwind was configured in this project:

**1. Install Tailwind and the Vite plugin**

```bash
npm install -D tailwindcss @tailwindcss/vite
```

**2. Update `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

**3. Add Tailwind to `src/index.css`**

```css
@import "tailwindcss";
```

---

## Author

**Jimwell Rabino**