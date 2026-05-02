# Digital Atelier 🎨

Digital Atelier is a premium, full-stack studio management and site builder platform designed for creative entrepreneurs.

---

### 🎨 Design & UI
👉 **[View Figma Design](https://www.figma.com/design/e0zBFnsULG6m5HwLZFBVGC/Untitled?node-id=0-1&p=f&t=URcXkz8c8YBFBmLY-0)**

---

## 🚀 Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)

## ✨ Key Features
- **Project Dashboard**: Real-time analytics and project tracking.
- **Site Builder**: Interactive drag-and-drop editor for creating web pages.
- **Asset Library**: Centralized management for images and media.
- **Product Store**: Integrated e-commerce management.
- **Presentation Mode**: Auto-registration for seamless demo sessions.

## 🛠️ Getting Started

---

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [User Flows](#user-flows)
- [UI Screens](#ui-screens)
- [Design System](#design-system)
- [Folder Structure](#folder-structure)
- [MVP Scope](#mvp-scope)
- [Phase 2 Roadmap](#phase-2-roadmap)
- [Business Model](#business-model)
- [KPIs](#kpis)
- [Risks](#risks)
- [Project Deliverables](#project-deliverables)

---

## Overview

Digital Atelier solves a real-world gap — thousands of shop owners have great products but zero online presence. Hiring a developer is expensive, learning to code takes months, and existing platforms are either too complex or too limiting.

Digital Atelier gives shop owners a simple, guided flow to build and publish a professional website in minutes — no technical knowledge needed.

---

## Problem Statement

> **"Why can't shop owners create websites without coding knowledge?"**

**Shop Owners:**
- Cannot afford to hire developers for a basic storefront
- Existing builders (WordPress, Wix) are confusing for non-technical users
- No platform is tailored specifically for small physical shop owners

**Customers:**
- Cannot discover local shops online
- Miss out on products from nearby boutiques and stores that have no digital presence

---

## Key Features

### 🏪 No-Code Website Builder
- Step-by-step guided setup — shop name, logo, theme, products
- Zero coding knowledge required
- Live preview before publishing

### 🎨 Custom Branding
- Upload logo and banner
- Choose brand colors and typography
- Add tagline, description, and social links

### 🛍️ Product Management
- Add products with images, prices, and descriptions
- Organize into categories
- Mark items as available or out of stock

### 🌐 One-Click Publishing
- Go live instantly with a shareable storefront link
- Auto-generated mobile-responsive pages

### 📬 Customer Inquiry System
- Built-in contact form on every storefront
- Customers can directly message the shop owner

### 🔐 Authentication & Dashboard
- Secure sign up / login for shop owners
- Dashboard to manage shop, products, and settings

### 🔍 SEO-Ready Pages
- Proper meta titles and descriptions on every storefront
- Search engine friendly URLs

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Tailwind CSS |
| Routing | React Router |
| State Management | React Context API |
| Backend | Node.js + Express |
| Database | MongoDB |
| Authentication | JWT (JSON Web Tokens) |
| Image Storage | Cloudinary / AWS S3 |
| Design | Figma |
| Version Control | Git + GitHub |

---

## System Architecture

```
┌─────────────────────────────────────────────┐
│                  Frontend                   │
│          React.js + Tailwind CSS            │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│              Backend API                    │
│           Node.js / Express                 │
└──────┬───────────────────────┬──────────────┘
       │                       │
┌──────▼──────┐       ┌────────▼────────┐
│   MongoDB   │       │ Cloud Storage   │
│  (main DB)  │       │ Cloudinary/S3   │
└─────────────┘       └─────────────────┘
```

---

## User Flows

### 🏪 Shop Owner Flow
1. Signs up on Digital Atelier
2. Fills in shop details — name, logo, tagline, category
3. Selects a website theme / template
4. Adds products with images and prices
5. Previews the storefront live
6. Publishes with one click — gets a shareable link

### 🛒 Customer Flow
1. Receives or finds the shop's Digital Atelier link
2. Browses the storefront — products, categories, details
3. Sends an inquiry via the built-in contact form
4. Gets a response directly from the shop owner

---

## UI Screens

| # | Screen | Description |
|---|--------|-------------|
| 1 | Landing / Home | Hero section, how it works, testimonials, CTA |
| 2 | Sign Up | Shop owner account creation |
| 3 | Login | Email/password authentication |
| 4 | Onboarding Step 1 | Shop name, category, tagline |
| 5 | Onboarding Step 2 | Logo upload, brand colors, description |
| 6 | Template Selection | Choose from pre-designed storefront themes |
| 7 | Product Add | Upload image, name, price, description |
| 8 | Product Listing (Owner) | Manage all products from dashboard |
| 9 | Live Preview | See the storefront before publishing |
| 10 | Dashboard | Overview of shop stats, products, settings |
| 11 | Published Storefront | Public-facing shop page for customers |
| 12 | Product Detail (Customer) | Full product view with inquiry option |
| 13 | Contact / Inquiry Form | Customer reaching out to the shop |
| 14 | Settings | Edit shop details, theme, and account info |
| 15 | 404 / Error Page | Friendly error state |

---

## Design System

| Token | Value |
|-------|-------|
| Primary color | Deep charcoal — `#1A1A2E` |
| Accent color | Gold — `#C9A84C` |
| Background | Soft white — `#F9F9F7` |
| Card radius | 12px |
| Font | Plus Jakarta Sans / DM Sans |
| Heading weight | 600–700 |
| Body weight | 400 |

**Design philosophy:** Elegant, minimal, and confident. Digital Atelier should feel like a luxury digital studio — premium but approachable. Clean white space, warm gold accents, and refined typography make every shop look professional.

---

## Folder Structure

```
digitalAtelier/
│
├── frontend/                   # 🖥️ React + Tailwind CSS app
│   ├── public/                 # Static files (favicon, index.html)
│   ├── src/
│   │   ├── assets/             # Images, fonts, videos
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page-level components (Home, About, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # React Context / global state
│   │   ├── services/           # API call functions
│   │   └── utils/              # Helper functions
│   ├── tailwind.config.js      # Tailwind configuration
│   └── package.json
│
├── backend/                    # ⚙️ Server, APIs & database
│   ├── routes/                 # API route definitions
│   ├── controllers/            # Business logic handlers
│   ├── models/                 # Database schemas
│   ├── middleware/              # Auth & error handling
│   ├── config/                 # DB & environment setup
│   └── utils/                  # Helper functions
│
├── .gitignore
├── README.md
└── LICENSE
```

---

## MVP Scope

**Phase 1 — Must have:**
- Shop owner sign up and login
- Onboarding flow (shop details + branding)
- Template selection
- Product add / edit / delete
- Live preview and one-click publish
- Public storefront page
- Customer inquiry/contact form

**Phase 1 — Out of scope:**
- Payment gateway / e-commerce checkout
- Advanced analytics
- Multi-language support
- Mobile app

---

## Phase 2 Roadmap

- Online payment integration (Razorpay / Stripe)
- Custom domain support for storefronts
- Analytics dashboard (views, inquiries, traffic)
- Mobile app for shop owners (React Native)
- AI-powered product description generator
- Multi-language storefront support

---

## Business Model

| Revenue Stream | Description |
|---------------|-------------|
| Freemium Plan | Free tier with limited products and default theme |
| Pro Subscription | Unlimited products, custom domain, premium themes |
| Transaction Fee | Small percentage on orders (Phase 2) |
| White Label | Custom-branded builder for agencies and enterprises |

---

## KPIs

- Number of storefronts published — target: grow month-on-month
- Time to publish first storefront — target: under 10 minutes
- Shop owner retention rate — target: maintain above 70%
- Customer inquiry conversion rate — target: increase over time
- Platform uptime — target: maintain above 99.5%

---

## Risks

| Risk | Mitigation |
|------|-----------| 
| Low adoption from non-tech users | Simple onboarding flow with guided steps and tooltips |
| Competition from Wix / Shopify | Hyper-focus on shop owners — simpler, faster, cheaper |
| Image storage costs | Optimize with compression + tiered storage plans |
| Data security for shop owners | JWT auth + encrypted storage + regular audits |

---

## Project Deliverables

- Product Requirements Document (PRD)
- Figma UI Design (15 screens)
- System architecture diagram
- Folder structure & tech stack documentation
- Working demo (Phase 1)

---

## 👤 Author

**Het** — [@Het510](https://github.com/Het510)

---

*Digital Atelier — Every shop owner deserves a beautiful website.*
