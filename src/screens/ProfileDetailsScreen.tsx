import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ProfileImageView from '../componets/ProfileImageView';
import {RootStackParamList} from '../../App';
import {RouteProp} from '@react-navigation/native';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';

type ProfileDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProfileDetails'
>;

interface ProfileDetailsScreenProps {
  route: ProfileDetailsScreenRouteProp;
}

interface DetailItemProps {
  label: string;
  value: string;
}

const ProfileDetailsScreen = ({
  route,
}: ProfileDetailsScreenProps): JSX.Element => {
  const {profileData} = route.params;
  const firstName = profileData.fullName.split(' ')[0];

  const DetailItem = ({label, value}: DetailItemProps): JSX.Element => {
    return (
      <View style={styles.detailItem}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {firstName}!</Text>
        <ProfileImageView imageUri={profileData.profileImage} />
      </View>
      <View style={styles.detailsContainer}>
        <DetailItem
          label={Strings.fullNameLabel}
          value={profileData.fullName}
        />
        <DetailItem label={Strings.emailLabel} value={profileData.email} />
        <DetailItem
          label={Strings.ageLabel}
          value={`${profileData.age} years`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light_gray,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 16,
    borderColor: Colors.grey,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
  },
  detailItem: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    marginEnd: 8,
  },
  labelText: {
    fontSize: 12,
    color: 'gray',
  },
  valueText: {
    fontSize: 14,
    color: Colors.black,
  },
});

export default ProfileDetailsScreen;
