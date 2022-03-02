import React from "react";

type LayoutProps = {
  children: React.ReactNode,
  gap?: number
};

const Layout = ({ children, gap }: LayoutProps) => (
  <div className={`flex flex-col ${(gap === undefined ? "gap-y-24" : `gap-y-${gap}`)}`}>{children}</div>
)

export default Layout;
