import { SubjectItem, NoteItem, StudentUser } from '../types';

export const INITIAL_SUBJECTS: SubjectItem[] = [
  // ১. Common Subjects (সবার জন্য আবশ্যিক বিষয়)
  {
    id: 'c-bangla',
    group: 'common',
    nameBn: 'বাংলা',
    nameEn: 'Bangla',
    chapters: [
      '১ম অধ্যায় - শুভা ও গদ্যাংশ',
      '২য় অধ্যায় - বই পড়া',
      '৩য় অধ্যায় - বঙ্গবাণী ও কবিতাগুচ্ছ',
      '৪র্থ অধ্যায় - কপোতাক্ষ নদ',
      'ব্যাকরণ - কারক ও বিভক্তি',
      'ব্যাকরণ - সমাস ও সন্ধি',
      'রচনাবলী ও ভাবসম্প্রসারণ'
    ]
  },
  {
    id: 'c-english',
    group: 'common',
    nameBn: 'ইংরেজি',
    nameEn: 'English',
    chapters: [
      'Unit 1: Good Citizens',
      'Unit 2: Pastimes & Hobbies',
      'Unit 3: Events and Festivals',
      'Grammar: Right Form of Verbs',
      'Grammar: Transformation of Sentences',
      'Writing: Formal & Informal Letters',
      'Writing: Paragraph & Graph Chart'
    ]
  },
  {
    id: 'c-math',
    group: 'common',
    nameBn: 'গণিত',
    nameEn: 'Mathematics',
    chapters: [
      '১ম অধ্যায় - বাস্তব সংখ্যা',
      '২য় অধ্যায় - সেট ও ফাংশন',
      '৩য় অধ্যায় - বীজগাণিতিক রাশি',
      '৪র্থ অধ্যায় - সূচক ও লগারিদম',
      '৭ম অধ্যায় - ব্যবহারিক জ্যামিতি',
      '৮ম অধ্যায় - বৃত্ত',
      '৯ম অধ্যায় - ত্রিকোণমিতিক অনুপাত',
      '১৬শ অধ্যায় - পরিমিতি',
      '১৭শ অধ্যায় - পরিসংখ্যান'
    ]
  },
  {
    id: 'c-ict',
    group: 'common',
    nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    nameEn: 'Information and Communication Technology (ICT)',
    chapters: [
      '১ম অধ্যায় - বিশ্ব ও বাংলাদেশ প্রেক্ষিত',
      '২য় অধ্যায় - কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং',
      '৩য় অধ্যায় - সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস',
      '৪র্থ অধ্যায় - ওয়েব ডিজাইন পরিচিতি ও HTML',
      '৫ম অধ্যায় - প্রোগ্রামিং ভাষা (C Programming)',
      '৬ষ্ঠ অধ্যায় - ডাটাবেজ ম্যানেজমেন্ট সিস্টেম'
    ]
  },
  {
    id: 'c-religion',
    group: 'common',
    nameBn: 'ধর্ম ও নৈতিক শিক্ষা',
    nameEn: 'Religion and Moral Education',
    chapters: [
      '১ম অধ্যায় - আকাইদ ও নৈতিক জীবন',
      '২য় অধ্যায় - শরিয়তের উৎস',
      '৩য় অধ্যায় - ইবাদত',
      '৪র্থ অধ্যায় - আখলাক বা চরিত্র',
      '৫ম অধ্যায় - আদর্শ চরিত্র ও মনীষীগণ'
    ]
  },
  {
    id: 'c-bgs',
    group: 'common',
    nameBn: 'বাংলাদেশ ও বিশ্বপরিচয়',
    nameEn: 'Bangladesh and Global Studies',
    chapters: [
      '১ম অধ্যায় - পূর্ব বাংলার আন্দোলন ও জাতীয়তাবাদের উত্থান',
      '২য় অধ্যায় - স্বাধীন বাংলাদেশ',
      '৩য় অধ্যায় - সৌরজগৎ ও ভূমন্ডল',
      '৪র্থ অধ্যায় - বাংলাদেশের ভূপ্রকৃতি ও জলবায়ু',
      '৬ষ্ঠ অধ্যায় - রাষ্ট্র, নাগরিকতা ও আইন',
      '১০ম অধ্যায় - টেকসই উন্নয়ন অভীষ্ট (SDG)'
    ]
  },
  {
    id: 'c-career',
    group: 'common',
    nameBn: 'ক্যারিয়ার শিক্ষা',
    nameEn: 'Career Education',
    chapters: [
      '১ম অধ্যায় - আমি ও আমার ক্যারিয়ার',
      '২য় অধ্যায় - ক্যারিয়ার গঠনে গুণাবলী',
      '৩য় অধ্যায় - সংযোগ ও যোগাযোগ',
      '৪র্থ অধ্যায় - কর্মক্ষেত্রের পরিবর্তনশীলতা'
    ]
  },
  {
    id: 'c-pe',
    group: 'common',
    nameBn: 'শারীরিক শিক্ষা, স্বাস্থ্যবিজ্ঞান ও খেলাধুলা',
    nameEn: 'Physical Education, Health Science and Sports',
    chapters: [
      '১ম অধ্যায় - শারীরিক শিক্ষা ও সুস্থ জীবন',
      '২য় অধ্যায় - শরীরচর্চা ও ব্যায়াম',
      '৩য় অধ্যায় - মানসিক স্বাস্থ্য ও প্রাথমিক চিকিৎসা',
      '৪র্থ অধ্যায় - খেলাধুলার নিয়মাবলী ও টিম স্পিরিট'
    ]
  },

  // ২. Science (বিজ্ঞান বিভাগ)
  {
    id: 's-physics',
    group: 'science',
    nameBn: 'পদার্থবিজ্ঞান',
    nameEn: 'Physics',
    chapters: [
      '১ম অধ্যায় - ভৌত রাশি ও পরিমাপ',
      '২য় অধ্যায় - গতি (Motion & Velocity)',
      '৩য় অধ্যায় - বল (Force & Newton\'s Laws)',
      '৪র্থ অধ্যায় - কাজ, ক্ষমতা ও শক্তি (Work & Energy)',
      '৫ম অধ্যায় - পদার্থের অবস্থা ও চাপ',
      '৭ম অধ্যায় - তরঙ্গ ও শব্দ',
      '৮ম অধ্যায় - আলোর প্রতিফলন',
      '১০ম অধ্যায় - স্থির বিদ্যুৎ',
      '১১শ অধ্যায় - চল বিদ্যুৎ (Current Electricity)'
    ]
  },
  {
    id: 's-chemistry',
    group: 'science',
    nameBn: 'রসায়ন',
    nameEn: 'Chemistry',
    chapters: [
      '১ম অধ্যায় - রসায়নের ধারণা',
      '২য় অধ্যায় - পদার্থের অবস্থা',
      '৩য় অধ্যায় - পদার্থের গঠন (Atomic Structure)',
      '৪র্থ অধ্যায় - পর্যায় সারণি (Periodic Table)',
      '৫ম অধ্যায় - রাসায়নিক বন্ধন (Chemical Bonds)',
      '৬ষ্ঠ অধ্যায় - মোলের ধারণা ও রাসায়নিক গণনা',
      '৭ম অধ্যায় - রাসায়নিক বিক্রিয়া ও তাপ',
      '১১শ অধ্যায় - খনিজ সম্পদ ও জীবাশ্ম (Organic Chemistry)'
    ]
  },
  {
    id: 's-biology',
    group: 'science',
    nameBn: 'জীববিজ্ঞান',
    nameEn: 'Biology',
    chapters: [
      '১ম অধ্যায় - জীবন পাঠ',
      '২য় অধ্যায় - জীবকোষ ও টিস্যু',
      '৩য় অধ্যায় - কোষ বিভাজন (Mitosis & Meiosis)',
      '৪র্থ অধ্যায় - জীবনীশক্তি (Photosynthesis & Respiration)',
      '৫ম অধ্যায় - খাদ্য, পুষ্টি ও পরিপাক',
      '৮ম অধ্যায় - রেচন প্রক্রিয়া',
      '১১শ অধ্যায় - জীবের প্রজনন',
      '১২শ অধ্যায় - জীবের বংশগতি ও বিবর্তন'
    ]
  },
  {
    id: 's-highermath',
    group: 'science',
    nameBn: 'উচ্চতর গণিত',
    nameEn: 'Higher Mathematics',
    chapters: [
      '১ম অধ্যায় - সেট ও ফাংশন',
      '২য় অধ্যায় - বীজগাণিতিক রাশি ও ভগ্নাংশ',
      '৩য় অধ্যায় - জ্যামিতি (আপোলোনিয়াসের উপপাদ্য)',
      '৭ম অধ্যায় - অসীম ধারা',
      '৮ম অধ্যায় - ত্রিকোণমিতি (রেডিয়ান ও কোণ)',
      '৯ম অধ্যায় - সূচকীয় ও লগারিদমীয় ফাংশন',
      '১০ম অধ্যায় - দ্বিপদী বিস্তৃতি (Binomial Expansion)',
      '১১শ অধ্যায় - স্থানাঙ্ক জ্যামিতি (Coordinate Geometry)',
      '১৪শ অধ্যায় - সম্ভাবনা (Probability)'
    ]
  },

  // ৩. Arts / Humanities (মানবিক বিভাগ)
  {
    id: 'a-history-world',
    group: 'arts',
    nameBn: 'বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা',
    nameEn: 'History of Bangladesh and World Civilization',
    chapters: [
      '১ম অধ্যায় - ইতিহাস পরিচিতি',
      '২য় অধ্যায় - বিশ্বসভ্যতা (মিশর, সিন্ধু, গ্রিস ও রোম)',
      '৩য় অধ্যায় - প্রাচীন বাংলার জনপদ',
      '৬ষ্ঠ অধ্যায় - মধ্যযুগের বাংলা ও সুলতানি শাসন',
      '১১শ অধ্যায় - ভাষা আন্দোলন ও পরবর্তী ঘটনাপ্রবাহ',
      '১২শ অধ্যায় - সামরিক শাসন ও স্বাধিকার আন্দোলন',
      '১৫শ অধ্যায় - মুক্তিযুদ্ধ ও স্বাধীনতা'
    ]
  },
  {
    id: 'a-geography',
    group: 'arts',
    nameBn: 'ভূগোল ও পরিবেশ',
    nameEn: 'Geography and Environment',
    chapters: [
      '১ম অধ্যায় - ভূগোল ও পরিবেশের ধারণা',
      '২য় অধ্যায় - মহাবিশ্ব ও আমাদের পৃথিবী',
      '৩য় অধ্যায় - মানচিত্র পাঠ ও ব্যবহার',
      '৪র্থ অধ্যায় - পৃথিবীর অভ্যন্তরীণ ও বাহ্যিক গঠন',
      '৫ম অধ্যায় - বায়ুমণ্ডল ও জলবায়ু অঞ্চল',
      '১০ম অধ্যায় - বাংলাদেশের ভৌগোলিক বিবরণ ও প্রাকৃতিক দুর্যোগ'
    ]
  },
  {
    id: 'a-civics',
    group: 'arts',
    nameBn: 'পৌরনীতি ও নাগরিকতা',
    nameEn: 'Civics and Citizenship',
    chapters: [
      '১ম অধ্যায় - পৌরনীতি ও নাগরিকতা পরিচিতি',
      '২য় অধ্যায় - নাগরিক ও নাগরিকতা অর্জন',
      '৩য় অধ্যায় - আইন, স্বাধীনতা ও সাম্য',
      '৪র্থ অধ্যায় - রাষ্ট্র ও সরকার ব্যবস্থা',
      '৫ম অধ্যায় - সংবিধান ও এর বৈশিষ্ট্য',
      '৭ম অধ্যায় - গণতন্ত্রে রাজনৈতিক দল ও নির্বাচন'
    ]
  },
  {
    id: 'a-economics',
    group: 'arts',
    nameBn: 'অর্থনীতি',
    nameEn: 'Economics',
    chapters: [
      '১ম অধ্যায় - অর্থনীতির মৌলিক ধারণা',
      '২য় অধ্যায় - অর্থনৈতিক ব্যবস্থা সমূহ',
      '৩য় অধ্যায় - উপযোগ, চাহিদা, জোগান ও দাম নির্ধারণ',
      '৪র্থ অধ্যায় - উৎপাদন ও সংগঠন',
      '৬ষ্ঠ অধ্যায় - জাতীয় আয় ও পরিমাপ',
      '৭ম অধ্যায় - মুদ্রা ও ব্যাংক ব্যবস্থা'
    ]
  },
  {
    id: 'a-bd-history',
    group: 'arts',
    nameBn: 'বাংলাদেশের ইতিহাস',
    nameEn: 'History of Bangladesh',
    chapters: [
      '১ম অধ্যায় - প্রাচীন বাংলার ভৌগোলিক পরিচিতি',
      '২য় অধ্যায় - পাল ও সেন বংশীয় শাসনকাল',
      '৩য় অধ্যায় - মুঘল ও নবাবি আমল',
      '৪র্থ অধ্যায় - ব্রিটিশ ঔপনিবেশিক শাসন',
      '৫ম অধ্যায় - ১৯৪৭ দেশভাগ ও স্বাধীন বাংলাদেশের অভ্যুদয়'
    ]
  },
  {
    id: 'a-islam-studies',
    group: 'arts',
    nameBn: 'ইসলাম ও নৈতিক শিক্ষা / অন্যান্য ধর্মীয় শিক্ষা',
    nameEn: 'Islam and Moral Education / Other Religious Studies',
    chapters: [
      '১ম অধ্যায় - ইসলামী জীবন দর্শন ও মৌলিক বিশ্বাস',
      '২য় অধ্যায় - কুরআন ও হাদিসের আলোকপাত',
      '৩য় অধ্যায় - পারিবারিক ও সামাজিক দায়বদ্ধতা',
      '৪র্থ অধ্যায় - সহনশীলতা ও অন্যান্য ধর্মবিশ্বাস'
    ]
  },

  // ৪. Commerce / Business Studies (ব্যবসায় শিক্ষা বিভাগ)
  {
    id: 'co-accounting',
    group: 'commerce',
    nameBn: 'হিসাববিজ্ঞান',
    nameEn: 'Accounting',
    chapters: [
      '১ম অধ্যায় - হিসাববিজ্ঞান পরিচিতি',
      '২য় অধ্যায় - লেনদেন ও হিসাব সমীকরণ (A = L + OE)',
      '৩য় অধ্যায় - দুতরফা দাখিলা পদ্ধতি',
      '৪র্থ অধ্যায় - মূলধন ও মুনাফাজাতীয় লেনদেন',
      '৫ম অধ্যায় - হিসাবের শ্রেণিবিভাগ',
      '৬ষ্ঠ অধ্যায় - জাবেদা (Journal)',
      '৭ম অধ্যায় - খতিয়ান (Ledger)',
      '৮ম অধ্যায় - নগদান বই (Cash Book)',
      '৯ম অধ্যায় - রেওয়ামিল (Trial Balance)',
      '১০ম অধ্যায় - আর্থিক বিবরণী (Financial Statements)'
    ]
  },
  {
    id: 'co-finance',
    group: 'commerce',
    nameBn: 'ফিন্যান্স ও ব্যাংকিং',
    nameEn: 'Finance and Banking',
    chapters: [
      '১ম অধ্যায় - অর্থায়ন ও ব্যবসায় অর্থায়ন',
      '২য় অধ্যায় - অর্থায়নের উৎস সমূহ',
      '৩য় অধ্যায় - অর্থের সময়মূল্য (Time Value of Money)',
      '৪র্থ অধ্যায় - ঝুঁকি ও অনিশ্চয়তা',
      '৫ম অধ্যায় - মূলধনি আয়-ব্যয় প্রাক্কলন',
      '৮ম অধ্যায় - ব্যাংক ব্যবস্থার প্রাথমিক ধারণা',
      '১০ম অধ্যায় - বাণিজ্যিক ব্যাংক ও তার কার্যক্রম'
    ]
  },
  {
    id: 'co-entrepreneurship',
    group: 'commerce',
    nameBn: 'ব্যবসায় উদ্যোগ',
    nameEn: 'Business Entrepreneurship',
    chapters: [
      '১ম অধ্যায় - ব্যবসায় পরিচিতি',
      '২য় অধ্যায় - ব্যবসায় উদ্যোগ ও উদ্যোক্তা',
      '৩য় অধ্যায় - আত্মকর্মসংস্থান',
      '৪র্থ অধ্যায় - মালিকানার ভিত্তিতে ব্যবসায় সংগঠন',
      '৫ম অধ্যায় - ব্যবসায় আইনগত দিক ও ট্রেড লাইসেন্স',
      '৮ম অধ্যায় - ব্যবসায় পরিকল্পনা প্রণয়ন'
    ]
  },
  {
    id: 'co-gen-science',
    group: 'commerce',
    nameBn: 'বিজ্ঞান',
    nameEn: 'General Science',
    chapters: [
      '১ম অধ্যায় - উন্নততর জীবনধারা ও ভিটামিন',
      '২য় অধ্যায় - পানিই জীবন ও পানির বিশুদ্ধকরণ',
      '৩য় অধ্যায় - হৃৎযন্ত্রের যত কথা ও রক্তচাপ',
      '৭ম অধ্যায় - অম্ল, ক্ষারক ও লবণের ব্যবহার'
    ]
  },
  {
    id: 'co-geography',
    group: 'commerce',
    nameBn: 'ভূগোল ও পরিবেশ',
    nameEn: 'Geography and Environment (Commerce)',
    chapters: [
      '১ম অধ্যায় - প্রাকৃতিক পরিবেশ ও অর্থনৈতিক কর্মকাণ্ড',
      '২য় অধ্যায় - বাংলাদেশের কৃষি ও শিল্প সম্পদ',
      '৩য় অধ্যায় - যাতায়াত ও আন্তর্জাতিক বাণিজ্য'
    ]
  },
  {
    id: 'co-agri',
    group: 'commerce',
    nameBn: 'কৃষিশিক্ষা',
    nameEn: 'Agricultural Studies',
    chapters: [
      '১ম অধ্যায় - কৃষি প্রযুক্তি ও বীজ সংরক্ষণ',
      '২য় অধ্যায় - কৃষি উপকরণ ও আধুনিক সেচ ব্যবস্থা',
      '৩য় অধ্যায় - কৃষি ও জলবায়ু পরিবর্তন',
      '৪র্থ অধ্যায় - মাছ ও গবাদিপশু পালন পদ্ধতি'
    ]
  }
];

