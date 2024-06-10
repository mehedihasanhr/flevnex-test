import { createColumnHelper } from "@tanstack/react-table";
import _ from "lodash";

// Create a column helper
const columnHelper = createColumnHelper();

export const PatientTableColumn = [
    columnHelper.accessor("id", {
        id: "id",
        header: "Id",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.id}</span>;
        },
    }),

    columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.name}</span>;
        },
    }),

    columnHelper.accessor("age", {
        id: "age",
        header: "Age",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.age}</span>;
        },
    }),

    columnHelper.accessor("phone", {
        id: "phone",
        header: "Phone",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.phone}</span>;
        },
    }),

    columnHelper.accessor("gender", {
        id: "gender",
        header: "Gender",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return <span>{_.startCase(data.gender)}</span>;
        },
    }),

    columnHelper.accessor("address", {
        id: "address",
        header: "Address",
        enableSorting: true,
        cell: (info) => {
            const data = info.row.original;
            return <span>{data.address ?? "--"}</span>;
        },
    }),
];
