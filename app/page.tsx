"use client";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import CookiesBanner from "./components/CookiesBanner";
import Subscribe from "./components/Subscribe";

export default function Home() {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Cookies Banner */}
      <CookiesBanner />

      {/* Hero */}
      <Hero />

      {/* <!-- Testimonials --> */}
      <Testimonials />

      {/* <!-- Pricing --> */}
      <Pricing />

      {/* <!-- FAQ --> */}
      <Faq />

      {/* Subscribe */}
      <Subscribe />

      {/* Footer */}
      <Footer />
    </div>
  );
}
