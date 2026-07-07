// ============================================
// THE FOOD HUB — Reviews Slider (dots control scroll)
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.review-track');
  const dots = document.querySelectorAll('.review-dots span');

  if (!track || !dots.length) return;

  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () {
      const cards = track.querySelectorAll('.review-card');
      if (cards[index]) {
        track.scrollTo({ left: cards[index].offsetLeft - 24, behavior: 'smooth' });
      }
    });
  });

  // Update active dot on manual scroll
  let scrollTimeout;
  track.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      const cards = Array.from(track.querySelectorAll('.review-card'));
      let closestIndex = 0;
      let closestDistance = Infinity;
      cards.forEach(function (card, i) {
        const distance = Math.abs(card.offsetLeft - track.scrollLeft - 24);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === closestIndex);
      });
    }, 100);
  });

  // Auto-play
  let autoIndex = 0;
  const cardCount = track.querySelectorAll('.review-card').length;
  setInterval(function () {
    autoIndex = (autoIndex + 1) % cardCount;
    dots[autoIndex] && dots[autoIndex].click();
  }, 5000);
});
