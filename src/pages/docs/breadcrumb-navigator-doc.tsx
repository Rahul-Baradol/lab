import { ClipboardSnippet } from "@/components/clipboard-snippet";
import JsxSyntaxHighlighter from "@/components/jsx-syntax-highlighter";
import { Github, House } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function BreadcrumbDocs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="min-h-[90vh] w-[90vw] lg:w-[50vw] flex flex-col items-center gap-10 bg-black text-white">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row gap-3">
            <Link to={"/"} className="flex flex-row gap-1 items-center z-10 group border border-white/30 py-2 px-3 rounded-lg hover:border-cyan-400/40 transition-all duration-300">
              <House className="h-4 w-4 cursor-pointer" />
              <div className="text-xs cursor-pointer">Home</div>
            </Link>
          </div>

          <a href={"https://github.com/Rahul-Baradol/lab/blob/main/src/registry/new-york/items/breadcrumb-navigator/components/breadcrumb-navigator.tsx"} target="_blank" className="flex flex-row gap-1 items-center z-10 group py-2 px-3 rounded-lg border border-white/30 hover:border-cyan-400/40 transition-all duration-300">
            <Github className="h-4 w-4 cursor-pointer" />
          </a>
        </div>

        <div className="flex flex-col gap-3 w-full items-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl font-semibold select-none"
          >
            Breadcrumb Navigator
          </motion.h1>

          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-gray-400 text-center text-base"
            >
              A persistent breadcrumb component that tracks navigation order and query params.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-gray-400 text-base"
        >
          Installation
        </motion.p>

        <ClipboardSnippet data="npx shadcn add https://lab.rahulbaradol.in/r/breadcrumb-navigator.json" />
      </div>

      <div className="w-full flex flex-col gap-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-gray-400 text-base"
        >
          Usage
        </motion.p>

        <div className="flex flex-col w-full gap-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-gray-400 text-sm w-full"
          >
            Simply plug it in <span className="font-semibold bg-muted/5 mx-1 px-3 py-2 rounded-lg text-sm">layout.tsx</span>
          </motion.p>

          <motion.code>
            <JsxSyntaxHighlighter
              code={`<BreadcrumbNavigator 
    pathOrder={["/categories", "/wishlist", "/amazon/products", "/products", "/product"]}
    pathToDisplay={{
        "/categories": "Categories",
        "/amazon/products": "Amazon Products",
        "/products": "Products",
        "/wishlist": "Wishlist",
    }}
    displayTextClassName='text-orange-500'
/>`}
            />
          </motion.code>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-gray-400 text-sm gap-4"
        >
          In case there is a path param
        </motion.p>

        <motion.code className="flex flex-col gap-5">
          <JsxSyntaxHighlighter
            code={`function normalizePath(pathname: string) {
    if (/^\/product\/[^/]+$/.test(pathname)) return "/product";
    return pathname;
}`}
          />


          <JsxSyntaxHighlighter
            code={`<BreadcrumbNavigator 
    pathOrder={["/categories", "/wishlist", "/amazon/products", "/products", "/product"]}
    pathNormalizer={normalizePath}
    pathToDisplay={{
        "/categories": "Categories",
        "/amazon/products": "Amazon Products",
        "/products": "Products",
        "/wishlist": "Wishlist",
    }}
    displayTextClassName='text-orange-500'
/>`}
          />
        </motion.code>
      </div>
    </div>
  )
}
