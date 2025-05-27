import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { authStyle } from './authStyle';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { checkUserEmail } from './authSlice';
import { CreateUserDto } from './users/createUserDto';
import { Dropdown } from 'react-native-element-dropdown';
import { useSignup } from './users/useSignup';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigationType';
import { useMembershipPlans } from './membershipPlans/useMembershipPlans';

export default function SignupScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Signup'>>();
  const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [password, setPassword] = useState('123456A');
  const [repeatPassword, setRepeatPassword] = useState('123456A');
  const [phoneNumber, setPhoneNumber] = useState("12 12 12 12");
  const [plateNumber, setPlateNumber] = useState('');
  const [membershipPlanId, setMembershipPlanId] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { membershipPlans } = useMembershipPlans();
  const { signup: signupUser } = useSignup();


  const formatDanishPhone = (input: string) => {
    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, '').slice(0, 8);

    // Format as "12 34 56 78"
    return digitsOnly.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
  };


  const handleEmailNext = async () => {
    setErrors({});

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    try {
      const resultAction = await dispatch(checkUserEmail(email));

      if (checkUserEmail.rejected.match(resultAction)) {
        const error = resultAction.payload as string;
        setErrors({ email: error });
        return;
      }

      // If email is valid and not in use, proceed to the next step
      setStep(2);
    } catch (err) {
      setErrors({ email: "Something went wrong. Please try again." });
      console.error(err);
    }
  };

  const handlePersonalInfoNext = async () => {
    setErrors({});
    const newErrors: Record<string, string> = {};

    // First name validation
    if (!firstName.trim() || firstName.trim().length < 2 || /\d/.test(firstName.trim())) {
      newErrors.firstName = "First name must be at least 2 characters and contain no numbers.";
    }

    // Last name validation
    if (!lastName.trim() || lastName.trim().length < 2 || /\d/.test(lastName.trim())) {
      newErrors.lastName = "Last name must be at least 2 characters and contain no numbers.";
    }

    // Phone number validation
    if (!phoneNumber.trim() || phoneNumber.length != 11) {
      newErrors.phoneNumber = "Must be a valid phone number.";
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    if (!password.trim() || !passwordRegex.test(password.trim())) {
      newErrors.password = "Password must be at least 6 characters and include one uppercase letter.";
    }

    // Repeat password match
    if (password !== repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(errors);
      return;
    }

    // If all validation passes
    setStep(3);
  };

  const handleLicensePlate = async () => {
    setErrors({});
    const newErrors: Record<string, string> = {};

    const trimmedPlate = plateNumber.trim().toUpperCase();
    const licensePlateRegex = /^[A-Z0-9]{8}$/;

    if (!trimmedPlate) {
      newErrors.licensePlate = "License plate cannot be empty.";
    } else if (!licensePlateRegex.test(trimmedPlate)) {
      newErrors.licensePlate = "License plate must be 2–8 characters, uppercase letters and numbers only.";
    }

    if (membershipPlanId === 0) {
      newErrors.membershipPlanId = "Please choose Membership";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      handleSignup()
    }

  };

  const handleSignup = async () => {

    const phoneNumberNoSpaces = phoneNumber.replace(/\s+/g, '');
    const phone_number = Number(phoneNumberNoSpaces)

    const newUser: CreateUserDto = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password,
      phone_number,
      plate_number: plateNumber,
      membership_plan_id: membershipPlanId
    };

    const result = await signupUser(newUser);
    if (!result.success) {
      if (result.error?.includes("License Plate"))
        setErrors({ licensePlate: result.error! })
      return;
    }
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setRepeatPassword('');
    setPhoneNumber('');
    setPlateNumber('');
    setMembershipPlanId(0);

    setTimeout(() => {
      navigation.goBack();
    }, 500); // 1.5 seconds is enough

  };


  return (
    <ScrollView
      contentContainerStyle={authStyle.container}
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>Signup</Text>

      {/*Back Button*/}
      {step > 1 && (
        <TouchableOpacity
          onPress={() => setStep(step - 1)}
          style={{ alignSelf: 'flex-start', marginLeft: 20 }}
        >
          <Text style={{ color: 'blue' }}>← Back</Text>
        </TouchableOpacity>
      )}

      {step === 1 && (
        <>
          <FormControl style={authStyle.formControl} isInvalid={true}>
            <FormControlLabel>
              <FormControlLabelText style={{ fontSize: 18 }}>Email</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="xl" style={[authStyle.input, !!errors.email && { borderColor: 'red' }]}>
              <InputField
                placeholder="you@example.com"
                value={email}
                onChangeText={(text) => setEmail(text.trim())}
                keyboardType="default"
                autoCapitalize="none"
                style={authStyle.inputField}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
                {errors.email}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Button
            size="xl"
            variant="solid"
            action="primary"
            onPress={handleEmailNext}
            accessibilityLabel="Next Button"
            style={{
              width: '90%',
              paddingVertical: 14,
              borderRadius: 8,
              backgroundColor: '#1D4ED8',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', textAlign: 'center' }}>
              Next
            </Text>
          </Button>

        </>
      )}

      {step === 2 && (
        <>

          {/* first_name Input */}
          <FormControl style={authStyle.formControl} isInvalid={true}>
            <FormControlLabel>
              <FormControlLabelText style={{ fontSize: 18 }}>First Name</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="xl" style={[authStyle.input, !!errors.firstName && { borderColor: 'red' }]}>
              <InputField
                placeholder="John"
                value={firstName}
                onChangeText={(text) => setFirstName(text.trim())}
                autoCapitalize="words"
                style={authStyle.inputField}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
                {errors.firstName}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* last_name Input */}
          <FormControl style={authStyle.formControl} isInvalid={true}>
            <FormControlLabel>
              <FormControlLabelText style={{ fontSize: 18 }}>Last Name</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="xl" style={[authStyle.input, !!errors.lastName && { borderColor: 'red' }]}>
              <InputField
                placeholder="Doe"
                value={lastName}
                onChangeText={(text) => setLastName(text.trim())}
                autoCapitalize="words"
                style={authStyle.inputField}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
                {errors.lastName}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>


          {/* phone_number Input */}
          <FormControl style={authStyle.formControl} isInvalid={true}>
            <FormControlLabel>
              <FormControlLabelText style={{ fontSize: 18 }}>Phone Number</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="xl" style={[authStyle.input, !!errors.phoneNumber && { borderColor: 'red' }]}>
              <InputField
                placeholder="28 28 28 28"
                value={phoneNumber}
                onChangeText={(text) => {
                  const formatted = formatDanishPhone(text);
                  setPhoneNumber(formatted);
                }}
                keyboardType="numeric"
                inputMode='numeric'
                autoCapitalize="none"
                style={authStyle.inputField}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
                {errors.phoneNumber}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Password Input */}
          <FormControl style={authStyle.formControl} isInvalid={true}>
            <FormControlLabel>
              <FormControlLabelText style={{ fontSize: 18 }}>Password</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="xl" style={[authStyle.input, !!errors.password && { borderColor: 'red' }]}>
              <InputField
                placeholder="••••••••"
                value={password}
                onChangeText={(text) => setPassword(text.trim())}
                secureTextEntry
                style={authStyle.inputField}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
                {errors.password}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Repeat Password Input */}
          <FormControl style={authStyle.formControl} isInvalid={true}>
            <FormControlLabel>
              <FormControlLabelText style={{ fontSize: 18 }}>Repeat Password</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="xl" style={[authStyle.input, !!errors.repeatPassword && { borderColor: 'red' }]}>
              <InputField
                placeholder="••••••••"
                value={repeatPassword}
                onChangeText={(text) => setRepeatPassword(text.trim())}
                secureTextEntry
                style={authStyle.inputField}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
                {errors.repeatPassword}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Button
            size="xl"
            variant="solid"
            action="primary"
            onPress={handlePersonalInfoNext}
            accessibilityLabel="Singup Button"
            style={{
              width: '90%',
              paddingVertical: 14,
              borderRadius: 8,
              backgroundColor: '#1D4ED8',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', textAlign: 'center' }}>
              Next
            </Text>
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <FormControl style={authStyle.formControl} isInvalid={true}>
            <FormControlLabel>
              <FormControlLabelText style={{ fontSize: 18 }}>License Plate</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="xl" style={[authStyle.input, !!errors.licensePlate && { borderColor: 'red' }]}>
              <InputField
                placeholder="ABC123"
                value={plateNumber}
                onChangeText={(text) => {
                  const uppercased = text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
                  setPlateNumber(uppercased);
                }}
                autoCapitalize="characters"
                style={authStyle.inputField}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
                {errors.licensePlate}
              </FormControlErrorText>
            </FormControlError>


            <Text style={{ fontSize: 18 }} >Membership</Text>
            {Array.isArray(membershipPlans) && (

              <Dropdown
                data={membershipPlans.map((plan) => ({
                  label: plan.name,
                  value: plan.id.toString(),
                }))}
                labelField="label"
                valueField="value"
                placeholder="Select option"
                value={membershipPlanId?.toString()}
                onChange={(item) => setMembershipPlanId(Number(item.value))}
              />

            )
            }
            <FormControlError>
              <FormControlErrorText style={{ color: 'red', marginTop: 4 }}>
                {errors.membershipPlanId}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          {/* Signup Button */}
          <Button
            size="xl"
            variant="solid"
            action="primary"
            onPress={handleLicensePlate}
            accessibilityLabel="Singup Button"
            style={{
              width: '90%',
              paddingVertical: 14,
              borderRadius: 8,
              backgroundColor: '#1D4ED8',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', textAlign: 'center' }}>
              Signup
            </Text>
          </Button>

        </>
      )
      }

      {/* login Link */}
      {
        step <= 1 && (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingTop: 20 }}>
              <Text style={authStyle.signupLink}>login with existing account</Text>
            </TouchableOpacity>
          </>
        )
      }

    </ScrollView >

  );
}
