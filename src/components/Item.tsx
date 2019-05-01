import React from 'react';

type IProps = JSX.IntrinsicElements['input'] & {
  children: React.ReactNode;
}

const Item: React.FC<IProps> = ({
  id,
  checked,
  onChange,
  children,
}) => (
  <label htmlFor={id}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
    { children }
  </label>
)

export default Item; 