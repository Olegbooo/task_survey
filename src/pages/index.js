import { Box } from "@material-ui/core";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

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
}));

export default function QuizPage() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <ProgressBar />
      <Box className={classes.content}>
        <QuestionCard />
      </Box>
    </Box>
  );
}