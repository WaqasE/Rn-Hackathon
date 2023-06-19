import React, { useEffect } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
import { ScrollView, Center, VStack, Text, Button, HStack } from "native-base";
import { useAppSelector, useAppDispatch } from "../hooks";
import { FieldType, addCategory } from "../features/categorySlice";
import Catagory from "../components/Catagory";

export default function Catagories() {
  const categories = useAppSelector((state) => state.category);
  const appDispatch = useAppDispatch();

  const addCatagory = () => {
    appDispatch(
      addCategory({
        id: categories.length + 1,
        name: "New Catagory",
        field: [
          { id: 1, name: "UNNAMED FIELD", type: FieldType.Text, isTitle: true },
        ],
      })
    );
  };

  useEffect(() => {
    categories?.map((item) => {
      console.log({ item }, item.field);
    });
  }, [categories]);

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
          {categories?.map(({ id, field }, index) => (
            <Catagory key={index} categoryId={id} field={field} />
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
