import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import MainComponent from './components/mainComponents';
import { useFormik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import RNFetchBlob from 'rn-fetch-blob';


export default function App() {


  return (
    <>
      <MainComponent />

      {/* ... */}
      <Toast />
    </>

  );
}