import React from 'react';
import {View, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Colors from '../constants/Colors';
import * as Icons from 'react-native-heroicons/outline';

interface ProfileImageViewProps {
  imageUri: string | null;
  onImageChange?: (uri: string) => void;
}

const ProfileImageView = ({
  imageUri,
  onImageChange,
}: ProfileImageViewProps): JSX.Element => {
  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        if (onImageChange != null) {
          onImageChange(imageUri);
        }
      }
    });
  };

  return (
    <TouchableOpacity onPress={openImagePicker}>
      <View style={styles.profileImageContainer}>
        {imageUri ? (
          <Image
            resizeMode={'cover'}
            source={{uri: imageUri}}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Icons.UserIcon size={40} color={Colors.black} />
          </View>
        )}
        {onImageChange && (
          <View style={styles.editIconContainer}>
            <Icons.PencilIcon color={Colors.black} size={12} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
    width: 80,
    height: 80,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderRadius: 40,
    justifyContent: 'center',
    alignContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 40,
    overflow: 'hidden',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary_light,
    borderRadius: 100,
    padding: 2,
    width: 24,
    height: 24,
  },
});

export default ProfileImageView;
