const courses = [
  { id: 1, title: 'The Ultimate Google Ads Training Course', category: 'marketing', price: 100, author: 'Jerome Bell', image: 'images/1.jpg' },
  { id: 2, title: 'Product Management Fundamentals', category: 'management', price: 480, author: 'Marvin McKinney', image: 'images/2.jpg' },
  { id: 3, title: 'HR Management and Analytics', category: 'hr', price: 200, author: 'Leslie Alexander Li', image: 'images/3.jpg' },
  { id: 4, title: 'Brand Management & PR Communications', category: 'marketing', price: 530, author: 'Kristin Watson', image: 'images/4.jpg' },
  { id: 5, title: 'Graphic Design Basic', category: 'design', price: 500, author: 'Guy Hawkins', image: 'images/5.jpg' },
  { id: 6, title: 'Business Development Management', category: 'management', price: 400, author: 'Dianne Russell', image: 'images/6.jpg' },
  { id: 7, title: 'Highload Software Architecture', category: 'development', price: 600, author: 'Brooklyn Simmons', image: 'images/7.jpg' },
  { id: 8, title: 'Human Resources - Selection and Recruitment', category: 'hr', price: 150, author: 'Kathryn Murphy', image: 'images/8.jpg' },
  { id: 9, title: 'User Experience. Human-centered Design', category: 'design', price: 240, author: 'Cody Fisher', image: 'images/9.jpg' },
  { id: 10, title: 'Advanced Social Media Marketing', category: 'marketing', price: 350, author: 'Jane Cooper', image: 'images/1.jpg' },
  { id: 11, title: 'Strategic Management Essentials', category: 'management', price: 420, author: 'Robert Fox', image: 'images/2.jpg' },
  { id: 12, title: 'Full Stack Web Development', category: 'development', price: 580, author: 'Esther Howard', image: 'images/3.jpg' }
];

let currentCategory = 'all';
let searchQuery = '';
let visibleCount = 9;

const grid = document.getElementById('coursesGrid');
const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const noResults = document.getElementById('noResults');
const filterBtns = document.querySelectorAll('.filters__btn');

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

function getFiltered() {
  return courses.filter(c => {
    const matchCategory = currentCategory === 'all' || c.category === currentCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.author.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });
}

function render() {
  const filtered = getFiltered();
  const toShow = filtered.slice(0, visibleCount);
  
  grid.innerHTML = toShow.map(c => `
    <article class="course-card">
      <img src="${c.image}" alt="${escapeHtml(c.title)}" class="course-card__image" loading="lazy">
      <div class="course-card__content">
        <span class="course-card__category course-card__category--${c.category}">${c.category}</span>
        <h2 class="course-card__title">${highlightText(c.title, searchQuery)}</h2>
        <div class="course-card__footer">
          <span class="course-card__price">$${c.price}</span>
          <span class="course-card__author">| by ${escapeHtml(c.author)}</span>
        </div>
      </div>
    </article>
  `).join('');
  
  noResults.classList.toggle('no-results--visible', filtered.length === 0);
  loadMoreBtn.closest('.load-more').classList.toggle('load-more--hidden', filtered.length <= visibleCount);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('filters__btn--active'));
    btn.classList.add('filters__btn--active');
    currentCategory = btn.dataset.category;
    visibleCount = 9;
    render();
  });
});

let timeout;
searchInput.addEventListener('input', e => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    searchQuery = e.target.value;
    visibleCount = 9;
    render();
  }, 150);
});

loadMoreBtn.addEventListener('click', () => {
  visibleCount += 3;
  render();
});

render();
