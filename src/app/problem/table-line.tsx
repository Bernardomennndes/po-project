import { Flex, Text } from "@radix-ui/themes";
import { Constraint } from "./interface";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TableLineProps = {
  constraint: Constraint;
  setConstraints: React.Dispatch<React.SetStateAction<Constraint[]>>;
};

export const TableLine = ({ constraint, setConstraints }: TableLineProps) => {
  function handleChangeVariableCoefficient(variable: string, coef: number) {
    setConstraints((prevValue) =>
      prevValue.map((prevConstraint) =>
        prevConstraint.name === constraint.name
          ? {
              ...prevConstraint,
              vars: prevConstraint.vars.map((prevVariable) =>
                prevVariable.name === variable
                  ? { ...prevVariable, coef }
                  : prevVariable
              ),
            }
          : prevConstraint
      )
    );
  }

  function handleChangeBoundType(type: Constraint["bnds"]["type"]) {
    const boundValue = constraint.bnds.lb || constraint.bnds.ub;

    const boundTypeValueMapper: Record<
      Constraint["bnds"]["type"],
      Constraint["bnds"]
    > = {
      LTE: {
        type: "LTE",
        ub: boundValue,
        lb: 0,
      },
      GTE: {
        type: "GTE",
        ub: 0,
        lb: boundValue,
      },
      EQ: {
        type: "EQ",
        ub: boundValue,
        lb: boundValue,
      },
    };

    setConstraints((prevValue) =>
      prevValue.map((prevConstraint) =>
        prevConstraint.name === constraint.name
          ? { ...prevConstraint, bnds: boundTypeValueMapper[type] }
          : prevConstraint
      )
    );
  }

  function handleChangeBoundValue(value: number) {
    const boundTypeValueMapper: Record<
      Constraint["bnds"]["type"],
      Constraint["bnds"]
    > = {
      LTE: {
        type: "LTE",
        ub: value,
        lb: 0,
      },
      GTE: {
        type: "GTE",
        ub: 0,
        lb: value,
      },
      EQ: {
        type: "EQ",
        ub: value,
        lb: value,
      },
    };

    setConstraints((prevValue) =>
      prevValue.map((prevConstraint) =>
        prevConstraint.name === constraint.name
          ? {
              ...prevConstraint,
              bnds: boundTypeValueMapper[prevConstraint.bnds.type],
            }
          : prevConstraint
      )
    );
  }

  return (
    <Flex align="center" gap="2">
      {constraint.vars.map((variable, index) => (
        <Flex align="end" direction="row" gap="1" key={index}>
          <Input
            type="number"
            className="w-[64px]"
            placeholder="0"
            value={variable.coef}
            name={variable.name}
            onChange={({ target: { name, value } }) =>
              handleChangeVariableCoefficient(name, Number(value))
            }
          />

          <Text>
            X<small>{index + 1}</small>{" "}
            {index + 1 !== constraint.vars.length && "+"}
          </Text>
        </Flex>
      ))}

      <Select
        value={constraint.bnds.type}
        onValueChange={(value) =>
          handleChangeBoundType(value as Constraint["bnds"]["type"])
        }
      >
        <SelectTrigger className="w-[60px]">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="LTE">&le;</SelectItem>
            <SelectItem value="GTE">&ge;</SelectItem>
            <SelectItem value="EQ">=</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        type="number"
        className="w-[64px]"
        placeholder="0"
        value={constraint.bnds.lb || constraint.bnds.ub}
        onChange={({ target: { value } }) =>
          handleChangeBoundValue(Number(value))
        }
      />
    </Flex>
  );
};
