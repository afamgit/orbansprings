'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { createTodo, deleteAllTodos } from '../utils/actions'
 
const initialState = {
  message: null,
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  )
}
 
 
function DeleteButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}

 
export function DeleteAllButton() {
  const { pending } = useFormStatus()
 
  return (
    <button onClick={() => deleteAllTodos} aria-disabled={pending}>
      Delete
    </button>
  )
}

export function AddForm() {
  const [state, formAction] = useFormState(createTodo, initialState)
 
  return (
    <form action={formAction}>
      <label htmlFor="fullname">Full name</label>
      <input type="text" id="fullname" name="fullname" required />
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" required />
      <label htmlFor="phone">Phone</label>
      <input type="text" id="phone" name="phone" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}

export function DeleteButtonForm(id) {
  const [state, formAction] = useFormState(createTodo, initialState)
 
  return (
    <form action={formAction}>
      <input value={id} type='hidden' id="todo" name="todo" required />
      <DeleteButton />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  )
}