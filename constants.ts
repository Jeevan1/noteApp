export type TaskItem = {
  idx: string;
  text: string;
  keyItem?: string | number;
  completed: boolean;
};

export type Task = {
  idx: string;
  title: string;
  description: string;
  completed: boolean;
  taskItems: TaskItem[]; // Renamed to be more plural since it's an array
};

export type Note = {
  idx: string;
  source: string;
  title: string;
  description: string;
  time: string;
  tasks: Task[];
  image: any;
};

export const mydata: Note[] = [
  {
    idx: "1",
    source: "Trip Log",
    title: "Trip to Gosainkunda",
    description:
      "Documenting my incredible journey to Gosainkunda with friends. The trip was filled with adventure, breathtaking views, and unforgettable memories.",
    time: "Sunday, 1 January 2022",
    tasks: [
      {
        idx: "1",
        title: "Preparation Checklist",
        description: "A list of items to prepare before the trip.",
        completed: false,
        taskItems: [
          {
            idx: "1",
            text: "Pack warm clothes",
            keyItem: 1,
            completed: true,
          },
          {
            idx: "2",
            text: "Buy snacks for the journey",
            keyItem: 2,
            completed: false,
          },
          {
            idx: "3",
            text: "Charge all electronic devices",
            keyItem: 3,
            completed: false,
          },
          {
            idx: "4",
            text: "Check weather forecast",
            keyItem: 4,
            completed: false,
          },
        ],
      },
      {
        idx: "2",
        title: "Post-Trip Reflection",
        description: "Reflecting on the experiences after the trip.",
        completed: false,
        taskItems: [
          {
            idx: "1",
            text: "Write in travel journal",
            keyItem: 1,
            completed: true,
          },
          {
            idx: "2",
            text: "Upload photos to social media",
            keyItem: 2,
            completed: true,
          },
          {
            idx: "3",
            text: "Share stories with friends",
            keyItem: 3,
            completed: false,
          },
        ],
      },
    ],
    image: require("./assets/user.png"), // Assuming you have an image in the assets folder
  },
];
