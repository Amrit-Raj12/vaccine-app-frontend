import { Button, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import Link from 'next/link';
import React, { MouseEventHandler } from 'react';

// Define the type of the props for the Login component
type LoginProps = {
    // No props for this component
}

// Define the type of the values for the Formik component
type FormikValues = {
    email: string;
    password: string;
}

// Define the type of the props for the Button component
type ButtonProps = {
    onClick: MouseEventHandler;
    text: string;
}

// interface
interface formType { field: FieldInputProps<string>, form: FormikProps<{ email: string, password: string }> }

const Login = (): JSX.Element => {

    // Add the type annotation for the value parameter
    function validateForm(value: string) {
        let error: string | undefined
        if (!value) {
            error = 'Name is required'
        } else if (value.toLowerCase() !== 'naruto') {
            error = "Jeez! You're not a fan 😱"
        }
        return error
    }

    return (
        <main
        >
            <section className='bg-cover bg-center'>
                <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-white'>
                        The Name
                    </a>
                    <div className='w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl'>
                                Login Here
                            </h1>
                            <Formik
                                // Specify the type of the initial values
                                className='space-y-4 md:space-y-6'
                                initialValues={{ email: '' } as FormikValues}
                                onSubmit={(values, actions) => {
                                    setTimeout(() => {
                                        alert(JSON.stringify(values, null, 2))
                                        actions.setSubmitting(false)
                                    }, 1000)
                                }}
                            >
                                {(props) => (
                                    <Form className='space-y-4 md:space-y-6'>
                                        <Field name='email' validate={validateForm}>
                                            {({ field, form }: formType) => (
                                                <FormControl isInvalid={form.errors.email && form.touched.email as boolean || undefined} >
                                                    <FormLabel className='block mb-2 text-sm font-medium text-green-900'>Email</FormLabel>
                                                    <Input {...field} type='email' placeholder='johndoe@example.com' className='bg-green-50 border border-green-300 text-green-900 sm:text-sm rounde-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' />
                                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name='password' validate={validateForm}>
                                            {({ field, form }: formType) => (
                                                <FormControl isInvalid={form.errors.password && form.touched.password as boolean || undefined} >
                                                    <FormLabel className='block mb-2 text-sm font-medium text-green-900'>Password</FormLabel>
                                                    <Input {...field} type='password' placeholder='**********' className=' border border-green-300 text-green-900 sm:text-sm rounde-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' />
                                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Button
                                            className='w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                                            mt={4}
                                            colorScheme='teal'
                                            isLoading={props.isSubmitting}
                                            type='submit'
                                        >
                                            Submit
                                        </Button>
                                        <Text fontSize='md' className='text-sm font-light text-green-500'>
                                            Not have an account? <Link href='/auth/signup' className='font-medium text-primary-600 hover:underline'>Sign-Up</Link>
                                        </Text>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
};

export default Login;
