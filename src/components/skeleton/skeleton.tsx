import React from "react";

export interface SkeletonProps {
	className?: string;
}

export const Skeleton: React.FC<
	SkeletonProps & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
	return (
		<div
			className={`
				relative 
				overflow-hidden
				before:absolute before:inset-0
				before:-translate-x-full
				before:animate-[shimmer_1.5s_infinite]
				before:bg-gradient-to-r
				before:from-transparent before:via-slate-50/40 before:to-transparent w-full h-full`}
		>
			<div className={`bg-slate-200 ${className}`} {...props} />
		</div>
	);
};
