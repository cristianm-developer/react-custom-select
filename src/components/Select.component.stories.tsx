import { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import Select from "./Select.component";
import Option from './Option.component';
import { Prefix, Suffix } from './Addon.component';

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
    render: (args) => (
        <Select {...args} >
            <Prefix>Prefix</Prefix>
            <Suffix>Suffix</Suffix>
            <Option value='1' label='Test 1'>Test 1</Option>
            <Option value='2' label='Test 2'>Test 2</Option>
            <Option value='3' label='Test 3'>Test 3</Option>
            <Option value='4' label='Test 4'>Test 4</Option>
            <Option value='5' label='Test 5'>Test 5</Option>
            <Option value='6' label='Test 6'>Test 6</Option>
            <Option value='7' label='Test 7'>Test 7</Option>
            <Option value='8' label='Test 8'>Test 8</Option>
        </Select>
    )
}
