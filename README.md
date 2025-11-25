# sbd-nextjs-digital-shop

The **Digital Shop** is a marketplace interface built with Next.js for browsing, purchasing, and managing digital assets within the Second Brain ecosystem.

## Features

-   **Product Catalog**: Browse and search for digital assets.
-   **Shopping Cart**: Manage items and proceed to checkout.
-   **User Dashboard**: View purchased items and order history.
-   **Responsive Design**: Optimized for both desktop and mobile devices.
-   **Interactive Elements**: Smooth transitions and animations using Framer Motion.

## Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/)
-   **Language**: TypeScript
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Forms**: React Hook Form + Zod
-   **UI Components**: Radix UI, Lucide React
-   **Testing**: Jest, Playwright

## Prerequisites

-   Node.js 20+
-   pnpm (recommended) or npm/yarn

## Getting Started

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```

2.  **Set up environment variables**:
    Copy `.env.example` to `.env.local` and configure the necessary variables.
    ```bash
    cp .env.example .env.local
    ```

3.  **Run the development server**:
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

-   `pnpm dev`: Run the development server.
-   `pnpm build`: Build the application for production.
-   `pnpm start`: Start the production server.
-   `pnpm lint`: Run ESLint.
-   `pnpm test`: Run unit tests with Jest.
-   `pnpm test:e2e`: Run end-to-end tests with Playwright.
-   `pnpm storybook`: Start Storybook for component development.

## Project Structure

-   `app/`: Next.js App Router pages and layouts.
-   `components/`: Reusable UI components.
-   `lib/`: Utility functions and shared logic.
-   `store/`: Zustand state management stores.
-   `hooks/`: Custom React hooks.

## License

Private
