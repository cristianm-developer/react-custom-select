import { Children, ForwardedRef, forwardRef, isValidElement, ReactElement, ReactNode, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Prefix, Suffix } from "./Addon.component";
import Option, { OptionProps } from "./Option.component";
import './Select.scss';
import React from "react";

export interface SelectValue{
    label: string;
    value: string;
}

export interface SelectObjectRef{
    element: HTMLDivElement | null;
    open: () => void;
    close: () => void;
}

export interface SelectProps{
    value?: SelectValue,
    children?: ReactNode,
    prefix?: string,
    suffix?: string,
    className?: string,
    onChange?: (value: string|undefined|null, label: string|undefined|null) => void,
    placeholder?: string,
    open?: boolean
}

const Select = forwardRef<SelectObjectRef, SelectProps>((props: SelectProps, ref: ForwardedRef<SelectObjectRef>) => {
    
    const [isOpen, setIsOpen] = useState(props.open ? true : false);
    const [internalValue, setInternalValue] = useState<string|null|undefined>(null);
    const [activeLabel, setActiveLabel] = useState<string|null|undefined>(null);
    
    const internalRef = useRef<HTMLDivElement>(null);
    const optionBoxRef = useRef<HTMLDivElement>(null);

    const allowedTypes = [Option, Prefix, Suffix];
    const childrenArray: ReactNode[] = Children.toArray(props.children);

    let prefix: ReactElement<typeof Prefix> | null = null;
    let suffix: ReactElement<typeof Suffix> | null = null;
    let options: ReactElement<OptionProps>[] = [];

    const handleClickOutside = (event: MouseEvent) => {
        if(optionBoxRef.current && !optionBoxRef.current.contains(event.target as Node))
            setIsOpen(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        handleSelectedOption({value: props.value?.value, label: props.value?.label});
    }, [props.value])
    


    function validateChildOrWarn(child: ReactNode): asserts child is ReactElement {
        if (!isValidElement(child)) {
            const allowedNames = Array.isArray(allowedTypes) ? allowedTypes.map(e => e.name).join(", ") : "";
            let actual: string = typeof child;
            let actualType = (child as any).type;
            const actualName = (actualType as any).displayName || (actualType as any).name || typeof actualType;
            if (!allowedTypes.includes(actualType))
                throw new Error(`react-select error: Select child of type "${actual}" is invalid. Only [${allowedNames}] are allowed.`);
        }
    };

    if(props.prefix)
        prefix = <Prefix>{props.prefix}</Prefix>
    if(props.suffix)
        suffix = <Suffix>{props.suffix}</Suffix>

    function handleSelectedOption({value, label}: {value: string|null|undefined, label: string|null|undefined}) {
        setInternalValue(value);
        setActiveLabel(label);

        props.onChange?.(value, label);
    }

    childrenArray.forEach((child: ReactNode) => {
        validateChildOrWarn(child);

        const element = child as ReactElement;

        switch (element.type){
            case Prefix:
                if(prefix)
                    if(props.prefix)
                        throw new Error("react-select error: Duplicate <Prefix> already set via props.prefix");
                    else
                        throw new Error("react-select error: Duplicate <Prefix> element");
                else
                    prefix = element as ReactElement<typeof Prefix>;
                break;
            case Suffix:   
                if(suffix)
                    if(props.suffix)
                        throw new Error("react-select error: Duplicate <Suffix> already set via props.prefix");
                    else
                        throw new Error("react-select error: Duplicate <Suffix> element");
                else
                    suffix = element as ReactElement<typeof Suffix>;
                break;
            case Option:
                options.push(
                    React.cloneElement(element as React.ReactElement<any, any>, {
                       onSelect: handleSelectedOption,
                       selected: (element.props as OptionProps).value === internalValue
                    })
                );
        }
    });

    useImperativeHandle(ref, () => ({
        element: internalRef.current,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false)
    }));

    return (
        <div ref={internalRef} className={`react-select ${props.className ?? ''} ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen((prev)=> prev ? false : true )} tabIndex={0}>
            <div className="form-value-box">
                {prefix}
                {internalValue 
                    ? <div className="form-value-field">{activeLabel}</div>
                    : props.placeholder ? <div className="form-placeholder">{props.placeholder}</div> : null
                }
                {suffix}
            </div>
            {   isOpen 
                ? (<div className="form-options-box" ref={optionBoxRef}>
                        {options}
                    </div>)
                : null
            }
        </div>
    )
}) 

export default Select;