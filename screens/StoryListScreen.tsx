import { SafeAreaView } from "react-native-safe-area-context";
import { Text} from "react-native";
import { useStoriesStore } from "../store/useStoriesStore";

export default function StoryListScreen({ navigation }: any) {
  const stories = useStoriesStore((state) => state.stories);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>
        Your Stories
      </Text>

      {stories.map((story) => (
        <Text
          key={story.id}
          onPress={() =>
            navigation.navigate("Writing", { storyId: story.id })
          }
          style={{ fontSize: 18, marginBottom: 12 }}
        >
          {story.title}
        </Text>
      ))}

      <Text
        onPress={() => navigation.navigate("NewStory")}
        style={{ marginTop: 24, color: "#2563eb", fontSize: 18 }}
      >
        + New Story
      </Text>
    </SafeAreaView>
  );
}
