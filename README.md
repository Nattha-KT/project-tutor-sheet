# University Study Sheet Marketplace (TUTOR-SHEET)

This project is a web application built using **Next.js 14** with the purpose of creating a marketplace for university students to buy and sell study sheets. The application features a complete e-commerce system with both a buying and selling platform as well as admin management functionalities. This project was inspired by the website **Moresheet**.

## Features

- **User Registration & Authentication**
  - Secure sign-up and login using **NextAuth.js**.
- **Marketplace Functionality**
  - Students can upload and sell their study sheets.
  - Buyers can search, browse, and purchase study sheets from different subjects.
- **Admin Dashboard**

  - Manage users, transactions, and study sheet listings.

- **Payment Integration**
  - **Stripe** is used for processing secure payments.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Database**: [Prisma](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Storage**: [Firebase](https://firebase.google.com/) (DAS)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Daisy UI](https://daisyui.com/), [Material Tailwind](https://www.material-tailwind.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Payment Processing**: [Stripe](https://stripe.com/)
- **Deployment**: [Railway](https://railway.app/)

    <br/>
    <br/>

  <div align="left">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="45" alt="typescript logo"  />
    <img width="15" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="45" alt="react logo"  />
    <img width="15" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="45" alt="nextjs logo"  />
    <img width="15" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" height="45" alt="firebase logo"  />
    <img width="15" />
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="45" alt="postgresql logo"  />
    <img width="15" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" height="45" alt="tailwindcss logo"  />
    <img width="15" />
    <img src="https://logos-world.net/wp-content/uploads/2022/12/Stripe-Emblem.png" height="45" alt="Stripe logo"  />
    <img width="15" />
    <img src="https://img.daisyui.com/images/daisyui-logo/daisyui-logotype.svg" height="40" alt="Stripe logo"  />
    <img width="15" />
  </div>

<!-- <div align="left">
  <img width="25" />
  <img src="https://img.daisyui.com/images/daisyui-logo/daisyui-logotype.svg" height="40" alt="Stripe logo"  />
  <img width="15" />
</div> -->

  <br/>
  <br/>

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16.x or higher)
- PostgreSQL
- Firebase account for storage
- Stripe account for payments
- Railway account for deployment

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nattha-KT/project-tutor-sheet.git
   cd project-tutor-sheet
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables for **Prisma**, **PostgreSQL**, **NextAuth.js**, **Firebase**, and **Stripe**.

4. Run the application locally:

   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`.

## View Samples

<br/>
 <div align="center" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
    <img src="./public/readme-show/readme-show1.png" height="300" width='660' alt="Image 1" />
    <img src="./public/readme-show/readme-show2.png" height="300" width='660' alt="Image 2" />
    <img src="./public/readme-show/readme-show3.png" height="300" width='660' alt="Image 3" />
</div>
<br/>

 
- [Here presentation detail](https://www.canva.com/design/DAF8wGmWVss/U01VXklxW8gabtddMOQ1wQ/edit?utm_content=DAF8wGmWVss&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## License

This project is licensed under the MIT License.
