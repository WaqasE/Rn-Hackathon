import React from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
const { height } = Dimensions.get("screen");
import { ScrollView, Center, VStack, Text, Button, HStack } from "native-base";
import { useAppSelector } from "../hooks";
import Catagory from "../components/Catagory";

export default function Catagories() {
  const categories = useAppSelector((state) => state.category);

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
          <Catagory />
          <Catagory />
          <Catagory />
          <Catagory />
          <Catagory />
          <Catagory />
          <Catagory />
          <Catagory />
          {/* <Text>No categories to display</Text> */}
          <Button
            width={width - (width / 100) * 5}
            backgroundColor="singletons.purple"
            mt={1}
          >
            ADD NEW CATEGORY
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
}
