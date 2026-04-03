import { supabase } from "@/lib/supabase/client";

export default async function Home() {
  const { data, error } = await supabase.from("profiles").select("*");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Heimdall</h1>
        <p className="text-gray-400 text-lg">
          {error
            ? `DB Error: ${error.message}`
            : `DB connected — ${data?.length ?? 0} profiles`}
        </p>
      </div>
    </main>
  );
}
