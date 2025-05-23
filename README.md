# 🎉 Next.js Admin Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped designed with **admin/client role-based access**, using **Tailwind CSS**, **shadcn/ui**, and **middleware-based auth routing**.

---

## 🚀 Getting Started

Install package

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit http://localhost:3000 to see the result.

## Login Instructions

# This project supports two types of users: Admin and Client.

Login works by checking hardcoded credentials and setting authentication cookies (isLoggedIn and role).

✅ Admin Account
Email: admin@gmail.com
Password: Kasradash@2025

👉 Redirects to: /dashboard (Admin Panel)

👤 Client Account
Email: client@gmail.com
Password: Kasradash@2025

👉 Redirects to: / (Client Homepage)
