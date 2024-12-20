import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { GlobalContextProvider } from "../context/Store";
import BootstrapClient from "../components/BootstrapClient";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Tiro_Bangla, Roboto } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
const dejaVuBold = localFont({
  src: [
    {
      path: "../../public/assets/fonts/DejaVuSerifCondensed-Bold.ttf",
    },
  ],
  variable: "--font-dejaVuBold",
});
const dejaVuCondensed = localFont({
  src: [
    {
      path: "../../public/assets/fonts/DejaVuSerifCondensed.ttf",
    },
  ],
  variable: "--font-dejaVuCondensed",
});
const tiro_bangla = Tiro_Bangla({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: "--font-tiro",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "MExpense App",
  description: "MExpense app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`container-fluid text-center text-white ${tiro_bangla.variable} ${roboto.variable} ${dejaVuBold.variable} ${dejaVuCondensed.variable}`}
      >
        <GlobalContextProvider>
          {children}
          <BootstrapClient />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
