import React from "react";
import { ScrollView, VStack, Text, Button, Center } from "native-base";
import { useAppSelector } from "../hooks";
import { useNavigation, NavigationProp } from "@react-navigation/native";
// Define a generic type for your screen names
type AppScreens = {
  [key: string]: undefined;
};

export default function Dashboard() {
  const categories = useAppSelector((state) => state.category);
  const navigation = useNavigation<NavigationProp<AppScreens>>();
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Center flex={1}>
        <VStack space={2} alignItems="center">
          <Text>No categories found</Text>
          <Button
            onPress={() => {
              navigation.navigate("Manage Catagories");
            }}
            backgroundColor="singletons.purple"
            mt={1}
          >
            ADD A CATEGORY
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
}
