import React from "react";

type ContainerProps = {
  children: React.ReactNode,
  fluid?: boolean
};

export default ({ children, fluid }: ContainerProps) =>
  <div className={`mx-auto ${fluid ? 'px-20' : 'max-w-7xl'} px-5 `}>{children}</div>

