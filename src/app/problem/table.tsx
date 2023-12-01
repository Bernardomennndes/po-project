import { Flex, Text } from "@radix-ui/themes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const ProblemTable = ({
  constraints: numConstraints,
  variables: numVariables,
}: SimplexTableProps) => {
  const [constraints, setConstraints] = useState<Constraint[]>(
    Array.from({ length: numConstraints }, (_, index) => index + 1).map(
      (constraint) => ({
        name: `constraint-${constraint}`,
        vars: Array.from({ length: numVariables }, (_, index) => index + 1).map(
          (variable) => ({ name: `x${variable}`, coef: 0 })
        ),
        bnds: {
          type: "LTE",
          lb: 0,
          ub: 0,
        },
      })
    )
  );

  return (
    <Flex gap="3" align="center" direction="column">
      <Select defaultValue="max">
        <SelectTrigger>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="max">Maximizar</SelectItem>
            <SelectItem value="min">Minimizar</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <ZFunction numVariables={numVariables} />

      {constraints.map((constraint) => (
        <TableLine
          key={constraint.name}
          constraint={constraint}
          setConstraints={setConstraints}
        />
      ))}

      <Flex gap="2">
        <Button variant="link">
          <Link href="/">Voltar</Link>
        </Button>

        <Button onClick={() => console.log(constraints)}>Resolver</Button>
      </Flex>
    </Flex>
  );
};

export default ProblemTable;
