import { forwardRef, ReactNode } from "react";


export interface PlaceholderProps{
    children: ReactNode
}

export interface PlaceholderObjectRef{
    element: HTMLDivElement
}

export const Placeholder = forwardRef((props, ref) => {

    return null
});