import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface BotAvatarProps {
  src: string | null;
}

export const BotAvatar = ({ src }: BotAvatarProps) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src ?? ""} className="object-cover" />
    </Avatar>
  );
};
