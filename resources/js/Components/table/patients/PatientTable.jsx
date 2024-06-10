import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { DataTable } from "../Datatable";
import { PatientFilter } from "./PatientFilter";
import { PatientTableColumn } from "./columns";

export function PatientTable(props) {
    const [data, setData] = useState(props?.patients);
    const [columns, setColumns] = useState([...PatientTableColumn]);
    const [columnVisibility, setColumnVisibility] = useState({ id: false });
    const [sorting, setSorting] = useState([
        { id: props?.sort, desc: props?.order === "desc" },
    ]);
    const [pagination, setPagination] = useState({
        pageIndex: Number(props?.page) - 1,
        pageSize: Number(props?.count),
    });

    return (
        <div className="bg-background rounded-lg mt-3">
            <div className="flex items-center justify-between gap-4 mb-8 w-full">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                    >
                        <Link href={route("dashboard")}>
                            <IconArrowLeft size={17} />
                        </Link>
                    </Button>
                    <span className="text-2xl font-bold">Patients</span>
                </div>
            </div>
            <PatientFilter {...props} />
            <div className="relative">
                <DataTable
                    data={data}
                    columns={columns}
                    pagination={pagination}
                    setPagination={setPagination}
                    sorting={sorting}
                    setSorting={setSorting}
                    columnVisibility={columnVisibility}
                    setColumnVisibility={setColumnVisibility}
                    route="patients"
                />
            </div>
        </div>
    );
}
