import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default function Question({ route, navigation }) {
  const { data, index, results } = route.params;
  const question = data[index];
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const handleNext = () => {
    let isCorrect = false;
    if (Array.isArray(question.correct)) {
      isCorrect =
        selectedIndexes.length === question.correct.length &&
        selectedIndexes.every(i => question.correct.includes(i));
    } else {
      isCorrect = selectedIndexes[0] === question.correct;
    }

    const result = {
      ...question,
      userAnswer: selectedIndexes,
      isCorrect
    };

    const updatedResults = [...results, result];

    if (index + 1 < data.length) {
      navigation.push('Question', {
        data,
        index: index + 1,
        results: updatedResults
      });
    } else {
      navigation.replace('Summary', { data: updatedResults });
    }
  };

  const handleSelect = (selected) => {
    if (question.type === 'multiple-answer') {
      setSelectedIndexes(prev =>
        prev.includes(selected)
          ? prev.filter(i => i !== selected)
          : [...prev, selected]
      );
    } else {
      setSelectedIndexes([selected]);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>{question.prompt}</Text>
      <ButtonGroup
        vertical
        buttons={question.choices}
        selectedIndexes={question.type === 'multiple-answer' ? selectedIndexes : undefined}
        selectedIndex={question.type !== 'multiple-answer' ? selectedIndexes[0] : undefined}
        onPress={handleSelect}
        testID="choices"
        containerStyle={{ marginBottom: 20 }}
      />
      <Button
        title="Next"
        testID="next-question"
        onPress={handleNext}
        disabled={selectedIndexes.length === 0}
      />
    </View>
  );
}
