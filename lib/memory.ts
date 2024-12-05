import { Redis } from "@upstash/redis";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

export type TutorKey = {
  tutorName: string;
  modelName: string;
  userId: string;
};

export class MemoryManager {
  private static instance: MemoryManager;
  private history: Redis;
  private vectorDBClient: Pinecone;

  private constructor() {
    this.history = Redis.fromEnv();
    this.vectorDBClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }

  public async vectorSearch(recentChatHistory: string, tutorFileName: string) {
    const pineconeClient = <Pinecone>this.vectorDBClient;
    const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX!);

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!,
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Chat History",
    });

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });

    const similarDocs = await vectorStore
      .similaritySearch(recentChatHistory, 3, { fileName: tutorFileName })
      .catch((err) => {
        console.log("Failed to get vector search results", err);
      });

    return similarDocs;
  }

  public static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  private generateRedisTutorKey(tutorKey: TutorKey): string {
    return `${tutorKey.tutorName}-${tutorKey.modelName}-${tutorKey.userId}`;
  }

  public async writeToHistory(text: string, tutorKey: TutorKey) {
    if (!tutorKey || typeof tutorKey.userId === "undefined") {
      console.log("Tutor Key set incorrectly!");
      return "";
    }

    const key = this.generateRedisTutorKey(tutorKey);
    const result = await this.history.zadd(key, {
      score: Date.now(),
      member: text,
    });

    return result;
  }

  public async readLatestHistory(tutorKey: TutorKey): Promise<string> {
    if (!tutorKey || typeof tutorKey.userId === "undefined") {
      console.log("Tutor Key set incorrectly!");
      return "";
    }

    const key = this.generateRedisTutorKey(tutorKey);
    let result = await this.history.zrange(key, 0, Date.now(), {
      byScore: true,
    });

    result = result.slice(-30).reverse();
    const recentChats = result.reverse().join("\n");
    return recentChats;
  }

  public async seedChatHistory(
    seedContent: string,
    delimiter: string,
    tutorKey: TutorKey
  ) {
    const key = this.generateRedisTutorKey(tutorKey);

    if (await this.history.exists(key)) {
      console.log("Chat history already exists for this tutor");
      return;
    }

    const content = seedContent.split(delimiter);
    let counter = 0;

    for (const line of content) {
      await this.history.zadd(key, {
        score: counter,
        member: line,
      });
      counter += 1;
    }
  }
}
