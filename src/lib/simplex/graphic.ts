import  { solve } from './gauss-jordan'

export interface GraphicProps {
  restricoes: number[][],
  solucao: any,
  relacoes: string[]
}

export interface Equacao {
  x1: number,
  x2: number,
  b: number
}

export interface Ponto {
  x: number,
  y: number
}

// Variáveis para controlar o tamanho gráfico
export var MIN_VALUE_Y = 0;
export var MIN_VALUE_X = 0;
export var MAX_VALUE_Y = 8;
export var MAX_VALUE_X = 8;

// Encontrar os pontos onde eles tocam os eixos
export const findLimits = ({ x1, x2, b }: Equacao) : Ponto[] => { 

 // Torna o gráfico dinamico se algum ponto exceder o máximo estabelecido
 if(x1 > MAX_VALUE_X) MAX_VALUE_X = x1 + 2;
 if(x2 > MAX_VALUE_Y) MAX_VALUE_Y = x2 + 2;
 if(b / x1 > MAX_VALUE_X && b / x1 < 20) MAX_VALUE_Y = MAX_VALUE_X = (b / x1) + 2
 if(b / x2 > MAX_VALUE_Y && b / x2 < 20) MAX_VALUE_Y = (b / x2) + 2
  
 /**
  * 
  * Se houver alguma restrição com apenas uma variável ele define
  * a outra como sendo o MAX ou MIN para desenhar uma linha reta
  * no gráfico
  * 
  *  */ 
 if(x1 === 0) return [
   { x: MIN_VALUE_X, y: b / x2 },
   { x: MAX_VALUE_X, y: b / x2 }
 ]
 if(x2 === 0) return [
   { x: b / x1, y: MIN_VALUE_Y },
   { x: b / x1, y: MAX_VALUE_Y }
 ]
 if(x1 < 0) return[
   { x: 0, y: b / x2 },
   { x: -b + MAX_VALUE_Y, y: MAX_VALUE_Y }
 ]
 if(x2 < 0)return[
   { x: MAX_VALUE_X, y: -b + MAX_VALUE_X },
   { x: b / x1, y: 0 }
 ]
 return [
   { x: 0, y: b / x2 },
   { x: b / x1, y: 0 }
 ]
}

// Encontra o ponto de interseção entre duas retas
export const findIntersection = (equacoes: number[][]) : Ponto => {  
  let a : number[] = [], b : number[] = [], c : number[] = []
  a.push(equacoes[0][0], equacoes[0][1])
  b.push(equacoes[1][0], equacoes[1][1])
  c.push(equacoes[0][2], equacoes[1][2])
  let ponto : number[] = []
  try{
    ponto = solve([a, b], c)
  }
  catch{
    return { x: Infinity, y: Infinity } 
  }
  return { x : ponto[0], y : ponto[1] }
  
}

export const findAvailablePoints = (pontos : Ponto[], restricoes : number[][], relacoes : string[]) : Ponto[] => {
  const availablePoints : Ponto[] = []
  pontos.forEach(ponto => {
    let available : boolean = true;
    restricoes.forEach((equacao, index) => {
      switch (relacoes[index]){
        case "<=":
          if(!(equacao[0]*ponto.x + equacao[1]*ponto.y <= equacao[2])) {
            available = false;
            break;
          }
        case "=":
          if(!(equacao[0]*ponto.x + equacao[1]*ponto.y === equacao[2])){
            available = false;
            break
          }
        case ">=":
          if(!(equacao[0]*ponto.x + equacao[1]*ponto.y >= equacao[2])){
            available = false;
            break
          }
          default:
            break;
      }
      if(!available) return 
    });
    if(available) {
      availablePoints.push(ponto)
    }
  });

  return availablePoints
}
