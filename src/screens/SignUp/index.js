import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AsyncStorage } from 'react-native' 
import { UserContext } from '../../contexts/UserContext'
import { 
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold
} from './styles'

import BarberLogo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'

import SignInput from '../../components/SignInput'

import Api from '../../Api'

const SignUp = () => { 
  const { dispatch: userDispatch } = useContext(UserContext)
  const navigation = useNavigation()
  const [nameField, setNameField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')

  const handleSignClick = async () => {
    if (nameField != '' && emailField != '' && passwordField != '') {
      let json = await Api.signUp(nameField, emailField, passwordField)
      if (json.token) {
        await AsyncStorage.setItem('token', json.token)
        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: json.data.avatar
          }
        })
        navigation.reset({
          routes: [{
            name: 'MainTab'
          }]
        })
      } else {
        alert('Erro: ' + json.error)
      }
    } else {
      alert('Preenche os campos')
    } 
  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: 'SignIn' }]
    })
  }

  return (
    <Container>
      <BarberLogo 
        width="100%"
        height="160" 
      />
      <InputArea>
      <SignInput 
          IconSvg={PersonIcon} 
          placeholder="Digite seu nome"
          value={nameField}
          onChangeText={(t) => setNameField(t)}
        />
        <SignInput 
          IconSvg={EmailIcon} 
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={(t) => setEmailField(t)}
        />
        <SignInput 
          IconSvg={LockIcon} 
          placeholder="Digite sua senha"
          value={passwordField}
          onChangeText={(t) => setPasswordField(t)}
          password={true}
        />
        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>
      <SignMessageButton onPress={handleMessageButtonClick} >
        <SignMessageButtonText>
          J?? possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>
          Fa??a Login
        </SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  )
}

export default SignUp