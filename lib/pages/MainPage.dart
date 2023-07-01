import 'dart:io';
import 'dart:async';
import 'package:dappunk_creator/screens/displayScreen.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'cameraPage.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  //pickImage function ->ImagePicker class is called with instance pickImage()
  //to give a file and its path that is selected from gallery

  File? image;
  Future<void> pickImage() async {
    final image = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (image == null) return;
    final imageTemporary = File(image.path);
    this.image = imageTemporary;
    await Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => DisplayPictureScreen(
              // Pass the automatically generated path to
              // the DisplayPictureScreen widget.
              imagePath: image.path,
            )));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
      child: Container(
          padding: EdgeInsets.symmetric(vertical: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              InkWell(
                splashColor: Colors.green,
                highlightColor: Colors.purple,

                //Navigation to camera page after clocking the camera button
                

                onTap: (() => cameraPage()),
                child: Card(
                  margin: EdgeInsets.all(15),
                  elevation: 8,
                  child: Container(
                    padding: EdgeInsets.all(25),
                    child: Text(
                      'Open Camera',
                      style: TextStyle(color: Colors.black),
                    ),
                  ),
                  color: Colors.purpleAccent,
                ),
              ),
              SizedBox(
                height: 20,
              ),
              InkWell(
                splashColor: Colors.green,
                highlightColor: Colors.purple,
                onTap: (() => pickImage()),
                child: Card(
                  margin: EdgeInsets.all(15),
                  elevation: 8,
                  child: Container(
                    padding: EdgeInsets.all(25),
                    child: Text(
                      'Open Library',
                      style: TextStyle(color: Colors.black),
                    ),
                  ),
                  color: Colors.purpleAccent,
                ),
              ),
            ],
          )),
    ));
  }
}
