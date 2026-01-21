
import React from 'react';
import { ResumeData, THEMES, ThemeId, LAYOUTS, LayoutId, FONT_OPTIONS, FontId } from '../types';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FileText, Palette, Check, Camera, Layout, Type } from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  tutorial?: {
    activeKey: string;
    title: string;
    body: string;
    step: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
    onSkip: () => void;
    canPrev: boolean;
    isLast: boolean;
  };
}

const ResumeForm: React.FC<Props> = ({ data, onChange, tutorial }) => {
    const renderTutorialBlock = (key: string) => {
      if (!tutorial || tutorial.activeKey !== key) return null;
      return (
        <div className="tutorial-inline">
          <p className="tutorial-step">Tutorial · Schritt {tutorial.step}/{tutorial.total}</p>
          <h3 className="tutorial-title">{tutorial.title}</h3>
          <p className="tutorial-body">{tutorial.body}</p>
          <div className="tutorial-actions">
            <button onClick={tutorial.onSkip} className="tutorial-skip">Tutorial beenden</button>
            <div className="tutorial-buttons">
              <button onClick={tutorial.onPrev} disabled={!tutorial.canPrev} className="tutorial-back">
                Zurück
              </button>
              <button onClick={tutorial.onNext} className="tutorial-next">
                {tutorial.isLast ? 'Fertig' : 'Weiter'}
              </button>
            </div>
          </div>
        </div>
      );
    };
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const updateCoverLetter = (field: string, value: string) => {
    onChange({
      ...data,
      coverLetter: { ...data.coverLetter, [field]: value }
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (section: 'experiences' | 'education' | 'skills') => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...(section === 'experiences' ? { company: '', position: '', period: '', description: '' } : {}),
      ...(section === 'education' ? { school: '', degree: '', period: '' } : {}),
      ...(section === 'skills' ? { name: '', level: 3 } : {}),
    };
    onChange({ ...data, [section]: [...data[section], newItem] });
  };

  const removeItem = (section: 'experiences' | 'education' | 'skills', id: string) => {
    onChange({ ...data, [section]: data[section].filter((item: any) => item.id !== id) });
  };

  const updateItem = (section: 'experiences' | 'education' | 'skills', id: string, field: string, value: any) => {
    onChange({
      ...data,
      [section]: data[section].map((item: any) => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const updateListField = (field: 'strengths', value: string) => {
    const items = value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    onChange({ ...data, [field]: items });
  };

  const addAdditionalSkill = () => {
    const newItem = { id: Math.random().toString(36).substr(2, 9), name: '' };
    onChange({ ...data, additionalSkills: [...data.additionalSkills, newItem] });
  };

  const updateAdditionalSkill = (id: string, value: string) => {
    onChange({
      ...data,
      additionalSkills: data.additionalSkills.map((item) => item.id === id ? { ...item, name: value } : item)
    });
  };

  const removeAdditionalSkill = (id: string) => {
    onChange({ ...data, additionalSkills: data.additionalSkills.filter((item) => item.id !== id) });
  };

  const addLanguage = () => {
    const newItem = { id: Math.random().toString(36).substr(2, 9), name: '', level: 3 };
    onChange({ ...data, languages: [...data.languages, newItem] });
  };

  const updateLanguage = (id: string, field: 'name' | 'level', value: string | number) => {
    onChange({
      ...data,
      languages: data.languages.map((item) => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const removeLanguage = (id: string) => {
    onChange({ ...data, languages: data.languages.filter((item) => item.id !== id) });
  };

  const languageLevelOptions = [
    { value: 1, label: 'Grundkenntnisse (A1/A2)' },
    { value: 2, label: 'Aufbaukenntnisse (B1)' },
    { value: 3, label: 'Gute Kenntnisse (B2)' },
    { value: 4, label: 'Sehr gute Kenntnisse (C1)' },
    { value: 5, label: 'Muttersprache (C2)' }
  ];

  const selectTheme = (id: ThemeId) => {
    onChange({ ...data, selectedThemeId: id });
  };

  const selectLayout = (id: LayoutId) => {
    onChange({ ...data, selectedLayoutId: id });
  };

  const selectFont = (id: FontId) => {
    onChange({ ...data, selectedFontId: id });
  };

  return (
    <div className="space-y-10 p-6 bg-white rounded-xl shadow-sm pb-32">
      {/* Layout Selection */}
      <section className={`${tutorial?.activeKey && tutorial.activeKey !== 'layout' ? 'tutorial-dim' : ''} ${tutorial?.activeKey === 'layout' ? 'tutorial-no-dim-preview' : ''}`} data-tour="layoutSection">
        {renderTutorialBlock('layout')}
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <Layout className="text-blue-600" size={20} />
          <h2 className="text-lg font-bold">Dokument-Layout</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LAYOUTS.map((layout) => (
            <button
              key={layout.id}
              onClick={() => selectLayout(layout.id)}
              className={`text-left p-3 rounded-xl border-2 transition-all ${
                data.selectedLayoutId === layout.id 
                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' 
                : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-bold uppercase tracking-tight ${data.selectedLayoutId === layout.id ? 'text-blue-700' : 'text-slate-700'}`}>
                  {layout.name}
                </span>
                {data.selectedLayoutId === layout.id && <Check className="text-blue-600" size={14} />}
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">{layout.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Font Selection */}
      <section className={`${tutorial?.activeKey && tutorial.activeKey !== 'font' ? 'tutorial-dim' : ''} ${tutorial?.activeKey === 'font' ? 'tutorial-no-dim-preview' : ''}`} data-tour="fontSection">
        {renderTutorialBlock('font')}
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <Type className="text-blue-600" size={20} />
          <h2 className="text-lg font-bold">Schriftart</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {FONT_OPTIONS.map((font) => (
            <button
              key={font.id}
              onClick={() => selectFont(font.id)}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                data.selectedFontId === font.id 
                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' 
                : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <span className={`text-lg mb-1 ${font.class}`}>Aa</span>
              <span className={`text-[8px] font-bold uppercase truncate w-full text-center ${data.selectedFontId === font.id ? 'text-blue-700' : 'text-slate-500'}`}>
                {font.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Design / Themes */}
      <section className={`${tutorial?.activeKey && tutorial.activeKey !== 'theme' ? 'tutorial-dim' : ''} ${tutorial?.activeKey === 'theme' ? 'tutorial-no-dim-preview' : ''}`} data-tour="themeSection">
        {renderTutorialBlock('theme')}
        <div className="flex items-center gap-2 mb-4 border-b pb-2">
          <Palette className="text-blue-600" size={20} />
          <h2 className="text-lg font-bold">Farbschema</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme.id)}
              className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
                data.selectedThemeId === theme.id 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-slate-100'
              }`}
            >
              <div 
                className="w-full h-8 rounded-lg mb-1 flex items-center justify-center relative shadow-inner overflow-hidden"
                style={{ backgroundColor: theme.previewColor }}
              >
                {data.selectedThemeId === theme.id && <Check className="text-white" size={12} />}
              </div>
              <span className={`text-[8px] font-bold uppercase truncate w-full text-center ${data.selectedThemeId === theme.id ? 'text-blue-700' : 'text-slate-500'}`}>
                {theme.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Personal Info */}
      <section className={`space-y-4 ${tutorial?.activeKey && tutorial.activeKey !== 'personalInfo' ? 'tutorial-dim' : ''}`} data-tour="personalInfoSection">
        {renderTutorialBlock('personalInfo')}
        <div className="flex items-center gap-2 mb-2 border-b pb-2">
          <User className="text-blue-600" size={20} />
          <h2 className="text-lg font-bold">Persönliche Daten</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative group shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative cv-photo">
                    {data.personalInfo.photo ? (
                        <img
                          src={data.personalInfo.photo}
                          className="w-full h-full object-cover object-center"
                          style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', display: 'block' }}
                          loading="eager"
                          decoding="async"
                        />
                    ) : (
                        <Camera className="text-slate-300" size={32} />
                    )}
                    <input 
                      id="photoUpload"
                      type="file" 
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                </div>
                  <label htmlFor="photoUpload" className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg shadow-lg cursor-pointer">
                    <Plus size={14} />
                  </label>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Vollständiger Name</label>
                    <input 
                        type="text" 
                        value={data.personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      data-tour="fullName"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Angestrebte Position</label>
                    <input 
                        type="text" 
                        value={data.personalInfo.jobTitle}
                        onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                      data-tour="jobTitle"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">E-Mail</label>
                    <input 
                        type="email" 
                        value={data.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      data-tour="email"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Telefon</label>
                    <input 
                        type="tel" 
                        value={data.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      data-tour="phone"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Adresse</label>
                    <input 
                        type="text" 
                        value={data.personalInfo.address}
                        onChange={(e) => updatePersonalInfo('address', e.target.value)}
                      data-tour="address"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Website</label>
                  <input 
                    type="text" 
                    value={data.personalInfo.website}
                    onChange={(e) => updatePersonalInfo('website', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
            </div>
        </div>
      </section>

      {/* Summary */}
      <section className={`space-y-4 ${tutorial?.activeKey && tutorial.activeKey !== 'summary' ? 'tutorial-dim' : ''}`} data-tour="summarySection">
        {renderTutorialBlock('summary')}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Kurzprofil / Zusammenfassung</label>
          <textarea 
            rows={6}
            value={data.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            data-tour="summary"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          />
        </div>
      </section>

      {/* Cover Letter Section */}
      <section className={`space-y-4 ${tutorial?.activeKey && tutorial.activeKey !== 'coverLetter' ? 'tutorial-dim' : ''}`} data-tour="coverLetterSection">
        {renderTutorialBlock('coverLetter')}
        <div className="flex items-center gap-2 mb-2 border-b pb-2">
          <FileText className="text-blue-600" size={20} />
          <h2 className="text-lg font-bold">Anschreiben</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Datum</label>
                <input 
                    type="text" 
                    value={data.coverLetter.date}
                    onChange={(e) => updateCoverLetter('date', e.target.value)}
                  data-tour="coverDate"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Betreffzeile</label>
                <input 
                    type="text" 
                    value={data.coverLetter.subject}
                    onChange={(e) => updateCoverLetter('subject', e.target.value)}
                  data-tour="coverSubject"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
            </div>
            <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Empfänger Adresse</label>
                <textarea 
                    rows={3}
                    value={data.coverLetter.recipient}
                    onChange={(e) => updateCoverLetter('recipient', e.target.value)}
                  data-tour="coverRecipient"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-mono text-[11px]"
                />
            </div>
            <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Inhalt des Anschreibens</label>
                <textarea 
                  rows={16}
                    value={data.coverLetter.text}
                    onChange={(e) => updateCoverLetter('text', e.target.value)}
                  data-tour="coverText"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none leading-relaxed"
                />
            </div>
        </div>
      </section>

      {/* Experience */}
      <section className={`space-y-4 ${tutorial?.activeKey && tutorial.activeKey !== 'experiences' ? 'tutorial-dim' : ''}`} data-tour="experiencesSection">
        {renderTutorialBlock('experiences')}
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold">Berufserfahrung</h2>
          </div>
          <button
            onClick={() => addItem('experiences')}
            data-tour="expAdd"
            className="text-blue-600 p-1 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        {data.experiences.map((exp, index) => (
          <div key={exp.id} className="p-4 bg-slate-50 rounded-xl space-y-3 relative group">
            <button 
                onClick={() => removeItem('experiences', exp.id)}
                className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"
            >
                <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <input 
                placeholder="Firma / Arbeitgeber"
                value={exp.company}
                onChange={(e) => updateItem('experiences', exp.id, 'company', e.target.value)}
                data-tour={index === 0 ? "expCompany" : undefined}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm outline-none"
              />
              <input 
                placeholder="Zeitraum (z.B. 2020 - Heute)"
                value={exp.period}
                onChange={(e) => updateItem('experiences', exp.id, 'period', e.target.value)}
                data-tour={index === 0 ? "expPeriod" : undefined}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm outline-none"
              />
            </div>
            <input 
              placeholder="Position / Tätigkeit"
              value={exp.position}
              onChange={(e) => updateItem('experiences', exp.id, 'position', e.target.value)}
              data-tour={index === 0 ? "expPosition" : undefined}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-sm outline-none"
            />
            <textarea 
              placeholder="Aufgaben & Erfolge..."
              rows={3}
              value={exp.description}
              onChange={(e) => updateItem('experiences', exp.id, 'description', e.target.value)}
              data-tour={index === 0 ? "expDescription" : undefined}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded text-sm outline-none resize-none"
            />
          </div>
        ))}
      </section>

      {/* Education */}
      <section className={`space-y-4 ${tutorial?.activeKey && tutorial.activeKey !== 'education' ? 'tutorial-dim' : ''}`} data-tour="educationSection">
        {renderTutorialBlock('education')}
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold">Bildungsweg</h2>
          </div>
          <button
            onClick={() => addItem('education')}
            data-tour="eduAdd"
            className="text-blue-600 p-1 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="p-4 bg-slate-50 rounded-xl grid grid-cols-2 gap-3 relative">
            <button 
                onClick={() => removeItem('education', edu.id)}
                className="absolute top-2 right-2 text-slate-300 hover:text-red-500"
            >
                <Trash2 size={14} />
            </button>
            <input 
              placeholder="Schule / Hochschule"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm col-span-2"
              value={edu.school}
              onChange={(e) => updateItem('education', edu.id, 'school', e.target.value)}
              data-tour={index === 0 ? "eduSchool" : undefined}
            />
            <input 
              placeholder="Abschluss / Titel"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm"
              value={edu.degree}
              onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
              data-tour={index === 0 ? "eduDegree" : undefined}
            />
            <input 
              placeholder="Zeitraum"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded text-sm"
              value={edu.period}
              onChange={(e) => updateItem('education', edu.id, 'period', e.target.value)}
              data-tour={index === 0 ? "eduPeriod" : undefined}
            />
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className={`space-y-4 ${tutorial?.activeKey && tutorial.activeKey !== 'skills' ? 'tutorial-dim' : ''}`} data-tour="skillsSection">
        {renderTutorialBlock('skills')}
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <Code className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold">Kompetenzen</h2>
          </div>
          <button
            onClick={() => addItem('skills')}
            data-tour="skillAdd"
            className="text-blue-600 p-1 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.skills.map((skill, index) => (
            <div key={skill.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl relative">
              <button 
                onClick={() => removeItem('skills', skill.id)}
                className="absolute top-1 right-1 text-slate-300 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
              <input 
                placeholder="Skill..."
                className="px-2 py-1 bg-white border border-slate-200 rounded text-xs outline-none"
                value={skill.name}
                onChange={(e) => updateItem('skills', skill.id, 'name', e.target.value)}
                data-tour={index === 0 ? "skillName" : undefined}
              />
              <div className="flex items-center gap-2">
                <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="1"
                    className="flex-1 accent-blue-600 h-1.5"
                    value={skill.level}
                    onChange={(e) => updateItem('skills', skill.id, 'level', parseInt(e.target.value))}
                  data-tour={index === 0 ? "skillLevel" : undefined}
                />
                <span className="text-[10px] font-black text-slate-400 w-4">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strengths */}
      <section className={`space-y-4 ${tutorial?.activeKey && tutorial.activeKey !== 'strengths' ? 'tutorial-dim' : ''}`} data-tour="strengthsSection">
        {renderTutorialBlock('strengths')}
        <div className="flex items-center gap-2 mb-2 border-b pb-2">
          <Check className="text-blue-600" size={20} />
          <h2 className="text-lg font-bold">Arbeitsweise & persönliche Stärken</h2>
        </div>
        <textarea
          rows={5}
          value={data.strengths.join('\n')}
          onChange={(e) => updateListField('strengths', e.target.value)}
          data-tour="strengths"
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          placeholder="Eine Stärke pro Zeile"
        />
      </section>

      {/* Additional Skills */}
      <section className={`space-y-4 ${tutorial?.activeKey && tutorial.activeKey !== 'additionalSkills' ? 'tutorial-dim' : ''}`} data-tour="additionalSkillsSection">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold">Zusatzkenntnisse</h2>
          </div>
          <button onClick={addAdditionalSkill} className="text-blue-600 p-1 hover:bg-blue-50 rounded-md transition-colors">
            <Plus size={20} />
          </button>
        </div>
        {renderTutorialBlock('additionalSkills')}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.additionalSkills.map((item) => (
            <div key={item.id} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl relative">
              <button
                onClick={() => removeAdditionalSkill(item.id)}
                className="absolute top-1 right-1 text-slate-300 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
              <input
                placeholder="Zusatzkenntnis..."
                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs outline-none"
                value={item.name}
                onChange={(e) => updateAdditionalSkill(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className={`space-y-4 ${tutorial?.activeKey && tutorial.activeKey !== 'languages' ? 'tutorial-dim' : ''}`} data-tour="languagesSection">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold">Sprachen</h2>
          </div>
          <button onClick={addLanguage} className="text-blue-600 p-1 hover:bg-blue-50 rounded-md transition-colors">
            <Plus size={20} />
          </button>
        </div>
        {renderTutorialBlock('languages')}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.languages.map((item) => (
            <div key={item.id} className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl relative">
              <button
                onClick={() => removeLanguage(item.id)}
                className="absolute top-1 right-1 text-slate-300 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
              <input
                placeholder="Sprache..."
                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs outline-none"
                value={item.name}
                onChange={(e) => updateLanguage(item.id, 'name', e.target.value)}
              />
              <select
                className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs outline-none"
                value={item.level}
                onChange={(e) => updateLanguage(item.id, 'level', parseInt(e.target.value))}
              >
                {languageLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumeForm;