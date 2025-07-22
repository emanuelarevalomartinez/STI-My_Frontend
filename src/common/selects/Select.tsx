import { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export function Select({ children, ...props }: Props) {
  return (
    <>
      <select
        {...props}
        className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      >
        {children}
      </select>
    </>
  );
}
