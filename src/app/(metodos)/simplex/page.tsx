"use client";

import { Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ParametersTable from "./parameters-table";
import { Simplex } from "@/lib/simplex";
import ResultTable from "./result-table";
import ResultDetails from "./result-details";
import type { Configuration, Parameters } from "./interface";
import GraphicSolution from "./graphic-solution";

export default function Problem() {
  const simplexRef = React.useRef(new Simplex());

  const [configuration, setConfiguration] = React.useState<Configuration>({
    variables: 1,
    constraints: 1,
  });

  const [parameters, setParameters] = React.useState<Parameters>({
    metodo: "Generalizado",
    problema: "Maximize",
    objetivo: Array.from<number>({ length: configuration.variables }).fill(0),
    restricoes: Array.from<number[]>({
      length: configuration.constraints,
    }).fill(Array.from<number>({ length: configuration.variables }).fill(0)),
    relacoes: Array.from<any>({ length: configuration.constraints }).fill("<="),
    rhs: Array.from<number>({ length: configuration.constraints }).fill(0),
    upper: Array.from<any>({ length: configuration.variables }).fill("INF"),
    lower: Array.from<any>({ length: configuration.variables }).fill(0),
  });

  // const [parameters, setParameters] = React.useState<Parameters>({
  //   metodo: "Generalizado",
  //   problema: "Minimize",
  //   objetivo: [0.4, 0.5],
  //   restricoes: [
  //     [0.6, 0.4],
  //     [0.5, 0.5],
  //     [0.3, 0.1],
  //   ],
  //   relacoes: [">=", "=", "<="],
  //   rhs: [6, 6, 2.7],
  //   upper: ["INF", "INF"],
  //   lower: [0, 0],
  // });

  const [result, setResult] = React.useState({
    result: [],
    z: undefined,
    iterationsQuantity: 0,
  });

  async function handleCallApi() {
    try {
      const response = await fetch("/api/simplex", { method: "GET" });

      console.log(await response.json());
    } catch {
      console.log("Api call failed.");
    }
  }

  function handleExecute() {
    console.log(parameters);

    simplexRef.current.init(parameters);

    const temp: any = simplexRef.current.executa();
    const z: any = simplexRef.current.resultado(temp.length - 1);

    console.log(temp);

    setResult({
      result: temp,
      z,
      iterationsQuantity: temp.length - 1,
    });
  }

  function handleApplyConfiguration() {
    setParameters((prevParameters) => ({
      ...prevParameters,
      objetivo: Array.from<number>({ length: configuration.variables }).fill(0),
      restricoes: Array.from<number[]>({
        length: configuration.constraints,
      }).fill(Array.from<number>({ length: configuration.variables }).fill(0)),
      relacoes: Array.from<any>({ length: configuration.constraints }).fill(
        "<="
      ),
      rhs: Array.from<number>({ length: configuration.constraints }).fill(0),
      upper: Array.from<any>({ length: configuration.variables }).fill("INF"),
      lower: Array.from<any>({ length: configuration.variables }).fill(0),
    }));

    setResult({
      result: [],
      z: undefined,
      iterationsQuantity: 0,
    });
  }

  return (
    <Container size="4" className="p-8">
      <Flex direction="column" gap="6">
        <ParametersTable
          parameters={parameters}
          setParameters={setParameters}
          configuration={configuration}
          setConfiguration={setConfiguration}
          handleExecute={handleExecute}
          handleApplyConfiguration={handleApplyConfiguration}
        />

        {!!result.result.length && (
          <Flex direction="column" gap="8">
            <ResultTable simplexRef={simplexRef} result={result.result} />

            <ResultDetails
              z={result.z}
              iterationsQuantity={result.iterationsQuantity}
            />
            <Flex className="w-[500px] h-[500px]" direction="column">
              <Heading size="4">Solução Gráfica</Heading>
              <GraphicSolution
                restricoes={parameters.restricoes.map((restricao, index) => (
                  [...restricao, parameters.rhs[index]]
                ))}
                solution={[]}
              />
            </Flex>
          </Flex>
        )}
      </Flex>
    </Container>
  );
}
