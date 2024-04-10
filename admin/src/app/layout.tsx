"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import ReduxProvider from "@/provider/ReduxProvider";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TopLoader from 'nextjs-toploader'
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Mynstars",
//   description:
//     "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return ( 
    <html lang="en">
            <body suppressHydrationWarning={true}>
              <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <Suspense fallback={<Loader/>}>
      <ReduxProvider>
        <DefaultLayout>
                <TopLoader color="#4a8fff" />
                {loading ? <Loader /> : children}
        </DefaultLayout>
    </ReduxProvider>
        </Suspense> 
              </div>
            </body>
          </html>
  );
}
