import { motion } from 'framer-motion';
import { useI18n } from '../useI18n.js';
import { Github, Linkedin, Instagram } from 'lucide-react';
import Button from '../components/ui/Button';
import { motionProps } from '../utils/motion';
import { useEffect, useState } from 'react';
// Imagens locais (perfil e família)
import profileImg from '../assets/profile/20220705_153751.jpg';
import criacao1 from '../assets/criacao/IMG-20190724-WA0034.jpg';
import criacao2 from '../assets/criacao/IMG-20210717-WA0021.jpg';
import criacao3 from '../assets/criacao/IMG-20200101-WA0000.jpg';
import { campaign as campaignData } from '../data/campaign.js';
// QRCode do PIX e lista de contribuintes (fallback)
import pixQR from '../assets/QRCode/Captura de tela de 2025-08-11 11-42-12.png';
import contributorsRaw from '../assets/contirbuintes/NU-transferencias-recebidas-nomes.txt?raw';
// Imagens locais por seção
import destaque1 from '../assets/destaques/12291318_976974692375685_4521701990103217632_o.jpg';
import destaque2 from '../assets/destaques/52.jpg';
import destaque3 from '../assets/destaques/IMG-20190607-WA0032.jpg';
import fortal1 from '../assets/fortal/IMG_20190916_191600751_HDR.jpg';
import fortal2 from '../assets/fortal/IMG_20190919_161804113_HDR.jpg';
import fortal3 from '../assets/fortal/IMG-20200215-WA0014.jpg';
import insper1 from '../assets/InsperPB/20230517_105114.jpg';
import insper2 from '../assets/InsperPB/IMG-20210822-WA0008.jpg';
import insper3 from '../assets/InsperPB/IMG-20220607-WA0000.jpg';
import insper4 from '../assets/InsperPB/IMG-20220617-WA0005.jpg';
import insper5 from '../assets/InsperPB/IMG-20220711-WA0014.jpg';
import insper6 from '../assets/InsperPB/IMG-20221211-WA0005.jpg';
import thiImg from '../assets/Ingolstadt/THI.jpg';
import ingolstadtChristkindl from '../assets/Ingolstadt/IngolstadtChristkindlmarktTheaterplatzErichReisinger.jpg';
import ingolstadtRathausplatz from '../assets/Ingolstadt/IngolstadtRathausplatz.jpg';

// Garante referência explícita para satisfazer o linter quando usado em JSX
const __MOTION_USED = motion;

// (removido) useHeaderOffset – agora usamos scroll-padding no contêiner

// Hook reutilizável para detectar mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 767px)');
    const onChangeMobile = () => setIsMobile(mqMobile.matches);
    onChangeMobile();
    mqMobile.addEventListener('change', onChangeMobile);
    return () => mqMobile.removeEventListener('change', onChangeMobile);
  }, []);
  return isMobile;
};

// Novo: Bloqueio de landscape com altura baixa (sem CSS externo)
const useLandscapeBlock = () => {
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    const mqLandscape = window.matchMedia('(orientation: landscape)');
    const mqLowH = window.matchMedia('(max-height: 500px)');
    const update = () => setBlocked(mqLandscape.matches && mqLowH.matches);
    update();
    mqLandscape.addEventListener('change', update);
    mqLowH.addEventListener('change', update);
    return () => {
      mqLandscape.removeEventListener('change', update);
      mqLowH.removeEventListener('change', update);
    };
  }, []);
  return blocked;
};

// Destaque visual reutilizável
const Highlight = ({ children }) => (
  <span style={{ color: '#93c5fd', fontWeight: 700 }}>{children}</span>
);

// Galeria responsiva: sanfona (desktop) e carrossel com snap (mobile)
// positions: objeto opcional { [src]: 'center top' } para ajustar o foco por imagem
const AccordionGallery = ({ images = [], positions = {}, delay = 0, compact = false }) => {
  const [active, setActive] = useState(null);
  const isMobile = useIsMobile();
  const [shortVH, setShortVH] = useState(false);

  useEffect(() => {
    const mqShort = window.matchMedia('(max-height: 420px)');
    const handlerShort = () => setShortVH(mqShort.matches);
    handlerShort();
    mqShort.addEventListener('change', handlerShort);
    return () => {
      mqShort.removeEventListener('change', handlerShort);
    };
  }, []);

  const baseHeight = shortVH ? 160 : 240;

  if (isMobile) {
    return (
      <motion.div
        className="gallery-carousel"
        style={{
          display: 'flex', gap: 10,
          overflowX: 'auto',
          padding: '0.25rem 0.25rem 0.5rem',
          margin: `${compact ? '0.5rem' : '1rem'} auto 0`,
          maxWidth: 900,
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
        {...motionProps.fadeInUp(delay)}
      >
        {images.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            style={{
              flex: '0 0 auto',
              width: 'min(78vw, 320px)',
              height: baseHeight,
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid #2c567e',
              background: 'rgba(2,6,23,0.4)',
              scrollSnapAlign: 'start',
              position: 'relative'
            }}
          >
            <img
              src={src}
              alt="Galeria"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: positions[src] || 'center', display: 'block' }}
              loading="lazy"
            />
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient( to top, rgba(2,6,23,0.4), rgba(2,6,23,0) )' }} />
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="gallery-accordion"
      style={{
        display: 'flex',
        gap: 10,
        maxWidth: 900,
        margin: `${compact ? '0.5rem' : '1rem'} auto 0`,
        height: baseHeight,
        alignItems: 'stretch',
        overflow: 'hidden'
      }}
      {...motionProps.fadeInUp(delay)}
    >
      {images.map((src, idx) => (
        <div
          key={`${src}-${idx}`}
          onMouseEnter={() => setActive(idx)}
          onMouseLeave={() => setActive(null)}
          style={{
            flex: active === idx ? 3 : 1,
            transition: 'all .3s ease',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid #2c567e',
            background: 'rgba(2,6,23,0.4)',
            position: 'relative',
            minWidth: 0
          }}
        >
          <img
            src={src}
            alt="Galeria"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: positions[src] || 'center', display: 'block', filter: active === idx ? 'none' : 'grayscale(8%)', opacity: 0.98 }}
            loading="lazy"
          />
          <span style={{
            position: 'absolute', inset: 0,
            background: active === idx ? 'linear-gradient( to top, rgba(2,6,23,0.35), rgba(2,6,23,0) )' : 'linear-gradient( to top, rgba(2,6,23,0.5), rgba(2,6,23,0) )',
            pointerEvents: 'none'
          }} />
        </div>
      ))}
    </motion.div>
  );
};

