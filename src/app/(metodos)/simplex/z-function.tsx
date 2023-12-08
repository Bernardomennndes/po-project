import { Input } from "@/components/ui/input";

import type { Parameters } from "./interface";
import {
  Table,
  TableHeader,
  TableBody,
  TableCaption,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export interface ZFunctionProps {
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
}

export function ZFunction({
  parameters,
  setParameters,
}: Readonly<ZFunctionProps>) {
  function handleChangeObjectiveVariableCoefficient(
    variableIndex: number,
    value: number
  ) {
    setParameters((prevParameters) => ({
      ...prevParameters,
      objetivo: prevParameters.objetivo.map((coefficientValue, index) =>
        index === variableIndex ? value : coefficientValue
      ),
    }));
  }

  return (
    <Table className="caption-top">
      <TableCaption className="text-left">Função Objetivo</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead />
          {parameters.objetivo.map((_, index) => (
            <TableHead key={index} className="text-center">
              X<small>{index + 1}</small>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-center text-muted-foreground">Z</TableCell>
          {parameters.objetivo.map((value, index) => (
            <TableCell key={index} className="p-4">
              <Input
                type="number"
                className="w-full text-right"
                placeholder="0"
                value={value}
                onChange={({ target: { value } }) =>
                  handleChangeObjectiveVariableCoefficient(index, Number(value))
                }
              />
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}
