import { Router } from 'express';

const fb = require('fibonacci');
const runFibonacci = require('../controllers/workers/fibonacciWorker')
const runCorrida = require('../controllers/workers/')
import * as ApiController from '../controllers/apiController';

const router = Router();

router.post('/registerUser', ApiController.register);
router.post('/login', ApiController.login);
router.get('/listEmail', ApiController.listEmail);
router.get('/listAll', ApiController.listAll);
router.delete('/deleteUser/:id', ApiController.deleteUser);
router.patch('/updateUser/:id', ApiController.updateUser);


router.get('/fibonacci', (req, res) => {
    const number = fb.iterate(10000);
    res.send(number);
});


router.get('/fibonacciThreaded', async (req, res) => {
    try {
        console.log('Processando resultado ')
        const result = await runFibonacci({ iterations: 10000 });
        //console.log(result); // Use console.log para imprimir o resultado no console
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});











export default router;