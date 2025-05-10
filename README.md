
# DashStack - Financial Accounting Standards Dashboard

DashStack is an AI-powered dashboard designed to simplify financial accounting standards compliance for Islamic financial institutions. The platform provides instant answers to FAS compliance questions, analyzes transactions, and ensures compliance with AAOIFI FAS standards.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Development](#development)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **AI-Powered Analysis**: Get instant answers to FAS compliance questions with our advanced AI assistant trained on AAOIFI standards
- **Compliance Assurance**: Ensure financial transactions adhere to the latest AAOIFI FAS standards with real-time validation
- **Instant Documentation**: Access comprehensive documentation and examples for all FAS standards
- **Multi-language Support**: Toggle between English and Arabic interfaces
- **Dark/Light Mode**: Choose between light and dark themes
- **File Attachments**: Upload and analyze documents for compliance review
- **Responsive Design**: Fully responsive interface that works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Custom authentication system
- **Deployment**: Vercel

## 📁 Project Structure

```
dashstack/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication routes (login, signup, etc.)
│   ├── about/              # About page
│   ├── chat/               # Chat dashboard
│   ├── pricing/            # Pricing page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable components
│   ├── chat-messages.tsx   # Chat messages component
│   ├── file-attachments.tsx # File attachments component
│   ├── header.tsx          # Header component
│   ├── question-input.tsx  # Question input component
│   ├── sidebar.tsx         # Sidebar component
│   └── ui/                 # UI components
├── context/                # React Context providers
│   ├── chat-context.tsx    # Chat context
│   ├── language-context.tsx # Language context
│   ├── scenario-context.tsx # Scenario context
│   └── theme-context.tsx   # Theme context
├── public/                 # Static assets
├── styles/                 # Global styles
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🔄 Routes

| Route | Description | Authentication Required |
|-------|-------------|------------------------|
| `/` | Landing page | No |
| `/login` | Login page | No |
| `/signup` | Signup page | No |
| `/forgot-password` | Password recovery | No |
| `/about` | About page | No |
| `/pricing` | Pricing plans | No |
| `/chat` | Chat dashboard | Yes |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dashstack.git
   cd dashstack
