import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import ProfileImageView from '../componets/ProfileImageView';
import CustomTextField from '../componets/CustomInputField';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {ProfileData} from '../types/ProfileData';
import * as yup from 'yup';
import {Formik} from 'formik';
import CustomButton from '../componets/CustomButton';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProfileDetails'
>;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

yup.addMethod(yup.string, 'integer', function () {
  return this.matches(/^\d+$/, 'The field should have digits only');
});

const profileValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, 'Enter at least two characters')
    .required('Please enter your full name'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Please enter your email address'),
  age: yup
    .string()
    .test(
      'eligible',
      'Must be 16 years and above',
      val => parseInt(val || '0') >= 16,
    )
    .required('Please enter your age'),
});

const ProfileScreen = ({navigation}: ProfileScreenProps): JSX.Element => {
  const [profileImage, setProfileImage] = useState<string>('');

  const handleImageChange = (uri: string): void => {
    setProfileImage(uri);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Formik
          validateOnChange={false}
          validationSchema={profileValidationSchema}
          initialValues={{fullName: '', email: '', age: ''}}
          onSubmit={values => {
            const profileData: ProfileData = {
              fullName: values.fullName,
              email: values.email,
              age: parseInt(values.age),
              profileImage: profileImage,
            };
            navigation.navigate('ProfileDetails', {profileData});
          }}>
          {({handleChange, handleSubmit, values, errors}) => (
            <View style={styles.form}>
              <ProfileImageView
                imageUri={profileImage}
                onImageChange={handleImageChange}
              />

              <CustomTextField
                style={styles.textField}
                onChangeText={handleChange('fullName')}
                value={values.fullName}
                placeholder={Strings.fullNameLabel}
                error={errors.fullName}
              />
              <CustomTextField
                style={styles.textField}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder={Strings.emailLabel}
                error={errors.email}
                keyboardType="email-address"
              />
              <CustomTextField
                style={styles.textField}
                onChangeText={handleChange('age')}
                value={values.age}
                placeholder={Strings.ageLabel}
                error={errors.age}
                keyboardType="numeric"
              />

              <CustomButton text={Strings.submitLabel} onPress={handleSubmit} />
              <View style={{flex: 1}} />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light_gray,
  },
  button: {
    borderRadius: 20,
  },
  form: {
    flex: 1,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 32,
  },
  textField: {
    width: '100%',
    marginBottom: 24,
  },
});

export default ProfileScreen;
