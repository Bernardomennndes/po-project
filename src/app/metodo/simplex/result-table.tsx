import { Simplex } from "@/lib/simplex";
import { cn } from "@/lib/utils";
import React from "react";
import { Parameters } from "./interface";

interface ResultTableProps {
  simplexRef: React.MutableRefObject<Simplex>;
  result: number[][][];
  drawLasIteration?: boolean;
}

export default function ResultTable({
  simplexRef,
  result,
  drawLasIteration = true,
}: Readonly<ResultTableProps>) {
  const iterationTables = React.useMemo<Array<number>>(
    () =>
      Array.from(
        {
          length: drawLasIteration ? result.length : result.length - 1,
        },
        (_, index) => index
      ),
    [result, drawLasIteration]
  );

  return (
    <div className="w-full flex flex-col gap-8">
      {iterationTables.map((index) => {
        const pivo =
          index != result.length - 1 ? simplexRef.current.pivo(index) : "";

        const baseVariables = simplexRef.current.base(index);

        console.log(baseVariables, index);

        return (
          <div key={index} className="p-4 border border-neutral-200 rounded-lg">
            <h3 className="w-full pb-2 mb-2 border-b border-neutral-200 text-md text-muted-foreground">{`Iteração ${
              index || "Inicial"
            }`}</h3>

            <div className="panel-body" style={{ padding: 0 }}>
              <table id={`myTableResult${index}`} className="w-full">
                <tr>
                  <th>
                    <center>
                      <b>Base</b>
                    </center>
                  </th>

                  {Array.from(
                    { length: result[index][0].length - 3 },
                    (_, index) => index
                  ).map((variableIndex) => (
                    <th key={variableIndex}>{`x${variableIndex + 1}`}</th>
                  ))}

                  <th>
                    <center>
                      <b>Resultado</b>
                    </center>
                  </th>

                  <th>
                    <center>
                      <b>Raz&atilde;o</b>
                    </center>
                  </th>
                </tr>

                {Array.from(
                  { length: result[index].length - 2 },
                  (_, index) => index
                ).map((constraintIndex) => {
                  const rowClassName =
                    index < result.length - 1 &&
                    result[index][0].length <= result[index + 1][0].length
                      ? pivo[1] == constraintIndex ||
                        (Array.isArray(pivo[1]) &&
                          pivo[1].indexOf(constraintIndex) !== -1)
                        ? "bg-green-100"
                        : undefined
                      : undefined;

                  return (
                    <tr key={constraintIndex} className={rowClassName}>
                      <td className="text-center">
                        {!constraintIndex ? (
                          <p className="simplexcell-z">
                            <b>z</b>
                          </p>
                        ) : !isNaN(+baseVariables[constraintIndex]) ? (
                          <p className="simplexcell-basicas">
                            <b>{`x${+baseVariables[constraintIndex] + 1}`}</b>
                          </p>
                        ) : (
                          <p className="simplexcell-basicas">
                            <b>Indeterminado</b>
                          </p>
                        )}
                      </td>

                      {Array.from(
                        { length: result[index][0].length - 3 },
                        (_, index) => index
                      ).map((innerVariableIndex) => {
                        const cellClassName =
                          index < result.length - 1 &&
                          result[index][0].length <= result[index + 1][0].length
                            ? pivo[0] == innerVariableIndex
                              ? "bg-green-100"
                              : undefined
                            : undefined;

                        return (
                          <td
                            key={innerVariableIndex}
                            className={cn(cellClassName, "text-center")}
                          >
                            {innerVariableIndex < result[index][0].length - 1 &&
                            constraintIndex > 0 ? (
                              <p
                                id={`${
                                  constraintIndex - 1
                                }_${innerVariableIndex}`}
                                className="simplexcell"
                              >
                                {Number(
                                  result[index][constraintIndex][
                                    innerVariableIndex
                                  ]
                                )
                                  .toFixed(2)
                                  .replace(".", ",")
                                  .replace("Infinity", "Infinito")
                                  .replace("NaN", "Indeterminado")}
                              </p>
                            ) : (
                              <p className="simplexcell-result">
                                {Number(
                                  result[index][constraintIndex][
                                    innerVariableIndex
                                  ]
                                )
                                  .toFixed(2)
                                  .replace(".", ",")
                                  .replace("Infinity", "Infinito")
                                  .replace("NaN", "Indeterminado")}
                              </p>
                            )}
                          </td>
                        );
                      })}

                      <td className="text-center">
                        <p className="simplexcell-result">
                          {Number(
                            result[index][constraintIndex][
                              result[index][constraintIndex].length - 1
                            ]
                          )
                            .toFixed(2)
                            .replace(".", ",")
                            .replace("Infinity", "Infinito")
                            .replace("NaN", "Indeterminado")}
                        </p>
                      </td>

                      {index < result.length - 1 &&
                      constraintIndex > 0 &&
                      !isNaN(pivo[1]) ? (
                        <td className="text-center">
                          {Number(
                            result[index][constraintIndex][
                              result[index][constraintIndex].length - 1
                            ] / result[index][constraintIndex][pivo[0]]
                          )
                            .toFixed(2)
                            .replace(".", ",")
                            .replace("Infinity", "Infinito")
                            .replace("NaN", "Indeterminado")}
                        </td>
                      ) : (
                        <td>
                          <p className="simplexcell"></p>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
