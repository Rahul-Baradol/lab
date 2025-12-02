import { motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"

export function ClipboardSnippet({ data }: { data: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(data)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <div className="relative w-full">
            <motion.code
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="bg-black/30 backdrop-blur p-4 rounded-lg font-mono text-sm text-white border border-white/10 shadow-sm flex flex-col gap-2 sm:flex-row justify-between items-end sm:items-center"
            >
                <div className="break-all">{data}</div>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className="bg-black/30" onClick={handleCopy}>
                            {
                                (copied == false) ? <Copy className="h-4 w-4 text-white/70" /> : <Check className="h-4 w-4 text-white/70" />
                            }
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {copied ? "Copied!" : "Copy to clipboard"}
                    </TooltipContent>
                </Tooltip>
            </motion.code>
        </div>
    )
}
