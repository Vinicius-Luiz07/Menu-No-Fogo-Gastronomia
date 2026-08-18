const menuImages = [
    'img/cardapio-1.jpeg',
    'img/cardapio-2.jpeg',
    'img/cardapio-3.jpeg',
    'img/cardapio-4.jpeg',
    'img/cardapio-5.jpeg',
    'img/cardapio-6.jpeg',
    'img/cardapio-7.jpeg',
    'img/cardapio-8.jpeg',
    'img/cardapio-9.jpeg',
    'img/cardapio-10.jpeg',
    'img/cardapio-11.jpeg',
    'img/cardapio-12.jpeg',
];

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('cardapio-track');
    const counter = document.getElementById('cardapio-counter');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnReveal = document.getElementById('btn-ver-cardapio');
    const section = document.getElementById('cardapio');

    if(!track || !counter || !btnPrev || !btnNext || !btnReveal || !section) return;

    let currentIndex = 0;

    function buildSlides() {
        track.innerHTML = '';

        if(menuImages.length === 0) {
            track.innerHTML = '<div class="cardapio-slide empty"> Nenhum cardápio adicionado ainda.</div>';
            return;
        }
        
        menuImages.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'cardapio-slide';

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Cardápio ${i + 1}`;
            img.loading = 'lazy';
            img.onerror = () => {
                img.replaceWith(placeholderMessage(i));
            };

            slide.appendChild(img);
            track.appendChild(slide);
        });
    }

    function placeholderMessage(i) {
        const div = document.createElement('div');
        div.className = 'cardapio-slide empty';
        div.textContent = `Imagem do cardápio ${i + 1} não encontrada.`;
        return div;
    }

    function updateSlide() {
        const total = menuImages.length || 1;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        counter.textContent = `${currentIndex + 1} / ${total}`;
    }

    function goNext() {
        if(menuImages.length === 0) return;
        currentIndex = (currentIndex + 1) % menuImages.length;
        updateSlide();
    }

    function goPrev() {
        if(menuImages.length === 0) return;
        currentIndex = (currentIndex - 1 + menuImages.length) % menuImages.length;
        updateSlide();
    }

    btnNext.addEventListener('click', goNext);
    btnPrev.addEventListener('click', goPrev);

    btnReveal.addEventListener('click', () => {
        section.classList.add('revealed');
        section.scrollIntoView({behavior: 'smooth', block: 'start'});
    });

    buildSlides();
    updateSlide();
});