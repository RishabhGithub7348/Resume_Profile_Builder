import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return ( 
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
        flex 
        justify-center 
        rounded-md 
        px-6 
        py-3 
        text-lg
        h-[51px]
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        `,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-[51%]',
        secondary ? 'text-slate-300' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
      )}
    >
      {children}
    </button>
   );
}
 
export default Button;