# Sensing Locally

## Abstract

Government in India is facing difficulties in managing urban development sustainability.
Sensing Local Volunteers are dropping off due to hustle being employed and there is lack of streamlined data
collection(Photos and videos).Also the existing solution requires more time to cover less distance.
As a result, walkability audits exhibit reduced effectiveness and limited scalability.

So We developed a user-friendly and accessible mobile application for citizens to document walkable areas as they
traverse the streets. By simply opening the application, Users can effortlessly enable the camera and capture walkable
areas with a single click of a button. This streamlined process will contribute to produce reliable evidence based data
along with Geo-location.

## Requirements

1. Flask API
2. Flutter
3. Node.js
4. Keras
5. MongoDB

## Steps of building this project

1. Firstly, We worked on developing the Frontend UI using Flutter, where the user can interact and capture the image of the walkable areas.

2. Then this image is being sent for classification to the CNN model. Here we are using Node.js to interact between the UI and receiving the predicted label from Flask API.

3. Further, this label along with geo-location and image is being saved to the database.
 <br /> <br /> The code ("Code") in this repository was created solely by the student teams during a coding competition hosted by JPMorgan Chase Bank, N.A. ("JPMC"). JPMC did not create or contribute to the development of the Code. This Code is provided AS IS and JPMC makes no warranty of any kind, express or implied, as to the Code, including but not limited to, merchantability, satisfactory quality, non-infringement, title or fitness for a particular purpose or use.