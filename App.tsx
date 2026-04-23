
import React, { useState, useEffect, useRef } from 'react';
import { ResumeData, INITIAL_DATA, LAYOUTS, THEMES, SavedVersion, PAEDAGOGE_DATA } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { generatePDF } from './services/pdfService';
import { Layout, Edit3, Sparkles, FileText, UserCheck, Files, Save } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ResumeData>(PAEDAGOGE_DATA);
  const [savedVersions, setSavedVersions] = useState<SavedVersion[]>([]);
  const [selectedHeaderVersionId, setSelectedHeaderVersionId] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isExporting, setIsExporting] = useState(false);
  const [hasLoadedData, setHasLoadedData] = useState(false);

  const coverLetterRef = useRef<HTMLDivElement>(null);
  const coverPageRef = useRef<HTMLDivElement>(null);
  const cvPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expose a function to change font from console for testing/power users
    (window as any).changeFont = (fontId: string) => {
        setData(prev => ({ ...prev, selectedFontId: fontId as any }));
        console.log(`Font changed to ${fontId}`);
    };
  }, []);

  useEffect(() => {
    try {
      const rawVersions = localStorage.getItem('cv-master-versions');
      if (rawVersions) {
        const migrateAddr = (d: any) => {
          const pi = d?.personalInfo;
          if (pi?.address && !pi?.street && !pi?.zip && !pi?.city) {
            const addr: string = pi.address;
            const commaIdx = addr.lastIndexOf(',');
            if (commaIdx !== -1) {
              pi.street = addr.substring(0, commaIdx).trim();
              const rest = addr.substring(commaIdx + 1).trim();
              const spIdx = rest.indexOf(' ');
              if (spIdx !== -1) { pi.zip = rest.substring(0, spIdx).trim(); pi.city = rest.substring(spIdx + 1).trim(); }
              else { pi.city = rest; }
            } else { pi.city = addr; }
            delete pi.address;
          }
          return d;
        };
        const versions = JSON.parse(rawVersions).map((v: any) => ({ ...v, data: migrateAddr(v.data) }));
        setSavedVersions(versions);
      } else {
         const defaultVersions: SavedVersion[] = [
          {
            id: 'default-paedagoge',
            name: 'Bewerbung Sozialpädagoge',
            timestamp: Date.now(),
            data: PAEDAGOGE_DATA
          }
        ];
        setSavedVersions(defaultVersions);
        localStorage.setItem('cv-master-versions', JSON.stringify(defaultVersions));
      }
    } catch (e) {
      console.warn('Failed to load versions', e);
    }
  }, []);

  const saveVersion = (name: string) => {
    if (!name.trim()) return;
    const newVersion: SavedVersion = {
      id: Date.now().toString(),
      name: name,
      timestamp: Date.now(),
      data: { ...data }
    };
    const newVersions = [newVersion, ...savedVersions];
    setSavedVersions(newVersions);
    localStorage.setItem('cv-master-versions', JSON.stringify(newVersions));
  };

  const loadVersion = (version: SavedVersion) => {
    if (window.confirm(`Möchtest du wirklich die Version "${version.name}" laden? Ungespeicherte Änderungen gehen verloren.`)) {
      setData(version.data);
    }
  };

  const deleteVersion = (id: string) => {
    if (window.confirm('Diese Version wirklich löschen?')) {
      const newVersions = savedVersions.filter(v => v.id !== id);
      setSavedVersions(newVersions);
      localStorage.setItem('cv-master-versions', JSON.stringify(newVersions));
    }
  };

  const handleHeaderSave = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const suggestion = `Stand ${day}.${month}.${year} ${hours}:${minutes}`;
    const versionName = window.prompt('Name für den Speicherstand eingeben:', suggestion);
    if (!versionName || !versionName.trim()) return;
    saveVersion(versionName.trim());
  };

  const handleHeaderLoadVersion = (versionId: string) => {
    setSelectedHeaderVersionId(versionId);
    if (!versionId) return;
    const selected = savedVersions.find((v) => v.id === versionId);
    if (selected) {
      loadVersion(selected);
    }
    setSelectedHeaderVersionId('');
  };

  const resetToDefaults = () => {
    if (window.confirm('ACHTUNG: Alle gespeicherten Versionen werden gelöscht und die Standard-Vorlagen neu geladen! Fortfahren?')) {
      localStorage.removeItem('cv-master-versions');
      window.location.reload();
    }
  };





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
      const parsed = JSON.parse(raw) as Partial<ResumeData>;
      const legacyAddress = (parsed.personalInfo as any)?.address as string | undefined;
      let legacyStreet = '';
      let legacyZip = '';
      let legacyCity = '';
      if (legacyAddress && !parsed.personalInfo?.street && !parsed.personalInfo?.zip && !parsed.personalInfo?.city) {
        const commaIdx = legacyAddress.lastIndexOf(',');
        if (commaIdx !== -1) {
          legacyStreet = legacyAddress.substring(0, commaIdx).trim();
          const rest = legacyAddress.substring(commaIdx + 1).trim();
          const spaceIdx = rest.indexOf(' ');
          if (spaceIdx !== -1) {
            legacyZip = rest.substring(0, spaceIdx).trim();
            legacyCity = rest.substring(spaceIdx + 1).trim();
          } else {
            legacyCity = rest;
          }
        } else {
          legacyCity = legacyAddress;
        }
      }
      const merged: ResumeData = {
        ...INITIAL_DATA,
        personalInfo: {
          ...INITIAL_DATA.personalInfo,
          fullName: parsed.personalInfo?.fullName ?? INITIAL_DATA.personalInfo.fullName,
          jobTitle: parsed.personalInfo?.jobTitle ?? INITIAL_DATA.personalInfo.jobTitle,
          email: parsed.personalInfo?.email ?? INITIAL_DATA.personalInfo.email,
          phone: parsed.personalInfo?.phone ?? INITIAL_DATA.personalInfo.phone,
          street: parsed.personalInfo?.street ?? legacyStreet ?? INITIAL_DATA.personalInfo.street,
          zip: parsed.personalInfo?.zip ?? legacyZip ?? INITIAL_DATA.personalInfo.zip,
          city: parsed.personalInfo?.city ?? legacyCity ?? INITIAL_DATA.personalInfo.city,
          photo: parsed.personalInfo?.photo ?? INITIAL_DATA.personalInfo.photo
        },
        coverLetter: {
          ...INITIAL_DATA.coverLetter,
          recipient: parsed.coverLetter?.recipient ?? INITIAL_DATA.coverLetter.recipient,
          subject: parsed.coverLetter?.subject ?? INITIAL_DATA.coverLetter.subject,
          date: parsed.coverLetter?.date ?? INITIAL_DATA.coverLetter.date,
          text: parsed.coverLetter?.text ?? INITIAL_DATA.coverLetter.text
        }
      };
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-[9999]">
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
            <button
              onClick={handleHeaderSave}
              className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-2"
              title="Aktuellen Stand speichern"
            >
              <Save size={14} />
              <span className="hidden lg:inline">Speichern</span>
            </button>

            <select
              value={selectedHeaderVersionId}
              onChange={(e) => handleHeaderLoadVersion(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[220px]"
              title="Gespeicherte Version laden"
            >
              <option value="">Version laden...</option>
              {savedVersions.map((version) => (
                <option key={version.id} value={version.id}>
                  {version.name}
                </option>
              ))}
            </select>

            <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
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
              savedVersions={savedVersions}
              onSaveVersion={saveVersion}
              onLoadVersion={loadVersion}
              onDeleteVersion={deleteVersion}
              onReset={resetToDefaults}
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