import { useState } from "react";
import { PageHeader } from "../../../../shared/components/PageHeader.jsx";
import { useParams } from "react-router-dom";
import { usePosition } from "../hooks/use-position.js";
import { usePositionStore } from "../stores/position.store.js";
import { Modal } from "../../../../shared/components/Modal.jsx";
import { PositionForm } from "../components/PositionForm.jsx";
import { useAlertStore } from "../../../../shared/store/alert-store.js";
import { api } from "../../../../shared/api/axios.js";
import { CardPosition } from "../components/CardPosition.jsx";

export default function PositionPage() {
  const { machineId } = useParams();
  const { loadPositions } = usePosition(machineId);

  // loadPositions(machineId);
  const { showAlert } = useAlertStore();
  const positions = usePositionStore((state) => state.positions);

  const [formModal, setFormModal] = useState({
    isOpen: false,
    type: "Add",
    data: null,
  });
  const handleSearch = (keyword) => {};
  const handleSubmit = async (data) => {
    const payload = { ...data, machine_id: machineId };
    try {
      if (formModal.type === "Add") {
        let res = await api.post("/master/position", payload);
      }
      if (formModal.type === "Edit") {
        let res = await api.put(`/master/position/${formModal.data}`, payload);
      }

      loadPositions(machineId);

      showAlert({
        type: "success",
        message: "Add Position Successfully!",
      });
      setFormModal({ isOpen: false, type: "Add", data: null });
    } catch (error) {
      showAlert({
        type: "error",
        message: "Add Position Failed!",
      });
    }
  };
  return (
    <>
      <PageHeader
        title="Position Page"
        description="Kelola seluruh posisi yang ada dalam mesin untuk roller."
        searchPlaceholder="Search Posisi..."
        actionLabel="Add Position"
        onAction={() =>
          setFormModal({
            isOpen: true,
            type: "Add",
            data: null,
          })
        }
        onSearch={handleSearch}
      />

      {/* <div className="overflow-hidden rounded-xl border">
        <img
          src={`http://192.168.9.192:3000/uploads/${machineId}`}
          alt=""
          className="w-full h-[350px] object-cover"
        />
      </div> */}

      <hr />

      <div className="grid grid-cols-6 gap-4">
        {positions.length > 0 ? (
          positions.map((position) => (
            <CardPosition position={position.position} />
          ))
        ) : (
          <div className="col-span-6">
            <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-2xl bg-gray-50">
              <div className="text-5xl mb-4">📍</div>

              <h3 className="text-lg font-semibold text-gray-800">
                No Positions Available
              </h3>

              <p className="mt-2 text-sm text-gray-500 max-w-md text-center">
                This machine does not have any positions yet. Click{" "}
                <span className="font-medium">"Add Position"</span> to create
                the first position.
              </p>

              <button
                onClick={() =>
                  setFormModal({ isOpen: true, type: "Add", data: null })
                }
                className="
                mt-6
                rounded-xl
                bg-zinc-900
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                hover:bg-zinc-800
              "
              >
                + Add First Position
              </button>
            </div>
          </div>
        )}

        <Modal
          isOpen={formModal.isOpen}
          title={`${formModal.type} Position`}
          onClose={() =>
            setFormModal({ isOpen: false, type: "Add", data: null })
          }
        >
          <PositionForm
            mode={formModal.type}
            initialData={formModal.data}
            onClose={() =>
              setFormModal({ isOpen: false, type: "Add", data: null })
            }
            machineId={machineId}
            onSubmit={handleSubmit}
          />
        </Modal>
      </div>
    </>
  );
}
