import { DoctorTable } from "@/Components/table/doctors/DoctorTable";
import PrivateLayout from "@/Layouts/PrivateLayout";
import { Head } from "@inertiajs/react";

export default function Doctors(props) {
    console.log({ d: props.doctors });
    return (
        <PrivateLayout
            user={props.auth.user}
            header="Patient Management System"
        >
            <Head title="Appointments" />

            <div className="py-12">
                <DoctorTable {...props} />
            </div>
        </PrivateLayout>
    );
}
