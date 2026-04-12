"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Modal from "./Modal";

export default function DeleteReportButton({ reportId }: { reportId: string }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await supabase.from("reports").delete().eq("id", reportId);
    router.push("/dashboard");
  };

  return (
    <>
      {showModal && (
        <Modal
          title="DELETE REPORT"
          message="This report and all its findings will be permanently deleted."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          danger={true}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 rounded-xl text-xs font-display tracking-widest transition-all border"
        style={{
          background: "rgba(239,68,68,0.05)",
          borderColor: "rgba(239,68,68,0.2)",
          color: "#EF4444",
        }}
      >
        DELETE REPORT
      </button>
    </>
  );
}
