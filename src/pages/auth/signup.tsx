import { Formik } from 'formik';
import React from 'react';

const Signup = () => {
  return (
    <div>
      SignUp
      {/* <Formik
        initialValues={{ name: 'Sasuke' }}
        onSubmit={(values, actions) => {
       setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {(props) => (
        <Form>
          <Field name='name' validate={validateName}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel>First name</FormLabel>
                <Input {...field} placeholder='name' />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme='teal'
            isLoading={props.isSubmitting}
            type='submit'
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik> */}
    </div>
  );
};

export default Signup;