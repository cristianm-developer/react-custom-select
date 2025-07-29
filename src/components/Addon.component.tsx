import { JSX, memo, ReactNode } from "react";

export interface BaseProps {
    children?: ReactNode,
    className?: string
}

const AddonComponent = memo((
    {
        children = null,
        className
    }: {
        children?: ReactNode,
        className: string
    }
): JSX.Element => {
    return <div className={className}>{children}</div>
});

export const Prefix = (props: BaseProps): JSX.Element => {
    return <AddonComponent className={`form-prefix ${props.className ?? ''}`}>{props.children}</AddonComponent>
}

export const Suffix = (props: BaseProps): JSX.Element => {
    return <AddonComponent className={`form-suffix ${props.className ?? ''}`}>{props.children}</AddonComponent>
}

