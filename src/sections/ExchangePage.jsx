import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { motionProps } from '../utils/motion';
import { useEffect, useState } from 'react';

// Seção Hero do intercâmbio
const ExchangeHero = () => {
  return (
    <motion.section
      id="exchange-hero"
      className="hero section"
      style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        color: '#f8fafc',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always'
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
        
        {/* Bloco de apresentação revisado com destaques e links */}
        <motion.div
          style={{ 
            fontSize: 'clamp(1.05rem, 2.8vw, 1.25rem)',
            maxWidth: '900px',
            margin: '0 auto 2.5rem',
            color: '#cbd5e1',
            textAlign: 'left',
            lineHeight: 1.75,
            letterSpacing: '0.2px',
            fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto'
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
            {' '}conhecer melhor em <a href="#trajetoria" style={{ color: '#93c5fd', textDecoration: 'underline dotted' }}>Minha Trajetória</a>.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Muito em breve, vou realizar o sonho de fazer um intercâmbio na
            <a href="#universidade" style={{ color: '#93c5fd', textDecoration: 'underline dotted' }}> Technische Hochschule Ingolstadt (THI)</a>,
            {' '}na Alemanha.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Por ser aluno bolsista no Insper, todos os custos relacionados a taxas de adesão e mensalidades já estão cobertos. Porém, ainda preciso custear as despesas da viagem: acomodação, alimentação, passagens, entre outras.
          </p>
          <p style={{ marginBottom: 0 }}>
            Criei este site para arrecadar recursos e compartilhar minhas experiências durante o intercâmbio. Se puder,
            {' '}<strong style={{ color: '#e2e8f0' }}> apoie este sonho!</strong>
          </p>
        </motion.div>

        <motion.div style={{ textAlign: 'center', display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }} {...motionProps.scaleIn(0.6)}>
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
      </div>
    </motion.section>
  );
};

// Seção da Trajetória
const TrajectorySection = () => {
  return (
    <section id="trajetoria" className="section" style={{
      padding: '7rem 0',
      background: 'transparent',
      width: '100%',
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle" style={{
          textAlign: 'center',
          marginBottom: '4rem',
          fontSize: 'clamp(2.5rem, 6vw, 3.5rem)'
        }}>
          Minha Trajetória
        </h2>

        <motion.div
          className="exchange-panel"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Origem e Interesses</h3>
          <p>Início na Engenharia de Computação com foco em resolver problemas reais usando IA aplicada, integrações entre sistemas e experiências conversacionais.</p>
        </motion.div>

        <motion.div
          className="exchange-panel exchange-panel--alt"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.05)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Projetos Relevantes</h3>
          <p>Construção de agentes inteligentes, automações e pipelines que conectam APIs e serviços para entregar valor rápido com segurança e observabilidade.</p>
        </motion.div>

        <motion.div
          className="exchange-panel"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.1)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Próximos Passos</h3>
          <p>Aprofundar em sistemas agênticos com IA, segurança de IA e arquitetura escalável — levando essas práticas para o contexto internacional do intercâmbio.</p>
        </motion.div>
      </div>
    </section>
  );
};

// Seção de Planejamento Financeiro
const PlanningSection = () => {
  return (
    <section id="planejamento" className="section" style={{
      padding: '7rem 0',
      background: 'transparent',
      width: '100%',
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always'
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
  return (
    <section id="como-ajudar" className="section" style={{
      padding: '7rem 0',
      background: 'transparent',
      width: '100%',
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always'
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

// Seção do Programa
const ProgramSection = () => {
  return (
    <section id="programa" className="section" style={{
      padding: '7rem 0',
      background: 'transparent',
      width: '100%',
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle exchange-subtitle--red">
          O Programa
        </h2>

        <motion.div
          className="exchange-panel exchange-panel--red"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Estrutura do Intercâmbio</h3>
          <p>Programa de intercâmbio acadêmico com duração de um semestre letivo na Alemanha, focado em engenharia e tecnologia com oportunidade de pesquisa aplicada.</p>
        </motion.div>

        <motion.div
          className="exchange-panel exchange-panel--red exchange-panel--alt"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.1)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Objetivos Acadêmicos</h3>
          <p>Aprofundamento em metodologias europeias de ensino, desenvolvimento de projetos internacionais e networking com profissionais do setor tecnológico.</p>
        </motion.div>
      </div>
    </section>
  );
};

// Seção da Instituição de Destino
const UniversitySection = () => {
  return (
    <section id="universidade" className="section" style={{
      padding: '7rem 0',
      background: 'transparent',
      width: '100%',
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="exchange-subtitle exchange-subtitle--yellow">
          A Instituição de Destino
        </h2>

        <motion.div
          className="exchange-panel exchange-panel--yellow"
          style={{ maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Universidade Alemã de Excelência</h3>
          <p>Universidade técnica alemã com reputação mundial em engenharia e pesquisa aplicada, oferecendo infraestrutura moderna e programas de vanguarda.</p>
        </motion.div>

        <motion.div
          className="exchange-panel exchange-panel--yellow exchange-panel--alt"
          style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.1)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Ambiente Internacional</h3>
          <p>Campus multicultural com estudantes de mais de 80 países, laboratórios de última geração e parcerias estratégicas com a indústria europeia.</p>
        </motion.div>
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

  const side = isDesktop ? 'left' : 'right'; // Desktop: esquerda, Tablet: direita

  return (
    <div aria-hidden="false" aria-label="Mapa da página" style={{
      position: 'fixed',
      [side]: 18,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      zIndex: 40
    }}>
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
          <span style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            ...(side === 'left' ? { left: 'calc(100% + 8px)' } : { right: 'calc(100% + 8px)' }),
            padding: '4px 8px',
            background: 'rgba(2,6,23,0.9)',
            border: '1px solid #2c567e',
            borderRadius: 6,
            color: '#cbd5e1',
            whiteSpace: 'nowrap',
            fontSize: 12,
            pointerEvents: 'none'
          }}>Topo</span>
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
            <span style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              ...(side === 'left' ? { left: 'calc(100% + 8px)' } : { right: 'calc(100% + 8px)' }),
              padding: '4px 8px',
              background: 'rgba(2,6,23,0.9)',
              border: '1px solid #2c567e',
              borderRadius: 6,
              color: '#cbd5e1',
              whiteSpace: 'nowrap',
              fontSize: 12,
              pointerEvents: 'none'
            }}>{label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

const ExchangeSections = () => {
  const sections = [
    { id: 'exchange-hero', label: 'Início' },
    { id: 'trajetoria', label: 'Minha Trajetória' },
    { id: 'planejamento', label: 'Financeiro' },
    { id: 'como-ajudar', label: 'Como Ajudar' },
    { id: 'programa', label: 'Programa' },
    { id: 'universidade', label: 'Instituição' },
  ];

  return (
    <>
      {/* Ordem focada em conversão */}
      <ExchangeHero />
      <TrajectorySection />
      <PlanningSection />
      <ExchangeContact />
      <ProgramSection />
      <UniversitySection />
      <SectionDotsNav sections={sections} />
    </>
  );
}; export default ExchangeSections;
