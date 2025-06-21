# Flipto Admin Dashboard

This is a comprehensive, feature-rich admin dashboard for a gambling/gaming website, built from the ground up with a modern tech stack. It provides administrators with the tools they need to monitor site activity, manage users, and track financial performance.

## Key Features

-   **Comprehensive Analytics Overview**: At-a-glance metrics for total revenue, users, games, and transactions with trend indicators.
-   **Dynamic Revenue Chart**: Visualize revenue trends over time.
-   **User Betting History**: A detailed, paginated table of all user bets with advanced filtering by username, date, game type, provider, and outcome.
-   **User Withdraw History**: A detailed, paginated table for tracking and managing user withdrawal requests, with filters for username, date, status, and payment method.
-   **Collapsible Sidebar**: A responsive and collapsible navigation sidebar for a clean and efficient user experience.
-   **Dark & Light Theme**: A modern, visually appealing dark theme that can be toggled.
-   **Responsive Design**: The layout is fully responsive and adapts to various screen sizes, from mobile to desktop.
-   **Lazy Loading**: Pages are lazy-loaded to improve initial application performance.

## Technology Stack

-   **Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Charting**: [Recharts](https://recharts.org/)
-   **Icons**: [Lucide React](https://lucide.dev/guide/react)
-   **Mock Data**: [@faker-js/faker](https://fakerjs.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd flipto-admin-dashboard
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Project Structure

The project follows a standard Vite + React project structure, with a few key directories:

```
flipto-admin-dashboard/
├── public/
└── src/
    ├── components/
    │   ├── dashboard/  # Dashboard-specific components
    │   ├── layout/     # Layout components (Sidebar, Header)
    │   └── ui/         # General-purpose UI components
    ├── data/
    │   └── mockData.ts # Mock data generation
    ├── lib/
    │   └── utils.ts    # Utility functions
    ├── pages/          # All application pages/routes
    ├── store/
    │   └── index.ts    # Zustand global state management
    └── types/
        └── index.ts    # TypeScript type definitions
``` 