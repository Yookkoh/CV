"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createCategory,
  deleteCategory,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/app/admin/actions/skills";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import type { SkillCategory, Skill } from "@prisma/client";

type CategoryWithSkills = SkillCategory & { skills: Skill[] };

export function SkillsList({
  categories,
}: {
  categories: CategoryWithSkills[];
}) {
  const [newCatName, setNewCatName] = useState("");
  const [addingSkillTo, setAddingSkillTo] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<string | null>(null);
  const router = useRouter();

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const fd = new FormData();
    fd.set("name", newCatName);
    await createCategory(fd);
    setNewCatName("");
    router.refresh();
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm("Delete this category and all its skills?")) return;
    await deleteCategory(id);
    router.refresh();
  }

  async function handleAddSkill(formData: FormData) {
    await createSkill(formData);
    setAddingSkillTo(null);
    router.refresh();
  }

  async function handleUpdateSkill(id: string, formData: FormData) {
    await updateSkill(id, formData);
    setEditingSkill(null);
    router.refresh();
  }

  async function handleDeleteSkill(id: string) {
    if (!confirm("Delete this skill?")) return;
    await deleteSkill(id);
    router.refresh();
  }

  const inputClass =
    "px-3 py-2 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent/50";

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div key={cat.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{cat.name}</h3>
            <button
              onClick={() => handleDeleteCategory(cat.id)}
              className="p-1 rounded hover:bg-background text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div className="space-y-1.5 ml-4">
            {cat.skills.map((skill) =>
              editingSkill === skill.id ? (
                <form
                  key={skill.id}
                  action={(fd) => handleUpdateSkill(skill.id, fd)}
                  className="flex items-center gap-2"
                >
                  <input type="hidden" name="categoryId" value={cat.id} />
                  <input
                    name="name"
                    defaultValue={skill.name}
                    className={`flex-1 ${inputClass}`}
                    required
                  />
                  <input
                    name="level"
                    type="number"
                    min="0"
                    max="5"
                    defaultValue={skill.level ?? ""}
                    placeholder="Level"
                    className={`w-20 ${inputClass}`}
                  />
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                  <button type="button" onClick={() => setEditingSkill(null)}>
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted"
                >
                  <span className="text-sm">
                    {skill.name}
                    {skill.level !== null && (
                      <span className="text-muted-foreground ml-2">
                        ({skill.level}/5)
                      </span>
                    )}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingSkill(skill.id)}
                      className="p-1 rounded hover:bg-background"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-1 rounded hover:bg-background text-red-500"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              )
            )}
            {addingSkillTo === cat.id ? (
              <form
                action={handleAddSkill}
                className="flex items-center gap-2"
              >
                <input type="hidden" name="categoryId" value={cat.id} />
                <input
                  name="name"
                  placeholder="Skill name"
                  className={`flex-1 ${inputClass}`}
                  required
                  autoFocus
                />
                <input
                  name="level"
                  type="number"
                  min="0"
                  max="5"
                  placeholder="Level"
                  className={`w-20 ${inputClass}`}
                />
                <Button type="submit" size="sm">
                  Add
                </Button>
                <button
                  type="button"
                  onClick={() => setAddingSkillTo(null)}
                >
                  <X size={14} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setAddingSkillTo(cat.id)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-1"
              >
                <Plus size={12} />
                Add skill
              </button>
            )}
          </div>
        </div>
      ))}

      <form onSubmit={handleAddCategory} className="flex items-center gap-2 pt-4 border-t border-border">
        <input
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          placeholder="New category name"
          className={`flex-1 ${inputClass}`}
        />
        <Button type="submit" size="sm" variant="secondary">
          <Plus size={14} className="mr-1" />
          Add Category
        </Button>
      </form>
    </div>
  );
}
