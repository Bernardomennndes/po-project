import React from "react";
import { Parameters } from "./interface";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ConfigurationProps {
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
  handleExecute: () => void;
}

export default function Configuration({
  setParameters,
  handleExecute,
}: Readonly<ConfigurationProps>) {
  function handleChangeSimplexMethod(value: Parameters["metodo"]) {
    setParameters((prevParameters) => ({
      ...prevParameters,
      metodo: value,
    }));
  }

  function handleChangeFunctionType(value: Parameters["problema"]) {
    setParameters((prevParameters) => ({
      ...prevParameters,
      problema: value,
    }));
  }

  return (
    <div className="space-y-6 w-[280px]">
      <div className="flex flex-col gap-2">
        <label>Método</label>
        <Select
          defaultValue="Generalizado"
          onValueChange={(value) =>
            handleChangeSimplexMethod(value as Parameters["metodo"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Método" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Generalizado">Generalizado</SelectItem>
              <SelectItem value="Grande M">Grande M</SelectItem>
              <SelectItem value="Duas Fases">Duas Fases</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label>Operação da Função</label>
        <Select
          defaultValue="Maximize"
          onValueChange={(value) =>
            handleChangeFunctionType(value as Parameters["problema"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Maximize">Maximizar</SelectItem>
              <SelectItem value="Minimize">Minimizar</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <label>Variáveis</label>
          <Select defaultValue="2">
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label>Restrições</label>
          <Select defaultValue="3">
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">Aplicar Configurações</Button>
        <Button className="flex-1" onClick={() => handleExecute()}>
          Executar
        </Button>
      </div>
    </div>
  );
}
