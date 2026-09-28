import React, { useState } from 'react';
import { X, Globe, Sparkles, BookOpen } from 'lucide-react';
import { VNPT_SERVICES } from '../data/services';
import { getQuestionsByService } from '../data/questions';

interface ServicesModalProps {
  onClose: () => void;
}

export const ServicesModal: React.FC<ServicesModalProps> = ({ onClose }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(VNPT_SERVICES[0].id);
  const activeService = VNPT_SERVICES.find((s) => s.id === activeServiceId) || VNPT_SERVICES[0];
  const sampleQuestions = getQuestionsByService(activeService.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border-2 border-sky-500/60 rounded-2xl max-w-3xl w-full p-6 text-white max-h-[90vh] flex flex-col relative shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl font-black text-white">
              HỆ SINH THÁI DỊCH VỤ SỐ VNPT
            </h2>
          </div>
          <button
            id="close-services-btn"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-column layout: Left service selector, Right detailed card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto pr-1 flex-1">
          {/* Left: Services List */}
          <div className="md:col-span-1 space-y-1.5 overflow-y-auto max-h-96 md:max-h-none pr-1">
            {VNPT_SERVICES.map((s) => {
              const isSelected = s.id === activeServiceId;
              return (
                <button
                  key={s.id}
                  id={`service-item-${s.id}`}
                  onClick={() => setActiveServiceId(s.id)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition cursor-pointer border ${
                    isSelected
                      ? 'bg-sky-950/80 border-sky-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: s.colorTheme }}
                  />
                  <span className="truncate">{s.name}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Service Card */}
          <div className="md:col-span-2 bg-slate-800/80 border border-slate-700 rounded-xl p-5 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black text-white shrink-0 border border-white/20 shadow-md"
                style={{ backgroundColor: activeService.colorTheme }}
              >
                {activeService.name.replace('VNPT ', '').slice(0, 3)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {activeService.name}
                </h3>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-950 text-sky-400 border border-sky-800/60">
                  {activeService.category}
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-5">
              {activeService.shortDescription}
            </p>

            <div className="mt-auto border-t border-slate-700/70 pt-3">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                Ví dụ câu hỏi trắc nghiệm trong game:
              </div>
              {sampleQuestions.length > 0 && (
                <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700/70 text-xs">
                  <div className="font-semibold text-slate-200 mb-2">
                    {sampleQuestions[0].question}
                  </div>
                  <div className="text-emerald-400 font-medium flex items-center gap-1">
                    ✓ Đáp án đúng: {sampleQuestions[0].options[sampleQuestions[0].answer]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 mt-4 shrink-0">
          <button
            id="close-services-modal-btn"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 font-bold text-sm text-white transition cursor-pointer"
          >
            ĐÓNG
          </button>
        </div>
      </div>
    </div>
  );
};
