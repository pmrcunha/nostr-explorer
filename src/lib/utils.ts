import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Effect, Schedule, Fiber, Console } from "effect";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const log = <A>(
  action: Effect.Effect<A>,
  schedule: Schedule.Schedule<[number, number], void>,
): void => {
  let i = 0;

  Effect.gen(function* () {
    const fiber: Fiber.RuntimeFiber<[[number, number], number]> =
      yield* Effect.gen(function* () {
        yield* action;
        i++;
      }).pipe(
        Effect.repeat(
          schedule.pipe(
            // Limit the number of iterations for the example
            Schedule.intersect(Schedule.recurs(10)),
            Schedule.tapOutput(([Out]) =>
              Console.log(
                i === 11 ? "..." : [new Date(Out[0]), new Date(Out[1])],
              ),
            ),
          ),
        ),
        Effect.fork,
      );
    yield* Fiber.join(fiber);
  }).pipe(Effect.runPromise);
};
