import { StyleSheet } from 'react-native';

export const authStyle = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
    paddingTop: 100,
  },
  loginLink: {
    fontSize: 18,
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
    paddingBottom: 40,
  },
  signupLink: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
    paddingBottom: 120,
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
      marginTop: 16
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
