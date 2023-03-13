import { Router } from 'express';
import { AuthController } from '../modules/auth/Auth.controller';
import { AuthService } from '../modules/auth/Auth.service';
import { AuthMiddleware } from '../common/middlewares/Auth.middleware';

const router: Router = Router();
const authController: AuthController = new AuthController(
    AuthService.getInstance(),
);
const authMiddleware: AuthMiddleware = new AuthMiddleware();

/**
 * Post track
 * @openapi
 * /auth/login:
 *      post:
 *         tags:
 *          - login
 *         summary: Login Usuario
 *         description: Permite que un usuario inicie sesión dentro de la aplicación
 *         requestBody:
 *             content:
 *                  application/json:
 *                   schema:
 *                      $ref: "#/components/schemas/login"
 *             required: true
 *             description: Un objeto de tipo JSON que contiene el correo electrónico y contraseña del usuario.
 *         responses:
 *             '200':
 *                  description: Retorna un mensaje de exito y un JWT dentro de una cookie.
 *             '400':
 *                  description: Error en el formato de los parámetros.
 */
router.post('/login', authController.login);

/**
 * Post track
 * @openapi
 * /auth/logout:
 *      post:
 *         tags:
 *          - logout
 *         summary: Logout Usuario
 *         description: Permite que un usuario cierre la sesión dentro de la aplicación
 *         security:
 *             - cookieAuth: []
 *         responses:
 *             '200':
 *                  description: Retorna un mensaje de exito.
 *             '400':
 *                  description: Error que se debe a que no existe un JWT en la petición.
 *             '500':
 *                  description: Un error inesperado durante el proceso.
 */
router.post('/logout', 
    authMiddleware.verifyUserSession
, authController.logout);

export default router;