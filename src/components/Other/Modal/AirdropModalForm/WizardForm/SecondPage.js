import React, { useRef, useState } from 'react'
import { CgClose, CgPlayListAdd, CgRemove } from 'react-icons/cg'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { EventInput, FieldDatePicker, SubmitButton } from '../../EventModal/EventInput'
import validate from '../validate'
import renderField from './renderField'

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between overflow-y-scroll rounded-lg px-6  min-h-[60vh] max-h-[80vh] pb-4 lg:px-8 sm:pb-6 xl:pb-8">
      <div className=''>
        <EditableLabelDateField label="Start" name="time.start" className="mb-4" />
        <EditableLabelDateField label="End" name="time.end" className="mb-4" />
        <div className='divider' />
        <FieldArray name='time' component={renderDateInput} />
      </div>
      <div className='flex gap-4'>
        <SubmitButton
          label="Previous" onClick={previousPage}
        />
        <SubmitButton
          label="Next"
        />
      </div>
    </form>
  )
}

const renderDateInput = ({ fields, meta: { touched, error } }) => (
  <ul>
    <li>
      <button type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
        onClick={() => fields.push({})}>
        <CgPlayListAdd className="inline w-4 h-4 mr-2" />Add event
      </button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((task, index) =>
      <li key={index} className="flex items-center justify-between  mb-4">
        <EditableLabelDateField label="Event name" editable={true} />
        <CgClose onClick={() => fields.remove(index)} className="inline w-4 h-4 text-red-400 hover:text-white hover:bg-red-500 p-2 border-2 border-red-500 rounded-md box-content" />
      </li>
    )}
  </ul>
)

const EditableLabelDateField = ({ label, name, editable, className }) => {
  const [labelEditable, setLabelEditable] = useState(label || 'Event')
  const value = useRef(labelEditable)
  const handleChange = (e) => {
    setLabelEditable(e.target.innerHTML)
  }

  return <div className={"flex items-center justify-between " + className}>
    <label className="flex-1 min-w-[80px] w-1/3 whitespace-nowrap "
      onInput={handleChange}
      contentEditable={editable}
      dangerouslySetInnerHTML={{ __html: value.current }}
    />
    <Field
      component={FieldDatePicker}
      name={labelEditable || name}
      placeholder="YYYY/MM/DD"
      className='flex-1 '
    />
  </div>
}

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(WizardFormSecondPage)
