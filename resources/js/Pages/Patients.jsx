import { PatientTable } from "@/Components/table/patients/PatientTable";
import PrivateLayout from "@/Layouts/PrivateLayout";
import { Head } from "@inertiajs/react";

export default function Patients(props) {
    return (
        <PrivateLayout
            user={props.auth.user}
            header="Patient Management System"
        >
            <Head title="Appointments" />

            <div className="py-12">
                <PatientTable {...props} />
            </div>
        </PrivateLayout>
    );
}
