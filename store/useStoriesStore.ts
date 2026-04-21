import { create } from "zustand";

export type Story = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
};

type StoriesState = {
  stories: Story[];

  draftingMode: boolean;
  toggleDraftingMode: () => void;

  addStory: (title: string) => string;
  updateStoryContent: (id: string, content: string) => void;
  sessionActive: boolean;
  sessionStartWordCount: number;
  
  startSession: (currentWordCount: number) => void;
  endSession: () => void;
  
  lastSessionWords: number | null;
  clearLastSession: () => void;

  lastSessionMood?: string;
  setSessionMood: (mood: string) => void;
  clearSessionMood: () => void;


};

export const useStoriesStore = create<StoriesState>((set) => ({
  stories: [],
  draftingMode: true,
toggleDraftingMode: () =>
  set((state) => ({ draftingMode: !state.draftingMode })),

  sessionActive: false,
  sessionStartWordCount: 0,
  lastSessionWords: null,
  lastSessionMood: undefined,

setSessionMood: (mood) =>
  set(() => ({
    lastSessionMood: mood,
  })),

clearSessionMood: () =>
  set(() => ({
    lastSessionMood: undefined,
  })),

  startSession: (currentWordCount) =>
    set({
      sessionActive: true,
      sessionStartWordCount: currentWordCount,
    }),

  endSession: () =>
    set({
      sessionActive: false,
      sessionStartWordCount: 0,
    }),

  clearLastSession: () =>
    set({
      lastSessionWords: null,
    }),


  addStory: (title) => {
    const id = Date.now().toString();
    set((state) => ({
      stories: [
        ...state.stories,
        {
          id,
          title,
          content: "",
          createdAt: Date.now(),
        },
      ],
    }));
    return id;
  },

  updateStoryContent: (id, content) =>
    set((state) => ({
      stories: state.stories.map((story) =>
        story.id === id ? { ...story, content } : story
      ),
    })),
}));
