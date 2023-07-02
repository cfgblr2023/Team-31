import 'package:camera/camera.dart';
import 'package:dappunk_creator/screens/takePictureScreen.dart';
import 'package:flutter/material.dart';




Future<void> cameraPage() async {
  // Ensure that plugin services are initialized so that `availableCameras()`
  // can be called before `runApp()`
  WidgetsFlutterBinding.ensureInitialized();

  // Obtain a list of the available cameras on the device.
  final cameras = await availableCameras();

  //To Get a specific camera from the list of available cameras we can use,
  // final firstCamera = cameras.first;


    runApp( MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      //passing List<> of cameras available to function TakePictureScreen
      home: TakePictureScreen(camera: cameras)
    )


    );  
}

