import { Button } from "@/Components/ui/button";
import PrivateLayout from "@/Layouts/PrivateLayout";
import { Head, Link } from "@inertiajs/react";
import { IconArrowLeft } from "@tabler/icons-react";
import dayjs from "dayjs";
import _ from "lodash";

export default function AppointmentView({ auth, appointment }) {
    console.log({ appointment });
    return (
        <PrivateLayout user={auth.user} header="Patient Management System">
            <Head title="Appointment" />
            <div className="py-8">
                <div className="bg-background rounded-lg mt-3 border p-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="mb-5">
                            <h3># {appointment?.serial_number}</h3>
                            <span>
                                {dayjs(appointment?.appointment_date).format(
                                    "MMM DD, YYYY"
                                )}
                            </span>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            asChild
                        >
                            <Link href={route("appointments")}>
                                <IconArrowLeft size={17} /> Back
                            </Link>
                        </Button>
                    </div>

                    <div className="mb-4">
                        <h5>{appointment?.patient?.name}</h5>
                        <span className="block text-muted-foreground">
                            Age:
                            <span className="font-medium text-black pl-1.5">
                                {_.startCase(appointment?.patient?.age)}
                            </span>
                        </span>
                        <span className="block text-muted-foreground">
                            Gender:
                            <span className="font-medium text-black pl-1.5">
                                {_.startCase(appointment?.patient?.gender)}
                            </span>
                        </span>

                        <span className="block text-muted-foreground">
                            Phone:
                            <span className="font-medium text-black pl-1.5">
                                {_.startCase(appointment?.patient?.phone)}
                            </span>
                        </span>
                    </div>

                    <div>
                        <h5>Doctor: {appointment?.doctor?.name}</h5>
                        <span className="text-primary">
                            {appointment?.doctor?.specialization}{" "}
                        </span>
                    </div>
                </div>
            </div>
        </PrivateLayout>
    );
}
