const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.link) {
    errors.link = 'Required'
  }
  if (!values.start) {
    errors.start = 'Required'
  }
  // if (!values.end) {
  //   errors.end = 'Required'
  // }
  return errors
}

export default validate