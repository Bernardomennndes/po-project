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

const TableLine = ({ numVariables } : { numVariables: number }) => {
  return(
    <Flex align="center" gap="2">
      {
      Array.from({ length: numVariables }).map((_, index) => (
        index !== numVariables - 1 ? (
          <Flex align="center" direction="row" gap="1" key={index}>
            <Input type="text" style={{ width: 40 }} placeholder="0"/>
            <Text>x{index + 1} +</Text> 
          </Flex>
        )
        :
        (
          <Flex align="center" direction="row" gap="1" key={index}>
            <Input type="text" style={{ width: 40 }} placeholder="0"/> 
            <Text>x{index + 1}</Text>
            <Select>
              <SelectTrigger className="w-[60px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">&le;</SelectItem>
                  <SelectItem value="banana">&ge;</SelectItem>
                  <SelectItem value="blueberry">=</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input type="text" style={{ width: 40 }} placeholder="0"/>
          </Flex>
        )
      ))
      }
    </Flex>
  )
}

const ProblemTable = ({ numRestrictions: numRestictions, numVariables }: ProblemProps) => {
  return (
    <Flex gap="3" align="center" direction="column">
      {
        Array.from({ length: numRestictions }).map((_, index) => (
          <TableLine numVariables={numVariables} key={index}/>
        ))
      }

    </Flex>
  )
}

export default ProblemTable