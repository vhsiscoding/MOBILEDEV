import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useExpenses } from '@/src/context/ExpensesContext';

export default function AddExpenseScreen() {
  const { addExpense } = useExpenses();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    const value = Number(amount.replace(',', '.').trim());

    if (!description.trim()) {
      setError('A descrição não pode ficar vazia.');
      return;
    }

    if (Number.isNaN(value) || value <= 0) {
      setError('O valor precisa ser um número maior que zero.');
      return;
    }

    addExpense({
      id: String(Date.now()),
      description: description.trim(),
      amount: value,
    });

    setDescription('');
    setAmount('');
    setError('');
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.formContainer}>
        <Text style={styles.title}>Novo gasto</Text>

        <Text style={styles.inputLabel}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Almoço"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.inputLabel}>Valor</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 45.90"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },
  inputLabel: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorText: {
    marginTop: 12,
    color: '#b91c1c',
    fontSize: 15,
  },
  saveButton: {
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: '#16a34a',
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});