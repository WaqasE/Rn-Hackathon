import React, { useEffect } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
import { ScrollView, Center, VStack, Text, Button, HStack } from "native-base";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addCategory } from "../features/categorySlice";
import { FieldType } from "../features/fieldSlice";
import Catagory from "../components/Catagory";
import { addField } from "../features/fieldSlice";

export default function Catagories() {
  const categories = useAppSelector((state) => state.category);
  const fields = useAppSelector((state) => state.field);
  const appDispatch = useAppDispatch();

  const addCatagory = () => {
    let fieldPayload = {
      id: (fields.length || 0) + 1,
      name: "",
      type: FieldType.Text,
      isTitle: false,
    };
    appDispatch(addField(fieldPayload));
    let categoryPayload = {
      id: (categories.length || 0) + 1,
      name: "",
      fieldIds: [fieldPayload["id"]],
    };
    appDispatch(addCategory(categoryPayload));
  };

  return (
    <ScrollView>
      <Center flex={1}>
        <VStack
          space={2}
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          paddingY={(height / 100) * 5}
        >
          {!categories.length && <Text>No categories to display</Text>}
          {categories?.map(({ id, fieldIds }, index) => (
            <Catagory key={index} categoryId={id} fieldIds={fieldIds} />
          ))}
          <Button
            width={width - (width / 100) * 5}
            backgroundColor="singletons.purple"
            mt={1}
            onPress={() => addCatagory()}
          >
            ADD NEW CATEGORY
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
}
