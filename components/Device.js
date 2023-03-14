import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Switch} from 'react-native';

export default function Device({props}) {
    const [isEnabled, setIsEnabled] = useState(true);
    return (
        <View style={[styles.container, isEnabled ? {backgroundColor: '#5AC2DA'} :  {backgroundColor: 'white'}]}>
            {props.icon}
            <View>
                <Text style = {{fontWeight: 'bold'}}>{props.name}</Text>
                <Text style = {{fontSize: 8}}>{props.amount} thiết bị</Text>
            </View>
            <View style={styles.button}>
                <Text style = {{fontWeight: 'bold'}}>{isEnabled ? "On" : "Off"}</Text>
                <Switch
                trackColor={{false: '#grey', true: 'black'}}
                onValueChange={() => setIsEnabled(previousState => !previousState)}
                value={isEnabled}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: '20',
    padding: '6%',
    gap: '20%',
    width: '48%',
    backgroundColor: 'white',
  },
  text: {
    active: {
        color: 'white',
    }
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
