interface SkillsListProps {
  skills: string[];
  title: string;
}

export default function SkillsList({ skills, title }: SkillsListProps) {
  return (
    <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-[var(--primary)]">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="text-[var(--text-color)]">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
} 