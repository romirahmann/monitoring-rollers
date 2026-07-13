import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../../../shared/components/PageHeader.jsx";
import { useState } from "react";
import { ArrowLeft, Calendar, Factory, User, Clipboard } from "lucide-react";

import { useInspectionById } from "../hooks/use-inspection-byId.js";
import { useInspectionStore } from "../stores/inspection.store.js";
import { SharedTable } from "../../../shared/components/SharedTable.jsx";
import dayjs from "dayjs";

export default function InspectionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useInspectionById(id);

  const inspection = useInspectionStore((state) => state.inspectionById);

  const [history] = useState([]);

  // ==========================
  // Loading
  // ==========================

  if (!inspection) {
    return (
      <>
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center gap-2 text-sm text-slate-500 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <PageHeader
          title={`Inspection #${id}`}
          description="Inspection Detail"
        />

        <div className="rounded-xl border bg-white p-10 text-center text-slate-500">
          Loading inspection...
        </div>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="mb-5 flex items-center gap-2 text-sm text-slate-500 hover:text-black"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <PageHeader title={`Inspection #${id}`} description="Inspection Detail" />

      {/* HEADER */}

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">Inspection Information</h2>

          <div className="space-y-4">
            <Item
              icon={<Factory size={18} />}
              label="Machine"
              value={inspection.machine_name}
            />

            <Item
              icon={<Calendar size={18} />}
              label="Created"
              value={dayjs(inspection.inspection_date).format("DD MMMM YYYY")}
            />

            <Item
              icon={<User size={18} />}
              label="Checker"
              value={inspection.checker_name}
            />

            <Item
              icon={<Clipboard size={18} />}
              label="Notes"
              value={inspection.notes}
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">Summary</h2>

          <div className="grid grid-cols-2 gap-4">
            <SummaryCard
              title="Total Roller"
              value={inspection.details?.length ?? 0}
            />

            <SummaryCard title="Inspection ID" value={inspection.id ?? "-"} />
          </div>
        </div>
      </div>

      {/* ROLLER */}

      <div className="mt-8 space-y-6">
        {(inspection.details ?? []).map((roller) => (
          <div
            key={roller.id ?? roller.roller_code}
            className="rounded-2xl border bg-white p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{roller.roller_code}</h2>

                <p className="text-sm text-slate-500">
                  Position : {roller.position_name}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-4 py-1 text-sm">
                {roller.roller_type}
              </span>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Point</th>
                  <th className="text-left">Initial</th>
                  <th className="text-left">Minimum</th>
                  <th className="text-left">Current</th>
                  <th className="text-left">Wear</th>
                </tr>
              </thead>

              <tbody>
                {(roller.measurements ?? []).map((m) => {
                  const wear =
                    Number(m.initial_size ?? 0) - Number(m.size ?? 0);

                  return (
                    <tr key={m.point_no} className="border-b last:border-none">
                      <td className="py-4">Point {m.point_no}</td>

                      <td>{m.initial_size ?? "-"}</td>

                      <td>{m.minimum_size ?? "-"}</td>

                      <td>{m.size ?? "-"}</td>

                      <td className="font-semibold text-red-500">
                        {wear.toFixed(2)} mm
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* HISTORY */}

      <div className="mt-8">
        <h2 className="mb-5 text-xl font-semibold">Inspection History</h2>

        <SharedTable
          data={history}
          columns={[
            {
              key: "inspection_date",
              title: "Inspection Date",
            },
            {
              key: "checker_name",
              title: "Checker",
            },
            {
              key: "point1",
              title: "Point 1",
            },
            {
              key: "point2",
              title: "Point 2",
            },
            {
              key: "point3",
              title: "Point 3",
            },
            {
              key: "average",
              title: "Average",
            },
          ]}
        />
      </div>
    </>
  );
}

function Item({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      {icon}

      <div>
        <p className="text-xs text-slate-500">{label}</p>

        <p className="font-medium">{value ?? "-"}</p>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">
      <p className="text-sm text-slate-500">{title}</p>

      <h3 className="mt-2 text-3xl font-bold">{value ?? "-"}</h3>
    </div>
  );
}
