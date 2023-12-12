import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

  const apiKey = process.env.OPENAI_API_KEY; // Armazena a OPENAI_API_KEY na variável apiKey

  //Chave de acesso a API (economize suas requisições, não é o governo que paga)
  const client = new OpenAI({ apiKey: apiKey });


  /*Construa aqui o json compatível com o problema:
  Max(z) = 2x1 + 3x2
  Sujeito a:
  x1 + x2 <= 5
  2x1 + 2x2 = 8
  10x1 + 3x2 >= 7
  */
  const json_modelo = {
    problema: "Maximize",
    objetivo: [2, 3],
    restricoes: [
      [1, 1],
      [2, 2],
      [10, 3],
    ],
    relacoes: ["<=", "=", ">="],
    rhs: [5, 8, 7]
  };

  //Esse é o prompt de configuração do problema, não deve ser alterado durante o uso
  const mensagem = `Você é um assistente capaz de extrair dados de um problema linear descrito em linguagem natural e propor a função de maximização ou minimização do problema bem como suas equações de restrição. Sua resposta deve ser no formato de JSON, da seguinte forma:
Após analizar o problema em linguagem natural e chegar nas equações:
Max(z) = 2x1 + 3x2
Sujeito a:
x1 + x2 <= 5
2x1 + 2x2 = 8
10x1 + 3x2 >= 7

A resposta no formato JSON, considerando o problema acima, deve ser:
` + JSON.stringify(json_modelo) + `
Onde as seguintes regras devem ser estritamente seguidas:
Caso a função objetivo seja de maximização, você deve usar o valor "Maximize" no campo "problema". Caso contrário você deve usar o valor "Minimize".
para cada restrição, existe uma relação atrelada. No campo relações, deve ser colocado na ordem em que as restrições se apresentam, de modo que caso a restrição seja do tipo <=, você deve usar o valor "<=" no campo. Caso a restrição seja do tipo =, você deve usar o valor "=" no campo e caso a restrição seja do tipo >=, você deve usar o valor ">=" no campo.
Note que o problema só pode ser de minimização ou maximização, e pode ter 2 ou mais variáveis e 2 ou mais restrições.
Não use nomes relativos ao problema em linguagem natural dentro de sua resposta, pois ela deve ser exclusivamente da forma que o JSON de exemplo está estruturado.
Em caso de uma variável não ser usada em uma restrição mas ser usada em outra, ela deve constar como 0 na restrição em que não é usada.
Sua resposta deve conter apenas o JSON, conforme o padrão apresentado, com os valores das equações do problema sem nenhuma explicação adicional.
`;

  //Recuperando question do request
  const pergunta = req.body.problemText;

  if (pergunta != undefined) {
    console.log("Chegou na API");
  }

  let json = JSON.parse('{}');

  //Chamada da API
  client.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    messages: [
      {
        role: 'system',
        content: mensagem,
      },
      {
        role: 'user',
        content: pergunta,
      },
    ],
  })
    .catch((error: any) => console.error(error))
    .then((response: any) => {

      let mensagem = response.choices[0].message.content;
      console.log("GPT RESPONDEU");

      //Removendo ```json do início e do fim da mensagem caso exista
      if (mensagem.startsWith('```json')) {
        mensagem = mensagem.substring(7);
      }
      if (mensagem.endsWith('```')) {
        mensagem = mensagem.substring(0, mensagem.length - 3);
      }

      //Convertendo mensagem para json
      json = JSON.parse(mensagem);

      //Adicionando o campo "método" no json
      json.metodo = "Generalizado";

      //Adicionando o campo upper e lower no json
      const quant_variaveis = json.objetivo.length;
      json.upper = [];
      json.lower = [];
      //Adicionando "INF" no campo upper para cada variável e "0" no campo lower para cada variável
      for (let i = 0; i < quant_variaveis; i++) {
        json.upper.push("INF");
        json.lower.push("0");
      }

      console.log(JSON.stringify(json))
      return json;
    })
    .catch((error: any) => {
      console.error(error);
      return error;
    });

  console.log(json);

  return res.status(200).json(json);
}