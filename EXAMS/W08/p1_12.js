import { p1_blogs_12, all_blogs_12 } from './p1_data_12.js';

const blogsCenter2 = document.querySelector('.blogs-center2');
const blogsFooter = document.querySelector('.blogs-footer');

let blogs_12 = p1_blogs_12;
let count = { numBlogs: 6, index: 2 };
let c = 6;
let cc = 7;
console.log('blogs initially', p1_blogs_12);

const displayBlogItems = (blogitems) => {
  let displayBlog = blogitems
    .map((blogitems) => {
      const { id, category, remote_img, title, img, desc } = blogitems;
      return `
      <article class="blog">
      <img src=${img} alt="" class="img" />
      <div class="blog-content">
        <span> lifestyle <i class="fa-solid fa-mug-saucer"></i> </span>
        <h3>${title}</h3>
        <p>
        ${desc}
        </p>
        <div class="footer">
          <a href="#">read more</a>
          <div class="btns">
            <button class="btn btn-edit" type="button" data-id=${id}>
              Edit
            </button>

            <button class="btn btn-delete" type="button" data-id=${id}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
      `;
    })
    .join('');
  //console.log('displayBlog', displayBlog);
  blogsCenter2.innerHTML = displayBlog;
  handleBtnsDelete();
};
// no Delete buttons exist initially
let btnsDelete = [];

const btnpush = document.querySelector('.btn-push');
const btnpop = document.querySelector('.btn-pop');
const btnclear = document.querySelector('.clear-all');
const btnload = document.querySelector('.load-all');



const Btnsclick = () => {
  btnpush.addEventListener('click', (e) => {
    if (c == 9) {
      c = 9;
      alert('All blogs are displayed');
    } else {
      c++;
      cc++;

      if (cc == 9) {
        cc = 1;
        blogs_12.push(all_blogs_12[cc]);
      } else {
        blogs_12.push(all_blogs_12[cc]);
      }
      displayBlogItems(blogs_12);
      console.log('blogs after pushed a blog', blogs_12);
    }
  });
  btnpop.addEventListener('click', (e) => {
    let aa = 7;
    if (c == 0) {
      alert('All blogs are poped');
    } else {
      c--;
      aa--;
      blogs_12.pop(all_blogs_12[aa]);
      displayBlogItems(blogs_12);
      console.log('blogs after poped a blog', blogs_12);
    }
  });
  btnclear.addEventListener('click', (e) => {
    //console.log('btnclear');
    console.log('blogs after clean all', btnsDelete);
    displayBlogItems(btnsDelete);
  });
  btnload.addEventListener('click', (e) => {
    //console.log('btnload');
    console.log('blogs after clean all', blogs_12);
    displayBlogItems(blogs_12);
  });
};
let i = 7
let j
const handleBtnsDelete = () => {
  const btndelete = document.querySelectorAll('.btn-delete');
  btndelete.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      console.log('data-id', e.currentTarget.dataset.id);
      const category = e.currentTarget.dataset.id;
        blogs_12.pop(blogs_12[category]);
        displayBlogItems(blogs_12);
        console.log('blogs atfer deleted', blogs_12);
     







      const filterMenu = blogs_12.filter((item) => item.category === category);
      // if (category === 'all') {
      //   displayBlogItems(blogs_12);
      // } else {
      //   displayBlogItems(filterMenu);
      //   console.log('filterMenu', filterMenu);
      // }
       });
    });

  };

window.addEventListener('DOMContentLoaded', () => {
  displayBlogItems(blogs_12);
  //handleBtnsDelete();
  Btnsclick();
});
