import { AppointmentTable } from "@/Components/table/appointments/AppointmentTable";
import PrivateLayout from "@/Layouts/PrivateLayout";
import { Head } from "@inertiajs/react";

export default function Appointments(props) {
    return (
        <PrivateLayout
            user={props.auth.user}
            header="Patient Management System"
        >
            <Head title="Appointments" />

            <div className="py-12">
                <AppointmentTable {...props} />
            </div>
        </PrivateLayout>
    );
}
