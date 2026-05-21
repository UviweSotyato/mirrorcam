import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need permission to use your camera
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <CameraView
        style={styles.camera}
        facing="back"
      />

      <View style={styles.overlay}>
        <Text style={styles.logo}>MirrorCam</Text>

        <TouchableOpacity style={styles.streamButton}>
          <Text style={styles.streamText}>START STREAM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ORANGE = "#ff7a00";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },

  logo: {
    color: ORANGE,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  streamButton: {
    backgroundColor: ORANGE,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 50,
  },

  streamText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },

  permissionText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: ORANGE,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 40,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});