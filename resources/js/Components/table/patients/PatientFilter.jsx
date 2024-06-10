import { SearchBox } from "@/Components/Searchbox";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import { Cross1Icon } from "@radix-ui/react-icons";

export function PatientFilter(props) {
    // clear all filter
    const clearFilter = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("status");
        searchParams.delete("patient");
        searchParams.delete("appointment_date");
        searchParams.delete("search");

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("patients", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    // Handle search
    const handleSearch = (value) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("search", value);
        searchParams.set("page", 1);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("patients", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    return (
        <div className="flex items-center flex-wrap gap-4 mb-3">
            <SearchBox
                defaultValue={props?.search}
                handleSearch={handleSearch}
                placeholder="Search by serial number..."
            />

            {props?.search ? (
                <Button
                    variant="secondary"
                    size="sm"
                    className="text-sm"
                    onClick={clearFilter}
                >
                    <Cross1Icon className="w-3 h-3 mr-1" />
                    <span>Clear</span>
                </Button>
            ) : null}
        </div>
    );
}
