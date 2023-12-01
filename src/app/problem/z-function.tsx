import { Input } from "@/components/ui/input";
import { Flex, Text } from "@radix-ui/themes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ZFunction = ({ numVariables }: { numVariables: number }) => {
  return (
    <Flex gap="4" align="end">
      <Select defaultValue="max">
        <SelectTrigger>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="max">Maximizar</SelectItem>
            <SelectItem value="min">Minimizar</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Flex gap="2" align="end">
        <Text className="min-w-fit">Z =</Text>
        <Flex>
          {Array.from({ length: numVariables }).map((_, index) => (
            <Flex key={index} align="end" gap="1" className="w-[80px]">
              <Input type="text" className="w-[40px]" placeholder="0" />
              <Text>
                X<small>{index + 1}</small>{" "}
                {index === numVariables - 1 ? "" : "+"}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
