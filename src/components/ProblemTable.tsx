import { Flex, Heading, Text } from '@radix-ui/themes'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export type ProblemProps = {
  numRestrictions: number,
  numVariables: number
}

const TableLine = ({ numVariables }: { numVariables: number }) => {
  return (
    <Flex align="center" gap="2">
      {
        Array.from({ length: numVariables }).map((_, index) => (
          index !== numVariables - 1 ? (
            <Flex align="center" direction="row" gap="1" key={index}>
              <Input type="text" className="w-[40px]" placeholder="0" />
              <Text>X<small>{index + 1}</small> +</Text>
            </Flex>
          )
            :
            (
              <Flex align="center" direction="row" gap="1" key={index}>
                <Input type="text" className="w-[40px]" placeholder="0" />
                <Text>X<small>{index + 1}</small></Text>
                <Select defaultValue='less'>
                  <SelectTrigger className="w-[60px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="less">&le;</SelectItem>
                      <SelectItem value="more">&ge;</SelectItem>
                      <SelectItem value="equal">=</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input type="text" style={{ width: 40 }} placeholder="0" />
              </Flex>
            )
        ))
      }
    </Flex>
  )
}

const ZFunction = ({ numVariables }: { numVariables: number }) => {
  return (
    <Flex gap="1" align="center" direction="row">
      <Text>Z =</Text>
      {
        Array.from({ length: numVariables }).map((_, index) => (
          <>
            <Input type="text" className="w-[40px]" placeholder="0" />
            <Text>X<small>{index + 1}</small> {index === numVariables - 1 ? "" : "+"}</Text>
          </>
        ))
      }
    </Flex>
  )
}

const ProblemTable = ({ numRestrictions: numRestrictions, numVariables }: ProblemProps) => {
  return (
    <Flex gap="3" align="center" direction="column">
      <Select defaultValue='max'>
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
      <ZFunction numVariables={numVariables} />
      {
        Array.from({ length: numRestrictions }).map((_, index) => (
          <TableLine numVariables={numVariables} key={index} />
        ))
      }

    </Flex>
  )
}

export default ProblemTable