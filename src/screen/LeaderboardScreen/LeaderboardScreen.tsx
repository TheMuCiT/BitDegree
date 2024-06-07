import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './leaderboardScreen.Styles';
import Button from '../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {LeaderboardNavigationProp} from '../../shared/Constants/navigation';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LeaderboardScreen = () => {
  const navigation = useNavigation<LeaderboardNavigationProp>();
  const [topScores, setTopScores] = useState<number[]>([]);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const existingScores = await AsyncStorage.getItem('scores');
        const scores = existingScores ? JSON.parse(existingScores) : [];
        const sortedScores = scores.sort((a: number, b: number) => b - a);
        setTopScores(sortedScores.slice(0, 30));
      } catch (error) {
        console.error('Failed to fetch scores', error);
      }
    };

    fetchTopScores();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.pageContainer}>
      <View style={{marginTop: insets.top}} />
      <View style={styles.header}>
        <Button
          onPress={handleBack}
          title="Back"
          primary={false}
          style={styles.backButton}
        />
        <Text style={styles.title}>Leaderboard</Text>
      </View>
      <View style={styles.mainContainer}>
        {topScores.length > 0 ? (
          <View style={styles.leaderboardList}>
            <Leaderboard topScores={topScores} numberOfItem={30} />
          </View>
        ) : (
          <Text style={styles.noScores}>No scores yet.</Text>
        )}
      </View>
    </View>
  );
};

export default LeaderboardScreen;
