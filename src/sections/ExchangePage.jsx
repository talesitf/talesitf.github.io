import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { motionProps } from '../utils/motion';
import { useEffect, useState } from 'react';

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
const AccordionGallery = ({ images = [], delay = 0, compact = false }) => {
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
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: active === idx ? 'none' : 'grayscale(8%)', opacity: 0.98 }}
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
          Intercâmbio Alemanha
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
            <p style={{ marginBottom: '1rem' }}>
              Oi, prazer! Me chamo
              <span style={{ color: '#93c5fd', fontWeight: 700 }}> Tales Ivalque Taveira de Freitas</span>,
              {' '}sou estudante de Engenharia de Computação no Insper, onde sou bolsista integral. Nascido e criado em
              <span style={{ color: '#93c5fd', fontWeight: 600 }}> Juazeiro do Norte-CE</span>,
              {' '}mudei-me para Fortaleza e, depois, para São Paulo em busca de melhores oportunidades. Você pode me
              {' '}conhecer melhor em <a href="#criacao" style={{ color: '#93c5fd', textDecoration: 'underline dotted' }}>Minha Trajetória</a>.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Muito em breve, vou realizar o sonho de fazer um intercâmbio na
              <a href="#thi" style={{ color: '#93c5fd', textDecoration: 'underline dotted' }}> Technische Hochschule Ingolstadt (THI)</a>,
              {' '}na Alemanha.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Por ser aluno bolsista no Insper, todos os custos relacionados a taxas de adesão e mensalidades já estão cobertos. Porém, ainda preciso custear as despesas da viagem: acomodação, alimentação, passagens, entre outras.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              Criei este site para arrecadar recursos e compartilhar minhas experiências durante o intercâmbio. Se puder,
              {' '}<strong style={{ color: '#e2e8f0' }}> apoie este sonho!</strong>
            </p>

            <motion.div style={{ textAlign: 'left', display: 'flex', gap: '0.8rem', justifyContent: 'flex-start', flexWrap: 'wrap' }} {...motionProps.scaleIn(0.6)}>
              <Button href="#como-ajudar" variant="primary" style={{
                fontSize: '1.05rem',
                padding: '0.9rem 2.2rem',
                textDecoration: 'none'
              }}>
                Apoiar Agora
              </Button>
              <Button href="#planejamento" style={{
                fontSize: '1.05rem',
                padding: '0.9rem 2.1rem',
                textDecoration: 'none'
              }}>
                Ver Custos
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
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
                  alt="Estudos e intercâmbio"
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
        <h2 className="exchange-subtitle" style={{ marginBottom: '2rem' }}>Criação</h2>
        <motion.div
          className="exchange-panel"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left', fontSize: 'clamp(1rem, 2.3vw, 1.125rem)', lineHeight: 1.8, letterSpacing: '0.2px', color: '#cbd5e1', overflowWrap: 'anywhere', hyphens: 'auto' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <p>
            Eu nasci no ano de 2001 em <Highlight>Juazeiro do Norte-CE</Highlight>, filho de <Highlight>Avani Taveira do Nascimento</Highlight> e <Highlight>Wigli Ivalque de Freitas Júnior</Highlight>. Meu pai trabalhava como mecânico e minha mãe tinha um pequeno negócio de artes, o que não permitia esbanjo, mas garantia uma vida confortável.
          </p>

          <p>
            Cresci cercado pelas ferramentas do meu pai e pelos quadros que minha mãe pintava, e esse ambiente me despertou desde cedo criatividade e raciocínio. Em casa, isso se traduzia em desmontar e remontar brinquedos e, de vez em quando, até aparelhos eletrônicos mais simples.
          </p>

          <p>
            Outra coisa que meus pais sempre reforçaram foi a importância da Educação. Minha mãe fazia parte da única geração com formação superior na família, enquanto meu pai não teve essa oportunidade. Por isso, sempre me incentivaram a estudar e buscar conhecimento.
          </p>

          <p>
            Somando meus interesses ao incentivo constante deles, comecei cedo a me destacar e a buscar desafios e oportunidades de aprender mais. Eles levavam essa dedicação tão a sério que me mudaram de colégio três vezes para garantir que eu tivesse acesso a uma educação no mesmo nível da minha vontade de aprender.
          </p>
        </motion.div>
        <AccordionGallery
          images={[
            'https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519455953755-af066f52f1ea?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop'
          ]}
          delay={0.05}
        />
      </div>
    </section>
  );
};

