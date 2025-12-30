import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { GlobalContextProvider } from "../context/Store";
import BootstrapClient from "../components/BootstrapClient";
import "bootstrap-icons/font/bootstrap-icons.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "MExpense App",
  description: "MExpense app",
};

const timesNewRoman = localFont({
  src: [
    {
      path: "../fonts/times.ttf",
    },
  ],
  variable: "--font-timesNewRoman",
});
const kalpurush = localFont({
  src: [
    {
      path: "../fonts/times.ttf",
    },
  ],
  variable: "--font-kalpurush",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`container-fluid text-center text-black ${kalpurush.variable} ${timesNewRoman.variable}`}
      >
        <GlobalContextProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
          />
          <BootstrapClient />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
