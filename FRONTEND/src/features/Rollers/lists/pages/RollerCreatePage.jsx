import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RollerForm } from "../components/RollerForm";
import { useCategories } from "../../../MasterData/Categories/hooks/use-categories.js";
import { useCategoryStore } from "../../../MasterData/Categories/store/categories.store.js";
import { useAlertStore } from "../../../../shared/store/alert-store.js";
import { api } from "../../../../shared/api/axios.js";

export function RollerCreatePage() {
  const navigate = useNavigate();
  const { loadCategories } = useCategories();
  const categories = useCategoryStore((state) => state.categories);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlertStore();

  const handleSubmit = async (form) => {
    try {
      setLoading(true);

      let res = await api.post("/master/roller", form);

      showAlert({
        type: "success",
        message: "Roller berhasil ditambahkan.",
      });

      navigate("/rollers");
    } catch (err) {
      console.error(err);
      showAlert({
        type: "error",
        message: "Gagal menyimpan data.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Form Add Roller</h1>

        <p className="mt-1 text-sm text-slate-500">
          Tambahkan data roller baru.
        </p>
      </div>

      <RollerForm
        categories={categories}
        loading={loading}
        submitText="Save Roller"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
