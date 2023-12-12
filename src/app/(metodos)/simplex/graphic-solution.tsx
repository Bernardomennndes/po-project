import {
  VictoryArea,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme
} from "victory"

import {
  GraphicProps,
  findLimits,
  Ponto,
  MAX_VALUE_X,
  MAX_VALUE_Y,
  MIN_VALUE_X,
  MIN_VALUE_Y,
  findIntersection,
  findAvailablePoints
} from "../../../lib/simplex/graphic"


export default function GraphicSolution({ restricoes, solucao, relacoes }: GraphicProps) {
  const pontos: Ponto[][] = [];
  const interseccoes: Ponto[] = [];
  let pontosValidos: Ponto[] = [];

  // Preenche a matriz de pontos com os limites das equações para montar o gráfico 
  restricoes.forEach((value) => (
    pontos.push(findLimits({ x1: value[0], x2: value[1], b: value[2] }))
  ))

  //Adiciona as retas que correspondem aos eixos x1 e x2
  restricoes.push([1, 0, 0], [0, 1, 0])

  //Encontra todos os pontos de intersecção entre todas as retas
  restricoes.forEach((eq1, index1) => {
    restricoes.forEach((eq2, index2) => {
      if (index1 !== index2) {
        let ponto = findIntersection([eq1, eq2]);
        if (ponto.x != Infinity && ponto.y != Infinity) {
          interseccoes.push(ponto)
        }
      }
    })
  })

  //Encontra os pontos válidos que atendem todas as restrições
  pontosValidos = findAvailablePoints(interseccoes, restricoes, relacoes);
  // Se não for uma função linear ou tiver apenas uma equação não retornará um gráfico
  if (restricoes[0].length > 3 || restricoes.length < 2) return null
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domain={{ x: [MIN_VALUE_X, MAX_VALUE_X], y: [MIN_VALUE_Y, MAX_VALUE_Y] }}
    >
      {
        pontos.map((ponto, index) => (
          <VictoryLine
            key={index}
            style={{
              data: { stroke: "#c43a31", strokeWidth: 1 }
            }}
            data={[
              {
                x: ponto[0].x === Infinity ? MIN_VALUE_X : ponto[0].x,
                y: ponto[0].y === Infinity ? MIN_VALUE_Y : ponto[0].y
              },
              {
                x: ponto[1].x === Infinity ? MAX_VALUE_X : ponto[1].x,
                y: ponto[1].y === Infinity ? MAX_VALUE_X : ponto[1].y
              }
            ]}
          />
        ))
      }
      <VictoryScatter
        size={3}
        data={[
          { x: solucao[2]["Variaveis"][0], y: solucao[2]["Variaveis"][1] }
        ]}
        labels={() => "Z = " + Number(solucao[2]["FuncaoObjetivo"]).toFixed(2)}
      />
    </VictoryChart>
  )
}