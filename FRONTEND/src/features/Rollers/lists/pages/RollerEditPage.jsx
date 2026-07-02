import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RollerForm } from "../components/RollerForm";
import { useCategories } from "../../../MasterData/Categories/hooks/use-categories.js";
import { useCategoryStore } from "../../../MasterData/Categories/store/categories.store.js";
import { useAlertStore } from "../../../../shared/store/alert-store.js";
import { api } from "../../../../shared/api/axios.js";

export function RollerEditPage() {
  const { id } = useParams();
  useCategories();
  const categories = useCategoryStore((state) => state.categories);
  const location = useLocation();

  const roller = location.state?.roller;
  const { showAlert } = useAlertStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (res) => {
    try {
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let res = await api.put(`/master/roller/${id}`, values);

      showAlert({
        type: "success",
        message: "Roller berhasil diperbarui.",
      });

      navigate("/rollers");
    } catch (err) {
      console.error(err);
      showAlert({
        type: "error",
        message: "Gagal update data.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!roller) {
    return <div className="rounded-xl bg-white p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Edit Roller</h1>

        <p className="mt-1 text-sm text-slate-500">Ubah informasi roller.</p>
      </div>

      <RollerForm
        categories={categories}
        defaultValues={roller}
        loading={loading}
        submitText="Update Roller"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
