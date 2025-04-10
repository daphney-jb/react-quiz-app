import React from 'react';
import { View, Text } from 'react-native';

export default function Summary({ route }) {
  const { data } = route.params;
  const score = data.filter(q => q.isCorrect).length;

  return (
    <View style={{ padding: 20 }}>
      <Text testID="total" style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Total Score: {score}/{data.length}
      </Text>

      {data.map((q, i) => {
        // Convert correct to array if it's not already
        const correctAnswers = Array.isArray(q.correct) ? q.correct : [q.correct];

        return (
          <View key={i} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>{q.prompt}</Text>
            {q.choices.map((choice, idx) => {
              const isCorrect = correctAnswers.includes(idx);
              const isIncorrectSelection = q.userAnswer.includes(idx) && !isCorrect;

              return (
                <Text
                  key={idx}
                  style={{
                    color: isCorrect ? 'green' : isIncorrectSelection ? 'red' : 'black',
                    fontWeight: isCorrect ? 'bold' : 'normal',
                    textDecorationLine: isIncorrectSelection ? 'line-through' : 'none'
                  }}
                >
                  {choice}
                </Text>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
