import { SearchBox } from "@/Components/Searchbox";
import { SingleDateSelection } from "@/Components/SingleDateSelection";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import _ from "lodash";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function AppointmentFilter(props) {
    const [date, setDate] = useState(() =>
        props?.date ? new Date(props?.date) : null
    );
    const [isPatientsPopoverOpen, setIsPatientsPopoverOpen] = useState(false);
    const [selectedPatients, setSelectedPatients] = useState(props?.patient);
    const [status, setStatus] = useState(props?.status);
    const [isStatusPopoverOpen, setIsStatusPopoverOpen] = useState(false);
    const [isDoctorPopoverOpen, setIsDoctorPopoverOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(props?.doctor);
    console.log({ props });
    // handle date filter
    const handleDateFilter = (date) => {
        setDate(date);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("appointment_date", dayjs(date).format("MM-DD-YYYY"));
        const paramsObject = Object.fromEntries(searchParams.entries());
        // Update the query string using Inertia
        const newUrl = route("appointments", paramsObject);
        // Perform Inertia visit
        router.get(newUrl);
    };

    // handle patients filter
    const handlePatientsFilter = (patients) => {
        setSelectedPatients(patients.id);
        setIsPatientsPopoverOpen(false);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("patient", patients.id);
        searchParams.set("page", 1);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("appointments", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    // handle patients filter
    const handleDoctorFilter = (doctor) => {
        setSelectedDoctor(doctor.id);
        setIsDoctorPopoverOpen(false);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("doctor", doctor.id);
        searchParams.set("page", 1);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("appointments", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    // handle status filter
    const handleStatusFilter = (status) => {
        setStatus(status);

        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("status", status);
        searchParams.set("page", 1);

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("appointments", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    // clear all filter
    const clearFilter = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete("status");
        searchParams.delete("patient");
        searchParams.delete("doctor");
        searchParams.delete("appointment_date");
        searchParams.delete("search");

        const paramsObject = Object.fromEntries(searchParams.entries());

        // Update the query string using Inertia
        const newUrl = route("appointments", paramsObject);

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
        const newUrl = route("appointments", paramsObject);

        // Perform Inertia visit
        router.get(newUrl);
    };

    const patient = props?.patients?.find(
        (c) => c.id === Number(selectedPatients)
    );

    return (
        <div className="flex items-center flex-wrap gap-4 mb-3">
            <SearchBox
                defaultValue={props?.search}
                handleSearch={handleSearch}
                placeholder="Search by serial number..."
            />

            {/* filter by Order date */}
            <SingleDateSelection date={date} setDate={handleDateFilter} />

            {/* Patients */}
            <Popover
                open={isPatientsPopoverOpen}
                onOpenChange={setIsPatientsPopoverOpen}
            >
                <PopoverTrigger className="flex items-center justify-between text-sm w-44 h-9 border text-left px-3 border-dashed hover:border-primary/50 rounded-lg">
                    <span className="line-clamp-1">
                        {patient ? (
                            `${patient.name} (${patient.id})`
                        ) : (
                            <span className="text-muted-foreground">
                                Filter by patients
                            </span>
                        )}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-30" />
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput />
                        <CommandList>
                            <CommandGroup>
                                {props?.patients?.map((patient) => (
                                    <CommandItem
                                        key={patient.id}
                                        className="flex items-center justify-between"
                                        value={`${patient.name} (${patient.id})`}
                                        onSelect={() =>
                                            handlePatientsFilter(patient)
                                        }
                                    >
                                        <span className="text-sm line-clamp-1">
                                            {`${patient.name} (${patient.id})`}
                                        </span>
                                        <CheckIcon
                                            className={cn(
                                                "w-4 h-4 text-sm text-muted-foreground invisible",
                                                Number(selectedPatients) ===
                                                    patient.id && "visible"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Doctors */}
            {props?.auth?.user?.role !== "doctor" ? (
                <Popover
                    open={isDoctorPopoverOpen}
                    onOpenChange={setIsDoctorPopoverOpen}
                >
                    <PopoverTrigger className="flex items-center justify-between text-sm w-44 h-9 border text-left px-3 border-dashed hover:border-primary/50 rounded-lg">
                        <span className="line-clamp-1">
                            {props?.doctors?.find(
                                (c) => c.id === Number(selectedDoctor)
                            )?.name ?? (
                                <span className="text-muted-foreground">
                                    Filter by doctor
                                </span>
                            )}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-30" />
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Command>
                            <CommandInput />
                            <CommandList>
                                <CommandGroup>
                                    {props?.doctors?.map((doctor) => (
                                        <CommandItem
                                            key={doctor.id}
                                            className="flex items-center justify-between"
                                            value={doctor.name}
                                            onSelect={() =>
                                                handleDoctorFilter(doctor)
                                            }
                                        >
                                            <span className="text-sm line-clamp-1">
                                                {doctor.name}
                                            </span>
                                            <CheckIcon
                                                className={cn(
                                                    "w-4 h-4 text-sm text-muted-foreground invisible",
                                                    Number(selectedDoctor) ===
                                                        doctor.id && "visible"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            ) : null}

            {/* status */}
            <Popover
                open={isStatusPopoverOpen}
                onOpenChange={setIsStatusPopoverOpen}
            >
                <PopoverTrigger className="flex items-center justify-between text-sm w-44 h-9 border text-left px-3 border-dashed hover:border-primary/50 rounded-lg">
                    <span className="line-clamp-1">
                        {_.startCase(status) ?? (
                            <span className="text-muted-foreground">
                                Filter by status
                            </span>
                        )}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-30" />
                </PopoverTrigger>
                <PopoverContent className="p-0 w-fit">
                    <Command>
                        <CommandInput />
                        <CommandList>
                            <CommandGroup>
                                {[
                                    "all",
                                    "scheduled",
                                    "completed",
                                    "canceled",
                                ]?.map((s) => (
                                    <CommandItem
                                        key={s}
                                        className="flex items-center justify-between"
                                        value={s}
                                        onSelect={() => handleStatusFilter(s)}
                                    >
                                        <span className="text-sm line-clamp-1">
                                            {_.startCase(s)}
                                        </span>
                                        <CheckIcon
                                            className={cn(
                                                "w-4 h-4 text-sm text-muted-foreground invisible",
                                                s === status && "visible"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {props?.search ||
            props?.order_date ||
            props?.status ||
            props?.patients ? (
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
