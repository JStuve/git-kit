import clsx from "clsx";
import './Button.scss';

export interface ButtonProps {
    className?: string[];
    child: string | JSX.Element;
    click?: () => void;
    variant?: 'no-style';
    title?: string;
}
function Button(props: ButtonProps) {
    return (
        <button className={clsx('button', ...(props?.className ?? []),
        {
            'button--no-style': props.variant === 'no-style'
        })} 
            onClick={props.click}
            title={props?.title}>
            {props.child}
        </button>
    )
}

export default Button;