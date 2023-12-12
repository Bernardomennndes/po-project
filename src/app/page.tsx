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

const cards = [
  {
    href: "/metodo/simplex",
    title: "Algoritmo Simplex",
    description:
      "Método mais utilizado para a resolução de problemas de programação linear.",
    content:
      "O Simplex permite que se encontre valores ideais em situações em que diversos aspectos precisam ser respeitados. Diante de um problema, são estabelecidas inequações que representam restrições para as variáveis. A partir daí, testa-se possibilidades de maneira a otimizar o resultado da forma mais rápida possível.",
  },
  // {
  //   href: "/metodo/branch-and-bound",
  //   title: "Ramificar e limitar (Branch and bound)",
  //   description:
  //     "Algoritmo para encontrar soluções ótimas para problemas de otimização, especialmente em otimização combinatória.",
  //   content:
  //     "Consiste em uma enumeração sistemática de todos os candidatos a solução, através da qual grandes subconjuntos de candidatos infrutíferos são descartados em massa utilizando os limites superior e inferior da quantia otimizada.",
  // },
];

export default function Home() {
  return (
    <Flex gap="6" justify="center" align="center" className="h-full">
      {cards.map((card) => (
        <Link key={card.href} href={card.href}>
          <Card className="h-[560px] w-[440px] cursor-pointer transition-[transform] scale-100 hover:scale-105">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <p>{card.content}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Flex>
  );
}
