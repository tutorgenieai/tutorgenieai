import { Toaster } from "@/components/ui/toaster";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-100">
      <div className="mx-auto max-w-4xl h-full w-full">
        {children}
        <Toaster />
      </div>
    </div>
  );
};

export default ChatLayout;
