import "./Button.css";

type Props = {
  text: string;
  onClick: () => void;
  className?: string;
};

const Button = (props: Props) => {
  const { text, onClick, className } = props;
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
