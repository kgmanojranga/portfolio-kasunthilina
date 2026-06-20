import { useState } from 'react';
import profile from '../../data/profile';

const ProjectsSection = () => {
  const { workExperiences } = profile;
  const [activeId, setActiveId] = useState(workExperiences[0].id);

  const active = workExperiences.find((e) => e.id === activeId)!;

  return (
    <section id="projects" className="section-padding bg-neutral-50">
      <div className="container-custom">

        <div className="mb-12">
          <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-2">Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">Projects</h2>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">

          {/* Left — project list */}
          <nav className="flex flex-col gap-1">
            {workExperiences.map((exp) => {
              const isActive = exp.id === activeId;
              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all ${
                    isActive ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  <p className={`text-sm font-semibold leading-snug ${isActive ? 'text-white' : 'text-neutral-800'}`}>
                    {exp.projectName}
                  </p>
                  <p className={`text-xs mt-0.5 ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`}>
                    {exp.period}
                  </p>
                </button>
              );
            })}
          </nav>

          {/* Right — project detail */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8">

            <div className="mb-6 pb-6 border-b border-neutral-100">
              <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-2">
                {active.period}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                {active.projectName}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-neutral-500">
                <span className="font-medium text-neutral-700">{active.role}</span>
                <span className="text-neutral-300">·</span>
                <span>{active.company}</span>
                <span className="text-neutral-300">·</span>
                <span>{active.location}</span>
              </div>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              {active.description}
            </p>

            <div className="mb-6">
              <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-3">
                Responsibilities
              </p>
              <ul className="flex flex-col gap-2">
                {active.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-sm text-neutral-600">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {active.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
