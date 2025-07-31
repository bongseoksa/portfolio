import React from 'react';
import { useTranslation } from 'react-i18next';
import { experiences } from '../data/portfolio';
import type { Achievement } from '../types/portfolio';

const CareerSection: React.FC = () => {
  const { t } = useTranslation();

  // 텍스트에서 링크를 적용하는 함수
  const renderTextWithLinks = (text: string, links: Record<string, string>) => {
    if (Object.keys(links).length === 0) {
      return text;
    }

    // 모든 링크 키워드를 정규식으로 찾아서 한 번에 처리
    const linkKeywords = Object.keys(links);
    const regex = new RegExp(`(${linkKeywords.join('|')})`, 'g');

    const parts: (string | React.JSX.Element)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const keyword = match[0];
      const url = links[keyword];

      // 매치 이전 텍스트 추가
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // 링크 추가
      parts.push(
        <a
          key={`${keyword}-${match.index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {keyword}
        </a>
      );

      lastIndex = match.index + keyword.length;
    }

    // 마지막 매치 이후 텍스트 추가
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <section id="career" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('career.title')}</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
                  <p className="text-lg text-gray-700">{exp.position}</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  <p>{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 whitespace-pre-line">{exp.description}</p>
              <div>
                <h4 className="font-medium">{t('career.achievements')}</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {exp.achievements.map((achievement: Achievement, i: number) => (
                    <li key={i}>{renderTextWithLinks(achievement.text, achievement.links)}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
