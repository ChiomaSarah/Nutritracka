import CopyButton from "@/components/CopyButton";
import HomeHeader from "@/components/HomeHeader";
import NutriGrid from "@/components/NutriGrid";
import RecentMeals from "@/components/RecentMeals";
import ShareButton from "@/components/ShareButon";
import ToggleReminder from "@/components/ToggleReminder";
import { getMeals, Meal } from "@/storage/meals";
import { globalStyles } from "@/styles/global";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
    console.log("Loaded meals:", data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>NutriTracka</Text>
        <ShareButton meals={meals} />
      </View>
      <HomeHeader />
      <NutriGrid meals={meals} />
      <CopyButton meals={meals} />
      <ToggleReminder />
      <RecentMeals meals={meals} onDelete={loadMeals} />
    </ScrollView>
  );
}
