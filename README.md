# iJamaat by Fakhri - Comprehensive Community Management System

A fully functional, highly detailed frontend application for the **iJamaat Community Management System**. This application is built to replicate the complete iJamaat dashboard and all its interconnected modules. It operates entirely on the client-side using a sophisticated mock data architecture, making it lightweight and incredibly fast while maintaining the complex UI/UX of a full-scale ERP system.

---

## 🚀 Tech Stack

- **Frontend Framework**: React (v19)
- **Build Tool**: Vite (Lightning-fast HMR and optimized builds)
- **Styling**: Tailwind CSS v4 (Utility-first CSS for custom, responsive styling)
- **Routing**: React Router DOM v7
- **Data Visualization**: Recharts (Responsive area and pie charts)
- **Iconography**: Lucide React (Modern, clean SVG icons)

---

## 🏗️ Technical Architecture & Data Layer

### The "Backend-less" Design
This application runs **without a backend API or database connection**. Instead, it uses a centralized React Context API (`DataContext`) to manage global state. 

- **Mock Database**: The application consumes over 15 distinct JSON files located in `src/data/` (e.g., `members.json`, `sabil.json`, `thali.json`, `collections.json`, `hallBookings.json`).
- **Simulated CRUD Operations**: The `DataContext` provides functions (like `addCollection`, `addMember`, `addBooking`) that update the local state instantly.
- **Auto-population & Cross-referencing**: The context handles complex lookups. For example, when you type an `ITS ID` into a form, it queries the loaded `members` data and auto-populates the person's name and details.

*(Note: Because this relies on React local state, any new data entered during a session will reset upon a hard page refresh.)*

---

## 🌟 Comprehensive Module Breakdown

The application successfully replicates the vast feature set of the original ERP, organized into the following modules:

### 1. Dashboard
- **Live Statistics**: Top-level summary cards (Sabil counts, FMB active users, Total members).
- **Data Visualization**: Recharts implementations showing monthly collection trends and module-wise distributions.
- **Quick Actions**: Rapid profile searching via ITS/Sabil ID.

### 2. Maliyah (Accounts & Finance)
- **Daily Collection**: Form to log daily receipts; auto-populates member info via ITS/Sabil No.
- **Individual Ledger**: Detailed financial history for a specific member/sabil.
- **Collection Report**: Advanced filtering of all collections over specific date ranges and payment modes.
- **Due List / HOF List**: Reports for outstanding balances and Head of Family summaries.
- **Voucher Entry / Day Book**: Expense tracking and daily financial summaries.
- **Sabil Entry / Report**: Management of recurring subscription (Sabil) profiles.

### 3. FMB / Niyaz (Food Management)
- **Thali Master**: Registration and search interface for daily meal (Thali) subscribers.
- **Thali Report**: Status and location-based filtering of active/stopped thalis.
- **Menu Manage / Report**: Daily menu creation with cost and rating tracking.

### 4. Hall Booking
- **Registration Form**: Complex form with venue selection, slot timing, and add-on services (catering, decoration).
- **Calendar Visualizer**: A visual grid showing daily bookings and their statuses (Pending/Confirmed).
- **Booking Report**: Filterable list of all venue reservations.

### 5. Dakheliyah (Messaging)
- **Send Message**: Simulated interface to send SMS or WhatsApp broadcasts to filtered groups (e.g., specific Mohallas or Committee Members).
- **Message Report**: History of all sent communications and delivery statuses.

### 6. Mawareed (HR / Member Directory)
- **Add Member**: Comprehensive multi-step form capturing personal, contact, and demographic data.
- **Member List**: The core directory utilizing the robust `DataTable` component.

### 7. Deeniyah & Talimiyah (Religious & Education)
- **Amal Report**: Tracking participation in religious activities.
- **Wafat Update**: Registration of deceased members.
- **Sabaq Attendance**: Educational attendance tracking with calculated percentages.

### 8. Marafiq (Upliftment / Muwasaat)
- **Muwasaat Entry & Report**: Financial aid and upliftment tracking, capturing cheque details and approval statuses.

### 9. Other Specialized Modules
- **Iqtesadiyah**: Qardan Hasana (interest-free loans) management and balance tracking.
- **Sehat**: Doctors Directory for the community.
- **Kharejiyah**: External affairs and demographic reports.
- **Qaza**: Legal and community dispute reports.
- **App**: Mobile app installation summaries and RSVP event tracking.

---

## 📦 Advanced Reusable UI Components

To maintain consistency and reduce code duplication, several powerful UI components were engineered:

- **`DataTable`**: A highly robust table component supporting:
  - Multi-column sorting
  - Global row-level searching
  - Column-specific checkbox filtering (e.g., filtering a 'Status' column by 'Active' or 'Pending')
  - Column visibility toggling
  - 1-click Excel (CSV) exporting
- **`FilterPanel`**: A dynamic, collapsible form engine used to generate report filters (date ranges, dropdowns, inputs) seamlessly across all report pages.
- **`Sidebar`**: A fully nested, collapsible navigation menu featuring instant client-side search to find nested modules quickly.

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   git clone https://github.com/mauryatechnology/ijamat.git
   cd ijamat
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Usage

1. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).
2. Log in using the following test credentials:
   - **User ID:** `admin`
   - **Password:** `hamid@123`
3. Enjoy exploring the comprehensive dashboard!

---

## 🧪 Demo Data for Testing

To help you explore the application's forms and lookups, here are some valid dummy IDs you can use when asked for an **ITS ID**, **Sabil No**, or **Thali No**:

| Person Name | ITS ID | Sabil No | Thali No |
| :--- | :--- | :--- | :--- |
| **Mohd Hussain bhai Rangwala** | `40493729` | `1` | `T001` |
| **Akbarali bhai Udaipurwala** | `40621810` | `2` | `T009` |
| **Alihusain bhai Jasdanwala** | `40673390` | `3` | `T002` |
| **Taher bhai Saifuddin** | `30456789` | `5` | `T003` |
| **Burhanuddin bhai Contractor** | `70123456` | `7` | `T004` |
| **Irfan bhai Zoeb** | `60681946` | `4` | *-* |
| **Mustafa bhai Hakimuddin** | `50789123` | `6` | `T010` |

*Tip: Try entering an ITS ID in the **Daily Collection** or **Muwasaat Entry** forms to see the auto-populate feature in action! You can also use the Sabil numbers in the **Thali Master** search page.*

---

## 📂 Project Structure Overview

```text
src/
├── assets/            # Static assets and icons
├── components/
│   ├── charts/        # Recharts implementations
│   ├── layout/        # Header, Footer, Sidebar, MainLayout
│   └── ui/            # Reusable UI (DataTable, FilterPanel, Toast)
├── context/           # React Contexts (AuthContext, DataContext)
├── data/              # 15+ JSON files serving as the mock database
├── pages/             # Page components organized by module (Maliyah, FMB, etc.)
├── utils/             # Helper functions (formatters, etc.)
├── App.jsx            # Main router configuration
└── index.css          # Tailwind imports and custom classes
```

---
*Developed as a comprehensive frontend replication and UI/UX modernization project.*