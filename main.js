









//Node 

class Node {
    constructor(value,index){
        this.value = value;
        this.next = null;
        this.pre = null;
    }
}

class LinkList{
    constructor(value){
        this.head = null
        this.tail = null
        this.length = 0

        if(value){
            this.initialize(value)
        }
    }


    //used to initialize Circilar Linked List
    initialize(value){
        //create a node
        const newNode = new Node(value)

        //create a circular reference( points to ifself)
        newNode.next = newNode
        newNode.pre = newNode

        //now make both head and tail to point on newNode
        this.head = newNode
        this.tail = newNode
        
        //increment length
        this.length++
    }

    //thêm node vào cuối
    append(value){
        //if length is zero,use initialize method instead
        if(this.length === 0){
            return this.initialize(value)
        }

        //create a node
        const newNode = new Node(value)
        newNode.next = this.head
        this.head.pre = newNode
        //now,make tail pointer to point to newNode
        this.tail.next = newNode
        newNode.pre = this.tail
        //set the tail with newNode
        this.tail = newNode
        //increment
        this.length++
    }

    //thêm node vào đầu
    prepend(value){
        //if length is zero, use initialize method instead
        if(this.length === 0){
            return this.initialize()
        }

        //create a new node
        const newNode = new Node(value)
        //point new node next pointer to this head 
        newNode.next = this.head
        this.head.pre = newNode
        //now ,make tails next pointer to this head 
        this.tail.next = newNode
        newNode.pre = this.tail
        //set the head with newNode
        this.head = newNode

        //increment length
        this.length++
    }

    //hàm lấy các value của linklist
    toArray(){
        const array = []

        //initialize a currentnode variable pointing to this.head
        let currentNode = this.head
        do{
            array.push(currentNode.value)
            currentNode = currentNode.next
        }while(currentNode !== this.head)

        return array
    }

    //lấy ra node tại index chỉ định
    traverseToIndex(index){
        if(index < 0){
            return undefined
        }

        let counter = 0
        //starting point
        let currentNode = this.head
        
        while(counter !== index){
            currentNode = currentNode.next
            counter++
        }

        return currentNode
    }

    //chèn node vào danh sách liên kết tại index
    insert(index,value){
        //if length is 0 , just prepend(add to the beginning)
        if(index === 0){
            return this.prepend(value)
        }
        if(!index){
            return 'Index is missing'
        }
        if(typeof index !== 'number'){
            return 'Index should be a number'
        }
        if(index < 0){
            return 'Index should be bigger than zero'
        }

        //if length too long,just append(add to the end)
        if(index >= this.length){
            //thêm vào cuối danh sách liên kết
            return this.append()
        }

        //Khởi tạo một node với value và trỏ tới null
        const newNode = new Node(value,null)

        //pick previous index
        const previous = this.traverseToIndex(index-1)
        //pick target index 
        const targetIndex = previous.next

        previous.next = newNode
        newNode.pre = previous
        newNode.next = targetIndex
        targetIndex.pre = newNode
        this.length++
        return this
    }

    //Xóa Head
    deleteHead(){
        //check if there is a head value - if not return a warning(or an error)
        if(this.length === 0){
            return 'List is empty'
        }

        const currHead = this.head

        //if on element left
        if(this.length === 1){
            const headVal = this.head.value
            this.head = null
            this.tail = null
            this.length--
            return headVal
        }

        //pick the current head value
        const headVal = this.head.value
        //define newHead as this.head.next
        const newHead = this.head.next
        //now change the head pointer to newhead
        this.head = newHead

        //update tail pointer to point on updated head:
        this.tail.next = this.head
        this.length--
        return headVal
    }

    deleteTail(){
        //check if length is zero
        if(this.length === 0){
            return 'List is empty'
        }

        //if there is only one node left
        if(this.length === 1){
            const headVal = this.head.value
            this.head = null
            this.tail = null
            this.length--
            return headVal
        }

        //store the current tail value
        const tailVal = this.tail.value

        //pick the previous node of tail
        const newTail = this.traverseToIndex(this.length - 2)
        
        //make tail to poin to newtail 
        newTail.next = this.head
        
        //Make tail to point to newtail
        this.tail = newTail
        this.length--
        return tailVal
    }


