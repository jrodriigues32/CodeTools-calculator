document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Iniciando configurações da página...');

    // ========== 0. ANIMAÇÃO DO TÍTULO "CodeTools" ==========
    const headerTitle = document.querySelector('header h1');

    // 🔍 DEBUG CRÍTICO
    console.log('🔍 DEBUG - headerTitle encontrado?', !!headerTitle);
    console.log('🔍 DEBUG - GSAP disponível?', typeof gsap);

    if (headerTitle && typeof gsap !== 'undefined') {
        console.log('🎯 INICIANDO animação do título...');

        // 0.1 - Remove qualquer animação CSS
        headerTitle.style.animation = 'none';

        // 0.2 ANIMAÇÃO DE ENTRADA (teste garantido)
        gsap.from(headerTitle, {
            duration: 1.2,
            y: -40,
            scale: 0.7,
            ease: "back.out(1.7)",
            delay: 0.3,
            onComplete: function () {
                console.log('✅ Animação de entrada completa!');
            }
        });

        // 0.3 EFEITO DE BRILHO PULSANTE
        gsap.to(headerTitle, {
            duration: 3,
            backgroundPosition: '200% 50%',
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // 0.4 HOVER SIMPLES (funcional)
        headerTitle.addEventListener('mouseenter', function () {
            console.log('🖱️ Mouse ENTER no título');
            gsap.to(headerTitle, {
                duration: 0.3,
                scale: 1.05,
                y: -3,
                ease: "power2.out"
            });
        });

        headerTitle.addEventListener('mouseleave', function () {
            console.log('🖱️ Mouse LEAVE do título');
            gsap.to(headerTitle, {
                duration: 0.4,
                scale: 1,
                y: 0,
                ease: "power2.out"
            });
        });

        // 0.5 CLIQUE SIMPLES (funcional)
        headerTitle.addEventListener('click', function () {
            console.log('🖱️ CLIQUE no título');

            // Efeito de clique
            gsap.to(headerTitle, {
                duration: 0.1,
                scale: 0.95,
                ease: "power2.in",
                onComplete: function () {
                    gsap.to(headerTitle, {
                        duration: 0.5,
                        scale: 1,
                        ease: "elastic.out(1.2, 0.5)"
                    });
                }
            });
        });

        console.log('✨ Animação do título "CodeTools" aplicada com sucesso!');

    } else {
        console.error('❌ FALHA: headerTitle ou GSAP não disponível');
        console.error('  - headerTitle:', headerTitle);
        console.error('  - gsap:', typeof gsap);
    }

    // ========== 1. BOTÃO "INÍCIO" ==========
    const inicioBtn = document.getElementById('btn-inicio');
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');

    if (!inicioBtn) {
        console.warn('⚠️ Botão "btn-inicio" não encontrado. Continuando...');
    } else {
        console.log('✅ Botão encontrado:', inicioBtn);

    }

    // ========== 2. HEADER FIXO AO ROLAR ==========
    if (header && heroSection) {
        let heroHeight = heroSection.offsetHeight;

        function handleScroll() {
            const scrollY = window.scrollY;

            if (scrollY > heroHeight * 0.7) {
                header.classList.add('fixed');
                document.body.classList.add('has-fixed-header');

                if (inicioBtn) inicioBtn.setAttribute('title', 'Clique para voltar ao topo');

                if (typeof gsap !== 'undefined') {
                    gsap.to(header, {
                        duration: 0.3,
                        y: 0,
                        opacity: 1,
                        ease: "power2.out"
                    });
                }
            } else {
                header.classList.remove('fixed');
                document.body.classList.remove('has-fixed-header');
                if (inicioBtn) inicioBtn.setAttribute('title', 'Início');
            }
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            heroHeight = heroSection.offsetHeight;
            handleScroll();
        });
        handleScroll();
    }
});

