import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import _ from "lodash";
import { LogOutIcon, UserIcon } from "lucide-react";

export default function PrivateLayout({ user, header, children }) {
    return (
        <div className="container p-10">
            <div className="flex items-center justify-between gap-4">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {header}
                </h2>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full">
                                <img
                                    src="/storage/doctor.png"
                                    alt=""
                                    width={100}
                                    height={100}
                                    className="w-full h-full rounded-full object-fill"
                                />
                            </div>
                            <div className="text-left">
                                <span className="block">{user.name}</span>
                                <span className="block text-primary text-xs">
                                    {_.startCase(user.role)}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* Profile */}
                        <DropdownMenuItem className="p-0">
                            <Link
                                href="#"
                                className="flex items-center space-x-1.5 w-full py-1 px-2"
                            >
                                <UserIcon size={14} />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Logout */}
                        <DropdownMenuItem className="p-0">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center space-x-1.5 w-full py-1 px-2"
                            >
                                <LogOutIcon size={14} />
                                <span>Logout</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {children}
        </div>
    );
}
