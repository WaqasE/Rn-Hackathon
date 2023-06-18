import React, { useState } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
import { MaterialIcons } from "@expo/vector-icons";
import { Box, VStack, Heading, Input, Button, HStack, Text } from "native-base";
import Field from "./Field";
import { updateCategory ,removeCategory} from "../features/categorySlice";
import { useAppSelector, useAppDispatch } from "../hooks";

type categoryProps = {
  id: number;
};

export default function Category({ id }: categoryProps) {
  const categories = useAppSelector((state) => state.category);
  const appDispatch = useAppDispatch();
  const [categoryName, setCategoryName] = useState(categories[id]?.name || "New Category");

  // const debouncedUpdateCategory = debounce((value) => {
  //   const prevState = { ...categories[id] };
  //   prevState.name = value;
  //   appDispatch(updateCategory(prevState));
  // }, 300); // Adjust the debounce delay as needed

  const handleCategoryName = (value: string) => {
    setCategoryName(value);
    const prevState = { ...categories[id] };
    prevState.name = value;
    appDispatch(updateCategory(prevState));
  };

  return (
    <Box width={width - 40} backgroundColor="dark.900" padding={5} shadow={2}>
      <VStack space="4">
        <Heading size="sm">{categoryName}</Heading>
        <Input
          size="xs"
          placeholder="New Category"
          variant="outline"
          focusOutlineColor="singletons.purple"
          onChangeText={handleCategoryName}
          value={categoryName}
        />
        <Field />
        <Button backgroundColor="singletons.purple" mt={1}>
          TITLE FIELD: UNNAMED FIELD
        </Button>
        <HStack justifyContent="space-between">
          <Button backgroundColor="singletons.purple" flex={1} marginRight={5}>
            ADD NEW FIELD
          </Button>
          <Button backgroundColor="singletons.purple" flex={1} onPress={()=>appDispatch(removeCategory(id))}>
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
