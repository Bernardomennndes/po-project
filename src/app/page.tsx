"use client";
import Problem, { ProblemProps } from '@/components/ProblemTable'
import { Theme, Text, Flex, Callout, Heading, Box, TextArea } from '@radix-ui/themes';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useCallback, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams()!
  const [problem, setProblem] = useState<ProblemProps>({ numRestrictions: 0, numVariables: 0 });
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<"text" | "math" | undefined>(undefined);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.parseInt(e.target.value) > 1 && Number.parseInt(e.target.value) <= 10) {
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

  /* Estabelecendo conexão com a API con_gpt */
  const [problemText, setProblemText] = useState('');

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProblemText(event.target.value);
  };

  const sendProblemToAPI = async () => {
    try {
      const response = await fetch('/api/openai/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problemText }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar o problema para a API');
      }

      console.log("Enviando problema para a API...")
      const problemJSON = await response.json();
      console.log('Problema enviado para a API com sucesso!');
      console.log("Resposta da API: " + JSON.stringify(problemJSON));

      // Faça algo com o JSON do problema retornado pela API
    } catch (error) {
      console.error('Erro ao enviar o problema para a API:', error);
    }
  };

  return (
    <main>
      {page === undefined ? (
        <Flex gap="9" justify="center" >
          <Card className="shadow-lg h-full max-w-[400px]">
            <CardHeader>
              <CardTitle>Descrever Problema</CardTitle>
              <CardDescription>
                Descrever o problema para ser montado e resolvido pela IA da OpenAI.
                <br />
                Obs: Ferramenta Experimental
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Ex:</p>
              <p>Na minha fábrica, são produzidos dois tipos de mesas, A e B.
                A mesa A requer 6 horas de trabalho na seção de carpintaria e 4 hora na seção de acabamento.
                A mesa B requer 4 hora de trabalho na seção de carpintaria e 7 horas na seção de acabamento.
                A seção de carpintaria tem 120 horas disponíveis por semana e a seção de acabamento tem 150 horas disponíveis por semana.
                O lucro por unidade é de R$ 45,00 para a mesa A e R$ 27,00 para a mesa B. Gere as equações de restrição e a equação de maximização do lucro.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => { setPage("text") }}>Descrever</Button>
            </CardFooter>
          </Card>
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle>Digitar Variáveis</CardTitle>
              <CardDescription>Preencher manualmente as equações com os coeficientes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Ex:</p>
              <p>6X<small>1</small> + 4X<small>2</small> &le; 24</p>
              <p>X<small>1</small> + 2X<small>2</small> &le; 6</p>
              <p>-X<small>1</small> + X<small>2</small> &le; 1</p>
              <br />
              <p>Máx. Z = 5X<small>1</small> + 4X<small>2</small></p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setPage("math")} className="w-full">Digitar</Button>
            </CardFooter>
          </Card>
        </Flex>
      ) : page === "math" ?
        (
          <Flex gap="5" direction="column" justify="center" align="center">
            <Flex align="center" direction="column" className="w-full" gap="1">
              <Label htmlFor="restriction">Restrições</Label>
              <Input onChange={handleChange} name="numRestrictions" placeholder="Num. de Restrições" className="w-1/2" id='restriction' />
            </Flex>
            <Flex align="center" direction="column" className="w-full" gap="1">
              <Label htmlFor="variables">Variáveis</Label>
              <Input onChange={handleChange} name="numVariables" placeholder="Num. de Variáveis" className="w-1/2" id='variables' />
            </Flex>
            {/* <Button onClick={() => handleResolve()} >Resolver</Button> */}
            <Button>
              <Link href={
                "/problem" + "?" + createQueryString("res", problem.numRestrictions.toString()) +
                "&" + createQueryString("var", problem.numVariables.toString())
              }
              >
                Próximo
              </Link>
            </Button>
            <Button onClick={() => setPage(undefined)} variant="link">Voltar</Button>
            {error && (
              <Callout.Root color="red">
                <Callout.Text>
                  Variáveis e Restrições não podem ser menores que 2 ou maiores que 10.
                </Callout.Text>
              </Callout.Root>
            )}
          </Flex>
        )
        :
        (
          <Flex gap="5" direction="column" justify="center" align="center">
            <Textarea placeholder="Digite o problema." value={problemText} onChange={handleTextareaChange} />
            <Button onClick={sendProblemToAPI}>Próximo</Button>
            <Button onClick={() => setPage(undefined)} variant="link">Voltar</Button>
          </Flex>
        )
      }

    </main>
  )
}
