import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import StyleLoginEng from './StyleLoginEng'

export default function LoginEngenheiro({ navigation }) {
  const [tipo, setTipo] = useState(''); // 'engenheiro' | 'sindico'

  const handleSubmit = () => {
    if (!email || !senha) {

      return
    } 
    onLogin(LogEngenheiro)
  }

  const {
    email,
    setEmail,
    senha,
    setSenha,
  } = CadastroEngenheiro(navigation);

  return (
    <View style={StyleLoginEng.root}>
      <View style={StyleLoginEng.card}>
        <Text style={StyleLoginEng.title}>Daily Inspection
        </Text>
        <Text style={StyleLoginEng.subtitle}>Acesse aqui</Text>

        <View style={StyleLoginEng.tabs}>
          <TouchableOpacity
            style={[StyleLoginEng.tab, tipo === 'engenheiro' && StyleLoginEng.tabActive]}
            onPress={() => setTipo('engenheiro')}
          >
            <Text style={[StyleLoginEng.tabText, tipo === 'engenheiro' && StyleLoginEng.tabTextActive]}>
              Engenheiro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[StyleLoginEng.tab, tipo === 'sindico' && StyleLoginEng.tabActive]}
            onPress={() => setTipo('sindico')}
          >
            <Text style={[StyleLoginEng.tabText, tipo === 'sindico' && StyleLoginEng.tabTextActive]}>
              Síndico
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={StyleLoginEng.label}>Nome</Text>
        <TextInput
          style={StyleLoginEng.input}
          placeholder="Seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={StyleLoginEng.label}>E-mail</Text>
        <TextInput
          style={StyleLoginEng.input}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={StylesLoginEng.label}>Senha</Text>
        <TextInput
          style={StylesLoginEng.input}
          placeholder="Sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TouchableOpacity style={StyleLoginEng.button} onPress={handleSubmit}>
          <Text style={StyleLoginEng.buttonText}>
            Entrar como {tipo === 'engenheiro' ? 'Engenheiro' : 'Síndico'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};