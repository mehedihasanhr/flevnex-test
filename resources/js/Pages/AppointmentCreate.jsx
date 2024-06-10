import { DoctorSelection } from "@/Components/DoctorSelction";
import { SingleDateSelection } from "@/Components/SingleDateSelection";
import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import PrivateLayout from "@/Layouts/PrivateLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Head, Link, router } from "@inertiajs/react";
import { IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(1, { message: "Patient's name is required" }),
    phone: z.string().min(1, { message: "Patient's phone number is required" }),
    age: z.string().min(1, { message: "Patient's age is required" }),
    gender: z.string().min(1, { message: "Patient's gender is required" }),
    address: z.string().optional(),
    doctor_id: z.string().min(1, { message: "Select a doctor" }),
    appointment_date: z
        .date()
        .refine((value) => value instanceof Date && !isNaN(value.getTime()), {
            message: "Select an appointment date",
        }),
    notes: z.string().optional(),
});

export default function AppointmentCreate(props) {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            // patient information
            name: "",
            phone: "",
            age: "",
            gender: "",
            address: "",

            //doctor information
            doctor_id: "",

            // scheduled information
            appointment_date: null,
            notes: "",
        },
    });

    const onSubmit = (values) => {
        setIsLoading(true);
        router.post(route("appointment.create"), values, {
            onSuccess: () => {
                toast.success("Data insert successfully");
                form.reset();
                setIsLoading(false);
            },

            onError: (error) => {
                console.log({ error });
                setIsLoading(false);
            },
        });
    };

    return (
        <PrivateLayout
            user={props.auth.user}
            header="Patient Management System"
        >
            <Head title="Appointments" />

            <div className="py-8">
                <div className="bg-background rounded-lg mt-3">
                    <div className="flex items-center justify-between gap-4 mb-8 w-full">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                asChild
                            >
                                <Link href={route("appointments")}>
                                    <IconArrowLeft size={17} />
                                </Link>
                            </Button>
                            <span className="text-2xl font-bold">
                                New Appointment
                            </span>
                        </div>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid grid-cols-12 gap-4"
                        >
                            <div className="col-span-12 font-medium opacity-80">
                                Patient General Information
                            </div>
                            {/* Name */}
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 sm:col-span-6 lg:col-span-4">
                                        <FormLabel>
                                            Name
                                            <sup className="text-red-500">
                                                *
                                            </sup>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Age */}
                            <FormField
                                name="age"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 sm:col-span-6 lg:col-span-4">
                                        <FormLabel>
                                            Age{" "}
                                            <sup className="text-red-500">
                                                *
                                            </sup>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone */}
                            <FormField
                                name="phone"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 sm:col-span-6 lg:col-span-4">
                                        <FormLabel>
                                            Phone{" "}
                                            <sup className="text-red-500">
                                                *
                                            </sup>
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Gender */}
                            <FormField
                                name="gender"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 sm:col-span-6 lg:col-span-4">
                                        <FormLabel>
                                            Gender
                                            <sup className="text-red-500">
                                                *
                                            </sup>
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                defaultValue={field.value}
                                                onValueChange={(currentValue) =>
                                                    form.setValue(
                                                        "gender",
                                                        currentValue
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="male">
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem value="female">
                                                        Female
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Address */}
                            <FormField
                                name="address"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 sm:col-span-6 lg:col-span-4">
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="col-span-12 font-medium opacity-80">
                                Appointment Information
                            </div>

                            {/* Doctor */}
                            <FormField
                                name="doctor_id"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 sm:col-span-6 lg:col-span-4">
                                        <FormLabel>
                                            Doctor
                                            <sup className="text-red-500">
                                                *
                                            </sup>
                                        </FormLabel>
                                        <FormControl>
                                            <DoctorSelection
                                                doctors={props?.doctors}
                                                value={field.value}
                                                onSelect={(doctor) => {
                                                    form.setValue(
                                                        "doctor_id",
                                                        `${doctor.id}`
                                                    );
                                                }}
                                                togglerClassName="h-10 w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Doctor */}
                            <FormField
                                name="appointment_date"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 sm:col-span-6 lg:col-span-4">
                                        <FormLabel>
                                            Appointment Date
                                            <sup className="text-red-500">
                                                *
                                            </sup>
                                        </FormLabel>
                                        <FormControl>
                                            <SingleDateSelection
                                                date={field.value}
                                                setDate={(date) => {
                                                    form.setValue(
                                                        "appointment_date",
                                                        date
                                                    );
                                                }}
                                                disabled={(date) => {
                                                    const today = dayjs();
                                                    return dayjs(date).isBefore(
                                                        today,
                                                        "day"
                                                    );
                                                }}
                                                className="w-full h-10 border-solid"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* notes */}
                            <FormField
                                name="notes"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12">
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea rows={10} {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <div className="col-span-12">
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className="mt-5"
                                >
                                    {isLoading ? "Processing..." : "Save"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </PrivateLayout>
    );
}
