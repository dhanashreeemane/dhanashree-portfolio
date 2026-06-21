"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { siteMeta } from "@/data/profile";

/**
 * Shows a page view count. Uses the free, keyless CountAPI service as a
 * working default. If you'd rather not depend on a third-party counter,
 * swap the fetch below for your own /api/visits route backed by a small
 * KV store (Vercel KV, Upstash Redis, etc.) — same response shape works.
 */
export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const namespace = encodeURIComponent(siteMeta.url.replace(/https?:\/\//, ""));
    // TODO: CountAPI is a free, best-effort service with no SLA — for a
    // production launch, replace with a self-hosted counter route.
    fetch(`https://api.countapi.xyz/hit/${namespace}/visits`)
      .then((res) => {
        if (!res.ok) throw new Error("Counter unavailable");
        return res.json();
      })
      .then((data) => setCount(data.value))
      .catch(() => setCount(null));
  }, []);

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
      <Eye size={12} />
      {count !== null ? `${count.toLocaleString()} visits` : "—"}
    </div>
  );
}
