'use client';

import { AnimatePresence, motion, wrap } from 'motion/react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function UsePresenceData() {
  const { t } = useTranslation();
  const abouts = t('hero.about', { returnObjects: true }) as unknown[];
  const items = Array.isArray(abouts) ? abouts.map((_, i) => i) : [0];
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const selectedItemRef = useRef(selectedItem);

  const setSlide = useCallback(
    (newDirection: 1 | -1) => {
      const nextItem = wrap(0, items.length, selectedItemRef.current + newDirection);
      setSelectedItem(nextItem);
    },
    [items.length]
  );

  // selectedItem이 변경될 때마다 ref 업데이트
  useEffect(() => {
    selectedItemRef.current = selectedItem;
  }, [selectedItem]);

  useEffect(() => {
    const slideInterval = setInterval(() => setSlide(1), 6000);
    return () => clearInterval(slideInterval);
  }, [setSlide]);

  return (
    <div>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          <span className="whitespace-pre-line">{t('hero.title')}</span>
        </motion.h1>
        <Slide key={selectedItem} selectedItem={selectedItem} />
      </AnimatePresence>
    </div>
  );
}

const Slide = forwardRef(function Slide(
  { selectedItem }: { selectedItem: number },
  ref: React.Ref<HTMLDivElement>
) {
  const { t } = useTranslation();
  const abouts = t('hero.about', { returnObjects: true });
  return (
    <motion.div
      className="space-y-2 h-36 sm:h-40 xl:h-44"
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: 0.2,
          type: 'spring',
          visualDuration: 0.3,
          bounce: 0.4
        }
      }}
      exit={{ opacity: 0, x: -50 }}
    >
      {Array.isArray(abouts) && abouts.length > selectedItem && abouts[selectedItem] ? (
        <>
          <h2 className="text-xl font-bold tracking-tighter sm:text-3xl xl:text-4xl/none">
            <span className="whitespace-pre-line">{abouts[selectedItem].subtitle}</span>
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            {abouts[selectedItem].description}
          </p>
        </>
      ) : null}
    </motion.div>
  );
});