export const INITIAL_STUDENTS: StudentUser[] = [
  {
    id: 'stu-01',
    name: 'তানভীর হাসান',
    phone: '01712345678',
    institution: 'নটর ডেম কলেজ, ঢাকা',
    points: 450,
    approvedNotesCount: 9,
    totalSubmissions: 9,
    joinedAt: '2026-09-15'
  },
  {
    id: 'stu-02',
    name: 'সুমাইয়া আখতার',
    phone: '01898765432',
    institution: 'ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ',
    points: 350,
    approvedNotesCount: 7,
    totalSubmissions: 8,
    joinedAt: '2026-09-20'
  },
  {
    id: 'stu-03',
    name: 'মেহেদী হাসান রিয়াদ',
    phone: '01911223344',
    institution: 'ঢাকা রেসিডেনসিয়াল মডেল কলেজ',
    points: 300,
    approvedNotesCount: 6,
    totalSubmissions: 6,
    joinedAt: '2026-09-28'
  },
  {
    id: 'stu-04',
    name: 'ফারহানা ইসলাম তন্বী',
    phone: '01655443322',
    institution: 'চট্টগ্রাম কলেজ',
    points: 250,
    approvedNotesCount: 5,
    totalSubmissions: 5,
    joinedAt: '2026-10-02'
  },
  {
    id: 'stu-05',
    name: 'আবরার সাজিদ',
    phone: '01533221100',
    institution: 'রাজশাহী কলেজিয়েট স্কুল',
    points: 200,
    approvedNotesCount: 4,
    totalSubmissions: 5,
    joinedAt: '2026-10-08'
  }
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-01',
    title: 'পদার্থবিজ্ঞান গতি ও বল - শর্টকাট সূত্র ও বোর্ড প্রশ্ন সমাধান',
    subjectId: 's-physics',
    subjectNameBn: 'পদার্থবিজ্ঞান',
    subjectNameEn: 'Physics',
    group: 'science',
    chapter: '২য় অধ্যায় - গতি (Motion & Velocity)',
    classLevel: 'Class 9-10 / SSC',
    description: 'গতি অধ্যায়ের চারটি মৌলিক সমীকরণ v = u + at, s = (u+v)/2 * t, s = ut + 1/2*at^2, v^2 = u^2 + 2as এর ব্যাখ্যা, ত্বরণ-মন্দন গ্রাফ এবং ৫টি বিগত বোর্ড সৃজনশীল প্রশ্নের স্টেপ-বাই-স্টেপ ব্যাখ্যা।',
    previewSnippet: '• সমবেগ ও সুষম ত্বরণের পার্থক্যচিত্র\n• নিক্ষিপ্ত বস্তুর ক্ষেত্রে সর্বোচ্চ উচ্চতা H = u^2 / (2g)\n• প্রাস ও উলম্ব গতিসম্পর্কিত সাধারণ ভুলসমূহ\n• লেখচিত্র (v-t ও s-t গ্রাফ) থেকে দূরত্ব নির্ণয় কৌশল',
    keyFormulas: [
      'v = u + at',
      's = ut + ½ at²',
      'v² = u² + 2as',
      'H_max = u² / (2g)'
    ],
    fileType: 'pdf',
    fileName: 'SSC_Physics_Motion_Shortcuts.pdf',
    fileSize: '3.4 MB',
    pageCount: 8,
    uploaderName: 'তানভীর হাসান',
    uploaderPhone: '01712345678',
    uploaderInstitution: 'নটর ডেম কলেজ, ঢাকা',
    uploaderPointsAwarded: 50,
    status: 'approved',
    submittedAt: '2026-10-18',
    downloadsCount: 142,
    likesCount: 56,
    tags: ['পদার্থবিজ্ঞান', 'গতি', 'SSC', 'সৃজনশীল', 'শর্টকাট']
  },
  {
    id: 'note-02',
    title: 'রসায়ন পর্যায় সারণি মনে রাখার ছড়া ও ইলেক্ট্রন বিন্যাস নিয়ম',
    subjectId: 's-chemistry',
    subjectNameBn: 'রসায়ন',
    subjectNameEn: 'Chemistry',
    group: 'science',
    chapter: '৪র্থ অধ্যায় - পর্যায় সারণি (Periodic Table)',
    classLevel: 'Class 9-10 / SSC',
    description: '১ থেকে ৩০ পর্যন্ত মৌল মুখস্থ করার সবচেয়ে সহজ ছড়া, আউফবাউ নীতি, হুন্ডের নীতি এবং পর্যায় ও গ্রুপ নির্ণয়ের অত্যন্ত সহজ টেকনিক। পরীক্ষায় আসা কমন অনুধাবনমূলক প্রশ্নসহ সাজানো।',
    previewSnippet: '• গ্রুপ ১ মনে রাখার টেকনিক: "হালিনাকে রুবি ছেঁচে ফেলেছে" (H, Li, Na, K, Rb, Cs, Fr)\n• গ্রুপ ২: "বিরিয়ানি মোগলাই কাবাব সরিয়ে বাটিতে রাখো" (Be, Mg, Ca, Sr, Ba, Ra)\n• পরমাণুর আকার ও আয়নীকরণ শক্তির পর্যায়বৃত্ত ধর্ম\n• ক্রোমিয়াম ও কপারের ব্যতিক্রমী ইলেকট্রন বিন্যাসের কারণ',
    keyFormulas: [
      '2n² সূত্র দ্বারা প্রধান শক্তিস্তরের সর্বোচ্চ ইলেকট্রন',
      'আউফবাউ নীতি: 1s < 2s < 2p < 3s < 3p < 4s < 3d'
    ],
    fileType: 'pdf',
    fileName: 'Chemistry_Periodic_Table_Mastery.pdf',
    fileSize: '2.8 MB',
    pageCount: 6,
    uploaderName: 'সুমাইয়া আখতার',
    uploaderPhone: '01898765432',
    uploaderInstitution: 'ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ',
    uploaderPointsAwarded: 50,
    status: 'approved',
    submittedAt: '2026-10-17',
    downloadsCount: 98,
    likesCount: 42,
    tags: ['রসায়ন', 'পর্যায় সারণি', 'ইলেকট্রন বিন্যাস', 'SSC']
  },
  {
    id: 'note-03',
    title: 'হিসাববিজ্ঞান দুতরফা দাখিলা ও জাবেদা প্রস্তুতকরণ মাস্টার নোট',
    subjectId: 'co-accounting',
    subjectNameBn: 'হিসাববিজ্ঞান',
    subjectNameEn: 'Accounting',
    group: 'commerce',
    chapter: '৬ষ্ঠ অধ্যায় - জাবেদা (Journal)',
    classLevel: 'Class 9-10 / SSC',
    description: 'ব্যবসায়িক প্রতিটি লেনদেনের ডেবিট ও ক্রেডিট নির্ণয়ের স্বর্ণসূত্র এবং আধুনিক সমীকরণভিত্তিক নিয়ম (A = L + OE)। ক্রয় জাবেদা, বিক্রয় জাবেদা ও সাধারণ জাবেদার ছকসহ সম্পূর্ণ সমাধান।',
    previewSnippet: '• সম্পদ ও ব্যয় বৃদ্ধি পেলে ডেবিট (+), হ্রাস পেলে ক্রেডিট (-)\n• দায়, মূলধন ও আয় বৃদ্ধি পেলে ক্রেডিট (+), হ্রাস পেলে ডেবিট (-)\n• বাট্টা সংক্রান্ত জাবেদা: কারবারি বাট্টা vs নগদ বাট্টা\n• পণ্য ফেরত ও উত্তোলন হিসাবের নির্ভুল পোস্টিং নিয়ম',
    keyFormulas: [
      'A = L + OE',
      'OE = C + R - E - D (Capital + Revenue - Expenses - Drawings)'
    ],
    fileType: 'pdf',
    fileName: 'Accounting_Journal_Debit_Credit_Rules.pdf',
    fileSize: '4.1 MB',
    pageCount: 11,
    uploaderName: 'মেহেদী হাসান রিয়াদ',
    uploaderPhone: '01911223344',
    uploaderInstitution: 'ঢাকা রেসিডেনসিয়াল মডেল কলেজ',
    uploaderPointsAwarded: 50,
    status: 'approved',
    submittedAt: '2026-10-16',
    downloadsCount: 84,
    likesCount: 37,
    tags: ['হিসাববিজ্ঞান', 'জাবেদা', 'ব্যবসায় শিক্ষা', 'দুতরফা দাখিলা']
  },
  {
    id: 'note-04',
    title: 'ICT এইচটিএমএল (HTML) ট্যাগ টেবিল ও ওয়েব ফরম কোডিং হ্যান্ডবুক',
    subjectId: 'c-ict',
    subjectNameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    subjectNameEn: 'Information and Communication Technology (ICT)',
    group: 'common',
    chapter: '৪র্থ অধ্যায় - ওয়েব ডিজাইন পরিচিতি ও HTML',
    classLevel: 'Class 11-12 / HSC',
    description: 'এইচএসসি ও এসএসসি সিলেবাসের এইচটিএমএল টেবিল তৈরি (rowspan, colspan), হাইপারলিংক, ইমেজ ইনসার্ট এবং ফর্ম এলিমেন্টের হ্যান্ডরিটেন কোড স্নিপেট ও আউটপুট চিত্র।',
    previewSnippet: '• টেবিল মার্জিং: <td colspan="2"> এবং <td rowspan="3">\n• হাইপারলিঙ্ক: <a href="url" target="_blank">লিঙ্ক টেক্সট</a>\n• ইমেজ ট্যাগ ও অ্যাট্রিবিউট: <img src="image.jpg" alt="বিবরণ" width="300">\n• ক্রিয়েটিভ প্রশ্নের জন্য সাধারণ টেবিল স্ট্রাকচার',
    keyFormulas: [
      '<table> <tr> <th> <td> ট্যাগ হায়ারার্কি',
      'সংখ্যাতত্ত্ব রূপান্তর: বাইনারি ↔ অক্টাল ↔ হেক্সাডেসিমেল'
    ],
    fileType: 'pdf',
    fileName: 'ICT_HTML_WebDesign_Handwritten_Notes.pdf',
    fileSize: '2.5 MB',
    pageCount: 7,
    uploaderName: 'তানভীর হাসান',
    uploaderPhone: '01712345678',
    uploaderInstitution: 'নটর ডেম কলেজ, ঢাকা',
    uploaderPointsAwarded: 50,
    status: 'approved',
    submittedAt: '2026-10-15',
    downloadsCount: 176,
    likesCount: 89,
    tags: ['ICT', 'HTML', 'HSC', 'SSC', 'কোডিং']
  },
  {
    id: 'note-05',
    title: 'পৌরনীতি ও নাগরিকতা - রাষ্ট্র, সংবিধান ও মৌলিক অধিকার সারসংক্ষেপ',
    subjectId: 'a-civics',
    subjectNameBn: 'পৌরনীতি ও নাগরিকতা',
    subjectNameEn: 'Civics and Citizenship',
    group: 'arts',
    chapter: '৫ম অধ্যায় - সংবিধান ও এর বৈশিষ্ট্য',
    classLevel: 'Class 9-10 / SSC',
    description: '১৯৭২ সালের বাংলাদেশের সংবিধানের মূল চার মূলনীতি, মৌলিক অধিকারসমূহ, আইন প্রণয়ন প্রক্রিয়া এবং লিখিত সংবিধানের বৈশিষ্ঠ্য বিষয়ক পূর্ণাঙ্গ রিভিশন শিট।',
    previewSnippet: '• সংবিধানের ৪ মূলনীতি: জাতীয়তাবাদ, সমাজতন্ত্র, গণতন্ত্র ও ধর্মনিরপেক্ষতা\n• সংবিধান গৃহীত: ৪ নভেম্বর ১৯৭২ | কার্যকর: ১৬ ডিসেম্বর ১৯৭২\n• বাংলাদেশের নাগরিকতার ধরন: দ্বৈত নাগরিকতা ও অর্জন প্রক্রিয়া\n• সংসদীয় সরকার ব্যবস্থার ক্ষমতার বণ্টন',
    keyFormulas: [
      'সংবিধানের মোট অনুচ্ছেদ: ১৫৩ টি',
      'মোট ভাগ: ১১ টি | তফসিল: ৭ টি'
    ],
    fileType: 'doc',
    fileName: 'Civics_Constitution_Summary.docx',
    fileSize: '1.9 MB',
    pageCount: 5,
    uploaderName: 'ফারহানা ইসলাম তন্বী',
    uploaderPhone: '01655443322',
    uploaderInstitution: 'চট্টগ্রাম কলেজ',
    uploaderPointsAwarded: 50,
    status: 'approved',
    submittedAt: '2026-10-14',
    downloadsCount: 65,
    likesCount: 29,
    tags: ['পৌরনীতি', 'সংবিধান', 'মানবিক', 'নাগরিকতা']
  },
  {
    id: 'note-06',
    title: 'উচ্চতর গণিত স্থানাঙ্ক জ্যামিতি ও ক্ষেত্রফল নির্ণয় সহজ সূত্র',
    subjectId: 's-highermath',
    subjectNameBn: 'উচ্চতর গণিত',
    subjectNameEn: 'Higher Mathematics',
    group: 'science',
    chapter: '১১শ অধ্যায় - স্থানাঙ্ক জ্যামিতি (Coordinate Geometry)',
    classLevel: 'Class 9-10 / SSC',
    description: 'দুই বিন্দুর দূরত্ব, ঢাল নির্ণয় (m = (y2-y1)/(x2-x1)), বহুভুজের শীর্ষবিন্দু দিয়ে ঘড়ির কাঁটার বিপরীতক্রমে ক্ষেত্রফল নির্ণয়ের শু-লেস মেথড ও সরলরেখার সমীকরণ।',
    previewSnippet: '• দূরত্ব সূত্র: d = √[(x2 - x1)² + (y2 - y1)²]\n• সরলরেখার সাধারণ সমীকরণ: y = mx + c\n• তিনটি বিন্দু সমরেখ হওয়ার শর্ত ও ঢালের সমতা\n• ত্রিভুজের ক্ষেত্রফল নির্ণয়ের ক্রস-মাল্টিপ্লিকেশন চক',
    keyFormulas: [
      'd = √[(x₂ - x₁)² + (y₂ - y₁)²]',
      'm = (y₂ - y₁) / (x₂ - x₁)',
      'Area = ½ |(x₁y₂ + x₂y₃ + x₃y₁) - (y₁x₂ + y₂x₃ + y₃x₁)|'
    ],
    fileType: 'pdf',
    fileName: 'Higher_Math_Coordinate_Geometry_Formulas.pdf',
    fileSize: '3.1 MB',
    pageCount: 9,
    uploaderName: 'আবরার সাজিদ',
    uploaderPhone: '01533221100',
    uploaderInstitution: 'রাজশাহী কলেজিয়েট স্কুল',
    uploaderPointsAwarded: 50,
    status: 'approved',
    submittedAt: '2026-10-13',
    downloadsCount: 110,
    likesCount: 48,
    tags: ['উচ্চতর গণিত', 'স্থানাঙ্ক জ্যামিতি', 'সূত্র', 'SSC']
  },
  {
    id: 'note-07',
    title: 'জীববিজ্ঞান - মাইটোসিস ও মিয়োসিস কোষ বিভাজন তুলনামূলক চিত্র',
    subjectId: 's-biology',
    subjectNameBn: 'জীববিজ্ঞান',
    subjectNameEn: 'Biology',
    group: 'science',
    chapter: '৩য় অধ্যায় - কোষ বিভাজন (Mitosis & Meiosis)',
    classLevel: 'Class 9-10 / SSC',
    description: 'প্রোফেজ, প্রো-মেটাফেজ, মেটাফেজ, অ্যানাফেজ এবং টেলোফেজ ধাপের শনাক্তকারী বৈশিষ্ট্য, ক্রসিং ওভারের তাৎপর্য এবং রঙিন চিত্রসহ স্পষ্ট হ্যান্ডনোট।',
    previewSnippet: '• মেটাফেজ: ক্রোমোজোমগুলো বিষুবীয় অঞ্চলে অবস্থান নেয় ও সবচেয়ে খাটো-মোটা হয়\n• অ্যানাফেজ: ক্রোমাটিডদ্বয় পৃথক হয়ে V, L, J, I আকৃতি ধারণ করে\n• মিয়োসিস ১ এর প্রোফেজ ১ এ ক্রসিং ওভার ও জেনেটিক বৈচিত্র্য\n• ক্যারিয়োকাইনেসিস ও সাইটোকাইনেসিস প্রক্রিয়ার ধাপসমূহ',
    keyFormulas: [
      'মাইটোসিস: মাতৃকোষ (2n) → অপত্য কোষ (2n + 2n) ২টি সমান কোষ',
      'মিয়োসিস: মাতৃকোষ (2n) → অপত্য কোষ (n + n + n + n) ৪টি হ্যাপ্লয়েড কোষ'
    ],
    fileType: 'pdf',
    fileName: 'Biology_Cell_Division_Diagrams.pdf',
    fileSize: '3.9 MB',
    pageCount: 6,
    uploaderName: 'সুমাইয়া আখতার',
    uploaderPhone: '01898765432',
    uploaderInstitution: 'ভিকারুননিসা নূন স্কুল অ্যান্ড কলেজ',
    uploaderPointsAwarded: 50,
    status: 'approved',
    submittedAt: '2026-10-12',
    downloadsCount: 133,
    likesCount: 61,
    tags: ['জীববিজ্ঞান', 'কোষ বিভাজন', 'মাইটোসিস', 'চিত্র']
  },
  {
    id: 'note-08',
    title: 'ফিন্যান্স ও ব্যাংকিং - অর্থের সময়মূল্য (TVM) ভবিষ্যৎ ও বর্তমান মূল্য',
    subjectId: 'co-finance',
    subjectNameBn: 'ফিন্যান্স ও ব্যাংকিং',
    subjectNameEn: 'Finance and Banking',
    group: 'commerce',
    chapter: '৩য় অধ্যায় - অর্থের সময়মূল্য (Time Value of Money)',
    classLevel: 'Class 9-10 / SSC',
    description: 'সরল সুদ ও চক্রবৃদ্ধি সুদের হিসাব, বার্ষিক চক্রবৃদ্ধিকরণ ও বছরে একাধিকবার চক্রবৃদ্ধিকরণ (m এর ব্যবহার), বিধি ৭২ ও বিধি ৬৯ এর প্রয়োগ।',
    previewSnippet: '• ভবিষ্যৎ মূল্য: FV = PV × (1 + i)^n\n• বছরে একাধিকবার চক্রবৃদ্ধি হলে: FV = PV × (1 + i/m)^(n × m)\n• বর্তমান মূল্য: PV = FV / (1 + i)^n\n• বিধি ৭২: ৭২ কে সুদের হার দিয়ে ভাগ করলে টাকা দ্বিগুণ হওয়ার সময় পাওয়া যায়',
    keyFormulas: [
      'FV = PV(1 + i)ⁿ',
      'FV = PV(1 + i/m)ⁿᵐ',
      'EAR = (1 + i/m)ᵐ - 1'
    ],
    fileType: 'pdf',
    fileName: 'Finance_Time_Value_of_Money_SSC.pdf',
    fileSize: '2.3 MB',
    pageCount: 5,
    uploaderName: 'মেহেদী হাসান রিয়াদ',
    uploaderPhone: '01911223344',
    uploaderInstitution: 'ঢাকা রেসিডেনসিয়াল মডেল কলেজ',
    uploaderPointsAwarded: 50,
    status: 'approved',
    submittedAt: '2026-10-10',
    downloadsCount: 71,
    likesCount: 31,
    tags: ['ফিন্যান্স', 'অর্থের সময়মূল্য', 'চক্রবৃদ্ধি', 'বাণিজ্য']
  }
];

