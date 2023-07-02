import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ApiPage extends StatefulWidget {
  final String imagePath;

  const ApiPage({Key? key, required this.imagePath}) : super(key: key);

  @override
  _ApiPageState createState() => _ApiPageState();
}

class _ApiPageState extends State<ApiPage> {
  String? label;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    convertAndUploadImage();
  }

  Future<void> convertAndUploadImage() async {
    setState(() {
      isLoading = true;
    });

    final imageBytes = await File(widget.imagePath).readAsBytes();
    final base64Image = base64Encode(imageBytes);

    final response = await http.post(
      Uri.parse(
          'https://11fa-2402-3a80-e11-ea8e-4d0d-1056-b64c-c9.in.ngrok.io/upload'),
      body: {
        'image': base64Image,
      },
    );

    if (response.statusCode == 200) {
      final jsonResponse = jsonDecode(response.body);
      setState(() {
        label = jsonResponse['label'];
        isLoading = false;
      });
    } else {
      setState(() {
        isLoading = false;
      });

      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: Text('Error'),
          content: Text('Failed to upload the image.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(this.context),
              child: Text('OK'),
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('API Page')),
      body: Center(
        child: isLoading
            ? CircularProgressIndicator()
            : label != null
                ? Text('Label: $label')
                : Text('No label available.'),
      ),
    );
  }
}
