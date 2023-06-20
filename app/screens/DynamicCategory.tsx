import React, { useLayoutEffect } from "react";
import { ScrollView, Button, Center, VStack, Text } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Dimensions } from "react-native";
import Machine from "../components/Machine";
import { addMachine, MachineFieldType } from "../features/machineSlice";
import { FieldState } from "../features/fieldSlice";

export default function DynamicCategory() {
  const navigation = useNavigation();
  const route = useRoute();
  const categories = useAppSelector((state) => state.category);
  const fields = useAppSelector((state) => state.field);
  const machines = useAppSelector((state) => state.machine);
  const { categoryId } = route.params;
  const appDispatch = useAppDispatch();

  const handleAddMachine = () => {
    const categoryIndex = categories.findIndex(
      (category) => category.id === categoryId
    );
    const categoryFields = categories[categoryIndex].fieldIds;
    const filteredFields = fields.filter((item) =>
      categoryFields.includes(item.id)
    );

    const fieldPayload: MachineFieldType[] = filteredFields.map(
      (item: FieldState) => ({
        fieldId: item.id,
        fieldType: item.type,
        fieldValue: "",
        fieldTitle: item.name,
      })
    );

    const machinePayload = {
      id: machines.length + 1,
      fields: fieldPayload,
      categoryID: categoryId,
      title: "",
    };

    appDispatch(addMachine(machinePayload));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button backgroundColor="white" onPress={handleAddMachine}>
          <MaterialIcons name="add" size={30} color="#4338ca" />
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Center flex={1}>
        <VStack
          space={2}
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          paddingY={(Dimensions.get("screen").height / 100) * 5}
        >
          {!machines.length && <Text>No items to display</Text>}
          {machines.map(({ id, ...machine }) => (
            <Machine key={id} machine={machine} />
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
}
