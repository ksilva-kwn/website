import React, { createContext, useContext, useState, useEffect } from "react";

import ptbr from "@/i18n/pt-br.json";
import enus from "@/i18n/en-us.json";

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "pt-br";
    }
    return "pt-br";
  });

  const translations = language === "pt-br" ? ptbr : enus;

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};