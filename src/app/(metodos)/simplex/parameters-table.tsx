import { Flex, Separator } from "@radix-ui/themes";

import { ZFunction } from "./z-function";
import { Parameters } from "./interface";
import Configuration from "./configuration";
import VariablesTable from "./variables-table";

export interface ParametersTableProps {
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
  handleExecute: () => void;
}

const ParametersTable = ({
  parameters,
  setParameters,
  handleExecute,
}: ParametersTableProps) => {
  return (
    <Flex justify="center" align="stretch" gap="4" className="w-full">
      <Configuration
        setParameters={setParameters}
        handleExecute={handleExecute}
      />

      <Flex direction="column" gap="6" className="flex-1 border-l pl-4">
        <ZFunction parameters={parameters} setParameters={setParameters} />

        <VariablesTable parameters={parameters} setParameters={setParameters} />
      </Flex>
    </Flex>
  );
};

export default ParametersTable;
