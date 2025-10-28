import { Box } from "@material-ui/core";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { withStyles } from "@material-ui/core/styles";
import { compose } from 'redux';

const styles = (theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    display: 'flex',
  },
});

function QuizPage({ classes }) {
  return (
    <Box className={classes.container}>
      <ProgressBar />
      <Box className={classes.content}>
        <QuestionCard />
      </Box>
    </Box>
  );
}
export default compose(
  withStyles(styles)
)(QuizPage);