// ========== ANIMAÇÕES E CALCULADORA ==========
document.addEventListener('DOMContentLoaded', function () {
    console.log('🔧 Configurando animações e calculadora...');

    // ========== BOTÃO "CALCULAR AGORA" ==========
    const calcularBtn = document.querySelector('.hero .btn');

    if (calcularBtn && typeof gsap !== 'undefined') {
        // Criar partículas
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particles');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = '0';
            calcularBtn.appendChild(particle);
        }

        // Timeline principal
        const btnTimeline = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0.5 });
        btnTimeline.to(calcularBtn, {
            duration: 3,
            backgroundPosition: '100% 100%',
            ease: "sine.inOut"
        }, 0);

        // Animação das partículas
        const particles = calcularBtn.querySelectorAll('.particles');
        particles.forEach((particle, i) => {
            gsap.to(particle, {
                duration: 2 + Math.random(),
                x: `random(-20, 20)`,
                y: `random(-20, 20)`,
                opacity: `random(0.3, 0.8)`,
                scale: `random(0.8, 1.5)`,
                repeat: -1,
                yoyo: true,
                delay: i * 0.2,
                ease: "sine.inOut"
            });
        });

        // Efeito hover
        calcularBtn.addEventListener('mouseenter', () => {
            gsap.to(particles, {
                duration: 0.3,
                opacity: 1,
                scale: 1.8,
                stagger: 0.05,
                ease: "power2.out"
            });
        });

        calcularBtn.addEventListener('mouseleave', () => {
            gsap.to(particles, {
                duration: 0.5,
                opacity: 0.3,
                scale: 1,
                stagger: 0.03,
                ease: "power2.in"
            });
        });

        // Scroll Trigger
        gsap.from(calcularBtn, {
            scrollTrigger: {
                trigger: calcularBtn,
                start: "top bottom-=100",
                toggleActions: "play none none reset"
            },
            y: 50,
            opacity: 0,
            scale: 0.8,
            rotation: -10,
            duration: 1,
            ease: "back.out(1.7)"
        });
    }

    // ========== CALCULADORA ==========
    const horasInput = document.getElementById('horas');
    const valorHoraInput = document.getElementById('valor-hora');
    const calcularBtnForm = document.getElementById('calcular-btn');
    const resultadoOutput = document.getElementById('resultado');

    if (horasInput && valorHoraInput && calcularBtnForm && resultadoOutput) {
        function formatarMoeda(valor) {
            return valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            });
        }

        function calcular() {
            const horas = parseFloat(horasInput.value) || 0;
            const valorHora = parseFloat(valorHoraInput.value) || 0;
            const total = horas * valorHora;

            resultadoOutput.textContent = formatarMoeda(total);

            if (total > 0) {
                resultadoOutput.classList.add('has-value');
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(resultadoOutput,
                        { scale: 0.8, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
                    );
                }
            } else {
                resultadoOutput.classList.remove('has-value');
            }
        }

        calcularBtnForm.addEventListener('click', calcular);

        // Calcular ao pressionar Enter
        [horasInput, valorHoraInput].forEach(input => {
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') calcular();
            });
        });

        // Calcular em tempo real
        let timeout;
        [horasInput, valorHoraInput].forEach(input => {
            input.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(calcular, 300);
            });
        });

        // Duplo clique para limpar
        resultadoOutput.addEventListener('dblclick', () => {
            horasInput.value = '';
            valorHoraInput.value = '';
            resultadoOutput.textContent = '0';
            resultadoOutput.classList.remove('has-value');
            horasInput.focus();
        });

        calcular();
    }

    // ========== SEÇÃO EXPANSÍVEL ==========
    const tituloExpandivel = document.querySelector('.descricao-titulo');
    const itemsExpandiveis = document.querySelectorAll('.descricao-item');
    const exemploExpandivel = document.querySelector('.exemplo-pratico');

    if (tituloExpandivel && typeof gsap !== 'undefined') {
        tituloExpandivel.addEventListener('click', () => {
            const isExpanded = tituloExpandivel.getAttribute('data-expanded') === 'true';
            tituloExpandivel.setAttribute('data-expanded', !isExpanded);

            gsap.to('.expand-icon', {
                duration: 0.3,
                rotate: isExpanded ? 0 : 180,
                ease: "power2.out"
            });
        });
    }

    itemsExpandiveis.forEach(item => {
        const subtitulo = item.querySelector('.descricao-subtitulo');
        const detalhe = item.querySelector('.descricao-detalhe');

        if (subtitulo && detalhe && typeof gsap !== 'undefined') {
            subtitulo.addEventListener('click', () => {
                const isExpanded = item.getAttribute('data-expanded') === 'true';
                item.setAttribute('data-expanded', !isExpanded);

                if (!isExpanded) {
                    gsap.to(detalhe, {
                        duration: 0.5,
                        height: 'auto',
                        opacity: 1,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(detalhe, {
                        duration: 0.3,
                        height: 0,
                        opacity: 0,
                        ease: "power2.in"
                    });
                }

                gsap.to(subtitulo.querySelector('.item-expand'), {
                    duration: 0.3,
                    rotate: isExpanded ? 0 : 45,
                    ease: "power2.out"
                });
            });
        }
    });

    if (exemploExpandivel && typeof gsap !== 'undefined') {
        const exemploTitulo = exemploExpandivel.querySelector('.exemplo-titulo');

        if (exemploTitulo) {
            exemploTitulo.addEventListener('click', () => {
                const isExpanded = exemploExpandivel.getAttribute('data-expanded') === 'true';
                exemploExpandivel.setAttribute('data-expanded', !isExpanded);

                const conteudo = exemploExpandivel.querySelector('.exemplo-conteudo');
                if (conteudo) {
                    if (!isExpanded) {
                        gsap.to(conteudo, {
                            duration: 0.5,
                            height: 'auto',
                            opacity: 1,
                            marginTop: 15,
                            ease: "power2.out"
                        });
                    } else {
                        gsap.to(conteudo, {
                            duration: 0.3,
                            height: 0,
                            opacity: 0,
                            marginTop: 0,
                            ease: "power2.in"
                        });
                    }
                }

                const itemExpand = exemploTitulo.querySelector('.item-expand');
                if (itemExpand) {
                    gsap.to(itemExpand, {
                        duration: 0.3,
                        rotate: isExpanded ? 0 : 45,
                        ease: "power2.out"
                    });
                }
            });
        }
    }

    // ========== SCROLL ANIMATIONS ==========
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.descricao-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: "power2.out"
            });
        });

        gsap.from('#calculadora', {
            scrollTrigger: {
                trigger: '#calculadora',
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }

    // ========== BOTÃO DA CALCULADORA ==========
    if (calcularBtnForm && typeof gsap !== 'undefined') {
        calcularBtnForm.addEventListener('mouseenter', () => {
            gsap.to(calcularBtnForm, {
                duration: 0.3,
                boxShadow: '0 15px 35px rgba(37, 99, 235, 0.5)',
                ease: "power2.out"
            });
        });

        calcularBtnForm.addEventListener('mouseleave', () => {
            gsap.to(calcularBtnForm, {
                duration: 0.3,
                boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
                ease: "power2.out"
            });
        });
    }
});
// Função para o botão de contato
function abrirContato() {
        navigator.clipboard.writeText("jfpr2021@outlook.com").then(() => {
        alert("📧 Email copiado para a área de transferência!\n\nEntre em contato comigo para conversarmos sobre seu projeto!");
    }).catch(err => {
        // Se falhar, mostra o email normalmente
        alert("📬 Vamos conversar!\n\nMeu email: jfpr2021@outlook.com\n\nEntre em contato para conversarmos sobre seu projeto!");
    });
    
    // Opção 2: Abrir link externo (se tiver LinkedIn, site, etc.)
    // window.open('https://seusite.com/contato', '_blank');
    
    // Opção 3: Abrir modal de contato (se quiser implementar depois)
    // document.getElementById('modal-contato').style.display = 'block';
}