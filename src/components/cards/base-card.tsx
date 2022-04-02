import React from "react";

type CardBaseProps = {
	children: React.ReactNode,
	classes?: string,
	hoverEffect?: boolean,
  padding?: number
};

const BaseCard = ({ children, hoverEffect, classes, padding }: CardBaseProps) => {
  const className = [`mx-4 lg:mx-0 flex-col bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg overflow-hidden p-${padding}`];
  if (classes != null) {
    className.push(classes);
  }
  if (hoverEffect) {
    className.push("transition duration-300 hover:-translate-y-3 hover:shadow hover:shadow-gray-800")
  }
  return <article className={className.join(" ")}>{children}</article>;
}

export default BaseCard;