"use client";

import { PROJECTS } from "@/data/projects";
import { PROJECTS_EN } from "@/data/projects.en";
import { useLang } from "./lang";

/** The project list in the visitor's language. */
export function useProjects() {
  const { lang } = useLang();
  return lang === "es" ? PROJECTS : PROJECTS_EN;
}
