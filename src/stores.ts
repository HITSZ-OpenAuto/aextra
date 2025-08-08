import { persistentAtom } from "@nanostores/persistent";

export const pageWidth = persistentAtom<string>("page-width", "1280px");
