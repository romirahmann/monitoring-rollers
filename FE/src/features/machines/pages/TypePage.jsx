import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function TypePage({
  category,
  machines = [],
  positions = [],
  theme = "zinc",
}) {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigasi = useNavigate();
  const themes = {
    zinc: {
      hoverBorder: "hover:border-zinc-500",
      layoutBg: "bg-zinc-950",
      cardBg: "bg-zinc-900/60",
      gradient: "from-white to-zinc-400",
      selectedBorder: "border-zinc-900",
    },

    indigo: {
      hoverBorder: "hover:border-indigo-500",
      layoutBg: "bg-zinc-900",
      cardBg: "bg-zinc-800/60",
      gradient: "from-white to-indigo-300",
      selectedBorder: "border-indigo-500",
    },
  };

  const color = themes[theme];

  return (
    <div className="min-h-screen bg-zinc-100">
      {/* MACHINE TYPES */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-zinc-900">Machine Types</h2>

          <p className="mt-2 text-zinc-500">
            Select machine type to continue monitoring.
          </p>
        </div>

        <div
          className={`grid gap-6 ${
            machines.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {machines.map((machine) => (
            <button
              key={machine.id}
              onClick={() => {
                setSelectedMachine(machine);
                setSelectedUnit(null);
              }}
              className={`
                group relative overflow-hidden rounded-3xl
                h-[340px] text-left
                border border-zinc-200
                shadow-lg
                transform-gpu
                transition-all duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                ${
                  selectedMachine?.id === machine.id
                    ? `${color.selectedBorder} scale-[1.02] shadow-2xl`
                    : ""
                }
              `}
            >
              <img
                src={machine.image}
                alt={machine.name}
                className="
                  absolute inset-0
                  h-full w-full
                  object-cover
                  will-change-transform
                  transition-transform duration-500
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-black/60" />

              <div className="relative z-10 flex h-full flex-col justify-between p-8">
                <div>
                  <div className="inline-flex rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                    <span className="text-xs font-semibold tracking-widest text-white">
                      ACTIVE
                    </span>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-300">
                    {machine.category_name}
                  </p>

                  <h1
                    className={`
                      bg-gradient-to-r
                      ${color.gradient}
                      bg-clip-text
                      text-6xl font-black
                      text-transparent
                    `}
                  >
                    {machine.name}
                  </h1>

                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-300">
                    {machine.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* MACHINE UNITS */}
      {selectedMachine && (
        <section className="mx-auto max-w-7xl px-6 pb-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-zinc-900">
                {selectedMachine.name} Units
              </h2>

              <p className="mt-2 text-zinc-500">
                Select unit machine to view roller positions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white px-4 py-2 shadow">
                <span className="text-sm font-medium text-zinc-600">
                  {selectedMachine?.units?.length ?? 0} Units
                </span>
              </div>

              <button
                className="
                  rounded-2xl
                  bg-zinc-900
                  px-5 py-3
                  text-sm font-semibold text-white
                  shadow-lg
                  transition-all duration-300
                  hover:scale-105
                  hover:bg-zinc-800
                  active:scale-95
                "
              >
                + Add Unit Machine
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {selectedMachine?.units?.map((unit) => (
              <button
                key={unit.id}
                onClick={() => navigasi(`position/${unit.id}`)}
                className={`
                  overflow-hidden
                  rounded-3xl
                  border
                  bg-white
                  p-6
                  text-left
                  shadow-md
                  transform-gpu
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  ${
                    selectedUnit?.id === unit.id
                      ? `${color.selectedBorder} scale-[1.02] shadow-xl`
                      : "border-zinc-200"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-400">
                      Unit
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-zinc-900">
                      {unit.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-sm font-medium text-zinc-500">
                  {unit.status}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