// Seção: Destaque Olímpico
const DestaqueOlimpicoSection = () => {
  const isMobile = useIsMobile();
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
        <h2 className="exchange-subtitle" style={{ marginBottom: '2rem' }}>Destaque Olímpico</h2>
        <motion.div
          className="exchange-panel exchange-panel--alt"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left', fontSize: 'clamp(1rem, 2.3vw, 1.125rem)', lineHeight: 1.8, letterSpacing: '0.2px', color: '#cbd5e1', overflowWrap: 'anywhere', hyphens: 'auto' }}
          {...motionProps.fadeInUp(0.05)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <p>
            No Objetivo conheci as <Highlight>Olimpíadas Científicas</Highlight>. Comecei pela OBA no 5º ano e segui em frente, acumulando medalhas
            e, principalmente, o gosto pelo desafio.
          </p>
          <p>
            Aos 13, entendi que olimpíadas abrem portas e que estudar pode ser aventura. Conheci o <Highlight>ITA</Highlight> e esse objetivo ganhou
            espaço no meu dia a dia.
          </p>
          <p style={{ marginBottom: 0 }}>
            A seleção para a <Highlight>QUANTA</Highlight>, na Índia, consolidou o amor por resolver problemas. Competi em Robótica e Lógica e ainda
            atuei como tradutor no encerramento da delegação brasileira.
          </p>
        </motion.div>
        <AccordionGallery
          images={[
            'https://images.unsplash.com/photo-1555421689-43cad7100751?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'
          ]}
          delay={0.1}
        />
      </div>
    </section>
  );
};

// Seção: Primeira independência
const PrimeiraIndependenciaSection = () => {
  const isMobile = useIsMobile();
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
        <h2 className="exchange-subtitle" style={{ marginBottom: '2rem' }}>Primeira independência</h2>
        <motion.div
          className="exchange-panel"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.1)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <p>
            No 3º ano, conquistei bolsa integral no <Highlight>Farias Brito</Highlight> e me mudei sozinho para <Highlight>Fortaleza</Highlight>.
            A rotina era intensa, com aulas das 8h às 22h e pressão por resultado.
          </p>
          <p>
            Nem sempre os vestibulares vieram, mas as olimpíadas e simulados mostravam evolução real. A cada ciclo, entendia um pouco melhor o
            que funcionava e como persistir.
          </p>
          <p style={{ marginBottom: 0 }}>
            Aprovações como a <Highlight>EFOMM</Highlight> e o corte do <Highlight>IME</Highlight> consolidaram resiliência e mostraram que o caminho
            estava se ajustando.
          </p>
        </motion.div>
        <AccordionGallery
          images={[
            'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop'
          ]}
          delay={0.15}
        />
      </div>
    </section>
  );
};

// Seção: Bolsa de Estudos no Insper
const BolsaInsperSection = () => {
  const isMobile = useIsMobile();
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
        <h2 className="exchange-subtitle" style={{ marginBottom: '2rem' }}>Bolsa de Estudos no Insper</h2>
        <motion.div
          className="exchange-panel exchange-panel--alt"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.15)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <p>
            Em 2021, conheci o <Highlight>Insper</Highlight> e o <Highlight>Programa de Bolsas</Highlight>. Fiz a prova no meio da pandemia e fui
            transparente no painel de bolsas.
          </p>
          <p>
            Aprovado, mergulhei em entidades, atuei como <Highlight>NINJA</Highlight> e <Highlight>Embaixador</Highlight> e fui voluntário no
            <Highlight> GAS</Highlight> e <Highlight>Aulas Solidárias</Highlight>. A oportunidade transformou minha trajetória.
          </p>
          <p style={{ marginBottom: 0 }}>
            O que mais levo é a rede de pessoas e a chance de retribuir. Esse espírito me acompanha para os próximos passos.
          </p>
        </motion.div>
        <AccordionGallery
          images={[
            'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1523580846011-44a1a0f6c47c?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1523580846011-44b1f0a6c47d?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1523246192058-8f2f1a6c7d8b?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop'
          ]}
          delay={0.2}
        />
      </div>
    </section>
  );
};

