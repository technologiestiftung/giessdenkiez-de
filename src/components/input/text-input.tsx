import React from "react";

export const TextInput: React.FC<
	React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
	return (
		<input
			className={`
        border-input bg-background placeholder:text-muted-foreground my-2 flex h-[51px] w-full flex-auto 
        rounded-2xl border px-3 py-2 outline-1 focus:outline-2
        focus:outline-gdk-blue disabled:cursor-not-allowed disabled:opacity-50
      `}
			{...props}
		/>
	);
};
