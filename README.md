# STI Frontend

**Frontend application for STI (Intelligent Tutoring System), an academic platform focused on intelligent tutoring, personalized learning, and educational management.**

STI Frontend is the client-side application of the Intelligent Tutoring System platform. It provides a complete role-based academic experience for administrators, professors, and students through a modular React architecture, protected navigation, dynamic dashboards, educational workflows, and integrated academic chatbot interaction.

## 📌 Description

This project is the frontend layer of the STI ecosystem.

It provides:

✔ Authentication system (Login/Register)

✔ Role-based dashboards

✔ Subject management interfaces

✔ Group management workflows

✔ Academic session management

✔ Educational resource visualization and downloads

✔ Personalized student onboarding

✔ Learning style testing

✔ AI chatbot interaction UI

✔ Protected route navigation

✔ Administrative analytics dashboards

The frontend communicates directly with the STI backend API built with NestJS.

---

## 🚀 Installation & Usage

### 1. Clone repository

```bash
git clone https://github.com/emanuelarevalomartinez/STI-My_Frontend.git
```

Enter project directory:

```bash
cd STI-My_Frontend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create environment variables

Generate a `.env` file from `.env.template`

```bash
cp .env.template .env
```

Configure:

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

Important:

This variable must point to the STI backend API.

If backend port changes, update this value.

---

### 4. Run development server

```bash
npm run dev
```

Application will be available at:

```bash
http://localhost:5173
```

---

### 5. Build production version

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## ✨ Main Features

* JWT Authentication System

* User registration workflows

* Role-based protected routes

* Administrator dashboard

* Professor dashboard

* Student dashboard

* Subject enrollment system

* Group management UI

* Session management UI

* Educational resource management

* File uploads integration

* Learning style onboarding system

* Learning analytics charts

* Integrated academic chatbot modal

* Search and filtering system

* Notification system

* Reusable component architecture

* Responsive design

---

## 🧩 Project Structure

```bash
STI-My_Frontend/
├── public/
│   ├── gifts/
│   ├── icons/
│   ├── images/
│   ├── sounds/
│   └── svgs/
│
├── src/
│   ├── api/
│   │   ├── axiosConfig.ts
│   │   └── index.ts
│   │
│   ├── app/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── home/
│   │   ├── professor/
│   │   └── student/
│   │
│   ├── common/
│   │   ├── accordion/
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── carousels/
│   │   ├── charts/
│   │   ├── dashboards/
│   │   ├── errors/
│   │   ├── inputs/
│   │   ├── loadings/
│   │   ├── menus/
│   │   ├── messages/
│   │   ├── modals/
│   │   ├── notifications/
│   │   ├── paginations/
│   │   ├── progressbars/
│   │   ├── questions/
│   │   ├── radios/
│   │   ├── searchs/
│   │   ├── selects/
│   │   └── tables/
│   │
│   ├── routes/
│   ├── shared/
│   ├── store/
│   ├── main.tsx
│   └── index.ts
│
├── package.json
└── vite.config.ts
```

---

## 🛣 Routing Architecture

The system uses protected route architecture by role.

| Route | Description |
|---|---|
| `/` | Home page |
| `/auth/login` | Login page |
| `/auth/register` | Register page |
| `/admin/*` | Administrator routes |
| `/professor/*` | Professor routes |
| `/student/*` | Student routes |

Protected route layers:

* Global authentication guard

* Admin route guard

* Professor route guard

* Student route guard

---

## 👨‍💻 Role-Based Interface

### Administrator

Capabilities:

* User activation

* Subject management

* User analytics

---

### Professor

Capabilities:

* Group creation

* Session management

* Resource uploads

* Academic content organization

---

### Student

Capabilities:

* Subject enrollment

* Learning style test

* Resource downloads

* AI chatbot interaction

* Personalized learning path

---

## 🧠 State Management

Redux Toolkit is used for:

* Authentication state

* User session persistence

* Chat state

* Modal states

* UI state synchronization

Store structure:

```bash
src/store/
├── browser/
├── slices/
└── store.ts
```

---

## 🌐 API Communication

Axios centralized configuration:

```bash
src/api/axiosConfig.ts
```

Responsibilities:

* Base API configuration

* JWT token injection

* Authorization headers

* Response interceptors

* Unauthorized session handling

---

## 🎨 Reusable UI Components

Shared reusable components:

* Buttons

* Tables

* Inputs

* Modals

* Notifications

* Charts

* Cards

* Carousels

* Search components

* Progress bars

* Accordions

* Loaders

This architecture reduces duplication and improves maintainability.

---

## 📊 Charts & Analytics

Built with:

* Recharts

Used for:

* Student learning style analytics

* Administrative statistics

* Academic data visualization

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Redux Toolkit | Global state |
| React Redux | State connection |
| React Router | Routing |
| Axios | HTTP client |
| TailwindCSS | Styling |
| Recharts | Analytics charts |
| React Icons | UI icons |
| Vitest | Testing |

---

## 🔗 Backend Dependency

This frontend requires STI Backend running.

Default backend URL:

```env
VITE_BACKEND_URL=http://localhost:3000/api
```

Make sure backend is running before using the frontend.

---

## 📚 Development Notes

Recommended startup order:

1. Start Docker services (Backend repository)

2. Start Backend API

3. Start Frontend App

This ensures database and API availability.

---

## 📝 License

UNLICENSED

---

## 🔗 Repository

Frontend Repository:

[GitHub - STI Frontend](https://github.com/emanuelarevalomartinez/STI-My_Frontend)

Backend Repository:

[GitHub - STI Backend](https://github.com/emanuelarevalomartinez/STI-My_Backend)

---

## 📌 Original Reference

Original repositories:

Frontend Repository:

[GitHub - STI Frontend Original](https://github.com/isaias-dev-7/STI-Project-Frontend)

Backend Repository:

[GitHub - STI Backend Original](https://github.com/isaias-dev-7/STI-Project-Backend)





