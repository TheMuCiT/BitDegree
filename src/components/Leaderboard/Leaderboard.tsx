import {View, Text, FlatList} from 'react-native';
import React from 'react';
import styles from './leaderboard.Styles';

interface LeaderboardProps {
  topScores: number[];
  newScore?: number;
  numberOfItem?: number;
}

const Leaderboard = ({
  topScores,
  newScore,
  numberOfItem = 10,
}: LeaderboardProps) => {
  const renderItem = ({item, index}: {item: number; index: number}) => (
    <View style={styles.entryContainer}>
      <Text style={styles.entrySide}> {index + 1}.</Text>
      <Text style={[styles.entry, newScore === item && styles.entryHighlight]}>
        {' '}
        Score: {item.toFixed(0)}
      </Text>
      <Text style={styles.entrySide}> </Text>
    </View>
  );
  return (
    <FlatList
      data={topScores.slice(0, numberOfItem)}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Leaderboard;
