import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface UiLabComponentCardProps {
    title: string;
    description: string;
    href: string;
}

export function UiLabComponentCard({ title, description, href }: UiLabComponentCardProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate(href)}
            className="group w-full bg-white/5
                       flex flex-row justify-between cursor-pointer relative overflow-hidden 
                       hover:bg-cyan-600/10 hover:scale-102 transition-all duration-400"
        >
            <div className="h-full w-px bg-cyan-400 transition-all duration-500 group-hover:h-0"></div>
            <div className="flex flex-col w-full overflow-hidden">
                <div className="h-px w-full bg-cyan-400 group-hover:w-0 transition-all duration-500"></div>
                <div className="flex flex-col gap-2 p-6 w-full">
                    <div className="text-lg font-semibold">{title}</div>
                    <div className="text-sm text-white/60">{description}</div>
                </div>
                <div className="h-px w-0 bg-cyan-400 group-hover:w-full transition-all duration-500"></div>
            </div>
            <div className="h-0 w-px bg-cyan-400 transition-all duration-500 group-hover:h-full"></div>
        </motion.div>
    );
}
