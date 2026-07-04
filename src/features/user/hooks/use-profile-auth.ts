import * as LocalAuthentication from "expo-local-authentication";
import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";

import { t } from "@/lib/i18n";

export function useProfileAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = useCallback(async () => {
    setError(null);

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    // When the device doesn't support biometric
    if (!hasHardware || !isEnrolled) {
      setIsAuthenticated(true);
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: t("auth.prompt"),
    });

    if (result.success) {
      setIsAuthenticated(true);
    } else {
      setError(t("auth.failed"));
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState !== "active") {
        setIsAuthenticated(false);
      }
    });

    return () => subscription.remove();
  }, []);

  return { isAuthenticated, error, authenticate };
}
