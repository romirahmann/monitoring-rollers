import { useNavigate, useParams } from "react-router-dom";
import { TopBar } from "../../../shared/components/topbar.jsx";
import { ArrowBigDown, ArrowLeft, Menu, X } from "lucide-react";

import { TypePage } from "./TypePage.jsx";
import { fetchTypeMachine, useTypeMachine } from "../hooks/use-type.js";
import { useTypeStore } from "../store/type.store.js";
import { useState } from "react";
import { Modal } from "../../../shared/components/Modal.jsx";
import { TypeForm } from "../components/TypeForm.jsx";
import { useAlertStore } from "../../../store/alert-store.js";
import { api } from "../../../shared/api/axios.js";

export function MachinePage() {
  const { category } = useParams();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showAlert } = useAlertStore();
  useTypeMachine(category);

  const { typeByName, setTypeByName } = useTypeStore((state) => state);

  const navigate = useNavigate();

  const handleBtnAdd = () => {
    setOpenAddModal(true);
  };

  const handleSubmitAdd = async (data) => {
    try {
      let res = await api.post("/master/type-machine", data);

      await fetchTypeMachine(category, setTypeByName);
      showAlert({
        type: "success",
        message: "Type machine added successfully",
      });
    } catch (err) {
      console.log(err);
      showAlert({
        type: "error",
        message: "Error adding type machine",
      });
    }
    setOpenAddModal(false);
  };

  return (
    <>
      <div className="max-w-full p-3">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-sm">
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* LEFT SECTION */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/")}
                  className="
                    flex items-center gap-2
                    px-3 py-2
                    border border-gray-300
                    rounded-xl
                    hover:bg-gray-100
                    transition
                  "
                >
                  <ArrowLeft size={18} />
                  <span className="hidden sm:inline">Back</span>
                </button>

                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Machine Category
                  </p>

                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900">
                    {category}
                  </h1>
                </div>
              </div>

              {/* DESKTOP BUTTON */}
              <button
                onClick={handleBtnAdd}
                className="
                  hidden md:block
                  rounded-2xl
                  bg-zinc-900
                  px-5 py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-zinc-800
                  active:scale-95
                  shadow-lg
                "
              >
                + Add Type Machine
              </button>

              {/* MOBILE HAMBURGER */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="
                  md:hidden
                  p-2
                  border
                  border-zinc-300
                  rounded-xl
                  hover:bg-zinc-100
                "
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* MOBILE DROPDOWN */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 border-t border-zinc-200 pt-4">
                <button
                  onClick={handleBtnAdd}
                  className="
                    w-full
                    rounded-xl
                    bg-zinc-900
                    py-3
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  + Add Type Machine
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="">
          <TypePage
            category={category}
            machines={typeByName || []}
            // positions={defaultPositions}
          />
        </main>

        <Modal
          isOpen={openAddModal}
          onClose={() => setOpenAddModal(false)}
          title="Add Type "
          size="sm"
        >
          <TypeForm
            category={category}
            initialValues={selectedType}
            onCancel={() => setOpenAddModal(false)}
            onSubmit={handleSubmitAdd}
          />
        </Modal>
      </div>
    </>
  );
}
