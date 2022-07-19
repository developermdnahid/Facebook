// get elements

const post_form = document.getElementById('post_add_form');
const msg = document.querySelector('.msg');
const all_posts = document.querySelector('.all-posts');





// get all posts

const getAllPosts = () => {
  let posts = readLSData('fb_post');
  let list = '';
  if( !posts ){
    all_posts.innerHTML = '<div class="card w-75 m-auto bg-danger text-white text-center shadow-sm" style="border-radius:10px;"><div class="card-body">No post found !!!</div></div>';
    return false ;
  }
  posts.reverse().map( data => {
    list += `
      <div class="post-timeline-area my-2">
        <div class="card w-75 m-auto">
          <div class="card-body">
            <div class="post-aut-area">
              <div class="user-info">
                <img src="${data.aphoto}" alt="">
                <div class="details">
                  <span>${data.aname}</span>
                  <span>2 h . <i class="fas fa-globe-asia"></i></ span>
                </div>
              </div>
              <div class="dropdown">
                <button class="" type="button"  id="dropdownMenuButton1" data-bs-toggle="dropdown"   aria-expanded="false">
                  <i class="fas fa-ellipsis-h"></i>
                </button>
                <ul class="dropdown-menu"   aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">Edit</a></li>
                  <li><a class="dropdown-item" href="#">Delete</a></li>
                </ul>
              </div>
            </div>
            <div class="post-content-area">
              <p>${data.pcontent}</p>
    
            </div>
          </div>
          ${ data.pphoto ? '<img src="'+data.pphoto + '" alt="">' : ''}
        </div>
      <div>
    `;
  });

  all_posts.innerHTML = list ;
}
  getAllPosts();



// post form submit

post_form.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());
  const {aname , aphoto , pcontent , pphoto} = Object.fromEntries(form_data.entries());


  // validation

  if( !aname || !aphoto || !pcontent ){
    msg.innerHTML = setAlert('All fields are required!!');
  }else{
    msg.innerHTML = setAlert('Post successfully done!!');
    createLSData('fb_post' , data );
    e.target.reset();
    getAllPosts();
  }

}
