
# 🎟️ Event Booking Platform

**Event Booking Platform** is a full-stack project made with two main parts:
- A **web app** built using **React (Vite)** -> https://github.com/miloszpiechota/event-booking-web.git
- A **mobile app** built using **React Native with Expo** -> https://github.com/miloszpiechota/event-booking-app.git

Both apps use **Supabase** as the backend (database, authentication, storage) and communicate through **API routes**. The system allows users to create, browse, purchase, and check tickets for events.

---

## 📱 Technologies Used

- **Frontend Web**: React + TypeScript (Vite)
- **Mobile App**: React Native with Expo SDK 53
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Payments**: Stripe API
- **Maps & Location**: OpenStreetMap API (for address validation)
- **QR Codes**: crypto-js (web) / expo-crypto (mobile)

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

## 📸 Optional (Screenshots)

You can add screenshots here to show the interface for:
- Creating an event
- Ticket checkout
- QR code in TicketBox
- Mobile QR scanner
