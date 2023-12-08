interface ResultTableStepProps {
  result: any[][][];
  index: number;
}

export default function ResultTableStep({
  result,
  index,
}: Readonly<ResultTableStepProps>) {
  const pivo = index != result.length - 1 ? simplex.pivo(index) : "";

  const baseVariables = simplex.base(index);

  return (
    <div
      className="row panel panel-default"
      style={{ overflow: "auto" }}
      id="styleScroll"
    >
      <div className="panel-heading">
        <h3 className="panel-title" id="panel-title">
          <label>
            Iteração
            {index === 0 ? "Inicial" : index}
          </label>
        </h3>
      </div>
      <div className="panel-body" style={{ padding: 0 }}>
        <table id={`myTableResult${index}`} className="table table-condensed">
          <tr>
            <th>
              <center>
                <b>Base</b>
              </center>
            </th>

            {result[index][0].map((variable) => (
              <th key={variable}>{`x${variable}`}</th>
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

          {result[index].map((_, constraintIndex) => {
            const rowClassName =
              index < result.length - 1 &&
              result[index][0].length <= result[index + 1][0].length
                ? pivo[1] == constraintIndex ||
                  (Array.isArray(pivo[1]) &&
                    pivo[1].indexOf(constraintIndex) !== -1)
                  ? "pivo"
                  : ""
                : "";

            return (
              <tr key={constraintIndex} className={rowClassName}>
                <td>
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

                {result[index][0].map((innerVariable, innerVariableIndex) => {
                  const cellClassName =
                    index < result.length - 1 &&
                    result[index][0].length <= result[index + 1][0].length
                      ? pivo[0] == innerVariableIndex
                        ? "pivo"
                        : ""
                      : "";

                  return (
                    <td key={innerVariable} className={cellClassName}>
                      {innerVariableIndex < result[index][0].length - 1 &&
                      constraintIndex > 0 ? (
                        <p
                          id={`${constraintIndex - 1}_${innerVariableIndex}`}
                          className="simplexcell"
                        >
                          {result[index][constraintIndex][innerVariableIndex]
                            .toFixed(4)
                            .replace(".", ",")
                            .replace("Infinity", "Infinito")
                            .replace("NaN", "Indeterminado")}
                        </p>
                      ) : (
                        <p className="simplexcell-result">
                          {result[index][constraintIndex][innerVariableIndex]
                            .toFixed(4)
                            .replace(".", ",")
                            .replace("Infinity", "Infinito")
                            .replace("NaN", "Indeterminado")}
                        </p>
                      )}
                    </td>
                  );
                })}

                {index < result.length - 1 &&
                constraintIndex > 0 &&
                !isNaN(pivo[1]) ? (
                  <td>
                    <p className="simplexcell-razao">
                      {result[index][constraintIndex][
                        result[index][constraintIndex].length - 1
                      ] /
                        result[index][constraintIndex][pivo[0]]
                          .toFixed(4)
                          .replace(".", ",")
                          .replace("Infinity", "Infinito")
                          .replace("NaN", "Indeterminado")}
                    </p>
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
}
