import { Children, cloneElement, createElement, ForwardedRef, forwardRef, isValidElement, JSX, JSXElementConstructor, MutableRefObject, ReactElement, ReactNode, Ref, RefAttributes, RefCallback, RefObject, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { AddonObjectRef, AddonProps, Prefix, Suffix } from "./Addon.component";
import { Value, ValueObjectRef, ValueProps } from "./Value.component";
import { Placeholder, PlaceholderObjectRef, PlaceholderProps } from "./Placeholder.component";
import Option, { OptionObjectRef, OptionProps } from "./Option.component";
import './Select.scss';
import { detectNode, handleNodeValue } from "./libs/settingElements";



export interface SelectObjectRef {
    mainElement: HTMLDivElement | null;
    formValueBoxElement: HTMLDivElement | null;
    optionBoxElement: HTMLDivElement | null;

    prefixRef: AddonObjectRef | null;
    suffixRef: AddonObjectRef | null;
    valueRef: ValueObjectRef | null;
    placeholderRef: PlaceholderObjectRef | null;

    open: () => void;
    close: () => void;

    value: string | undefined;
    isOpen: boolean;
}

export interface SelectProps {
    value?: ReactNode,
    children?: ReactNode,
    prefix?: ReactNode,
    suffix?: ReactNode,
    options?: ReactNode,
    placeholder?: ReactNode,
    className?: string,
    onChange?: (value: string | undefined | null, label: ReactNode) => void,
    open?: boolean
}


export const Select = forwardRef<SelectObjectRef, SelectProps>((props: SelectProps, ref: ForwardedRef<SelectObjectRef>) => {

    const [isOpen, setIsOpen] = useState(props.open ? true : false);

    const internalRef = useRef<HTMLDivElement>(null);
    const formValueBox = useRef<HTMLDivElement>(null);
    const optionBoxRef = useRef<HTMLDivElement>(null);

    const childrenArray: ReactElement[] = Children.toArray(props.children ?? []).filter(e => isValidElement(e));

    const [prefixEl, setPrefixEl] = useState<ReactElement<AddonProps> | undefined>(undefined);
    const prefixRef = useRef<AddonObjectRef>(null);
    const [suffixEl, setSuffixEl] = useState<ReactElement<AddonProps> | undefined>(undefined);
    const suffixRef = useRef<AddonObjectRef>(null);
    const [valueEl, setValueEl] = useState<ReactElement<ValueProps> | undefined>(undefined);
    const valueRef = useRef<ValueObjectRef>(null);
    const [placeholderEl, setPlaceholderEl] = useState<ReactElement<PlaceholderProps> | undefined>(undefined);
    const placeholderRef = useRef<PlaceholderObjectRef>(null);
    const [optionsEls, setOptionsEls] = useState<ReactElement<OptionProps>[] | undefined>(undefined);
    const optionsRef = useRef<(OptionObjectRef | undefined)[] | undefined>(null);

    let internalClassname = '';

    if (props.className)
        internalClassname = props.className.replaceAll(/\s+/g, ' ').trim();

    const handleOptionClick = (selection: {value: string, label: ReactNode}) => {
        setValueEl(createElement(Value, {label: selection.label, value: selection.value, ref: valueRef}));
        props.onChange?.(selection.value, selection.label);
    }

    function setInitialNodes() {

        setPrefixEl(detectNode(props.prefix, Prefix, childrenArray, prefixRef));
        setSuffixEl(detectNode(props.suffix, Suffix, childrenArray, suffixRef));
        setPlaceholderEl(detectNode(props.placeholder, Placeholder, childrenArray, placeholderRef));
        setValueEl(detectNode(props.value, Value, childrenArray, valueRef));

        let optionsInternal: ReactElement<OptionProps>[] | undefined = undefined;
        const optionsFromProps = props.options;

        const optionsFromChildren: ReactElement<OptionProps>[] = childrenArray.filter(e => e.type === Option) as ReactElement<OptionProps>[];

        if (optionsFromProps) {
            if (Array.isArray(optionsFromProps)) {
                optionsRef.current = Array(optionsFromProps.length).fill(null);
                optionsInternal = optionsFromProps.map((opt, index) => {
                    const refCallback = (el: OptionObjectRef | null) => {
                        optionsRef.current![index] = el!;
                    }
                    return handleNodeValue(opt, Option, { ref: refCallback, onSelect: handleOptionClick }) as ReactElement<OptionProps>;
                });
            } else {
                optionsRef.current = [undefined];
                optionsInternal = [handleNodeValue(optionsFromProps, Option, { ref: (el: OptionObjectRef | undefined) => optionsRef.current![0] = el, onSelect: handleOptionClick }) as ReactElement<OptionProps>];
            }
        } else if (optionsFromChildren.length) {
            optionsRef.current = Array(optionsFromChildren.length).fill(null);
            const newOptions: ReactElement<OptionProps>[] = [];
            optionsFromChildren.forEach((child, index) => {
                const refCallback: Ref<OptionObjectRef | undefined> = (el: OptionObjectRef | undefined) => {
                    optionsRef.current![index] = el;
                }

                newOptions.push(cloneElement(child, { ref: refCallback, onSelect: handleOptionClick} as RefAttributes<OptionProps>) as ReactElement<OptionProps>);
            });
            optionsInternal = newOptions;
        }
        setOptionsEls(optionsInternal);
    }

    useLayoutEffect(() => {
        setInitialNodes();
    }, [
        props.children,
        props.className,
        props.onChange,
        props.open,
        props.options,
        props.prefix,
        props.suffix,
        props.value,
        props.placeholder
    ]);

    useImperativeHandle(ref, () => ({
            mainElement: internalRef.current,
            formValueBoxElement: formValueBox.current,
            optionBoxElement: optionBoxRef.current,

            prefixRef: prefixRef.current,
            suffixRef: suffixRef.current,
            valueRef: valueRef.current,
            placeholderRef: placeholderRef.current,

            close: () => setIsOpen(false),
            open: () => setIsOpen(true),

            value: valueRef.current?.value,        
            isOpen

    }), []);

    return <>
        <div ref={internalRef} className={`react-select ${internalClassname ?? ''} ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen((prev) => prev ? false : true)} tabIndex={0}>
            <div className="form-value-box">
                {prefixEl}
                {valueEl
                    ? valueEl
                    : placeholderEl
                }
                {suffixEl}
            </div>
            {isOpen
                ? (
                    <div className="form-options-box" ref={optionBoxRef}>
                        {optionsEls}
                    </div>
                )
                : null
            }

        </div>
    </>;
});

export default Select;