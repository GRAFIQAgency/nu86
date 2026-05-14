# Nubi Asian Bistro 🍜

A stunning, futuristic web application for a next-generation Asian dining experience. Built with React, Vite, Tailwind CSS, and Motion, this project features a bilingual interface (English and Czech) and integrations for delivery services.

## ✨ Features

- **Futuristic & Bold UI**: A highly stylized, cyberpunk-inspired visual design tailored for a "hyper-fusion gastronomy" vibe.
- **Bilingual Support**: Instant switching between English (EN) and Czech (CS) via a built-in custom translation system.
- **Fluid Animations**: Smooth page transitions, scroll-driven visual effects, and hover interactions powered by `motion/react`.
- **Responsive Layout**: Designed mobile-first, ensuring a pixel-perfect experience across all devices.
- **Delivery Integration**: Integrated POS delivery widget (iKelp) directly into the app for online orders.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Motion (`motion/react`)
- **Icons**: Lucide React
- **Language**: TypeScript

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/nubi-asian-bistro.git
cd nubi-asian-bistro
```

### 2. Install dependencies

Ensure you have Node.js installed, then run:

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 4. Build for production

To create a production-ready build:

```bash
npm run build
```

The generated static files will be placed in the `dist` directory.

## 🌍 Automating Deployment to GitHub Pages

This project is now configured to automatically deploy to GitHub Pages using GitHub Actions! You don't need a `gh-pages` branch anymore.

1. Go to your GitHub repository on the web.
2. Go to **Settings** > **Pages** (on the left sidebar).
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
4. Push your code to GitHub. The GitHub Actions workflow (in `.github/workflows/deploy.yml`) will automatically build and publish your website.
5. In `vite.config.ts`, make sure `base: './'` is set (already done!) so that assets load properly.

## 📝 License

This project is created for demonstration purposes. Feel free to use it as inspiration!
