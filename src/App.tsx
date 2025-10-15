import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APITester } from './APITester';
import './index.css';
import { Effect } from 'effect';

import logo from './logo.svg';
import reactLogo from './react.svg';
import { useCallback, useMemo, useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);

  const task = useMemo(() => Effect.sync(() => setCount((current) => current + 1)), [setCount]);

  const increment = useCallback(() => Effect.runSync(task), [task]);

  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img src={logo} alt="Bun Logo" className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120" />
        <img src={reactLogo} alt="React Logo" className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]" />
      </div>
      <Card>
        <CardHeader className="gap-4">
          <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
          <CardDescription>
            Edit <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">src/App.tsx</code> and save to test HMR
          </CardDescription>
        </CardHeader>
        <CardContent>
          <APITester />
        </CardContent>
      </Card>
      <button onClick={increment}>count is {count}</button>
    </div>
  );
}

export default App;
