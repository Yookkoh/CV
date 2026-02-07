"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/app/admin/actions/experience";
import { Button } from "@/components/ui/Button";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Experience } from "@prisma/client";

interface Props {
  experiences: Experience[];
}

function formatDateForInput(date: Date): string {
  return new Date(date).toISOString().split("T")[0];
}

export function ExperienceList({ experiences }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Delete this experience?")) return;
    await deleteExperience(id);
    router.refresh();
  }

  async function handleSubmit(formData: FormData, id?: string) {
    if (id) {
      await updateExperience(id, formData);
    } else {
      await createExperience(formData);
    }
    setEditing(null);
    setShowNew(false);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {experiences.map((exp) =>
        editing === exp.id ? (
          <ExperienceForm
            key={exp.id}
            experience={exp}
            onSubmit={(fd) => handleSubmit(fd, exp.id)}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <div
            key={exp.id}
            className="flex items-center justify-between p-3 rounded-xl bg-muted"
          >
            <div>
              <p className="font-medium text-sm">{exp.roleTitle}</p>
              <p className="text-xs text-muted-foreground">
                {exp.company} &middot;{" "}
                {formatDateForInput(exp.startDate)}
                {exp.endDate
                  ? ` - ${formatDateForInput(exp.endDate)}`
                  : " - Present"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setEditing(exp.id)}
                className="p-1.5 rounded-lg hover:bg-background transition-colors"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-1.5 rounded-lg hover:bg-background transition-colors text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )
      )}

      {showNew ? (
        <ExperienceForm
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
          Add Experience
        </Button>
      )}
    </div>
  );
}

function ExperienceForm({
  experience,
  onSubmit,
  onCancel,
}: {
  experience?: Experience;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState(false);
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
          {experience ? "Edit Experience" : "New Experience"}
        </span>
        <button type="button" onClick={onCancel}>
          <X size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="roleTitle"
          placeholder="Role Title *"
          defaultValue={experience?.roleTitle}
          required
          className={inputClass}
        />
        <input
          name="company"
          placeholder="Company *"
          defaultValue={experience?.company}
          required
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          name="location"
          placeholder="Location"
          defaultValue={experience?.location || ""}
          className={inputClass}
        />
        <input
          name="startDate"
          type="date"
          defaultValue={
            experience ? formatDateForInput(experience.startDate) : ""
          }
          required
          className={inputClass}
        />
        <input
          name="endDate"
          type="date"
          defaultValue={
            experience?.endDate
              ? formatDateForInput(experience.endDate)
              : ""
          }
          className={inputClass}
          placeholder="End date (leave empty for current)"
        />
      </div>
      <input
        name="employmentType"
        placeholder="Employment Type (e.g. Full-time)"
        defaultValue={experience?.employmentType || ""}
        className={inputClass}
      />
      <textarea
        name="description"
        placeholder="Description"
        defaultValue={experience?.description || ""}
        rows={2}
        className={inputClass}
      />
      <textarea
        name="highlights"
        placeholder="Highlights (one per line)"
        defaultValue={experience?.highlights.join("\n") || ""}
        rows={3}
        className={inputClass}
      />
      <input
        name="techTags"
        placeholder="Tech tags (comma-separated)"
        defaultValue={experience?.techTags.join(", ") || ""}
        className={inputClass}
      />
      <div className="flex items-center gap-2">
        <input type="hidden" name="isPublished" value="false" />
        <input
          type="checkbox"
          name="isPublished"
          value="true"
          defaultChecked={experience?.isPublished ?? true}
          id="isPublished"
        />
        <label htmlFor="isPublished" className="text-sm">
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
