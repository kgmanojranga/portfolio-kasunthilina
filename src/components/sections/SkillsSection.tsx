import profile from '../../data/profile';

const categoryIcons: Record<string, string> = {
  Languages: '{ }',
  Frameworks: '⚙',
  Databases: '⊙',
  'Web Services': '⇄',
  PDF: '⬡',
  Testing: '✓',
  'Build Tools': '▲',
  'Application Servers': '◈',
  OS: '⊞',
  'IDEs & Tools': '✦',
  'Version Control': '⑂',
  Cloud: '◯',
  'Project Management & CI/CD': '⊕',
};

const SkillsSection = () => {
  const { technologies } = profile;

  return (
    <section id="skills" className="section-padding bg-neutral-50">
      <div className="container-custom">
        <div className="mb-12">
          <p className="text-sm font-medium text-neutral-500 tracking-widest uppercase mb-3">
            Expertise
          </p>
          <h2 className="text-4xl font-bold text-neutral-900 tracking-tight">
            Skills & Technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {technologies.map((cat) => (
            <div
              key={cat.category}
              className="bg-white rounded-2xl border border-neutral-200 p-6 hover:border-neutral-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg text-neutral-400 font-mono leading-none">
                  {categoryIcons[cat.category] ?? '·'}
                </span>
                <h3 className="text-sm font-semibold text-neutral-700 tracking-wide uppercase">
                  {cat.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
