import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import React, { InputHTMLAttributes, ReactNode } from 'react';

interface InputInputProps extends InputHTMLAttributes<HTMLInputElement> { }

interface InputRootProps {
  children: ReactNode,
  className?: string;
}

interface InputIconProps {
  children?: ReactNode
  className?: string;
}

interface InputAddornProps {
  children: string | ReactNode,
  className?: string;
}

const InputInput = React.forwardRef<HTMLInputElement, InputInputProps>(({ type, className, ...props }, ref) => {
  return (
    <input
      {...props}
      type={type}
      ref={ref}
      step={type === "number" ? 0.01 :"any"} 
      min={type === "number" ? 0.01 : undefined}
      className={clsx('bg-transparent outline-none w-full text-font placeholder:text-gray-400 px-3 font-sans', className)}
    />
  )
});

const InputRoot = ({ children, className }: InputRootProps) => {

  return (
    <div className={clsx("bg-gray-100 flex items-center rounded h-10 w-auto focus-within:ring-2 ring-primary group transition", className)}>
      {children}
    </div>
  )
}

const InputIcon = ({ children, className }: InputIconProps) => {

  return (
    <Slot className={clsx("w-7 h-7 pl-1 group-focus-within:text-primary transition", className)}>
      {children}
    </Slot>
  )
}

const InputAddorn = ({ children, className }: InputAddornProps) => {

  return (
    <div className={clsx("flex items-center h-full p-2 rounded-tl rounded-bl group-focus-within:bg-primary group-focus-within:text-white transition addorn", className)}>
      {children}
    </div>
  )

}

export const Input = {
  Root: InputRoot,
  Input: InputInput,
  Addorn: InputAddorn,
  Icon: InputIcon
}