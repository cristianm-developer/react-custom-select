import React, { ReactNode, MouseEvent } from "react";

const Option = (props: {
    children: ReactNode;
    value: string;
    label: string;
    selected?: boolean;
    onSelect?: ({value, label}:{value:string, label: string}) => void;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {
    
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        props.onSelect?.({value: props.value, label: props.label});
        props.onClick?.(event);
    }

    return (
        <div className={`form-option ${props.selected ? 'selected' : ''}`} onClick={handleClick}>
            {props.children}
        </div>
    );
};

export default Option;