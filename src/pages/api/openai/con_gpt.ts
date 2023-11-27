import OpenAI from 'openai';
const GLPK = require("glpk.js");
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

  //Esse é o prompt de configuração do problema, não deve ser alterado durante o uso
  const mensagem = `Você é um assistente capaz de extrair dados de um problema linear descrito em linguagem natural e propor a função de maximização ou minimização do problema bem como suas equações de restrição. Sua resposta deve ser no formato de JSON, da seguinte forma:
Após analizar o problema em linguagem natural e chegar nas equações:
Max(z) = 2x1 + 3x2
Sujeito a:
x1 + x2 <= 5
2x1 + 2x2 = 8
10x1 + 3x2 >= 7

A resposta no formato JSON deve ser de acordo com o modelo da biblioteca GLPK:
{
    name: "Problem",
    objective: {
    direction: glpk.GLP_MAX,
    name: "obj",
    vars: [
        { name: "x1", coef: 2 },
        { name: "x2", coef: 3 },
    ],
    },
    subjectTo: [
    {
        name: "cons1",
        vars: [
        { name: "x1", coef: 1.0 },
        { name: "x2", coef: 1.0 },
        ],
        bnds: { type: glpk.GLP_UP, ub: 5.0, lb: 0.0 },
    },
    {
        name: "cons2",
        vars: [
        { name: "x1", coef: 2.0 },
        { name: "x2", coef: 2.0 },
        ],
        bnds: { type: glpk.GLP_FX, ub: 8.0, lb: 8.0 },
    },
    {
        name: "cons3",
        vars: [
        { name: "x1", coef: 10.0 },
        { name: "x2", coef: 3.0 },
        ],
        bnds: { type: glpk.GLP_LO, ub: 0.0, lb: 7.0 },
    },
    ],
}

Onde:
Caso a função objetivo seja de maximização, você deve usar o valor "MAX" no campo direction. Caso contrário você deve usar o valor "MIN".
Caso a restrição seja do tipo <=, você deve usar o valor "UP" no campo type.
Caso a restrição seja do tipo =, você deve usar o valor "FX" no campo type.
Caso a restrição seja do tipo >=, você deve usar o valor "LO" no campo type.
Note que o problema pode ser de minimização ou maximização, e pode ter 2 ou mais variáveis.
O nome das restrições deve ser cons1, cons2, cons3, cons4, cons5, cons6, cons7, cons8, cons9, cons10.
Você não deve usar nomes de variáveis diferentes de x1, x2, x3, x4, x5, x6, x7, x8, x9, x10. Ou seja, não use nomes relativos ao problema em linguagem natural.
Em caso de uma variável não ser usada em uma restrição mas ser usada em outra, ela deve constar como 0 na restrição em que não é usada.
Sua resposta deve conter apenas o JSON com os valores das equações do problema sem nenhuma explicação adicional.
`;

  //Recuperando question do request
  const pergunta = req.body.question;

  //Chamada da API
  const json = client.chat.completions.create({
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

      console.log(mensagem);

      //Removendo ```json do início e do fim da mensagem caso exista
      if (mensagem.startsWith('```json')) {
        mensagem = mensagem.substring(7);
      }
      if (mensagem.endsWith('```')) {
        mensagem = mensagem.substring(0, mensagem.length - 3);
      }

      //Convertendo mensagem para json
      const json = JSON.parse(mensagem);

      const glpk = GLPK();

      const options = {
        msglev: glpk.GLP_MSG_ALL,
        presol: true,
        cb: {
          call: (progress: any) => console.log(progress),
          each: 1,
        },
      };

      //Convertendo type da função objetivo para o formato da biblioteca GLPK
      if (['max', 'Max', 'MAX'].includes(json.objective.direction)) {
        json.objective.direction = glpk.GLP_MAX;
      } else if (['min', 'Min', 'MIN'].includes(json.objective.direction)) {
        json.objective.direction = glpk.GLP_MIN;
      }

      //Convertendo type das restrições para o formato da biblioteca GLPK
      json.subjectTo.forEach((element: any) => {
        if (['<=', 'up', 'UP'].includes(element.bnds.type)) {
          element.bnds.type = glpk.GLP_UP;
        } else if (['=', 'fx', 'FX'].includes(element.bnds.type)) {
          element.bnds.type = glpk.GLP_FX;
        } else if (['>=', 'lo', 'LO'].includes(element.bnds.type)) {
          element.bnds.type = glpk.GLP_LO;
        }
      });

      //Adicionando atributo option
      json.options = options;

      //Exibindo json em formato de string
      console.log(JSON.stringify(json, null, 2));

      return json;
    })
    .catch((error: any) => console.error(error));

  return res.status(200).json(json);
}