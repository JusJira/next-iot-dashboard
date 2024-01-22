import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const jbm= JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IoT Dashboard",
  description: "IoT Dashboard using InfluxDB, MQTT and Telegraf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jbm.className} min-h-[100dvh] flex flex-col justify-between`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
