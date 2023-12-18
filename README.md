<h1 align="center">
   MediGuard FrontEnd
</h1>

<p align="center">
  <img src="public/cover.png" width=600>
</p>

<p align="center">
  <img src="public/solution.png" width=600>
</p>

<hr>

## Links

> You can access this project **Presentation Document** [here](https://drive.google.com/file/d/1CQkhwUdCbhxuCJ99sjeLs7n6yPRZ4OtA/view?usp=sharing).

> You can access this project **Presentation Video** [here](https://drive.google.com/file/d/1WU9sOQmbLlwPh9UiBEErLX7TM-E2cEbQ/view?usp=sharing).

> You can access the **FrontEnd** repository [here](https://github.com/ardhanurfan/MediGuard-web).

> You can access the **Back End** repository [here](https://github.com/ardhanurfan/mediguardserver).

> You can access the **Mobile App** repository [here](https://github.com/ardhanurfan/MediGuard-mobile).

## Table of Contents

1. [General Information](#general-information)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Structure](#structure)
5. [Our Team](#team)
6. [Copyright](#copyright)

<a name="general-information">

## General Information

This is project for Digihatch Dexa Group Hackathon. MediGuard is software for pharmaceutical logistics. This app have some features such as:

- Admin dashboard for monitoring and assign to driver. When assigning, a vendor analysis will be carried out in terms of distance, time and price. Beside that, customer will receive QR Code to unlock the MediGuard Hardware.
- Mobile Apps for driver. Driver assigned by Admin, will use mobile application for product monitoring and unlock MediGuard by scanning the customer's QR Code.
- MediGuard IoT Hardware. Based on Internet of Things Technology for monitoring humidity, temperature, and GPS tracking. This hardware will also maintain security by locking packages.

<a name="technologies-used"></a>

## Technologies Used

This project using some technologies :

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/guide/)
- [Tailwindcss](https://tailwindcss.com/docs/installation)
- NodeJS
- Socket.io
- MongoDB
- Flutter
- MQTT

This project also connected with API services provider :

- Google Maps API
- WhatsApp API
- Raja Ongkir API

<a name="installation">

## Installation

First, install all the dependencies,

```bash
npm i
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

<a name="structure">

## Structure

```bash
├── .env
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│  ├── assets
│  │  ├── icon.svg
│  │  ├── jne.png
│  │  ├── logo.svg
│  │  ├── myloc.svg
│  │  ├── pos.png
│  │  ├── react.svg
│  │  └── tiki.png
│  ├── cover.png
│  └── vite.svg
├── README.md
├── src
│  ├── api
│  │  ├── api.tsx
│  │  └── socket.tsx
│  ├── App.tsx
│  ├── components
│  │  ├── Button
│  │  │  └── Button.tsx
│  │  ├── DateTimePicker
│  │  │  └── DateTimePicker.tsx
│  │  ├── Dropdown
│  │  │  └── Dropdown.tsx
│  │  ├── GoogleMaps
│  │  │  └── GoogleMaps.tsx
│  │  ├── Navbar
│  │  │  └── Navbar.tsx
│  │  ├── Paginate
│  │  │  └── Paginate.tsx
│  │  ├── PopUp
│  │  │  └── PopUp.tsx
│  │  ├── SideBar
│  │  │  ├── SideBar.tsx
│  │  │  └── SideBarMenu.tsx
│  │  ├── Table
│  │  │  └── Table.tsx
│  │  ├── Textfield
│  │  │  └── Textfield.tsx
│  │  └── Toast
│  │    └── Toast.tsx
│  ├── context
│  │  └── UserContext.tsx
│  ├── index.css
│  ├── main.tsx
│  ├── pages
│  │  ├── Login
│  │  │  └── Login.tsx
│  │  ├── Map
│  │  │  └── Map.tsx
│  │  ├── MediGuard
│  │  │  └── MediGuard.tsx
│  │  ├── NotFound
│  │  │  └── NotFound.tsx
│  │  ├── Overview
│  │  │  ├── DistributedCard.tsx
│  │  │  └── Overview.tsx
│  │  ├── Register
│  │  │  └── Register.tsx
│  │  └── Transaction
│  │    └── Transaction.tsx
│  └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

<a name="team">

## Our Team

- Ardhan Nur Urfan
- Reswara Trista
- Karina Rahadiani

<a name="copyright"></a>

## Copyright

<h4 align="center">
  Sikat Team. Copyrights @2023
</h4>

</hr>
