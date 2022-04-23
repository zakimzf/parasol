import React from "react";

type LayoutProps = {
  children: React.ReactNode,
  short?: boolean
};

const Layout = ({ children, short }: LayoutProps) => (
  <div className={`flex flex-col gap-y-6 ${(short ? "gap-y-12" : "lg:gap-y-24")}`}>{children}</div>
)

export default Layout;
