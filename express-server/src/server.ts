import app from './app';

app.set('port', 3000);

const server = app.listen(app.get('port'), () => {
  console.log(`App is running at http://localhost:${app.get('port')}`);
});

export default server;
