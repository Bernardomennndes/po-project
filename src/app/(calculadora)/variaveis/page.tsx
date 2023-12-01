"use client";

import { SimplexTableProps } from "@/components/ProblemTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flex, Callout, Container } from "@radix-ui/themes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams()!;

  const [error, setError] = React.useState<boolean>(false);
  const [problem, setProblem] = React.useState<SimplexTableProps>({
    numRestrictions: 0,
    numVariables: 0,
  });

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      Number.parseInt(e.target.value) > 1 &&
      Number.parseInt(e.target.value) <= 10
    ) {
      setProblem((prevFormData) => {
        return {
          ...prevFormData,
          [e.target.name]: Number.parseInt(e.target.value),
        };
      });
      setError(false);
      return;
    }
    setError(true);
  };

  return (
    <Container size="1" className="py-8">
      <Flex
        gap="5"
        direction="column"
        justify="center"
        align="end"
        className="w-full"
      >
        {error && (
          <Callout.Root color="red">
            <Callout.Text>
              Variáveis e Restrições não podem ser menores que 2 ou maiores que
              10.
            </Callout.Text>
          </Callout.Root>
        )}

        <Flex align="start" direction="column" gap="1" className="w-full">
          <Label htmlFor="variables">Variáveis</Label>

          <Input
            onChange={handleChange}
            name="numVariables"
            placeholder="Num. de Variáveis"
            className="w-full"
            id="variables"
          />
        </Flex>

        <Flex align="start" direction="column" gap="1" className="w-full">
          <Label htmlFor="restriction">Restrições</Label>

          <Input
            onChange={handleChange}
            name="numRestrictions"
            placeholder="Num. de Restrições"
            className="w-full"
            id="restriction"
          />
        </Flex>

        <Flex gap="2">
          <Button variant="link">Voltar</Button>

          <Link
            href={
              "/problem" +
              "?" +
              createQueryString("res", problem.numRestrictions.toString()) +
              "&" +
              createQueryString("var", problem.numVariables.toString())
            }
          >
            <Button>Próximo</Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}
