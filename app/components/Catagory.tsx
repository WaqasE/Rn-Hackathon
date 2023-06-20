import React, { useEffect, useState } from "react";
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
  addFieldToCategory,
} from "../features/categorySlice";
import {
  addField,
  FieldState,
  FieldType,
  updateField,
} from "../features/fieldSlice";
import { useAppSelector, useAppDispatch } from "../hooks";

type categoryProps = {
  categoryId: number;
  fieldIds: Array<number>;
};

export default function Category({ categoryId, fieldIds }: categoryProps) {
  const categories = useAppSelector((state) => state.category);
  const fields = useAppSelector((state) => state.field);
  const appDispatch = useAppDispatch();
  const [isPopOver, setIsPopOver] = useState(false);
  const [categoryName, setCategoryName] = useState(
    categories[categoryId]?.name || ""
  );

  const handleCategoryName = (value: string) => {
    setCategoryName(value);
    appDispatch(updateCategory({ id: categoryId, name: value, fieldIds:fieldIds }));
  };

  const handleAddField = () => {
    let fieldPayload = {
      id: (fields.length || 0) + 1,
      name: "",
      type: FieldType.Text,
      isTitle: false,
    };
    appDispatch(addField(fieldPayload));
    let addFieldToCategoryPayload = {
      categoryId: categoryId,
      fieldId: fieldPayload.id,
    };
    appDispatch(addFieldToCategory(addFieldToCategoryPayload));
  };

  const getTitle = () => {
    let index = fields.findIndex((item, index) => {
      if (fieldIds.includes(item.id) && item.isTitle === true) {
        return index;
      }
      return -1;
    });
    if (index !== 1 && fields[index]?.name) {
      return fields[index]?.name;
    }
    return "UNNAMED FIELD";
  };

  const handleTitleUpdate = (item: FieldState) => {
    setIsPopOver(false);
    appDispatch(
      updateField({
        ...item,
        isTitle: true,
      })
    );
  };

  return (
    <Box width={width - 40} backgroundColor="dark.900" padding={5} shadow={2}>
      <VStack space="4">
        <Heading size="sm">{categoryName || "New Category" }</Heading>
        <Input
          size="xs"
          placeholder="New Category"
          variant="outline"
          focusOutlineColor="singletons.purple"
          onChangeText={handleCategoryName}
          value={categoryName}
        />
        {(fields || [])?.map((item, index) => {
          if (fieldIds.includes(item.id)) {
            return <Field key={index} item={item} categoryId={categoryId} />;
          }
        })}
        <Popover
          isOpen={isPopOver}
          trigger={(triggerProps) => (
            <Button
              {...triggerProps}
              backgroundColor="singletons.purple"
              mt={1}
              onPress={() => setIsPopOver(true)}
            >
              <Text color="white"> TITLE FIELD: {getTitle()}</Text>
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
              {(fields || [])?.map((item, index) => {
                if (fieldIds.includes(item.id)) {
                  return (
                    <Button
                      key={index}
                      background="white"
                      color="dark.900"
                      onPress={() => handleTitleUpdate(item)}
                    >
                      <Text>{item.name}</Text>
                    </Button>
                  );
                }
              })}
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
