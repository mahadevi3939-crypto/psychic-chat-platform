"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

/**
 * Presence rules (LOCKED):
 * - NEVER set is_online = false here
 * - Presence only:
 *   - marks user online (true)
 *   - updates last_seen_at as heartbeat
 * - Offline is DERIVED from last_seen_at
 */
export function usePresence(profileId?: string) {
  useEffect(() => {
    if (!profileId) return;

    let stopped = false;

    const heartbeat = async () => {
      if (stopped) return;

      await supabase
        .from("profiles")
        .update({
          is_online: true,
          last_seen_at: new Date().toISOString(),
        })
        .eq("id", profileId);
    };

    // 🔹 Initial heartbeat
    heartbeat();

    // 🔹 Keep-alive every 30 seconds
    const interval = setInterval(heartbeat, 30_000);

    return () => {
      stopped = true;
      clearInterval(interval);
      // ❌ NO offline write here
    };
  }, [profileId]);
}
