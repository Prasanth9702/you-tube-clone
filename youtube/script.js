// AIzaSyAvcF-r5viTJm9ogeRkEJzqODnxl4dABF8

let keyvalue = 'AIzaSyAvcF-r5viTJm9ogeRkEJzqODnxl4dABF8';

const videoCardContainer = document.querySelector('.videos_container');
let video_url =
  'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=27&regionCode=IN&key=' +
  keyvalue;

getVideos(video_url);
async function getVideos(url) {
  try {
    var res = await fetch(url);
    var data = await res.json();
    // console.log(data);
    showVideos(data.items);
  } catch (err) {
    console.log('Error');
  }
}


function showVideos(data) {
  videoCardContainer.innerHTML = '';
  data.forEach(video => {
    const {
      id,
      snippet: { channelTitle, title, thumbnails, channelId },
    } = video;
    const VideoEL = document.createElement('div');
    VideoEL.classList.add('video');
    VideoEL.innerHTML = ` <div class="video-thumbnail">
    <a href="https://www.youtube.com/watch?v=${id}"><img src="${thumbnails.high.url}" alt="" />
    </a>
  </div>
  <div class="video-details">
    <div class="author">
      <img src="${thumbnails.high.url}"alt="" />
    </div>
    <div class="title">
      <h3>
      <a href="https://www.youtube.com/watch?v=${id}">${title}</a>
      </h3>
      <a href="https://www.youtube.com/channel/${channelId}" >${channelTitle}</a>
    </div>
  </div>`;
    videoCardContainer.append(VideoEL);
  });
}

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');

let form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  let searchValue = searchInput.value;
  if (searchValue) {
    getVideos(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchValue}&key=${keyvalue}`
    );
  } else {
    getVideos(video_url);
  }
});