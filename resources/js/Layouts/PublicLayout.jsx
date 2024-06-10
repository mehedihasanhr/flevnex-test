export default function PublicLayout ({children}) {
    return (
        <div className="w-screen h-screen overflow-hidden grid place-content-center">
            {children}
        </div>
    )
}
