
# react-custom-select

Live preview with Storybook is available at:  
https://cristianm-developer.github.io/react-custom-select/

A customizable **React Select component** with support for prefix and suffix elements and options as children. Designed for easy integration, fully typed with TypeScript, and styled with built-in CSS.

---

## Features

Most native HTML `<select>` elements are very limited in customization options, especially when it comes to adding icons, prefixes, suffixes, or fully custom option rendering.  
This component solves that by allowing complete control over the select’s UI structure and style while maintaining accessibility and React best practices.

- Full control of dropdown options as React components  
- Support for custom prefix and suffix elements inside the select box  
- Controlled and uncontrolled usage with `value` and `onChange`  
- Built-in keyboard handling and click outside to close  
- Styled with bundled CSS, easy to override  
- TypeScript support for strong typings
- The `value` prop is customizable as a React node, allowing you to render complex custom content inside the select box.
- Refs are available for each component (`Select`, `Option`, `Prefix`, `Suffix`), enabling direct DOM access or imperative actions.
- A built-in `<NoOptions>` component is provided to display a customizable message or UI when there are no options available to select.

---

## Installation

```bash
npm install react-custom-select
```

Or with Yarn:

```bash
yarn add react-custom-select
```

---

## Usage Example

```tsx
import React, { useState } from 'react';
import Select, { Prefix, Suffix } from 'react-custom-select';
import Option from 'react-custom-select/Option';

function Example() {
  const [value, setValue] = useState<{ label: string; value: string } | undefined>();

  return (
    <Select
      value={value}
      placeholder="Select an option..."
      onChange={(value, label) => setValue({ value: value ?? '', label: label ?? '' })}
      className="my-select"
      prefix="🔍"
      suffix="▼"
    >
      <Option value="1" label="Option 1">Option 1</Option>
      <Option value="2" label="Option 2">Option 2</Option>
      <Option value="3" label="Option 3">Option 3</Option>
    </Select>
  );
}
```

---

## Props

| Prop         | Type                                        | Description                                                      |
|--------------|---------------------------------------------|------------------------------------------------------------------|
| `value`      | `{ label: string; value: string }`          | Controlled selected value (object with label and value)          |
| `children`   | `React.ReactNode`                           | Options and addon components (`<Option>`, `<Prefix>`, `<Suffix>`) as children |
| `prefix`     | `string`                                   | Optional prefix content (icon, text) shown before the selected value |
| `suffix`     | `string`                                   | Optional suffix content (icon, text) shown after the selected value |
| `className`  | `string`                                   | Custom CSS class to style the select container                   |
| `onChange`   | `(value?: string, label?: string) => void` | Callback fired when the selection changes, passing value and label |
| `placeholder`| `string`                                   | Placeholder text displayed when no value is selected             |
| `open`       | `boolean`                                  | Optional initial open state of the dropdown                      |

---

## Child Components

### `<Option>`

- Props:  
  - `value: string` — unique value for the option  
  - `label: string` — label displayed and passed on selection  
- Usage: Must be a child of `<Select>`.  

### `<Prefix>` and `<Suffix>`

- Optional components used to show elements before or after the selected value inside the select box.  
- Can be used as children or via the `prefix` and `suffix` string props for simple text/icons.  

---

## Styling

The component comes with default CSS styles included. No need to import CSS manually — styles are bundled with the component.  
Customize the look via the `className` prop and your own CSS overrides.

---

## Storybook Example

To explore and interact with the component via Storybook:

```bash
npm run storybook
```

You can see a live demo with `Prefix`, `Suffix`, and multiple `Option`s and try changing props and events.

---

## Development & Contribution

- Built with TypeScript and React  
- Contributions welcome! Please open issues or PRs for improvements or bug fixes.  
- Follow existing code style and write tests when adding features.

---

## License

MIT©lionbytesolutions - Cristian Marin

---

If you have questions or want to extend the component, feel free to reach out!
