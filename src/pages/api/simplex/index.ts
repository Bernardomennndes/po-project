const GLPK = require("glpk.js");
import type { GLPK as GLPKType, Result, Options } from "glpk.js";

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  solution: Result;
  iterations: Result[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const glpk = GLPK() as GLPKType;

  const iterations: Result[] = [];

  const options: Options = {
    msglev: glpk.GLP_MSG_ALL,
    presol: false,
    cb: {
      call: (iteration) => iterations.push(iteration),
      each: 1,
    },
  };

  const response = glpk.solve(
    {
      name: "RT",
      objective: {
        direction: glpk.GLP_MIN,
        name: "Z",
        vars: [
          { name: "x1", coef: 0.4 },
          { name: "x2", coef: 0.5 },
        ],
      },
      subjectTo: [
        {
          name: "constraint-1",
          vars: [
            { name: "x1", coef: 0.6 },
            { name: "x2", coef: 0.4 },
          ],
          bnds: { type: glpk.GLP_LO, ub: 0.0, lb: 6.0 },
        },
        {
          name: "constraint-2",
          vars: [
            { name: "x1", coef: 0.5 },
            { name: "x2", coef: 0.5 },
          ],
          bnds: { type: glpk.GLP_FX, ub: 6.0, lb: 6.0 },
        },
        {
          name: "constraint-3",
          vars: [
            { name: "x1", coef: 0.3 },
            { name: "x2", coef: 0.1 },
          ],
          bnds: { type: glpk.GLP_UP, ub: 2.7, lb: 0.0 },
        },
      ],
    },
    options
  );

  return res.status(200).json({ solution: response, iterations });
}
