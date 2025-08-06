import React, { ReactNode, MouseEvent, forwardRef, useRef, useImperativeHandle, ForwardedRef, useState, useLayoutEffect } from "react";

export interface OptionProps{
    children?: ReactNode;
    value?: string;
    label?: ReactNode;
    selected?: boolean;
    onSelect?: ({value, label}:{value:string|undefined|null, label: ReactNode}) => void;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface OptionObjectRef {
    element: HTMLDivElement | null,
    value?: string|null|undefined,
    label?: ReactNode,
    selected: boolean
}

const Option = forwardRef<OptionObjectRef, OptionProps>((props: OptionProps, ref:ForwardedRef<OptionObjectRef>) => {
    
    const internalRef = useRef<HTMLDivElement|null>(null);
     const [label, setLabel] = useState<ReactNode|null|undefined>(null);
    const [value, setValue] = useState<string|null|undefined>(null);

    useLayoutEffect(() => {
        if(props.value){
            setValue(props.value);
        } else if (internalRef.current){
            setValue(internalRef.current.innerText)
        }

        if(props.label && props.children)
            throw new Error ("Label definition duplicated");

        if(props.label)
            setLabel(props.label);
        else if(props.children)
            setLabel(props.children);
        else if(typeof props.value === 'string')
            setLabel(props.value);
        else
            setLabel(null);

    }, [props.value, props.label, props.children])

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        props.onSelect?.({value, label});
        props.onClick?.(event);
    }

    useImperativeHandle(ref, () => ({
        element: internalRef.current,
        label,
        value,
        selected: props.selected ?? false
    }), [props.label, props.value, props.selected, props.children])

    return (
        <div ref={internalRef} className={`form-option ${props.selected ? 'selected' : ''}`} onClick={handleClick}>
            {label}
        </div>
    );
});

export default Option;