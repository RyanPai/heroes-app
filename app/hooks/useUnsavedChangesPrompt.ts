import { useEffect } from "react";
import { useBlocker } from "react-router";

export function useUnsavedChangesPrompt(
  isDirty: boolean,
  message = "你有未儲存的變更，確定要離開嗎？"
) {
  const blocker = useBlocker(({ currentLocation, nextLocation }) =>
    isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  // 使用者有未儲存變更時，攔截路由切換並提示確認
  useEffect(() => {
    if (blocker.state === "blocked") {
      const proceed = window.confirm(message);
      if (proceed) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker, message]);

  // 使用者有未儲存變更時，關閉/重新整理頁面前提示
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);
}
