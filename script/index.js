const removeActiveClass =() =>{
    const activeButtons = document.getElementsByClassName("active");

    for(let btn of activeButtons){
        btn.classList.remove('active')
    }

}

const loadCategories = () => {
    //fatch the data 
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        // convert promise to json
        .then(res => res.json())
        // send data to display... function
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))

}

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            document.getElementById('btn-all').classList.add('active')
            displayVideos(data.videos)

        })
        .catch(error => console.log(error))
}

const loadCategoriesVideo = (id) =>{
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `
    fetch(url)
    .then(res => res.json())
    .then(data => {

            removeActiveClass()
        const clickBtn = document.getElementById(`btn-${id}`)
        clickBtn.classList.add("active")
        displayVideos(data.category)
    })
    .catch(error => console.log(error))
}

// nav btn section

//  "category_id": "1001",
//       "category": "Music"

const loadVideosDetails =(videoId) =>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
    .then(res=> res.json())
    .then(data => displayVideoDetails(data.video))
} 

const displayVideoDetails = (video) =>{

    console.log(video);

    const modal = document.getElementById('video_details');
    
    modal.showModal()

    // if (modal) {
    //     modal.showModal(); // Modal ওপেন করো
    // } else {
    //     console.error("Modal element not found!");
    // }

}


const displayCategories = (categories) => {
    //get the container

    const categoryContainer = document.getElementById("category-container");

    //loop operation on Array of object

    for (let cat of categories) {

        //create Element 
        const categoryDiv = document.createElement("div");

        categoryDiv.innerHTML = `
            <button id="btn-${cat.category_id}" onclick="loadCategoriesVideo(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] border border-[#FF1F3D] bg-slate-50 hover:text-white">${cat.category}</button>  
        `
        //append the element 
        categoryContainer.append(categoryDiv)
    }
}

// display video section 

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//       {
//         "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//         "profile_name": "Noah Walker",
//         "verified": false
//       }
//     ],
//     "others": {
//       "views": "543K",
//       "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
//   }

const displayVideos = (videos) => {

    const categoryVideo = document.getElementById('video-container');

    categoryVideo.innerHTML ="";

    if(videos.length === 0){
        categoryVideo.innerHTML=`
        <div class="col-span-full text-center justify-center flex flex-col items-center py-10 ">
            <img class="w-36 h-36" src="assets/Icon.png" alt="Oops!! Sorry, There is no content here">
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2></div>
        `
        return;
    }

    // use for each loop
    videos.forEach(video => {
        const videoCard = document.createElement('div');

        let minutes = video.others.posted_date; // Change this value to test different times

        let days = Math.floor(minutes / 1440); // 1 day = 1440 minutes
        let hours = Math.floor((minutes % 1440) / 60); // Remaining hours
        let remainingMinutes = minutes % 60; // Remaining minutes
        let months = Math.floor(days / 30); // Approximate months
        days = days % 30; // Remaining days after calculating months

        let result = "";

        if (months > 0) {
            result = `${months} months ${days} days ago`;
        } else if (days > 0) {
            result = `${days} days ${hours} hours ago`;
        } else {
            result = `${hours} hours ${remainingMinutes} minutes ago`;
        }



        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
            <figure class="relative">
                <img  class="w-full h-[9.375rem] object-cover" src="${video.thumbnail}"
                    alt="${video.title}" />
            </figure>
            <div class="py-6 flex flex-row px-1 gap-3">
                <div class="avatar">
                    <div class="ring-primary w-10 h-10 rounded-full ring ">
                        <img src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
                <div>
                    <h2 class="card-title">${video.title}</h2>
                    <p class="text-[#171717B3]">${video.authors[0].profile_name}</p>
                    <p class="text-[#171717B3]">${video.others.views}</p>
                </div>
                 <button onclick="loadVideosDetails('${video.video_id}')" class="btn"> click</button>
            </div>
        </div>
        `;
        categoryVideo.append(videoCard)

    })

}

loadCategories()
loadVideos()

