import { Observable, OperatorFunction, timeout } from "rxjs";

export const timeoutWhen = <T>(
  cond: boolean,
  value: number,
): OperatorFunction<T, T> => {
  return function (source: Observable<T>): Observable<T> {
    return cond ? source.pipe(timeout(value)) : source;
  };
};
