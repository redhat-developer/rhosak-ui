import { useUser } from "consoledot-api";

export function useUserControlGate() {
  const { data: userData } = useUser(true);
  return { userData: userData as NonNullable<typeof userData> };
}
