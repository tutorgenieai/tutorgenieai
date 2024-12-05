import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CookiesPolicy = () => {
  const sections = [
    {
      title: "Cookies Policy",
      content: `At StudyStudio, we use cookies and similar technologies to provide you with the best possible experience. This policy explains how we use these technologies and the choices you have.`,
    },
    {
      title: "What are Cookies?",
      content: `Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences, understand how you use our platform, and improve your learning experience.`,
    },
    {
      title: "How We Use Cookies",
      content: `We use cookies to:
• Maintain your session and preferences while using StudyStudio
• Remember your AI tutor configurations and learning progress
• Analyze how you interact with our platform to improve our services
• Ensure the security and proper functioning of our platform
• Personalize your learning experience and content recommendations`,
    },
    {
      title: "Types of Cookies We Use",
      content: `Essential Cookies: Required for basic platform functionality and security.
Performance Cookies: Help us understand how users interact with StudyStudio.
Functionality Cookies: Remember your preferences and personalization settings.
AI Interaction Cookies: Store your AI tutor configurations and learning progress.`,
    },
    {
      title: "Your Choices",
      content: `Most web browsers allow you to control cookies through their settings. You can:
• Accept or decline cookies through your browser settings
• Delete existing cookies from your device
• Set your browser to alert you when cookies are being set

Please note that limiting cookies may affect some features of StudyStudio, particularly those related to AI tutor personalization.`,
    },
    {
      title: "Updates to This Policy",
      content: `We may update this Cookies Policy to reflect changes in our practices or for operational, legal, or regulatory reasons. We encourage you to review this policy periodically.`,
    },
    {
      title: "Contact Us",
      content: `If you have any questions about our use of cookies, please contact our support team.`,
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <h1 className="text-3xl font-semibold text-center mb-8 text-primary">
              Cookies Policy
            </h1>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="text-gray-700">
                  {index !== 0 && (
                    <h2 className="text-xl font-medium mb-4 text-gray-800">
                      {section.title}
                    </h2>
                  )}
                  <div
                    className="text-justify leading-relaxed"
                    style={{
                      textJustify: "inter-word",
                      hyphens: "auto",
                    }}
                  >
                    {section.content.split("\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookiesPolicy;