    delete(index){
        //validate the received index parameter
        if(!index){
            return 'Index is missing'
        }
        if(typeof index !== 'number'){
            return 'Index should be a number'
        }
        if(index < 0){
            return 'Index should be bigger than zero'
        }

        if(this.length === 2){
            if(index === 0){
                return this.deleteHead()
            }
            if(index > 0){
                return this.deleteTail()
            }
        }

        //For a list with more than 2 elements,define removal style
        //Removal will be either from head,middle or tail
        let removalType
        if(index === 0){
            removalType = 'head'
        }
        else if(index >= this.length){
            removalType = 'tail'
        }
        else{
            removalType = 'middle'
        }

        if(removalType ==='head'){
            return this.deleteHead()
        }
        if(removalType ==='tail'){
            return this.deleteTail()
        }


        //
        if(removalType ==='middle'){
            const preIdx = this.traverseToIndex(index - 1)
            const targetIdx = preIdx.next
            const targetVal = targetIdx.value
            //implement 
            preIdx.next = target.next
            this.length--
            return targetVal
        }

    }

}

/*
1.Render songs
2.Scroll top 
3.Play/pause/seek
4.CD rotate
5.Next/ prev
6.Random
7.Next/ Repeat when ended
8.Active song
9.Scroll active song into view
10.Play song when click  
*/
//

var isPlaying = false
const $ = document.querySelector.bind(document)

const header = $('header h2')
const song = document.querySelector('.song')
const cdthumb = document.querySelector('.cd-thumb')
const cd = document.querySelector('.cd')
const input = document.querySelector('.progress')
const playlist = document.querySelector('.playlist')

const ListSong = new LinkList()
const ListElement = new LinkList()

const songs = {
    song:[
        {
            name:'Giúp anh trả lời những câu hỏi',
            singer:'Vicetone',
            path:'./asset/music/song1.mp3', // chưa add file âm nhạc
            image: './asset/img/song1.avif'

        },
        {
            name: 'Havana',
            singer:'k-391',
            path:'./asset/music/song2.mp3',
            image:'./asset/img/song2.avif'
        },
        {
            name:'Giúp anh trả lời những câu hỏi2',
            singer:'Vicetone2',
            path:'./asset/music/song3.mp3', // chưa add file âm nhạc
            image: './asset/img/song3.avif'

        },
        {
            name: 'Havana2',
            singer:'k-3912',
            path:'./asset/music/song4.mp3',
            image:'./asset/img/song4.avif'
        },
        {
            name:'Giúp anh trả lời những câu hỏi3',
            singer:'Vicetone',
            path:'./asset/music/song1.mp3', // chưa add file âm nhạc
            image: './asset/img/song1.avif'

        },
        {
            name: 'Havana3',
            singer:'k-391',
            path:'./asset/music/song2.mp3',
            image:'./asset/img/song2.avif'
        },
        {
            name:'Giúp anh trả lời những câu hỏi4',
            singer:'Vicetone2',
            path:'./asset/music/song3.mp3', // chưa add file âm nhạc
            image: './asset/img/song3.avif'

        },
        {
            name: 'Havana4',
            singer:'k-3912',
            path:'./asset/music/song4.mp3',
            image:'./asset/img/song4.avif'
        }
        
       
    ]
}


//1.Render 
//renderSong 
renderSong = function(){
    const htmls = songs.song.map(function(curr,ind,arr){
        return ` <div class="song">
        <div class="image">
            <div class="thumb" style="background-image:url(${curr.image})"></div>
        </div>
        <div class="body">
            <h3 class="title">${curr.name}</h3>
            <p class="author">${curr.singer}</p>
        </div>
        <div class="option">
            <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>`
    })
    // //playlist.style.height = songs.song.length * 80 + 'px'
    // song.style.height = 80 + 'px'
    $('.playlist').innerHTML = htmls.join('')

}

//Tạo ListSong 
CreateListSong = function(){
    const ListSong = new LinkList()
    for(var i = 0;i < songs.song.length;i++){
        ListSong.append(songs.song[i])
    }
    return ListSong
}

