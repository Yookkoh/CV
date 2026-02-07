"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/app/admin/actions/projects";
import { Button } from "@/components/ui/Button";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { slugify } from "@/lib/utils";
import type { Project } from "@prisma/client";

interface Props {
  projects: Project[];
}

export function ProjectList({ projects }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    router.refresh();
  }

  async function handleSubmit(formData: FormData, id?: string) {
    if (id) {
      await updateProject(id, formData);
    } else {
      await createProject(formData);
    }
    setEditing(null);
    setShowNew(false);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {projects.map((proj) =>
        editing === proj.id ? (
          <ProjectForm
            key={proj.id}
            project={proj}
            onSubmit={(fd) => handleSubmit(fd, proj.id)}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <div
            key={proj.id}
            className="flex items-center justify-between p-3 rounded-xl bg-muted"
          >
            <div className="flex items-center gap-2">
              {proj.featured && (
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
              )}
              <div>
                <p className="font-medium text-sm">{proj.title}</p>
                <p className="text-xs text-muted-foreground">
                  /{proj.slug}
                  {!proj.isPublished && " (draft)"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditing(proj.id)}
                className="p-1.5 rounded-lg hover:bg-background transition-colors"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(proj.id)}
                className="p-1.5 rounded-lg hover:bg-background transition-colors text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )
      )}

      {showNew ? (
        <ProjectForm
          onSubmit={(fd) => handleSubmit(fd)}
          onCancel={() => setShowNew(false)}
        />
      ) : (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowNew(true)}
        >
          <Plus size={14} className="mr-1" />
          Add Project
        </Button>
      )}
    </div>
  );
}

function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project?: Project;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const inputClass =
    "w-full px-3 py-2 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/50";

  async function handleAction(formData: FormData) {
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  }

  return (
    <form action={handleAction} className="p-4 rounded-xl border border-border space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">
          {project ? "Edit Project" : "New Project"}
        </span>
        <button type="button" onClick={onCancel}>
          <X size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="title"
          placeholder="Title *"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!project) setSlug(slugify(e.target.value));
          }}
          required
          className={inputClass}
        />
        <input
          name="slug"
          placeholder="Slug *"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className={inputClass}
        />
      </div>
      <input
        name="shortDescription"
        placeholder="Short description *"
        defaultValue={project?.shortDescription}
        required
        className={inputClass}
      />
      <textarea
        name="content"
        placeholder="Content (Markdown) *"
        defaultValue={project?.content}
        rows={8}
        required
        className={inputClass}
      />
      <input
        name="techTags"
        placeholder="Tech tags (comma-separated)"
        defaultValue={project?.techTags.join(", ") || ""}
        className={inputClass}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="repoUrl"
          placeholder="Repo URL"
          defaultValue={project?.repoUrl || ""}
          className={inputClass}
        />
        <input
          name="liveUrl"
          placeholder="Live URL"
          defaultValue={project?.liveUrl || ""}
          className={inputClass}
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="hidden" name="featured" value="false" />
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={project?.featured ?? false}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="hidden" name="isPublished" value="false" />
          <input
            type="checkbox"
            name="isPublished"
            value="true"
            defaultChecked={project?.isPublished ?? true}
          />
          Published
        </label>
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
