# PeakPuzzler Quiz Game

A modern, interactive "Who Wants to Be a Millionaire" style quiz game built with Next.js, React, and TypeScript.

## 📋 Features

- **Random or Specific Quiz Selection**: Choose to play a random quiz or select a specific one from the list.
- **15 Progressive Questions**: Answer 15 increasingly difficult questions to win and climb to the top of the ladder.
- **Lifelines**: Use 50:50, Hint, and Question Change lifelines to help with difficult questions.
- **Double Points**: Earn double points by answering questions quickly.
- **Leaderboard**: Compete with others and see your ranking on the global leaderboard.
- **Admin Dashboard**: Create, manage, and delete quiz games (admin authentication required).
- **Mobile Responsive**: Fully responsive design that works on all devices.
- **Dark/Light Theme**: Switch between dark and light mode according to your preference.
- **Internationalization**: Multi-language support with next-intl.

## 🚀 Tech Stack

- **Framework**: [Next.js 15.3.2](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Components**: Custom components with [Shadcn UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS 3.4.17](https://tailwindcss.com/)
- **State Management**: [React Query 5.76.1](https://tanstack.com/query/latest) for server state, React context for
  local state
- **Internationalization**: [next-intl 4.1.0](https://next-intl-docs.vercel.app/)
- **Icons**: [Lucide React 0.511.0](https://lucide.dev/)
- **HTTP Client**: [Axios 1.9.0](https://axios-http.com/)
- **React**: [React 19.1.0](https://react.dev/)
- **Database**: PostgreSQL
- **Authentication**: Custom implementation for Admin
- **Deployment**: [Vercel](https://vercel.com/) with [Speed Insights](https://vercel.com/docs/speed-insights)
- **Testing**: [Jest 29.7.0](https://jestjs.io/)
  and [React Testing Library 16.3.0](https://testing-library.com/docs/react-testing-library/intro/)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.17.0 or higher)
- [npm](https://www.npmjs.com/) (v9.6.0 or higher) or [yarn](https://yarnpkg.com/) (v1.22.0 or higher)
  or [pnpm](https://pnpm.io/) (v8.0.0 or higher)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GeneralDido/peak-puzzler-quiz-frontend.git
   cd peak-puzzler-quiz-game
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Setup the backend server, see [this repository](https://github.com/GeneralDido/peak-puzzler-quiz-backend).

4. Create a `.env.local` file in the root directory with the following variables:
   ```env
   ADMIN_USER=demo
   ADMIN_PASS=secret
   ADMIN_API_KEY=SomeKey
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
peak-puzzler-quiz-game/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin pages (dashboard, game management)
│   ├── api/                # API routes
│   ├── how-to-play/        # How to play instructions page
│   ├── leaderboard/        # Leaderboard page
│   ├── play/               # Game play pages
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── admin/              # Admin-specific components
│   │   ├── GameGenerator.tsx
│   │   └── GamesList.tsx
│   ├── navigation/         # Navigation components
│   │   ├── AppHeader.tsx
│   │   ├── DesktopNavigation.tsx
│   │   └── MobileNavigation.tsx
│   ├── play/               # Game play components
│   │   ├── GameHeader.tsx
│   │   └── PrizeLadder.tsx
│   ├── question/           # Question-related components
│   │   ├── AnswerOptions.tsx
│   │   ├── HintDisplay.tsx
│   │   ├── LifelinesPanel.tsx
│   │   └── QuestionHeader.tsx
│   ├── ui/                 # UI components (buttons, cards, etc.)
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── LoadingState.tsx
│   │   └── ...
│   ├── GameSelector.tsx    # Game selection component
│   ├── HeroSection.tsx     # Home page hero section
│   ├── LeaderboardTable.tsx
│   ├── QuestionCard.tsx
│   ├── QuestionCardSkeleton.tsx
│   ├── ScoreForm.tsx
│   ├── ThemeToggle.tsx
│   └── ...                 # Other components
├── context/                # React context providers
│   └── QuestionContext.tsx
├── hooks/                  # Custom React hooks
│   ├── useGame.ts
│   ├── useGameLogic.ts
│   ├── useGameState.ts
│   ├── useGamesList.ts
│   ├── useSessionState.ts
│   └── ...
├── lib/                    # Utility functions and libraries
├── messages/               # Internationalization messages
├── public/                 # Static assets
├── styles/                 # Global CSS and theme files
│   ├── globals.css         # Global styles and theme variables
│   └── theme.css           # Theme-specific styles
├── utils/                  # Helper functions
│   ├── api.ts              # API utility functions
│   ├── apiTypes.ts         # API type definitions
│   ├── format.ts           # Formatting utility functions
│   └── game.ts             # Game-specific utility functions
├── .env.local              # Environment variables (create this)
├── .gitignore              # Git ignore file
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎮 How to Play

1. **Start a Game**: Choose to play a random quiz or select a specific one from the list on the home page.

2. **Answer Questions**: Read each question carefully and select one of the four possible answers.

3. **Use Lifelines**: If you're stuck, use one of the three lifelines to help:
    - **50:50**: Eliminates two incorrect answers
    - **Hint**: Provides a clue about the correct answer
    - **Change**: Replaces the current question with another one

4. **Win**: As you answer questions correctly, you'll progress up the money ladder.

5. **Submit Your Score**: If you earn enough points, you can submit your name to the leaderboard.

## 👨‍💻 API Routes

### Game API

- `GET /api/games` - Get list of all games
- `GET /api/games/random` - Get a random game
- `GET /api/games/:id` - Get a specific game by ID
- `POST /api/games` - Create a new game (admin only)
- `DELETE /api/games/:id` - Delete a game (admin only)
- `PUT /api/games/:id` - Update a game (admin only)

### Leaderboard API

- `GET /api/leaderboard` - Get top scores from the leaderboard
- `POST /api/leaderboard` - Submit a new score to the leaderboard

### Admin API

- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Check admin authentication status
- `POST /api/admin/generate` - Generate a new game (admin only)
- `PUT /api/admin/update` - Update a game (admin only)

## 🧩 Custom Hooks

- `useGame(id?)`: Fetch a game by ID or a random game if no ID is provided
- `useGamesList()`: Fetch the list of available games
- `useGameLogic()`: Handle the game logic (questions, answers, lifelines, etc.)
- `useGameState()`: Manage game state with session persistence
- `useSessionState()`: Generic hook for session storage state management
- `useLeaderboard()`: Fetch the leaderboard scores
- `useAdminGenerate()`: Generate a new game (admin only)
- `useAdminDeleteGame()`: Delete a game (admin only)

## 🧪 Testing

This project uses Jest and React Testing Library for testing. Run the tests with:

```bash
npm test
# or
yarn test
# or
pnpm test
```

The test files are located next to the components they test with a `.test.tsx` extension.

## 🏗️ Component Architecture

The project follows a modular component architecture:

- **Page Components**: Located in the `app/` directory, handle routing and high-level state
- **Feature Components**: Organized by feature domain (admin, navigation, play, question)
- **UI Components**: Reusable, generic components (buttons, modals, loading states)
- **Shared Components**: Components used across multiple features

### Component Organization Principles

- **Single Responsibility**: Each component has a clear, focused purpose
- **Reusability**: UI components are generic and reusable across features
- **Separation of Concerns**: Business logic is separated from presentation logic
- **Type Safety**: All components are fully typed with TypeScript
