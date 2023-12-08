import React from "react";
import { Parameters } from "./interface";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VariablesTableProps {
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
}

export default function VariablesTable({
  parameters,
  setParameters,
}: Readonly<VariablesTableProps>) {
  function handleChangeConstraintVariableCoefficient(
    constraintIndex: number,
    variableIndex: number,
    value: number
  ) {
    setParameters((prevParameters) => ({
      ...prevParameters,
      restricoes: prevParameters.restricoes.map((constraint, index) =>
        index === constraintIndex
          ? constraint.map((variable, prevVariableIndex) =>
              variableIndex === prevVariableIndex ? value : variable
            )
          : constraint
      ),
    }));
  }

  function handleChangeConstraintType(
    constraintIndex: number,
    value: ">=" | "=" | "<="
  ) {
    setParameters((prevParameters) => ({
      ...prevParameters,
      relacoes: prevParameters.relacoes.map((relation, index) =>
        index === constraintIndex ? value : relation
      ),
    }));
  }

  function handleChangeConstraintValue(constraintIndex: number, value: number) {
    setParameters((prevParameters) => ({
      ...prevParameters,
      rhs: prevParameters.rhs.map((rightSideValue, index) =>
        index === constraintIndex ? value : rightSideValue
      ),
    }));
  }

  return (
    <Table className="caption-top">
      <TableCaption className="text-left">Tabela de Variáveis</TableCaption>
      <TableHeader>
        <TableRow>
          {parameters.objetivo.map((_, variableIndex) => (
            <TableHead key={variableIndex} className="text-center">
              X<small>{variableIndex + 1}</small>
            </TableHead>
          ))}

          <TableHead>Relação</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parameters.restricoes.map((constraint, constraintIndex) => (
          <TableRow key={constraintIndex}>
            {constraint.map((variable, variableIndex) => (
              <TableCell key={variableIndex}>
                <Input
                  type="number"
                  className="w-full text-right appearance-none"
                  placeholder="0"
                  value={variable}
                  onChange={({ target: { value } }) =>
                    handleChangeConstraintVariableCoefficient(
                      constraintIndex,
                      variableIndex,
                      Number(value)
                    )
                  }
                />
              </TableCell>
            ))}

            <TableCell>
              <Select
                value={parameters.relacoes[constraintIndex]}
                onValueChange={(value) =>
                  handleChangeConstraintType(
                    constraintIndex,
                    value as ">=" | "=" | "<="
                  )
                }
              >
                <SelectTrigger className="w-[60px]">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="<=">&le;</SelectItem>
                    <SelectItem value=">=">&ge;</SelectItem>
                    <SelectItem value="=">=</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                className="w-[64px]"
                placeholder="0"
                value={parameters.rhs[constraintIndex]}
                onChange={({ target: { value } }) =>
                  handleChangeConstraintValue(constraintIndex, Number(value))
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
