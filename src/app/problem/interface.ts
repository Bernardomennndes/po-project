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