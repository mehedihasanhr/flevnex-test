import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function DoctorSelection({
    doctors,
    value,
    onSelect,
    togglerClassName,
}) {
    const [open, setOpen] = useState(false);

    const doctor = doctors?.find((c) => c.id === Number(value));

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
                className={cn(
                    "flex items-center justify-between text-sm h-9 border text-left px-3 hover:border-primary/50 rounded-lg",
                    togglerClassName
                )}
            >
                <span className="line-clamp-1">
                    {doctor ? (
                        <span className="text-sm line-clamp-1">
                            {doctor.name}-
                            <span className="text-primary">
                                {doctor.specialization}
                            </span>
                        </span>
                    ) : (
                        <span className="text-muted-foreground">
                            Select a doctor
                        </span>
                    )}
                </span>
                <ChevronDown className="h-4 w-4 opacity-30" />
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
                <Command>
                    <CommandInput />
                    <CommandList>
                        <CommandGroup>
                            {doctors?.map((doctor) => (
                                <CommandItem
                                    key={doctor.id}
                                    className="flex items-center justify-between"
                                    value={`${doctor.name}-${doctor.specialization}`}
                                    onSelect={() => {
                                        onSelect(doctor);
                                        setOpen(false);
                                    }}
                                >
                                    <span className="text-sm line-clamp-1">
                                        {doctor.name}-
                                        <span className="text-primary">
                                            {doctor.specialization}
                                        </span>
                                    </span>
                                    <CheckIcon
                                        className={cn(
                                            "w-4 h-4 text-sm text-muted-foreground invisible",
                                            Number(value) === doctor.id &&
                                                "visible"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
