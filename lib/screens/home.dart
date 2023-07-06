import 'package:flutter/material.dart';
import 'package:dappunk_creator/pages/mainPage.dart';
import 'package:dappunk_creator/screens/maps.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  final List<Widget> _pages = [
    MainPage(),
    MapsPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('App'),
      ),
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.camera_alt),
            label: 'Start Audit',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.map),
            label: 'View Location',
          ),
        ],
      ),
    );
  }
}
