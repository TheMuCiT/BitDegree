import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#6003A0',
    padding: 20,
  },
  backButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textItem: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    maxWidth: 250,
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 28,
    marginBottom: 20,
    color: '#fff',
  },
  countdown: {
    fontSize: 40,
    color: '#fff',
  },
});

export default styles;
