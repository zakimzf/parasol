import React from "react";

type CardProps = {
	children: React.ReactNode,
  padded?: boolean
};

const Card = ({ children, padded }: CardProps) => {
  return <div className={`card ${padded ? "padded" : ""} duration-300 hover:-translate-y-1 -hover:scale-[1.021]`}>{children}</div>;
}

export default Card;