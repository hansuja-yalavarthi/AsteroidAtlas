type ButtonProps = {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
  };
  
  const Button = ({
    children,
    onClick,
    disabled = false,
    className,
  }: ButtonProps) => {
    return (
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  };
  
  export default Button;  