
# Firebase Pico W - IoT Home Automation System

A comprehensive IoT home automation solution using Raspberry Pi Pico W and Firebase Realtime Database for seamless remote control of electrical appliances through web and mobile interfaces.

## 🚀 Features

- **Remote Control**: Control multiple electrical loads via web interface
- **Real-time Sync**: Firebase Realtime Database ensures instant updates across all devices
- **WiFi Connectivity**: Wireless control through Raspberry Pi Pico W
- **Web Dashboard**: Responsive HTML/CSS/JavaScript interface for device management
- **Secure Authentication**: Firebase authentication for secure access
- **Mobile Responsive**: Works seamlessly on smartphones and tablets
- **Multiple Load Support**: Control up to 8-16 electrical appliances
- **Status Monitoring**: Real-time status updates of all connected devices

## 🛠️ Hardware Requirements

- Raspberry Pi Pico W
- Relay modules (4/8/16 channel)
- Electrical components (resistors, LEDs, breadboard)
- Power supply (5V/12V depending on relay requirements)
- Electrical appliances to control

## 📋 Software Requirements

- Arduino IDE or Thonny IDE
- Firebase account
- Modern web browser
- WiFi network connection

## 🔧 Installation & Setup

### 1. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Realtime Database in test mode
3. Copy your Firebase project URL and API key
4. Set up authentication (optional but recommended)

### 2. Hardware Configuration

// Pin definitions for relay control
#define RELAY1_PIN 2
#define RELAY2_PIN 3
#define RELAY3_PIN 4
#define RELAY4_PIN 5
// Add more pins as needed

### 3. WiFi & Firebase Configuration

Create a `secrets.h` file with your credentials:

// WiFi credentials
const char* WIFI_SSID = "Your_WiFi_SSID";
const char* WIFI_PASSWORD = "Your_WiFi_Password";

// Firebase credentials
const char* FIREBASE_HOST = "your-project-default-rtdb.firebaseio.com";
const char* FIREBASE_AUTH = "your-firebase-auth-token";

### 4. Upload Code to Pico W

1. Install required libraries in Arduino IDE:
   - WiFi library for Pico W
   - Firebase ESP32 Client library
2. Upload the main Arduino sketch to your Pico W
3. Monitor serial output for connection status

## 📁 Project Structure

```
Firebase_Pico_W/
├── arduino_code/
│   ├── main.ino              # Main Arduino sketch
│   ├── secrets.h             # WiFi and Firebase credentials
│   └── config.h              # Hardware pin configurations
├── web_interface/
│   ├── index.html            # Main web dashboard
│   ├── style.css             # Styling for web interface
│   ├── script.js             # JavaScript for Firebase integration
│   └── firebase-config.js    # Firebase configuration
├── docs/
│   ├── setup_guide.md        # Detailed setup instructions
│   └── troubleshooting.md    # Common issues and solutions
└── README.md                 # This file
```

## 🌐 Web Interface Features

- **Live Status Dashboard**: Real-time display of all device states
- **Toggle Controls**: Individual on/off switches for each appliance
- **Responsive Design**: Mobile-friendly interface
- **Firebase Integration**: Seamless sync with Realtime Database

## 🔌 Usage

1. **Power on** your Pico W and ensure WiFi connection
2. **Open web interface** in any browser
3. **Control devices** using the toggle switches
4. **Monitor status** in real-time across all connected devices

## 📊 Firebase Database Structure

```
{
  "home_automation": {
    "devices": {
      "relay1": {
        "status": true,
        "name": "Living Room Light",
        "timestamp": 1672531200
      },
      "relay2": {
        "status": false,
        "name": "Bedroom Fan",
        "timestamp": 1672531200
      }
    }
  }
}
```

## 🔒 Security Features

- Firebase Authentication integration
- Secure HTTPS connections
- User-specific device access control
- Real-time security rules implementation

## 🛡️ Troubleshooting

### Common Issues:

**WiFi Connection Problems:**
- Verify SSID and password in `secrets.h`
- Check WiFi signal strength
- Ensure 2.4GHz network compatibility

