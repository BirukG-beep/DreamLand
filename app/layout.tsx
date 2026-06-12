import type { Metadata } from "next";

import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";

import LoginModel from "./components/models/LoginModel";
import RegisterModel from "./components/models/RegisterModel";
import RentModel from "./components/models/RentModel";
import SearchModel from "./components/models/SearchModel";

import ToasterProvider from "./providers/ToasterProvider";
import { getCurrentUser } from "./actions/getCurrentUser";
import Button from "./components/Home/Button"

export const metadata: Metadata = {

  title: "DreamLand Hotel",
  description:
    "Experience the perfect blend of comfort and nature at DreamLand Hotel in Bishoftu.",

  icons: {
    icon: [
      { url: "/favicon-196.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-196.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-196.png", sizes: "196x196", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon-180.png", sizes: "180x180", type: "image/png" }],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DreamLand",
  },

  manifest: "/manifest.json",

  verification: {
    google: "64x5WN3HmPz0j275V01LjDbSBiSpKREqyaBB_QE7AQE",
  },

  authors: [{ name: "DreamLand Hotel" }],
}

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <head>
      </head>
      <body className={font.className} style={{ margin: 0 }}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModel />
          <RegisterModel />
          <LoginModel />
          <RentModel />
          {/* <Navbar currentUser={currentUser} /> */}
        </ClientOnly>
        <div>{children}</div>
        <Button />
      </body>
    </html>
  );
}
