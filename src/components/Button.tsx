import clsx from "clsx";
import './Button.scss';

export interface ButtonProps {
    className?: string[];
    child: string | JSX.Element;
    click?: () => void;
    variant?: 'no-style'
}
function Button(props: ButtonProps) {
    return (
        <button className={clsx('button', ...(props?.className ?? []),
        {
            'button--no-style': props.variant === 'no-style'
        })} 
            onClick={props.click}>
            {props.child}
        </button>
    )
}

export default Button;