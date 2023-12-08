import { Flex, Separator } from "@radix-ui/themes";

import { ZFunction } from "./z-function";
import type {
  Configuration as ConfigurationState,
  Parameters,
} from "./interface";
import Configuration from "./configuration";
import VariablesTable from "./variables-table";

export interface ParametersTableProps {
  configuration: ConfigurationState;
  setConfiguration: React.Dispatch<React.SetStateAction<ConfigurationState>>;
  parameters: Parameters;
  setParameters: React.Dispatch<React.SetStateAction<Parameters>>;
  handleExecute: () => void;
  handleApplyConfiguration: () => void;
}

const ParametersTable = ({
  parameters,
  setParameters,
  configuration,
  setConfiguration,
  handleExecute,
  handleApplyConfiguration,
}: ParametersTableProps) => {
  return (
    <Flex justify="center" align="stretch" gap="4" className="w-full">
      <Configuration
        setParameters={setParameters}
        configuration={configuration}
        setConfiguration={setConfiguration}
        handleExecute={handleExecute}
        handleApplyConfiguration={handleApplyConfiguration}
      />

      <Flex direction="column" gap="6" className="flex-1 border-l pl-4">
        <ZFunction parameters={parameters} setParameters={setParameters} />

        <VariablesTable parameters={parameters} setParameters={setParameters} />
      </Flex>
    </Flex>
  );
};

export default ParametersTable;
