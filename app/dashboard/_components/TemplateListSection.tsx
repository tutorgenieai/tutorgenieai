import Templates from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import { v4 as uuidv4 } from "uuid";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

function TemplateListSection({ userSearchInput }: any) {
  const [templateList, setTemplateList] = useState(Templates);

  useEffect(() => {
    if (userSearchInput) {
      setTemplateList(
        Templates.filter((template: TEMPLATE) =>
          template.name.toLowerCase().includes(userSearchInput.toLowerCase())
        )
      );
    } else {
      setTemplateList(Templates);
    }
  });

  return (
    <div className="bg-slate-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {templateList.map((item) => (
        <TemplateCard {...item} key={uuidv4()} />
      ))}
    </div>
  );
}

export default TemplateListSection;
