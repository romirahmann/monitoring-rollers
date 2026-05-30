import { useNavigate, useParams } from "react-router-dom";
import { TopBar } from "../../../shared/components/topbar.jsx";
import { ArrowBigDown, ArrowLeft } from "lucide-react";

import { TypePage } from "./TypePage.jsx";
import { useTypeMachine } from "../hooks/use-type.js";
import { useTypeStore } from "../store/type.store.js";

const defaultMachines = [
  {
    id: 1,
    name: "SM102",
    category_name: "PRINTING",
    description: "Production monitoring & inspection system",
    image:
      "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200&auto=format&fit=crop",

    units: [
      {
        id: 1,
        name: "P1",
        status: "ONLINE",
      },
      {
        id: 2,
        name: "P2",
        status: "ONLINE",
      },
      {
        id: 3,
        name: "P3",
        status: "MAINTENANCE",
      },
      {
        id: 4,
        name: "P4",
        status: "ONLINE",
      },
    ],
  },

  {
    id: 2,
    name: "R106",
    category_name: "KBA",
    description: "High-speed production monitoring dashboard",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",

    units: [
      {
        id: 5,
        name: "KBA1",
        status: "ONLINE",
      },
      {
        id: 6,
        name: "KBA2",
        status: "ONLINE",
      },
    ],
  },
];
const defaultPositions = [
  {
    id: 1,
    name: "FEEDER",
    roller: "RL-001",
    life: "92%",
  },
  {
    id: 2,
    name: "PRINT UNIT 1",
    roller: "RL-002",
    life: "85%",
  },
  {
    id: 3,
    name: "PRINT UNIT 2",
    roller: "RL-003",
    life: "76%",
  },
  {
    id: 4,
    name: "COATING",
    roller: "RL-004",
    life: "88%",
  },
  {
    id: 5,
    name: "DELIVERY",
    roller: "RL-005",
    life: "69%",
  },
];

export function MachinePage() {
  const { category } = useParams();

  useTypeMachine(category);

  const { typeByName } = useTypeStore((state) => state);
  console.log(typeByName);
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-full p-3">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
            <button
              onClick={() => navigate("/")}
              className="flex gap-2 px-2 py-1 border border-gray-400 justify-center  items-center rounded-lg"
            >
              <ArrowLeft /> <span>Back</span>
            </button>
            <div>
              {/* <p className="text-sm font-medium tracking-widest text-zinc-400">
                MACHINE CATEGORY
              </p> */}

              <h1 className="mt-1 text-3xl font-black uppercase tracking-tight text-zinc-900">
                {category}
              </h1>
            </div>

            <button
              className="
              rounded-2xl bg-zinc-900 px-5 py-3
              text-sm font-semibold text-white
              transition-all duration-300
              hover:scale-105 hover:bg-zinc-800
              active:scale-95
              shadow-lg
            "
            >
              + Add Type Machine
            </button>
          </div>
        </header>

        <main className="">
          <TypePage
            category={category}
            machines={typeByName || []}
            positions={defaultPositions}
          />
        </main>
      </div>
    </>
  );
}
