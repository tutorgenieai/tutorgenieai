import { db } from "@/utils/db"; // Import your db connection
import { Category } from "@/utils/schema"; // Import the Category table definition
import { config } from "dotenv";

config({ path: ".env.local" });

async function seed() {
  try {
    // Define the categories to insert
    const categories = [
      { name: "Popular Subjects" },
      { name: "General Subjects" },
      { name: "College Subjects" },
    ];

    // Insert the categories into the "category" table
    await db.insert(Category).values(categories);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

seed();
