
import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


interface formData {
    email: string
    password: string
};

const defaultValues = {
    email: "",
    password: "",
};

const formSchema = z
    .object({
        email: z.string().email({ message: "Please enter a valid email" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" }),
    });


const Login = (): JSX.Element => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = (data: formData) => {
        console.log("Called onSubmit", data);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13) {
            handleSubmit(onSubmit)
        }
    };

    return (
        <main
        >
            <section className='bg-cover bg-center'>
                <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                    <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                            <h1 className='text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl'>
                                Create an account
                            </h1>

                            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>


                                <FormControl isInvalid={errors.email?.message as undefined} isRequired>
                                    <FormLabel className='block mb-2 text-sm font-medium text-green-900'>Email</FormLabel>
                                    <Input {...register("email")} placeholder='johndoe@example.com' className='bg-green-100 border border-green-300 text-green-900 sm:text-sm rounde-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' />
                                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                                </FormControl>


                                <FormControl isInvalid={errors.password?.message as boolean | undefined} isRequired>
                                    <FormLabel className='block mb-2 text-sm font-medium text-green-900'>Password</FormLabel>
                                    <Input {...register("password")} type='password' placeholder='**********'
                                        className='bg-green-100 border border-green-300 text-green-900 sm:text-sm rounde-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5' />
                                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                                </FormControl>

                                <Button
                                    className='w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                                    mt={4}
                                    colorScheme='teal'
                                    isLoading={isSubmitting}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                                <Text fontSize='md' className='text-sm font-light text-green-500'>
                                    Not have an account? <Link href='/auth/signup' className='font-medium text-primary-600 hover:underline'>Sign-Up</Link>
                                </Text>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;
