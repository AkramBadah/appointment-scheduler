# 🗓️ Appointment Scheduler

A modern, modular appointment scheduling interface built with **React**, **TypeScript**, **Redux Toolkit**, **Tailwind CSS**, and powered by **mock APIs via JSON Server**. Designed to demonstrate front-end architecture modernization using micro frontend principles and a strong separation of concerns between UI, state, and data.

---

## ✨ Project Goals

This app is a simplified example of a real-world appointment scheduling system, showcasing:

- ✅ Migration to **React** using component-based architecture
- ✅ Use of **Redux Toolkit** with `createAsyncThunk` for async API flows
- ✅ Styling via **Tailwind CSS** and configured using **@tailwindcss/vite**
- ✅ Integration with **JSON Server** to simulate backend behavior
- ✅ Clean, extensible type-safe code with **TypeScript**
- ✅ Structure that supports scaling toward **Micro Frontends (MFE)**

---

## 📸 Features

- View a list of mock appointments
- Add new appointments with form validation
- Delete existing appointments
- Basic loading and error handling flows
- Mock persistence using JSON Server (fake REST API)

---

## 🛠️ Stack

| Technology        | Purpose                               |
|-------------------|----------------------------------------|
| React + Vite      | UI + fast development tooling          |
| TypeScript        | Type safety and better dev experience  |
| Redux Toolkit     | State management + async thunk APIs    |
| Tailwind CSS      | Utility-first styling                  |
| JSON Server       | Simulated RESTful backend              |

---

## 📦 Project Structure

```bash
src/
├── components/
│   └── Scheduler/                         # Main appointment scheduler component
│       └── AppointmentCreation/index.tsx  # Create Appointment Form
│       └── Appoitment/index.tsx           # Appoitment displaying component
│       └── index.ts                       # Exports all Scheduler components
├── pages/
│   └── Scheduler/index.tsx  # Main page for displaying Appointments components
├── store/
│   └── appointmentSlice     # Redux for managing appoitments
│       └── thunks/index.ts  # Apis calls (createAsyncThunk)
│       └── index.ts         # Redux slice for appoitments
│   └── index.ts             # Exporting store and its opperators
├── App.tsx                  # App shell
├── main.tsx                 # Entry point
└── index.css                # Tailwind styles
```

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/appointment-scheduler.git
cd appointment-scheduler
```

### 2. Install dependencies

```bash
npm install
```
### 3. Run the backend server

```bash
npm run dev
```

### 4. Run the frontend server in a different terminal tab

```bash
npm run api
```

## 🧪 Testing

### 1. Run tests

```bash
npm test
```
This will run all the tests in your project using Vitest.


### 2. Run tests with coverage

To run tests and generate a code coverage report:

```bash
npm run test:coverage
```

### 3. Writing Tests

You can write tests for your React components using React Testing Library along with Vitest. Example tests can be found in the __tests__ folder (or wherever your test files are located).
