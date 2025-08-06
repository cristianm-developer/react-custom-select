import { forwardRef, JSX, ReactNode, useRef, useImperativeHandle } from "react";

export interface AddonProps {
    children?: ReactNode;
    className?: string;
    label?: string;
}

export interface AddonObjectRef {
    element: HTMLDivElement | null;
    label: string | undefined;
}

const AddonComponent = forwardRef<AddonObjectRef, AddonProps>((
    {
        children = null,
        className = '',
        label = undefined
    },
    ref
): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        element: divRef.current,
        label
    }), [divRef.current]);

    return <div ref={divRef} className={className}>{
            label
                ? <span>{label}</span>
                : children
            }
         </div>
});

export const Prefix = forwardRef<AddonObjectRef, AddonProps>((props, ref): JSX.Element => {
    return <AddonComponent ref={ref} className={`form-prefix ${props.className ?? ''}`} label={props.label}>{props.children}</AddonComponent>
});

export const Suffix = forwardRef<AddonObjectRef, AddonProps>((props, ref): JSX.Element => {
    return <AddonComponent ref={ref} className={`form-suffix ${props.className ?? ''}`}  label={props.label}>{props.children}</AddonComponent>
});

