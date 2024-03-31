import { DM_Sans } from "next/font/google";

import "./globals.css";
import Bot from "./components/bot.jsx";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
const inter = DM_Sans({ subsets: ["latin"] });
export const metadata = {
  title: "",
  description:
    "",
  image: "/logo.png",
  url: "",
  type: "website",
  siteName: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
    
        {children}
        <Bot />
        <Footer />
   
      </body>
    </html>
  );
}