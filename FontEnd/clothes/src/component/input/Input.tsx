import { FieldApi, FieldComponent, FieldValidateAsyncFn } from '@tanstack/react-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <div className='text-[#c92127] capitalize px-2 text-sm'>{field.state.meta.errors.join(', ')}</div>
      ) : null}
      {field.state.meta.isValidating ? '...' : null}
    </>
  )
}

type InputFile = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Filed: FieldComponent<any, undefined>
  name: string
  className?: string
  error?: string
  placeholder?: string
  type?: string
  classParent?: string
  errorPassword?: string
  value?: string
  disable?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeAsyn?: FieldValidateAsyncFn<any, string, undefined, undefined, any> | undefined
}
const Input = (props: InputFile) => {
  const HandleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.target.addEventListener
  }
  return (
    <props.Filed
      name={props.name}
      validators={{
        onChange: ({ value }) => (!value ? props.error : undefined),
        onChangeAsync: props.onChangeAsyn,
        onChangeAsyncDebounceMs: 1000
      }}
      children={(filed) => (
        <div className={props.classParent}>
          <input
            type={props.type}
            className={props.className}
            onClick={HandleClick}
            name={filed.name}
            defaultValue={props.value}
            value={filed.state.value}
            onChange={(e) => filed.handleChange(e.target.value)}
            placeholder={props.placeholder}
            autoComplete='on'
            disabled={props.disable || false}
          />
          <FieldInfo field={filed} />
        </div>
      )}
    />
  )
}

export default Input