// Sample pending note for the admin to inspect and approve/reject right out of the box!
export const INITIAL_PENDING_NOTES: NoteItem[] = [
  {
    id: 'note-pending-01',
    title: 'বাংলা ব্যাকরণ কারক ও বিভক্তি চেনার ১০০% নিশ্চিত ট্রিকস',
    subjectId: 'c-bangla',
    subjectNameBn: 'বাংলা',
    subjectNameEn: 'Bangla',
    group: 'common',
    chapter: 'ব্যাকরণ - কারক ও বিভক্তি',
    classLevel: 'Class 9-10 / SSC',
    description: 'কে/কারা দিয়ে প্রশ্ন করলে কর্তাকারক, কী/কাকে দিয়ে প্রশ্ন করলে কর্মকারক, কী দিয়ে/কী উপায়ে প্রশ্ন করলে করণ কারক। প্রতিটি কারকের ৩টি করে প্রচলিত কনফিউজিং উদাহরণ ও বিগত বিসিএস/এসএসসি সমাধান।',
    previewSnippet: '• প্রশ্নভিত্তিক শনাক্তকরণ ছক\n• অপাদান বনাম অধিকরণ কারকের সূক্ষ্ম পার্থক্য\n• বিভক্তির চিহ্ন ও রূপান্তর তালিকা\n• পরীক্ষামূলক এমসিকিউ ও অনুধাবনমূলক প্রশ্নব্যাংক',
    fileType: 'pdf',
    fileName: 'Bangla_Grammar_Karok_Vibhakti_Tricks.pdf',
    fileSize: '2.1 MB',
    pageCount: 4,
    uploaderName: 'সাদিয়া তাসনিম',
    uploaderPhone: '01799887766',
    uploaderInstitution: 'মতিঝিল আইডিয়াল স্কুল অ্যান্ড কলেজ',
    uploaderPointsAwarded: 0,
    status: 'pending',
    submittedAt: '2026-10-21',
    downloadsCount: 0,
    likesCount: 0,
    tags: ['বাংলা ব্যাকরণ', 'কারক', 'বিভক্তি', 'শর্টকাট']
  }
];
