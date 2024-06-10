import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export default function NotPermission() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-red-500 mb-4">
                    Access Denied
                </h1>
                <p className="text-gray-700 mb-4">
                    You do not have permission to view this page.
                </p>
                <Button asChild>
                    <Link
                        href="/"
                        className="inline-block px-4 py-2 text-white font-semibold rounded-lg"
                    >
                        Go to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
