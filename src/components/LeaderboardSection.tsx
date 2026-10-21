import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Crown, 
  Search, 
  Upload
} from 'lucide-react';

interface LeaderboardSectionProps {
  onOpenSubmitModal: () => void;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ onOpenSubmitModal }) => {
  const { t, students, currentStudent } = useApp();
  const [search, setSearch] = useState('');

  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => b.points - a.points);
  }, [students]);

  const filteredStudents = useMemo(() => {
    if (!search.trim()) return sortedStudents;
    const q = search.toLowerCase().trim();
    return sortedStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.institution && s.institution.toLowerCase().includes(q))
    );
  }, [sortedStudents, search]);

  const top1 = sortedStudents[0];
  const top2 = sortedStudents[1];
  const top3 = sortedStudents[2];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 text-black dark:text-white">
      
      {/* Title & Explainer */}
      <div className="text-center space-y-2 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-black border border-black/15 dark:border-white/25 text-red-600 text-xs font-bold shadow-sm">
          <Trophy className="w-3.5 h-3.5" />
          <span>কন্ট্রিবিউটর লিডারবোর্ড</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
          শীর্ষ নোট কন্ট্রিবিউটর তালিকা
        </h2>
        <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed">
          প্রতিটি অনুমোদিত নোটে শিক্ষার্থীরা পাচ্ছেন ৫০ পয়েন্ট।
        </p>
      </div>

      {/* Top 3 Podium (Red, White & Black - Zero Grey Box) */}
      {sortedStudents.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-4 items-end max-w-3xl mx-auto">
          
          {/* 2nd Place */}
          <div className="order-2 md:order-1 bg-white dark:bg-black rounded-3xl p-5 text-center space-y-3 border border-black/15 dark:border-white/20 relative shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold flex items-center justify-center mx-auto absolute -top-3 left-1/2 -translate-x-1/2 shadow">
              2
            </div>
            <div className="pt-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-white dark:bg-black border-2 border-black/20 dark:border-white/30 flex items-center justify-center text-black dark:text-white text-xl font-bold">
                {top2.name.charAt(0)}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-black dark:text-white truncate">
                {top2.name}
              </h4>
              <p className="text-xs text-black/60 dark:text-white/60 truncate">
                {top2.institution || 'শিক্ষার্থী'}
              </p>
            </div>
            <div className="p-2.5 rounded-2xl bg-white dark:bg-black border border-black/15 dark:border-white/20 font-mono text-xs">
              <span className="text-base font-bold text-red-600 tabular-nums">
                {top2.points}
              </span>{' '}
              <span className="text-black/60 dark:text-white/60">পয়েন্ট</span>
              <p className="text-[11px] text-black/50 dark:text-white/50 mt-0.5">
                {top2.approvedNotesCount} টি অনুমোদিত নোট
              </p>
            </div>
          </div>

          {/* 1st Place (Red Spotlight) */}
          <div className="order-1 md:order-2 bg-white dark:bg-black rounded-3xl p-6 text-center space-y-3.5 border-2 border-red-600 shadow-xl relative -translate-y-2">
            <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center mx-auto absolute -top-5 left-1/2 -translate-x-1/2 shadow-lg shadow-red-600/40">
              <Crown className="w-5 h-5" />
            </div>
            <div className="pt-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-red-600/30">
                {top1.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider mb-1">
                শীর্ষ কন্ট্রিবিউটর
              </div>
              <h4 className="text-lg font-bold text-black dark:text-white truncate">
                {top1.name}
              </h4>
              <p className="text-xs text-black/60 dark:text-white/60 truncate">
                {top1.institution || 'শিক্ষার্থী'}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-black border border-red-600/40 font-mono text-xs">
              <span className="text-xl font-bold text-red-600 tabular-nums">
                {top1.points}
              </span>{' '}
              <span className="text-black/60 dark:text-white/60 font-sans font-bold">পয়েন্ট</span>
              <p className="text-[11px] text-black/50 dark:text-white/50 mt-0.5">
                {top1.approvedNotesCount} টি অনুমোদিত নোট
              </p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 bg-white dark:bg-black rounded-3xl p-5 text-center space-y-3 border border-black/15 dark:border-white/20 relative shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold flex items-center justify-center mx-auto absolute -top-3 left-1/2 -translate-x-1/2 shadow">
              3
            </div>
            <div className="pt-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-white dark:bg-black border-2 border-black/20 dark:border-white/30 flex items-center justify-center text-black dark:text-white text-xl font-bold">
                {top3.name.charAt(0)}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-black dark:text-white truncate">
                {top3.name}
              </h4>
              <p className="text-xs text-black/60 dark:text-white/60 truncate">
                {top3.institution || 'শিক্ষার্থী'}
              </p>
            </div>
            <div className="p-2.5 rounded-2xl bg-white dark:bg-black border border-black/15 dark:border-white/20 font-mono text-xs">
              <span className="text-base font-bold text-red-600 tabular-nums">
                {top3.points}
              </span>{' '}
              <span className="text-black/60 dark:text-white/60">পয়েন্ট</span>
              <p className="text-[11px] text-black/50 dark:text-white/50 mt-0.5">
                {top3.approvedNotesCount} টি অনুমোদিত নোট
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Full Leaderboard Table Container (Zero Grey Box) */}
      <div className="bg-white dark:bg-black rounded-3xl p-5 sm:p-6 space-y-4 border border-black/15 dark:border-white/20 shadow-[0_10px_30px_rgba(220,38,38,0.04)]">
        
        {/* Search Filter & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 dark:text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="শিক্ষার্থী বা প্রতিষ্ঠানের নাম..."
              className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-black text-black dark:text-white border border-black/15 dark:border-white/25 focus:outline-none focus:border-red-600"
            />
          </div>

          <button
            onClick={onOpenSubmitModal}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
          >
            <Upload className="w-4 h-4" />
            <span>নোট জমা দিয়ে র‍্যাংক বাড়ান</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/15 text-black/60 dark:text-white/60 font-bold">
                <th className="py-3 px-3 text-center w-16">{t.leaderboardRank}</th>
                <th className="py-3 px-3">{t.leaderboardStudent}</th>
                <th className="py-3 px-3 hidden sm:table-cell">{t.leaderboardInstitution}</th>
                <th className="py-3 px-3 text-center">{t.leaderboardApproved}</th>
                <th className="py-3 px-3 text-right font-mono">{t.leaderboardPoints}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/10">
              {filteredStudents.map((stu, index) => {
                const rank = index + 1;
                const isCurrent = currentStudent?.phone === stu.phone;

                return (
                  <tr
                    key={stu.id}
                    className={`transition-colors ${
                      isCurrent ? 'bg-red-600/10 font-bold' : 'hover:bg-red-500/5'
                    }`}
                  >
                    <td className="py-3.5 px-3 text-center">
                      {rank === 1 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs shadow-sm">
                          1
                        </span>
                      ) : rank === 2 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-xs">
                          2
                        </span>
                      ) : rank === 3 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-black/30 dark:border-white/30 text-black dark:text-white font-bold text-xs">
                          3
                        </span>
                      ) : (
                        <span className="font-mono text-black/50 dark:text-white/50 font-bold">
                          #{rank}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-black border border-black/20 dark:border-white/30 text-black dark:text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {stu.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-black dark:text-white truncate flex items-center gap-1.5">
                            <span>{stu.name}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                                আপনি
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-black/50 dark:text-white/50 sm:hidden truncate">
                            {stu.institution || 'শিক্ষার্থী'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 hidden sm:table-cell text-black/70 dark:text-white/70 truncate max-w-xs">
                      {stu.institution || '—'}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono tabular-nums text-black/80 dark:text-white/80">
                      {stu.approvedNotesCount}
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <span className="font-mono font-bold text-red-600 text-sm sm:text-base tabular-nums">
                        {stu.points}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