//Tạo ListElement
CreateListElement = function(){
    const htmls = songs.song.map(function(curr,ind,arr){
        return ` <div class="song">
        <div class="image">
            <div class="thumb" style="background-image:url('${curr.image}')"></div>
        </div>
        <div class="body">
            <h3 class="title">${curr.name}</h3>
            <p class="author">${curr.singer}</p>
        </div>
        <div class="option">
            <i class="fas fa-ellipsis-h"></i>
        </div>
    </div>`
    })
    for(var i = 0;i < songs.song.length;i++){
        ListElement.append(htmls[i])
    }
    return ListElement
}

//renderSong UI cho lần đầu tiên
renderSongUI = function(){
    const ListSong = CreateListSong()
    header.textContent = ListSong.head.value.name
    cdthumb.style.backgroundImage = `url('${ListSong.head.value.image}')`
    audio.src = ListSong.head.value.path
}


//2.Scroll Top
handleEvent = function(){
    cd.classList.add('cd-center')
    
    document.onscroll = function(){
        const cdWidth = 130
        //const cdWidth = cd.offsetWidth;
        const scrollTop = (document.documentElement.scrollTop);
        const newcdWidth = cdWidth - scrollTop; 
        //console.log('newcdWidth', newcdWidth)
        
        if(newcdWidth > 0 ){
            cd.style.width = newcdWidth + 'px'
            cd.style.height = newcdWidth + 'px'
            cdthumb.classList.add('cd-boxshadow')
            cdthumb.classList.remove('cd-boxshadow-delete')
        }
        else{
            if(newcdWidth === 0){
                cd.style.width = 0 + 'px'
                cd.style.height = newcdWidth + 'px'
                cdthumb.classList.remove('cd-boxshadow')
                cdthumb.classList.add('cd-boxshadow-delete')
            }
        }        
   // cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
    }
}


const cdThumbAnimate = cdthumb.animate([
{
    transform: 'rotate(360deg)',
    
}
],{
duration: 1000,
iterations: Infinity
})

cdThumbAnimate.pause()



//3.play/pause/seek
const btnPause = document.querySelector('.icon-pause')
const btnPlay = document.querySelector('.icon-play')
const btnToggle = document.querySelector('.btn-toggle-play')


handleEventPlaySong = function(){
    audio.onplaying = function(){
        btnPause.onclick = function(){
            btnPause.parentNode.removeChild(btnPause)
            btnToggle.appendChild(btnPlay)
            audio.play()
            cdThumbAnimate.play()
        }
    
        btnPlay.onclick = function(){
            btnPlay.parentNode.removeChild(btnPlay)
            btnToggle.appendChild(btnPause)
            audio.pause()
            cdThumbAnimate.pause()
        }
    }

}

//3.0 Xử lý khi nhấn pause 



//3.1 Xử lý audio run 
// hàm xử lý cho lần đầu phát nhạc
UpdateTimeForSong = function(){
    audio.oncanplay = function(){
        return audio.duration
    }
    document.getElementById('audio').ontimeupdate = function(e){
        document.querySelector('.progress').value = (document.getElementById('audio').currentTime)*100/(audio.oncanplay())
    }
}


playSongFirst = function(){
    renderSongUI()
    btnPlay.parentNode.removeChild(btnPlay)
    btnToggle.appendChild(btnPause)
    btnPause.onclick = function(){
        btnPause.parentNode.removeChild(btnPause)
        btnToggle.appendChild(btnPlay)
        audio.play()
        cdThumbAnimate.play()
        UpdateTimeForSong()
    }
    
}



//Xử lý khi bật/tắt random Song
const randomBtn = $('.btn-random')
var isRandom = false
randomBtn.onclick = function(e){
  if(isRandom){
    isRandom = false
    randomBtn.classList.add('active')
  }else{
    isRandom = true
    randomBtn.classList.remove('active')
  }
}

playRandomSong = function(){
    let newIndex
    var currentIndex = 0
    do{
      newIndex = Math.floor(Math.random() * songs.song.length)
  
    }
    
    while(newIndex === this.currentIndex)
    currentIndex = newIndex
    //loadCurrentSong()
  }


