import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native'



export default function BarcodeReader() {
    const [facing, setFacing] = useState<CameraType>('back')
    const [permission, requestPermission] = useCameraPermissions()
    const [barcode, setBarcode] = useState<String>('')


    if (!permission) {
        return <View />
    }


    if (!permission.granted) {
        return (
            <View>
                <Text>Permission required to use the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            {barcode !== '' ? (
                <View style={styles.buttonContainer}>
                    <Text style={styles.text}>Barcode: {barcode}</Text>
                    <Button onPress={() => setBarcode('')} title="Scan Again" />
                </View>
            ) : (
                <CameraView
                    facing={facing}
                    style={styles.camera}
                    barcodeScannerSettings={{
                        barcodeTypes: ["ean13", "ean8", "qr",],
                    }}
                    onBarcodeScanned={(BarcodeScanningResult) => setBarcode(BarcodeScanningResult.data)}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#505050'
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'column',
        backgroundColor: '#12121250',
        width: '90%',
        paddingHorizontal: 64,
        alignSelf: 'center',
        padding: 8,

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'yellow',
    },
})