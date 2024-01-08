import { JSX } from 'preact'

export function DialogItem ({ title, description, labelFor, children }): JSX.Element {
  return (
    <div class='flex flex-row gap-2'>
      <div class='grow'>
        <h3 className='text-lg font-bold leading-6 text-gray-900 dark:text-gray-100'>
          <label for={labelFor}>{title}</label>
        </h3>
        <p class='text-gray-700 dark:text-gray-300'>
          {description}
        </p>
        {children}
      </div>
    </div>
  )
}
