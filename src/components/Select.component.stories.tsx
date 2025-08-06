import React, { RefObject, useEffect, useRef } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import Select, { SelectObjectRef, SelectProps } from "./Select.component";
import Option, { OptionObjectRef } from './Option.component';
import { Prefix, Suffix } from './Addon.component';
import { Value } from './Value.component';

const meta: Meta<typeof Select> = {
    title: 'react-custom-select',
    component: Select,
    args: {
        className: ''
    }
}

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
    args: {
        className: 'test-class',
        placeholder: "Placeholder...",        
        onChange: (value, label) => {  action('onChange')(value, label) } 
    },
    render: (args) => {

        const internalRef: RefObject<SelectObjectRef|null> = useRef(null);

        return <Select {...args} ref={internalRef}>
            <Prefix>Prefix</Prefix>
            <Suffix>Suffix</Suffix>            
     
            <Option value='1'>Test 1</Option>
            <Option value='2'>Test 2</Option>
            <Option value='3'>Test 3</Option>
            <Option value='4'>Test 4</Option>
            <Option value='5'>Test 5</Option>
            <Option value='6'>Test 6</Option>
            <Option value='7'>Test 7</Option>
            <Option value='8'>Test 8</Option>
        </Select>
    }
    
}

export const WithoutPrefixSuffix: Story = {
    args: {
        placeholder: "Select without prefix or suffix",
        onChange: (value, label) => { action('onChange')(value, label) }
    },
    render: (args) => (
        <Select {...args}>
            <Option value="a">Option A</Option>
            <Option value="b">Option B</Option>
            <Option value="c">Option C</Option>
        </Select>
    )
}

export const FewOptions: Story = {
    args: {
        placeholder: "Few options",
        onChange: (value, label) => { action('onChange')(value, label) }
    },
    render: (args) => (
        <Select {...args}>
            <Option value="1">One</Option>
            <Option value="2">Two</Option>
        </Select>
    )
}

export const ManyOptions: Story = {
    args: {
        placeholder: "Many options",
        onChange: (value, label) => { action('onChange')(value, label) }
    },
    render: (args) => (
        <Select {...args}>
            {Array.from({ length: 20 }, (_, i) => (
                <Option key={i} value={`${i + 1}`}>Option {i + 1}</Option>
            ))}
        </Select>
    )
}

export const WithValue: Story = {
    args: {
        value: "3",
        placeholder: "Select with value",
        onChange: (value, label) => { action('onChange')(value, label) }
    },
    render: (args) => (
        <Select {...args}>
            <Option value="1">One</Option>
            <Option value="2">Two</Option>
            <Option value="3">Three</Option>
        </Select>
    )
}

export const WithoutRef: Story = {
    args: {
        placeholder: "Select without ref",
        onChange: (value, label) => { action('onChange')(value, label) }
    },
    render: (args) => (
        <Select {...args}>
            <Option value="x">X</Option>
            <Option value="y">Y</Option>
            <Option value="z">Z</Option>
        </Select>
    )
}

export const WithRef: Story = {
    args: {
        placeholder: "Select with ref",
        onChange: (value, label) => { action('onChange')(value, label) }
    },
    render: (args) => {
        const selectRef = React.useRef<SelectObjectRef>(null);
        React.useEffect(() => {
            if (selectRef.current) {
                setTimeout(() => {
                    selectRef.current?.open();
                }, 1000);
            }
        }, []);
        return (
            <Select {...args} ref={selectRef}>
                <Option value="alpha">Alpha</Option>
                <Option value="beta">Beta</Option>
                <Option value="gamma">Gamma</Option>
            </Select>
        );
    }
}

export const ValueAsProp: Story = {
    args: {
        value: "2",
        placeholder: "Value passed as prop",
        onChange: (value, label) => { action('onChange')(value, label) }
    },
    render: (args) => (
        <Select {...args}>
            <Option value="1">Option One</Option>
            <Option value="2">Option Two</Option>
            <Option value="3">Option Three</Option>
        </Select>
    )
}

export const ValueAsChildren: Story = {
    args: {
        placeholder: "Value passed as children",
        onChange: (value, label) => { action('onChange')(value, label) }
    },
    render: (args) => (
        
        
        <Select {...args}>
            <Value>Value Test</Value>
            <Option>Option A</Option>
            <Option>Option B</Option>
            <Option>Option C</Option>
        </Select>
    )
}

export const OptionOnClickCallback: Story = {
    args: {
        placeholder: "Option with onClick callback",
        onChange: (value, label) => { action('onChange')(value, label) }
    },
    render: (args) => (
        <Select {...args}>
            <Option value="x" onClick={() => action('Option X clicked')()}>X</Option>
            <Option value="y" onClick={() => action('Option Y clicked')()}>Y</Option>
            <Option value="z" onClick={() => action('Option Z clicked')()}>Z</Option>
        </Select>
    )
}
