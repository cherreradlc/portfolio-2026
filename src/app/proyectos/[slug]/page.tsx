import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/case/CaseStudy";
import Footer from "@/components/Footer";
import { PROJECTS, getProject } from "@/data/projects";
import { PROJECTS_EN } from "@/data/projects.en";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

// El sitio abre en inglés, así que el título de la pestaña también.
export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug, PROJECTS_EN);
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
        <Case params={params} />
      </Suspense>
      <div className="mt-10 px-4 pt-2 pb-8 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Footer />
        </div>
      </div>
    </main>
  );
}

async function Case({ params }: { params: PageProps<"/proyectos/[slug]">["params"] }) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return <CaseStudy slug={slug} />;
}
