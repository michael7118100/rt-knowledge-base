let allPosts = [];
let currentCategory = 'ALL';

const cardGrid = document.getElementById('card-grid');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('article-modal');
const modalBody = document.getElementById('modal-body');
const modalCategory = document.getElementById('modal-category');
const closeModalBtn = document.getElementById('close-modal');

// 初始化載入索引檔
async function init() {
  try {
    const response = await fetch('posts/index.json');
    allPosts = await response.json();
    renderCards(allPosts);
  } catch (error) {
    cardGrid.innerHTML = `<p>無法載入知識庫索引，請確認是否透過本地伺服器或 GitHub Pages 開啟。</p>`;
    console.error('Error loading index.json:', error);
  }
}

// 渲染知識卡片
function renderCards(posts) {
  if (posts.length === 0) {
    cardGrid.innerHTML = `<p style="color: #64748b;">找不到符合條件的臨床筆記。</p>`;
    return;
  }

  cardGrid.innerHTML = posts.map(post => `
    <article class="card" onclick="openArticle('${post.file}', '${post.category}')">
      <div>
        <div class="card-meta">
          <span class="card-tag">${post.category}</span>
          <span class="card-date">${post.date}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
      </div>
      <div class="card-footer">閱讀完整臨床筆記 →</div>
    </article>
  `).join('');
}

// 篩選與搜尋整合
function filterPosts() {
  const keyword = searchInput.value.toLowerCase().trim();
  const filtered = allPosts.filter(post => {
    const matchCategory = currentCategory === 'ALL' || post.category === currentCategory;
    const matchKeyword = post.title.toLowerCase().includes(keyword) || 
                         post.summary.toLowerCase().includes(keyword) ||
                         post.category.toLowerCase().includes(keyword);
    return matchCategory && matchKeyword;
  });
  renderCards(filtered);
}

// 開啟並解析 Markdown 檔案
async function openArticle(filePath, category) {
  try {
    const response = await fetch(filePath);
    const mdText = await response.text();
    modalCategory.textContent = category;
    modalBody.innerHTML = marked.parse(mdText);
    modal.classList.remove('hidden');
  } catch (error) {
    alert('讀取文章內容失敗，請檢查檔案路徑是否正確。');
  }
}

// 事件監聽
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    filterPosts();
  });
});

searchInput.addEventListener('input', filterPosts);

closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

init();