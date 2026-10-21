import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectGroup } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Upload, 
  Camera, 
  CheckCircle2, 
  Trash2
} from 'lucide-react';

interface SubmitNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SubmitNoteModal: React.FC<SubmitNoteModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { 
    subjects, 
    currentStudent, 
    studentLogin, 
    submitNote 
  } = useApp();

  // Auth inputs
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentInstitution, setStudentInstitution] = useState('');

  // Note fields
  const [selectedGroup, setSelectedGroup] = useState<SubjectGroup>('science');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [customSubjectName, setCustomSubjectName] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [customChapter, setCustomChapter] = useState<string>('');
  const [classLevel, setClassLevel] = useState<string>('Class 9-10 / SSC');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [keyFormulas, setKeyFormulas] = useState<string>('');
  
  // Picture / Image state
  const [uploadedPictures, setUploadedPictures] = useState<{ url: string; name: string }[]>([]);
  const [uploadedDocFile, setUploadedDocFile] = useState<{ name: string; size: string } | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const groupSubjects = useMemo(() => {
    return subjects.filter((s) => s.group === selectedGroup);
  }, [subjects, selectedGroup]);

  const currentSubjectObj = useMemo(() => {
    return subjects.find((s) => s.id === selectedSubjectId);
  }, [subjects, selectedSubjectId]);

  if (!isOpen) return null;

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      filesArray.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              setUploadedPictures((prev) => [
                ...prev,
                { url: event.target!.result as string, name: file.name }
              ]);
            }
          };
          reader.readAsDataURL(file);
        } else {
          const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
          setUploadedDocFile({ name: file.name, size: sizeMb });
        }
      });
    }
  };

  const removePicture = (index: number) => {
    setUploadedPictures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    let activePhone = currentStudent?.phone;
    let activeName = currentStudent?.name;
    let activeInst = currentStudent?.institution;

    if (!currentStudent) {
      if (!studentName.trim() || !studentPhone.trim()) {
        setErrorMessage('আপনার নাম ও মোবাইল নম্বর লিখুন।');
        return;
      }
      studentLogin(studentName.trim(), studentPhone.trim(), studentInstitution.trim());
      activePhone = studentPhone.trim();
      activeName = studentName.trim();
      activeInst = studentInstitution.trim();
    }

    if (!activePhone || !activeName) {
      setErrorMessage('নাম ও ফোন নম্বর প্রয়োজন।');
      return;
    }

    if (!title.trim()) {
      setErrorMessage('নোটের শিরোনাম লিখুন।');
      return;
    }

    let finalSubjectNameBn = '';
    let finalSubjectNameEn = '';
    let finalSubjectId = selectedSubjectId;

    if (selectedSubjectId === 'custom') {
      if (!customSubjectName.trim()) {
        setErrorMessage('বিষয়ের নাম লিখুন।');
        return;
      }
      finalSubjectNameBn = customSubjectName.trim();
      finalSubjectNameEn = customSubjectName.trim();
      finalSubjectId = 'custom-' + Date.now();
    } else if (currentSubjectObj) {
      finalSubjectNameBn = currentSubjectObj.nameBn;
      finalSubjectNameEn = currentSubjectObj.nameEn;
    } else {
      setErrorMessage('বিষয় নির্বাচন করুন।');
      return;
    }

    const finalChapter = customChapter.trim() || selectedChapter || 'অধ্যায়ভিত্তিক সারসংক্ষেপ';

    setSubmitting(true);

    const parsedFormulas = keyFormulas
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const picUrls = uploadedPictures.map((p) => p.url);

    submitNote({
      title: title.trim(),
      subjectId: finalSubjectId,
      subjectNameBn: finalSubjectNameBn,
      subjectNameEn: finalSubjectNameEn,
      group: selectedGroup,
      chapter: finalChapter,
      classLevel,
      description: description.trim() || 'হাতে লেখা নোটের স্পষ্ট ছবি ও বিস্তারিত সমাধান সংযুক্ত।',
      previewSnippet: description.substring(0, 160) || 'হ্যান্ডরিটেন নোটসের ছবি ও সমাধান।',
      keyFormulas: parsedFormulas.length > 0 ? parsedFormulas : undefined,
      images: picUrls.length > 0 ? picUrls : undefined,
      fileType: picUrls.length > 0 ? 'image' : 'pdf',
      fileName: uploadedDocFile?.name || `${title.replace(/\s+/g, '_').substring(0, 20)}_Notes.jpg`,
      fileSize: uploadedDocFile?.size || `${Math.max(1.2, uploadedPictures.length * 0.9).toFixed(1)} MB`,
      pageCount: Math.max(1, uploadedPictures.length || 4),
      uploaderName: activeName,
      uploaderPhone: activePhone,
      uploaderInstitution: activeInst,
      tags: [finalSubjectNameBn, selectedGroup],
    });

    setSubmitting(false);
    setSubmittedSuccess(true);

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const handleFinish = () => {
    setSubmittedSuccess(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl max-h-[92vh] bg-white dark:bg-black rounded-3xl shadow-2xl border border-black/15 dark:border-white/25 flex flex-col overflow-hidden text-black dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-black/10 dark:border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-black dark:text-white">
                নোট ও ছবি আপলোড
              </h2>
              <p className="text-[11px] text-red-600 font-bold">
                অনুমোদনে পাবেন +৫০ পয়েন্ট
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-black/60 dark:text-white/60 hover:text-red-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submittedSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-black dark:text-white">
              নোট জমা হয়েছে!
            </h3>

            <p className="text-xs sm:text-sm text-black/75 dark:text-white/80 max-w-xs mx-auto">
              অ্যাডমিন যাচাই করে অনুমোদন করলেই ৫০ পয়েন্ট আপনার প্রোফাইলে যোগ হবে।
            </p>

            <button
              onClick={handleFinish}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-2xl shadow-md transition-all active:scale-95"
            >
              ঠিক আছে
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
            
            {/* Student Auth */}
            {currentStudent ? (
              <div className="p-3 rounded-2xl bg-white dark:bg-black border border-red-600/40 flex items-center justify-between text-xs">
                <span className="font-bold text-black dark:text-white">
                  {currentStudent.name} ({currentStudent.phone})
                </span>
                <span className="font-mono text-red-600 font-bold">
                  {currentStudent.points} পয়েন্ট
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-white dark:bg-black border border-black/15 dark:border-white/20">
                <div>
                  <label className="text-[11px] font-bold text-black dark:text-white block mb-1">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="তানভীর হাসান"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-black dark:text-white block mb-1">
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    required
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none font-mono"
                  />
                </div>
              </div>
            )}

            {/* Picture Upload Area */}
            <div className="space-y-1.5">
              <label className="font-bold text-black dark:text-white flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-red-600" />
                  <span>খাতার ছবি আপলোড করুন</span>
                </span>
                <span className="text-[11px] text-black/50 dark:text-white/50 font-normal">একাধিক ছবি বা PDF</span>
              </label>

              <div className="border-2 border-dashed border-red-600/50 hover:border-red-600 rounded-2xl p-4 text-center transition-colors bg-white dark:bg-black">
                <input
                  type="file"
                  id="picture-upload-input"
                  accept="image/*,.pdf,.doc,.docx"
                  multiple
                  onChange={handlePictureUpload}
                  className="hidden"
                />
                <label htmlFor="picture-upload-input" className="cursor-pointer block">
                  <Camera className="w-6 h-6 text-red-600 mx-auto mb-1" />
                  <span className="font-bold text-black dark:text-white">
                    ছবি বা ফাইল নির্বাচন করুন
                  </span>
                  <span className="block text-[11px] text-black/50 dark:text-white/50 mt-0.5">
                    ক্যামেরা দিয়ে তোলা স্পষ্ট খাতার পৃষ্ঠা
                  </span>
                </label>
              </div>

              {/* Uploaded Pictures Thumbnails */}
              {uploadedPictures.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto py-2">
                  {uploadedPictures.map((pic, idx) => (
                    <div key={idx} className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-black/20 dark:border-white/30 group">
                      <img src={pic.url} alt={`Page ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePicture(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label htmlFor="picture-upload-input" className="shrink-0 w-16 h-16 rounded-xl border border-dashed border-black/30 dark:border-white/30 flex flex-col items-center justify-center text-black/60 dark:text-white/60 hover:text-red-600 cursor-pointer">
                    <Camera className="w-4 h-4" />
                    <span className="text-[9px] mt-0.5 font-bold">+ছবি</span>
                  </label>
                </div>
              )}

              {uploadedDocFile && (
                <div className="p-2 rounded-xl border border-black/15 dark:border-white/20 flex items-center justify-between text-[11px]">
                  <span>{uploadedDocFile.name} ({uploadedDocFile.size})</span>
                  <button type="button" onClick={() => setUploadedDocFile(null)} className="text-red-600 font-bold">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Group Picker */}
            <div className="space-y-1">
              <label className="font-bold text-black dark:text-white block">
                বিভাগ (Group) *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { key: 'common', label: 'সবার আবশ্যিক' },
                  { key: 'science', label: 'বিজ্ঞান' },
                  { key: 'arts', label: 'মানবিক' },
                  { key: 'commerce', label: 'ব্যবসায় শিক্ষা' },
                ].map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => {
                      setSelectedGroup(g.key as SubjectGroup);
                      setSelectedSubjectId('');
                      setSelectedChapter('');
                    }}
                    className={`py-2 px-2 text-center rounded-xl border text-xs transition-all font-bold ${
                      selectedGroup === g.key
                        ? 'border-red-600 bg-red-600 text-white'
                        : 'border-black/15 dark:border-white/25 text-black dark:text-white hover:border-red-600'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject and Chapter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="font-bold text-black dark:text-white block mb-1">
                  বিষয় *
                </label>
                <select
                  required
                  value={selectedSubjectId}
                  onChange={(e) => {
                    setSelectedSubjectId(e.target.value);
                    setSelectedChapter('');
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none"
                >
                  <option value="" className="bg-white dark:bg-black text-black dark:text-white">-- বিষয় বাছুন --</option>
                  {groupSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id} className="bg-white dark:bg-black text-black dark:text-white">
                      {sub.nameBn}
                    </option>
                  ))}
                  <option value="custom" className="bg-white dark:bg-black text-red-600 font-bold">+ অন্যান্য বিষয়</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-black dark:text-white block mb-1">
                  অধ্যায় *
                </label>
                {currentSubjectObj && currentSubjectObj.chapters.length > 0 ? (
                  <select
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none"
                  >
                    <option value="" className="bg-white dark:bg-black text-black dark:text-white">-- অধ্যায় বাছুন --</option>
                    {currentSubjectObj.chapters.map((ch, i) => (
                      <option key={i} value={ch} className="bg-white dark:bg-black text-black dark:text-white">
                        {ch}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={customChapter}
                    onChange={(e) => setCustomChapter(e.target.value)}
                    placeholder="অধ্যায়ের নাম বা নম্বর"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* Custom subject if selected */}
            {selectedSubjectId === 'custom' && (
              <div>
                <input
                  type="text"
                  required
                  value={customSubjectName}
                  onChange={(e) => setCustomSubjectName(e.target.value)}
                  placeholder="বিষয়ের নাম লিখুন"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none"
                />
              </div>
            )}

            {/* Note Title */}
            <div>
              <label className="font-bold text-black dark:text-white block mb-1">
                নোটের শিরোনাম *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: গতি অধ্যায়ের শর্টকাট সূত্র ও বোর্ড প্রশ্ন"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none"
              />
            </div>

            {/* Short Note / Description */}
            <div>
              <label className="font-bold text-black dark:text-white block mb-1">
                সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="নোটের গুরুত্বপূর্ণ টপিক লিখুন..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-black text-black dark:text-white border border-black/20 dark:border-white/30 focus:border-red-600 focus:outline-none"
              />
            </div>

            {errorMessage && (
              <p className="text-red-600 font-bold text-xs">{errorMessage}</p>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-black/10 dark:border-white/15">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{submitting ? 'জমা হচ্ছে...' : 'জমা দিন'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
