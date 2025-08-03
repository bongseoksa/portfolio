import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import SimpleIcon from './SimpleIcon';
import { siGithub } from 'simple-icons';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t('footer.copyright')}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="mailto:qhdtjr1004@naver.com"
            className="text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="https://github.com/bongseoksa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <SimpleIcon svgData={siGithub.svg} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
