import 'dart:math';

import 'package:camera/camera.dart';
import 'package:dappunk_creator/main.dart';
import 'package:dappunk_creator/pages/MainPage.dart';
import 'package:dappunk_creator/pages/cameraPage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'videoScreen.dart';
import 'displayScreen.dart';

class TakePictureScreen extends StatefulWidget {
  const TakePictureScreen({
    super.key,
    required this.camera,
  });

  final List<CameraDescription> camera;

  @override
  TakePictureScreenState createState() => TakePictureScreenState();
}

class TakePictureScreenState extends State<TakePictureScreen> {
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;

  //variables initialized to false initially
  //transform will be used to change camera direction from front to back and vice versa

  bool flash = false;
  bool isRecoring = false;
  bool iscamerafront = true;
  double transform = 0;

  @override
  void initState() {
    super.initState();
    // To display the current output from the Camera,
    // create a CameraController.
    _controller = CameraController(
      // Get a specific camera from the list of available cameras.
      widget.camera[0],
      // Define the resolution to use.
      ResolutionPreset.ultraHigh,
    );

    // Next, initialize the controller. This returns a Future.
    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    // Dispose of the controller when the widget is disposed.

    _controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      // extendBodyBehindAppBar: true,
      // extendBody: true,
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0.0,
        leading: IconButton(
            icon: Icon(Icons.arrow_back),
            onPressed: () {
              main(); 
            }),
        actions: [
           IconButton(
              icon: Icon(
                flash ? Icons.flash_on : Icons.flash_off,
                color: Colors.white,
                size: 28,
              ),
              onPressed: () {
                setState(() {
                  flash = !flash;
                });
                flash
                    ? _controller.setFlashMode(FlashMode
                        .torch) // when flash option pressed open torch else not
                    : _controller.setFlashMode(FlashMode.off);
              }),
          Container(padding: const EdgeInsets.all(10.0)),
          IconButton(
              onPressed: () async {
                setState(() {
                  iscamerafront = !iscamerafront;
                  transform = transform +
                      pi; //transform camera motion when flip icon pressed
                });
                int cameraPos = iscamerafront
                    ? 0
                    : 1; //tells which camera to use...0 defines rear camera while 1 states front camera
                _controller = CameraController(
                    widget.camera[cameraPos], ResolutionPreset.high);
                _initializeControllerFuture = _controller.initialize();
              },
              icon: Icon(Icons.flip_camera_android)),
          Container(padding: const EdgeInsets.all(10.0)),
        ],
      ),

      // You must wait until the controller is initialized before displaying the
      // camera preview. Use a FutureBuilder to display a loading spinner until the
      // controller has finished initializing.
      body: Stack(children: [
        FutureBuilder<void>(
          future: _initializeControllerFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.done) {
              // If the Future is complete, display the preview.
              return Container(
                  // width: MediaQuery.of(context).size.width,
                  // height: MediaQuery.of(context).size.height,
                  child: CameraPreview(_controller));
            } else {
              // Otherwise, display a loading indicator.
              return const Center(child: CircularProgressIndicator());
            }
          },
        ),
        Positioned(
            bottom: 10.0,
            child: Container(
              color: Colors.transparent,
              padding: EdgeInsets.only(top: 10, bottom: 10),
              width: MediaQuery.of(context).size.width,

              // GestureDetector will help identify if long pressed or not
              //long press would mean video to be fetched while just a click means photo is to be clicked
              child: GestureDetector(
                onLongPress: () async {
                  await _controller.startVideoRecording();
                  setState(() {
                    isRecoring = true;
                  });
                },
                onLongPressUp: () async {
                  XFile videopath = await _controller.stopVideoRecording();
                  setState(() {
                    isRecoring = false;
                  });
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (builder) => VideoViewPage(
                                path: videopath.path,
                              )));
                },
                onTap: () async {
                  if (!isRecoring) {
                    // Take the Picture in a try / catch block. If anything goes wrong,
                    // catch the error.
                    try {
                      Fluttertoast.showToast(
                          msg: "Picture captured",
                          toastLength: Toast.LENGTH_SHORT,
                          gravity: ToastGravity.BOTTOM,
                          timeInSecForIosWeb: 1,
                          // timeInSecForIos: 1,
                          backgroundColor: Colors.red.shade200,
                          textColor: Colors.white,
                          fontSize: 16.0
                      );
                      // Ensure that the camera is initialized.
                      await _initializeControllerFuture;

                      // Attempt to take a picture and get the file `image`
                      // where it was saved.
                      final image = await _controller.takePicture();

                      if (!mounted) return;

                      // If the picture was taken, display it on a new screen.
                      await Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => DisplayPictureScreen(
                            // Pass the automatically generated path to
                            // the DisplayPictureScreen widget.
                            imagePath: image.path,
                          ),
                        ),
                      );
                    } catch (e) {
                      // If an error occurs, log the error to the console.
                      print(e);
                    }
                  }
                },
                child: isRecoring
                    ? Icon(
                        Icons.radio_button_on,
                        color: Colors.white,
                        size: 80,
                      )
                    : Icon(
                        Icons.panorama_fish_eye,
                        color: Colors.white,
                        size: 70,
                      ),
              ),
            )),
      ]),
    );
  }
}
