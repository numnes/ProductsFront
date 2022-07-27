import { useContextSelector } from "use-context-selector";

import { Context } from "contexts/context";

export const useLayoutSize = () => {
  const size = useContextSelector(Context, (app) => app.size);

  return { size };
};
