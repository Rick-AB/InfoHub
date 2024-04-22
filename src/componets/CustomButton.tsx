import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

interface CustomButtonProps {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
}

const CustomButton = ({text, disabled, onPress}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 8,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default CustomButton;
