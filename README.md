
# 🎟️ Event Booking Platform

A modern full-stack application for creating, browsing, and purchasing event tickets – available on **web** and **mobile**.

---

## 📽️ Demo Videos

- 🎫 [Buy Ticket | Web App](https://youtu.be/vfbKGoMXNcg)
- ✏️ [Create New Event | Web App](https://youtu.be/vfbKGoMXNcg)
- 📱 [Buy Ticket | Mobile App (Short)](https://youtube.com/shorts/qJOOIpKZPZE)

---

## 🚀 Tech Stack

| Platform | Stack                                 | Repo Link                                                                 |
|----------|----------------------------------------|---------------------------------------------------------------------------|
| 🌐 Web   | React (Vite), Tailwind, Supabase       | 👉 [event-booking-web](https://github.com/miloszpiechota/event-booking-web.git)     |
| 📱 Mobile| React Native (Expo), Supabase          | 👉 [event-booking-app](https://github.com/miloszpiechota/event-booking-app.git)     |

---

## 🛠️ Key Features

- 👤 User authentication (via Supabase)
- 🗓️ Create & manage events
- 🎫 Buy Standard or VIP tickets
- 🧾 Checkout with Stripe
- 📦 Store tickets with QR codes
- 📲 Scan & validate tickets (mobile)
- 🌍 Calendar + Map views

---

## 🧩 Backend

Both apps share a unified backend powered by **Supabase** for:
- 📄 Database (PostgreSQL)
- 🔐 Auth
- 📁 File storage
- 📤 API communication

---



## 📱 Technologies Used

- **Frontend Web**: React + TypeScript (Vite)
- **Mobile App**: React Native with Expo SDK 53
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Payments**: Stripe API
- **Maps & Location**: OpenStreetMap API (for address validation)
- **QR Codes**: crypto-js (web) / expo-crypto (mobile)
- **Testing***: Jest + React Testing Library

---

## 🔐 Main Features

### ✅ Authentication
- Sign up and log in using Supabase Auth on both mobile and web.

### 🎫 Create Event
- Web users can create a new event:
  - Step 1: Fill organizer’s personal data
  - Step 2: Fill event data (title, dates, description, image)
  - Step 3: Add ticket details including price and generate a QR code
- Address fields are validated using OpenStreetMap API.
- On completion, a new event is stored in Supabase using Edge Function (`create-new-event`).

### 🛒 Buy Tickets
- Users can browse events, view ticket details, and make purchases.
- Payment is handled using **Stripe**.
- After successful payment:
  - A new order is saved in Supabase via an Edge Function (`payment-process`)
  - Available ticket quantity is updated
  - User sees their ticket in **TicketBox**.

### 🎟️ View My Tickets
- After login, users can go to **TicketBox** to see purchased tickets.
- Each ticket contains a QR code.

### 📷 QR Scanner Access
- In the **mobile app**, there's a built-in QR scanner:
  - Uses device camera to scan QR codes
  - Decodes ticket information (including SHA256 checksum)
  - Looks up the ticket in Supabase
  - If valid and unused → marks it as "checked_in"

---


## ✅ Testing

This app includes **unit** and **integration tests** written with:

* `Jest`
* `React Testing Library`

We test:

* Multi-step forms and field validations
* QR code generation and form submission
* Conditional navigation based on state and validation
* Mocked API calls and geolocation lookups


---

## 🧪 How the QR Code Works

Each QR code contains this information:

* `ticketId`
* `ticketName`
* `eventName`
* `issuedAt` (timestamp)
* `checksum` (a secure value to prevent tampering)

The `checksum` is generated like this:

```
SHA256(ticketName:eventName:issuedAt + secretKey)
```

This value helps to verify that the QR code has not been changed or faked.

> 🔐 The `secretKey` is stored in `.env` files (both in the mobile and web apps), so it is not visible in the public code.

When scanning the QR:

1. The app decodes the data from base64.
2. It calculates the checksum again using the same formula.
3. If the new checksum is the same as the one in the QR – the code is valid.
4. The app then looks for the ticket in the database by using the QR token.
5. If the ticket is found and its status is `"paid"`, it can be marked as `"checked_in"`.

---

## 🚀 How to Run

### Web App
```bash
cd event-booking-web
npm install
npm run dev
```

### Mobile App
```bash
cd event-booking-app
npx expo install
npx expo start
```

### Stripe Server
```bash
cd stripe-server
node server.js
```
Make sure to configure:
- `.env` files with Supabase keys and QR secret key
- Edge Functions via Supabase dashboard

---

## 📂 Folder Structure

```
event-booking-app/
  └── mobile React Native app (Expo)

event-booking-web/
  └── Vite + React app

supabase/
  └── Edge Functions and database setup
```

---

## 🛡️ Security

- Secret key used to sign QR codes is not hardcoded
- All sensitive calls require valid Supabase tokens
- CORS headers managed in Edge Functions

---

## 📸 Screenshots
[▶️ Zobacz nagranie demo](https://youtu.be/vfbKGoMXNcg)
[Create New Event](https://youtu.be/vfbKGoMXNcg)
[Mobile App](https://youtube.com/shorts/qJOOIpKZPZE)


### 🔐 Authentication
<img src="https://github.com/user-attachments/assets/978a64d3-54d4-4e72-a190-4c70da86802b" width="500" />

### 📝 Create Event
<img src="https://github.com/user-attachments/assets/90b0a402-7081-4208-b6ba-8983d2a61f42" width="500" />

<img src="https://github.com/user-attachments/assets/4039c53d-debc-441d-9ae3-afed56f6fbd2" width="500"/>

<img src="https://github.com/user-attachments/assets/a7c7cbde-492a-4df1-967b-8db47af16eff" width="500"/>


<img src="https://github.com/user-attachments/assets/087b7dc5-fc79-40e5-980c-4d3612d21413" width="500"/>


- Ticket checkout
- QR code in TicketBox
- Mobile QR scanner
