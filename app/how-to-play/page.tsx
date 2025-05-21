'use client';

import React from 'react';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {HelpCircle, Shuffle, SplitSquareVertical} from 'lucide-react'

export default function HowToPlay() {
  const t = useTranslations('HowToPlay');
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            {t('title')}
          </span>
        </h1>
        <p className="text-xl text-foreground/80">{t('subtitle')}</p>
      </div>

      <div className="space-y-8">
        <section>
          <p className="text-lg mb-6">{t('introduction')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">{t('basicRules')}</h2>
          <p className="mb-4">{t('rulesIntro')}</p>
          <ul className="list-disc pl-6 space-y-2">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="text-foreground/90">
                {t(`rulesList.${index}`)}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">{t('lifelines')}</h2>
          <p className="mb-4">{t('lifelinesIntro')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <SplitSquareVertical className="h-5 w-5 text-primary"/>
                <h3 className="font-medium text-primary">{t('fiftyFiftyHeader')}</h3>
              </div>
              <p className="text-sm">{t('fiftyFifty')}</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="h-5 w-5 text-primary"/>
                <h3 className="font-medium text-primary">{t('hintHeader')}</h3>
              </div>
              <p className="text-sm">{t('hint')}</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shuffle className="h-5 w-5 text-primary"/>
                <h3 className="font-medium text-primary">{t('changeHeader')}</h3>
              </div>
              <p className="text-sm">{t('change')}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">{t('points')}</h2>
          <p className="mb-4">{t('pointsIntro')}</p>
          <ul className="list-disc pl-6 space-y-2">
            {[0, 1, 2].map((index) => (
              <li key={index} className="text-foreground/90">
                {t(`pointsList.${index}`)}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-money-green font-medium">{t('bonusPoints')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">{t('leaderboard')}</h2>
          <p>{t('leaderboardInfo')}</p>
        </section>

        <section className="text-center pt-6">
          <h2 className="text-2xl font-semibold mb-6">{t('readyToPlay')}</h2>
          <Button
            onClick={() => router.push('/play/random')}
            className="px-10 py-7 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white text-lg font-medium rounded-lg"
          >
            {t('returnHome')}
          </Button>
        </section>
      </div>
    </div>
  );
}
