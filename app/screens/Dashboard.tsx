import React from "react";
import { ScrollView, VStack, Text, Button, Center } from "native-base";
import { useAppSelector } from "../hooks";

export default function Dashboard() {
  const categories = useAppSelector((state) => state.category);
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Center flex={1}>
        <VStack space={2} alignItems="center">
          <Text>No categories found</Text>
          <Button bgColor="singletons.purple" mt={1}>
            ADD A Category
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
}
