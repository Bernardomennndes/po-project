import { VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from "victory"

type GraphicProps = {
  restricoes: number[][],
  solution: number[]
}

interface Equacao {
  x1: number,
  x2: number,
  b: number
}

interface Ponto {
  x1: number,
  x2: number
}

// Variáveis para controlar o tamanho gráfico
var MIN_VALUE_Y = 0;
var MIN_VALUE_X = 0;
var MAX_VALUE_Y = 6;
var MAX_VALUE_X = 6;

// Encontrar os pontos onde eles tocam os eixos
const findLimits = ({ x1, x2, b }: Equacao): Ponto[] => {

  // Torna o gráfico dinamico se algum ponto exceder o máximo estabelecido
  if(x1 > MAX_VALUE_X) MAX_VALUE_X = x1;
  if(x2 > MAX_VALUE_Y) MAX_VALUE_Y = x2;

  /**
   * 
   * Se houver alguma restrição com apenas uma variável ele define
   * a outra como sendo o MAX ou MIN para desenhar uma linha reta
   * no gráfico
   * 
   *  */ 
  if(x1 === 0) return [
    { x1: MIN_VALUE_X, x2: b/x2 },
    { x1: MAX_VALUE_X, x2: b/x2 }
  ]
  if(x2 === 0) return [
    { x1: b/x1, x2: MIN_VALUE_Y },
    { x1: b/x1, x2: MAX_VALUE_Y }
  ]
  if(x1 < 0) return[
    { x1: 0, x2: b / x2 },
    { x1: -b + MAX_VALUE_Y, x2: MAX_VALUE_Y }
  ]
  if(x2 < 0)return[
    { x1: MAX_VALUE_X, x2: -b + MAX_VALUE_X },
    { x1: b / x1, x2: 0 }
  ]
  return [
    { x1: 0, x2: b / x2 },
    { x1: b / x1, x2: 0 }
  ]
}

export default function GraphicSolution({ restricoes, solution }: GraphicProps) {
  const pontos: Ponto[][] = [];
  // Preenche a matriz de pontos com os limites das euquações para montar o gráfico 
  restricoes.forEach((value) => (
    pontos.push(findLimits({ x1: value[0], x2: value[1], b: value[2] }))
  ))
  
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
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" }
            }}
            data={[
              { 
                x: ponto[0].x1 === Infinity ? MIN_VALUE_X : ponto[0].x1, 
                y: ponto[0].x2 === Infinity ? MIN_VALUE_Y : ponto[0].x2
              },
              { 
                x: ponto[1].x1 === Infinity ? MAX_VALUE_X : ponto[1].x1, 
                y: ponto[1].x2 === Infinity ? MAX_VALUE_X : ponto[1].x2
              }
            ]}
          />
        ))
      }
    </VictoryChart>
  )
}