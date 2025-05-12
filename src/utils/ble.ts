import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { encode as btoa } from "base-64";

const SERVICE_UUID = '0000FFE0-0000-1000-8000-00805F9B34FB';
const CHARACTERISTIC_UUID = '0000FFE1-0000-1000-8000-00805F9B34FB';

interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    onDeviceFound(callback: (device: string) => void): void;
    allDevices: Device[];
    connectToDevice(device: Device): Promise<void>;
    connectedDevice : Device | null;
    disconnectFromDevice(): void;
    startClockSync(device: Device): void;
    stopClockSync(): void;
}

function useBLE(): BluetoothLowEnergyApi {
    const [callbacks, setCallbacks] = useState<((device: string) => void)[]>([]);

    const bleManager = useMemo(() => new BleManager(), []);

    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

    let clockIntervalId: NodeJS.Timeout | null = null;

    const requestAndroid31Permissions = async () => {
        const bluetoothScanPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Bluetooth Scan Permission",
                message: "This app needs access to your Bluetooth to scan for devices.",
                buttonPositive: "OK",
            }
        );

        const bluetoothConnectPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Bluetooth Connect Permission",
                message: "This app needs access to your Bluetooth to connect to devices.",
                buttonPositive: "OK",
            }
        );
        
        const bluetoothFineLocationPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Fine Location Permission",
                message: "This app needs access to fine location.",
                buttonPositive: "OK",
            }
        );
        
        return (
            bluetoothScanPermissions === PermissionsAndroid.RESULTS.GRANTED &&
            bluetoothConnectPermissions === PermissionsAndroid.RESULTS.GRANTED &&
            bluetoothFineLocationPermissions === PermissionsAndroid.RESULTS.GRANTED
        );
    }

    const requestPermissions = async () => {
        if (Platform.OS === "android" && Platform.Version < 31) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "This app needs access to your location.",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else if (Platform.OS === "android" && Platform.Version >= 31) {
            return await requestAndroid31Permissions(); 
        }

        return true;
    };

    const isDuplicateDevice = (devices: Device[], nextDevice: Device): boolean => {
        return devices.findIndex((device) => nextDevice.id === device.id) > -1;
    }

    const scanForPeripherals = () => {
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error("Error scanning for devices:", error);
                return;
            }

            if (device && device.name?.includes('Placar Inocoop')) {
                setAllDevices((prevState) => {
                    if (!isDuplicateDevice(prevState, device)) {
                        return [...prevState, device];
                    }
                    return prevState;
                });
                callbacks.forEach((callback) => callback(device.name || "Unknown Device"));
            }
        });

        setTimeout(() => {
            bleManager.stopDeviceScan();
            console.log("Scan stopped after timeout");
        }, 10000);
    }

    const onDeviceFound = (callback: (device: string) => void) => {
        setCallbacks((prev) => [...prev, callback]);
      };

    const connectToDevice = async (device: Device) => {
        try {
            const connected = await bleManager.isDeviceConnected(device.id);
            if (!connected) {
                const deviceConnection = await bleManager.connectToDevice(device.id);
                setConnectedDevice(deviceConnection);
                await deviceConnection.discoverAllServicesAndCharacteristics();
            }
            bleManager.stopDeviceScan();
        } catch (error) {
            console.error("Error connecting to device:", error);
        }
    }

    const disconnectFromDevice = async () => {
        if (connectedDevice) {
            await bleManager.cancelDeviceConnection(connectedDevice.id);
            setConnectedDevice(null);
        }
    }

    const buildFullClockString = (
        mode: 'C',
        score1: number,
        score2: number,
        set1: number,
        set2: number
    ): string => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${mode}${hours}:${minutes}${score1}${score2}${set1}${set2}`;
    };
    
    const writeClockInfo = async (device: Device) => {
        if (connectedDevice) {
            const timeString = buildFullClockString('C', 0, 0, 0, 0);
    
            const base64Data = btoa(timeString);
    
            await device.writeCharacteristicWithResponseForService(
                SERVICE_UUID,
                CHARACTERISTIC_UUID,
                base64Data
            );
        }
    };

    const startClockSync = (device: Device) => {
        if (clockIntervalId) return;

        clockIntervalId = setInterval(() => {
            writeClockInfo(device).catch((error) => {
                console.error("Erro ao enviar hora:", error);
                stopClockSync();
            });
        }, 100);
    };

    const stopClockSync = () => {
        if (clockIntervalId) {
            clearInterval(clockIntervalId);
            clockIntervalId = null;
        }
    };
    return {
        requestPermissions,
        scanForPeripherals,
        onDeviceFound,
        allDevices,
        connectToDevice,
        connectedDevice,
        disconnectFromDevice,
        startClockSync,
        stopClockSync,
    };
}

export default useBLE;