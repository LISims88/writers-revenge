import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StoryListScreen from "./screens/StoryListScreen";
import NewStoryScreen from "./screens/NewStoryScreen";
import WritingScreen from "./screens/WritingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Stories"
          component={StoryListScreen}
          options={{ title: "Writer’s Revenge" }}
        />
        <Stack.Screen
          name="NewStory"
          component={NewStoryScreen}
          options={{ title: "New Story" }}
        />
        <Stack.Screen
          name="Writing"
          component={WritingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
