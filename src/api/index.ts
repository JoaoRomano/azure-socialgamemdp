import { Router } from 'express';
import post from './routes/postRoute';
import comentario from './routes/comentarioRoute';
import reacao from './routes/reacaoRoute';
import test from './routes/testRoute';

export default () => {
	const app = Router();

	post(app);
	comentario(app);
	reacao(app);
	test(app);
	
	return app;
}