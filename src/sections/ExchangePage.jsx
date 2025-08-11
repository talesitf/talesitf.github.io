import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { motionProps } from '../utils/motion';
import { useEffect, useState } from 'react';
// Imagens locais (perfil e família)
import profileImg from '../assets/profile/20220705_153751.jpg';
import criacao1 from '../assets/criacao/IMG-20190724-WA0034.jpg';
import criacao2 from '../assets/criacao/IMG-20210717-WA0021.jpg';
import criacao3 from '../assets/criacao/IMG-20200101-WA0000.jpg';
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
            Meu último colégio foi o <Highlight>Colégio Objetivo</Highlight> da minha cidade, onde fiquei do 4º ano do Fundamental até o 2º ano do Ensino Médio.
            Lá fui apresentado ao mundo das <Highlight>Olimpíadas</Highlight>, que serviram como um desafio extra no dia a dia da escola e, mais tarde, como um ótimo caminho para
            <Highlight> novas oportunidades</Highlight>.
          </p>
          <p>
            Já no 6º ano, conquistei minhas primeiras medalhas em provas como a <Highlight>OBA</Highlight>, a <Highlight>OBI</Highlight> e a
            <Highlight> Mathematique Sans Frontières</Highlight>. Desde então, foi uma dedicação intensa que rendeu um quadro expressivo de participações e conquistas.
          </p>
          <p>
            Essa trajetória abriu portas, inclusive para representar o colégio na <Highlight>QUANTA 2015</Highlight>, em Lucknow, Índia, que foi minha primeira oportunidade internacional.
            Além das provas, tive um pequeno destaque ao atuar como tradutor do representante da delegação no discurso final da competição.
          </p>
          <p style={{ marginBottom: 0 }}>
            Mas acho que a maior oportunidade que as Olímpiadas me deram foi a bolsa de estudos integral no <Highlight>Farias Brito</Highlight> em 2018 para estudar na sua turma <Highlight>ITA/IME</Highlight>, onde concluí meu Ensino Médio e desenvolvi ainda mais meu conhecimento.
          </p>
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
            Essa bolsa foi uma oportunidade ímpar, me permitindo estudar na maior instituição de ensino preparatório para o <Highlight>ITA</Highlight> do país. Sendo aluno Olímpico, conheci o Instituto Tecnológico já no 9º ano, e o coloquei como meta principal da minha trajetória acadêmica. Seria um sonho conquistar o vestibular mais difícil do país.
          </p>
          <p>
            Mas, junto com essa oportunidade, veio a necessidade de me tornar mais independente. A bolsa me garantia o colégio, mas eu precisei me mudar para Fortaleza sozinho, enfrentando novos desafios e responsabilidades. Foi uma época difícil, mudando de apartamento a cada ano, mas aprendi muito sobre resiliência e adaptação.
          </p>
          <p style={{ marginBottom: 0 }}>
            Ao total, foram 3 anos e meio de muito aprendizado, tanto acadêmico quanto pessoal. Após concluir o Ensino Médio, passei ainda 2 anos tentando a aprovação no ITA, obtendo sucesso moderado, com aprovações em vestibulares "menores" como EFFOM e Escola Naval, e chegando perto da aprovação no ITA em 2020, quando fui cortado pela minha nota de Química.
          </p>
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
            No meio da pandemia do Covid, em 2021, eu conheci o Insper. Era uma instituição que rivalizava o ITA em termos de qualidade ed ensino e superior em infraestrutura. Apliquei para o Programa de Bolsas e Vestibular ainda no primeiro semestre, e fui aprovado de primeira para o curso de Engenharia de Computação!
          </p>
          <p>
            Graças a essa bolsa, pude me mudar para a Toca da Raposa, a moradia para bolsistas do Insper e de fora de São Paulo, onde conheci muitas pessoas, com histórias e culturas diferentes, e que se tornaram grandes amigos. E parte dessas pessoas se tornaram meus atuais colegas de apartamento, com quem divido minhas angústias e conquistas, se tornando uma segunda família.
          </p>
          <p style={{ marginBottom: 0 }}>
            Desde então, foram 4 anos cheios de oportunidades, desafios e aprendizados. Participei de várias entidades estudantis, projetos e eventos que ampliaram minha visão de mundo e me conectaram com pessoas incríveis. Agora, a bolsa abre mais uma oportunidade: o intercâmbio na Alemanha, que é um sonho antigo e uma chance de expandir ainda mais meus horizontes acadêmicos e profissionais.
          </p>
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
          style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <table className="budget-table" aria-label="Planejamento Financeiro">
            <thead>
              <tr>
                <th>Item</th>
                <th>Mínimo (R$)</th>
                <th>Esperado (R$)</th>
                <th>Mínimo (€)</th>
                <th>Esperado (€)</th>
              </tr>
            </thead>
            <tbody>
              {/* Mensalidades variáveis */}
              <tr>
                <td>Acomodação</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Alimentação</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Transporte</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Utilidades</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Despesas domésticas</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Plano de celular</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Health insurance</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="row-subtotal">
                <td>Subtotal mensal</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="row-semester">
                <td>Semestre (×6)</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="row-fixed-start">
                <td>Passagens aéreas</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Reserva de emergência</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="row-total">
                <td>Total estimado</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
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
          style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}
          {...motionProps.fadeInUp(0.2)}
        >
          <span className="panel-accent" aria-hidden="true" />
          <h3>Como Ajudar</h3>

          {/* Grid de doações: dois grandes (PIX e Wise) lado a lado, dois menores (TED e Compartilhar) abaixo */}
          <div className="donations-grid">
            {/* Card PIX */}
            <div className="span-7" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1.25rem' }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.15rem', letterSpacing: '.3px' }}>PIX</h4>
              <p style={{ margin: '0.4rem 0 0.9rem', color: 'var(--color-text-secondary)' }}>Escaneie o QR Code ou copie a chave para doar via PIX.</p>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Placeholder do QRCode */}
                <div style={{ width: 200, height: 200, borderRadius: 8, background: 'repeating-linear-gradient(45deg, var(--color-border) 0 6px, transparent 6px 12px)', border: '1px solid var(--color-border-strong)' }} aria-label="QR Code PIX" />
                <div style={{ minWidth: 240 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-text-secondary)', wordBreak: 'break-all', background: 'rgba(2,6,23,0.35)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '0.6rem 0.75rem' }}>
                    chave-pix-aqui@exemplo.com
                  </div>
                  <div className="donations-actions" style={{ marginTop: 10 }}>
                    <Button as="button" onClick={() => navigator.clipboard?.writeText('chave-pix-aqui@exemplo.com')} variant="primary">Copiar chave</Button>
                    <Button href="#">Abrir no app</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Wise */}
            <div className="span-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1.25rem' }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.15rem', letterSpacing: '.3px' }}>Transferência internacional (Wise)</h4>
              <p style={{ margin: '0.4rem 0 0.9rem', color: 'var(--color-text-secondary)' }}>Use os dados abaixo para transferência direta para a conta internacional.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <small style={{ color: 'var(--color-text-muted)' }}>Nome</small>
                  <div style={{ fontFamily: 'var(--font-mono)' }}>Seu Nome</div>
                </div>
                <div>
                  <small style={{ color: 'var(--color-text-muted)' }}>Banco</small>
                  <div style={{ fontFamily: 'var(--font-mono)' }}>Wise</div>
                </div>
                <div>
                  <small style={{ color: 'var(--color-text-muted)' }}>IBAN</small>
                  <div style={{ fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>DE00 0000 0000 0000 0000 00</div>
                </div>
                <div>
                  <small style={{ color: 'var(--color-text-muted)' }}>BIC/SWIFT</small>
                  <div style={{ fontFamily: 'var(--font-mono)' }}>TRWIBEB1XXX</div>
                </div>
              </div>
            </div>

            {/* Card TED */}
            <div className="span-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1.1rem' }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.05rem', letterSpacing: '.3px' }}>TED</h4>
              <p style={{ margin: '0.4rem 0 0.9rem', color: 'var(--color-text-secondary)' }}>Dados para transferência nacional.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--color-text-secondary)' }}>
                <li>Banco: 000 - Nome do Banco</li>
                <li>Agência: 0000</li>
                <li>Conta: 000000-0</li>
                <li>Favorecido: Seu Nome</li>
                <li>CPF: 000.000.000-00</li>
              </ul>
            </div>

            {/* Card Compartilhar */}
            <div className="span-7" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, padding: '1.1rem' }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)', fontSize: '1.05rem', letterSpacing: '.3px' }}>Compartilhe</h4>
              <p style={{ margin: '0.4rem 0 0.9rem', color: 'var(--color-text-secondary)' }}>Se não puder contribuir agora, compartilhar já ajuda muito!</p>
              <div className="donations-actions">
                <Button as="button" onClick={() => navigator.share ? navigator.share({ title: 'Ajude no intercâmbio', url: window.location.href }) : window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank')} variant="primary">WhatsApp</Button>
                <Button href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">Facebook</Button>
                <Button href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Ajude%20no%20interc%C3%A2mbio`} target="_blank" rel="noopener noreferrer">Twitter</Button>
                <Button as="button" onClick={() => navigator.clipboard?.writeText(window.location.href)}>Copiar link</Button>
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

        /* Tabela de orçamento - sem linhas verticais e linhas horizontais metalizadas */
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
          background: none; /* cabeçalho mais sutil, sem bloco de cor */
        }
        #interchange-scroll .budget-table th,
        #interchange-scroll .budget-table td {
          padding: 0.85rem 1.25rem; /* mais espaço interno */
        }
        /* Espaço extra perceptível entre colunas */
        #interchange-scroll .budget-table th + th,
        #interchange-scroll .budget-table td + td {
          padding-left: 2rem;
        }
        /* Itens: linhas mais justas (menos altura) */
        #interchange-scroll .budget-table tbody tr:not(.row-subtotal):not(.row-semester):not(.row-total) td {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        /* Espaço extra perceptível entre colunas */
        #interchange-scroll .budget-table th + th,
        #interchange-scroll .budget-table td + td {
          padding-left: 2rem;
        }
        /* Itens: linhas mais justas (menos altura) */
        #interchange-scroll .budget-table tbody tr:not(.row-subtotal):not(.row-semester):not(.row-total) td {
          padding-top: 0.55rem;
          padding-bottom: 0.55rem;
        }
        /* Linhas horizontais metalizadas */
        #interchange-scroll .budget-table tr {
          border-bottom: 1px solid var(--color-border); /* linhas sólidas, sem degradê */
        }
        #interchange-scroll .budget-table tbody tr:hover {
          background-color: rgba(2,6,23,0.15);
        }
        /* Seções e destaques */
        /* Espaço extra entre semestre e o primeiro gasto fixo */
        #interchange-scroll .budget-table .row-fixed-start td {
          padding-top: 0.85rem;
        }
        #interchange-scroll .budget-table .row-subtotal td:first-child,
        #interchange-scroll .budget-table .row-semester td:first-child,
        #interchange-scroll .budget-table .row-total td:first-child {
          font-weight: 700;
          color: var(--color-text-primary);
          text-align: left; /* mesmo alinhamento do Item */
          padding-left: 1.25rem; /* mesmo recuo do Item */
        }
        #interchange-scroll .budget-table .row-subtotal td {
          font-weight: 600; /* mantém destaque, sem degradê */
          padding-top: 1.4rem; /* margem grossa acima do subtotal */
          padding-bottom: 0.6rem; /* margem fina abaixo do subtotal */
        }
        #interchange-scroll .budget-table .row-semester td {
          font-weight: 600;
          padding-top: 0.6rem; /* margem fina acima do semestre */
          padding-bottom: 1.4rem; /* margem grossa abaixo do semestre */
        }
        #interchange-scroll .budget-table .row-total td {
          /* sem degradê, mais largo e bem separado */
          padding-top: 1.2rem;
          padding-bottom: 1.2rem;
          font-weight: 700;
        }
        /* Separadores: grossa antes do Subtotal, fina entre Subtotal/Semestre, grossa após Semestre e Total */
        #interchange-scroll .budget-table .row-subtotal td {
          border-top: 2px solid var(--color-border-strong);
          border-bottom: 1px solid var(--color-border); /* fina abaixo do subtotal */
        }
        #interchange-scroll .budget-table .row-semester td {
          border-top: 1px solid var(--color-border); /* fina acima do semestre */
          border-bottom: 2px solid var(--color-border-strong); /* grossa abaixo do semestre */
        }
        #interchange-scroll .budget-table .row-total td {
          border-top: 2px solid var(--color-border-strong);
          border-bottom: 2px solid var(--color-border-strong);
        }
        /* Sem linhas verticais explicitamente */
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
        /* Ações/Buttons padronizados dentro da seção de doações */
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
        /* Col spans (desktop) */
        #interchange-scroll .donations-grid .span-12 { grid-column: span 12; }
        #interchange-scroll .donations-grid .span-8 { grid-column: span 8; }
        #interchange-scroll .donations-grid .span-7 { grid-column: span 7; }
        #interchange-scroll .donations-grid .span-6 { grid-column: span 6; }
        #interchange-scroll .donations-grid .span-5 { grid-column: span 5; }
        #interchange-scroll .donations-grid .span-4 { grid-column: span 4; }
        @media (max-width: 900px) {
          #interchange-scroll .donations-grid {
            grid-template-columns: repeat(6, 1fr);
          }
          #interchange-scroll .donations-grid .span-8,
          #interchange-scroll .donations-grid .span-7,
          #interchange-scroll .donations-grid .span-6,
          #interchange-scroll .donations-grid .span-5,
          #interchange-scroll .donations-grid .span-4 { grid-column: span 6; }
        }
        @media (max-width: 600px) {
          #interchange-scroll .donations-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          #interchange-scroll .donations-grid .span-8,
          #interchange-scroll .donations-grid .span-7,
          #interchange-scroll .donations-grid .span-6,
          #interchange-scroll .donations-grid .span-5,
          #interchange-scroll .donations-grid .span-4 { grid-column: span 4; }
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
