import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import PublicLayout from "@/Layouts/PublicLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    email: z
        .string({ required_error: "Please provide an email" })
        .email({ message: "Please provide an valid email" }),
    password: z
        .string({ required_error: "Please provide your password" })
        .min(6, "Password must contain at least 6 characters."),
    remember: z.boolean().default(false),
});

export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    // Form instance
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "password",
            remember: false,
        },
    });

    // handle copy button
    const handleCopyButton = ({ email, password }) => {
        form.setValue("email", email);
        form.setValue("password", password);
    };

    // form submission handling function
    const onSubmit = (values) => {
        setIsLoading(true);
        router.post(
            route("login"),
            {
                ...values,
            },
            {
                onSuccess: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    return (
        <PublicLayout>
            <>
                <Head title="Login" />
                <div className="bg-white border p-8 rounded-xl shadow-xl w-[450px]">
                    <div className="text-center mb-4">
                        <h3>Welcome to the Simple Patient Management System</h3>
                        <p className="text-sm opacity-80 mt-1">
                            Please log in to continue managing patient
                            information and accessing system features.
                        </p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=" flex flex-col gap-4"
                        >
                            {/* Email field */}
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Email </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password field */}
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Password </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                className="w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* remember field */}
                            <FormField
                                name="remember"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex items-center space-x-2 5">
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(
                                                        checked
                                                    ) => {
                                                        field.onChange(checked);
                                                    }}
                                                />
                                                <Label>Remember me.</Label>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Login button */}
                            <Button className="w-full" disabled={isLoading}>
                                {isLoading ? "Processing..." : "Login"}
                            </Button>

                            <div className="text-sm opacity-70 flex gap-1">
                                Don't have an account?
                                <Link
                                    href="#"
                                    className="text-primary hover:underline"
                                >
                                    Register Here
                                </Link>
                            </div>
                        </form>
                    </Form>

                    <Separator className="my-2.5" />
                    <div className="mt-3">
                        <h6 className="mb-1">Login as</h6>

                        <ul>
                            <li className="flex items-center justify-between gap-4 test-sm">
                                <span>Administrator</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        handleCopyButton({
                                            email: "administrator@example.com",
                                            password: "password",
                                        })
                                    }
                                >
                                    <IconCopy size={15} />
                                </Button>
                            </li>

                            <li className="flex items-center justify-between gap-4 test-sm">
                                <span>Doctor</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        handleCopyButton({
                                            email: "doctor@example.com",
                                            password: "password",
                                        })
                                    }
                                >
                                    <IconCopy size={15} />
                                </Button>
                            </li>

                            <li className="flex items-center justify-between gap-4 test-sm">
                                <span>Receptionist</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        handleCopyButton({
                                            email: "receptionist@example.com",
                                            password: "password",
                                        })
                                    }
                                >
                                    <IconCopy size={15} />
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        </PublicLayout>
    );
}
