import React from 'react'


type FormProps = React.PropsWithoutRef<JSX.IntrinsicElements['form']>
type Props = Pick<FormProps, Exclude<keyof FormProps, 'onChange'>> & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (e: React.FormEvent) => void,
  value: string,
}

const Form: React.FC<Props> = ({
  value,
  onChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="할일을 입력하세요"
    />
    <button type="submit">
      만들기
    </button>
  </form>
)

export default Form;
