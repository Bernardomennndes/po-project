import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ResultDetailsProps {
  z: any;
  iterationsQuantity: number;
}

export default function ResultDetails({
  z,
  iterationsQuantity,
}: Readonly<ResultDetailsProps>) {
  return (
    <section className="">
      <div className="flex items-start">
        <div className="w-[240px] pt-4 flex flex-col gap-2">
          <div className="flex items-end gap-0">
            <h2 className="text-4xl text-green-600">
              {Number(+z["FuncaoObjetivo"])
                .toFixed(2)
                .replace(".", ",")
                .replace("Infinity", "Infinito")
                .replace("NaN", "Indeterminado")}
            </h2>

            <span className="text-sm text-muted-foreground pb-1">
              {!isNaN(z["FuncaoObjetivo"].toFixed(4))
                ? z["TipoResultado"]
                : "Solução Inviável."}
            </span>
          </div>
          <div className="text-md text-muted-foreground">
            <span className="">{`Quantidade de Iterações: ${iterationsQuantity}`}</span>
          </div>
        </div>

        <Accordion type="multiple" className="flex-1">
          <AccordionItem value="basic-variables">
            <AccordionTrigger>Variáveis Básicas</AccordionTrigger>
            <AccordionContent>
              <ul>
                {Array.from(
                  { length: z["VariaveisBasicas"].length - 2 },
                  (_, index) => index
                ).map((variable: number) => {
                  return (
                    <li key={variable}>
                      {`x${variable + 1} = ${Number(+z["Variaveis"][variable])
                        .toFixed(1)
                        .replace(".", ",")}`}
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="non-basic-variables">
            <AccordionTrigger>Variáveis Não Básicas</AccordionTrigger>
            <AccordionContent>
              <ul>
                {z["VariaveisNaoBasicas"].map((variable: number) => {
                  return (
                    <li key={variable}>{`x${variable + 1} = ${Number(
                      +z["Variaveis"][variable]
                    )
                      .toFixed(1)
                      .replace(".", ",")}`}</li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
