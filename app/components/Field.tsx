import React, { useState } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
import { Popover, Input, Flex, Button, Text, VStack } from "native-base";
import { useAppSelector, useAppDispatch } from "../hooks";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FieldState,
  FieldType,
  removeField,
  updateField,
} from "../features/categorySlice";
type FieldProps = {
  categoryId: number;
  item: FieldState;
};

export default function Field({ categoryId, item }: FieldProps) {
  const categories = useAppSelector((state) => state.category);
  const [fieldName, setFieldName] = useState("");
  const appDispatch = useAppDispatch();

  const handleFieldName = (value: string) => {
    setFieldName(value);
    appDispatch(updateField({ categoryId, id: item.id, name: value }));
  };

  const handleFieldTypeSelect = (fieldType: FieldType) => {
    appDispatch(
      updateField({
        id: item.id,
        categoryId: categoryId,
        type: fieldType,
      })
    );
  };

  const removeFieldHandler = () => {
    appDispatch(removeField({ categoryId: categoryId, id: item?.id }));
  };

  return (
    <Flex flexWrap="wrap" direction="row">
      <Input
        size="xs"
        placeholder="Field"
        variant="outline"
        focusOutlineColor="singletons.purple"
        flex={1}
        onChangeText={handleFieldName}
        value={fieldName}
      />
      <Popover
        trigger={(triggerProps) => (
          <Button
            {...triggerProps}
            variant="outline"
            colorScheme="primary"
            borderRadius={0}
            borderLeftWidth={0}
            borderRightWidth={0}
          >
            {item.type}
          </Button>
        )}
      >
        <Popover.Content
          accessibilityLabel="Select Title Field"
          w="56"
          borderRadius={0}
        >
          <Popover.Arrow />
          <VStack>
            {Object.values(FieldType).map((fieldType) => (
              <Button
                background="white"
                key={fieldType}
                onPress={() => handleFieldTypeSelect(fieldType)}
              >
                <Text>{fieldType}</Text>
              </Button>
            ))}
          </VStack>
        </Popover.Content>
      </Popover>

      <Button
        background="singletons.purple"
        borderBottomLeftRadius={0}
        borderTopLeftRadius={0}
        onPress={removeFieldHandler}
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </Button>
    </Flex>
  );
}