//Xử lý khi lặp lại một song
const repeatBtn = $('.btn-repeat')
repeatBtn.onclick = function(){
    audio.currentTime = 0
    audio.play()
    cdThumbAnimate.play()
}

var isRepeat = false
repeatBtn.onclick = function(){
    if(isRepeat){
      isRepeat = false
      repeatBtn.classList.remove('active')
    }
    else{
      isRepeat = true
      repeatBtn.classList.add('active')
      audio.play()
      cdThumbAnimate.play()
    }
  }

//Xử lí khi chạy đến cuối bài hát 

audio.onended = function(){
    btnNext.click()
}
//Xử lí khi tua bài hát 
input.onchange = function(e){
        audio.currentTime = (e.target.value/100)*(audio.duration)
}



//Xử lí khi nhấn next/pre
var timesNext = 0
var timesPre = 0
const btnNext = document.querySelector('.btn-next')
const btnPre = document.querySelector('.btn-prev')

//sử dụng Circle LinkList để tạo array 
    
renderArraykhinhannext = function(timesNext,timesPre){
    const Link = renderArrayuseCircle()

    for(var i = 0;i < timesNext;i++){
        Link.head = Link.head.next
        Link.tail = Link.tail.next
    }

    for(var i = 0;i < timesPre;i++){
        Link.head = Link.head.pre
        Link.tail = Link.tail.pre
    }

    const htmls = Link.toArray()
    $('.playlist').innerHTML = htmls.join('');
}

renderArrayuseCircle = function(){
    const htmls = songs.song.map(function(curr,index,arr){
    return `<div class="song">
                <div class="image">
                <div class="thumb" style="background-image: url('${curr.image}')">
                </div>
                </div>
                <div class="body">
                <h3 class="title">${curr.name}</h3>
                <p class="author">${curr.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
    })

    const Link = new LinkList()
    for(var i = 0;i < songs.song.length;i++){
    Link.append(htmls[i])
    }

    return Link
}

playSongPressNext = function(){
    btnNext.onclick = function(){
        
        if(btnToggle.lastElementChild.outerHTML === "<i class=\"fas fa-play icon-pause\"></i>"){
            btnToggle.removeChild(btnPause)
            btnToggle.appendChild(btnPlay)
        }
        timesNext++
        loadNextSong(timesNext,timesPre)
        audio.play()
        cdThumbAnimate.play()
        UpdateTimeForSong()
        renderArraykhinhannext(timesNext,timesPre)
    }
}

playSongPressPre = function(){
    btnPre.onclick = function(){
        if(btnToggle.lastElementChild.outerHTML === "<i class=\"fas fa-play icon-pause\"></i>"){
            btnToggle.removeChild(btnPause)
            btnToggle.appendChild(btnPlay)
        }
        timesPre++
        loadPreSong(timesNext,timesPre)
        audio.play()
        cdThumbAnimate.play()
        UpdateTimeForSong()
        renderArraykhinhannext(timesNext,timesPre)
    }
}

loadNextSong = function(timesNext,timesPre){
    const Link = CreateListSong()
    
    for(var i = 0;i < timesNext;i++){
    Link.head = Link.head.next
    Link.tail = Link.tail.next
    }

    for(var i = 0;i < timesPre;i++){
    Link.head = Link.head.pre
    Link.tail = Link.tail.pre
    }
    console.log(Link.head)
    header.textContent = Link.head.value.name
    cdthumb.style.backgroundImage = `url('${Link.head.value.image}')`
    audio.src = Link.head.value.path
}

loadPreSong = function(timesNext,timesPre){
    const Link = CreateListSong()
    
    for(var i = 0;i < timesNext;i++){
      Link.head = Link.head.next
      Link.tail = Link.tail.next
    }

  
    for(var i = 0;i < timesPre;i++){
      Link.head = Link.head.pre
      Link.tail = Link.tail.pre
    }

    
    header.textContent = Link.head.value.name
    cdthumb.style.backgroundImage = `url('${Link.head.value.image}')`
    audio.src = Link.head.value.path

}





//Khi song được play



this.handleEvent()
this.handleEventPlaySong()
this.playSongFirst()
this.renderSong()
this.playSongPressNext()
this.playSongPressPre()
