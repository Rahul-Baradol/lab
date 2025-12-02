import { Outlet } from "react-router-dom";
import RippleCanvas from "@/components/rippling";

export function Layout() {

    return (
        <div className="p-10 relative w-screen min-h-screen flex flex-col gap-10 items-center bg-black text-white">
            <RippleCanvas />
            <Outlet />
        </div>
    )
}