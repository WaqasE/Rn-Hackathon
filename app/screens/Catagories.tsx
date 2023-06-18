import React, { useEffect } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
import { ScrollView, Center, VStack, Text, Button, HStack } from "native-base";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addCategory } from "../features/categorySlice";
import Catagory from "../components/Catagory";

export default function Catagories() {
  const categories = useAppSelector((state) => state.category);
  const appDispatch = useAppDispatch();

  const addCatagory = () => {
    appDispatch(
      addCategory({ id: categories.length + 1, name: "New Catagory" })
    );
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
          {categories?.map(({ id }, index) => (
            <Catagory key={index} id={id} />
          ))}
          <Button
            width={width - (width / 100) * 5}
            backgroundColor="singletons.purple"
            mt={1}
            onPress={()=>addCatagory()}
          >
            ADD NEW CATEGORY
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
}
