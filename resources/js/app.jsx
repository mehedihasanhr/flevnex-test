import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Toaster } from "sonner";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const AppLayer = ({ children }) => {
            return (
                <>
                    <Toaster closeButton />
                    {children}
                </>
            );
        };

        if (import.meta.env.DEV) {
            createRoot(el).render(
                <AppLayer>
                    <App {...props} />
                </AppLayer>
            );
            return;
        }

        hydrateRoot(
            el,
            <AppLayer>
                <App {...props} />
            </AppLayer>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
