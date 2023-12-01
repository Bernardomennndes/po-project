"use client";

import { Button } from "@/components/ui/button";
import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import React from "react";
import ProblemTable from "./table";

export default function Problem() {
  const searchParams = useSearchParams();

  let numRestrictions: number, numVariables: number;

  try {
    numRestrictions = Number.parseInt(
      searchParams?.get("res")?.toString() ?? ""
    );
    numVariables = Number.parseInt(searchParams?.get("var")?.toString() ?? "");
  } catch {
    return notFound();
  }

  if (
    numRestrictions < 2 ||
    numRestrictions > 10 ||
    numVariables > 10 ||
    numVariables < 2
  )
    return notFound();

  async function handleCallApi() {
    try {
      const response = await fetch("/api/simplex", { method: "GET" });

      console.log(await response.json());
    } catch {
      console.log("Api call failed.");
    }
  }

  return (
    <Container size="4" className="p-8">
      <Flex align="center" justify="center" direction="column" gap="5">
        <ProblemTable variables={2} constraints={3} />
      </Flex>
    </Container>
  );
}
