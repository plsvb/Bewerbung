
import React, { useLayoutEffect } from 'react';
import { ResumeData, THEMES, FONT_OPTIONS } from '../types';
import { Mail, Phone, MapPin, User, GraduationCap, Briefcase } from 'lucide-react';

interface Props {
  data: ResumeData;
  coverLetterRef: React.RefObject<HTMLDivElement>;
  coverPageRef: React.RefObject<HTMLDivElement>;
  cvPageRef: React.RefObject<HTMLDivElement>;
}

const ResumePreview: React.FC<Props> = ({ data, coverLetterRef, coverPageRef, cvPageRef }) => {
  const theme = THEMES.find(t => t.id === data.selectedThemeId) || THEMES[0];
  const font = FONT_OPTIONS.find(f => f.id === data.selectedFontId) || FONT_OPTIONS[0];
  const layout = data.selectedLayoutId || 'modern';
  
  const accentColor = theme.accent;
  const accentBg = theme.accentBg;
  const sidebarBg = theme.sidebar;
  const fontClass = font.class;

  const isDarkSidebar = sidebarBg.includes('slate-9') || sidebarBg.includes('black') || sidebarBg.includes('slate-8');
  const sidebarTextColor = isDarkSidebar ? 'text-white' : 'text-slate-800';
  const strengths = data.strengths ?? [];
  const additionalSkills = data.additionalSkills ?? [];

  useLayoutEffect(() => {
    const page = cvPageRef.current;
    if (!page) return;
    const content = page.querySelector('.cv-content') as HTMLElement | null;
    if (!content) return;

    const pageHeight = page.clientHeight;
    const contentHeight = content.scrollHeight;
    const scale = contentHeight > 0 ? Math.min(1, pageHeight / contentHeight) : 1;

    content.style.transform = `scale(${scale})`;
    content.style.transformOrigin = 'top left';
    content.style.width = `${100 / scale}%`;
  }, [data, layout]);

  const renderBulletList = (items: Array<string | { name: string }>, className: string = 'text-xs text-slate-600') => (
    <ul className={`list-disc ml-4 space-y-1 ${className}`}>
      {items.map((item, i) => (
        <li key={`${typeof item === 'string' ? item : item.name}-${i}`}>
          {typeof item === 'string' ? item : item.name}
        </li>
      ))}
    </ul>
  );

  const getLanguageLevelLabel = (level: number) => {
    switch (level) {
      case 5:
        return 'Muttersprache (C2)';
      case 4:
        return 'Sehr gut (C1)';
      case 3:
        return 'Gut (B2)';
      case 2:
        return 'Aufbau (B1)';
      default:
        return 'Grundkenntnisse (A1/A2)';
    }
  };

  const renderCV = () => {
    // --- CLASSIC LAYOUT (Centered Header, Elegant) ---
    if (layout === 'classic') {
      return (
        <div ref={cvPageRef} className={`a4-page cv-page bg-white p-16 flex flex-col ${fontClass} text-slate-800`}>
          <div className="cv-content">
          <header className="text-center mb-12">
            <h1 className={`text-4xl font-black uppercase tracking-[0.2em] mb-4 ${accentColor}`}>
              {data.personalInfo.fullName}
            </h1>
            <div className="h-px w-24 bg-slate-200 mx-auto mb-4"></div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{data.personalInfo.jobTitle}</p>
            <div className="flex justify-center gap-6 text-[10px] uppercase font-bold text-slate-500">
              <span className="flex items-center gap-1"><Mail size={12} className={accentColor}/> {data.personalInfo.email}</span>
              <span className="flex items-center gap-1"><Phone size={12} className={accentColor}/> {data.personalInfo.phone}</span>
              <span className="flex items-center gap-1"><MapPin size={12} className={accentColor}/> {data.personalInfo.address}</span>
            </div>
          </header>

          <main className="space-y-10">
            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] border-b pb-1 mb-6 ${accentColor}`}>Berufserfahrung</h3>
              <div className="space-y-8">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase">{exp.period}</div>
                    <div className="col-span-9">
                      <h4 className="text-sm font-black uppercase">{exp.position}</h4>
                      <p className={`text-[11px] font-bold mb-2 ${accentColor}`}>{exp.company}</p>
                      <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-2 gap-12">
              <section>
                <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] border-b pb-1 mb-4 ${accentColor}`}>Ausbildung</h3>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="text-xs font-black uppercase">{edu.school}</h4>
                      <p className="text-[11px] text-slate-500 italic mb-1">{edu.degree}</p>
                      <p className="text-[9px] font-bold text-slate-400">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] border-b pb-1 mb-4 ${accentColor}`}>Fähigkeiten</h3>
                <div className="space-y-3">
                  {data.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span>{skill.name}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i <= skill.level ? accentBg : 'bg-slate-100'}`}></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {(strengths.length > 0 || additionalSkills.length > 0) && (
              <div className="grid grid-cols-2 gap-12">
                {strengths.length > 0 && (
                  <section>
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] border-b pb-1 mb-4 ${accentColor}`}>Arbeitsweise & Stärken</h3>
                    {renderBulletList(strengths)}
                  </section>
                )}
                {additionalSkills.length > 0 && (
                  <section>
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] border-b pb-1 mb-4 ${accentColor}`}>Zusatzkenntnisse</h3>
                    {renderBulletList(additionalSkills)}
                  </section>
                )}
              </div>
            )}
          </main>
          </div>
        </div>
      );
    }

    // --- EXECUTIVE LAYOUT (Two Columns Body, Full Width Header) ---
    if (layout === 'executive') {
      return (
        <div ref={cvPageRef} className={`a4-page cv-page bg-white flex flex-col ${fontClass}`}>
          <div className="cv-content">
          <header className={`${sidebarBg} ${sidebarTextColor} p-12`}>
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-5xl font-black tracking-tighter uppercase mb-2 leading-none">{data.personalInfo.fullName}</h1>
                <p className={`text-sm font-bold tracking-[0.4em] uppercase opacity-70`}>{data.personalInfo.jobTitle}</p>
              </div>
              <div className="text-[10px] text-right font-bold uppercase tracking-widest space-y-1 opacity-60">
                <p>{data.personalInfo.email}</p>
                <p>{data.personalInfo.phone}</p>
                <p>{data.personalInfo.address}</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-12 grid grid-cols-12 gap-12">
            <div className="col-span-8 space-y-12">
               <section>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-4 text-slate-900`}>
                    <Briefcase size={16} className={accentColor}/> Erfahrung
                  </h2>
                  <div className="space-y-10">
                    {data.experiences.map(exp => (
                      <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100">
                        <div className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full ${accentBg}`}></div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-sm font-black uppercase tracking-tight">{exp.position}</h4>
                          <span className="text-[10px] font-bold text-slate-400">{exp.period}</span>
                        </div>
                        <p className={`text-[11px] font-bold uppercase mb-3 ${accentColor}`}>{exp.company}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
               </section>

               <section>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-4 text-slate-900`}>
                    <GraduationCap size={16} className={accentColor}/> Ausbildung
                  </h2>
                  <div className="space-y-6">
                    {data.education.map(edu => (
                      <div key={edu.id}>
                        <div className="flex justify-between">
                          <h4 className="text-xs font-black uppercase">{edu.school}</h4>
                          <span className="text-[10px] font-bold text-slate-400">{edu.period}</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{edu.degree}</p>
                      </div>
                    ))}
                  </div>
               </section>
            </div>

            <div className="col-span-4 space-y-12">
              <section>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 text-slate-900`}>Kern-Kompetenzen</h2>
                  <div className="space-y-4">
                    {data.skills.map(skill => (
                      <div key={skill.id} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase">
                          <span>{skill.name}</span>
                          <span className={accentColor}>{skill.level}/5</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${accentBg}`} style={{ width: `${(skill.level / 5) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
               </section>

               {strengths.length > 0 && (
                 <section>
                   <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 text-slate-900`}>Arbeitsweise & Stärken</h2>
                   {renderBulletList(strengths, 'text-xs text-slate-500')}
                 </section>
               )}

               {additionalSkills.length > 0 && (
                 <section>
                   <h2 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 text-slate-900`}>Zusatzkenntnisse</h2>
                   {renderBulletList(additionalSkills, 'text-xs text-slate-500')}
                 </section>
               )}
            </div>
          </main>
          </div>
        </div>
      );
    }

    // --- MINIMAL LAYOUT (Lightweight, Left Aligned) ---
    if (layout === 'minimal') {
      return (
        <div ref={cvPageRef} className={`a4-page cv-page bg-white p-14 flex flex-col ${fontClass} text-slate-800`}>
          <div className="cv-content">
          <header className="mb-10">
            <h1 className={`text-3xl font-black tracking-tight ${accentColor}`}>{data.personalInfo.fullName}</h1>
            <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mt-1">{data.personalInfo.jobTitle}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-bold text-slate-500">
              <span className="flex items-center gap-1"><Mail size={12} className={accentColor}/> {data.personalInfo.email}</span>
              <span className="flex items-center gap-1"><Phone size={12} className={accentColor}/> {data.personalInfo.phone}</span>
              <span className="flex items-center gap-1"><MapPin size={12} className={accentColor}/> {data.personalInfo.address}</span>
            </div>
          </header>

          <main className="space-y-8">
            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-5 ${accentColor}`}>Berufserfahrung</h3>
              <div className="space-y-6">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-black uppercase">{exp.position}</h4>
                      <span className="text-[10px] font-bold text-slate-400">{exp.period}</span>
                    </div>
                    <p className={`text-[11px] font-bold mb-2 ${accentColor}`}>{exp.company}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-2 gap-10">
              <section>
                <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${accentColor}`}>Ausbildung</h3>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="text-xs font-black uppercase">{edu.school}</h4>
                      <p className="text-[11px] text-slate-500">{edu.degree}</p>
                      <p className="text-[9px] font-bold text-slate-400">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${accentColor}`}>Fähigkeiten</h3>
                <div className="space-y-3">
                  {data.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span>{skill.name}</span>
                      <span className={accentColor}>{skill.level}/5</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {(strengths.length > 0 || additionalSkills.length > 0) && (
              <div className="grid grid-cols-2 gap-10">
                {strengths.length > 0 && (
                  <section>
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${accentColor}`}>Arbeitsweise & Stärken</h3>
                    {renderBulletList(strengths)}
                  </section>
                )}
                {additionalSkills.length > 0 && (
                  <section>
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${accentColor}`}>Zusatzkenntnisse</h3>
                    {renderBulletList(additionalSkills)}
                  </section>
                )}
              </div>
            )}
          </main>
          </div>
        </div>
      );
    }

    // --- SPLIT LAYOUT (Right Sidebar) ---
    if (layout === 'split') {
      return (
        <div ref={cvPageRef} className={`a4-page cv-page flex ${fontClass} text-slate-800`}>
          <div className="cv-content flex w-full">
          <div className="flex-1 p-12 bg-white space-y-10">
            <header>
              <h1 className={`text-3xl font-black tracking-tight ${accentColor}`}>{data.personalInfo.fullName}</h1>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{data.personalInfo.jobTitle}</p>
            </header>

            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6 flex items-center gap-4`}>
                Werdegang <span className="flex-1 h-px bg-slate-50"></span>
              </h3>
              <div className="space-y-8">
                {data.experiences.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-black uppercase tracking-tight">{exp.position}</h4>
                      <span className="text-[10px] font-bold text-slate-400">{exp.period}</span>
                    </div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${accentColor}`}>{exp.company}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6 flex items-center gap-4`}>
                Bildung <span className="flex-1 h-px bg-slate-50"></span>
              </h3>
              <div className="space-y-4">
                {data.education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between">
                      <h4 className="text-xs font-black uppercase">{edu.school}</h4>
                      <span className="text-[10px] font-bold text-slate-400">{edu.period}</span>
                    </div>
                    <p className={`text-[10px] font-bold ${accentColor}`}>{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>

            {(strengths.length > 0 || additionalSkills.length > 0) && (
              <section className="grid grid-cols-2 gap-10">
                {strengths.length > 0 && (
                  <div>
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 flex items-center gap-4`}>
                      Arbeitsweise & Stärken <span className="flex-1 h-px bg-slate-50"></span>
                    </h3>
                    {renderBulletList(strengths, 'text-xs text-slate-500')}
                  </div>
                )}
                {additionalSkills.length > 0 && (
                  <div>
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4 flex items-center gap-4`}>
                      Zusatzkenntnisse <span className="flex-1 h-px bg-slate-50"></span>
                    </h3>
                    {renderBulletList(additionalSkills, 'text-xs text-slate-500')}
                  </div>
                )}
              </section>
            )}
          </div>

          <aside className={`w-1/3 ${sidebarBg} ${sidebarTextColor} p-10 space-y-10`}>
            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${accentColor}`}>Kontakt</h3>
              <div className="space-y-3 text-xs">
                <div className="flex gap-3 items-center opacity-90"><Mail size={14}/> <span>{data.personalInfo.email}</span></div>
                <div className="flex gap-3 items-center opacity-90"><Phone size={14}/> <span>{data.personalInfo.phone}</span></div>
                <div className="flex gap-3 items-start opacity-90"><MapPin size={14} className="shrink-0 mt-0.5"/> <span>{data.personalInfo.address}</span></div>
              </div>
            </section>

            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${accentColor}`}>Kompetenzen</h3>
              <div className="space-y-4">
                {data.skills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-[9px] font-bold uppercase mb-1 opacity-90">
                      <span>{skill.name}</span>
                      <span>{skill.level * 20}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${accentBg}`} style={{ width: `${(skill.level / 5) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${accentColor}`}>Sprachen</h3>
              <div className="text-xs space-y-2 opacity-80">
                {data.languages.map((l) => (
                  <p key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-[9px] font-bold">{getLanguageLevelLabel(l.level)}</span>
                  </p>
                ))}
              </div>
            </section>
          </aside>
          </div>
        </div>
      );
    }

    // --- COMPACT LAYOUT (Space Efficient) ---
    if (layout === 'compact') {
      return (
        <div ref={cvPageRef} className={`a4-page cv-page bg-white p-10 flex flex-col ${fontClass} text-slate-800`}>
          <div className="cv-content">
          <header className="mb-6 flex justify-between items-start">
            <div>
              <h1 className={`text-3xl font-black tracking-tight ${accentColor}`}>{data.personalInfo.fullName}</h1>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1">{data.personalInfo.jobTitle}</p>
            </div>
            <div className="text-[10px] font-bold text-slate-500 space-y-1 text-right">
              <p>{data.personalInfo.email}</p>
              <p>{data.personalInfo.phone}</p>
              <p>{data.personalInfo.address}</p>
            </div>
          </header>

          <main className="grid grid-cols-12 gap-10">
            <section className="col-span-7 space-y-6">
              <div>
                <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${accentColor}`}>Berufserfahrung</h3>
                <div className="space-y-6">
                  {data.experiences.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-sm font-black uppercase tracking-tight">{exp.position}</h4>
                        <span className="text-[10px] font-bold text-slate-400">{exp.period}</span>
                      </div>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${accentColor}`}>{exp.company}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="col-span-5 space-y-6">
              <div>
                <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${accentColor}`}>Ausbildung</h3>
                <div className="space-y-3">
                  {data.education.map(edu => (
                    <div key={edu.id}>
                      <h4 className="text-xs font-black uppercase">{edu.school}</h4>
                      <p className={`text-[10px] font-bold ${accentColor}`}>{edu.degree}</p>
                      <p className="text-[9px] font-bold text-slate-400">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${accentColor}`}>Fähigkeiten</h3>
                <div className="space-y-2">
                  {data.skills.map(skill => (
                    <div key={skill.id} className="flex items-center justify-between text-[10px] font-bold uppercase">
                      <span>{skill.name}</span>
                      <span className={accentColor}>{skill.level}/5</span>
                    </div>
                  ))}
                </div>
              </div>
              {strengths.length > 0 && (
                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${accentColor}`}>Arbeitsweise & Stärken</h3>
                  {renderBulletList(strengths)}
                </div>
              )}
              {additionalSkills.length > 0 && (
                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${accentColor}`}>Zusatzkenntnisse</h3>
                  {renderBulletList(additionalSkills)}
                </div>
              )}
            </aside>
          </main>
          </div>
        </div>
      );
    }

    // --- MODERN LAYOUT (Vertical Sidebar) ---
    return (
      <div ref={cvPageRef} className={`a4-page cv-page flex ${fontClass} text-slate-800`}>
        <div className="cv-content flex w-full">
        {/* Sidebar */}
        <div className={`w-1/3 ${sidebarBg} ${sidebarTextColor} p-10 flex flex-col gap-10`}>
          <div className="text-center pb-8 border-b border-white/10">
            <h2 className="text-xl font-black uppercase tracking-tighter leading-none">{data.personalInfo.fullName}</h2>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${accentColor}`}>{data.personalInfo.jobTitle}</p>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${accentColor}`}>Kontakt</h3>
              <div className="space-y-4 text-xs">
                <div className="flex gap-3 items-center opacity-80"><Mail size={14}/> <span>{data.personalInfo.email}</span></div>
                <div className="flex gap-3 items-center opacity-80"><Phone size={14}/> <span>{data.personalInfo.phone}</span></div>
                <div className="flex gap-3 items-start opacity-80"><MapPin size={14} className="shrink-0 mt-0.5"/> <span>{data.personalInfo.address}</span></div>
              </div>
            </section>

            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${accentColor}`}>Expertise</h3>
              <div className="space-y-4">
                {data.skills.map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-[9px] font-bold uppercase mb-1 opacity-90">
                      <span>{skill.name}</span>
                      <span>{skill.level * 20}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${accentBg}`} style={{ width: `${(skill.level / 5) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${accentColor}`}>Sprachen</h3>
              <div className="text-xs space-y-2 opacity-80">
                {data.languages.map((l) => (
                  <p key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-[9px] font-bold">{getLanguageLevelLabel(l.level)}</span>
                  </p>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-12 bg-white space-y-12">
          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 flex items-center gap-4">
              Werdegang <span className="flex-1 h-px bg-slate-50"></span>
            </h3>
            <div className="space-y-10">
              {data.experiences.map(exp => (
                <div key={exp.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-[9px] font-black uppercase pt-1 text-slate-400">{exp.period}</div>
                  <div className="col-span-9">
                    <h4 className="text-sm font-black uppercase tracking-tight leading-none mb-1">{exp.position}</h4>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${accentColor}`}>{exp.company}</p>
                    <p className="text-xs text-slate-500 leading-relaxed border-l-2 border-slate-50 pl-4">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-8 flex items-center gap-4">
              Bildung <span className="flex-1 h-px bg-slate-50"></span>
            </h3>
            <div className="space-y-6">
              {data.education.map(edu => (
                <div key={edu.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-[9px] font-black uppercase text-slate-400">{edu.period}</div>
                  <div className="col-span-9">
                    <h4 className="text-xs font-black uppercase">{edu.school}</h4>
                    <p className={`text-[10px] font-bold ${accentColor}`}>{edu.degree}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-12 items-center bg-slate-300 py-12 overflow-y-auto h-full hide-scrollbar">
      
      {/* 1. ANSCHREIBEN (Layout-aware) */}
      <div ref={coverLetterRef} className={`a4-page p-20 flex flex-col text-slate-800 relative bg-white ${fontClass}`}>
        {layout === 'executive' ? (
          <div className={`absolute top-0 left-0 h-full w-2 ${accentBg}`}></div>
        ) : layout === 'classic' || layout === 'minimal' ? (
          <div className={`absolute top-0 left-0 w-full h-1 ${accentBg}`}></div>
        ) : (
          <div className={`absolute top-0 left-0 w-full h-2 ${accentBg}`}></div>
        )}
        <div className={`flex ${layout === 'classic' || layout === 'minimal' ? 'flex-col items-center text-center' : 'justify-between items-start'} mb-20`}>
          <div className="space-y-1">
            <h1 className={`text-2xl font-black uppercase tracking-tighter ${accentColor}`}>{data.personalInfo.fullName}</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{data.personalInfo.jobTitle}</p>
          </div>
          <p className="text-[10px] font-bold uppercase text-slate-400">{data.coverLetter.date}</p>
        </div>
        <div className="grid grid-cols-12 gap-10 mb-12">
          <div className="col-span-4 text-[10px] space-y-2 border-r pr-6">
            <p className="font-bold uppercase">Absender</p>
            <p>{data.personalInfo.address}</p>
            <p>{data.personalInfo.phone}</p>
            <p className={accentColor}>{data.personalInfo.email}</p>
          </div>
          <div className="col-span-8 text-xs italic opacity-60 flex items-end">
            <p className="whitespace-pre-line leading-relaxed">{data.coverLetter.recipient}</p>
          </div>
        </div>
        <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">{data.coverLetter.subject}</h2>
        <div className="flex-1 text-sm leading-relaxed whitespace-pre-line">{data.coverLetter.text}</div>
        <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between">
          <p className="font-bold">{data.personalInfo.fullName}</p>
        </div>
      </div>

      {/* 2. DECKBLATT (Layout-aware) */}
      {layout === 'classic' || layout === 'minimal' ? (
        <div ref={coverPageRef} className={`a4-page relative flex flex-col items-center justify-center text-slate-800 bg-white ${fontClass}`}>
          <div className={`absolute top-0 left-0 w-full h-1 ${accentBg}`}></div>
          <div className="text-center space-y-4 mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400">Bewerbung</p>
            <h2 className="text-2xl font-black leading-tight uppercase tracking-tight">{data.personalInfo.jobTitle}</h2>
          </div>
          <div className="space-y-4 mb-10 text-center">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">{data.personalInfo.fullName}</h1>
            <div className={`h-1.5 w-24 ${accentBg} mx-auto`}></div>
          </div>
          <div className="w-64 h-80 rounded-3xl overflow-hidden shadow-2xl mb-10 border-8 border-slate-50 cv-photo">
            {data.personalInfo.photo ? (
              <img
                src={data.personalInfo.photo}
                className="w-full h-full object-cover object-center"
                style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', display: 'block' }}
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center"><User size={80} className="text-slate-200"/></div>
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed text-center max-w-md">
            {data.personalInfo.summary}
          </p>
        </div>
      ) : (
        <div ref={coverPageRef} className={`a4-page relative flex text-slate-800 overflow-hidden bg-white ${fontClass}`}>
          <div className={`w-1/3 ${sidebarBg} ${sidebarTextColor} flex flex-col items-center justify-between py-24 px-10 relative`}>
              <div className="z-10 text-center space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30">Bewerbung</p>
                  <h2 className="text-2xl font-black leading-tight uppercase tracking-tight">{data.personalInfo.jobTitle}</h2>
              </div>
              <div className="z-10 space-y-6 text-[10px] uppercase font-bold tracking-widest opacity-80 w-full">
                  <div className="flex items-center gap-4"><MapPin size={16} className={accentColor}/> <span>{data.personalInfo.address}</span></div>
                  <div className="flex items-center gap-4"><Mail size={16} className={accentColor}/> <span>{data.personalInfo.email}</span></div>
              </div>
          </div>
          <div className="w-2/3 flex flex-col items-center justify-center p-20 text-center">
              <div className="space-y-4 mb-16">
                  <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{data.personalInfo.fullName.split(' ').map((n, i) => <span key={i} className={i === 0 ? "block" : `block ${accentColor}`}>{n}</span>)}</h1>
                  <div className={`h-2 w-24 ${accentBg} mx-auto`}></div>
              </div>
              <div className="w-72 h-96 rounded-3xl overflow-hidden shadow-2xl mb-12 border-8 border-slate-50 cv-photo">
                {data.personalInfo.photo ? (
                  <img
                    src={data.personalInfo.photo}
                    className="w-full h-full object-cover object-center"
                    style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', display: 'block' }}
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center"><User size={80} className="text-slate-200"/></div>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                {data.personalInfo.summary}
              </p>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC CV */}
      {renderCV()}
    </div>
  );
};

export default ResumePreview;