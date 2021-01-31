interface IButtonProps {
    value: string,
    className: string,
    type: 'button' | 'submit',
    fn?: () => void
}

export const Button = ({ value, className, type, fn }: IButtonProps ) => {
    return (
        <button
            className={ className } 
            type={ type }
            onClick={ fn } 
        >{ value }</button>
    )
}
