import 'package:camera/camera.dart';
import 'package:dappunk_creator/pages/MainPage.dart';
import 'package:dappunk_creator/screens/takePictureScreen.dart';
import 'package:flutter/material.dart';
import 'package:dappunk_creator/screens/home.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: HomeScreen());
  }
}
