import React from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
import { MaterialIcons } from "@expo/vector-icons";
const { height } = Dimensions.get("screen");
import { Box, VStack, Heading, Input, Button, HStack, Text } from "native-base";
import { useAppSelector } from "../hooks";
import Field from "./Field";

export default function Catagory() {
  const categories = useAppSelector((state) => state.category);

  return (
    <Box width={width - 40} backgroundColor="dark.900" padding={5} shadow={2}>
      <VStack space="4">
        <Heading size="sm">New Catagory</Heading>
        <Input
          size="xs"
          placeholder="New Catagory"
          variant="outline"
          focusOutlineColor="singletons.purple"
        />
        <Field />
        <Button backgroundColor="singletons.purple" mt={1}>
          TITLE FIELD: UNAMED FIELD
        </Button>
        <HStack justifyContent="space-between">
          <Button backgroundColor="singletons.purple" flex={1} marginRight={5}>
            ADD NEW FIELD
          </Button>
          <Button backgroundColor="singletons.purple" flex={1}>
            <Box display="flex" flexDir="row" color="white">
              <MaterialIcons
                name="delete"
                size={24}
                color="white"
                style={{ paddingRight: 5 }}
              />
              <Text color="white">REMOVE</Text>
            </Box>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
