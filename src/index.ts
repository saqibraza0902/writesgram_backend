/* eslint-disable @typescript-eslint/quotes */
import app from './app';

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
