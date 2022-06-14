
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const header = $('header h2')
const thumb = $('.cd-thumb')
const audio = $('audio')
const playerChanging = $('.player')
const playSongBtn = $('.btn-toggle-play')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')


const app = {
    currentIndex: 0,
    isPlayIng: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name:"In The End",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/In-The-End-Album-Version-Linkin-Park.mp3",
            image:"./Resources/IMG/intheend.jpg"
        },
        {
            name:"Numb",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/Numb-Album-Version-Linkin-Park.mp3",
            image:"./Resources/IMG/numb.jpg"
        },
        {
            name:"Waiting for the End",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/Waithing-For-The-End-Linkin-Park.mp3",
            image:"./Resources/IMG/Waithing-For-The-End-Linkin-Park.mp3"
        },
        {
            name:"Numb/Encore",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/NumbEncore-Explicit-Version-Linkin-Park.mp3",
            image:"./Resources/IMG/numbencore.jpg"
        },
        {
            name:"Faint",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/Faint - Linkin Park.mp3",
            image:"./Resources/IMG/Faint.jpg"
        },
        {
            name:"In The End",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/In-The-End-Album-Version-Linkin-Park.mp3",
            image:"./Resources/IMG/intheend.jpg"
        },
        {
            name:"Numb",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/Numb-Album-Version-Linkin-Park.mp3",
            image:"./Resources/IMG/numb.jpg"
        },
        {
            name:"Waiting for the End",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/Waithing-For-The-End-Linkin-Park.mp3",
            image:"./Resources/IMG/Waithing-For-The-End-Linkin-Park.mp3"
        },
        {
            name:"Numb/Encore",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/NumbEncore-Explicit-Version-Linkin-Park.mp3",
            image:"./Resources/IMG/numbencore.jpg"
        },
        {
            name:"Faint",
            singer:"Linkin Park",
            path:"./Resources/DATA/path/Faint - Linkin Park.mp3",
            image:"./Resources/IMG/Faint.jpg"
        }
    ],
    render: function(){
        const htmls = this.songs.map(function(song,index){
            return `
            <div class="song ${index === app.currentIndex ? 'active': ''}" data-set="${index}">
                <div class="thumb" style="background-image: url(${song.image})">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`})     
        playList.innerHTML = htmls.join('')
    },
    currentSong: function(){
        return this.songs[this.currentIndex]
    }
    ,
    // defineProperties: function(){
    //     Object.defineProperty(this,'currentSong',{
    //         get: function(){
    //             return this.songs[this.currentIndex]
    //         }
    //     })
    // },
    loadSong:function(){
        header.textContent = this.currentSong().name
        thumb.style.backgroundImage = `url('${this.currentSong().image}')`
        audio.src = this.currentSong().path
        
    },
    
    handleEvent: function(){
        // Xử lý CD quay/ dừng
        const cdThumbAnimate = thumb.animate(
            [{transform: "rotate(360deg"}],
            {
                duration: 10000, //10s
                iterations: Infinity
            }
            )
            cdThumbAnimate.pause()

        // xử lý phóng to thu nhỏ\
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth
        document.onscroll = function(){
            const scroll = document.documentElement.scrollTop  
            const newCdWidth = cdWidth - scroll
            if (newCdWidth >0){
                cd.style.width = newCdWidth +'px'
            }
            else{
                cd.style.width = 0
            }
            cd.style.opacity = newCdWidth/cdWidth
        }
        //  xử lí click play
        playSongBtn.addEventListener('click', function(){
            if(app.isPlayIng == true){
                audio.pause()
            }
            else{
                audio.play()
            }
        })
        // lắng nghe sự kiện audio

        audio.onplay = function(){
            app.isPlayIng= true
            playerChanging.classList.add('playing')
            cdThumbAnimate.play()
        }
        audio.onpause = function(){
            app.isPlayIng = false
            playerChanging.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        // khi tiến độ bài hát thay đổi
        audio.addEventListener('timeupdate',function(){
           progressPercent = Math.floor(audio.currentTime/audio.duration*100)
           progress.value = progressPercent
        })

        // Xử lý khi tua song
        progress.addEventListener('change', function(e){
            audio.currentTime = progress.value/100 * audio.duration
        })

        //  xử lý khi next song
        nextBtn.addEventListener('click', function(){
            if (randomBtn.classList.contains('active')){
                app.randomSong()
                audio.play()
            }
            else{
                app.nextSong()
                audio.play()
            }
            
        })
        // xử lý khi prev song
        prevBtn.addEventListener('click', function(){
            if (randomBtn.classList.contains('active')){
                app.randomSong()
                audio.play()
            }
            else{
                app.prevSong()
                audio.play()
            }
            
        })
        // Xử lý khi random song
        randomBtn.addEventListener('click', function(){
            if (app.isRandom){
                randomBtn.classList.remove('active')
                app.isRandom = false  
            }
            else{
                randomBtn.classList.add('active')
                app.isRandom = true
            }
        })
        //  xử lý khi ended
        audio.addEventListener('ended', function(){
            if (randomBtn.classList.contains('active')){
                app.randomSong()
                audio.play()
            }
            else if(app.isRepeat = true){
                audio.play()
            }
            else{
                app.nextSong()
                audio.play()
            }
        })
        // xử lý khi repeat song
        repeatBtn.addEventListener('click', function(){
            if (app.isRepeat){
                repeatBtn.classList.remove('active')
                app.isRepeat = false
                
            }
            else{
                repeatBtn.classList.add('active')
                app.isRepeat = true
            }
        })
        // play when click
        playList.addEventListener('click', function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if (e.target.closest('.song:not(.active)') || e.target.closest('.option')){
                if( songNode){
                    app.currentIndex = Number(songNode.getAttribute('data-set'))
                    app.render()
                    app.loadSong()
                    audio.play()
                }
            }
            
        })
        
        
    },
    prevSong: function(){
        app.currentIndex --
        if (this.currentIndex <0){
            this.currentIndex = app.songs.length-1
        }
        app.render()
        app.loadSong()
        app.scrollToActiveSong()
    },
    nextSong: function(){
        app.currentIndex ++
        if (this.currentIndex >= app.songs.length){
            this.currentIndex = 0
        }
        app.render()
        app.loadSong()
        app.scrollToActiveSong()
    },
    randomSong: function(){
        var newIndex = Math.floor(Math.random()*app.songs.length)
        if (newIndex !== app.currentIndex){
            this.currentIndex = newIndex
        }
        else{
            while(newIndex === app.currentIndex){
                newIndex = Math.floor(Math.random()*app.songs.length)
                if (newIndex !== app.currentIndex){
                    this.currentIndex = newIndex
                }
            }
        }
        app.render()
        this.loadSong()
        app.scrollToActiveSong()
    },
    scrollToActiveSong: function(){
         if(app.currentIndex <= 6){
           setTimeout(function(){
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                
            })
           },500)
         }
         else{
            setTimeout(function(){
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    
                })
               },500)
         }
         
    },
    
    
    
    start: function(){
        // Định nghĩa các thuộc tính cho obj
        this.currentSong()
        // this.defineProperties()

        // load song
        this.loadSong()


        // Next song
        this.nextSong()


        // lắng nghe/ xử lý các sự kiện
        this.handleEvent()
        

        // render playlist
        this.render()

        // random song
        this.randomSong()
    }
}

app.start()