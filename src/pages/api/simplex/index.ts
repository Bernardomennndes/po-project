const GLPK = require("glpk.js");
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const glpk = GLPK();

  const options = {
    msglev: glpk.GLP_MSG_ALL,
    presol: true,
    cb: {
      call: (progress: any) => console.log(progress),
      each: 1,
    },
  };

  const response = glpk.solve(
    {
      name: "LP",
      objective: {
        direction: glpk.GLP_MAX,
        name: "obj",
        vars: [
          { name: "x1", coef: 0.6 },
          { name: "x2", coef: 0.5 },
        ],
      },
      subjectTo: [
        {
          name: "cons1",
          vars: [
            { name: "x1", coef: 1.0 },
            { name: "x2", coef: 2.0 },
          ],
          bnds: { type: glpk.GLP_UP, ub: 1.0, lb: 0.0 },
        },
        {
          name: "cons2",
          vars: [
            { name: "x1", coef: 3.0 },
            { name: "x2", coef: 1.0 },
          ],
          bnds: { type: glpk.GLP_UP, ub: 2.0, lb: 0.0 },
        },
      ],
    },
    options
  );

  console.log(response);

  return res.status(200).json({});
}
