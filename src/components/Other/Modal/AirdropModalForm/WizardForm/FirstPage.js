import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { EventInput, SubmitButton } from '../../EventModal/EventInput'
import validate from '../validate'
import renderField from './renderField'

const WizardFormFirstPage = props => {
  const { error, handleSubmit, submitting } =
    props;
  return (
    <form onSubmit={handleSubmit} className="rounded-lg px-6 overflow-y-scroll max-h-[80vh] min-h-[60vh] pb-4 lg:px-8 sm:pb-6 xl:pb-8">
      <Field
        name="name"
        type="text"
        component={EventInput}
        label="Name"
        required={true}
      />
      <Field
        name="link"
        type="text"
        component={EventInput}
        label="Link"
        required={true}
      />
      <Field
        name="information.reward"
        type="text"
        component={EventInput}
        label="Reward"
      />
      <Field
        name="information.max_participant"
        type="number"
        component={EventInput}
        label="Max participants"
      />
      <SubmitButton
        label="Next"
        disabled={submitting}
      />
    </form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)
