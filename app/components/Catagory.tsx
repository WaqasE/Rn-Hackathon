import React, { useState } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
import { MaterialIcons } from "@expo/vector-icons";
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
import Field from "./Field";
import {
  updateCategory,
  removeCategory,
  addField,
  FieldState,
  FieldType,
  updateField,
} from "../features/categorySlice";
import { useAppSelector, useAppDispatch } from "../hooks";

type categoryProps = {
  categoryId: number;
  field: Array<FieldState>;
};

export default function Category({ categoryId, field = [] }: categoryProps) {
  const categories = useAppSelector((state) => state.category);
  const appDispatch = useAppDispatch();
  const [categoryName, setCategoryName] = useState(
    categories[categoryId]?.name || "New Category"
  );

  const handleCategoryName = (value: string) => {
    setCategoryName(value);
    const prevState = { ...categories[categoryId] };
    prevState.name = value;
    appDispatch(updateCategory(prevState));
  };

  const handleAddField = () => {
    const fieldTemp = {
      id: (field?.length || 0) + 1,
      name: "UNNAMED FIELD",
      type: FieldType.Text,
      isTitle: categories[categoryId]?.field?.length ? false : true,
      categoryId: categoryId,
    };
    appDispatch(addField(fieldTemp));
  };

  const getTitle = () => {
    let index = field.findIndex((item) => item.isTitle===true);
    if (index !== 1) {
      return field[index].name;
    }
    return "UNNAMED FIELD";
  };

  const handleTitleUpdate = (item: FieldState) => {
    appDispatch(
      updateField({
        categoryId: categoryId,
        ...item,
        isTitle: true,
      })
    );
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
        {(field || [])?.map((item, index) => (
          <Field key={index} item={item} categoryId={categoryId} />
        ))}
        <Popover
          trigger={(triggerProps) => (
            <Button
              {...triggerProps}
              backgroundColor="singletons.purple"
              mt={1}
            >
              <Text color="white">
                {" "}
                TITLE FIELD: {field.length ? getTitle() : "UNNAMED FIELD"}
              </Text>
            </Button>
          )}
        >
          <Popover.Content
            accessibilityLabel="Select Title Field"
            w="56"
            borderRadius={0}
          >
            <Popover.Arrow />
            <Popover.Body>
              {(field || [])?.map((item, index) => (
                <Button
                  key={index}
                  background="white"
                  color="dark.900"
                  onPress={() => handleTitleUpdate(item)}
                >
                  <Text>{item.name}</Text>
                </Button>
              ))}
            </Popover.Body>
          </Popover.Content>
        </Popover>
        <HStack justifyContent="space-between">
          <Button
            backgroundColor="singletons.purple"
            flex={1}
            marginRight={5}
            onPress={handleAddField}
          >
            ADD NEW FIELD
          </Button>
          <Button
            backgroundColor="singletons.purple"
            flex={1}
            onPress={() => appDispatch(removeCategory(categoryId))}
          >
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
