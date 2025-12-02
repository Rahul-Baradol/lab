import { useRef } from "react";

const BouncyButton = () => {
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (ref.current) {
            ref.current.classList.add("bounce");
            setTimeout(() => {
                ref.current?.classList.remove("bounce");
            }, 750);
        }
    }

    return (
        <>
            <style>
                {`
                    .bounce {
                        animation: bounce 0.75s;
                    }

                    @keyframes bounce {
                        0% {
                            transform: scaleY(1);
                        }
                        30% {
                            transform: scaleY(0.8) scaleX(1.1);
                        }
                        50% {
                            transform: scaleY(1.1) scaleX(0.9);
                        }
                        70% {
                            transform: scaleY(0.9) scaleX(1.05);
                        }
                        100% {
                            transform: scaleY(1) scaleX(1);
                        }
                    }
                `}
            </style>
            <div className="w-screen h-screen flex justify-center items-center">

                <div ref={ref} className="relative hover:scale-110 transition-all duration-500">
                    <button onClick={handleClick} className="z-10 w-40 h-15 border-2 border-white bg-white rounded-xl text-black">
                        Bounce
                    </button>

                    <div className="absolute top-1 left-1 -z-10 w-40 h-15 border-2 border-gray-500 bg-gray-600 rounded-xl ">

                    </div>
                </div>

            </div>
        </>
    );
};

export default BouncyButton;