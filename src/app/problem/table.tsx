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
import { Input } from "@/components/ui/input";

export type ProblemProps = {
  numRestrictions: number;
  numVariables: number;
};

type Constraint = {
  name: string;
  vars: Vars[];
};

type Vars = {
  name: string;
  coef: number;
};

type TableLineProps = {
  numVariables: number;
  indexConstraint: number;
  setState: React.Dispatch<React.SetStateAction<Constraint[]>>;
};

const TableLine = ({
  numVariables,
  indexConstraint,
  setState,
}: TableLineProps) => {
  const loadedVars: Vars[] = [];
  for (let i = 1; i <= numVariables; i++) {
    loadedVars.push({
      name: `x${i}`,
      coef: 0,
    });
  }

  const [variables, setVariables] = useState<Vars[]>(loadedVars);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setState([]);
  };

  return (
    <Flex align="center" gap="2">
      {variables.map((variable, index) =>
        index !== numVariables - 1 ? (
          <Flex align="center" direction="row" gap="1" key={index}>
            <Input
              type="text"
              className="w-[40px]"
              placeholder="0"
              value={variable.coef.toString()}
              name={variable.name}
              onChange={(e) => handleChange(e, index)}
            />
            <Text>
              X<small>{index + 1}</small> +
            </Text>
          </Flex>
        ) : (
          <Flex align="center" direction="row" gap="1" key={index}>
            <Input
              type="text"
              className="w-[40px]"
              placeholder="0"
              value={variable.coef}
              name={variable.name}
              onChange={(e) => handleChange(e, index)}
            />
            <Text>
              X<small>{index + 1}</small>
            </Text>
            <Select defaultValue="less">
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="less">&le;</SelectItem>
                  <SelectItem value="more">&ge;</SelectItem>
                  <SelectItem value="equal">=</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input type="text" className="w-[40px]" placeholder="0" />
          </Flex>
        )
      )}
    </Flex>
  );
};

const ZFunction = ({ numVariables }: { numVariables: number }) => {
  return (
    <Flex gap="1" align="center" direction="row">
      <Text>Z =</Text>
      {Array.from({ length: numVariables }).map((_, index) => (
        <Flex key={index} align="center" gap="1">
          <Input type="text" className="w-[40px]" placeholder="0" />
          <Text>
            X<small>{index + 1}</small> {index === numVariables - 1 ? "" : "+"}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

const ProblemTable = ({ numRestrictions, numVariables }: ProblemProps) => {
  const constraints: Constraint[] = [];
  for (let i = 1; i <= numRestrictions; i++) {
    constraints.push({
      name: `${i}`,
      vars: [],
    });
  }
  const [restrictions, setRestriction] = useState<Constraint[]>(constraints);

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
      {Array.from({ length: numRestrictions }).map((_, index) => (
        <TableLine
          numVariables={numVariables}
          key={index}
          indexConstraint={index}
          setState={setRestriction}
        />
      ))}
    </Flex>
  );
};

export default ProblemTable;