**Firebase Connection Issues:**
- Confirm Firebase URL and authentication token
- Check Firebase security rules
- Verify internet connectivity

**Device Control Problems:**
- Check relay wiring connections
- Verify pin configurations in code
- Monitor serial output for error messages

## 🚀 Future Enhancements

- [ ] Voice control integration (Alexa/Google Assistant)
- [ ] Scheduling and automation features
- [ ] Energy monitoring capabilities
- [ ] Mobile app development (Flutter)
- [ ] Sensor integration (temperature, humidity)
- [ ] MQTT protocol support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jernish** - Electronics & Communication Engineering Student
- GitHub: [@Jernish-FDO](https://github.com/Jernish-FDO)
- Interests: IoT Automation, Home Automation Systems

## 🙏 Acknowledgments

- Firebase team for the excellent Realtime Database
- Raspberry Pi Foundation for the Pico W
- Open-source community for libraries and inspiration

## 📞 Support

If you encounter any issues or have questions, please create an issue in this repository or reach out through GitHub.

---

**⭐ If this project helped you, please give it a star!**
```

This comprehensive README.md covers all aspects of your Firebase Pico W project based on your background in IoT automation and home control systems [1][2]. It includes proper documentation structure, setup instructions, troubleshooting guides, and future enhancement possibilities that align with your interests in IoT automation and Firebase integration [3][4][5].

Citations:
[1] Temperature and Humidity measurement with Firebase ... https://hackmd.io/@jj224jr/IoT
[2] 11yaman/home-iot: Home Automation IoT project https://github.com/11yaman/home-iot
[3] Raspberry Pi Pico W and GCP Firebase https://www.hcltech.com/blogs/raspberry-pi-pico-w-and-gcp-firebase
[4] ESP32 Data Logging to Firebase Realtime Database https://randomnerdtutorials.com/esp32-data-logging-firebase-realtime-database/
[5] Real-time Data Storage with Firebase and Node-RED https://randomnerdtutorials.com/real-time-storage-firebase-node-red/
[6] GitHub - Jernish-FDO/Firebse_Pico_W https://github.com/Jernish-FDO/Firebse_Pico_W
[7] A Template project for the Raspberry Pi pico W hardware ... https://github.com/pjaos/picow_upython_project_template
[8] rmaran6/RPiProject_Firebase: Raspberry Pi Firebase Project https://github.com/rmaran6/RPiProject_Firebase
[9] Issue with using micropython-firebase-firestore on ... https://stackoverflow.com/questions/77302815/issue-with-using-micropython-firebase-firestore-on-raspberry-pi-pico-w
[10] IoT Using Raspberry Pi and Firebase and Android https://www.pcbway.com/project/shareproject/IoT_Using_Raspberry_Pi_and_Firebase_and_Android.html
[11] IOT Projects - Home Automation using YouTube Live Chat https://www.youtube.com/watch?v=msLWYBwWYJo
[12] Firebase Realtime Database https://firebase.google.com/docs/database
[13] smart-home-automation https://github.com/topics/smart-home-automation
[14] Read and Write Data on the Web | Firebase Realtime Database https://firebase.google.com/docs/database/web/read-and-write
[15] Connecting a Raspberry Pi Pico to a Firebase Realtime ... https://www.youtube.com/watch?v=emu1KlFalKI
[16] shahidul034/Home-Automation-using-IoT https://github.com/shahidul034/Home-Automation-using-IoT
[17] ESP32: Getting Started with Firebase (Realtime Database) https://randomnerdtutorials.com/esp32-firebase-realtime-database/
[18] Blog Archive Raspberry Pi Pico and Pico W Project Templates https://blog.mark-stevens.co.uk/2023/09/raspberry-pi-pico-and-pico-w-project-templates/
[19] Top 10 GitHub Projects for IoT Smart Home Automation https://moldstud.com/articles/p-top-10-github-repositories-for-iot-smart-home-development-enhance-your-home-automation-projects
[20] mobizt/FirebaseClient: 🔥Fast and reliable async Firebase ... https://github.com/mobizt/FirebaseClient
[21] iot-project · GitHub Topics https://github.com/topics/iot-project
