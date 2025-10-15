import "./index.css";
import { Effect } from "effect";

import { useCallback, useMemo, useState } from "react";
import { ExplorePage } from "./components/pages/explore";
import { QueriesPage } from "./components/pages/queries";
import { RelaysPage } from "./components/pages/relays";

export function App() {
  const [count, setCount] = useState(0);

  const task = useMemo(
    () => Effect.sync(() => setCount((current) => current + 1)),
    [setCount],
  );

  const increment = useCallback(() => Effect.runSync(task), [task]);

  return (
    <div>
      <button onClick={increment}>count is {count}</button>

      <ExplorePage />
      <QueriesPage />
      <RelaysPage />
    </div>
  );
}

export default App;
