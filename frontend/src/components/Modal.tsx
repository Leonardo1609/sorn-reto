import { ElementType } from "react"

interface IModal {
    component: ElementType
}

export const Modal = ({ component: Component }: IModal) => {
    return (
        <div className="h-screen absolute bg-opacity-80 bg-gray-800 w-full px-5 z-20">
            <div className="h-screen flex items-center justify-center">
                <Component />
            </div>
        </div>
    )
}
