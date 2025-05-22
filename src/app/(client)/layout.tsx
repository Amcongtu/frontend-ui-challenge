"use client"

import ClientHeader from "@/components/layout/header/ClientHeader";
import ClientFooter from "@/components/layout/footer/ClientFooter";
import PageTransitionWrapper from "@/components/layout/common/PageTransitionWrapper";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const login = useUserStore((state) => state.login);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (user && isLoggedIn) {
      login(JSON.parse(user));
    }
  }, [login]);

  return (
    <>
      <ClientHeader />
      <PageTransitionWrapper>{children}</PageTransitionWrapper>
      <ClientFooter />
    </>
  );
}
