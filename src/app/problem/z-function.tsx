import { Input } from "@/components/ui/input";
import { Flex, Text } from "@radix-ui/themes";

export const ZFunction = ({ numVariables }: { numVariables: number }) => {
  return (
    <Flex gap="1" align="center" direction="row">
      <Text>Z =</Text>
      {Array.from({ length: numVariables }).map((_, index) => (
        <Flex key={index} align="center" gap="1">
          <Input type="text" className="w-[40px]" placeholder="0" />
          <Text>
            X<small>{index + 1}</small> {index === numVariables - 1 ? "" : "+"}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
