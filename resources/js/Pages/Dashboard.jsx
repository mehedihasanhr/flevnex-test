import PrivateLayout from "@/Layouts/PrivateLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard(props) {
    return (
        <PrivateLayout
            user={props.auth.user}
            header="Patient Management System"
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="flex flex-wrap gap-4">
                    {props?.auth?.user?.role === "administrator" ? (
                        <Link
                            href={route("doctors")}
                            className="w-36 rounded-lg p-3 aspect-square border flex flex-col items-center hover:bg-primary/10"
                        >
                            <img src="/storage/doctor-icon.png" alt="" />
                            <h5>Doctors</h5>
                        </Link>
                    ) : null}
                    {props?.auth?.user?.role !== "receptionist" ? (
                        <Link
                            href={route("patients")}
                            className="w-36 rounded-lg p-3 aspect-square border flex flex-col items-center hover:bg-primary/10"
                        >
                            <img src="/storage/wheelchair.png" alt="" />
                            <h5>Patients</h5>
                        </Link>
                    ) : null}

                    <Link
                        href={route("appointments")}
                        className="w-36 rounded-lg p-3 aspect-square border flex flex-col items-center hover:bg-primary/10"
                    >
                        <img src="/storage/appointment.png" alt="" />
                        <h5>Appointments</h5>
                    </Link>
                </div>
            </div>
        </PrivateLayout>
    );
}
