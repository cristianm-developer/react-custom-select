import { ForwardedRef, forwardRef, ReactNode, useImperativeHandle, useRef } from "react";


export interface PlaceholderProps{
    children?: ReactNode;
    placeholder?: ReactNode;
    classname?: string;
    
}

export interface PlaceholderObjectRef{
    element: HTMLDivElement|null
}

export const Placeholder = forwardRef<PlaceholderObjectRef, PlaceholderProps>((props: PlaceholderProps, ref: ForwardedRef<PlaceholderObjectRef>) => {
    
    const internalRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        element: internalRef.current
    }), [])

    return (
        <div ref={internalRef} className={'form-placeholder' + (props.classname ?? '')}>
            {props.placeholder ?? props.children}
        </div>
    );
});