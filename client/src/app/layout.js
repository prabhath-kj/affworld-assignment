
import { Inter } from "next/font/google";
import toast, { Toaster } from 'react-hot-toast';

import { GoogleOAuthProvider } from "@react-oauth/google";
import StoreProvider from "@/state/Provider"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider >
        <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
        </StoreProvider>
        <Toaster/>
      </body>
    </html>
  );
}
