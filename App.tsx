
import React, { useState, useRef, useEffect } from 'react';
import { ResumeData, INITIAL_DATA, LAYOUTS, THEMES } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { generatePDF } from './services/pdfService';
import { Layout, Edit3, Sparkles, FileText, UserCheck, Files } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isExporting, setIsExporting] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showTutorialIntro, setShowTutorialIntro] = useState(true);
  const [tutorialRect, setTutorialRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const activeTourElementRef = useRef<HTMLElement | null>(null);

  const coverLetterRef = useRef<HTMLDivElement>(null);
  const coverPageRef = useRef<HTMLDivElement>(null);
  const cvPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
    setShowTutorialIntro(true);
  }, []);



  useEffect(() => {
    const formatDate = (value: Date) => {
      const day = String(value.getDate()).padStart(2, '0');
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const year = value.getFullYear();
      return `${day}.${month}.${year}`;
    };
    const today = formatDate(new Date());
    try {
      const raw = localStorage.getItem('cv-master-data');
      if (!raw) {
        setHasLoadedData(true);
        return;
      }
      const parsed = JSON.parse(raw) as ResumeData;
      const merged = { ...INITIAL_DATA, ...parsed };
      const edvSkillIndex = merged.skills?.findIndex((s) => /edv|word|excel/i.test(s.name)) ?? -1;
      if (edvSkillIndex >= 0) {
        const [edvSkill] = merged.skills.splice(edvSkillIndex, 1);
        const edvLabel = edvSkill?.name?.trim() || 'EDV: Word, Excel (Grundlagen)';
        const hasEdv = merged.additionalSkills?.some((s: any) =>
          typeof s === 'string' ? s.toLowerCase().includes('edv') : s.name?.toLowerCase().includes('edv')
        );
        if (!hasEdv) {
          const nextId = `a${(merged.additionalSkills?.length ?? 0) + 1}`;
          merged.additionalSkills = [...(merged.additionalSkills || []), { id: nextId, name: edvLabel } as any];
        }
      }

      if (Array.isArray(merged.additionalSkills) && typeof merged.additionalSkills[0] === 'string') {
        merged.additionalSkills = merged.additionalSkills.map((name: string, index: number) => ({
          id: `a${index + 1}`,
          name
        })) as any;
      }

      if (Array.isArray(merged.languages) && typeof merged.languages[0] === 'string') {
        merged.languages = (merged.languages as unknown as string[]).map((name: string, index: number) => ({
          id: `l${index + 1}`,
          name,
          level: 3
        })) as any;
      }
      if (!merged.coverLetter?.date) {
        merged.coverLetter = { ...merged.coverLetter, date: today };
      }
      setData(merged);
      setHasLoadedData(true);
    } catch (error) {
      console.warn('Konnte gespeicherte Daten nicht laden:', error);
      setHasLoadedData(true);
    }
  }, []);

  useEffect(() => {
    setShowTutorial(true);
  }, []);

  useEffect(() => {
    if (!data.coverLetter.date) {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();
      setData((prev) => ({
        ...prev,
        coverLetter: { ...prev.coverLetter, date: `${day}.${month}.${year}` }
      }));
    }
  }, [data.coverLetter.date]);

  const tutorialSteps = [
    { key: 'personalInfo', selector: '[data-tour="personalInfoSection"]', title: 'Persönliche Daten', body: 'Hier trägst du die Basisdaten ein. Foto kannst du oben links hochladen.', input: 'none' },
    { key: 'summary', selector: '[data-tour="summarySection"]', title: 'Kurzprofil', body: 'Fasse deine Erfahrung in wenigen Sätzen zusammen.', input: 'none' },
    { key: 'coverLetter', selector: '[data-tour="coverLetterSection"]', title: 'Anschreiben', body: 'Pflege Empfänger, Datum und Text. Das Datum ist editierbar.', input: 'none' },
    { key: 'experiences', selector: '[data-tour="experiencesSection"]', title: 'Berufserfahrung', body: 'Mit dem + fügst du eine neue Station hinzu. Bestehende Einträge kannst du jederzeit ändern.', input: 'none' },
    { key: 'education', selector: '[data-tour="educationSection"]', title: 'Ausbildung', body: 'Auch hier kannst du mit + weitere Einträge hinzufügen.', input: 'none' },
    { key: 'skills', selector: '[data-tour="skillsSection"]', title: 'Kompetenzen', body: 'Mit + ergänzt du Kompetenzen. Den Level stellst du rechts am Regler ein.', input: 'none' },
    { key: 'strengths', selector: '[data-tour="strengthsSection"]', title: 'Stärken', body: 'Trage hier deine persönlichen Stärken ein (eine pro Zeile).', input: 'none' },
    { key: 'additionalSkills', selector: '[data-tour="additionalSkillsSection"]', title: 'Zusatzkenntnisse', body: 'Mit + fügst du weitere Kenntnisse hinzu.', input: 'none' },
    { key: 'languages', selector: '[data-tour="languagesSection"]', title: 'Sprachen', body: 'Mit + fügst du Sprachen hinzu. Das Niveau wählst du im Dropdown.', input: 'none' },
    { key: 'layout', selector: '[data-tour="layoutSection"]', title: 'Layout wählen', body: 'Wähle ein Layout für deine Unterlagen.', input: 'none' },
    { key: 'font', selector: '[data-tour="fontSection"]', title: 'Schriftart wählen', body: 'Wähle eine Schriftart für den Look.', input: 'none' },
    { key: 'theme', selector: '[data-tour="themeSection"]', title: 'Farbschema wählen', body: 'Wähle ein Farbschema für den Stil.', input: 'none' },
    { key: 'tutorialButton', selector: '[data-tour="tutorialButton"]', title: 'Tutorial starten', body: 'Mit diesem Button kannst du das Tutorial jederzeit erneut starten.', input: 'none' },
    { key: 'downloads', selector: '[data-tour="downloadSection"]', title: 'Download', body: 'Hier lädst du einzelne PDFs oder alles zusammen herunter.', input: 'none' }
  ];

  const getTotalSteps = () => {
    if (typeof document === 'undefined') return tutorialSteps.length;
    return tutorialSteps.filter((step) => !step.selector || document.querySelector(step.selector)).length;
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    setShowTutorialIntro(false);
  };

  const handleStartTutorial = () => {
    setShowTutorialIntro(false);
    setShowTutorial(true);
    setTutorialStep(0);
  };

  const handleRestartTutorial = () => {
    setTutorialStep(0);
    setShowTutorial(true);
  };

  const findNextStep = (startIndex: number, direction: 1 | -1) => {
    if (typeof document === 'undefined') return -1;
    let idx = startIndex;
    while (idx >= 0 && idx < tutorialSteps.length) {
      const selector = tutorialSteps[idx].selector;
      if (selector && document.querySelector(selector)) {
        return idx;
      }
      idx += direction;
    }
    return -1;
  };


  const handleNextTutorial = () => {
    const nextIndex = findNextStep(tutorialStep + 1, 1);
    if (nextIndex === -1) {
      handleCloseTutorial();
      return;
    }
    setTutorialStep(nextIndex);
  };

  const handlePrevTutorial = () => {
    const prevIndex = findNextStep(tutorialStep - 1, -1);
    if (prevIndex !== -1) {
      setTutorialStep(prevIndex);
    }
  };

  useEffect(() => {
    if (!showTutorial || showTutorialIntro || !hasMounted) return;
    const selector = tutorialSteps[tutorialStep]?.selector;
    if (!selector) return;
    const element = document.querySelector(selector) as HTMLElement | null;
    if (!element) {
      const nextIndex = findNextStep(tutorialStep + 1, 1);
      if (nextIndex === -1) {
        handleCloseTutorial();
      } else {
        setTutorialStep(nextIndex);
      }
      return;
    }

    if (activeTourElementRef.current && activeTourElementRef.current !== element) {
      activeTourElementRef.current.classList.remove('tour-active');
    }
    element.classList.add('tour-active');
    activeTourElementRef.current = element;

    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const updateRect = () => {
      const rect = element.getBoundingClientRect();
      setTutorialRect({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      });
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      if (activeTourElementRef.current) {
        activeTourElementRef.current.classList.remove('tour-active');
        activeTourElementRef.current = null;
      }
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [showTutorial, showTutorialIntro, tutorialStep, hasMounted]);

  useEffect(() => {
    if (!hasLoadedData) return;
    try {
      localStorage.setItem('cv-master-data', JSON.stringify(data));
    } catch (error) {
      try {
        const fallback = {
          ...data,
          personalInfo: { ...data.personalInfo, photo: '' }
        };
        localStorage.setItem('cv-master-data', JSON.stringify(fallback));
      } catch (fallbackError) {
        console.warn('Konnte Daten nicht speichern:', fallbackError);
      }
    }
  }, [data, hasLoadedData]);

  const handleDownloadDeckblatt = async () => {
    if (!coverLetterRef.current || !coverPageRef.current) return;
    setIsExporting(true);
    try {
      const safe = (value: string) => value.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
      const layoutName = LAYOUTS.find(l => l.id === data.selectedLayoutId)?.name ?? data.selectedLayoutId;
      const themeName = THEMES.find(t => t.id === data.selectedThemeId)?.name ?? data.selectedThemeId;
      const baseName = `${safe(data.personalInfo.jobTitle)}_${safe(data.personalInfo.fullName)}_${safe(layoutName)}_${safe(themeName)}`;
      await generatePDF(
        [coverLetterRef.current, coverPageRef.current], 
        `Deckblatt_Anschreiben_${baseName}.pdf`
      );
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadCV = async () => {
    if (!cvPageRef.current) return;
    setIsExporting(true);
    try {
      const safe = (value: string) => value.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
      const layoutName = LAYOUTS.find(l => l.id === data.selectedLayoutId)?.name ?? data.selectedLayoutId;
      const themeName = THEMES.find(t => t.id === data.selectedThemeId)?.name ?? data.selectedThemeId;
      const baseName = `${safe(data.personalInfo.jobTitle)}_${safe(data.personalInfo.fullName)}_${safe(layoutName)}_${safe(themeName)}`;
      await generatePDF(
        [cvPageRef.current], 
        `Lebenslauf_${baseName}.pdf`
      );
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadAll = async () => {
    if (!coverLetterRef.current || !coverPageRef.current || !cvPageRef.current) return;
    setIsExporting(true);
    try {
      const safe = (value: string) => value.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '');
      const layoutName = LAYOUTS.find(l => l.id === data.selectedLayoutId)?.name ?? data.selectedLayoutId;
      const themeName = THEMES.find(t => t.id === data.selectedThemeId)?.name ?? data.selectedThemeId;
      const baseName = `${safe(data.personalInfo.jobTitle)}_${safe(data.personalInfo.fullName)}_${safe(layoutName)}_${safe(themeName)}`;
      await generatePDF(
        [coverLetterRef.current, coverPageRef.current, cvPageRef.current], 
        `Bewerbung_${baseName}.pdf`
      );
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 ${showTutorial && !showTutorialIntro ? 'tutorial-active' : ''}`}>
      {showTutorialIntro && hasMounted && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tutorial</p>
                <h2 className="text-xl font-black text-slate-900 mt-1">Willkommen</h2>
              </div>
              <button
                onClick={handleCloseTutorial}
                className="text-slate-400 hover:text-slate-600 text-sm"
                aria-label="Tutorial schließen"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              Dieses Tutorial zeigt dir kurz den Aufbau des Editors, damit du schnell deinen Lebenslauf erstellen kannst.
              Du kannst es jederzeit beenden.
            </p>
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handleCloseTutorial}
                className="text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                Tutorial beenden
              </button>
              <button
                onClick={handleStartTutorial}
                className="px-3 py-2 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700"
              >
                Tutorial starten
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Layout className="text-white" size={24} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-slate-900 leading-tight">CV Master</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Erik von Brandt Edition</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden xl:flex bg-slate-100 p-1 rounded-lg mr-2">
            <button 
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'edit' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Edit3 size={16} /> Editor
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Layout size={16} /> Vorschau
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm" data-tour="downloadSection">
              <button 
                onClick={handleDownloadDeckblatt}
                disabled={isExporting}
                className="px-3 py-2 hover:bg-slate-50 border-r border-slate-200 disabled:opacity-50 transition-all flex items-center gap-2"
                title="Deckblatt & Anschreiben"
              >
                <FileText size={16} className="text-slate-500" />
                <span className="hidden lg:inline text-xs font-bold text-slate-600">Deckblatt</span>
              </button>
              <button 
                onClick={handleDownloadCV}
                disabled={isExporting}
                className="px-3 py-2 hover:bg-slate-50 disabled:opacity-50 transition-all flex items-center gap-2"
                title="Lebenslauf"
              >
                <UserCheck size={16} className="text-slate-500" />
                <span className="hidden lg:inline text-xs font-bold text-slate-600">Lebenslauf</span>
              </button>
            </div>

            {showTutorial && !showTutorialIntro && tutorialSteps[tutorialStep]?.key === 'downloads' && (
              <div className="tutorial-inline max-w-xs">
                <p className="tutorial-step">Tutorial · Schritt {Math.min(tutorialStep + 1, tutorialSteps.length)}/{getTotalSteps()}</p>
                <h3 className="tutorial-title">{tutorialSteps[tutorialStep].title}</h3>
                <p className="tutorial-body">{tutorialSteps[tutorialStep].body}</p>
                <div className="tutorial-actions">
                  <button onClick={handleCloseTutorial} className="tutorial-skip">Tutorial beenden</button>
                  <div className="tutorial-buttons">
                    <button onClick={handlePrevTutorial} disabled={findNextStep(tutorialStep - 1, -1) === -1} className="tutorial-back">
                      Zurück
                    </button>
                    <button onClick={handleNextTutorial} className="tutorial-next">
                      {tutorialStep >= tutorialSteps.length - 1 ? 'Fertig' : 'Weiter'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleRestartTutorial}
              className="hidden xl:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              title="Tutorial starten"
              data-tour="tutorialButton"
            >
              Tutorial
            </button>

            {showTutorial && !showTutorialIntro && tutorialSteps[tutorialStep]?.key === 'tutorialButton' && (
              <div className="tutorial-inline max-w-xs">
                <p className="tutorial-step">Tutorial · Schritt {Math.min(tutorialStep + 1, tutorialSteps.length)}/{getTotalSteps()}</p>
                <h3 className="tutorial-title">{tutorialSteps[tutorialStep].title}</h3>
                <p className="tutorial-body">{tutorialSteps[tutorialStep].body}</p>
                <div className="tutorial-actions">
                  <button onClick={handleCloseTutorial} className="tutorial-skip">Tutorial beenden</button>
                  <div className="tutorial-buttons">
                    <button onClick={handlePrevTutorial} disabled={findNextStep(tutorialStep - 1, -1) === -1} className="tutorial-back">
                      Zurück
                    </button>
                    <button onClick={handleNextTutorial} className="tutorial-next">
                      {tutorialStep >= tutorialSteps.length - 1 ? 'Fertig' : 'Weiter'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={handleDownloadAll}
              disabled={isExporting}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-black hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md active:scale-95 uppercase tracking-tighter"
            >
              {isExporting ? <Sparkles className="animate-spin" size={16} /> : <Files size={16} />}
              <span>Alle laden</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className={`editor-panel flex-1 overflow-y-auto p-4 md:p-8 ${activeTab === 'edit' ? 'block' : 'hidden md:block'} border-r`}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Unterlagen anpassen</h2>
              <div className="text-[10px] text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">Live Editor</div>
            </div>
            <ResumeForm
              data={data}
              onChange={setData}
              tutorial={
                showTutorial && !showTutorialIntro
                  ? {
                      activeKey: tutorialSteps[tutorialStep]?.key,
                      title: tutorialSteps[tutorialStep]?.title || '',
                      body: tutorialSteps[tutorialStep]?.body || '',
                      step: Math.min(tutorialStep + 1, tutorialSteps.length),
                      total: getTotalSteps(),
                      onPrev: handlePrevTutorial,
                      onNext: handleNextTutorial,
                      onSkip: handleCloseTutorial,
                      canPrev: findNextStep(tutorialStep - 1, -1) !== -1,
                      isLast: tutorialStep >= tutorialSteps.length - 1
                    }
                  : undefined
              }
            />
          </div>
        </div>

        {/* Die Preview darf nicht per display:none versteckt werden, wenn html2canvas darauf zugreifen soll */}
        <div className={`flex-1 overflow-hidden bg-slate-200 ${activeTab === 'preview' ? 'block' : 'hidden md:block'} relative`}>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-xl border border-white/50 text-[10px] uppercase tracking-widest font-black text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Druckvorschau
            </div>
            <ResumePreview 
              data={data} 
              coverLetterRef={coverLetterRef}
              coverPageRef={coverPageRef} 
              cvPageRef={cvPageRef} 
            />
        </div>
      </main>

      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-2xl border border-white/50 rounded-full p-1.5 flex gap-2 z-50">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'edit' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
        >
          Editor
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'preview' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
        >
          Vorschau
        </button>
      </div>
    </div>
  );
};

export default App;