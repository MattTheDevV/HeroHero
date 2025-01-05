const { body } = require("express-validator");
const { string } = require("joi");

async function loadPosts(postId) {

    // Delete old posts
    const mainDiv = document.querySelector('.main');
    mainDiv.innerHTML = '';
    
    //Get and parsedata
    const data = await fetch('./data.json').then(response => response.json())
    const selectedPost = await data.find(post => post.id === postId);
    
    //Load videos
    if (selectedPost.videos.length > 0) {
      var videoInt = 1;
      selectedPost.videos.forEach(videoSource => {
        
        // Create new post
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.id = videoInt;
        mainDiv.appendChild(postDiv);

        // Create a new video element
        const videoElement = document.createElement('video');
        videoElement.classList.add('videoplayer');
        videoElement.controls = true;
        postDiv.appendChild(videoElement);

        // Load the video source into the video player
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(videoSource);
          hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
          videoElement.src = videoSource;
        }
        
        // Load a thumbnail source into the video player
        const thumbnailSource = selectedPost.thumbnails[2*videoInt - 2];
        videoElement.poster = thumbnailSource;

        // Create a new description element
        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('description');
        descriptionElement.textContent = 
        postDiv.appendChild(descriptionElement);

        // Load the description into the description element
        var descriptionSource = ''
        if (videoInt === 1) {
          descriptionSource = selectedPost.description.replace("\n","<br><br>");
          }
        descriptionElement.innerHTML = descriptionSource;

        // Create a new date element
        const dateElement = document.createElement('div');
        dateElement.classList.add('timestamp');
        postDiv.appendChild(dateElement);

        // Load the date into the date element
        const dateSource = selectedPost.date;
        dateElement.textContent = dateSource;
        
        //Increment the videoInt
        videoInt += 1;
      });
    }

    //Load images
    if (selectedPost.images.length > 0) {
      var imageInt = 1;
      selectedPost.images.forEach(imageSource => {
        // Create new post
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.id = imageInt;
        mainDiv.appendChild(postDiv);

        // Create a new image element
        const imageElement = document.createElement('img');
        imageElement.src = imageSource;
        imageElement.classList.add('image');
        postDiv.appendChild(imageElement);

        // Create a new description element
        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('description');
        postDiv.appendChild(descriptionElement);

        // Load the description into the description element
        var descriptionSource = ''
        if (imageInt === 1) {
          descriptionSource = selectedPost.description.replace("\n","<br><br>");
          }
        descriptionElement.innerHTML = descriptionSource;

        //Create a new date element
        const dateElement = document.createElement('div');
        dateElement.classList.add('timestamp');
        postDiv.appendChild(dateElement);

        //Load the date into the date element
        const dateSource = selectedPost.date;
        dateElement.textContent = dateSource;
        
        //Increment the imageInt
        imageInt += 1;
      });
    }

    // load attachments
    if (selectedPost.attachments.length > 0) {
      const attachmentDiv = document.createElement("div")
      attachmentDiv.classList.add("attachment_grid")
      document.getElementsByClassName("post")[0].appendChild(attachmentDiv)

      selectedPost.attachments.forEach(attachment => {
        const attachmentElement = document.createElement('a');
        attachmentElement.classList.add('attachment');
        attachmentElement.href = attachment
        attachmentElement.innerHTML = "<i class='bx bxs-package'> "+attachment+"</i>"
        attachmentDiv.appendChild(attachmentElement);
      })
    }

    //Load description only posts
    if (selectedPost.videos.length === 0
      && selectedPost.images.length === 0
      && selectedPost.description !== '') {

      // Create new post
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      mainDiv.appendChild(postDiv);

      // Create a new description element
      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('description');
      postDiv.appendChild(descriptionElement);

      // Load the description into the description element
      const descriptionSource = selectedPost.description.replace("\n","<br><br>");;
      descriptionElement.innerHTML = descriptionSource;

      //Create a new date element
      const dateElement = document.createElement('div');
      dateElement.classList.add('timestamp');
      postDiv.appendChild(dateElement);

      //Load the date into the date element
      const dateSource = selectedPost.date;
      dateElement.textContent = dateSource;
    }
  }