import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { axiosClient } from "../../api/axios.js";
import { Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { STUDENT_DASHBOARD_ROUTE } from "../../router/index.jsx";
import { useUserContext } from "../../context/UserContext.jsx";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email().min(2).max(50),
    password: z.string().min(8).max(30),
});

export default function RegistrationForm() {
    const { setAuthenticated } = useUserContext();
    const Navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const { setError, formState: { isSubmitting } } = form;

    const onSubmit = async values => {
        try {
            const response = await axiosClient.post('/api/register', values);
            if (response.status === 200) {
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                setAuthenticated(true);
                Navigate(STUDENT_DASHBOARD_ROUTE);
            }
        } catch (error) {
            console.error(error);
            setError('email', {
                message: error.response.data.message,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isSubmitting} type="submit">
                    {isSubmitting && <Loader2 className={'mx-2 my-2 animate-spin'} />}
                    Submit
                </Button>
            </form>
        </Form>
    );
}
