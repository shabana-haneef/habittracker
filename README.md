# 🏆 Habit Tracker

A gamified habit tracker built with **React**, **Vite**, and **Tailwind CSS**. It helps you build and maintain habits by tracking completion, streaks, and progress — complete with a character progression system and analytics.

---

## 🚀 Features

- Create, edit, and complete habits
- Track streaks and habit history
- Gamified **Character System** that progresses with your habits
- Visual analytics and charts (built with `recharts`)
- Data persistence using `localStorage` via `hooks/useLocalStorage.js`
- Responsive UI with Tailwind CSS and subtle animations via `framer-motion`

---

## Contents

1. [Getting Started](#-getting-started)
2. [Available Scripts](#-available-scripts)
3. [Project Structure](#-project-structure)
4. [Development Notes](#-development-notes)
5. [Contributing](#-contributing)
6. [Roadmap & Known Issues](#-roadmap--known-issues)
7. [License](#-license)

---

## 📦 Getting Started

Prerequisites:

- Node.js (LTS recommended)
- npm or yarn

Install dependencies:

```bash
npm install
# or
# yarn
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:5173 to view the app.

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

---

## ⚙️ Available Scripts

- `dev` - Run Vite dev server
- `build` - Create a production build
- `preview` - Preview the production build locally
- `lint` - Run ESLint across the project

---

## 📁 Project Structure

A quick overview of the key files and folders:

- `index.html` — App entry HTML
- `src/main.jsx` — App entry point
- `src/App.jsx` — Root app component
- `src/index.css` — Tailwind + base styles
- `src/components/` — React components
  - `Analytics.jsx` — Charts & analytics views
  - `Character.jsx` & `CharacterSystem.jsx` — Gamification logic and UI
  - `HabitList.jsx` — Add/edit/complete habits
  - `Journey.jsx` — Progress/journey view
  - `Settings.jsx` — App settings
- `src/hooks/useLocalStorage.js` — Custom hook for persistent state
- `src/utils/dateUtils.js` — Date helpers & calculations
- `src/assets/` — Static assets and character images

---

## 🔧 Development Notes

- Data is stored in `localStorage` using `useLocalStorage`. To switch persistence strategies, replace the hook implementation.
- Analytics charts are implemented with `recharts` and read from the stored habits data.
- Tailwind configuration is in `tailwind.config.js` — modify it to change themes or extend utilities.
- For animations and transitions, the project uses `framer-motion`.

Tips:

- To add a new feature, create or update a component in `src/components/`, add styles in Tailwind as utilities or classes, and add tests if applicable.
- Keep logic that manipulates dates centralized in `src/utils/dateUtils.js` to avoid inconsistencies.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss major changes before submitting a PR.

Guidelines:

- Fork the repo and create a feature branch
- Keep commits focused and descriptive
- Run `npm run lint` and ensure code follows project style

---

## 🛣️ Roadmap & Known Issues

Planned improvements:

- Add import/export of habit data (JSON)
- Cross-device sync via optional backend or third-party sync
- Add unit and integration tests
- Accessibility improvements

If you notice a bug or have a suggestion, please open an issue.

---

## 📜 License

There is currently no license file in this repository. If you want to add one, consider using the [MIT License](https://choosealicense.com/licenses/mit/).

---

## ✉️ Contact

If you have questions, open an issue or submit a pull request. Thanks for checking out this project — happy habit building! 🎯
