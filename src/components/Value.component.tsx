import { forwardRef, ReactNode, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";

export interface ValueProps {
    value?: string;
    children?: ReactNode;
    label?: ReactNode;    
}

export interface ValueObjectRef{
    value?: string;
    label?: ReactNode;
    element: HTMLDivElement
}

export const Value = forwardRef<ValueObjectRef, ValueProps>((props: ValueProps, ref) => {

    const internalRef = useRef<HTMLDivElement | null>(null);
    const [label, setLabel] = useState<ReactNode|null|undefined>(null);
    const [value, setValue] = useState<string|null|undefined>(null);

    useLayoutEffect(() => {
        if (props.value) {
            setValue(props.value);
        } else if (internalRef.current) {
            setValue(internalRef.current.innerText);
        }

        if(props.label && props.children)
            throw new Error("Duplicate label definition");

        if(props.label)
            setLabel(props.label);
        else if(props.children)
            setLabel(props.children);
        else if(typeof props.value === 'string')
            setLabel(props.value);
        else
            setLabel(null);

    }, [props.value, props.label, props.children]);

    useImperativeHandle(ref, () => ({
        value: value ?? undefined,
        label: label,
        element: internalRef.current!
    }), [value, label])

    return (
        <div ref={internalRef}>
            {props.label ? <span data-label>{props.label}</span> : label}
        </div>
    );
});