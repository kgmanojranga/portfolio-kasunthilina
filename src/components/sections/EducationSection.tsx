import profile from '../../data/profile';

const EducationSection = () => {
  const { education, certifications, academicProjects } = profile;

  return (
    <section
      id="education"
      className="section-padding border-t border-neutral-100"
    >
      <div className="container-custom">
        <div className="mb-12">
          <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-2">
            Background
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            Education
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — degrees + certifications */}
          <div className="flex flex-col gap-10">
            {/* Degrees */}
            <div>
              <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-5">
                Degrees
              </p>
              <div className="flex flex-col gap-5">
                {education.map(edu => (
                  <div
                    key={edu.degree + edu.institution}
                    className="border border-neutral-200 rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-base font-semibold text-neutral-900">
                          {edu.degree}
                        </p>
                        <p className="text-sm text-neutral-600 mt-0.5">
                          {edu.field}
                        </p>
                      </div>
                      {edu.status && (
                        <span className="shrink-0 px-2.5 py-1 rounded-full bg-neutral-900 text-white text-xs font-medium">
                          {edu.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-neutral-700">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {edu.faculty}
                    </p>
                    <p className="text-xs text-neutral-400 mt-2">
                      {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-5">
                Certifications
              </p>
              <div className="flex flex-col gap-4">
                {certifications.map(cert => (
                  <div
                    key={cert.title}
                    className="flex gap-4 items-start p-5 border border-neutral-200 rounded-xl"
                  >
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 text-neutral-500 text-sm font-mono">
                      ✓
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 leading-snug">
                        {cert.title}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {cert.issuer}
                      </p>
                      {cert.issuedDate && (
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {cert.issuedDate}
                        </p>
                      )}
                      {cert.verifyUrl && (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs text-neutral-500 underline underline-offset-2 mt-2 hover:text-neutral-800 transition-colors"
                        >
                          Verify credential →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — academic projects */}
          <div>
            <p className="text-xs font-medium text-neutral-400 tracking-widest uppercase mb-5">
              Academic Projects
            </p>
            <div className="flex flex-col gap-5">
              {academicProjects.map(proj => (
                <div
                  key={proj.title}
                  className="p-6 border border-neutral-200 rounded-2xl"
                >
                  <p className="text-base font-semibold text-neutral-900 leading-snug mb-2">
                    {proj.title}
                  </p>
                  <p className="text-xs font-medium text-neutral-400 tracking-wide mb-3">
                    {proj.program}
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
