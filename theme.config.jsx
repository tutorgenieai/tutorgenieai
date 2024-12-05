import Logo from "./app/components/logo";

export default {
  logo: <Logo />,
  footer: {
    component: (
      <div className="border-t-[1px]">
        <div className="flex justify-evenly gap-4 p-2">
          <div>
            <div className="flex flex-col p-2 cursor-pointer text-lg">
              © {new Date().getFullYear()} StudyStudio Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    ),
  },
  editLink: {
    component: null,
  },
  feedback: {
    content: null,
  },
  primaryHue: 130,
  primarySaturation: 55,
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    autoCollapse: true,
  },
  darkMode: false,
  nextThemes: {
    defaultTheme: "light",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "StudyStudio",
    };
  },
};
