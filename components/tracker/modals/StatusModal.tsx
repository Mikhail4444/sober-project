import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { DayStatus } from '../WeekProgress';

interface StatusModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (status: DayStatus) => void;
}

const statusColors = {
  clean: '#2ECC71',
  controlled: '#F39C12',
  failed: '#E74C3C'
};

export const StatusModal: React.FC<StatusModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Какой у вас был день?</Text>
          
          <TouchableOpacity 
            style={[styles.modalButton, { backgroundColor: statusColors.controlled }]}
            onPress={() => onSelect('controlled')}
          >
            <Text style={styles.buttonText}>Контролируемое употребление</Text>
            <Text style={styles.modalSubtext}>1 бокал вина/пива</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.modalButton, { backgroundColor: statusColors.failed }]}
            onPress={() => onSelect('failed')}
          >
            <Text style={styles.buttonText}>Не контролировал ситуацию</Text>
            <Text style={styles.modalSubtext}>Много выпил/употребил</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
  modalSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 5,
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
});