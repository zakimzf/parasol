import React from "react";

type ContainerProps = {
  children: React.ReactNode,
  fluid?: boolean
};

const Container = ({ children, fluid }: ContainerProps) => (
  <div className={`mx-auto ${fluid ? "px-20" : "max-w-7xl"} px-5`}>{children}</div>
)

export default Container
