import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FinancialData } from '../interfaces/FinancialData';

interface DataItemModalProps {
  data: FinancialData;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const DataItemModal: React.FC<DataItemModalProps> = ({ data, onClose, onDelete, onEdit }) => {
    const type = data.type==="expense"?"EXPENSE":"INCOME"
    const typeColor = data.type==="expense"?"#912F40" : "#5576a3"
  return (
    <Modal visible={true} animationType="slide">

        <View style={styles.modalView}>
          <Text style={styles.heading}>DETAILS</Text>
          <View style={styles.dataContainer}>
          <View style={styles.box}>
              <Text style={styles.label}>Type               :</Text>
              <Text style={[styles.text,{color:typeColor,fontWeight:"bold"}]}>{type}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Amount         :</Text>
              <Text style={styles.text}>Rs. {data.amount}/-</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Date               :</Text>
              <Text style={styles.text}>{new Date(data.date).toDateString()}</Text>
            </View>
            
            <View style={styles.box}>
              <Text style={styles.label}>Category       :</Text>
              <Text style={styles.text}>{data.category}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.label}>Description  :</Text>
              <Text style={styles.text}>{data.description}</Text>
            </View>
            
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onEdit}>
              <MaterialIcons name="edit" size={24} color="#FFFFFA" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onDelete}>
              <MaterialIcons name="delete" size={24} color="#FFFFFA" />
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#FFFFFA" />
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
      modalView: {
        backgroundColor: "#FFFFFA",
        flex:1,
        alignItems: "center",
        justifyContent:"center",
        width: "100%",
      },
      heading: {
        color: '#080705',
        fontWeight: 'bold',
        fontSize: 20,
        
      },
      dataContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        width: "90%",
        justifyContent:"center",
marginVertical:30,
backgroundColor:"#f0f0f0"
      },
      box: {
        flexDirection: "row",
        marginVertical: 20,
      },
      label: {
        fontWeight: "bold",
        marginRight: 10,
        color: "#080705",
        fontSize:16,
        width:"30%"
      },
      text: {
        flex: 1,
        fontSize:16,
        width:"70%",
        borderColor:"#702632",
        borderWidth:1,
        padding:5,
        backgroundColor:"#FFF",
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      },
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#702632',
        margin:10,
        width:"30%"
      },
      buttonText: {
        marginLeft: 5,
        color: '#FFFFFA',
        fontWeight: 'bold',
        fontSize: 16,
        
      },

    
});

export default DataItemModal;
