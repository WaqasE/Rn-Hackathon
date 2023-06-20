import React, { useState } from "react";
import { Popover, Input, Flex, Button, Text, VStack } from "native-base";
import { useAppSelector, useAppDispatch } from "../hooks";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FieldState,
  FieldType,
  removeField,
  updateField,
} from "../features/fieldSlice";
import { removeFieldFromCategory } from "../features/categorySlice";
type FieldProps = {
  categoryId: number;
  item: FieldState;
};

export default function Field({ categoryId, item }: FieldProps) {
  const categories = useAppSelector((state) => state.category);
  const [fieldName, setFieldName] = useState(item?.name || "");
  const appDispatch = useAppDispatch();
  const [isPopOver, setIsPopOver] = useState(false);

  const handleFieldName = (value: string) => {
    setFieldName(value);
    appDispatch(updateField({ ...item, name: value }));
  };

  const handleFieldTypeSelect = (fieldType: FieldType) => {
    setIsPopOver(false);
    appDispatch(
      updateField({
        ...item,
        type: fieldType,
      })
    );
  };

  const removeFieldHandler = () => {
    appDispatch(
      removeFieldFromCategory({ categoryId: categoryId, fieldId: item?.id })
    );
    appDispatch(removeField(item.id));
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
        isOpen={isPopOver}
        trigger={(triggerProps) => (
          <Button
            {...triggerProps}
            variant="outline"
            colorScheme="primary"
            borderRadius={0}
            borderLeftWidth={0}
            borderRightWidth={0}
            onPress={() => setIsPopOver(true)}
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
