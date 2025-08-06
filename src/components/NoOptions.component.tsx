import { ForwardedRef, forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { AddonObjectRef, AddonProps } from "./Addon.component";


export const NoOptions = forwardRef<AddonObjectRef, AddonProps>((props: AddonProps, ref: ForwardedRef<AddonObjectRef>) => {

    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        element: divRef.current,
        label: props.label ?? divRef.current?.innerText
    }), [divRef.current, props.label, props.children]);

    return <div ref={divRef} className={props.className ?? '' + ' form-no-options'}>
        {
            props.label
                ? <span>{props.label}</span>
                : props.children
        }
    </div>

});