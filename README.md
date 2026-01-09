# Generator-Hash 🔐

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/pinia-%23ffd859.svg?style=for-the-badge&logo=pinia&logoColor=black)

A modern, secure, and beautiful password hash generator built with **Vue 3** and **TypeScript**.
This application allows users to generate secure BCrypt hashes from passwords, manage them locally, and export them to PDF.

[**🚀 Live Demo**](https://userlg.github.io/Generator-Hash/)

## ✨ Features

- **🛡️ Secure Hashing**: Uses `bcrypt-ts` to generate secure password hashes.
- **🎨 Premium UI**: A modern, responsive interface built with Tailwind CSS, featuring a glassmorphism dark mode.
- **💾 Local Persistence**: Your data is saved locally in your browser using Pinia Persisted State.
- **📄 PDF Export**: Export your list of generated hashes to a PDF report with a single click.
- **📋 One-Click Copy**: Easily copy hashes to your clipboard.
- **📱 Responsive Design**: Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [Vue Test Utils](https://test-utils.vuejs.org/)
- **Utilities**: `pdf-lib` (PDF generation), `downloadjs`, `vue-clipboard3`

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- `yarn` (recommended) or `npm`

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/userlg/Generator-Hash.git
   cd Generator-Hash
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build & Test

### Production Build

To create a production-ready build:

```bash
yarn build
```

The output will be in the `dist` directory.

### Running Tests

Run the unit test suite with Vitest:

```bash
yarn test
```

Check code coverage:

```bash
yarn coverage
```

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, global css)
├── components/      # Vue Components
│   ├── layout/      # Header, Footer
│   ├── ui/          # Base components (Button, Input, Modal)
│   └── ...          # Feature components
├── composables/     # Shared logic (usePDFGenerator)
├── interfaces/      # IDL / TypeScript interfaces
├── security/        # Hashing logic
├── stores/          # Pinia stores
├── App.vue          # Root component
└── main.ts          # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Created by [Userlg](https://github.com/userlg)
