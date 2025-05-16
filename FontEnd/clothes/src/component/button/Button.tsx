import { FormState, NoInfer } from '@tanstack/react-form'

type ButtonType = {
  Subscribe: <TSelected = FormState<unknown>>(props: {
    selector?: ((state: FormState<unknown>) => TSelected) | undefined
    children: React.ReactNode | ((state: NoInfer<TSelected>) => React.ReactNode)
  }) => React.ReactNode
  className?: string
  name?: string
  disable ?: boolean
}
const Button = (props: ButtonType) => {
  return (
    <props.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => (
        <>
          <button  className={props.className} type='submit' disabled={!canSubmit}>
            {isSubmitting ? props.name : props.name}
          </button>
        </>
      )}
    />
  )
}

export default Button
