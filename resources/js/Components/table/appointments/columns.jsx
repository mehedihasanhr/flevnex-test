import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import _ from "lodash";

// Create a column helper
const columnHelper = createColumnHelper();

export const AppointmentTableColumn = [
    columnHelper.accessor("id", {
        id: "id",
        header: "Id",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.id}</span>;
        },
    }),
    columnHelper.accessor("serial_number", {
        id: "serial_number",
        header: "Serial",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return (
                <Link
                    href={route("appointment.view", {
                        appointment_id: data.id,
                    })}
                    className="font-medium text-sm whitespace-nowrap hover:text-primary hover:underline"
                >
                    {data.serial_number}
                </Link>
            );
        },
    }),

    columnHelper.accessor("appointment_date", {
        id: "appointment_date",
        header: "Appt. Date",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return (
                <span>
                    {dayjs(data?.appointment_date).format("MMM DD, YYYY")}
                </span>
            );
        },
    }),

    columnHelper.accessor("patient.name", {
        id: "patient_name",
        header: "P. Name",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data?.patient?.name}</span>;
        },
    }),

    columnHelper.accessor("patient.age", {
        id: "patient_age",
        header: "P. Age",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data?.patient?.age}</span>;
        },
    }),

    columnHelper.accessor("patient.phone", {
        id: "patient_phone",
        header: "P. Phone",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data?.patient?.phone}</span>;
        },
    }),

    columnHelper.accessor("patient.gender", {
        id: "patient_gender",
        header: "P. Gender",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{_.startCase(data?.patient?.gender)}</span>;
        },
    }),

    columnHelper.accessor("patient.address", {
        id: "patient_address",
        header: "P. Address",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            if (!data?.patient?.address) return <span>--</span>;
            return (
                <span className="line-clamp-1">
                    {_.startCase(data?.patient?.address)}
                </span>
            );
        },
    }),

    columnHelper.accessor("doctor.name", {
        id: "doctor_name",
        header: "Dr. Name",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data?.doctor?.name}</span>;
        },
    }),

    columnHelper.accessor("doctor.specialization", {
        id: "doctor_specialization",
        header: "Dr. Specialization",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data?.doctor?.specialization}</span>;
        },
    }),

    columnHelper.accessor("status", {
        id: "status",
        header: "Status",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            "scheduled", "completed", "canceled";

            return (
                <span
                    className={cn(
                        "px-2.5 py-1 text-sm rounded-md",
                        data.status === "scheduled" &&
                            "bg-[#fff3cc] text-[#b38900]",
                        data.status === "completed" &&
                            "bg-[#cdf1d5] text-[#039422]",
                        data.status === "canceled" &&
                            "bg-[#fcd7cd] text-[#c02a02]"
                    )}
                >
                    {_.startCase(data.status)}
                </span>
            );
        },
    }),
];
