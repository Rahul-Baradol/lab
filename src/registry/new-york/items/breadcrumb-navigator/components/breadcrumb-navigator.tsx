import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface BreadcrumbNavigatorProps {
    pathOrder: string[];
    pathToDisplay: { [key: string]: string };
    pathNormalizer?: (path: string) => string;
}

export function BreadcrumbNavigator({ pathOrder = [], pathToDisplay = {}, pathNormalizer }: BreadcrumbNavigatorProps) {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const location = useLocation();

    const [pathToParam, setPathToParam] = useState<{ [key: string]: any }>(() => {
        const localParams = localStorage.getItem("navigator-params");

        if (localParams) {
            return JSON.parse(localParams);
        }

        const initialParams: { [key: string]: any } = {};
        pathOrder.forEach(path => {
            initialParams[path] = null;
        });
        return initialParams;
    });

    useEffect(() => {
        setPathToParam(prev => {
            const filteredPath = pathNormalizer ? pathNormalizer(location.pathname) : location.pathname;

            let newParams = {
                ...prev,
                [filteredPath]: Object.fromEntries(searchParams) ? Object.fromEntries(searchParams) : "",
            }

            Object.keys(newParams).forEach(path => {
                if (pathOrder.indexOf(path) > pathOrder.indexOf(filteredPath)) {
                    newParams[path] = null;
                }
            });
            return newParams;
        });
    }, [location.pathname, searchParams]);

    useEffect(() => {
        localStorage.setItem("navigator-params", JSON.stringify(pathToParam));
    }, [pathToParam])

    return (
        <div className="text-sm w-screen overflow-x-scroll px-10 my-5" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                {
                    pathOrder.map((path, index) => (
                        (pathToParam[path] != null) ? <li key={path} className="flex items-center">
                            <button
                                onClick={() => {
                                    if (path === "/") {
                                        navigate(path);
                                    } else {
                                        const queryParams = new URLSearchParams(pathToParam[path] || {}).toString();
                                        navigate(`${path}${queryParams ? `?${queryParams}` : ''}`);
                                    }
                                }}
                                className="text-orange-500 hover:text-orange-700 font-medium"
                            >
                                {pathToDisplay[path]}
                            </button>

                            {index < pathOrder.length - 1 && (
                                <span className="mx-2 text-gray-500">{'>'}</span>
                            )}
                        </li> : <></>
                    ))
                }

            </ol>
        </div>
    );
}