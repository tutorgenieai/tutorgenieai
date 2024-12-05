import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import PrelineScript from "./components/PrelineScript";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });
const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const googleAnalyticsIdValue =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_VALUE;

export const metadata: Metadata = {
  title: "StudyStudio",
  description: "Your personal AI tutor and assignment partner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl={"/"}
      afterMultiSessionSingleSignOutUrl={"/"}
    >
      <html lang="en">
        <head>
          {/* <!-- Google tag (gtag.js) --> */}
          <Script async src={googleAnalyticsId}></Script>
          <Script id="google-analytics">
            {`window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${googleAnalyticsIdValue}');`}
          </Script>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={outfit.className}>
          <NextTopLoader color="#228B22" height={5} showSpinner={false} />
          {children}
        </body>
        <PrelineScript />
      </html>
    </ClerkProvider>
  );
}