// Seção Hero do intercâmbio
const ExchangeHero = () => {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  return (
    <motion.section
      id="exchange-hero"
      className="hero section"
      style={{
        minHeight: isMobile ? 'auto' : 'min(100svh, calc(100vh - 60px))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        color: '#f8fafc',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        overflow: 'visible',
        // padding-top removido para evitar "padding duplo" pós-snap; usamos scroll-padding do contêiner
        padding: '0 0 3rem',
        zIndex: 0,
        scrollMarginTop: `0px`
      }}
      {...motionProps.pageEnter(0)}
    >
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.h1
          className="exchange-heading"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('exchange_hero_title')}
        </motion.h1>
        
        {/* Conteúdo em duas colunas: texto + imagem lateral */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', maxWidth: 1100, margin: '0 auto', flexDirection: isMobile ? 'column' : 'row' }}>
          {/* Texto */}
          <motion.div
            style={{ 
              fontSize: 'clamp(1.05rem, 2.4vw, 1.25rem)',
              color: '#cbd5e1',
              textAlign: 'left',
              lineHeight: 1.75,
              letterSpacing: '0.2px',
              fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto',
              flex: isMobile ? '1 1 100%' : '1 1 520px',
              minWidth: 280,
              maxWidth: isMobile ? '700px' : 'unset',
              margin: isMobile ? '0 auto' : undefined,
              overflowWrap: 'anywhere',
              wordBreak: 'normal',
              hyphens: 'auto'
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <p style={{ marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: t('exchange_hero_p1') }} />
            <p style={{ marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: t('exchange_hero_p2') }} />
            <p style={{ marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: t('exchange_hero_p3') }} />
            <p style={{ marginBottom: '1.25rem' }} dangerouslySetInnerHTML={{ __html: t('exchange_hero_p4') }} />

            <motion.div style={{ textAlign: 'left', display: 'flex', gap: '0.8rem', justifyContent: 'flex-start', flexWrap: 'wrap' }} {...motionProps.scaleIn(0.6)}>
              <Button
                as="button"
                onClick={() => document.getElementById('como-ajudar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                variant="primary"
                style={{ fontSize: '1.05rem', padding: '0.9rem 2.2rem' }}
              >
                {t('exchange_hero_cta_support')}
              </Button>
              <Button
                as="button"
                onClick={() => document.getElementById('planejamento')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                style={{ fontSize: '1.05rem', padding: '0.9rem 2.1rem' }}
              >
                {t('exchange_hero_cta_costs')}
              </Button>
              <Button
                as="button"
                onClick={() => document.getElementById('thi')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                style={{ fontSize: '1.05rem', padding: '0.9rem 2.1rem' }}
              >
                {t('exchange_hero_cta_institution')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Imagem lateral moderna */}
          <motion.div
            style={{ flex: isMobile ? '1 1 100%' : '0 1 380px', minWidth: 280, order: isMobile ? -1 : 0, maxWidth: isMobile ? 'min(92vw, 520px)' : undefined, marginBottom: isMobile ? '1rem' : 0 }}
            initial={{ opacity: 0, scale: 0.96, rotate: -1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.45, type: 'spring', stiffness: 80 }}
          >
            <div style={{ position: 'relative' }}>
              <div aria-hidden style={{ position: 'absolute', inset: -12, background: 'radial-gradient( 50% 50% at 50% 50%, rgba(59,130,246,0.25) 0%, rgba(59,130,246,0) 65% )', filter: 'blur(12px)' }} />
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #2c567e', background: 'linear-gradient(135deg, rgba(17,24,39,0.6), rgba(2,6,23,0.6))' }}>
                <img
                  src={profileImg}
                  alt="Foto de perfil"
                  style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '4 / 5', objectFit: 'cover' }}
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Seção: Criação
const CriacaoSection = () => {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  return (
    <section id="criacao" className="section" style={{
      // padding-top removido; o alinhamento vertical será controlado pelo scroll-padding do contêiner
      padding: isMobile ? `0 0 3rem` : '0 0 3rem',
      background: 'transparent',
      width: '100%',
      minHeight: isMobile ? 'auto' : 'min(80vh, calc(80vh - 60px))',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      overflow: 'visible',
      position: 'relative',
      // remove borda divisória superior
      borderTop: 'none',
      zIndex: 1,
      // confiamos no scrollPaddingTop do contêiner
      scrollMarginTop: `0px`
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle" style={{ marginBottom: '2rem' }}>{t('earlyLife')}</h2>
        <motion.div
          className="exchange-panel"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left', fontSize: 'clamp(1rem, 2.3vw, 1.125rem)', lineHeight: 1.8, letterSpacing: '0.2px', color: '#cbd5e1', overflowWrap: 'anywhere', hyphens: 'auto' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <>
            <p>{t('earlyLife_p1')}</p>
            <p>{t('earlyLife_p2')}</p>
            <p>{t('earlyLife_p3')}</p>
            <p>{t('earlyLife_p4')}</p>
          </>
        </motion.div>
        <AccordionGallery
          images={[criacao1, criacao2, criacao3]}
          positions={{ [criacao1]: 'center 20%' }}
          delay={0.05}
        />
      </div>
    </section>
  );
};

// Seção: Destaque Olímpico
const DestaqueOlimpicoSection = () => {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  return (
    <section id="destaque-olimpico" className="section" style={{
      // padding-top removido
      padding: isMobile ? `0 0 3rem` : '0 0 3rem',
      background: 'transparent',
      width: '100%',
      minHeight: isMobile ? 'auto' : 'min(80vh, calc(80vh - 60px))',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      overflow: 'visible',
      position: 'relative',
      // remove borda divisória superior
      borderTop: 'none',
      zIndex: 1,
      scrollMarginTop: `0px`
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle" style={{ marginBottom: '2rem' }}>{t('olympiad')}</h2>
        <motion.div
          className="exchange-panel exchange-panel--alt"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left', fontSize: 'clamp(1rem, 2.3vw, 1.125rem)', lineHeight: 1.8, letterSpacing: '0.2px', color: '#cbd5e1', overflowWrap: 'anywhere', hyphens: 'auto' }}
          {...motionProps.fadeInUp(0.05)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <>
            <p>{t('olympiad_p1')}</p>
            <p>{t('olympiad_p2')}</p>
            <p>{t('olympiad_p3')}</p>
            <p style={{ marginBottom: 0 }}>{t('olympiad_p4')}</p>
          </>
        </motion.div>
        <AccordionGallery
          images={[destaque1, destaque2, destaque3]}
          positions={{ [destaque1]: 'center 35%' }}
          delay={0.1}
        />
      </div>
    </section>
  );
};

// Seção: Primeira independência
const PrimeiraIndependenciaSection = () => {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  return (
    <section id="primeira-independencia" className="section" style={{
      // padding-top removido
      padding: isMobile ? `0 0 3rem` : '0 0 3rem',
      background: 'transparent',
      width: '100%',
      minHeight: isMobile ? 'auto' : 'min(80vh, calc(80vh - 60px))',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      overflow: 'visible',
      scrollMarginTop: `0px`
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle" style={{ marginBottom: '2rem' }}>{t('firstIndependence')}</h2>
        <motion.div
          className="exchange-panel"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.1)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <>
            <p>{t('firstIndependence_p1')}</p>
            <p>{t('firstIndependence_p2')}</p>
            <p style={{ marginBottom: 0 }}>{t('firstIndependence_p3')}</p>
          </>
        </motion.div>
        <AccordionGallery
          images={[fortal1, fortal2, fortal3]}
          positions={{ [fortal2]: 'center 40%' }}
          delay={0.15}
        />
      </div>
    </section>
  );
};

// Seção: Bolsa de Estudos no Insper
const BolsaInsperSection = () => {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  return (
    <section id="bolsa-insper" className="section" style={{
      // padding-top removido
      padding: isMobile ? `0 0 3rem` : '0 0 3rem',
      background: 'transparent',
      width: '100%',
      minHeight: isMobile ? 'auto' : 'min(80vh, calc(80vh - 60px))',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      overflow: 'visible',
      scrollMarginTop: `0px`
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle" style={{ marginBottom: '2rem' }}>{t('insper')}</h2>
        <motion.div
          className="exchange-panel exchange-panel--alt"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.15)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <>
            <p>{t('insper_p1')}</p>
            <p>{t('insper_p2')}</p>
            <p style={{ marginBottom: 0 }}>{t('insper_p3')}</p>
          </>
        </motion.div>
        <AccordionGallery
          images={[insper1, insper2, insper3, insper4, insper5, insper6]}
          positions={{ [insper1]: 'center 45%', [insper3]: 'center 35%' }}
          delay={0.2}
        />
      </div>
    </section>
  );
};

// Seção de Planejamento Financeiro
const PlanningSection = () => {
  const isMobile = useIsMobile();
  const { t, formatNumber, formatCurrency } = useI18n();
  const rate = Number(campaignData?.exchangeRate?.eurToBrl || 0);
  const asOf = campaignData?.exchangeRate?.asOf || '';
  return (
    <section id="planejamento" className="section" style={{
      // padding-top removido
      padding: isMobile ? `0 0 3rem` : '0 0 3rem',
      background: 'transparent',
      width: '100%',
      minHeight: isMobile ? 'auto' : 'min(80vh, calc(80vh - 60px))',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      overflow: 'visible',
      scrollMarginTop: `0px`
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle exchange-subtitle--red" style={{ margin: '0.25rem 0 0.6rem' }}>
          {useI18n().t('planning')}
        </h2>

        <motion.div
          className="exchange-panel exchange-panel--red"
          style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'left', paddingTop: '0.6rem' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          {(() => {
            const rows = [
              { key: 'cost_accommodation', minEur: 385.00, expEur: 385.00, minBrl: 2434.97, expBrl: 2434.97 },
              { key: 'cost_food', minEur: 205.40, expEur: 289.36, minBrl: 1298.99, expBrl: 1829.44 },
              { key: 'cost_transport', minEur: 38.00, expEur: 60.00, minBrl: 240.33, expBrl: 379.48 },
              { key: 'cost_household', minEur: 50.00, expEur: 50.00, minBrl: 316.23, expBrl: 316.23 },
              { key: 'cost_phone', minEur: 30.00, expEur: 40.00, minBrl: 189.74, expBrl: 252.99 },
              { key: 'cost_health', minEur: 144.00, expEur: 144.00, minBrl: 910.13, expBrl: 910.13 },
            ];
            const subtotal = rows.reduce((acc, r) => ({
              minEur: acc.minEur + r.minEur,
              expEur: acc.expEur + r.expEur,
              minBrl: acc.minBrl + r.minBrl,
              expBrl: acc.expBrl + r.expBrl
            }), { minEur: 0, expEur: 0, minBrl: 0, expBrl: 0 });
            const semester = {
              minEur: subtotal.minEur * 6,
              expEur: subtotal.expEur * 6,
              minBrl: subtotal.minBrl * 6,
              expBrl: subtotal.expBrl * 6,
            };
            const fixed = [
              { key: 'cost_apartmentFees', minEur: 285.00, expEur: 285.00, minBrl: 1802.51, expBrl: 1802.51 },
              { key: 'cost_deposit', minEur: 770.00, expEur: 770.00, minBrl: 4869.94, expBrl: 4869.94 },
              { key: 'cost_residencePermit', minEur: 100.00, expEur: 120.00, minBrl: 632.46, expBrl: 758.95 },
              { key: 'cost_airfare', minEur: null, expEur: null, minBrl: 5000.00, expBrl: 6500.00 },
              { key: 'cost_emergency', minEur: null, expEur: null, minBrl: 5000.00, expBrl: 5000.00 }
            ];
            const total = fixed.reduce((acc, r) => ({
              minBrl: acc.minBrl + (r.minBrl || 0),
              expBrl: acc.expBrl + (r.expBrl || 0)
            }), { minBrl: semester.minBrl, expBrl: semester.expBrl });
            return (
              <table className="budget-table" aria-label={t('planning')}>
                <thead>
                  <tr>
                    <th>{t('table_item')}</th>
                    <th>{t('table_minEuro')}</th>
                    <th>{t('table_expEuro')}</th>
                    <th>{t('table_minBRL')}</th>
                    <th>{t('table_expBRL')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.key}>
                      <td>{t(r.key)}</td>
                      <td>{formatNumber(r.minEur, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>{formatNumber(r.expEur, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td>{formatCurrency(r.minBrl, 'BRL')}</td>
                      <td>{formatCurrency(r.expBrl, 'BRL')}</td>
                    </tr>
                  ))}
                  <tr className="row-subtotal">
                    <td>{t('cost_subtotalMonthly')}</td>
                    <td>{formatNumber(subtotal.minEur, { minimumFractionDigits: 2 })}</td>
                    <td>{formatNumber(subtotal.expEur, { minimumFractionDigits: 2 })}</td>
                    <td>{formatCurrency(subtotal.minBrl, 'BRL')}</td>
                    <td>{formatCurrency(subtotal.expBrl, 'BRL')}</td>
                  </tr>
                  <tr className="row-semester">
                    <td>{t('cost_semester')}</td>
                    <td>{formatNumber(semester.minEur, { minimumFractionDigits: 2 })}</td>
                    <td>{formatNumber(semester.expEur, { minimumFractionDigits: 2 })}</td>
                    <td>{formatCurrency(semester.minBrl, 'BRL')}</td>
                    <td>{formatCurrency(semester.expBrl, 'BRL')}</td>
                  </tr>
                  {fixed.map(r => (
                    <tr key={r.key} className={r.key === 'cost_apartmentFees' ? 'row-fixed-start' : undefined}>
                      <td>{t(r.key)}</td>
                      <td>{r.minEur == null ? '' : formatNumber(r.minEur, { minimumFractionDigits: 2 })}</td>
                      <td>{r.expEur == null ? '' : formatNumber(r.expEur, { minimumFractionDigits: 2 })}</td>
                      <td>{formatCurrency(r.minBrl, 'BRL')}</td>
                      <td>{formatCurrency(r.expBrl, 'BRL')}</td>
                    </tr>
                  ))}
                  <tr className="row-total">
                    <td>{t('cost_totalEstimated')}</td>
                    <td></td>
                    <td></td>
                    <td>{formatCurrency(total.minBrl, 'BRL')}</td>
                    <td>{formatCurrency(total.expBrl, 'BRL')}</td>
                  </tr>
                </tbody>
              </table>
            );
          })()}
          {/* Linha de cotação abaixo da tabela */}
          <div className="rate-row" style={{ marginTop: 10, paddingTop: 8, borderTop: '1px dashed var(--color-border)' }}>
            <small style={{ color: 'var(--color-text-secondary)' }}>
              {t('rate_used')}: 1 € = R$ {formatNumber(rate, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              {' '}<span style={{ color: 'var(--color-text-muted)' }}>({t('date_in')} {asOf || '--/--/---- --:--'})</span>
            </small>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Seção Como Ajudar
const ExchangeContact = () => {
  const isMobile = useIsMobile();
  const { t, formatCurrency, formatDate } = useI18n();
  const goal = Number(campaignData.goalBRL || 0);
  const raised = Number(campaignData.raisedBRL || 0);
  const pct = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
  const pixKey = '01tato02@gmail.com';
  const lastUpdatedRaw = campaignData?.lastUpdated || campaignData?.exchangeRate?.asOf || '';
  const formatLastUpdated = (raw) => {
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d.getTime())) return String(raw);
    // formatDate vindo do escopo superior
    return formatDate(d, { dateStyle: 'short', timeStyle: 'short' });
  };
  const lastUpdated = formatLastUpdated(lastUpdatedRaw);
  // t já disponível via hook acima
  return (
    <section id="como-ajudar" className="section" style={{
      // padding-top removido
      padding: isMobile ? `0.5rem 0 3rem` : '0 0 3rem',
      background: 'transparent',
      width: '100%',
      // No mobile deixa altura auto para não cortar grid; em desktop mantém uma altura confortável
      minHeight: isMobile ? 'auto' : 'min(80vh, calc(80vh - 60px))',
      display: isMobile ? 'block' : 'flex',
      alignItems: isMobile ? undefined : 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      overflow: 'visible',
      // Compensa header fixo - reduzido para menos espaço
      scrollMarginTop: isMobile ? '20px' : '30px'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle" style={{
          marginBottom: '1.5rem',
          fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : undefined
        }}>
          {t('howHelp')}
        </h2>
        {/* Painel de contribuintes movido para seção final */}

        <motion.div
          className="exchange-panel"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'left',
            padding: isMobile ? '0.5rem' : undefined
          }}
          {...motionProps.fadeInUp(0.2)}
        >
          <span className="panel-accent" aria-hidden="true" />

          {/* Progresso da campanha (agora dentro do mesmo painel para igualar a largura) */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'var(--color-text-secondary)', fontSize: 14, gap: 12 }}>
              <span>{t('raised')}: {formatCurrency(raised, 'BRL')}</span>
              <span>{t('goal')}: {formatCurrency(goal, 'BRL')} ({pct}%)</span>
            </div>
            <div style={{ height: 10, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 999, overflow: 'hidden', marginTop: 6 }}>
              <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-accent), #1d4ed8)', transition: 'width .4s ease' }} />
            </div>
            {lastUpdated ? (
              <div style={{ marginTop: 6, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, color: 'var(--color-text-muted)', fontSize: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--color-accent)', display: 'inline-block' }} />
                <span>{t('updated')}: {lastUpdated}</span>
              </div>
            ) : null}
          </div>

          {/* Grid de doações: dois grandes (PIX e Wise) lado a lado, dois menores (TED e Compartilhar) abaixo */}
          <div className="donations-grid">
            {/* Card PIX */}
            <div className="span-7" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1.25rem' }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.15rem', letterSpacing: '.3px' }}>{t('pix')}</h4>
              <p style={{ margin: '0.4rem 0 0.9rem', color: 'var(--color-text-secondary)' }}>{t('scanPix')}</p>
              <div style={{ display: 'flex', gap: 16, alignItems: isMobile ? 'flex-start' : 'center', flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
                {/* QRCode real */}
                <div style={{
                  width: isMobile ? 180 : 200,
                  height: isMobile ? 180 : 200,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid var(--color-border-strong)',
                  background: 'var(--color-surface-alt)',
                  margin: isMobile ? '0 auto' : '0'
                }} aria-label="QR Code PIX">
                  <img src={pixQR} alt="QR Code do PIX" style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
                <div style={{ minWidth: isMobile ? '100%' : 240, textAlign: isMobile ? 'center' : 'left' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-text-secondary)', wordBreak: 'break-all', background: 'rgba(2,6,23,0.35)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '0.6rem 0.75rem' }}>
                    {pixKey}
                  </div>
                  <div className="donations-actions" style={{ marginTop: 10 }}>
                    <Button as="button" onClick={() => navigator.clipboard?.writeText(pixKey)} variant="primary">{t('copyKey')}</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Wise */}
            <div className="span-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1.25rem' }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.15rem', letterSpacing: '.3px' }}>{t('intlTransfer')}</h4>
              <p style={{ margin: '0.4rem 0 0.9rem', color: 'var(--color-text-secondary)' }}>{t('useData')}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <small style={{ color: 'var(--color-text-muted)' }}>Nome</small>
                  <div style={{ fontFamily: 'var(--font-mono)' }}>Tales Taveira de Freitas</div>
                </div>
                <div>
                  <small style={{ color: 'var(--color-text-muted)' }}>Banco</small>
                  <div style={{ fontFamily: 'var(--font-mono)' }}>Wise</div>
                </div>
                <div>
                  <small style={{ color: 'var(--color-text-muted)' }}>IBAN</small>
                  <div style={{ fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>BE66 9055 1926 4043</div>
                </div>
                <div>
                  <small style={{ color: 'var(--color-text-muted)' }}>BIC/SWIFT</small>
                  <div style={{ fontFamily: 'var(--font-mono)' }}>TRWIBEB1XX</div>
                </div>
              </div>
            </div>

            {/* Card TED */}
            <div className="span-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1.1rem' }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.05rem', letterSpacing: '.3px' }}>{t('ted')}</h4>
              <p style={{ margin: '0.4rem 0 0.9rem', color: 'var(--color-text-secondary)' }}>{t('tedData')}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                <li>Banco: 0260 - Nubank</li>
                <li>Agência: 0001</li>
                <li>Conta: 21072746-0</li>
                <li>Favorecido: Tales Taveira de Freitas</li>
                <li>CPF: 077.324.483-24</li>
              </ul>
            </div>

            {/* Card Contatos + Compartilhe */}
            <div className="span-7" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1.1rem' }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.05rem', letterSpacing: '.3px' }}>{t('contactsShare')}</h4>
              <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr' }}>
                <div>
                  <p style={{ margin: '0.4rem 0 0.6rem', color: 'var(--color-text-secondary)' }}>{t('networks')}</p>
                  <div className="donations-actions" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Button href="https://www.linkedin.com/in/tales-ivalque" target="_blank" rel="noopener noreferrer" className="btn--icon">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <Linkedin size={18} /> LinkedIn
                      </span>
                    </Button>
                    <Button href="https://github.com/talesitf" target="_blank" rel="noopener noreferrer" className="btn--icon">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <Github size={18} /> GitHub
                      </span>
                    </Button>
                    <Button href="https://instagram.com/talesitf" target="_blank" rel="noopener noreferrer" className="btn--icon">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <Instagram size={18} /> Instagram
                      </span>
                    </Button>
                  </div>
                </div>
                <div>
                  <p style={{ margin: '0.6rem 0 0.6rem', color: 'var(--color-text-secondary)' }}>{t('shareHelp')}</p>
                  <div className="donations-actions">
                    <Button as="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} variant="primary">{t('share')}</Button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Seção da Instituição de Destino -> THI (última seção)
const UniversitySection = () => {
  const isMobile = useIsMobile();
  const { t } = useI18n();
  // No desktop, evitamos minHeight para não sobrar espaço após o fim do conteúdo
  return (
    <section id="thi" className="section" style={{
      // padding-top removido; bottom mantém leve respiro
      padding: isMobile ? `0 0 3rem` : '0 0 1rem',
      background: 'transparent',
      width: '100%',
      minHeight: 'auto',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: isMobile ? 'start' : 'end',
      scrollSnapStop: 'always',
      overflow: 'visible',
      scrollMarginTop: `0px`
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle exchange-subtitle--yellow">
          Technische Hochschule Ingolstadt (THI)
        </h2>

        <motion.div
          className="exchange-panel exchange-panel--yellow"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <>
            <p>{t('university_p1')}</p>
            <p>{t('university_p2')}</p>
            <p>{t('university_p3')}</p>
            <p style={{ marginBottom: 0 }}>{t('university_p4')}</p>
          </>
        </motion.div>

        <AccordionGallery
          images={[thiImg, ingolstadtChristkindl, ingolstadtRathausplatz]}
          delay={0.1}
          compact
        />
      </div>
    </section>
  );
};

// Seção final: Contribuintes
const ContributorsSection = () => {
  const isMobile = useIsMobile();
  const { t, formatCurrency } = useI18n();
  // Fallback: se não houver contribuidores no campaign.js, usa o arquivo .txt
  const fallbackContributors = (contributorsRaw || '')
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith('#'))
    .map((name) => ({ name }));
  const contributors = Array.isArray(campaignData.contributors) && campaignData.contributors.length > 0
    ? campaignData.contributors
    : fallbackContributors;
  return (
    <section id="contribuintes" className="section" style={{
      padding: isMobile ? `0 0 2rem` : '0 0 2rem',
      background: 'transparent',
      width: '100%',
      minHeight: 'auto',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'end',
      scrollSnapStop: 'always',
      overflow: 'visible',
      scrollMarginTop: `0px`
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle">{t('contributors')}</h2>
        <div className="exchange-panel" style={{ maxWidth: 1100, margin: '0 auto 1.25rem', textAlign: 'left' }}>
          <span className="panel-accent" aria-hidden="true" />
          {Array.isArray(contributors) && contributors.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              {contributors.map((c, i) => (
                <li key={i} style={{ border: '1px solid var(--color-border)', borderRadius: 10, padding: '0.6rem 0.75rem', background: 'var(--color-surface)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{c.name || 'Anônimo'}</strong>
                    {c.amountBRL != null && c.amountBRL !== '' ? (
                      <span style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>{formatCurrency(Number(c.amountBRL) || 0, 'BRL')}</span>
                    ) : null}
                  </div>
                  {c.message ? <div style={{ color: 'var(--color-text-secondary)', marginTop: 4, fontSize: 14 }}>{c.message}</div> : null}
                </li>
              ))}
            </ul>
          ) : (
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>{t('contributors_empty')}</p>
          )}
        </div>
      </div>
    </section>
  );
};

// Navegação lateral por pontos (scrollspy minimalista)
const SectionDotsNav = ({ sections }) => {
  const [active, setActive] = useState(sections?.[0]?.id);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const mqMobile = window.matchMedia('(max-width: 767px)');

    const update = () => {
      setIsDesktop(mqDesktop.matches);
      setIsMobile(mqMobile.matches);
    };
    update();
    mqDesktop.addEventListener('change', update);
    mqMobile.addEventListener('change', update);
    return () => {
      mqDesktop.removeEventListener('change', update);
      mqMobile.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    const observers = [];
    const rootEl = document.getElementById('interchange-scroll') || null; // usa o contêiner de scroll

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id);
            }
          });
        },
        { root: rootEl, rootMargin: '0px 0px -15% 0px', threshold: 0.6 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isMobile) return null; // Esconde no mobile

  // Estilos calculados sem computed props/spread
  const navStyle = {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    zIndex: 40
  };
  if (isDesktop) {
    navStyle.left = 18;
  } else {
    navStyle.right = 18;
  }

  const getTooltipStyle = () => Object.assign({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '4px 8px',
    background: 'rgba(2,6,23,0.9)',
    border: '1px solid #2c567e',
    borderRadius: 6,
    color: '#cbd5e1',
    whiteSpace: 'nowrap',
    fontSize: 12,
    pointerEvents: 'none',
    zIndex: 41
  }, isDesktop ? { left: 'calc(100% + 8px)' } : { right: 'calc(100% + 8px)' });

  return (
    <div aria-hidden="false" aria-label="Mapa da página" style={navStyle}>
      {/* Botão Voltar ao topo */}
      <button
        onClick={() => goTo(sections[0]?.id)}
        title="Topo"
        aria-label="Voltar ao topo"
        style={{
          width: 14,
          height: 14,
          borderRadius: 999,
          border: '1px solid #2c567e',
          background: 'transparent',
          opacity: 0.7,
          transition: 'all .2s ease',
          position: 'relative'
        }}
        onMouseEnter={() => setHovered('top')}
        onMouseLeave={() => setHovered(null)}
      >
        {hovered === 'top' && (
          <span style={getTooltipStyle()}>Topo</span>
        )}
      </button>

      {sections.map(({ id, label }) => (
        <div key={id} style={{ position: 'relative' }}>
          <button
            onClick={() => goTo(id)}
            title={label}
            aria-label={label}
            aria-current={active === id ? 'true' : 'false'}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              width: active === id ? 12 : 10,
              height: active === id ? 12 : 10,
              borderRadius: 999,
              border: '1px solid #2c567e',
              background: active === id ? '#3b82f6' : 'transparent',
              opacity: active === id ? 1 : 0.6,
              transition: 'all .2s ease'
            }}
          />
          {hovered === id && (
            <span style={getTooltipStyle()}>{label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

// Aviso para orientação landscape (estilos inline)
const LandscapeWarning = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(2, 6, 23, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      color: '#f8fafc',
      textAlign: 'center',
      padding: '2rem'
    }}
  >
    <motion.div
      style={{ maxWidth: 420 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📱</div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#93c5fd' }}>Melhor experiência em portrait</h2>
      <p style={{ fontSize: '1.08rem', lineHeight: 1.6, color: '#cbd5e1', marginBottom: '1.25rem' }}>
        Para uma melhor experiência de navegação, por favor gire seu dispositivo para o modo vertical (portrait).
      </p>
      <motion.div
        style={{ fontSize: '2rem' }}
        animate={{ rotate: [0, 12, -12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🔄
      </motion.div>
    </motion.div>
  </div>
);

// Lista de seções fora do componente (boas práticas)
const BASE_SECTIONS = [
  { id: 'exchange-hero', labelPt: 'Início', labelEn: 'Start' },
  { id: 'criacao', labelPt: 'Criação', labelEn: 'Early Life' },
  { id: 'destaque-olimpico', labelPt: 'Destaque Olímpico', labelEn: 'Olympiad Highlights' },
  { id: 'primeira-independencia', labelPt: 'Primeira Independência', labelEn: 'First Independence' },
  { id: 'bolsa-insper', labelPt: 'Bolsa Insper', labelEn: 'Insper Scholarship' },
  { id: 'planejamento', labelPt: 'Financeiro', labelEn: 'Financials' },
  { id: 'como-ajudar', labelPt: 'Como Ajudar', labelEn: 'How to Help' },
  { id: 'thi', labelPt: 'THI', labelEn: 'THI' },
];

const ExchangeSections = () => {
  const { lang } = useI18n();
  const sections = BASE_SECTIONS.map(s => ({ id: s.id, label: lang === 'en' ? s.labelEn : s.labelPt }));
  const landscapeBlocked = useLandscapeBlock();
  // Se bloqueado, só mostra o aviso; sem dependência de CSS externo
  if (landscapeBlocked) {
    return <LandscapeWarning />;
  }
  return (
    <>
      {/* Estilos locais para indentação e espaçamento de parágrafos nesta página */}
      <style>{`
        /* Escopo: aplica apenas dentro do contêiner de intercâmbio */
        #interchange-scroll .exchange-panel p {
          text-indent: 1.15em;
          margin: 0.5rem 0 0.9rem;
        }
        
        #interchange-scroll .exchange-panel p:first-of-type {
          text-indent: 0;
        }
        
        #interchange-scroll .exchange-panel p + ul,
        #interchange-scroll .exchange-panel p + img {
          margin-top: 0.75rem;
        }

        /* Tabela de orçamento */
        #interchange-scroll .budget-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.98rem;
          color: var(--color-text-secondary);
          table-layout: auto;
        }
        
        #interchange-scroll .budget-table thead th {
          text-align: left;
          font-weight: 700;
          color: var(--color-text-primary);
          padding: 0.85rem 0.75rem;
          background: none;
        }
        
        #interchange-scroll .budget-table th,
        #interchange-scroll .budget-table td {
          padding: 0.85rem 1.25rem;
        }
        
        #interchange-scroll .budget-table th + th,
        #interchange-scroll .budget-table td + td {
          padding-left: 2rem;
        }
        
        #interchange-scroll .budget-table tbody tr:not(.row-subtotal):not(.row-semester):not(.row-total) td {
          padding-top: 0.55rem;
          padding-bottom: 0.55rem;
        }
        
        #interchange-scroll .budget-table tr {
          border-bottom: 1px solid var(--color-border);
        }
        
        #interchange-scroll .budget-table tbody tr:hover {
          background-color: rgba(2,6,23,0.15);
        }
        
        #interchange-scroll .budget-table .row-fixed-start td {
          padding-top: 0.85rem;
        }
        
        #interchange-scroll .budget-table .row-subtotal td:first-child,
        #interchange-scroll .budget-table .row-semester td:first-child,
        #interchange-scroll .budget-table .row-total td:first-child {
          font-weight: 700;
          color: var(--color-text-primary);
          text-align: left;
          padding-left: 1.25rem;
        }
        
        #interchange-scroll .budget-table .row-subtotal td {
          font-weight: 600;
          padding-top: 1.4rem;
          padding-bottom: 0.6rem;
        }
        
        #interchange-scroll .budget-table .row-semester td {
          font-weight: 600;
          padding-top: 0.6rem;
          padding-bottom: 1.4rem;
        }
        
        #interchange-scroll .budget-table .row-total td {
          padding-top: 1.2rem;
          padding-bottom: 1.2rem;
          font-weight: 700;
        }
        
        #interchange-scroll .budget-table .row-subtotal td {
          border-top: 2px solid var(--color-border-strong);
          border-bottom: 1px solid var(--color-border);
        }
        
        #interchange-scroll .budget-table .row-semester td {
          border-top: 1px solid var(--color-border);
          border-bottom: 2px solid var(--color-border-strong);
        }
        
        #interchange-scroll .budget-table .row-total td {
          border-top: 2px solid var(--color-border-strong);
          border-bottom: 2px solid var(--color-border-strong);
        }
        
        #interchange-scroll .budget-table th,
        #interchange-scroll .budget-table td {
          border-left: none;
          border-right: none;
        }

        /* Grid responsivo dos cards de doação */
        #interchange-scroll .donations-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(12, 1fr);
          align-items: stretch;
          grid-auto-flow: dense;
        }
        
        #interchange-scroll .donations-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        #interchange-scroll .donations-actions .btn {
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-text-primary);
          font-weight: 600;
          letter-spacing: .3px;
          padding: 0.6rem 1rem;
          border-radius: 8px;
        }
        
        #interchange-scroll .donations-actions .btn--primary {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: #fff;
        }
        
        #interchange-scroll .donations-actions .btn:hover {
          border-color: var(--color-border-strong);
          background: var(--color-surface-alt);
        }
        
        #interchange-scroll .donations-actions .btn--primary:hover {
          background: #1d4ed8;
        }
        
        #interchange-scroll .btn--icon svg { 
          vertical-align: middle; 
        }
        
        /* Col spans */
        #interchange-scroll .donations-grid .span-12 { grid-column: span 12; }
        #interchange-scroll .donations-grid .span-8 { grid-column: span 8; }
        #interchange-scroll .donations-grid .span-7 { grid-column: span 7; }
        #interchange-scroll .donations-grid .span-6 { grid-column: span 6; }
        #interchange-scroll .donations-grid .span-5 { grid-column: span 5; }
        #interchange-scroll .donations-grid .span-4 { grid-column: span 4; }
        
        @media (max-width: 900px) {
          #interchange-scroll .donations-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          #interchange-scroll .donations-grid .span-8,
          #interchange-scroll .donations-grid .span-7,
          #interchange-scroll .donations-grid .span-6,
          #interchange-scroll .donations-grid .span-5,
          #interchange-scroll .donations-grid .span-4 { 
            grid-column: span 1; 
          }
        }
        
        @media (max-width: 600px) {
          #interchange-scroll .donations-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          #interchange-scroll .donations-grid .span-8,
          #interchange-scroll .donations-grid .span-7,
          #interchange-scroll .donations-grid .span-6,
          #interchange-scroll .donations-grid .span-5,
          #interchange-scroll .donations-grid .span-4 { 
            grid-column: span 1; 
          }
          #interchange-scroll #como-ajudar .donations-grid { 
            margin-top: 0.75rem; 
          }
          
          /* Ajustes específicos para mobile */
          #interchange-scroll .donations-grid > div {
            width: 100%;
            min-height: auto;
          }
          
          /* QR Code responsivo */
          #interchange-scroll .donations-grid img {
            max-width: 150px;
            height: auto;
          }
          
          /* Flex no PIX card para mobile */
          #interchange-scroll .donations-grid .span-7 > div:last-child {
            flex-direction: column;
            gap: 12px;
          }
          
          /* Botões responsivos */
          #interchange-scroll .donations-actions {
            justify-content: center;
            flex-wrap: wrap;
          }
          
          #interchange-scroll .donations-actions .btn {
            min-width: 120px;
            text-align: center;
          }
        }
      `}</style>
      {/* Conteúdo principal */}
      <div>
        {/* Ordem focada em conversão */}
        <ExchangeHero />
        <CriacaoSection />
        <DestaqueOlimpicoSection />
        <PrimeiraIndependenciaSection />
        <BolsaInsperSection />
        <PlanningSection />
        <ExchangeContact />
        <UniversitySection />
        <ContributorsSection />
        <SectionDotsNav sections={sections} />
      </div>
    </>
  );
};

export default ExchangeSections;
