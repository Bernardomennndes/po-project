"use client";
import Problem, { ProblemProps } from '@/components/Problem'
import { Theme, Container, Flex, Callout, Heading } from '@radix-ui/themes';
import { Button } from '@/components/ui/button'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [problem, setProblem] = useState<ProblemProps>({ numRestrictions: 2, numVariables: 2 });
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(Number.parseInt(e.target.value) > 1 && Number.parseInt(e.target.value) <= 10){
      setProblem((prevFormData) => {
        return {
          ...prevFormData,
          [e.target.name]: Number.parseInt(e.target.value)
        }
      })
      setError(false);
      return;
    }
    setError(true);
  }

  const handleResolve = async () => {
    const response = await fetch("/api/simplex")
  };

  return (
    <main>
      <Theme>
        <Container size="3" className="mt-4">
          <Flex align="center" direction="column" gap="5" justify="center">
            <Heading className="">Calculadora Simplex</Heading>
            <Flex align="center" direction="column" className="w-full" gap="1">
              <Label htmlFor="restriction">Restrições</Label>
              <Input onChange={handleChange} name="numRestrictions" placeholder="Num. de Restrições" className="w-1/2" id='restriction'/>
            </Flex>
            <Flex align="center" direction="column" className="w-full" gap="1">
              <Label htmlFor="variables">Variáveis</Label>
              <Input onChange={handleChange} name="numVariables" placeholder="Num. de Variáveis" className="w-1/2" id='variables'/>
            </Flex>
            <Problem numRestrictions={problem.numRestrictions} numVariables={problem.numVariables} />
            <Button onClick={() => handleResolve()} >Resolver</Button>
            {error && (
              <Callout.Root color="red">
                <Callout.Text>
                  Variáveis e Restrições não podem ser menores que 2 ou maiores que 10.
                </Callout.Text>
              </Callout.Root>
            )}
          </Flex>
        </Container>
      </Theme>
    </main>
  )
}
