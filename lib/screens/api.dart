import 'package:flutter/material.dart';

class ApiPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Classified Image'),
      ),
      body: Center(
        child: Text(
          'API Page',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
