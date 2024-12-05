"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useUserSubscription } from "@/app/(context)/TotalUsageContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateContentSection(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [AiOutput, setAiOutput] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useUser();
  const { totalUsage, setTotalUsage, credits, plan } = useUserSubscription();
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  /**
   * Used to generate content using AI
   * @param formData
   * @returns
   */
  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= credits) {
      setShowAlert(true);
      return;
    }

    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

    const result = await chatSession.sendMessage(FinalAIPrompt);

    setAiOutput(result?.response.text());
    await SaveInDb(
      JSON.stringify(formData),
      selectedTemplate?.slug,
      result?.response.text()
    );
    setTotalUsage(totalUsage + 1); // Increment usage
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD/MM/YYYY"),
    });

    console.log(result);
  };

  return (
    <div className="p-5 bg-slate-100">
      <Link href={"/dashboard"}>
        <Button className="flex gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(formData: any) => GenerateAIContent(formData)}
          loading={loading}
        />

        {/* Output Section */}
        <div className="col-span-2">
          <OutputSection AiOutput={AiOutput} />
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Usage Limit Reached</AlertDialogTitle>
            <AlertDialogDescription>
              You have reached your usage limit. Please upgrade your plan or
              contact support.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                router.push("/dashboard/billing");
                setShowAlert(false);
              }}
            >
              Upgrade Plan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CreateContentSection;
