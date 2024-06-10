import { createColumnHelper } from "@tanstack/react-table";

// Create a column helper
const columnHelper = createColumnHelper();

export const DoctorTableColumn = [
    columnHelper.accessor("id", {
        id: "id",
        header: "Id",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.id}</span>;
        },
    }),

    columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.user.name}</span>;
        },
    }),

    columnHelper.accessor("specialization", {
        id: "specialization",
        header: "Specialization",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.specialization}</span>;
        },
    }),

    columnHelper.accessor("phone", {
        id: "phone",
        header: "Phone",
        enableSorting: false,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.phone}</span>;
        },
    }),
];
