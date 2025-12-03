"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

import { V0Layout } from "@/components/V0Layout";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <V0Layout>
      <ChatKitPanel
        theme={scheme}
        onWidgetAction={handleWidgetAction}
        onResponseEnd={handleResponseEnd}
        onThemeRequest={setScheme}
        className="h-full shadow-none border border-slate-200 dark:border-slate-800"
      />
    </V0Layout>
  );
}
