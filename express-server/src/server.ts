import app from './app';

app.set('port', 9005);

const server = app.listen(app.get('port'), () => {
  console.log(`App is running at http://localhost:${app.get('port')}`);
});

export default server;
