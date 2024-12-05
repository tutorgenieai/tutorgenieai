import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Tutor } from "@/utils/schema";
import Image from "next/image";
import { MessagesSquare, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TutorWithUsage = typeof Tutor.$inferSelect & {
  _count: {
    messages: number;
  };
  hasUsedPrompt: boolean;
};

interface TutorsProps {
  data: TutorWithUsage[];
  onTutorClick: (tutorId: string) => Promise<boolean>;
  isPlanLimited: boolean;
  remainingCredits: number;
  promptCount: number;
}

export const Tutors = ({
  data,
  onTutorClick,
  isPlanLimited,
  remainingCredits,
  promptCount,
}: TutorsProps) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-64 h-64">
          <Image fill className="greenscale" src="/empty.png" alt="Empty" />
        </div>
        <p className="text-base text-muted-foreground">No tutors found.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:container sm:mx-auto sm:px-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 lg:gap-6 pb-10">
        {data.map((item) => (
          <Card
            key={item.id}
            className="bg-white rounded-xl cursor-pointer shadow-md hover:scale-105 transition-all border relative h-full"
            onClick={() => onTutorClick(item.id)}
          >
            {isPlanLimited && (
              <div className="absolute -top-2 -right-2 z-10">
                <Badge
                  variant="secondary"
                  className="bg-primary text-white hover:text-black hover:border-black hover:border whitespace-nowrap text-[10px] sm:text-xs px-1 sm:px-2"
                >
                  <AlertCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  {item.hasUsedPrompt ? "Upgrade Required" : "1 Free Chat"}
                </Badge>
              </div>
            )}
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground space-y-2 p-2 sm:p-4 lg:p-6">
              <div className="relative w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                <Image
                  src={item.src ?? "/placeholder.png"}
                  fill
                  className="object-cover rounded-xl"
                  alt="Tutor"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="font-medium text-black text-sm sm:text-base lg:text-lg line-clamp-1">
                  {item.name}
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs lg:text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-[10px] sm:text-xs p-2 sm:p-4 text-muted-foreground mt-auto">
              <p className="lowercase text-gray-500 truncate max-w-[60px] sm:max-w-[100px]">
                @{item.userName}
              </p>
              <div className="flex items-center text-gray-500">
                <MessagesSquare
                  className="w-2 h-2 sm:w-3 sm:h-3 mr-1"
                  color="#6b7280"
                />
                {item._count.messages}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
