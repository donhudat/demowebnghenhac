const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playlist = $('.playlist')
const cd = $('.cd');
const cdwidth = cd.offsetWidth;
const player = $('.player')
const btnplay = $('.btn-toggle-play')
const audio = $('#audio')
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const progress = $('#progress');
const nextbtn = $('.btn-next');
const prevbtn = $('.btn-prev');
const randombtn = $('.btn-random');
const repeat = $('.btn-repeat');
const app = {
  isPlaying: false,
  currentIndex: 0,
  isSongActive: false,
  songs: [
    {
      name: 'Em Của Ngày Hôm Qua',
      singer: 'Sơn Tùng-MTP',
      path: './asset/music/song1.mp3',
      iamge: 'https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/Em_c%E1%BB%A7a_ng%C3%A0y_h%C3%B4m_qua.png/220px-Em_c%E1%BB%A7a_ng%C3%A0y_h%C3%B4m_qua.png'
    },
    {
      name: 'Chúng Ta Không Thuộc Về Nhau',
      singer: 'Sơn Tùng-MTP',
      path: './asset/music/song2.mp3',
      iamge: 'https://vtv1.mediacdn.vn/zoom/640_400/2016/sontung-1470158879948-1470195306491-crop-1470195514570.jpeg'
    },
    {
      name: 'Nơi Này Có Anh',
      singer: 'Sơn Tùng-MTP',
      path: './asset/music/song3.mp3',
      iamge: 'https://i.ytimg.com/vi/FN7ALfpGxiI/maxresdefault.jpg'
    },
    {
      name: 'Buông Đôi Tay Nhau Ra',
      singer: 'Sơn Tùng-MTP',
      path: './asset/music/song4.mp3',
      iamge: 'https://i.ytimg.com/vi/LCyo565N_5w/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLApzQn8CV159Lt6TQvpBpuH9cKxnw'
    },
    {
      name: 'Hãy Trao Cho Anh',
      singer: 'Sơn Tùng-MTP',
      path: './asset/music/song5.mp3',
      iamge: 'https://kenh14cdn.com/thumb_w/660/2019/6/24/6525117527785385588264962863390061280362496n-1561311135531958290066.jpg'
    },
    {
      name: 'Muộn Rồi Mà Sao Còn',
      singer: 'Sơn Tùng-MTP',
      path: './asset/music/song6.mp3',
      iamge: 'https://i.ytimg.com/vi/xypzmu5mMPY/maxresdefault.jpg'
    }
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `<div class="song" data-index ="${index}" >
      <div class="thumb" style="background-image: url('${song.iamge}')">
      </div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>
    `
    })
    playlist.innerHTML = htmls.join('')
  },
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex]
      }
    })
  },
  handleEvent: function () {
    const _this = this

    // xu lý cd quay
    cdThumbanimate = cdThumb.animate([
      {
        transform: 'rotate(360deg)'
      }
    ],
      {
        duration: 10000,
        iterations: Infinity
      }
    )
    cdThumbanimate.pause();
    // xu ly khi click play
    btnplay.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      }
      else {
        audio.play();

      }
      audio.onplay = function () {
        _this.isPlaying = true;
        player.classList.add('playing')
        cdThumbanimate.play();

      }
      audio.onpause = function () {
        _this.isPlaying = false;
        player.classList.remove('playing')
        cdThumbanimate.pause();

      }


    }

    // Xử lý thanh thời gian chạy
    let isonTimeupdate = true;
    audio.ontimeupdate = function () {
      // console.log(Math.random() * 1000)
      // console.log(isonTimeupdate);
      if (audio.duration) {
        handProgress = Math.floor(audio.currentTime / audio.duration * 100);
        progress.value = handProgress;
      }
    };

    // Xử lý khi tua bài hát
    progress.onchange = function () {
      isonTimeupdate = false;
      const setTime = progress.value / 100 * audio.duration;
      audio.currentTime = setTime;
    };

    // Sự kiện khi kết thúc tua bài hát
    progress.onmouseup = function () {
      isonTimeupdate = true;
      // console.log(isonTimeupdate + " sửa đổi 12312312");
    };

    // xu ly phong to thu nho cd
    document.onscroll = function () {
      const srollTop = window.scrollY || document.documentElement.scrollTop
      newwidthcd = cdwidth - srollTop;
      cd.style.width = newwidthcd > 0 ? newwidthcd + 'px' : 0;
      cd.style.opacity = newwidthcd / cdwidth;
    }
    // khi bấm next bài hát
    nextbtn.onclick = function () {
      nextbtn.classList.add('active');
      setTimeout(function () {
        nextbtn.classList.remove('active');
      }, 2000);
      _this.nextSong()
      audio.play();
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbanimate.play();
      _this.songActiveList();
      _this.srollTopSongActive();
    }
    // khi quay lại bài hát
    prevbtn.onclick = function () {
      _this.prevSong()
      audio.play();
      prevbtn.classList.add('active');
      setTimeout(function () {
        prevbtn.classList.remove('active');
      }, 2000);
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbanimate.play();
      _this.songActiveList();
      _this.srollTopSongActive();
    }
    // khi ramdom bài hát
    randombtn.onclick = function () {
      randombtn.classList.add('active');
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbanimate.play();
      _this.randomSong();
      audio.play();
      setTimeout(function () {
        randombtn.classList.remove('active');
      }, 2000);
      _this.songActiveList();
    }

    // khi return bài hát
    repeat.onclick = function () {
      repeat.classList.add('active');
      setTimeout(function () {
        repeat.classList.remove('active');
      }, 2000);
      audio.currentTime = 0;
      audio.play();
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbanimate.play();
      _this.songActiveList();
    }

    // khi hết bài 
    audio.onended = function () {
      _this.nextSong();
      audio.play();
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbanimate.play();
      _this.songActiveList();

    }

    // onclick playlists
    playlist.onclick = function (element) {
      if (
        element.target.closest('.song:not(.active)') || element.target.closest('.option')
      ) {
        // click vào song
        if (element.target.closest('.song:not(.active)')) {
          const index = element.target.closest('.song').getAttribute('data-index')
          _this.currentIndex = Number(index)
          _this.loadcurrentSong()
          audio.play();
          _this.isPlaying = true;
          player.classList.add('playing');
          cdThumbanimate.play();
          _this.songActiveList();
          _this.srollTopSongActive();
          // console.log(_this.currentIndex)
        }
      }
    }
  },
  loadcurrentSong: function () {
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url(${this.currentSong.iamge})`
    audio.src = this.currentSong.path
  },
  nextSong: function () {
    this.currentIndex++
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0
    }
    this.loadcurrentSong()

  },
  prevSong: function () {
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1
    }
    this.loadcurrentSong()
  },
  randomSong: function () {
    const randomIndex = Math.floor(Math.random() * this.songs.length)
    const random = this.currentIndex !== randomIndex ? randomIndex : Math.floor(Math.random() * this.songs.length)
    this.currentIndex = random;
    this.loadcurrentSong()
  },
  songActiveList: function () {
    const songActive = $$('.song')
    songActive.forEach(function (element, index) {
      console.log(index)
      if (index === app.currentIndex) {
        element.classList.add('active');
        console.log(index)
      }
      else {
        element.classList.remove('active');
      }
    });
  },
  srollTopSongActive: function () {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }, 300);
  },
  start: function () {
    this.render()
    this.handleEvent()
    this.defineProperties()
    this.loadcurrentSong()
    this.songActiveList()
    this.srollTopSongActive()
  }
}
app.start()
