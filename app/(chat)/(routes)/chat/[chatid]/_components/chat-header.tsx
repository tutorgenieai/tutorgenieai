"use client";

import { Button } from "@/components/ui/button";
import { Tutor, Message } from "@/utils/schema";
import {
  ArrowLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { BotAvatar } from "./bot-avatar";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/hooks/use-toast";
import axios from "axios";

type TutorWithMessagesAndCount = typeof Tutor.$inferSelect & {
  messages: (typeof Message.$inferSelect)[];
  _count: {
    messages: number;
  };
};

interface ChatHeaderProps {
  tutor: TutorWithMessagesAndCount;
}

export const ChatHeader = ({ tutor }: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/tutor/${tutor.id}`);
      toast({
        description: "Success.",
      });
      router.refresh();
      // Add a delay to ensure the refresh completes before navigating
      setTimeout(() => {
        router.push("/dashboard/tutor");
      }, 500); // Adjust the delay as needed
    } catch (error) {
      toast({
        description: "Something went wrong.",
        variant: "destructive",
      });
      console.log("Error: ", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-300 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button
          onClick={() => router.back()}
          className="transition-all flex gap-2 mr-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <BotAvatar src={tutor.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-semibold">{tutor.name}</p>
            <div className="flex items-center text-xs text-gray-500">
              <MessagesSquare className="w-3 h-3 mr-1" color="#6b7280" />
              {tutor._count.messages}
            </div>
          </div>
          <p className="text-xs text-gray-500">Created by {tutor.userName}</p>
        </div>
      </div>
      {user?.id === tutor.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/dashboard/create/${tutor.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
