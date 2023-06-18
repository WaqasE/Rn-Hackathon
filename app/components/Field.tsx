import React from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
import { Box, Pressable, Input, Flex, Button } from "native-base";
import { useAppSelector, useAppDispatch } from "../hooks";
import { MaterialIcons } from "@expo/vector-icons";


export default function Category() {
  const categories = useAppSelector((state) => state.category);
  const appDispatch = useAppDispatch();



  return (
    <Flex flexWrap="wrap" direction="row">
      <Input
        size="xs"
        placeholder="Field"
        variant="outline"
        focusOutlineColor="singletons.purple"
        flex={1}
      />
      <Button
        variant="outline"
        colorScheme="primary"
        borderRadius={0}
        borderLeftWidth={0}
        borderRightWidth={0}
      >
        TEXT
      </Button>
      <Button
        background="singletons.purple"
        borderBottomLeftRadius={0}
        borderTopLeftRadius={0}
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </Button>
    </Flex>
  );
}
