import React from "react";
import { Dimensions } from "react-native";
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  HStack,
  Text,
  Popover,
} from "native-base";
import { useAppSelector, useAppDispatch } from "../hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { MachineFieldType, MachineState } from "../features/machineSlice";
import FieldRenderer from "./FieldRenderer";

export default function Machine({ machine }: MachineState) {
  const appDispatch = useAppDispatch();
  const { width, height } = Dimensions.get("screen");

  return (
    <Box width={width - 40} backgroundColor="dark.900" padding={5} shadow={2}>
      <VStack space="4">
        <Heading size="sm">{machine.title || "UNNAMED FIELD"}</Heading>
        {machine?.fields.map(
          ({ fieldId, fieldTitle, fieldType }: MachineFieldType) => (
            <FieldRenderer
              key={fieldId}
              type={fieldType}
              placeholder={fieldTitle}
            />
          )
        )}
      </VStack>
    </Box>
  );
}
