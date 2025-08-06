import { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import Select, { SelectObjectRef } from "./Select.component";
import Option from './Option.component';
import { Prefix, Suffix } from './Addon.component';
import { useEffect, useRef } from 'react';
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
        const selectRef = useRef<SelectObjectRef>(null);

        useEffect(() => {
            if(selectRef.current){
                setTimeout(() => {
                    selectRef.current?.open();
                }, 1000);
            }
        }, [])

        return <Select {...args} ref={selectRef}>
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
