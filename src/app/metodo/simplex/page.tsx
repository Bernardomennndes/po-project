"use client";

import { Container, Flex } from "@radix-ui/themes";
import React from "react";
import ParametersTable from "./parameters-table";
import { Simplex } from "@/lib/simplex";
import ResultTable from "./result-table";
import ResultDetails from "./result-details";
import type { Configuration, Parameters } from "./interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function Problem() {
  const simplexRef = React.useRef(new Simplex());
  const { toast } = useToast();

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

  const [result, setResult] = React.useState({
    result: [],
    z: undefined,
    iterationsQuantity: 0,
  });

  const [problemProcessingLoading, setProblemProcessingLoading] =
    React.useState<boolean>(false);
  const [problemText, setProblemText] = React.useState<string>("");
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  async function handleCallApi() {
    setProblemProcessingLoading(true);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problemText }),
      });

      const responseParameters = (await response.json()) as Parameters;

      setParameters(responseParameters);

      setConfiguration({
        variables: responseParameters.objetivo.length,
        constraints: responseParameters.restricoes.length,
      });

      setDialogOpen(false);
      toast({
        title: "Valores Aplicados.",
        description:
          "Verifique o tipo de operação da função objetivo, variáveis, relações e os coeficientes das restrições antes da execução do problema.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Erro na Geração dos Dados.",
        description:
          "Ocorreu um erro durante o processamento do texto e transcrição dos dados. Por favor, tente novamente mais tarde.",
      });
    } finally {
      setProblemProcessingLoading(false);
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
      <Flex direction="column" gap="8">
        <div>
          <h1 className="text-3xl font-bold">Algoritmo Simplex</h1>
          <p className="text-md text-muted-foreground">
            Preencha os campos relativos aos coeficientes de cada variável
            relativa à coluna apresentada na tabela. Para alterar a quantidade
            de variáveis e restrições, altere na aba esquerda e, após a
            alterção, acione o botão de aplicar configurações.
          </p>
        </div>

        <Dialog
          open={dialogOpen}
          onOpenChange={(value) => {
            setProblemText("");
            setDialogOpen(value);
          }}
        >
          <DialogTrigger asChild>
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle className="flex flex-row gap-1 items-end">
                  <Flex justify="between" className="w-full">
                    <Flex gap="1" align="end">
                      <h2>Descrever Problema</h2>
                      <span className="text-sm text-muted-foreground">
                        Experimental
                      </span>
                    </Flex>
                  </Flex>
                </CardTitle>
                <CardDescription>
                  Descrever o problema para que seja estruturado pela
                  inteligência artificial da OpenAI.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-muted-foreground">
                  Exemplo de Descrição de Problema
                </span>
                <p>
                  Na minha fábrica, são produzidos dois tipos de mesas, A e B. A
                  mesa A requer 6 horas de trabalho na seção de carpintaria e 4
                  hora na seção de acabamento. A mesa B requer 4 hora de
                  trabalho na seção de carpintaria e 7 horas na seção de
                  acabamento. A seção de carpintaria tem 120 horas disponíveis
                  por semana e a seção de acabamento tem 150 horas disponíveis
                  por semana. O lucro por unidade é de R$ 45,00 para a mesa A e
                  R$ 27,00 para a mesa B. Gere as equações de restrição e a
                  equação de maximização do lucro.
                </p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Problema de Otimização</DialogTitle>
              <DialogDescription>
                Descreva o problema de otimização para a conversão em variáveis
                e restrições.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <Input.TextArea
                rows={10}
                placeholder="Descreva o problema..."
                value={problemText}
                onChange={({ target: { value } }) => setProblemText(value)}
                className="h-auto"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                disabled={problemProcessingLoading}
                onClick={async () => await handleCallApi()}
              >
                Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
          </Flex>
        )}
      </Flex>
    </Container>
  );
}
