"use client";
<<<<<<< HEAD
=======

>>>>>>> 2a76e4c27800d94cec671c075c517fb2950f9e03
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Flex } from "@radix-ui/themes";
import React from "react";

export default function Page() {
  const [problemText, setProblemText] = React.useState("");

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProblemText(event.target.value);
  };

  const sendProblemToAPI = async () => {
    try {
      const response = await fetch("/api/openai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problemText }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar o problema para a API");
      }

      console.log("Enviando problema para a API...");
      const problemJSON = await response.json();
      console.log("Problema enviado para a API com sucesso!");
      console.log("Resposta da API: " + JSON.stringify(problemJSON));

      // Faça algo com o JSON do problema retornado pela API
    } catch (error) {
      console.error("Erro ao enviar o problema para a API:", error);
    }
  };

  return (
    <Flex gap="5" direction="column" justify="center" align="center">
      <Textarea
        placeholder="Digite o problema."
        value={problemText}
        onChange={handleTextareaChange}
      />
      <Button onClick={sendProblemToAPI}>Próximo</Button>
      <Button variant="link">Voltar</Button>
    </Flex>
  );
}
