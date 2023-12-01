import { Flex } from "@radix-ui/themes";

import { useState } from "react";
import { Constraint } from "./interface";
import { ZFunction } from "./z-function";
import { TableLine } from "./table-line";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface SimplexTableProps {
  constraints: number;
  variables: number;
}

const SimplexTable = ({
  constraints: numConstraints,
  variables: numVariables,
}: SimplexTableProps) => {
  const [constraints, setConstraints] = useState<Constraint[]>(() => {
    const vars = Array.from(
      { length: numVariables },
      (_, index) => index + 1
    ).map((variable) => ({ name: `x${variable}`, coef: 0 }));

    const bnds = {
      type: "LTE",
      lb: 0,
      ub: 0,
    } as Constraint["bnds"];

    return Array.from({ length: numConstraints }, (_, index) => index + 1).map(
      (constraint) => ({
        name: `constraint-${constraint}`,
        vars,
        bnds,
      })
    );
  });

  return (
    <Flex justify="center">
      <Flex gap="6" align="end" direction="column" className="w-fit">
        <ZFunction numVariables={numVariables} />

        <Flex gap="2" direction="column">
          {constraints.map((constraint) => (
            <TableLine
              key={constraint.name}
              constraint={constraint}
              setConstraints={setConstraints}
            />
          ))}
        </Flex>

        <Flex gap="2">
          <Button variant="link">
            <Link href="/">Voltar</Link>
          </Button>

          <Button onClick={() => console.log(constraints)}>Resolver</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SimplexTable;
