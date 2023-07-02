/*document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("videoElement");
    var button = document.getElementById("captureButton");
    var predictButton = document.getElementById("predictButton");
  
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
  
      // Enable predict button
      predictButton.disabled = false;
    });
  
    // Upload the captured image
    uploadButton.addEventListener("click", function() {
    if (capturedImage) {
      var formData = new FormData();
      formData.append("image", capturedImage);
  
      // Send the image data to the server using fetch API
      fetch("upload.php", {
        method: "POST",
        body: formData
      })
        .then(function(response) {
          if (response.ok) {
            console.log("Image uploaded successfully!");
            // Handle the server response here
          } else {
            console.log("Error uploading image. Status code: " + response.status);
            // Handle the error case here
          }
        })
        .catch(function(error) {
          console.log("Error uploading image: " + error);
          // Handle the error case here
        });
    }
  });
  
  });
  */
  document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("videoElement");
    var button = document.getElementById("captureButton");
    var predictButton = document.getElementById("predictButton");
  
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
  
      // Enable predict button
      predictButton.disabled = false;
    });
  
    // Perform prediction when the "Predict" button is clicked
    predictButton.addEventListener("click", function() {
      if (capturedImage) {
        // Perform prediction logic here
        console.log("Performing prediction...");
  
        // Send the image data to the server using fetch API
        var formData = new FormData();
        formData.append("image", capturedImage);
  
        fetch("predict.php", {
          method: "POST",
          body: formData
        })
          .then(function(response) {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error performing prediction. Status code: " + response.status);
            }
          })
          .then(function(data) {
            // Handle the prediction response data here
            console.log("Prediction response:", data);
          })
          .catch(function(error) {
            console.log("Error performing prediction:", error);
          });
      }
    });
  });
  