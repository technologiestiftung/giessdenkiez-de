import React from "react";

export interface SkeletonProps {
	className?: string;
}

export const Skeleton: React.FC<
	SkeletonProps & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
	return (
		<div
			className={`animate-pulse rounded-md bg-muted ${className}`}
			{...props}
		/>
	);
};