// Seção de Planejamento Financeiro
const PlanningSection = () => {
  const isMobile = useIsMobile();
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
        <h2 className="exchange-subtitle exchange-subtitle--red">
          Planejamento Financeiro
        </h2>

        <motion.div
          className="exchange-panel exchange-panel--red"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Estimativa de Custos</h3>
          <p>Planejamento detalhado dos custos envolvidos incluindo mensalidade, moradia, alimentação, transporte e documentação necessária para o período de intercâmbio.</p>
        </motion.div>

        <motion.div
          className="exchange-panel exchange-panel--red exchange-panel--alt"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.1)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Estratégias de Financiamento</h3>
          <p>Pesquisa por bolsas de estudo, programas governamentais, parcerias institucionais e planejamento de economia pessoal para viabilizar o projeto.</p>
        </motion.div>
      </div>
    </section>
  );
};

// Seção Como Ajudar
const ExchangeContact = () => {
  const isMobile = useIsMobile();
  return (
    <section id="como-ajudar" className="section" style={{
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
        <h2 className="exchange-subtitle">
          Como Ajudar
        </h2>

        <motion.div
          className="exchange-panel"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Compartilhe Conhecimento</h3>
          <p>Se você tem experiência com intercâmbio na Alemanha, pode compartilhar dicas valiosas sobre documentação, adaptação cultural e vida acadêmica.</p>
        </motion.div>

        <motion.div
          className="exchange-panel exchange-panel--alt"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.1)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Networking e Conexões</h3>
          <p>Conecte-me com profissionais, instituições ou outros estudantes que possam enriquecer esta jornada acadêmica e profissional.</p>
        </motion.div>

        <motion.div
          className="exchange-panel"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
          {...motionProps.fadeInUp(0.2)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Vamos Conversar</h3>
          <p style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#cbd5e1',
            lineHeight: '1.7',
            marginBottom: '2rem'
          }}>
            Interessado em ajudar ou quer saber mais detalhes sobre este projeto? Entre em contato comigo!
          </p>

          <motion.div
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            {...motionProps.scaleIn(0.6)}
          >
            <Button href="mailto:contato@example.com" variant="primary" style={{
              fontSize: '1.1rem',
              padding: '1rem 2.5rem',
              textDecoration: 'none'
            }}>
              Enviar Email
            </Button>
            <Button href="/#contact" style={{
              fontSize: '1.1rem',
              padding: '1rem 2.5rem',
              textDecoration: 'none'
            }}>
              Seção Contato
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Seção da Instituição de Destino -> THI (última seção)
const UniversitySection = () => {
  const isMobile = useIsMobile();
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
          THI
        </h2>

        <motion.div
          className="exchange-panel exchange-panel--yellow"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Technische Hochschule Ingolstadt</h3>
          <p>
            Universidade de excelência aplicada, com forte ligação à indústria e um ambiente internacional vibrante. Infraestrutura moderna,
            laboratórios atualizados e oportunidades de projetos em engenharia tornam a THI um passo estratégico na minha formação.
          </p>
          <p>
            Busco aprender com a diversidade, entender desafios reais e trazer soluções com engenharia aplicada. A THI é o lugar certo para
            expandir horizontes.
          </p>
          <p style={{ marginBottom: 0 }}>
            Levo a curiosidade de Juazeiro, a base do Insper e a vontade de retribuir. Esse intercâmbio é um ponto de inflexão.
          </p>
        </motion.div>

        <AccordionGallery
          images={[
            'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1470290378698-263fa7ca60ab?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop'
          ]}
          delay={0.1}
          compact
        />
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
const SECTIONS = [
  { id: 'exchange-hero', label: 'Início' },
  { id: 'criacao', label: 'Criação' },
  { id: 'destaque-olimpico', label: 'Destaque Olímpico' },
  { id: 'primeira-independencia', label: 'Primeira Independência' },
  { id: 'bolsa-insper', label: 'Bolsa Insper' },
  { id: 'planejamento', label: 'Financeiro' },
  { id: 'como-ajudar', label: 'Como Ajudar' },
  { id: 'thi', label: 'THI' },
];

const ExchangeSections = () => {
  const sections = SECTIONS;
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
          text-indent: 1.15em; /* indenta primeira linha */
          margin: 0.5rem 0 0.9rem; /* respiro entre parágrafos */
        }
        /* Primeiro parágrafo de cada painel sem indentação para alinhamento com o título */
        #interchange-scroll .exchange-panel p:first-of-type {
          text-indent: 0;
        }
        /* Parágrafos imediatamente antes de listas ou imagens podem ter margem extra se necessário */
        #interchange-scroll .exchange-panel p + ul,
        #interchange-scroll .exchange-panel p + img {
          margin-top: 0.75rem;
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
        <SectionDotsNav sections={sections} />
      </div>
    </>
  );
};

export default ExchangeSections;
