import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseHero from "@/components/case/CaseHero";
import CaseBlocks from "@/components/case/CaseBlocks";
import NextProject from "@/components/case/NextProject";
import Footer from "@/components/Footer";
import { PROJECTS, getProject, nextProject } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.title, description: p.short } : {};
}

/**
 * Reading `params` happens inside a Suspense boundary so client navigations
 * between case studies can show the shell instantly; every slug is still
 * prerendered by generateStaticParams, so the fallback is rarely seen.
 */
export default function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  return (
    <main>
      <Suspense fallback={<div className="min-h-[100svh]" aria-busy="true" />}>
        <CaseStudy params={params} />
      </Suspense>
      <div className="mt-10 bg-brand-deep px-4 pt-2 pb-8 text-paper sm:px-8">
        <div className="mx-auto max-w-[1400px]">
          <Footer />
        </div>
      </div>
    </main>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/proyectos/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <CaseHero project={project} />
      <div className="mx-auto max-w-[1400px] px-4 pt-24 sm:px-8 md:pt-36">
        <CaseBlocks blocks={project.blocks} />
        <div className="mt-32 md:mt-44">
          <NextProject project={nextProject(project.slug)} />
        </div>
      </div>
    </>
  );
}
