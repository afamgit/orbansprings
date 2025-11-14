'use client'
 
import { useFormState } from 'react-dom'
import { useFormStatus } from 'react-dom'
import { createTodo, deleteTodo } from '../utils/actions'
import { useActionState } from 'react'


const initialState = {
  message: '',
}
 
function DeleteButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}


export function DeleteTodo ({email}) {

  const [state, formAction] = useActionState(deleteTodo, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="email" value={email} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  );
};