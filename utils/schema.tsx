import {
  pgTable,
  serial,
  timestamp,
  integer,
  text,
  varchar,
  uuid,
  foreignKey,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy"),
  createdAt: varchar("createdAt"),
});

export const UserSubscription = pgTable("userSubscription", {
  id: serial("id").primaryKey(),
  userId: varchar("userId"),
  stripeCustomerId: varchar("stripeCustomerId").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId").notNull(),
  stripePriceId: varchar("stripePriceId").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripeCurrentPeriodEnd"),
  stripeStatus: varchar("stripeStatus").notNull(),
  plan: varchar("plan"),
  credits: integer("credits").default(10000),
});

export const Category = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name"),
});

export const categoryRelations = relations(Category, ({ many }) => ({
  tutors: many(Tutor),
}));

export const Tutor = pgTable(
  "tutor",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: varchar("userId"),
    userName: varchar("userName"),
    src: varchar("src"),
    name: text("name"),
    description: text("description"),
    instructions: text("instructions"),
    seed: text("seed"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    categoryId: uuid("categoryId").references(() => Category.id),
  },
  (table) => {
    return {
      categoryIdx: index("category_idx").on(table.categoryId),
      nameIdx: index("name_idx").on(table.name),
    };
  }
);

export const tutorRelations = relations(Tutor, ({ one, many }) => ({
  category: one(Category, {
    fields: [Tutor.categoryId],
    references: [Category.id],
  }),
  messages: many(Message),
}));

export const roleEnum = pgEnum("role", ["user", "system"]);

export const Message = pgTable(
  "message",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    role: roleEnum("role"),
    content: text("content"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
    tutorId: uuid("tutorId").references(() => Tutor.id, {
      onDelete: "cascade",
    }),
    userId: varchar("userId"),
  },
  (table) => {
    return {
      tutorIdx: index("tutor_idx").on(table.tutorId),
    };
  }
);

export const messageRelations = relations(Message, ({ one }) => ({
  tutor: one(Tutor, {
    fields: [Message.tutorId],
    references: [Tutor.id],
  }),
}));

