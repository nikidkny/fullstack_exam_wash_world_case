import { StyleSheet } from 'react-native';

export const authStyle = StyleSheet.create({
   container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
    paddingTop: 100,
    zIndex: 0, 
  },
  loginLink: {
    fontSize: 18,
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  signupLink: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputField: {
    fontSize: 16,
    paddingVertical: 12
  },
  formControl: {
    width: '90%',
    zIndex: 10, // Ensure dropdowns are rendered above other components
    position: 'relative', // Needed for stacking context
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
