// @ts-nocheck
"use client";
import axios from "axios";
import * as z from "zod";
import React from "react";
import { InferSelectModel } from "drizzle-orm";
import { Category, Tutor } from "@/utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "./image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";

const isTestMode = process.env.NEXT_PUBLIC_APP_TEST_MODE === "false";

const PREAMBLE = `You are a fictional character whose name is Dr. Mathis. You are a highly knowledgeable and passionate mathematician. You love solving complex problems and helping others understand math. You have a calm and patient demeanor, and you get excited when someone has a 'lightbulb moment.' You enjoy teaching topics ranging from basic arithmetic to advanced calculus and mathematical theory. You are currently talking to a human who is seeking to improve their math skills.`;

const SEED_CHAT = `Human: Hi Dr. Mathis, how's your day been?
Dr. Mathis: Oh, it's been quite fascinating! I've been working through some interesting problems in number theory, and I had the chance to teach a group of students about calculus. What about you?

Human: Just trying to improve my math skills. I struggle a bit with algebra. Any tips for simplifying equations?
Dr. Mathis: Absolutely! The key to simplifying equations is to always look for common factors and to think of equations as puzzles. Once you isolate the variable, everything else starts to fall into place. Would you like me to walk you through a few examples?

Human: That would be great, thanks! 
Dr. Mathis: Alright! Let’s start with a simple one: 2x + 6 = 12. First, you want to isolate x. So, divide both sides by 2… and voilà, you're well on your way!`;

// Infer the type of Category for selecting data
type TutorType = InferSelectModel<typeof Tutor>;
type CategoryType = InferSelectModel<typeof Category>;

interface TutorFormProps {
  initialData: TutorType | "";
  categories: CategoryType[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  instructions: z.string().min(200, {
    message: "Instruction require atleast 200 characters.",
  }),
  seed: z.string().min(200, {
    message: "Seed require atleast 200 characters.",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

export const TutorForm = ({ initialData, categories }: TutorFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isTestMode) {
      toast({
        title: "Test Mode Active",
        description: "App is in test mode. Tutor creation is disabled.",
        variant: "default",
        duration: 3000,
      });
      return;
    }

    try {
      if (initialData) {
        await axios.patch(`/api/tutor/${initialData.id}`, values);
      } else {
        await axios.post("/api/tutor", values);
      }

      toast({
        description: "Success.",
      });

      router.refresh();
      router.push("/dashboard/tutor");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
      console.error("Current Error: ", error);
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3>General Information</h3>
              <p className="text-sm text-muted-foreground">
                General information about your tutor.
              </p>
            </div>
            <Separator className="bg-primary/20" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      disabled={isLoading}
                      placeholder="Maths Tutor"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Tutor will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-background"
                      disabled={isLoading}
                      placeholder="Teaching Maths for 5 years and counting"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Tutor.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your AI Tutor.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-ld font-medium">Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Detailed instructions for AI behaviour.
              </p>
            </div>
            <Separator className="bg-primary/20" />
          </div>
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your tutor's personality and relevant
                  details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-background resize-none"
                    rows={7}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your tutor's personality and relevant
                  details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading}>
              {initialData ? "Edit your tutor" : "Create your tutor"}
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
