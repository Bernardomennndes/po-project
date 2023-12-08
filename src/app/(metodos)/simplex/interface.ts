export type Constraint = {
  name: string;
  vars: Vars[];
  bnds: {
    type: "LTE" | "GTE" | "EQ";
    ub: number;
    lb: number;
  };
};

export type Vars = {
  name: string;
  coef: number;
};

export type Parameters = {
  metodo: "Generalizado" | "Grande M" | "Duas Fases" | undefined;
  problema: "Maximize" | "Minimize" | undefined;
  objetivo: number[]; // Array dos índices das variáveis da função Z
  restricoes: number[][]; // Array de arrays de números indicando os índices de cada variável
  relacoes: Array<">=" | "=" | "<=">;
  rhs: number[];
  upper: Array<number | string>;
  lower: number[];
};
