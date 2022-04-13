import React from "react";

type CardProps = {
	children: React.ReactNode,
  padded?: boolean
};

const Card = ({ children, padded }: CardProps) => {
  return <div className={`card ${padded ? "padded" : ""}`}>{children}</div>;
}

export default Card;