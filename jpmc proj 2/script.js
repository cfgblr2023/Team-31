/*document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("videoElement");
    var button = document.getElementById("captureButton");
  
    // Access the camera and stream the video to the video element
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          video.srcObject = stream;
        })
        .catch(function(error) {
          console.log("Error accessing the camera: " + error);
        });
    }
  
    // Capture the image from the video stream
    button.addEventListener("click", function() {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, 400, 300);
      
      // Get the base64 data URL of the captured image
      var dataURL = canvas.toDataURL();
      
      // Display the captured image
      var image = new Image();
      image.src = dataURL;
      document.body.appendChild(image);
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("videoElement");
    var button = document.getElementById("captureButton");
    var uploadButton = document.getElementById("uploadButton");
  
    var capturedImage = null;
  
    // Access the camera and stream the video to the video element
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          video.srcObject = stream;
        })
        .catch(function(error) {
          console.log("Error accessing the camera: " + error);
        });
    }
  
    // Capture the image from the video stream
    button.addEventListener("click", function() {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, 400, 300);
  
      // Get the base64 data URL of the captured image
      var dataURL = canvas.toDataURL();
  
      // Display the captured image
      var image = new Image();
      image.src = dataURL;
      document.body.appendChild(image);
  
      // Store the captured image data
      capturedImage = dataURL;
    });
  
    // Upload the captured image
    uploadButton.addEventListener("click", function() {
      if (capturedImage) {
        var formData = new FormData();
        formData.append("image", capturedImage);
  
        // Send the image data to the server using an AJAX request
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "upload.php", true);
        xhr.onload = function() {
          if (xhr.status === 200) {
            console.log("Image uploaded successfully!");
          } else {
            console.log("Error uploading image. Status code: " + xhr.status);
          }
        };
        xhr.send(formData);
      }
    });
  });*/
  document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("videoElement");
    var button = document.getElementById("captureButton");
    var uploadButton = document.getElementById("uploadButton");
  
    var capturedImage = null;
  
    // Access the camera and stream the video to the video element
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          video.srcObject = stream;
          video.play(); // Start video playback
        })
        .catch(function(error) {
          console.log("Error accessing the camera: " + error);
        });
    }
  
    // Capture the image from the video stream
    button.addEventListener("click", function() {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
      // Get the base64 data URL of the captured image
      var dataURL = canvas.toDataURL();
  
      // Display the captured image
      var image = new Image();
      image.src = dataURL;
      document.body.appendChild(image);
  
      // Store the captured image data
      capturedImage = dataURL;
    });
  
    // Upload the captured image
    uploadButton.addEventListener("click", function() {
      if (capturedImage) {
        var formData = new FormData();
        formData.append("image", capturedImage);
  
        fetch("upload.php", {
            method: "POST",
            body: formData
          })
          .then(function(response) {
            if (response.ok) {
              console.log("Image uploaded successfully!");
            } else {
              console.log("Error uploading image. Status code: " + response.status);
            }
          })
          .catch(function(error) {
            console.log("Error uploading image: " + error);
          });
        }
      });
    });
  