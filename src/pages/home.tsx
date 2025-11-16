import { Link } from "react-router-dom";

export default function Home() {
  const items = [
    { title: "Frosted Glass", route: "/components/frosted-glass" },
    { title: "Cordyceps", route: "/components/cordyceps" },
    { title: "Fire", route: "/components/fire" },
    { title: "Rippling", route: "/components/rippling" },
    { title: "Waves", route: "/components/waves" },
    { title: "Bouncy Button", route: "/components/bouncy-button" }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-12 tracking-wide text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-purple-400 animate-pulse">
        Lab
      </h1>

      <div className="flex flex-col gap-5 w-[80vw] h-fit">
        {items.map((item) => (
          <Link
            key={item.route}
            to={item.route}
            className="group block rounded-2xl border border-neutral-800 hover:border-purple-500 transition-all duration-300 bg-neutral-900/40 backdrop-blur-md shadow-xl hover:shadow-purple-500/20 p-[30px]"
          >
            <div className="text-2xl font-semibold mb-3 group-hover:text-purple-400 transition-all">
              {item.title}
            </div>
            <p className="text-neutral-400 text-sm group-hover:text-neutral-300 transition-all">
              View component →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
