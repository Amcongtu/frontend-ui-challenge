export type TabKey = "on-page" | "off-page" | "technical" | "general";

export const comunityData: Record<
  TabKey,
  {
    id: string;
    userName: string;
    title: string;
    text: string;
    likes: number;
    comments?: {
      id: string;
      userName: string;
      text: string;
    }[];
    images: string[];
  }[]
> = {
  "on-page": [
    {
      id: "1",
      userName: "admin",
      title: "SEO Basics",
      text: "Learn how to optimize...",
      likes: 10,
      comments: [
        {
          id: "123",
          userName: "test",
          text: "test",
        },
      ],
      images: [
        "https://picsum.photos/seed/picsum/600/288?random=1",
        "https://picsum.photos/seed/picsum/600/288?random=2",
      ],
    },
    {
      id: "2",
      userName: "Bob",
      title: "Meta Tags",
      text: "Understanding meta tags",
      likes: 8,
      comments: [],
      images: ["https://picsum.photos/seed/picsum/600/288?random=3"],
    },
  ],
  "off-page": [
    {
      id: "3",
      userName: "Charlie",
      title: "Backlink Strategy",
      text: "How to build backlinks",
      likes: 12,
      comments: [],
      images: [],
    },
  ],
  technical: [],
  general: [
    {
      id: "4",
      userName: "Dave",
      title: "SEO Trends",
      text: "What's new in SEO?",
      likes: 7,
      comments: [
        {
          id: "123",
          userName: "test",
          text: "test",
        },
      ],
      images: [],
    },
  ],
};
