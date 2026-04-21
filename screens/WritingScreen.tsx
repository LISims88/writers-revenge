import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Pressable, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useStoriesStore } from "../store/useStoriesStore";
import { Modal, View } from "react-native";
import { useState, useEffect } from "react";


function getWordCount(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

export default function WritingScreen({ route }: any) {
  const { storyId } = route.params;

  const story = useStoriesStore((state) =>
    state.stories.find((s) => s.id === storyId)
  );

  const updateStoryContent = useStoriesStore(
    (state) => state.updateStoryContent
  );
  const draftingMode = useStoriesStore((state) => state.draftingMode);
  const toggleDraftingMode = useStoriesStore(
  (state) => state.toggleDraftingMode
  );
    const sessionActive = useStoriesStore((state)=> state.sessionActive);
    const startSession = useStoriesStore((state)=> state.startSession);
    const endSession = useStoriesStore((state)=> state.endSession);
    const sessionStartWordCount = useStoriesStore((state)=> state.sessionStartWordCount);
    const lastSessionWords = useStoriesStore(
    (state) => state.lastSessionWords
  );
  const clearLastSession = useStoriesStore(
    (state) => state.clearLastSession
  );

  const [showMoodModal, setShowMoodModal] = useState(false);
  const setSessionMood = useStoriesStore(
    (state) => state.setSessionMood
  );
  const clearSessionMood = useStoriesStore(
    (state) => state.clearSessionMood
  );


  if (!story) {
    return (
      <SafeAreaView>
        <Text>Story not found</Text>
      </SafeAreaView>
    );
  }
  const wordCount = getWordCount(story.content);
  useEffect(() => {
  if (!sessionActive) {
    startSession(wordCount);
  }
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={50}
      >
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {lastSessionWords !== null && (
        <Pressable
          onPress={() => {
            clearLastSession();
            clearSessionMood();
          }}
          style={{
            backgroundColor: "#ecfeff",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <Text style={{ color: "#065f46", fontSize: 16 }}>
            You wrote {lastSessionWords} words 🎉
          </Text>
          <Text style={{ color: "#047857", marginTop: 4 }}>
            Tap to continue
          </Text>
        </Pressable>
      )}

        <Pressable
         onPress={() => {
            if (!sessionActive) {
              startSession(wordCount);
            } else {
              endSession();
              setShowMoodModal(true);
            }
          }}
        >
            <Text style={{ color: "#16a34a", marginBottom: 8 }}>
            {sessionActive ? "End Session" : "Start New Session"}
            </Text>
          </Pressable>
        <Pressable onPress={toggleDraftingMode}>
            <Text style={{ color: "#2563eb", marginBottom: 8 }}>
                {draftingMode ? "Turn Drafting Mode Off" : "Turn Drafting Mode On"}
            </Text>
        </Pressable>
                    {sessionActive && (
            <Text style={{ color: "#059669", marginBottom: 8 }}>
              Session words: {wordCount - sessionStartWordCount}
            </Text>
          )}
        <Text style={{ fontSize: 20, marginBottom: 4 }}>
            {story.title}
        </Text>

        <Text style={{ color: "#6b7280", marginBottom: 8 }}>
            {wordCount} words
        </Text>
            {draftingMode && (
            <Text style={{ color: "#dc2626", marginBottom: 8 }}>
                Drafting Mode ON
            </Text>
            )}
        <TextInput
            value={story.content}
            onChangeText={(text) => {
                if (draftingMode && text.length < story.content.length) {
                    return;
                }
                updateStoryContent(story.id, text);
                }}
            multiline
            autoFocus
            scrollEnabled={false}
            placeholder="Start writing…"
            style={{
              minHeight: 300,
              fontSize: 18,
              textAlignVertical: "top",
            }}
        />
          <Modal visible={showMoodModal} transparent animationType="fade">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.4)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 12,
                  width: "80%",
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 12 }}>
                  How did this session feel?
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  {["😄", "🙂", "😐", "😖", "😡"].map((emoji) => (
                    <Pressable
                      key={emoji}
                      onPress={() => {
                        setSessionMood(emoji);
                        setShowMoodModal(false);
                      }}
                    >
                      <Text style={{ fontSize: 32 }}>{emoji}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>

  );
}
