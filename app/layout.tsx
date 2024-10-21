import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets:["latin"],
  variable: "--font-inter",
  preload:true
 
});
const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  weight: ['400','700'],
  subsets: ['latin'],  // add the subsets you need here, e.g., 'latin'
  preload: true,
});

export const metadata: Metadata = {
  title: "BankRata" ,
  description: "BankRata state of the art banking platform for Africans" ,
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
