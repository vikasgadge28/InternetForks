/** @format */
"use client";
import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import { FormProvider } from "@/context/FormContext";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FormProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex border-b border-black p-4 border-t flex-1">
              <Sidebar />
              <main className="flex-1">{children}</main>
            </div>
            <Footer />
          </div>
        </FormProvider>
      </body>
    </html>
  );
}
