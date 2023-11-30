"use client";

import { Flex } from "@radix-ui/themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <Flex gap="6" justify="center" align="center" className="h-full">
      <Link href="/descrever">
        <Card className="h-[560px] w-[400px] cursor-pointer transition-[transform] scale-100 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex flex-row gap-1 items-end">
              Descrever Problema
              <span className="text-sm text-muted-foreground">
                Experimental
              </span>
            </CardTitle>
            <CardDescription>
              Descrever o problema para ser estruturado pela inteligência
              artificial da OpenAI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Na minha fábrica, são produzidos dois tipos de mesas, A e B. A
              mesa A requer 6 horas de trabalho na seção de carpintaria e 4 hora
              na seção de acabamento. A mesa B requer 4 hora de trabalho na
              seção de carpintaria e 7 horas na seção de acabamento. A seção de
              carpintaria tem 120 horas disponíveis por semana e a seção de
              acabamento tem 150 horas disponíveis por semana. O lucro por
              unidade é de R$ 45,00 para a mesa A e R$ 27,00 para a mesa B. Gere
              as equações de restrição e a equação de maximização do lucro.
            </p>
          </CardContent>
        </Card>
      </Link>

      <Link href="/variaveis">
        <Card className="h-[560px] w-[400px] cursor-pointer transition-[transform] scale-100 hover:scale-105">
          <CardHeader>
            <CardTitle>Definir Variáveis</CardTitle>
            <CardDescription>
              Preencher manualmente as equações com os coeficientes das
              variáveis.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div>
              <div className="w-full flex flex-col gap-4 justify-center items-center">
                <p className="">
                  Maximixar Z = 5
                  <small>
                    X<small>1</small>
                  </small>{" "}
                  + 4
                  <small>
                    X<small>2</small>
                  </small>
                </p>

                <table>
                  <tr>
                    <td className="w-[32px] text-right">
                      6
                      <small>
                        X<small>1</small>
                      </small>
                    </td>
                    <td className="w-[24px] text-center">+</td>
                    <td className="w-[32px] text-right">
                      4
                      <small>
                        X<small>2</small>
                      </small>
                    </td>
                    <td className="w-[24px] text-center">
                      <small>&le;</small>
                    </td>
                    <td className="w-[24px] text-right">24</td>
                  </tr>

                  <tr>
                    <td className="w-[32px] text-right">
                      <small>
                        X<small>1</small>
                      </small>
                    </td>
                    <td className="w-[24px] text-center">+</td>
                    <td className="w-[32px] text-right">
                      2
                      <small>
                        X<small>2</small>
                      </small>
                    </td>
                    <td className="w-[24px] text-center">
                      <small>&le;</small>
                    </td>
                    <td className="w-[24px] text-right">6</td>
                  </tr>

                  <tr>
                    <td className="w-[32px] text-right">
                      -
                      <small>
                        X<small>1</small>
                      </small>
                    </td>
                    <td className="w-[24px] text-center">+</td>
                    <td className="w-[32px] text-right">
                      <small>
                        X<small>2</small>
                      </small>
                    </td>
                    <td className="w-[24px] text-center">
                      <small>&le;</small>
                    </td>
                    <td className="w-[24px] text-right">1</td>
                  </tr>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Flex>
  );
}
