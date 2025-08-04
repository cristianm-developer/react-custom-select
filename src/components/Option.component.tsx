import React, { ReactNode, MouseEvent, forwardRef, useRef, useImperativeHandle, ForwardedRef } from "react";

export interface OptionProps{
    children: ReactNode;
    value: string;
    label: string;
    selected?: boolean;
    onSelect?: ({value, label}:{value:string, label: string}) => void;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface OptionObjectRef {
    element: HTMLDivElement | null,
    value: string,
    label: string,
    selected: boolean
}

const Option = forwardRef<OptionObjectRef, OptionProps>((props: OptionProps, ref:ForwardedRef<OptionObjectRef>) => {
    
    const internalRef = useRef<HTMLDivElement|null>(null);
    
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        props.onSelect?.({value: props.value, label: props.label});
        props.onClick?.(event);
    }

    useImperativeHandle(ref, () => ({
        element: internalRef.current,
        label: props.label,
        value: props.value,
        selected: props.selected ?? false
    }), [props])

    return (
        <div ref={internalRef} className={`form-option ${props.selected ? 'selected' : ''}`} onClick={handleClick}>
            {props.children}
        </div>
    );
});

export default Option;