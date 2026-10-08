"use client";

import { getProject, nextProject } from "@/data/projects";
import { useProjects } from "@/i18n/projects";
import CaseHero from "./CaseHero";
import CaseBlocks from "./CaseBlocks";
import NextProject from "./NextProject";

/** A case study in the visitor's language. The slug is the same in both. */
export default function CaseStudy({ slug }: { slug: string }) {
  const list = useProjects();
  const project = getProject(slug, list);
  if (!project) return null;

  return (
    <>
      <CaseHero project={project} />
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 md:pt-36">
        <CaseBlocks blocks={project.blocks} />
        <div className="mt-32 md:mt-44">
          <NextProject project={nextProject(project.slug, list)} />
        </div>
      </div>
    </>
  );
}
