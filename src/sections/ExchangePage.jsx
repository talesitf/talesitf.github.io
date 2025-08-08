import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { motionProps } from '../utils/motion';

// Seção Hero do intercâmbio
const ExchangeHero = () => {
  return (
    <motion.section
      id="exchange-hero"
      className="hero section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        color: '#f8fafc',
        textAlign: 'center',
        position: 'relative',
        width: '100%'
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
        
        <motion.p
          style={{ 
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            color: '#cbd5e1',
            textAlign: 'center'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Uma jornada acadêmica e cultural rumo à excelência tecnológica europeia
        </motion.p>

        <motion.div style={{ textAlign: 'center' }} {...motionProps.scaleIn(0.6)}>
          <Button href="#programa" variant="primary" style={{
            fontSize: '1.1rem',
            padding: '1rem 2.5rem',
            textDecoration: 'none'
          }}>
            Ver Cronograma
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Seção do Programa
const ProgramSection = () => {
  return (
    <section id="programa" className="section" style={{
      padding: '8rem 0',
      background: 'transparent',
      width: '100%'
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
      padding: '8rem 0',
      background: 'transparent',
      width: '100%'
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

// Seção de Planejamento Financeiro
const PlanningSection = () => {
  return (
    <section id="planejamento" className="section" style={{
      padding: '8rem 0',
      background: 'transparent',
      width: '100%'
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
      padding: '8rem 0',
      background: 'transparent',
      width: '100%'
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

const ExchangeSections = () => {
  return (
    <>
      <ExchangeHero />
      <ProgramSection />
      <UniversitySection />
      <PlanningSection />
      <ExchangeContact />
    </>
  );
}; export default ExchangeSections;
