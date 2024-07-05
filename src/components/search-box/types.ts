export type Props = {
  className?: string,
  value:string,
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}