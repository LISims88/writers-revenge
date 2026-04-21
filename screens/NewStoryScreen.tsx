import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput } from "react-native";
import { useState } from "react";
import { useStoriesStore } from "../store/useStoriesStore";

export default function NewStoryScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const addStory = useStoriesStore((state) => state.addStory);

  function handleStart() {
    if (!title.trim()) return;

    const storyId = addStory(title);
    navigation.navigate("Writing", { storyId });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Story title</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Untitled story"
        style={{
          borderBottomWidth: 1,
          fontSize: 18,
          paddingVertical: 8,
        }}
      />

      <Text
        onPress={handleStart}
        style={{ marginTop: 24, color: "#2563eb", fontSize: 18 }}
      >
        Start writing →
      </Text>
    </SafeAreaView>
  );
}
