import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypeForm } from "../components/TypeForm.jsx";
import { Modal } from "../../../shared/components/Modal.jsx";
import { useAlertStore } from "../../../store/alert-store.js";
import { api } from "../../../shared/api/axios.js";
import { fetchTypeMachine, useTypeMachine } from "../hooks/use-type.js";
import { useTypeStore } from "../store/type.store.js";
import { UnitForm } from "../components/UnitForm.jsx";
import ConfirmModal from "../../../shared/components/ConfirmModal.jsx";

export function TypePage({
  category,
  machines = [],
  positions = [],
  theme = "zinc",
}) {
  const [modalDeleted, setModalDeleted] = useState({
    isOpen: false,
    data: null,
  });
  const [openEditModal, setOpenEditModal] = useState(false);
  const [formUnitMachine, setFormUnitMachine] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const { showAlert } = useAlertStore();
  const navigate = useNavigate();
  const { typeByName, setTypeByName } = useTypeStore((state) => state);
  // console.log(typeByName);
  const themes = {
    zinc: {
      gradient: "from-white to-zinc-400",
      selectedBorder: "border-zinc-900",
    },

    indigo: {
      gradient: "from-white to-indigo-300",
      selectedBorder: "border-indigo-500",
    },
  };

  const color = themes[theme];

  const handleEditMachine = async (machine) => {
    try {
      let res = await api.put(
        `/master/type-machine/${selectedMachine.id}`,
        machine,
      );

      fetchTypeMachine(category, setTypeByName);
      showAlert({
        type: "success",
        message: "Type machine updated successfully",
      });

      setOpenEditModal(false);
    } catch (err) {
      console.log(err);
      showAlert({
        type: "error",
        message: "Error editing machine",
      });
    }
  };

  const handleDeleteUnit = async () => {};

  const handleDeleteMachine = async (machine, e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(`Delete machine ${machine.name}?`);

    try {
      let res = await api.patch(`/master/type-machine/deactived/${machine.id}`);
      showAlert({
        type: "success",
        message: "Deleted Type Successfully!",
      });
    } catch (err) {
      console.log(err);
      showAlert({
        type: "error",
        message: "Deleted Type Failed!",
      });
    } finally {
      fetchTypeMachine(category, setTypeByName);
    }
  };

  const handleAddUnitMachine = async () => {
    showAlert({
      type: "success",
      message: "Add Machine Successfully!",
    });
    fetchTypeMachine(category, setTypeByName);
    setFormUnitMachine(false);
    setSelectedMachine(null);
  };

  return (
    <>
      <div className="space-y-10">
        {/* MACHINE TYPES */}
        <section className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 mt-5">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900">
              Machine Types
            </h2>

            <p className="mt-2 text-zinc-500">
              Select machine type to continue monitoring.
            </p>
          </div>

          {machines.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center">
              <h3 className="text-lg font-semibold text-zinc-700">
                No Machine Available
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Add your first machine to start monitoring.
              </p>
            </div>
          ) : (
            <div
              className={`
              grid
              gap-5
              sm:gap-6
              ${
                machines.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              }
            `}
            >
              {machines.map((machine) => (
                <div
                  key={machine.id}
                  onClick={() => {
                    setSelectedMachine(machine);
                    setSelectedUnit(null);
                  }}
                  className={`
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  min-h-[280px]
                  md:min-h-[320px]
                  text-left
                  border
                  border-zinc-200
                  shadow-md
                  transition-all
                  duration-500
                  ease-out
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:border-zinc-300
                  ${
                    selectedMachine?.id === machine.id
                      ? `${color.selectedBorder} ring-2 ring-zinc-200 shadow-xl`
                      : ""
                  }
                `}
                >
                  {/* Background */}
                  <img
                    src={machine.image}
                    alt={machine.name}
                    className="
                    absolute inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                  />

                  <div className="absolute inset-0 bg-black/60" />

                  <div
                    className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/30
                    to-transparent
                    opacity-80
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                  />

                  {/* ACTION BUTTONS */}
                  <div className="absolute right-4 top-4 z-20 flex gap-2">
                    <button
                      onClick={(e) => setOpenEditModal(true)}
                      className="
                      rounded-xl
                      bg-white/5
                      p-2
                      text-white
                      backdrop-blur-md
                      shadow-lg
                      transition
                      hover:bg-blue-500/90
                    "
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={(e) => handleDeleteMachine(machine, e)}
                      className="
                      rounded-xl
                      bg-white/5
                      p-2
                      text-white
                      backdrop-blur-md
                      shadow-lg
                      transition
                      hover:bg-red-500/90
                    "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                    <div>
                      {machine.is_active && (
                        <span
                          className="
                        inline-flex
                        rounded-full
                        bg-emerald-500/20
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        tracking-widest
                        text-emerald-300
                        backdrop-blur-md
                      "
                        >
                          ACTIVE
                        </span>
                      )}

                      {!machine.is_active && (
                        <span
                          className="
                        inline-flex
                        rounded-full
                        bg-red-500/20
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        tracking-widest
                        text-red-300
                        backdrop-blur-md
                      "
                        >
                          INACTIVE
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-300">
                        {machine.category_name}
                      </p>

                      <h2
                        className={`
                        bg-gradient-to-r
                        ${color.gradient}
                        bg-clip-text
                        text-transparent
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        font-black
                      `}
                      >
                        {machine.name}
                      </h2>

                      <p className="mt-4 max-w-sm text-sm text-zinc-300">
                        {machine.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MACHINE UNITS */}
        {selectedMachine && (
          <section className="mx-auto max-w-7xl px-4 md:px-6 pb-10">
            <div
              className="
              mb-6
              flex
              flex-col
              gap-4
              md:flex-row
              md:items-center
              md:justify-between
            "
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-zinc-900">
                  {selectedMachine.name} Units
                </h2>

                <p className="mt-2 text-zinc-500">
                  Select unit machine to view roller positions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full bg-white px-4 py-2 shadow">
                  <span className="text-sm font-medium text-zinc-600">
                    {selectedMachine?.units?.length ?? 0} Units
                  </span>
                </div>

                <button
                  onClick={() => setFormUnitMachine(true)}
                  className="
                  w-full
                  sm:w-auto
                  rounded-2xl
                  bg-zinc-900
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:bg-zinc-800
                  hover:shadow-lg
                "
                >
                  + Add Unit Machine
                </button>
              </div>
            </div>

            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4
              md:gap-5
            "
            >
              {selectedMachine?.units?.map((unit) => (
                <div key={unit.id} className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalDeleted({ isOpen: true, data: unit.id });
                    }}
                    className="absolute top-3
                              right-3
                              z-10
                              rounded-lg
                              bg-red-500
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-white
                              hover:bg-red-600
                        "
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    onClick={() => navigate(`position/${unit.id}`)}
                    className={`
                        w-full
                        rounded-3xl
                        border
                        bg-white
                        p-6
                        text-left
                        shadow-md
                        transition-all
                        duration-300
                        ease-out
                        hover:-translate-y-0.5
                        hover:shadow-lg
                        ${
                          selectedUnit?.id === unit.id
                            ? `${color.selectedBorder} scale-[1.01] shadow-xl`
                            : "border-zinc-200"
                        }
                      `}
                  >
                    <p className="text-xs uppercase tracking-widest text-zinc-400">
                      Unit
                    </p>

                    <h3 className="mt-2 text-3xl font-black text-zinc-900">
                      {unit.name}
                    </h3>

                    <p className="mt-5 text-sm font-medium text-zinc-500">
                      {unit.status}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Modal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Type "
        size="sm"
      >
        <TypeForm
          category={category}
          initialValues={selectedMachine}
          onCancel={() => setOpenEditModal(false)}
          onSubmit={handleEditMachine}
        />
      </Modal>
      <Modal
        isOpen={formUnitMachine}
        onClose={() => setFormUnitMachine(false)}
        title={`FORM UNIT`}
        size="sm"
      >
        <UnitForm
          typeMachines={selectedMachine}
          initialValues={selectedMachine}
          onSubmit={handleAddUnitMachine}
          onCancel={() => setFormUnitMachine(false)}
        />
      </Modal>
      <ConfirmModal
        open={modalDeleted.isOpen}
        title="Delete Unit"
        message="This action cannot be undone. Are you sure you want to delete this unit?"
        confirmText="Delete"
        onCancel={() => setModalDeleted({ isOpen: false, data: null })}
        onConfirm={handleDeleteUnit}
      />
    </>
  );
}
